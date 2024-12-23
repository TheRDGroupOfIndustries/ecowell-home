import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { footerData } from "@/constants/data";

export default function Footer() {
  return (
    <footer className="w-full flex-center flex-col overflow-hidden">
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
