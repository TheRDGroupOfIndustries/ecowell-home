"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { emailPattern, passwordPattern } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [termsChecked, setTermsChecked] = useState(false);
  const [otp, setOtp] = useState("");
  const [checkOtpCode, setCheckOtpCode] = useState("");

  const [otpBtn, setOtpBtn] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isEmail, setIsEmail] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  // console.log(emailOrPhone);

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

  const handleGetOtp = async (e) => {
    e.preventDefault();

    if (!first_name || !last_name || !emailOrPhone) {
      return toast.error("Please fill all the fields!");
    } else if (isEmail) {
      if (!email || !password || password.trim() == "" || !emailOrPhone) {
        return toast.error("Please enter your email and password!");
      }
    } else {
      return toast.error("Please enter your phone number!");
    }
    // if (!termsChecked) {
    //   return toast.error("Terms & Conditions should be checked!");
    // }

    setSendingOtp(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          phone_number: emailOrPhone,
          isEmail,
        }),
      });

      if (res.status === 400) {
        if (isEmail) {
          toast.error(`${email} is already registered!`);
        } else {
          toast.error(`${emailOrPhone} is already registered!`);
        }
      } else if (res.status === 201) {
        const otpCheck = await res.json();
        // console.log(otpCheck, otpCheck.otpCode);

        setCheckOtpCode(otpCheck);
        setOtpBtn(true);
        setOtpSuccess(true);
        if (isEmail) {
          toast.info(`OTP has been sent to your ${email}, check your email!`);
        } else {
          toast.info(
            `OTP has been sent to your ${emailOrPhone}, check your phone!`
          );
        }
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("An error occurred while sending OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleUserAuthRegister = async (e) => {
    e.preventDefault();

    if (!first_name || !last_name || !emailOrPhone || !otp || !checkOtpCode) {
      return toast.error("Please fill all the fields!");
    }

    setSubmitting(true);

    const register = async () => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            phone_number: emailOrPhone,
            isEmail,
            otp,
            checkOtpCode: checkOtpCode + "",
          }),
        });

        const contentType = res.headers.get("Content-Type");
        let result;

        // parsing response based on Content-Type
        if (contentType && contentType.includes("application/json")) {
          result = await res.json();
        } else {
          result = await res.text();
        }

        console.log("result:", result);

        if (res.status === 400) {
          if (isEmail) {
            throw new Error(`${email} is already registered!`);
          } else {
            throw new Error(`${emailOrPhone} is already registered!`);
          }
        }

        if (res.status === 401) {
          throw new Error("Invalid OTP!");
        }

        if (res.status === 200) {
          setSuccess(true);
          router.push("/auth/sign-in");
          return "Registered successfully!";
        } else {
          throw new Error(
            (result && result.message) ||
              result ||
              "Something went wrong, please try again!"
          );
        }
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    };

    toast.promise(register(), {
      pending: "Registering...",
      success: "Registered successfully!",
      error: (error) =>
        error?.message || "Something went wrong, please try again!",
    });
  };

  return (
    <section className="w-full h-full md:max-h-screen flex-center container mx-auto pt-10 md:pt-20 lg:pt-32 overflow-hidden">
      <div className="w-full grid md:grid-cols-2 gap-8">
        <div className="w-full h-full animate-slide-down">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Create account
          </h3>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="first_name"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="w-full border border-gray-300 px-3 py-1 text-gray-800 focus:ring-2 focus:ring-primary-clr focus:outline-none"
                    placeholder="Enter first name"
                    required
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                    disabled={otpBtn}
                  />
                </div>
                <div className="form-group">
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="last_name"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="w-full border border-gray-300 px-3 py-1 text-gray-800 focus:ring-2 focus:ring-primary-clr focus:outline-none"
                    placeholder="Enter last name"
                    required
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    disabled={otpBtn}
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email or Phone
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 px-3 py-1 text-gray-800 focus:ring-2 focus:ring-primary-clr focus:outline-none"
                  placeholder="Enter email or phone"
                  required
                  value={emailOrPhone}
                  onChange={handleEmailOrPhone}
                  disabled={otpBtn}
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
                    id="password"
                    name="password"
                    required={isEmail}
                    value={password}
                    onChange={handlePassword}
                    placeholder="Enter your password"
                    disabled={otpBtn}
                    className="w-full border border-gray-300 px-3 py-1 text-gray-800 focus:ring-2 focus:ring-primary-clr focus:outline-none"
                  />
                </div>
              )}

              {!otpBtn || !otpSuccess ? (
                <Button
                  type="button"
                  onClick={handleGetOtp}
                  disabled={otpBtn || sendingOtp || otpSuccess}
                  className={`max-w-60 px-10 rounded-none ${
                    submitting ? "bg-gray-100 animate-pulse" : "bg-primary-clr"
                  } text-white py-2 hover:bg-green-700 transition`}
                >
                  {sendingOtp
                    ? "Sending OTP..."
                    : otpSuccess
                    ? "Check your E-mail!"
                    : "Send OTP"}
                </Button>
              ) : (
                <>
                  <div className="form-group">
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      htmlFor="otp"
                    >
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      placeholder="Enter OTP"
                      // disabled={disableBtn || submitting || success}
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/[^\d]/g, "").slice(0, 6))
                      }
                      className="w-full border border-gray-300 px-3 py-1 text-gray-800 focus:ring-2 focus:ring-primary-clr focus:outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    onClick={handleUserAuthRegister}
                    disabled={disableBtn || submitting || success}
                    className={`max-w-60 px-10 rounded-none ${
                      submitting
                        ? "bg-gray-100 animate-pulse"
                        : "bg-primary-clr"
                    } text-white py-2 hover:bg-green-700 transition`}
                  >
                    {submitting
                      ? "Creating account..."
                      : success
                      ? "Registered Successfully!"
                      : "Create Account"}
                  </Button>
                </>
              )}
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
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h3>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h6 className="text-xl font-semibold text-gray-800 mb-4">
              Already have an account?
            </h6>
            <p className="text-gray-600 mb-6">
              Sign in to your account to access your account. and easy. It
              allows you to be able to order from our shop. To start shopping
              click register.
            </p>
            <Link href="/auth/sign-in">
              <Button
                className={`bg-primary-clr text-white py-2 rounded-none hover:bg-green-700 transition`}
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
