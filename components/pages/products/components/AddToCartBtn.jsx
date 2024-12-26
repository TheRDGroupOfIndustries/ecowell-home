"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

export default function AddToCartBtn() {
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const handleAddToCart = () => {
        // Add your cart logic here
        console.log(`Adding ${quantity} items to cart`);
    };
    return (
        <div className='bg-gray-200 fixed z-10 bottom-3 right-3 flex flex-row items-center p-2 border border-gray-400 '>
            <div className="flex items-center border border-gray-400 h-9 ">
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
            <Button
                onClick={handleAddToCart}
                size="sm"
                className=" rounded-none w-[200px] bg-primary-clr text-white py-2  hover:bg-green-700 transition"
            >
                Add To Cart
            </Button>
        </div>
    )
}
