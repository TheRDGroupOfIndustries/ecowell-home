'use client'
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ui/productCard';
import { specialOfferProducts } from '@/constants/product';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';


export function FrequentlyBoughtTogether() {
  const [selectedProducts, setSelectedProducts] = useState(new Set(['1', '2', '3']));

  const toggleProduct = (productId) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const totalPrice = specialOfferProducts
    .filter(product => selectedProducts.has(product.id))
    .reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Frequently bought together</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {specialOfferProducts.map((product, index) => (
          <div key={product.id} className="relative">
            {index > 0 && (
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-2xl font-light text-gray-400 hidden md:block">
                +
              </div>
            )}
            <ProductCardWithcheckbox
              product={product}
              isSelected={selectedProducts.has(product.id)}
              onToggle={() => toggleProduct(product.id)}
            />
          </div>
        ))}
        <div className="flex flex-col ml-auto items-center justify-center p-4 rounded-lg w-full">
          <div className="text-lg flex flex-col items-center">
            Total Price: <span className="font-bold">₹{totalPrice}/-</span>
          </div>
          <button
            className="bg-green-900 text-white w-full px-6 py-2 rounded-md hover:bg-green-800 transition-colors"
            onClick={() => console.log('Adding to cart:', Array.from(selectedProducts))}
          >
            Add All {selectedProducts.size} To Cart
          </button>
        </div>
      </div>

    </div>
  );
}
export function ProductCardWithcheckbox({ product, isSelected, onToggle }) {
  return (
    <div className="relative">
      <div
        className="absolute z-10 top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer"
        onClick={onToggle}
        style={{
          backgroundColor: isSelected ? '#065f46' : 'white',
          borderColor: isSelected ? '#065f46' : '#d1d5db'
        }}
      >
        {isSelected && <Check size={16} className="text-white" />}
      </div>
      <div className="group bg-white hover:bg-[#BDC3C7] rounded-lg shadow-md border p-2 ease-in-out duration-300 overflow-hidden ">

        <div className="absolute z-50 bg-[#0B3D2E] text-white text-xs font-bold px-2 py-1 rounded-tr-lg">
          {product.discount}
        </div>

        <div className="w-full h-[200px] relative bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 ease-in-out duration-300 overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 ease-in-out duration-300 overflow-hidden">
            <Image
              src={product.hoverImage}
              alt={product.title}
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="mt-1">
          <h3 className="text-sm font-bold">{product.title}</h3>

          <div className="w-fit flex items-center gap-1 text-xs my-2 bg-white px-1 py-0.5 rounded-sm">
            <span>⭐</span>
            <span>{product.rating}</span>
            <span className="text-gray-500">({product.reviews})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{product.price}</span>
            <span className="text-sm line-through text-gray-500">
              {product.oldPrice}
            </span>
          </div>


        </div>
      </div>
    </div>
  );
}