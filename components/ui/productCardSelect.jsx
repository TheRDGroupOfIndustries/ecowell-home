"use client";

import Image from "next/image";
import { useState } from "react";

const ProductCardSelect = ({ product, isSelected, onToggle }) => {
  // const [isChecked, setIsChecked] = useState(false);

  // const handleCardClick = () => {
  //   setIsChecked(!isChecked);
  // };

  // const handleCheckboxClick = (e) => {
  //   e.stopPropagation();
  //   setIsChecked(e.target.checked);
  // };
  return (
    <div
      onClick={onToggle}
      className="relative w-full  md:w-[180px] lg:w-[240px] cursor-pointer group bg-white hover:bg-[#BDC3C7] rounded-lg shadow-md border p-2 ease-in-out duration-300 overflow-hidden"
    >
      <div className="absolute top-1.5 right-2.5 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          name="select"
          className="w-fit h-fit scale-125 cursor-pointer rounded-none"
        />
      </div>

      <div className="w-full h-[100px] md:h-[200px] relative bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 ease-in-out duration-300 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
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
        <h3 className="text-xs sm:text-sm font-bold line-clamp-1">{product.title}</h3>

        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-lg font-bold">{product.price}</span>
          <span className="text-xs sm:text-sm line-through text-gray-500">
            {product.oldPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSelect;
