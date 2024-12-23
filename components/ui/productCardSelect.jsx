"use client";

import Image from "next/image";
import { useState } from "react";

const ProductCardSelect = ({ product }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCardClick = () => {
    setIsChecked(!isChecked);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    setIsChecked(e.target.checked);
  };
  return (
    <div
      onClick={handleCardClick}
      className="relative w-[280px] cursor-pointer group bg-white hover:bg-[#BDC3C7] rounded-lg shadow-md border p-2 ease-in-out duration-300 overflow-hidden"
    >
      <div className="absolute top-1.5 right-2.5 z-50">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxClick}
          name="select"
          className="w-fit h-fit scale-125 cursor-pointer rounded-none"
        />
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

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{product.price}</span>
          <span className="text-sm line-through text-gray-500">
            {product.oldPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSelect;