'use client'
import { useEffect, useState } from 'react';
import ProductCardVertical from '@/components/ui/productCardVertical';
import { fadeIn } from '@/lib/utils';
import { motion } from "framer-motion";
import ProductCardSkeleton from '@/components/ui/productCardSkeleton';

export default function RelatedProduct({ category }) {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await fetch(`/api/products/related?category=${category}&limit=4`);
                if (response.ok) {
                    const data = await response.json();
                    setRelatedProducts(data);
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
    }, [category]);

    if (!loading && relatedProducts.length === 0) {
        return null;
    }

    return (
        <section className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl text-center font-bold mb-6">Related Products</h2>
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
                            <ProductCardVertical product={product} />
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    )
}