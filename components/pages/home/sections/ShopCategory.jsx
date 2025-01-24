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
      className="w-full h-fit flex-center flex-col gap-4 md:gap-6 p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12"
    >
      <motion.h2
        variants={fadeIn("down", 0.2)}
        className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold"
      >
        Shop by Category
      </motion.h2>

      <div className="w-full grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-4 md:gap-6 lg:gap-8 py-4 overflow-hidde">
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
          : categories?.length &&
            categories?.slice(0, 4).map((category, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.3 + index * 0.1)}
              >
                <CategoryCard category={category} />
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

const CategoryCard = ({ category }) => {
  return (
    <Link
      href={{
        pathname: "/products",
        query: { category: category?.slug },
      }}
    >
      <div className="w-full h-[220px] sm:h-[300px] relative group rounded-3xl [perspective:1000px] hover:translate-x-2 hover:translate-y-4 transition-all duration-500 overflow-hidden">
        <div
          id="back-bg"
          className="absolute inset-0 z-[-1] ring-1 ring-gray-100 bg-gradient-to-t from-secondary-clr to-white 
          rounded-3xl shadow-lg [transform-origin:bottom] group-hover:[transform:rotateX(25deg)] transition-all ease-in-out duration-500"
        ></div>
        <div className="w-full h-full relative flex-center flex-col p-4 overflow-hidden">
          <Image
            src={category?.image_link}
            alt={category?.title}
            width={400}
            height={400}
            className="w-full sm:h-full object-contain mb-4 scale-95 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 overflow-hidden"
          />
          <p className="relative z-10  sm:text-lg md:text-xl lg:text-2xl font-semibold">
            {category.title}
          </p>
        </div>
      </div>
    </Link>
  );
};
