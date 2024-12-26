"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartProvider";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Loader from "@/components/ui/loader";
import ReactCountUp from "@/components/ui/countUp";

const MyOrders = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { userOrderList, setUserOrderList, cancelPlacedOrder } = useCart();

  const [isNoUserOrders, setIsNoUserOrders] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all-orders");

  const [selectedOrder, setSelectedOrder] = useState(null); // tracking selected order for cancellation
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility

  useEffect(() => {
    const fetchUserOrder = async () => {
      if (!user?._id) return;
      try {
        const response = await fetch(`/api/order/get/${user?._id}`);
        const data = await response.json();

        if (data.status === 404) setIsNoUserOrders(true);
        else {
          setUserOrderList(data?.orders);
          setIsNoUserOrders(false);
        }
        console.log("User Orders:", data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchUserOrder();
  }, [setUserOrderList, user]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleCopy = (orderId) => {
    navigator.clipboard.writeText(orderId);
    toast.success("Copied Order ID!");
  };

  const filteredOrders =
    !isNoUserOrders && userOrderList && Array.isArray(userOrderList)
      ? userOrderList.filter((order) =>
          activeTab === "all-orders"
            ? true
            : order.order_info.status === activeTab
        )
      : [];

  const handleCancelClick = (orderId) => {
    setSelectedOrder(orderId);
    setIsDialogOpen(true);
  };

  const handleConfirmCancellation = async () => {
    if (selectedOrder) {
      await cancelPlacedOrder(selectedOrder);
      setIsDialogOpen(false);
      setSelectedOrder(null);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-28 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl font-semibold text-primary-clr">
          Order History
        </h2>

        {/* Tab Navigation */}

        {isNoUserOrders && !loading ? (
          <div>
            <p>No orders found.</p>
            <Link href="/products">
              <Button
                effect="gooeyRight"
                className="mt-4 bg-secondary-clr text-white py-2 px-6 rounded-md hover:bg-[#b28714] transition"
              >
                CONTINUE SHOPPING
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
              {[
                "all-orders",
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
              ].map((tab, index) => (
                <li key={tab || index}>
                  <Button
                    effect={
                      activeTab === tab
                        ? "shine"
                        : (index + 1) / 2
                        ? "gooeyRight"
                        : "gooeyLeft"
                    }
                    className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
                      activeTab === tab
                        ? "bg-green-700 text-white"
                        : "bg-white text-green-700 hover:bg-primary-clr hover:text-white"
                    }`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {capitalizeHeader(tab)}
                  </Button>
                </li>
              ))}
            </ul>
            <hr />
            {/* Orders List */}
            {loading ? (
              <Loader className="h-50" />
            ) : filteredOrders.length > 0 ? (
              <Accordion type="single" collapsible>
                {filteredOrders.map((order) => (
                  <AccordionItem
                    key={order.order_info.order_id}
                    value={order.order_info.order_id}
                  >
                    <AccordionTrigger className="flex justify-between items-center px-4 py-2 border-b border-gray-200 hover:no-underline hover:shadow-xl">
                      <div className="w-full flex items-center gap-3">
                        <Image
                          src="/assets/orderIcon.png"
                          alt="Order Icon"
                          width={50}
                          height={50}
                        />
                        <div>
                          <p className="mb-2 font-bold">
                            Total:{" "}
                            <ReactCountUp
                              amt={order?.order_info?.total_price}
                              prefix="₹"
                              className="text-primary-clr"
                            />
                          </p>
                          <p className="mb-0 text-green-700 font-bold">
                            Order Placed at:{" "}
                            {new Date(
                              order.order_info.order_date
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 mr-2 rounded-full text-sm ${
                          order.order_info.status === "delivered"
                            ? "bg-green-700 text-white"
                            : order.order_info.status === "shipped"
                            ? "bg-blue-700 text-white"
                            : order.order_info.status === "pending"
                            ? "bg-yellow-500 text-black"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {capitalizeHeader(order.order_info.status)}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-gray-50">
                      <div className="mb-2 flex-between gap-4">
                        <p>
                          <span className="text-green-700 font-bold">
                            Order ID:
                          </span>{" "}
                          {order.order_info.order_id}
                          <button
                            className="ml-2 text-blue-500 underline"
                            onClick={() =>
                              handleCopy(order.order_info.order_id)
                            }
                          >
                            copy
                          </button>
                        </p>
                        {order.order_info.status === "pending" && (
                          <Button
                            onClick={() =>
                              handleCancelClick(order.order_info.order_id)
                            }
                            effect="gooeyRight"
                            variant="destructive"
                            size="sm"
                          >
                            Cancel Order
                          </Button>
                        )}
                      </div>
                      <h5 className="font-semibold">Products:</h5>
                      <ul>
                        {order.products.map((product) => (
                          <OrderItem
                            key={product.product_id._id}
                            product={product}
                          />
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-center mt-2">
                No orders are in {capitalizeHeader(activeTab)}
              </p>
            )}{" "}
          </>
        )}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              No, Go Back
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancellation}>
              Yes, Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyOrders;

export const capitalizeHeader = (str) => {
  return str
    .split(/[_-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const OrderItem = ({ product }) => {
  return (
    <li className="flex items-center gap-3 mb-3">
      <Image
        src={product.product_id.variants[0].images[0]}
        alt={product.product_id.title}
        width={80}
        height={80}
        className="rounded-lg"
      />
      <div className="flex flex-col gap-1">
        <Link
          href={`/products/${product?.product_id?.sku}`}
          className="text-blue-500 underline font-semibold"
        >
          {product?.product_id?.title}
        </Link>
        <p className="text-sm">Flavor: {product?.variant_flavor}</p>
        <p className="text-sm">
          Quantity: <ReactCountUp amt={product?.quantity} duration={1.5} />
        </p>
        <p className="text-sm">
          Price: <ReactCountUp amt={product?.product_id?.price} prefix="₹" />
        </p>
      </div>
    </li>
  );
};
