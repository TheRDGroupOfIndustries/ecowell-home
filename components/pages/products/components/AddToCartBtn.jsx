"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function AddToCartBtn() {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    // Add your cart logic here
    console.log(`Adding ${quantity} items to cart`);
  };
  return (

    <div className=" fixed z-10 bottom-3 right-3 flex flex-col gap-2">
      <div className="self-end animate-slide-up h-[50px] md:h-[64px] w-[200px] md:w-[283px] bg-dark_jungle_green text-white rounded-full flex flex-row items-center px-[5px] gap-2   ">
      <div className="mx-auto text-sm md:text-base text-white text-end flex flex-col ">
          <X color="white" />
        </div>
        <div className="ml-auto text-sm md:text-base text-white text-end flex flex-col ">
          <p>Get in touch</p>
          <p>+91 9876345621</p>
        </div>
        <div className="w-[40px] h-[40px] md:w-[55px] md:h-[55px] overflow-hidden  bg-white rounded-full relative">
          <Image
            src="/whatsapp.png"
            fill
            alt="whatsapp"
            className=""
          />
        </div>

      </div>
      <div className="animate-slide-up bg-gray-200  flex flex-row items-center p-2 border border-gray-400 ">
        <div className="flex items-center border border-gray-400 h-9 ">
          <Button
            variant="ghost"
            onClick={decreaseQuantity}
            className="px-4 py-2  hover:bg-transparent font-medium text-gray-600  focus:outline-none text-sm md:text-xl"
            aria-label="Decrease quantity"
          >
            −
          </Button>
          <span className="flex-1 px-4 py-2 text-center border-x text-sm md:text-base">
            {quantity}
          </span>
          <Button
            variant="ghost"
            onClick={increaseQuantity}
            className="px-4 py-2 font-medium text-gray-600 hover:bg-transparent focus:outline-none"
            aria-label="Increase quantity text-sm md:text-xl"
          >
            +
          </Button>
        </div>
        <Button
          onClick={handleAddToCart}
          size="sm"
          className=" rounded-none w-[150px]  md:w-[200px] bg-primary-clr text-white py-2  hover:bg-green-700 transition text-sm md:text-xl"
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
