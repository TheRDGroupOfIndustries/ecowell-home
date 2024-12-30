'use client'
import ProductCardSkeleton from '@/components/ui/productCardSkeleton';
import ProductCardVertical from '@/components/ui/productCardVertical';
import { fadeIn, staggerContainer } from '@/lib/utils';
import { motion } from "framer-motion";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function RelatedProduct({ category, currentProductId }) {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await fetch(`/api/products/related?category=${category}&limit=4`);
                if (response.ok) {
                    const data = await response.json();
                    // Filter out the current product
                    const filteredProducts = data.filter(product => product._id !== currentProductId);
                    setRelatedProducts(filteredProducts);
                }
            } catch (error) {
                console.error('Error fetching related products:', error);
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchRelatedProducts();
        }
    }, [category, currentProductId]);

    if (!loading && relatedProducts.length === 0) {
        return null;
    }

    return (
        <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="max-w-5xl mx-auto p-2 sm:p-4 md:p-6">
            <motion.h2 
            variants={fadeIn("up", 0.2, 1)}
            className="text-2xl text-center font-bold mb-6">Related Products</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {loading ? (
                    <>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </>
                ) : (
                    relatedProducts.map((product, index) => (
                        <motion.div
                            key={product._id}
                            variants={fadeIn('up', 0.3 + index * 0.1)}
                        >
                            <Link href={`/products/${product.sku || ''}`}>
                                <ProductCardVertical product={product} />
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.section>
    )
}