import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";
import {
  sendOtpToPhone,
  transporter,
  verifyOtpFromPhone,
} from "@/app/api/core";
// import { capitalizeFirstLetter } from "@/lib/utils";

export const POST = async (request) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    isEmail,
    otp,
    checkOtpCode,
  } = await request.json();

  // console.log(first_name, last_name, email, phone_number, isEmail, password, otp, checkOtpCode);

  await connectToMongoDB();

  if (isEmail) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("User already exists!", { status: 400 });
    }
  } else {
    const existingUser = await User.findOne({ phone_number });
    if (existingUser) {
      return new NextResponse("User already exists!", { status: 400 });
    }
  }

  let otpCode = checkOtpCode || "";

  if (!otp) {
    console.log("sending otp");

    if (isEmail) {
      otpCode = Math.floor(1000 + Math.random() * 9000);
      const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${first_name}!!</h1>
      <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">Here's an OTP for your email verification <b style="color: #2fff00;">${otpCode}</b><br /></span>`;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "EcoWell - Verify Email",
        text: "Email Verification",
        html: body,
      });

      return new NextResponse(JSON.stringify(otpCode), {
        status: 201,
        //   message: "Otp has been sent to your email for verification.",
      });
    } else {
      try {
        // send otp to phone number
        const verification = await sendOtpToPhone(phone_number);

        if (verification) {
          return new NextResponse(JSON.stringify(otpCode), {
            status: 201,
          });
        }
      } catch (error) {
        return new NextResponse("Internal Server Error : " + error, {
          status: 500,
        });
      }
    }
  }

  // console.log(otp, " -> ", checkOtpCode);

  if (otp) {
    let newUser;
    if (isEmail && otp == checkOtpCode) {
      const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${first_name}!!</h1>
      <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">Here's your credentials to login as User:</span>
      <p style="color: #2fff00; font-size: 18px; font-family: 'Arial', sans-serif;">Email: <b style="color: #333;">${email}</b></p>
      <p style="color: #2fff00; font-size: 18px; font-family: 'Arial', sans-serif;'>Password: <b style="color: #333;">${password}</b></p>`;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "EcoWell - User credentials",
        text: "User login credentials",
        html: body,
      });

      const hashPassword = await bcrypt.hash(password, 5); // converting password into hash-code

      newUser = new User({
        first_name,
        last_name,
        email,
        password: hashPassword,
      });
    } else {
      const isOtpValid = await verifyOtpFromPhone(phone_number, otp);

      if (isOtpValid) {
        // send admin credentials through SmS

        newUser = new User({
          first_name,
          last_name,
          phone_number,
        });
      }
    }

    try {
      await newUser.save();
      return new NextResponse("User Registered successfully!", {
        status: 200,
      });
    } catch (error) {
      return new NextResponse("Internal Server Error : " + error, {
        status: 500,
      });
    }
  }
  return new NextResponse("Internal Server Error!", { status: 500 });
};
