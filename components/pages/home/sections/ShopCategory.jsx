"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
// import { categoriesData } from "@/constants/data";

const ShopCategory = () => {
  const [categories, setCategories] = useState([]);

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
      }
    };

    fetchCategories();
  }, []);

  // console.log(categories);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="w-full h-fit flex flex-col items-center justify-center gap-6 p-8"
    >
      <motion.h2
        variants={fadeIn("down", 0.2)}
        className="text-xl font-semibold"
      >
        Shop by Category
      </motion.h2>

      <div className="w-fit grid grid-cols-3 md:grid-cols-4 items-center justify-center gap-4">
        {categories.slice(0, 4).map((category, index) => (
          <motion.div key={index} variants={fadeIn("up", 0.3 + index * 0.1)}>
            <Link href={`/products/${category.slug}`}>
              <div className="w-[250px] h-[250px] group bg-gradient-to-t from-secondary-clr to-white hover:to-50% hover:translate-x-1 hover:translate-y-2 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 ease-in-out duration-300 overflow-hidden">
                <Image
                  src={category.image_link}
                  alt={category.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"
                />
                <p className="text-md font-semibold mb-4">{category.title}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ShopCategory;
