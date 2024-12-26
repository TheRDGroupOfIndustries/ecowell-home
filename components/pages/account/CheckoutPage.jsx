"use client";

import { Button } from "@/components/ui/button";
import ReactCountUp from "@/components/ui/countUp";
import { useCart } from "@/context/CartProvider";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Checkout = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const { placeOrder, placingOrder, cartItems, totalPrice } = useCart();

  const [billingDetails, setBillingDetails] = useState({
    profileImage: "/assets/user.png",
    dateOfBirth: "",
    gender: "",

    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "India",
    state: "",
    city: "",
    flatPlot: "",
    postalCode: "",
    cod: true,
  });

  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (user) {
      setBillingDetails((prev) => ({
        ...prev,
        flatPlot: user?.flat_plot || "",
        profileImage: user?.profile_image || "/assets/user.png",
        dateOfBirth: user?.date_of_birth || "",
        gender: user?.gender || "",

        firstName: user?.first_name || "",
        lastName: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone_number || "",
        address: user?.address || "",
        country: user?.country || "India",
        state: user?.region_state || "",
        city: user?.city || "",
        postalCode: user?.zip_code || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const clearInput = (name) => {
    setBillingDetails((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!billingDetails) return;

    const order_info = {
      payment_method: billingDetails.cod ? "cod" : "online",
      total_price: totalPrice - discount,

      first_name: billingDetails.firstName,
      last_name: billingDetails.lastName,
      phone: billingDetails.phone,
      email: billingDetails.email,
      address: billingDetails.address,
      country: billingDetails.country,
      state: billingDetails.state,
      city: billingDetails.city,
      pincode: billingDetails.postalCode,

      order_date: new Date().toISOString(),

      status: "pending",
    };

    const products = cartItems?.map((item) => ({
      product_id: item.productId._id,
      variant_flavor: item.variant.flavor,
      quantity: item.quantity,
    }));

    const success = await placeOrder(order_info, products);
    console.log(success);
  };

  return (
    <div className="h-fit mt-32 bg-yellow-100/70 py-12 select-none overflow-hidden">
      <div className="container mx-auto px-4">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Left Column - Shipping & Payment */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="firstName" className="block mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                      className="p-2 border rounded w-full"
                      value={billingDetails.firstName}
                      onChange={handleChange}
                    />
                    {billingDetails.firstName && (
                      <span
                        className="absolute right-2 top-8 text-xl cursor-pointer"
                        onClick={() => clearInput("firstName")}
                      >
                        &times;
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <label htmlFor="lastName" className="block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                      className="p-2 border rounded w-full"
                      value={billingDetails.lastName}
                      onChange={handleChange}
                    />
                    {billingDetails.lastName && (
                      <span
                        className="absolute right-2 top-8 text-xl cursor-pointer"
                        onClick={() => clearInput("lastName")}
                      >
                        &times;
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="email" className="block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={billingDetails.email}
                    onChange={handleChange}
                  />
                  {billingDetails.email && (
                    <span
                      className="absolute right-2 top-8 text-xl cursor-pointer"
                      onClick={() => clearInput("email")}
                    >
                      &times;
                    </span>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="phone" className="block mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    className="w-full p-2 border rounded"
                    value={billingDetails.phone}
                    onChange={handleChange}
                  />
                  {billingDetails.phone && (
                    <span
                      className="absolute right-2 top-8 text-xl cursor-pointer"
                      onClick={() => clearInput("phone")}
                    >
                      &times;
                    </span>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="address" className="block mb-1">
                    Address
                  </label>
                  <textarea
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    className="w-full p-2 border rounded"
                    value={billingDetails.address}
                    onChange={handleChange}
                  />
                  {billingDetails.address && (
                    <span
                      className="absolute right-2 top-8 text-xl cursor-pointer"
                      onClick={() => clearInput("address")}
                    >
                      &times;
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="country" className="block mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Country"
                      className="p-2 border rounded w-full"
                      value={billingDetails.country}
                      onChange={handleChange}
                    />
                    {billingDetails.country && (
                      <span
                        className="absolute right-2 top-8 text-xl cursor-pointer"
                        onClick={() => clearInput("country")}
                      >
                        &times;
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <label htmlFor="state" className="block mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="State"
                      className="p-2 border rounded w-full"
                      value={billingDetails.state}
                      onChange={handleChange}
                    />
                    {billingDetails.state && (
                      <span
                        className="absolute right-2 top-8 text-xl cursor-pointer"
                        onClick={() => clearInput("state")}
                      >
                        &times;
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <label htmlFor="city" className="block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      className="p-2 border rounded w-full"
                      value={billingDetails.city}
                      onChange={handleChange}
                    />
                    {billingDetails.city && (
                      <span
                        className="absolute right-2 top-8 text-xl cursor-pointer"
                        onClick={() => clearInput("city")}
                      >
                        &times;
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <label htmlFor="postalCode" className="block mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      placeholder="Postal Code"
                      className="p-2 border rounded w-full"
                      value={billingDetails.postalCode}
                      onChange={handleChange}
                    />
                    {billingDetails.postalCode && (
                      <span
                        className="absolute right-2 top-8 text-xl cursor-pointer"
                        onClick={() => clearInput("postalCode")}
                      >
                        &times;
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <div className="flex-between">
              <h3 className="text-2xl font-semibold mb-6">Products</h3>
              <h3 className="text-2xl font-semibold mb-6">Totals</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                {cartItems?.map((item) => (
                  <div key={item.id} className="flex-between items-center">
                    <span>{`${item?.productId?.title} x ${item.quantity}`}</span>
                    <ReactCountUp
                      amt={
                        item?.productId?.salePrice
                          ? item?.productId?.salePrice * item.quantity
                          : item?.productId?.price * item.quantity
                      }
                      prefix="₹"
                    />
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex-between">
                  <span>Subtotal</span>
                  <ReactCountUp amt={totalPrice} prefix="₹" />
                  {/* <span>{`$${totalPrice.toFixed(2)}`}</span> */}
                </div>
                <div className="flex-between">
                  <span>Discount</span>
                  <ReactCountUp amt={discount} prefix="₹" />
                  {/* <span>{`-$${discount.toFixed(2)}`}</span> */}
                </div>
                <div className="border-t pt-4">
                  <div className="flex-between font-semibold text-xl text-primary-clr">
                    <span>Total</span>
                    <ReactCountUp amt={totalPrice - discount} prefix="₹" />
                    {/* <span>{`$${(totalPrice - discount).toFixed(2)}`}</span> */}
                  </div>
                </div>
              </div>
              <div className="flex-between gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="cod"
                    checked={billingDetails.cod}
                    onChange={handleChange}
                    className="cursor-pointer"
                  />
                  <span>CoD (Cash on Delivery)</span>
                </label>
                <Button
                  type="submit"
                  disabled={placingOrder}
                  className="bg-secondary-clr text-white py-2 px-6 rounded-md hover:bg-[#b28714] transition"
                >
                  {placingOrder ? "Placing Order" : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
