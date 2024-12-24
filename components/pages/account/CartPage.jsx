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
    <div className={`w-full h-fit p-4 md:p-8 lg:p-16 xl:p-20 mt-28 ${pt}`}>
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Shopping Cart</h2>

        {/* Cart Table */}
        {cartItems.length > 0 ? (
          <>
            <CartTable />

            {/* Total and Actions */}
            <div className="w-full mt-8 flex-between flex-col lg:flex-row">
              <Link href="/auth/sign-up">
                <Button className="mb-4 lg:mb-0 bg-primary-clr text-white py-2 rounded-none hover:bg-green-700 transition">
                  Continue Shopping
                </Button>
              </Link>
              <div className="text-lg font-semibold mt-4 lg:mt-0 lg:ml-8">
                Total Price:{" "}
                <span className="text-primary-clr">₹{totalPrice}</span>
              </div>
              <Link href="/auth/sign-up">
                <Button className="mb-4 lg:mb-0 bg-primary-clr text-white py-2 rounded-none hover:bg-green-700 transition">
                  Check Out
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
    updateCartItem(itemId, action, 1); // Calling updateCartItem with action and quantity 1
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-600 py-4 px-6 text-left">
              Image
            </th>
            <th className="border border-gray-600 py-4 px-6 text-left">
              Product Name
            </th>
            <th className="border border-gray-600 py-4 px-6 text-left">
              Price
            </th>
            <th className="border border-gray-600 py-4 px-6 text-left">
              Quantity
            </th>
            <th className="border border-gray-600 py-4 px-6 text-left">
              Action
            </th>
            <th className="border border-gray-600 py-4 px-6 text-left">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-600 py-4 px-6">
                {item?.variant?.image_link ? (
                  <Image
                    src={item?.variant?.image_link}
                    alt={item?.productId?.title}
                    width={100}
                    height={100}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <ImageOff className="w-16 h-16 object-cover" />
                )}
              </td>
              <td className="border border-gray-600 py-4 px-6">
                {item?.productId?.title}
              </td>
              <td className="border border-gray-600 py-4 px-6">
                ₹
                {item?.productId?.salePrice
                  ? item?.productId?.salePrice.toLocaleString()
                  : item?.productId?.price.toLocaleString()}
              </td>
              <td className="w-full h-full py-4 px-6 flex-center">
                {/* Decrement button */}
                <Button
                  variant="outline"
                  onClick={() =>
                    handleQuantityChange(item?._id, "decrement-quantity")
                  }
                >
                  <TfiMinus className="text-lg text-gray-700" />
                </Button>
                <span className="w-fit text-center mx-2 px-4 border border-gray-600 rounded-lg">
                  {item?.quantity}
                </span>
                {/* Increment button */}
                <Button
                  variant="outline"
                  onClick={() =>
                    handleQuantityChange(item?._id, "increment-quantity")
                  }
                >
                  <TfiPlus className="text-lg text-gray-700" />
                </Button>
              </td>
              <td className="border border-gray-600 py-4 px-6 text-center">
                <RxCross1
                  onClick={() => removeCartItem(item?.id)}
                  color="red"
                  className="cursor-pointer active:scale-90 ease-in-out duration-200"
                />
              </td>
              <td className="border border-gray-600 py-4 px-6">
                ₹
                {item?.productId?.salePrice
                  ? (
                      item?.productId?.salePrice * item?.quantity
                    ).toLocaleString()
                  : (item?.productId?.price * item?.quantity).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
