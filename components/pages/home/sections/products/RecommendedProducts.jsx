"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { specialOfferProducts } from "@/constants/product";
import ProductCard from "@/components/ui/productCard";

const RecommendedProducts = ({ products }) => {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="w-full h-fit flex flex-col items-center justify-center gap-6 p-8"
    >
      <motion.h2
        variants={fadeIn("down", 0.2)}
        className="text-2xl font-semibold"
      >
        Recommended Products
      </motion.h2>
      <div className="w-full flex flex-wrap items-center justify-center gap-6">
        {products &&
          products.map((product, index) => (
            <motion.div key={index} variants={fadeIn("up", 0.3 + index * 0.1)}>
              <ProductCard product={product} />
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
};

export default RecommendedProducts;
