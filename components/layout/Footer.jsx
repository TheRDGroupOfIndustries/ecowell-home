'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { footerData } from "@/constants/data";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail) {
      toast.error('Please enter a valid email address');
      return;
    }
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Thank you for subscribing!');
        setEmail('');
      } else {
        toast.error(data.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <footer className="w-full flex-center flex-col overflow-hidden">
      {/* Newsletter Section */}
      <div className="w-full container px-4 py-12 grid items-center justify-center text-center">
        <h2 className="text-4xl 2xl:text-5xl mb-4">
          {footerData.newsletter.title}
        </h2>
        <p className="text-xl mb-8">{footerData.newsletter.description}</p>
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-full border-2 border-[#333333] flex">
              <input
                type="email"
                placeholder={footerData.newsletter.placeholder}
                className={`w-[80vw] rounded-none border-black text-xl p-2 px-4 ${
                  !isValidEmail && email ? 'border-red-500' : ''
                }`}
                value={email}
                onChange={handleEmailChange}
                required
              />
              <Button
                type="submit"
                variant="default"
                className="w-fit h-full text-xl rounded-none bg-[#333333] hover:bg-zinc-700 py-2 px-8 xl:px-20"
                disabled={!isValidEmail || !email}
              >
                {footerData.newsletter.buttonText}
              </Button>
            </div>
            {!isValidEmail && email && (
              <p className="text-red-500 mt-2">Please enter a valid email address</p>
            )}
          </div>
        </form>
      </div>

      {/* Links, Help, and Contact Sections */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Dynamic Sections (About, Help, Contact) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerData.links.sections.map((section, index) => (
              <div
                key={index}
                className={`${
                  index === 2 ? "border-r-2 border-[#333333] pr-8" : ""
                }`}
              >
                <h3 className="font-semibold mb-4 border-b-2 border-[#333333] pb-2">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href || "#"}
                        className="w-fit flex items-start gap-2 group"
                      >
                        {item.icon}
                        <span className="text-md group-hover:underline">
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
              <Image
                src={footerData.companyInfo.logo}
                alt={footerData.companyInfo.name}
                width={200}
                height={200}
              />
            </div>
            <p className="mb-8 text-lg">{footerData.companyInfo.description}</p>
            {/* Social Media Icons */}
            <div className="flex gap-4">
              {footerData.socialMedia.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
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
          © {footerData.copyright.year} {footerData.copyright.company}. All
          rights reserved. |{" "}
          {footerData.copyright.links.map((link, index) => (
            <span key={index}>
              <Link href="#" className="hover:underline">
                {link}
              </Link>
              {index < footerData.copyright.links.length - 1 && " | "}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}