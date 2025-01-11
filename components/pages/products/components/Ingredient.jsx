"use client";

// import React, { useState, useEffect } from "react";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

// const fetchProductData = async (sku) => {
//   try {
//     const response = await fetch(`/api/products/${sku}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch product");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }
// };

const Ingredient = ({ sku, productTitle, productIngredientHighlights }) => {
  // const [productData, setProductData] = useState(null);

  // useEffect(() => {
  //   const loadProductData = async () => {
  //     const data = await fetchProductData(sku);
  //     setProductData(data);
  //   };
  //   loadProductData();
  // }, [sku]);

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="w-full pt-10"
    >
      <div className="w-full relative pr-4">
        <div className="h-[60px] md:h-[100px] w-full border-1"></div>
        <div className="h-[60px] md:h-[100px] w-full border border-dashed border-black border-l-0"></div>
        <div className="flex flex-row w-[95%] items-center justify-between absolute bottom-[80px] left-0 ml-5">
          <div className="w-fit bg-white">
            <motion.div className="flex flex-col w-full h-full text-dark_jungle_green">
              <motion.h1
                variants={fadeIn("down", 0.2)}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium"
              >
                Why it Works:
              </motion.h1>
              <motion.h1
                variants={fadeIn("down", 0.2)}
                className="text-xl md:text-5xl font-medium"
              >
                The <span className="italic">Secret</span> inside
              </motion.h1>
            </motion.div>
          </div>
          <div className="w-[40%] md:w-[50%] text-dark_jungle_green mb-5">
            <motion.p
              variants={fadeIn("down", 0.2)}
              className="text-xs sm:text-base md:text-2xl"
            >
              What makes {productTitle} stand out?
            </motion.p>
            <motion.p
              variants={fadeIn("down", 0.2)}
              className="text-xs sm:text-base md:text-2xl"
            >
              Let’s unveil the magic:
            </motion.p>
          </div>
        </div>
      </div>
      <div className="w-full h-[240px] md:h-[340px] grid grid-cols-3 gap-0">
        {/** Ingredient Cards */}
        {[
          productIngredientHighlights[0] || 1,
          productIngredientHighlights[1] || 2,
          productIngredientHighlights[2] || 3,
        ].map((ingredient, index) => (
          <motion.div
            key={ingredient}
            variants={fadeIn("up", 0.2 + index * 0.1)}
            // whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)' }}
            className="relative flex flex-col bg-white overflow-hidden transition-transform duration-300"
          >
            <div className="self-center w-[1px] h-[40px] border border-dashed border-black"></div>
            <motion.div
              // whileHover={{ scale: 1.1 }}
              className="h-[150px] md:h-[250px] w-full mt-auto transition-transform duration-300"
            >
              <Image
                src={ingredient.image || `/ingredient${ingredient}.jpg`}
                width={250}
                height={250}
                alt={`Ingredient ${ingredient.name || ingredient}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute top-[40px] self-center w-[80%] h-[100px] border bg-[#F9F6F0] leading-3 p-2 text-dark_jungle_green overflow-hidden">
              <h1 className="text-sm md:text-xl font-semibold mt-1">
                {ingredient.name || `[Ingredient ${ingredient}]`}:
              </h1>
              <p className="text-xs md:text-base">
                {ingredient.description ||
                  (index === 0 &&
                    "Nature's powerhouse, giving your body the tools it needs to recover and grow stronger.") ||
                  (index === 1 &&
                    "A centuries-old remedy reimagined for modern wellness.") ||
                  (index === 2 &&
                    "Science-backed, delivering antioxidants and vital nutrients for total rejuvenation.")}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="w-full h-fit flex-center p-4 py-8 md:p-6 md:py-12 lg:py-16">
        <p className="w-full md:max-w-3xl lg:max-w-2xl xl:max-w-xl text-xl md:text-2xl lg:text-3xl text-primary-clr text-center">
          Every scoop (or capsule) is packed with the perfect balance of nature
          and science, ensuring you get{" "}
          <span className="font-bold italic font-serif">
            nothing but the best.
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default Ingredient;
