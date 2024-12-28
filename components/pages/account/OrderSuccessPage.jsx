"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ImageIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/loader";
import ReactCountUp from "@/components/ui/countUp";
import { formatDateString, getDeliveryDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const OrderSuccess = ({ orderId }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user?._id) return;
      try {
        const res = await fetch(`/api/order/get/${user?._id}/${orderId}`);
        const data = await res.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    if (!orderDetails || !user?._id) fetchOrderDetails();
  }, [user, orderId, orderDetails]);

  // console.log(orderDetails);

  return (
    <>
      <div className="mt-28 w-full">
        <div className="w-full flex items-center justify-center py-8 md:py-16">
          <div className="flex flex-col gap-2 justify-center items-center">
            <CheckCircle2
              fill="green"
              size={50}
              strokeWidth={3}
              color="white"
            />
            <h2 className="text-3xl font-black">THANK YOU</h2>
            <p className="text-gray-400 w-[90%] sm:w-full">
              Payment is successfully processed and your order is on the way
            </p>
            <p className="text-gray-400 text-nowrap font-semibold">Order ID: {orderId}</p>
          </div>
        </div>
        {!orderDetails ? (
          <Loader className="h-50" />
        ) : (
          <div className="h-fit bg-[#f4ede3] p-3 sm:p-6 md:p-10 lg:p-16">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">YOUR ORDER DETAILS</h2>
                {/* product listing */}
                {orderDetails?.products?.map((product, index) => {
                  return <ProductNode key={index} productDetails={product} />;
                })}
                {/* total price */}
                <div className="flex-between flex-row">
                  <span className="text-xl font-semibold">TOTAL</span>
                  <ReactCountUp
                    amt={orderDetails?.order_info?.total_price}
                    prefix="₹"
                    className=" text-xl font-semibold"
                  />
                </div>
              </div>
              {/* order info */}
              <div className="w-full flex flex-col gap-2">
                <div className="w-full grid grid-cols-2">
                  <div className="w-full flex flex-col gap-1">
                    <h5 className="text-base font-semibold">Summary</h5>
                    <p className="text-base">order ID: {orderId}</p>
                    <p className="text-base">
                      Order Date:{" "}
                      {formatDateString(orderDetails?.order_info?.order_date)}
                    </p>
                    <p className="text-base">
                      Order Total:{" "}
                      <ReactCountUp
                        amt={orderDetails?.order_info?.total_price}
                        prefix="₹"
                      />
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <h5 className="text-base font-semibold">
                      Shipping address
                    </h5>
                    <p className="text-base tracking-wider">
                      {orderDetails?.order_info?.address}
                    </p>
                    <p className="text-base">
                      {orderDetails?.order_info?.country} -{" "}
                      {orderDetails?.order_info?.pincode}
                    </p>
                    <p className="text-base">
                      Contact No. : {orderDetails?.order_info?.phone}
                    </p>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <h5 className="text-base font-semibold">Payment method</h5>
                  <p className="text-base">
                    Pay on Delivery (Cash/Card). Cash on delivery (COD)
                    available.
                  </p>
                  <p className="text-base">
                    Card/Net banking acceptance subject to device availability.
                  </p>
                </div>

                <div className="w-full bg-[#f9f9f9] p-4">
                  <h2 className="text-2xl text-center font-medium">
                    Expected date of delivery
                  </h2>
                  <h2 className="text-2xl text-center font-semibold ">
                    {getDeliveryDate(orderDetails?.order_info?.order_date)}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderSuccess;

const ProductNode = (productDetails) => {
  const productDetail = productDetails?.productDetails;
  // console.log(productDetail);

  const chosedVariant = productDetail?.product_id?.variants.find(
    (variant) => variant?.flavor === productDetail?.variant_flavor
  );

  // console.log(chosedVariant);

  return (
    <>
      <Link href={`/products/${productDetail?.product_id?.sku}`}>
        <div className="group grid grid-cols-[1fr_2fr_1fr_1fr] gap-3 items-center hover:shadow-md transition-transform duration-300">
          {chosedVariant ? (
            <div className="group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <Image
                src={chosedVariant?.images[0]}
                alt={chosedVariant?.flavor}
                width={100}
                height={150}
                className="animate-fade-in group-hover:hidden transition-transform"
              />
              <Image
                src={
                  chosedVariant?.images[1]
                    ? chosedVariant?.images[1]
                    : chosedVariant?.images[0]
                }
                alt={chosedVariant?.flavor}
                width={100}
                height={150}
                className="animate-fade-in hidden group-hover:block transition-transform"
              />
            </div>
          ) : (
            <ImageIcon src={""} alt={""} width={100} height={150} />
          )}
          <div className="w-full flex flex-col gap-1">
            <h5 className="text-base font-semibold">
              {productDetail?.product_id?.title}
            </h5>
            <p className="text-base">{productDetail?.variant_flavor}</p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <h5 className="text-base font-semibold">Quantity</h5>
            <p className="text-base">
              <ReactCountUp amt={productDetail?.quantity} />
            </p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <h5 className="text-base font-semibold">Price</h5>
            <p className="text-base">
              <ReactCountUp
                amt={
                  productDetail?.product_id?.salePrice ||
                  productDetail?.product_id?.price ||
                  0
                }
                prefix="₹"
              />
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};
