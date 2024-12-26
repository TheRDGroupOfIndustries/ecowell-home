"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartProvider";
import { Button } from "./button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function AddToCartmodel({ loading, product }) {
  //   console.log("product", product);
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button
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
      </DialogTrigger>
      <DialogContent className="z-50 mt-10  ">
        <Modal product={product} />
      </DialogContent>
    </Dialog>
  );
}

const Modal = ({ product }) => {
  const [imageTwoError, setImageTwoError] = useState(false);
  const [variantCheck, setVariantCheck] = useState(product?.variants[0].flavor);
  //   console.log("variantCheck", variantCheck);

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="bg-white max-h-[80vh] p-6 rounded-lg w-full mx-4 relative">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/3">
          <Image
            src={
              imageTwoError
                ? "/placeholder.svg"
                : (product?.variants && product?.variants[0]?.images[1]
                    ? product?.variants && product?.variants[0]?.images[1]
                    : product?.variants && product?.variants[0]?.images[0]) ||
                  "/placeholder.svg"
            }
            alt={product?.title}
            onError={() => setImageTwoError(true)}
            className="w-full object-contain"
            width={280}
            height={280}
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>

          <div className="flex items-center gap-2">
            <span className={`text-lg text-primary-clr font-bold `}>
              {product?.salePrice
                ? `₹${product?.salePrice?.toLocaleString()}/-`
                : `₹${product?.price?.toLocaleString()}/-`}
            </span>

            {product?.price && product?.price !== product?.salePrice && (
              <span className="text-sm line-through text-gray-500">
                ₹{product?.price?.toLocaleString()}/-
              </span>
            )}
          </div>

          {/* Product Details Section */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <div className="text-sm space-y-2">
              <p>{product?.description}</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">variants</h3>
            <div className="flex max-w-[200px] items-center  h-9 ">
              {product.variants.map((variant, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => setVariantCheck(variant.flavor)}
                  className={`px-4 py-2 text-xl hover:bg-transparent font-medium text-gray-600 border border-gray-400 "
                                aria-label="Decrease quantity ${
                                  variant.flavor === variantCheck
                                    ? "bg-slate-100"
                                    : ""
                                }`}
                >
                  {variant.flavor}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}

          <div className="mb-4 flex flex-col gap-2">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex max-w-[200px] items-center border border-gray-400 h-9 ">
              <Button
                variant="ghost"
                onClick={decreaseQuantity}
                className="px-4 py-2 text-xl hover:bg-transparent font-medium text-gray-600  focus:outline-none"
                aria-label="Decrease quantity"
              >
                −
              </Button>
              <span className="flex-1 px-4 py-2 text-center border-x">
                {quantity}
              </span>
              <Button
                variant="ghost"
                onClick={increaseQuantity}
                className="px-4 py-2 text-xl font-medium text-gray-600 hover:bg-transparent focus:outline-none"
                aria-label="Increase quantity"
              >
                +
              </Button>
            </div>
            <div className=" flex flex-row items-center gap-2">
              <Button
                onClick={() =>
                  addToCart(product, quantity, product.variants[0])
                }
                size="sm"
                className=" rounded-none w-[200px] bg-primary-clr text-white py-2  hover:bg-green-700 transition"
              >
                Add To Cart
              </Button>
              <Button
                size="sm"
                className=" rounded-none w-[200px] bg-primary-clr text-white py-2  hover:bg-green-700 transition"
              >
                Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
