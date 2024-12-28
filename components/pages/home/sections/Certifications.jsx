"use client"

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { certificationsData } from "@/constants/data";

const Certifications = () => {
  return (
    <motion.div
      className="bg-[#E7F4F2] py-6 md:py-8 "
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      
    >
      <motion.div variants={fadeIn('down', 0.2)} className="text-center text-2xl font-bold mb-8">
        CERTIFICATIONS
      </motion.div>

      <div className="flex justify-between flex-wrap px-10 md:px-14 lg:px-20 2xl:px-40">
        {certificationsData.map((c, index) => (
          <motion.div
            key={index}
            variants={fadeIn('up', 0.2 + index * 0.1)}
            className="flex justify-center"
          >
            <Image src={c.img} alt={c.alt} width={120} height={120} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certifications;
