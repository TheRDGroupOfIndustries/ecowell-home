"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";

const features = [
  {
    id: 1,
    title: "Chemical Free",
    description: "We create the products which are chemical free.",
    icon: "/hex1.png",
    alt: "Hex Image One",
  },
  {
    id: 2,
    title: "No-GMO",
    description: "We create the products which are chemical free.",
    icon: "/hex2.png",
    alt: "Hex Image Two",
  },
  {
    id: 3,
    title: "Safely Tested",
    description: "We ensure our products are suitable for all.",
    icon: "/hex3.png",
    alt: "Line Image",
  },
  {
    id: 4,
    title: "Well Certified",
    description: "Our products are well verified and certified from FSSAI.",
    icon: "/hex4.png",
    alt: "Rectangle Image",
  },
  {
    id: 5,
    title: "No Preservatives",
    description:
      "We Highly avoid using chemical preservatives instead we use natural flavors.",
    icon: "/hex5.png",
    alt: "Hex Image Five",
  },
];

export default function PurposeAndTrust() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col w-full gap-10 py-14"
    >
      {/* Header */}
      <motion.div
        variants={fadeIn("up", 0.2, 0.8)}
        className="flex flex-col justify-center items-center px-3"
      >
        <h2 className="text-4xl text-dark_jungle_green font-medium">
          Built with{" "}
          <span className="italic font-semibold font-serif">Purpose</span>,
          Backed by{" "}
          <span className="italic font-semibold font-serif">Trust</span>
        </h2>
      </motion.div>

      {/* Features */}
      <motion.div
        variants={staggerContainer}
        className="flex items-center justify-between flex-wrap px-3"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={fadeIn("up", 0.3 + index * 0.1, 0.8)}
            className="flex flex-col items-center w-[148px]"
          >
            <Image
              src={feature.icon}
              width={90}
              height={90}
              alt={feature.alt}
              className="h-[90px] w-[90px] object-contain sm:w-full"
            />
            <h3 className=" sm:text-xl font-semibold text-gray-800 text-center mb-1">
              {feature.title}
            </h3>
            <p className="text-xs sm:text-xl line-clamp-2 text-gray-600 text-center max-w-[170px] md:max-w-[220px]">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
