"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import Notification from "./Notification";
import Image from "next/image";

const Navbar = ({ companyName }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const heroSection = document.getElementById("hero");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[99999]">
      <Notification />
      <div className="w-full flex justify-between items-center p-4 px-8">
        <div className="text-lg font-bold">
          <Image
            src={"/logo.png"}
            alt={companyName || "Logo"}
            width={150}
            height={150}
          />
        </div>
        <div className="flex space-x-4">
          <Link
            href="/"
            className={`hover:text-gray-700 text-lg text-bold ${
              isScrolled ? "text-black" : "text-white"
            } ease-in-out duration-300`}
          >
            Home
          </Link>
          <Link
            href="#products"
            className={`hover:text-gray-700 text-lg text-bold ${
              isScrolled ? "text-black" : "text-white"
            } ease-in-out duration-300`}
          >
            Products
          </Link>
          <Link
            href="#about"
            className={`hover:text-gray-700 text-lg text-bold ${
              isScrolled ? "text-black" : "text-white"
            } ease-in-out duration-300`}
          >
            About Us
          </Link>
          <Link
            href="#contact"
            className={`hover:text-gray-700 text-lg text-bold ${
              isScrolled ? "text-black" : "text-white"
            } ease-in-out duration-300`}
          >
            Contact
          </Link>
        </div>
        <div className="flex space-x-4">
          <CiSearch
            size={20}
            className={`hover:text-gray-700 ${
              isScrolled ? "text-black" : "text-white"
            } ease-in-out duration-300`}
          />
          <CiShoppingCart
            size={20}
            className={`hover:text-gray-700 ${
              isScrolled ? "text-black" : "text-white"
            } ease-in-out duration-300`}
          />
          <CiUser
            size={20}
            className={`hover:text-gray-700 ${
              isScrolled ? "text-black" : "text-white"
            } ease-in-out duration-300`}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
