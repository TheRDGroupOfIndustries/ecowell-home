import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  PinIcon as Pinterest,
} from "lucide-react";

import { CiPhone, CiMail, CiLocationOn } from "react-icons/ci";
import Image from "next/image";

const footerData = {
  newsletter: {
    title: "Join our tribe",
    description: "Be the first to hear about fresh news and new products",
    placeholder: "Enter your email here",
    buttonText: "Join",
  },
  links: {
    sections: [
      {
        title: "ABOUT",
        items: [
          {
            type: "link",
            content: "SHOP ALL",
            href: "/#",
          },
          {
            type: "link",
            content: "ABOUT US",
            href: "/#",
          },
          {
            type: "link",
            content: "CATEGORY",
            href: "/#",
          },
        ],
      },
      {
        title: "HELP",
        items: [
          {
            type: "link",
            content: "SHIPPING & RETURN",
            href: "/#",
          },
          {
            type: "link",
            content: "TERMS & CONDITIONS",
            href: "/#",
          },
          {
            type: "link",
            content: "PRIVACY POLICIES",
            href: "/#",
          },
        ],
      },
      {
        title: "CONTACT",
        items: [
          {
            type: "phone",
            content: "+91-9355951519",
            href: "tel:+91-9355951519",
            icon: <CiPhone size={20} className="w-6 h-6 text-[#0B3D2E]" />,
          },
          {
            type: "email",
            content: "ECOWELLONLINE@GMAIL.COM",
            href: "mailto:ECOWELLONLINE@GMAIL.COM",
            icon: <CiMail size={20} className="w-6 h-6 text-[#0B3D2E]" />,
          },
          {
            type: "address",
            content:
              "19, PARK LANE , CHURCH ROAD , VASANT KUNJ, NEW DELHI-110070",
            icon: (
              <CiLocationOn size={20} className="w-12 h-12 text-[#0B3D2E]" />
            ),
          },
        ],
      },
    ],
  },
  companyInfo: {
    name: "Ecowell",
    logo: "/logo.png",
    description:
      "At Ecowell, we blend science with the finest natural ingredients to craft premium wellness products. From muscle support to radiant skin, our range is designed to fuel your body, mind, and soul.",
  },
  socialMedia: [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Pinterest, href: "#" },
  ],
  copyright: {
    year: new Date().getFullYear(),
    company: "Ecowell, Inc.",
    links: ["Privacy Policy", "Terms of Service"],
  },
};

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center">
      {/* Newsletter Section */}
      <div className="w-full container px-4 py-12 grid items-center justify-center text-center">
        <h2 className="text-4xl 2xl:text-5xl mb-4">
          {footerData.newsletter.title}
        </h2>
        <p className="text-xl mb-8">{footerData.newsletter.description}</p>
        <div className="w-full border-2 border-[#333333] flex max-w-xl mx-auto">
          <input
            type="email"
            placeholder={footerData.newsletter.placeholder}
            className="w-[80vw] rounded-none border-black text-xl p-2 px-4"
          />
          <Button
            variant="default"
            className="w-fit h-full text-xl rounded-none bg-[#333333] hover:bg-zinc-700 py-2 px-8 xl:px-20"
          >
            {footerData.newsletter.buttonText}
          </Button>
        </div>
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
              {/* <h2 className="text-3xl font-bold mb-2">
                {footerData.companyInfo.name}
              </h2> */}
            </div>
            <p className="mb-8 text-lg">{footerData.companyInfo.description}</p>
            {/* Social Media Icons */}
            <div className="flex gap-4">
              {footerData.socialMedia.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="bg-[#0B3D2E] p-2 rounded-lg hover:opacity-90"
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
