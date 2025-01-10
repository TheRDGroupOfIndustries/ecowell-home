"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import { X, ChevronLeft } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";
import Link from "next/link";
import { contactNumber } from "@/constants/data";

export default function AddToCartBtn({ product, selectedVariant }) {
  const [quantity, setQuantity] = useState(1);
  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, addToCartLoading, productExistsInCart } = useCart();
  const router = useRouter();

  const whatsappStates = [
    {
      containerClass: "h-[50px] md:h-[64px] w-[200px] md:w-[283px]",
      showText: true,
    },
    {
      containerClass: "h-[50px] md:h-[64px] w-[200px] md:w-[110px]",
      showText: false,
    },
  ];

  useEffect(() => {
    if (showWhatsApp) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showWhatsApp]);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (productExistsInCart(product._id)) {
      router.push("/account/cart");
    } else {
      await addToCart(product, quantity, selectedVariant);
      router.push("/account/cart");
    }
  };

  // const handleWhatsAppRedirect = () => {
  //   window.open("https://wa.me/919876345621", "_blank");
  // };

  return (
    <div className="fixed z-40 bottom-3 right-3 flex flex-col gap-2">
      {showWhatsApp && (
        <div
          className={`self-end animate-slide-up ${whatsappStates[currentImageIndex].containerClass} bg-dark_jungle_green text-white rounded-full flex flex-row items-center px-[5px] md:gap-2 cursor-pointer transition-all duration-300 overflow-hidden`}
        >
          {whatsappStates[currentImageIndex].showText && (
            <div
              className="h-full flex items-center hover:opacity-50 cursor-pointer px-3 py-3"
              onClick={(e) => {
                e.stopPropagation();
                setShowWhatsApp(false);
              }}
            >
              <button className="mx-auto text-sm md:text-base text-white text-end flex flex-col">
                <X color="white" />
              </button>
            </div>
          )}
          {whatsappStates[currentImageIndex].showText == false && (
            <div className="h-full flex items-center hover:opacity-50 cursor-pointer pl-3 py-3">
              <button className="mx-auto text-sm md:text-base text-white text-end flex flex-col">
                <ChevronLeft color="white" />
              </button>
            </div>
          )}

          {whatsappStates[currentImageIndex].showText && (
            <div className="w-full flex-1">
              <Link
                href={`https://wa.me/${contactNumber}`}
                target="_blank"
                className="w-full ml-auto text-xs md:text-base text-white text-end flex flex-col text-nowrap"
              >
                <p>Get in touch</p>
                <p>+91 {contactNumber}</p>
              </Link>
            </div>
          )}
          <div className="w-[40px] h-[40px] md:w-[55px] md:h-[55px] overflow-hidden ml-1 rounded-full relative">
            .
            <Link href="https://wa.me/919876345621" target="_blank">
              <Image
                src="/whatsapp.png"
                fill
                alt="whatsapp"
                className="rounded-full min-w-[40px] min-h-[40px] md:w-[55px] md:h-[55px]"
              />
            </Link>
          </div>
        </div>
      )}
      <div className="animate-slide-up bg-gray-200/60 backdrop-blur-md flex items-center gap-2 p-2 ring-1 ring-gray-400/60 overflow-hidden">
        <div className="flex items-center ring-1 ring-gray-400/60 h-9">
          <Button
            type="button"
            variant="ghost"
            onClick={decreaseQuantity}
            className="px-4 py-2 hover:bg-transparent font-medium text-gray-600 focus:outline-none text-md md:text-2xl"
            aria-label="Decrease quantity"
          >
            −
          </Button>
          <span className="flex-1 px-4 py-2 text-center border-x border-gray-400/60 text-sm md:text-base">
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            onClick={increaseQuantity}
            className="px-4 py-2 font-medium text-gray-600 hover:bg-transparent focus:outline-none"
            aria-label="Increase quantity text-md md:text-2xl"
          >
            +
          </Button>
        </div>
        <Button
          type="button"
          onClick={handleAddToCart}
          size="sm"
          effect="shine"
          disabled={addToCartLoading}
          title={
            productExistsInCart(product._id)
              ? "Go to Cart"
              : addToCartLoading
              ? "Adding to cart"
              : "Click to add in cart"
          }
          className="rounded-none w-[150px] md:w-[200px] bg-primary-clr text-white py-2 hover:bg-green-700 transition text-md md:text-2xl"
        >
          {productExistsInCart(product._id) ? (
            "Go to Cart"
          ) : (
            <span className="flex-center gap-2">
              Add To Cart{" "}
              {addToCartLoading && <LuLoaderCircle className="animate-spin" />}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
