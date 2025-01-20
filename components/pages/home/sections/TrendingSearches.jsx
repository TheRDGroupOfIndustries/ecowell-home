"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { trendingSearchData } from "@/constants/data";

const TrendingSearches = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="relative"
    >
      <div className="w-full h-fit flex flex-col items-center justify-center gap-6 p-8">
        <motion.h2
          variants={fadeIn("up", 0.2, 1)}
          className="text-2xl font-semibold"
        >
          Trending searches
        </motion.h2>
        <div className="w-fit h-fit grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingSearchData.map((item, index) => (
            <Link
              href={{
                pathname: "/products",
                query: { search: item.text },
              }}
              key={index}
            >
              <motion.div
                variants={fadeIn("right", 0.2 * index, 1)}
                className="overflow-hidden "
              >
                <div className=" w-full hover-fill  border border-gray-950 hover:text-white hover:border-secondary-clr  h-fit p-2 px-4 flex items-center justify-center gap-2 text-lg md:text-2xl lg:text-3xl cursor-pointer ">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingSearches;
