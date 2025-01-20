"use client";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const fetchProductData = async (sku) => {
  try {
    const response = await fetch(`/api/products/${sku}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export default function ProductDiscover({ sku, productName }) {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const loadProductData = async () => {
      const data = await fetchProductData(sku);
      setProductData(data);
    };
    loadProductData();
  }, [sku]);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="relative aspect-auto max-w-[1920px] h-[550px] sm:h-[750px] md:h-[800px] lg:h-[1050px]"
    >
      {/* Top Section */}
      <motion.div
        variants={fadeIn("up", 0.2, 1)}
        className="relative w-full h-[270px] sm:h-[300px]   md:h-[400px] lg:h-[550px] max-h-[270px] sm:max-h-[300px]   md:max-h-[400px] lg:max-h-[550px] overflow-hidden"
      >
        <Image
          src={
            productData?.heroBanner?.backgroundImage || "/productDiscover1.jpg"
          }
          fill
          alt="product discover"
          className="w-full object-cover object-top"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex flex-row items-center pl-7 lg:pl-10">
          <div className="flex flex-col text-wrap">
            <motion.h3
              variants={fadeIn("up", 0.3, 0.8)}
              className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-dark_jungle_green font-semibold"
            >
              {productData?.heroBanner?.title || "Product Discover"}
            </motion.h3>
            <motion.h1
              variants={fadeIn("up", 0.4, 0.8)}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-dark_jungle_green font-semibold line-clamp-2 sm:line-clamp-none"
            >
              {productData?.title || "Diabivita"}
            </motion.h1>
            <motion.h4
              variants={fadeIn("up", 0.5, 0.8)}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-dark_jungle_green font-normal"
            >
              {productData?.heroBanner?.subtitle || "YOUR WELLNESS COMPANION"}
            </motion.h4>
            <motion.p
              variants={fadeIn("up", 0.6, 0.8)}
              className="text-xs sm:text-base md:text-lg lg:text-xl mt-2 max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] text-charcoal_black font-semibold"
            >
              {productData?.heroBanner?.description ||
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil deserunt id quod ducimus consequatur rem sunt cum, dolorum fugiat sit quasi fuga quo doloribus laboriosam dolores unde, adipisci ullam vero?"}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Section */}
      <div className="absolute left-0 right-4 md:right-8 bottom-1 flex flex-row">
        <div className="w-full h-[330px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex flex-row items-end bg-transparent pl-3 sm:pl-5 ms:pl-8 lg:pl-10">
          <motion.div
            variants={fadeIn("left", 0.7, 1)}
            className="max-w-[600px] mt-auto text-wrap overflow-hidden"
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-wrap text-dark_jungle_green font-semibold">
              {productData?.dailyRitual?.title || "Your New Daily Ritual"}
            </h1>
            <p className="line-clamp-5 md:line-clamp-none text-xs sm:text-base md:text-lg text-wrap mt-2 max-w-[500px] text-charcoal_black font-semibold">
              {productData?.dailyRitual?.description ||
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil deserunt id quod ducimus consequatur rem sunt cum, dolorum fugiat sit quasi fuga quo doloribus laboriosam dolores unde, adipisci ullam vero?"}
            </p>
          </motion.div>
        </div>
        <motion.div
          variants={fadeIn("right", 0.8, 1)}
          className="w-[490px] md:w-[590px] lg:w-[680px] rounded-2xl h-[330px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-pink-200 relative"
        >
          <Image
            src={
              productData?.dailyRitual?.lifestyleImage ||
              "/productDiscover2.jpg"
            }
            width={2000}
            height={2000}
            alt="product discover"
            className="h-full w-full object-cover object-center rounded-2xl border-8 border-white"
          />
        </motion.div>

      </div>
    </motion.div>
  );
}
