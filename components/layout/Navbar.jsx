"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import Notification from "./Notification";
import Image from "next/image";
import { links } from "@/constants/data";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";

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
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="fixed top-0 left-0 w-full z-[99999] backdrop-blur-md"
    >
      <Notification />
      <div className="w-full flex justify-between items-center p-4 px-8">
        <motion.div
          variants={fadeIn("down", 0.2)}
          className="text-lg font-bold"
        >
          <Image
            src={"/logo.png"}
            alt={companyName || "Logo"}
            width={150}
            height={150}
          />
        </motion.div>
        <motion.div variants={fadeIn("down", 0.3)} className="flex space-x-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.herf}
              className={`hover:text-gray-700 text-lg text-bold ${
                isScrolled ? "text-black" : "text-white"
              } ease-in-out duration-300`}
            >
              {link.head}
            </Link>
          ))}
        </motion.div>
        <motion.div variants={fadeIn("down", 0.4)} className="flex space-x-4">
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;
