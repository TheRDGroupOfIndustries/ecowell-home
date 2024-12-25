"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartProvider";
import { useNotification } from "@/context/NotificationProvider";
import { RxCross1 } from "react-icons/rx";
import { ImageOff } from "lucide-react";
import { TfiPlus, TfiMinus } from "react-icons/tfi";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cartItems, totalPrice } = useCart();
  const { pt } = useNotification();

  return (
    <div className={`w-full h-fit p-8 mt-28 ${pt} bg-[#f8f1e9]`}>
      <div className="container mx-auto">
        {cartItems.length > 0 ? (
          <>
            {/* Cart Table */}
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <CartTable />
            </div>

            {/* Total and Actions */}
            <div className="mt-8 flex flex-col lg:flex-row items-center justify-between">
              <Link href="/products">
                <Button
                  effect="gooeyRight"
                  className="bg-secondary-clr text-white py-2 px-6 rounded-md hover:bg-[#b28714] transition"
                >
                  CONTINUE SHOPPING
                </Button>
              </Link>
              <div className="text-xl font-semibold mt-4 lg:mt-0">
                Total Price:{" "}
                <span className="text-secondary-clr">
                  ₹
                  <span className="text-2xl">
                    {totalPrice.toLocaleString()}
                  </span>
                </span>
              </div>
              <Link href="/account/checkout">
                <Button
                  variant="custom"
                  // className="bg-[#d7a11b] text-white py-2 px-6 rounded-md hover:bg-[#b28714] transition"
                >
                  CHECK OUT
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-lg">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

const CartTable = () => {
  const { cartItems, removeCartItem, updateCartItem } = useCart();
  const handleQuantityChange = (itemId, action) => {
    updateCartItem(itemId, action, 1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#f8f1e9] border-b border-gray-300">
          <tr>
            <th className="py-4 px-6">Image</th>
            <th className="py-4 px-6">Product Name</th>
            <th className="py-4 px-6">Price</th>
            <th className="py-4 px-6">Quantity</th>
            <th className="py-4 px-6">Action</th>
            <th className="py-4 px-6">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="py-4 px-6">
                {item?.variant?.image_link ? (
                  <Image
                    src={item?.variant?.image_link}
                    alt={item?.productId?.title}
                    width={70}
                    height={70}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <ImageOff className="w-16 h-16 object-cover" />
                )}
              </td>
              <td className="py-4 px-6 text-sm">{item?.productId?.title}</td>
              <td className="py-4 px-6">
                ₹{item?.productId?.price.toLocaleString()}
              </td>
              <td className="py-4 px-6 flex items-center">
                <Button
                  variant="outline"
                  className="border-gray-400 text-gray-600"
                  onClick={() =>
                    handleQuantityChange(item?._id, "decrement-quantity")
                  }
                >
                  <TfiMinus />
                </Button>
                <span className="mx-2 w-10 text-center">{item?.quantity}</span>
                <Button
                  variant="outline"
                  className="border-gray-400 text-gray-600"
                  onClick={() =>
                    handleQuantityChange(item?._id, "increment-quantity")
                  }
                >
                  <TfiPlus />
                </Button>
              </td>
              <td className="py-4 px-6 text-center">
                <RxCross1
                  onClick={() => removeCartItem(item?._id)}
                  className="text-red-600 cursor-pointer"
                />
              </td>
              <td className="py-4 px-6">
                ₹{(item?.productId?.price * item?.quantity).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
