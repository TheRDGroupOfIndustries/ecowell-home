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
      <div
        className={`w-[280px] group rounded-lg shadow-md border p-2 ${
          loading
            ? "bg-slate-300 animate-pulse"
            : "bg-white hover:bg-[#BDC3C7] ease-in-out duration-300"
        } overflow-hidden`}
      >
        <div className="w-full h-[200px] relative bg-gray-100 overflow-hidden">
          {!loading && product?.discount && product?.discount > 0 ? (
            <div className="absolute top-0 left-0 z-50 bg-primary-clr text-white text-xs font-bold px-2 py-1 rounded-tr-lg">
              {Math.round(product?.discount)}% OFF
            </div>
          ) : (
            ""
          )}
          {!loading && (
            <>
              <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 ease-in-out duration-300 overflow-hidden">
                <Image
                  src={
                    imageError
                      ? "/placeholder.svg"
                      : (product?.variants &&
                          product?.variants[0]?.images[0]) ||
                        "/placeholder.svg"
                  }
                  alt={product?.title}
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
                      : (product?.variants && product?.variants[0]?.images[1]
                          ? product?.variants && product?.variants[0]?.images[1]
                          : product?.variants &&
                            product?.variants[0]?.images[0]) ||
                        "/placeholder.svg"
                  }
                  alt={product?.title}
                  onError={() => setImageTwoError(true)}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </div>
            </>
          )}
        </div>
        <div className="mt-1">
          <h3
            className={`${
              loading && "h-5 w-40 bg-slate-100"
            } text-sm font-bold`}
          >
            {!loading && product?.title}
          </h3>
          <div className="w-fit flex items-center text-gray-950 gap-1 text-xs my-2 bg-white px-1 py-0.5 rounded-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span>
              {product?.ratings
                ? "|" + product?.ratings.toFixed(1)
                : loading
                ? ""
                : "| 0"}
            </span>
            <span className="text-gray-500">
              {!loading && product?.reviews_number
                ? "(" + product?.reviews_number + ")"
                : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`${
                loading && "h-4 w-20 bg-slate-100"
              } text-lg font-bold`}
            >
              {!loading
                ? product?.salePrice
                  ? `₹${product?.salePrice}/-`
                  : `₹${product?.salePrice}/-`
                : ""}
            </span>

            {!loading && product?.salePrice && (
              <span className="text-sm line-through text-gray-500">
                {product?.salePrice}
              </span>
            )}
          </div>
          <Button
            disabled={loading}
            className={`mt-2 w-full ${
              loading ? "bg-gray-100 animate-pulse" : "bg-primary-clr"
            } text-white py-2 rounded-md hover:bg-green-700 transition`}
          >
            {!loading && "Add To Cart"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
