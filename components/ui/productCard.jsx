"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "./button";
import { useCart } from "@/context/CartProvider";
import Link from "next/link";

const ProductCard = ({ product, loading = false }) => {
  // console.log("product", product);

  const { addToCart } = useCart();

  const [imageError, setImageError] = useState(false);
  const [imageTwoError, setImageTwoError] = useState(false);

  return (
    <div
      className={`w-[280px] group rounded-lg shadow-md border p-2 ${
        loading
          ? "animate-pulse"
          : "bg-white hover:bg-[#BDC3C7] ease-in-out duration-300"
      } overflow-hidden`}
    >
      <Link href={`/products/${product?.sku}`}>
        <div className="w-full h-[200px] relative bg-gray-200 overflow-hidden">
          {!loading && product?.discount && product?.discount > 0 ? (
            <div className="absolute top-0 left-0 z-50 bg-primary-clr text-white text-xs font-bold px-2 py-1 rounded-tr-lg">
              {Math.round(product?.discount)}% OFF
            </div>
          ) : (
            ""
          )}
          {!loading ? (
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
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
        </div>
        <div className="mt-1">
          <h3
            className={`text-sm font-bold line-clamp-1 ${
              loading ? "bg-gray-300 h-4 w-3/4" : ""
            }`}
          >
            {!loading && product?.title}
          </h3>
          <div
            className={`w-fit flex items-center text-gray-950 gap-1 text-xs my-2 ${
              loading ? "bg-gray-300" : "bg-white"
            } px-1 py-0.5 rounded-sm`}
          >
            {!loading ? (
              <>
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span>
                  {product?.ratings ? "|" + product?.ratings.toFixed(1) : "| 0"}
                </span>
                <span className="text-gray-500">
                  {product?.reviews_number
                    ? "(" + product?.reviews_number + ")"
                    : ""}
                </span>
              </>
            ) : (
              <div className="w-16 h-3 bg-gray-300"></div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-lg text-primary-clr font-bold ${
                loading ? "bg-gray-300 h-6 w-20" : ""
              }`}
            >
              {!loading
                ? product?.salePrice
                  ? `₹${product?.salePrice?.toLocaleString()}/-`
                  : `₹${product?.price?.toLocaleString()}/-`
                : ""}
            </span>

            {!loading &&
              product?.price &&
              product?.price !== product?.salePrice && (
                <span className="text-sm line-through text-gray-500">
                  ₹{product?.price?.toLocaleString()}/-
                </span>
              )}
          </div>
        </div>
      </Link>
      <Button
        onClick={() => addToCart(product, 1, product.variants[0])}
        disabled={loading}
        effect="gooeyLeft"
        className={`mt-2 w-full ${
          loading ? "bg-gray-300" : "bg-primary-clr"
        } text-white py-2 rounded-md hover:bg-green-700 transition`}
      >
        {loading ? (
          <div className="h-4 w-3/4 bg-gray-400"></div>
        ) : (
          "Add To Cart"
        )}
      </Button>
    </div>
  );
};

export default ProductCard;
