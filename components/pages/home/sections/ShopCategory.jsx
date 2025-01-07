"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
// import { categoriesData } from "@/constants/data";

const ShopCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/products/categories");
        if (!response.ok)
          console.log("Something went wrong while fetching categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <motion.div
      id="shop-categories"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="w-full h-fit flex flex-col items-center justify-center gap-4 md:gap-6 p-4 sm:p-6 md:p-8"
    >
      <motion.h2
        variants={fadeIn("down", 0.2)}
        className="text-xl font-semibold"
      >
        Shop by Category
      </motion.h2>

      <div className="w-fit grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 items-center justify-center gap-4">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", 0.3 + index * 0.1)}
                >
                  <SkeletonCard />
                </motion.div>
              ))
          : categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.3 + index * 0.1)}
              >
                {/* <Link href={`/products?category=${category.slug}`}> */}
                <Link
                  href={{
                    pathname: "/products",
                    query: { category: category.slug },
                  }}
                >
                  <div className="w-[180px] md:w-[250px] h-[250px] ring-2 ring-gray-200 group bg-gradient-to-t from-secondary-clr to-white hover:to-50% hover:translate-x-1 hover:translate-y-2 rounded-lg shadow-lg flex-center flex-col p-4 ease-in-out duration-300 overflow-hidden">
                    <Image
                      src={category.image_link}
                      alt={category.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-contain mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 overflow-hidden"
                    />
                    <p className="relative z-10 text-md font-semibold">
                      {category.title}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>
    </motion.div>
  );
};
export default ShopCategory;

const SkeletonCard = () => (
  <div className="w-[180px]   md:w-[250px] h-[250px]  bg-gray-200 animate-pulse rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
    <div className="w-full h-[180px] bg-gray-300 rounded-md mb-4"></div>
    <div className="w-24 h-4 bg-gray-300 rounded"></div>
  </div>
);
