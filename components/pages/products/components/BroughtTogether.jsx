'use client'
import { useEffect, useState } from 'react';
import ProductCardSelect from '@/components/ui/productCardSelect';
import { useCart } from "@/context/CartProvider";
import Image from 'next/image';
import { Check } from 'lucide-react';
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from '@/lib/utils';

// New Skeleton component
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-[100px] md:h-[200px] w-full rounded-lg mb-2"></div>
    <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
    <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
  </div>
);

export function FrequentlyBoughtTogether() {
  const { addToCart } = useCart();
  
  const [selectedProducts, setSelectedProducts] = useState(new Set([]));
  const [randomProducts, setRandomProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products?sort=random-products&limit=3');
        const data = await response.json();
        setRandomProducts(data.products);
        setSelectedProducts(new Set(data.products.map(p => p._id)));
      } catch (error) {
        console.error('Error fetching random products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  const toggleProduct = (productId) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const totalPrice = randomProducts
    .filter(product => selectedProducts.has(product._id))
    .reduce((sum, product) => sum + (product.salePrice || product.price), 0);

  const handleAddToCart = () => {
    randomProducts
      .filter(product => selectedProducts.has(product._id))
      .forEach(product => {
        addToCart(product, 1, product.variants[0]);
      });
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="max-w-7xl mx-auto p-2 md:p-6"
    >
      <motion.h2 
        variants={fadeIn("up", 0.2, 1)}
        className="text-2xl font-bold mb-6"
      >
        Frequently bought together
      </motion.h2>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-8 mb-8">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          randomProducts.map((product, index) => (
            <motion.div 
              key={product._id}
              variants={fadeIn('up', 0.3 + index * 0.1)}
              className="relative"
            >
              <ProductCardSelect 
                product={{
                  id: product._id,
                  title: product.title,
                  price: `₹${product.salePrice || product.price}`,
                  oldPrice: product.salePrice ? `₹${product.price}` : undefined,
                  image: product.variants[0]?.images[0] || '/placeholder.png',
                  hoverImage: product.variants[0]?.images[1] || '/placeholder.png',
                }}
                isSelected={selectedProducts.has(product._id)}
                onToggle={() => toggleProduct(product._id)} 
              />
            </motion.div>
          ))
        )}
        <motion.div 
          variants={fadeIn("up", 0.4)} 
          className="flex flex-col md:ml-auto items-center justify-evenly md:p-4 rounded-lg w-full col-span-3 md:col-span-1"
        >
          <div className="text-lg flex md:flex-col gap-2 items-center mt-">
            Total Price: <span className="font-bold">₹{totalPrice.toFixed(2)}/-</span>
          </div>
          <button
            className="bg-green-900 text-white w-full px-6 py-2 rounded-md hover:bg-green-800 transition-colors "
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            Add {selectedProducts.size} To Cart
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
