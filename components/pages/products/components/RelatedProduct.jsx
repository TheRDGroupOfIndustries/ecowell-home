'use client'
import ProductCardVertical from '@/components/ui/productCardVertical';
import { specialOfferProducts } from '@/constants/product';
import { fadeIn, staggerContainer } from '@/lib/utils';
import { motion } from "framer-motion";
import React from 'react';
export default function RelatedProduct() {
    return (
        <div className=" max-w-4xl mx-auto p-6">
            <h2 className="text-2xl text-center font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {specialOfferProducts &&
                    specialOfferProducts.map((product, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn('up', 0.3 + index * 0.1)}
                        >
                            <ProductCardVertical product={product} />
                        </motion.div>
                    ))}
            </div>
        </div>
    )
}
