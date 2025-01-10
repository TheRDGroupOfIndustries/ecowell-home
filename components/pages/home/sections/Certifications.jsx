"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { certificationsData } from "@/constants/data";

const Certifications = () => {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="bg-[#E7F4F2] py-6 md:py-8"
    >
      <motion.div
        variants={fadeIn("down", 0.2)}
        className="text-center text-2xl font-extrabold mb-8 md:mb-10 lg:mb-12 font-serif"
      >
        CERTIFICATIONS
      </motion.div>

      <div className="flex-between flex-wrap px-12 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
        {certificationsData.map((c, index) => (
          <motion.div
            key={index}
            variants={fadeIn("up", 0.2 + index * 0.2)}
            className="flex-center"
          >
            <Image
              src={c.img}
              alt={c.alt}
              width={120}
              height={120}
              className="w-20 h-20 overflow-hidden"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certifications;
