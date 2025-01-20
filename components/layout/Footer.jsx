"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { footerData, emailRegex } from "@/constants/data";
import { toast } from "sonner";

export default function Footer() {
  return (
    <footer
      id="contact-us"
      className="w-full flex-center flex-col overflow-hidden"
    >
      {/* Newsletter Section */}
      <div className="w-full   py-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl 2xl:text-5xl mb-4 ">
          {footerData.newsletter.title}
        </h2>
        <p className="text-xl mb-8 mx-4">{footerData.newsletter.description}</p>
        <Newsletter />
      </div>

      {/* Links, Help, and Contact Sections */}
      <div className=" mx-auto px-3 py-12">
        <div className="grid grid-cols-1  lg:grid-cols-12 gap-8">
          {/* Dynamic Sections (About, Help, Contact) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-hidden">
            {footerData.links.sections.map((section, index) => (
              <div
                key={index}
                className={`${
                  index === 2
                    ? "lg:border-r-2 border-[#333333] lg:pr-8 col-span-2 md:col-span-1"
                    : ""
                }  `}
              >
                <h3 className="font-semibold text-center sm:text-start mb-4 border-b-2 border-[#333333] pb-2">
                  {section.title}
                </h3>
                <ul className="space-y-2 flex  gap-4 sm:gap-0 flex-wrap  flex-col justify-evenly items-center sm:items-start mb-5 sm:mb-0">
                  {section.items.map((item, idx) => (
                    <li className="mt-2" key={idx}>
                      <Link
                        href={item.href || "#"}
                        target="_blank"
                        className="w-fit flex items-start gap-2 group  "
                      >
                        {item.icon}
                        <span className="text-md group-hover:underline h-6 text-xm sm:text-sm md:text-base">
                          {item.content}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Company Info Section */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Link href="/">
                <Image
                  src={footerData.companyInfo.logo}
                  alt={footerData.companyInfo.name}
                  width={200}
                  height={200}
                />
              </Link>
            </div>
            <p className="mb-8 text-lg">{footerData.companyInfo.description}</p>
            {/* Social Media Icons */}
            <div className="flex gap-4">
              {footerData.socialMedia.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  className="bg-primary-clr p-2 rounded-lg hover:opacity-90"
                >
                  <social.icon className="w-6 h-6 text-white" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full bg-[#333333] text-white">
        <p className="w-full px-4 py-2 text-sm text-center">
          © {footerData.copyright.year} {footerData.copyright.company} All
          rights reserved. |{" "}
          {footerData.copyright.links.map((link, index) => (
            <span key={index}>
              <Link
                href={link.href}
                target="_blank"
                className="hover-link-underline"
              >
                {link.label}
              </Link>
              {index < footerData.copyright.links.length - 1 && " | "}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => emailRegex.test(email);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Thank you for subscribing our Newsletter!");
        setEmail("");
      } else {
        toast.error(data.error || "Subscription failed, Please try again!");
      }
    } catch (error) {
      toast.error("An error occurred, Please try again later...");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[95%] md:w-full max-w-xl mx-2 px-0 sm:mx-auto"
    >
      <div className="relative flex flex-col items-center">
        <div
          className={`w-full flex border-2  ${
            !isValidEmail && email ? "border-red-500" : "border-[#333333]"
          }`}
        >
          <input
            type="email"
            placeholder={footerData.newsletter.placeholder}
            className={`w-[80vw] rounded-none border-black text-xl p-2 px-4 outline-none`}
            value={email}
            onChange={handleEmailChange}
            required
          />
          <Button
            type="submit"
            variant="default"
            className="w-[20vh]  h-full text-lg md:text-xl rounded-none bg-[#333333] hover:bg-zinc-700 py-2 px-2 md:px-8 xl:px-20 overflow-hidden"
            disabled={!isValidEmail || !email}
          >
            {footerData.newsletter.buttonText}
          </Button>
        </div>
        {!isValidEmail && email && (
          <p className="absolute -bottom-8 text-red-500 mt-0.5 py-0.5 overflow-hidden">
            <span className="animate-slide-up">
              Please enter a valid email address
            </span>
          </p>
        )}
      </div>
    </form>
  );
};
