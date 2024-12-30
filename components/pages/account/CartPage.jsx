"use client";

import { Button } from "@/components/ui/button";
import ReactCountUp from "@/components/ui/countUp";
import { useCart } from "@/context/CartProvider";
import { useNotification } from "@/context/NotificationProvider";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { TfiMinus, TfiPlus } from "react-icons/tfi";
import { LuLoaderCircle } from "react-icons/lu";

const Cart = () => {
  const { cartItems, totalPrice } = useCart();
  const { pt } = useNotification();

  return (
    <div className={`w-full h-fit md:p-8 mt-28 ${pt} bg-[#f8f1e9]`}>
      <div className="container mx-auto">
        {cartItems.length > 0 ? (
          <>
            {/* Cart Table */}
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <CartTable />
            </div>
          </>
        ) : (
          <div className="text-center text-lg">
            <p>Your cart is empty.</p>
          </div>
        )}
        {/* Total and Actions */}
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-between">
          <Link href="/products">
            <Button
              size="sm"
              effect="gooeyRight"
              className="mt-4 w-full bg-primary-clr text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              CONTINUE SHOPPING
            </Button>
          </Link>
          {totalPrice > 0 && (
            <div className="text-xl font-semibold mt-4 lg:mt-0">
              Total Price:{" "}
              <ReactCountUp
                amt={totalPrice}
                duration={1.5}
                prefix="₹"
                className="text-2xl text-primary-clr"
              />
            </div>
          )}
          {cartItems.length > 0 && (
            <Link href="/account/cart/checkout">
              <Button
                size="sm"
                effect="gooeyRight"
                className="mt-4 w-full bg-primary-clr text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                CHECK OUT
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

const CartTable = () => {
  const {
    cartItems,
    removeCartItem,
    updateCartItem,
    removeFromCartLoading,
    updateCartLoading,
  } = useCart();
  const handleQuantityChange = (itemId, action) => {
    updateCartItem(itemId, action, 1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="border-b border-gray-300">
          <tr>
            <th className="py-4 px-6">Image</th>
            <th className="py-4 px-6 text-nowrap ">Product Name</th>
            <th className="py-4 px-6">Price</th>
            <th className="py-4 px-6">Quantity</th>
            <th className="py-4 px-6">Action</th>
            <th className="py-4 px-6">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.reverse().map((item, index) => (
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
              <td className="py-4 px-6 text-sm min-w-[400px]  sm:w-full">
                {item?.productId?.title}
              </td>
              <td className="py-4 px-6">
                <ReactCountUp
                  amt={
                    item?.productId?.salePrice
                      ? item?.productId?.salePrice
                      : item?.productId?.price
                  }
                  prefix="₹"
                />
              </td>
              <td className="py-4 px-6  ">
                <div className="flex flex-row items-center  my-auto">
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-600"
                    onClick={() =>
                      handleQuantityChange(item?._id, "decrement-quantity")
                    }
                    disabled={updateCartLoading}
                    title={
                      updateCartLoading ? "Please wait" : "remove quantity"
                    }
                  >
                    {updateCartLoading ? (
                      <LuLoaderCircle className="animate-spin" />
                    ) : (
                      <TfiMinus />
                    )}
                  </Button>
                  <span className="mx-2 w-10 text-center">
                    {item?.quantity}
                  </span>
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-600"
                    onClick={() =>
                      handleQuantityChange(item?._id, "increment-quantity")
                    }
                    disabled={updateCartLoading}
                    title={
                      updateCartLoading ? "Please wait" : "add more quantity"
                    }
                  >
                    {updateCartLoading ? (
                      <LuLoaderCircle className="animate-spin" />
                    ) : (
                      <TfiPlus />
                    )}
                  </Button>
                </div>
              </td>
              <td className="py-4 px-6 text-center">
                <Button
                  variant="outline"
                  className="border-gray-400 text-gray-600"
                  onClick={() => removeCartItem(item?._id)}
                  disabled={removeFromCartLoading}
                  title={
                    removeFromCartLoading
                      ? "Please wait"
                      : "Remove item from cart"
                  }
                >
                  {removeFromCartLoading ? (
                    <LuLoaderCircle className="animate-spin" />
                  ) : (
                    <RxCross1
                      title="Remove from cart"
                      className="text-red-600 cursor-pointer"
                    />
                  )}
                </Button>
              </td>
              <td className="py-4 px-6">
                <ReactCountUp
                  amt={
                    item?.productId?.salePrice
                      ? item?.productId?.salePrice * item?.quantity
                      : item?.productId?.price * item?.quantity
                  }
                  prefix="₹"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
