import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";
import { capitalizeFirstLetter } from "@/lib/utils";
import { sendOtpToPhone, verifyOtpFromPhone } from "@/app/api/core";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Password", type: "password" },
        phone_number: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        await connectToMongoDB();
        try {
          if (credentials.phone_number) {
            const user = await User.findOne({
              phone_number: credentials.phone_number,
            });
            if (user) {
              if (!credentials.otp) {
                const verification = await sendOtpToPhone(
                  credentials.phone_number
                );
                if (verification) {
                  throw new Error("OTP_SENT");
                } else {
                  throw new Error("Failed to send OTP");
                }
              } else {
                const isOtpValid = await verifyOtpFromPhone(
                  credentials.phone_number,
                  credentials.otp
                );
                if (isOtpValid) {
                  return user.toObject(); // Convert to plain object
                } else {
                  throw new Error("Invalid OTP");
                }
              }
            } else {
              throw new Error("User doesn't exist");
            }
          } else if (credentials.email) {
            const user = await User.findOne({ email: credentials.email });
            if (user && user.password) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user.toObject(); // Convert to plain object
              } else {
                console.error(
                  "Incorrect password for email:",
                  credentials.email
                );
                throw new Error("Incorrect password");
              }
            } else {
              console.error(
                "User doesn't exist or password missing for email:",
                credentials.email
              );
              throw new Error(
                "User doesn't exist or password mismatch/missing, try signing up"
              );
            }
          }
        } catch (error) {
          console.error("Authorization error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;

      if (account?.provider === "google") {
        try {
          await connectToMongoDB();
          const userExists = await User.findOne({ email: user?.email });

          if (!userExists) {
            const newUser = new User({
              first_name: capitalizeFirstLetter(user?.name.split(" ")[0]),
              last_name: capitalizeFirstLetter(user?.name.split(" ")[1]),
              email: user?.email,
              profile_image: user?.image || "/assets/user.png",
            });
            const savedUser = await newUser.save();
            return savedUser;
          }
          return userExists || true;
        } catch (error) {
          console.error("Error storing user in DB:", error);
          return false;
        }
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (token?.user) {
          const { email, phone_number } = token.user;
          const query = email ? { email } : { phone_number };

          const userFromDB = await User.findOne(query).lean();

          if (userFromDB) {
            session.user = userFromDB; // {
            //   id: userFromDB._id,
            //   email: userFromDB.email,
            //   phone_number: userFromDB.phone_number,
            //   first_name: userFromDB.first_name,
            //   last_name: userFromDB.last_name,
            //   profile_image: userFromDB.profile_image,
            // };
          } else {
            session.user = token.user;
          }
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
