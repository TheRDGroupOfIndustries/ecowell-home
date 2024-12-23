"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "./button";

const ProductCard = ({ product, loading = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageTwoError, setImageTwoError] = useState(false);

  return (
    <>
      <div className="w-[280px] group bg-white hover:bg-[#BDC3C7] rounded-lg shadow-md border p-2 ease-in-out duration-300 overflow-hidden">
        {product.discount && (
          <div className="absolute z-50 bg-primary-clr text-white text-xs font-bold px-2 py-1 rounded-tr-lg">
            {product.discount}% OFF
          </div>
        )}

        <div className="w-full h-[200px] relative bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 ease-in-out duration-300 overflow-hidden">
            <Image
              src={
                imageError
                  ? "/placeholder.svg"
                  : (product.variants && product.variants[0]?.images[0]) ||
                    "/placeholder.svg"
              }
              alt={product.title}
              onError={() => setImageError(true)}
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 ease-in-out duration-300 overflow-hidden">
            <Image
              src={
                imageTwoError
                  ? "/placeholder.svg"
                  : (product.variants && product.variants[0]?.images[1]
                      ? product.variants && product.variants[0]?.images[1]
                      : product.variants && product.variants[0]?.images[0]) ||
                    "/placeholder.svg"
              }
              alt={product.title}
              onError={() => setImageTwoError(true)}
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="mt-1">
          <h3 className="text-sm font-bold">{product.title}</h3>
          <div className="w-fit flex items-center gap-1 text-xs my-2 bg-white px-1 py-0.5 rounded-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.ratings ? product.ratings.toFixed(1) : " "}</span>
            <span className="text-gray-500">
              ({product.reviews_number || 0})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              ₹{product.salePrice ? product.salePrice : product.price}/-
            </span>

            {product.salePrice && (
              <span className="text-sm line-through text-gray-500">
                {product.oldPrice}
              </span>
            )}
          </div>
          <Button className="mt-4 w-full bg-primary-clr text-white py-2 rounded-md hover:bg-green-700 transition">
            Add To Cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
