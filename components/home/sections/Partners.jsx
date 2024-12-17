"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { partnerLogoData } from "@/constants/data";

const Partners = () => {
  const scrollRef = useRef(null);

  return (
    <motion.div
      className="w-full h-fit p-10 overflow-hidden relative"
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="show"
    >
      {/* Left & right gradient overlay */}
      <div className="absolute left-0 top-0 w-60 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 w-60 h-full bg-gradient-to-l from-white to-transparent z-10" />

      <motion.div
        ref={scrollRef}
        className="flex justify-start whitespace-nowrap space-x-8"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        whileHover={{
          animationPlayState: "paused",
          x: "var(--x)",
        }}
        onHoverStart={(e) => {
          if (scrollRef.current) {
            scrollRef.current.style.setProperty(
              "--x",
              getComputedStyle(scrollRef.current).transform
            );
          }
        }}
      >
        {partnerLogoData.map((logo, index) => (
          <motion.div key={index} variants={fadeIn('up', 0.2 + index * 0.1)}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={400}
              height={400}
              className="w-fit h-fit"
            />
          </motion.div>
        ))}
        {partnerLogoData.map((logo, index) => (
          <motion.div key={`repeat-${index}`} variants={fadeIn('up', 0.2 + index * 0.1)}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={400}
              height={400}
              className="w-fit h-fit"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Partners;
