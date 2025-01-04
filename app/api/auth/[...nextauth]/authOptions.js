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
        try {
          await connectToMongoDB();
          // console.log("Credentials received:", credentials);

          if (credentials.phone_number !== "") {
            const user = await User.findOne({
              phone_number: credentials.phone_number,
            });
            if (user) {
              if (!credentials.otp) {
                // sending OTP to the user's phone number
                const verification = await sendOtpToPhone(
                  credentials.phone_number
                );
                if (verification) {
                  throw new Error("OTP_SENT");
                } else {
                  throw new Error("Failed to send OTP");
                }
              } else {
                // verifying OTP
                const isOtpValid = await verifyOtpFromPhone(
                  credentials.phone_number,
                  credentials.otp
                );
                if (isOtpValid) {
                  return user;
                } else {
                  throw new Error("Invalid OTP");
                }
              }
            } else {
              console.error(
                "User doesn't exist with phone number:",
                credentials.phone_number
              );
              throw new Error("User doesn't exist");
            }
          } else if (credentials.email !== "") {
            const user = await User.findOne({ email: credentials.email });
            if (user && user.password) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user;
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
              throw new Error("User doesn't exist or password missing");
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
              profile_image:
                user?.image ||
                "https://i.pinimg.com/1200x/b5/12/68/b5126803cf115b044849b64ca565a4a7.jpg" ||
                "/assets/user.png",
            });
            const savedUser = await newUser.save();
            return savedUser;
          }
          return userExists;
        } catch (error) {
          console.log("Error storing onto the db : ", error);
          return false;
        }
      }
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    // async session({ session, token }) {
    //   try {
    //     if (token?.user) {
    //       const { email, phone_number } = token.user;

    //       const query = email
    //         ? { email }
    //         : phone_number
    //         ? { phone_number }
    //         : null;

    //       if (!query) {
    //         throw new Error("Invalid token: missing email or phone_number.");
    //       }

    //       // Ensure the database connection is active
    //       await connectToMongoDB();

    //       // Fetch the user from the database
    //       const userFromDB = await User.findOne(query);
    //       // .select(
    //       //   "_id email phone_number name profile_image"
    //       // );

    //       if (!userFromDB) {
    //         throw new Error("User not found in the database.");
    //       }

    //       console.log("\nRetrieved User from DB:", userFromDB);

    //       // Return a new session object with the updated user data
    //       return {
    //         ...session,
    //         user: {
    //           ...session.user, // Preserve existing user fields
    //           ...userFromDB, // Merge fields from the database
    //         },
    //       };
    //     }
    //   } catch (error) {
    //     console.error("Error updating session user:", error.message);
    //     return {
    //       ...session,
    //       user: null, // Set user to null on error
    //     };
    //   }
    //   return session; // Return the unchanged session if no token.user
    // },

    async session({ session, token }) {
      try {
        // if (token?.user) {
        let tokenState = false;
        setTimeout(() => {
          tokenState = true;
        }, 3000);

        if (tokenState) {
          const { email, phone_number } = token.user;

          const query = email
            ? { email }
            : phone_number
            ? { phone_number }
            : null;

          if (!query) {
            throw new Error("Invalid token: missing email or phone_number.");
          }

          // Ensure the database connection is active
          await connectToMongoDB();

          // Fetch the user from the database
          const userFromDB = await User.findOne(query); //.select("_id"); //.lean(); // Use lean() for better performance

          if (!userFromDB) {
            throw new Error("User not found in the database.");
          }

          console.log("\nRetrieved User from DB:", userFromDB);

          session.user = userFromDB;
          return session;
        }
      } catch (error) {
        console.error("Error updating session user:", error.message);
        session.user = null; // Set session.user to null on error
        return session;
      }
      // return session;
    },

    // async session({ session, token }) {
    //   if (token?.user) {
    //     const { email, phone_number } = token.user;

    //     const query = email
    //       ? { email }
    //       : phone_number
    //       ? { phone_number }
    //       : null;

    //     console.log("\nQuery:", query);

    //     await connectToMongoDB();
    //     const userFromDB = await User.findOne(query).lean(); // Lean for better performance
    //     console.log("\nuser", userFromDB, "\ntoken: ", token);

    //     session.user = userFromDB;
    //   }
    //   return session;
    // },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
