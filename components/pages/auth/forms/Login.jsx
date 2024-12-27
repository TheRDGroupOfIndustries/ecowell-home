"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { emailPattern, passwordPattern } from "@/constants/data";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEmailOrPhone = (e) => {
    let inputValue = e.target.value;
    setEmailOrPhone(inputValue);
    setEmail("");

    if (emailPattern.test(inputValue)) {
      setIsEmail(true);
      setEmail(inputValue);
      toast.success("Valid email");
      setDisableBtn(false);
    } else {
      setIsEmail(false);
      if (/^\d+$/.test(inputValue) && inputValue.length <= 10) {
        inputValue = inputValue.replace(/[^\d]/g, "").slice(0, 10);
        setEmailOrPhone(inputValue);
        setDisableBtn(false);
      } else {
        // toast.error("Invalid input");
        setDisableBtn(true);
      }
    }
  };

  const handlePassword = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    const validations = [
      { condition: inputValue.trim() === "", message: "Password is required." },
      {
        condition: !/(?=.*[a-z])/.test(inputValue),
        message: "Include at least one lowercase letter.",
      },
      {
        condition: !/(?=.*[A-Z])/.test(inputValue),
        message: "Include at least one uppercase letter.",
      },
      {
        condition: !/(?=.*\d)/.test(inputValue),
        message: "Include at least one digit.",
      },
      {
        condition: !/(?=.*[@$!%*?&])/.test(inputValue),
        message: "Include at least one special character (@$!%*?&).",
      },
      {
        condition: inputValue.length < 8,
        message: "Password must be at least 8 characters long.",
      },
      {
        condition: !passwordPattern.test(inputValue),
        message: "Invalid password",
      },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        toast.error(validation.message);
        setDisableBtn(true);
        return;
      }
    }

    toast.success("Valid password!");
    setDisableBtn(false);
  };

  const handleUserAuthLogin = async (e) => {
    e.preventDefault();

    if (!emailOrPhone) {
      return toast.error("Please enter your email or phone number!");
    } else if (isEmail) {
      if (!email || !password) {
        return toast.error("Please enter your email and password!");
      }
    }

    setSubmitting(true);

    const login = async () => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: isEmail ? email : "",
          phone_number: !isEmail ? emailOrPhone : "",
          otp,
          password,
        });
        console.log("res:", res);

        if (res?.error) {
          if (res.error === "OTP_SENT") {
            toast.info("OTP sent to your phone. Please enter the OTP.");
            setShowOtpInput(true);
            setSubmitting(false);
            setDisableBtn(false);
            return;
          }

          throw new Error(res.error);
        }

        if (res?.url) {
          console.log(res?.url);
          setSuccess(true);
          router.replace("/");
          router.refresh();
          return "Logged in successfully!";
        }
      } catch (error) {
        console.error("Something went wrong, please try again!");
        console.log("error:", error);
        throw error; // Throw the original error for `toast.promise`
      } finally {
        setSubmitting(false);
      }
    };

    toast.promise(login(), {
      pending: "Logging in...",
      success: "Logged in successfully!",
      error: (error) =>
        error?.message || "Something went wrong, please try again!",
    });
  };

  return (
    <section className="w-full h-full md:max-h-fit flex-center container mx-auto pt-10 md:pt-20 lg:pt-32 overflow-hidden">
      <div className="w-full grid md:grid-cols-2 gap-8">
        <div className="w-full h-full animate-slide-down">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome Back
          </h3>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <form className="space-y-6">
              <div className="form-group">
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email or Phone
                </label>
                <input
                  type="text"
                  name="email"
                  className="w-full border border-gray-300 px-3 py-1 text-gray-800 focus:ring-2 focus:ring-primary-clr focus:outline-none"
                  placeholder="Enter email or phone"
                  required
                  value={emailOrPhone}
                  onChange={handleEmailOrPhone}
                />
              </div>
              {isEmail && (
                <div className="form-group">
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    className="w-full border border-gray-300 px-3 py-1 text-gray-800 focus:ring-2 focus:ring-primary-clr focus:outline-none"
                    id="password"
                    placeholder="Enter your password"
                    required={isEmail}
                  />
                </div>
              )}
              {showOtpInput && (
                <div className="form-group">
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="otp"
                  >
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    className="w-full border border-gray-300 px-3 py-1 text-gray-800 focus:ring-2 focus:ring-primary-clr focus:outline-none"
                    placeholder="Enter OTP"
                    required
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/[^\d]/g, "").slice(0, 6))
                    }
                  />
                </div>
              )}
              <Button
                type="submit"
                onClick={handleUserAuthLogin}
                disabled={disableBtn || submitting || success}
                className={`max-w-60 px-10 rounded-none ${
                  submitting ? "bg-gray-100 animate-pulse" : "bg-primary-clr"
                } text-white py-2 hover:bg-green-700 transition`}
              >
                {submitting ? "Logging in..." : success ? "Logged in" : "Login"}
              </Button>
              <div className="flex-center flex-col space-y-4">
                <div className="">OR</div>
                <Button
                  onClick={() => signIn("google")}
                  type="button"
                  variant="outline"
                >
                  <span className="text-md flex-center">
                    <FcGoogle size={30} />
                    oogle
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full h-full animate-fade-in">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">New Here?</h3>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h6 className="text-xl font-semibold text-gray-800 mb-4">
              Create Your Account
            </h6>
            <p className="text-gray-600 mb-6">
              Sign up for a free account at our store. Registration is quick and
              easy. It allows you to order from our shop. To start shopping,
              click register.
            </p>
            <Link href="/auth/sign-up">
              <Button
                className={`bg-primary-clr text-white py-2 rounded-none hover:bg-green-700 transition`}
              >
                Create an Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
