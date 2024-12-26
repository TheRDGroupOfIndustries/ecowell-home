"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Checkout = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const { placeOrder, placingOrder } = useCart();

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    phoneNumber: "",
    profileImage: "/public/pfp.png",
    dateOfBirth: "",
    gender: "",
    flatPlot: "",
    country: "India",
    regionState: "",
    zipCode: "",
    cod: true,
  });

  useEffect(() => {
    if (user) {
      setBillingDetails((prev) => ({
        ...prev,
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phoneNumber: user.phone_number || "",
        profileImage: user.profile_image || "/public/pfp.png",
        dateOfBirth: user.date_of_birth || "",
        gender: user.gender || "",
        flatPlot: user.flat_plot || "",
        address: user.address || "",
        country: user.country || "India",
        regionState: user.region_state || "",
        city: user.city || "",
        zipCode: user.zip_code || "",
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
    if (billingDetails) return;

    const orderInfo = {
      payment_method: billingDetails.cod ? "cod" : "online",
      first_name: billingDetails.firstName,
      last_name: billingDetails.lastName,
      total_price:
        cartTotal - currentDiscount > 0 ? cartTotal - currentDiscount : 0,
      order_date: new Date().toISOString(),
      phone: billingDetails.phone,
      email: billingDetails.email,
      address: billingDetails.address,
      city: billingDetails.city,
      state: billingDetails.state,
      country: billingDetails.country,
      pincode: billingDetails.pincode,
      status: "pending",
    };

    const products = cartItems.map((item) => ({
      product_id: item.productId._id,
      variant_flavor: item.variant.flavor,
      quantity: item.quantity,
    }));

    await placeOrder(orderInfo, products);
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
                  <label htmlFor="address" className="block mb-1">
                    Address
                  </label>
                  <input
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

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="cardNumber" className="block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    placeholder="Card Number"
                    className="w-full p-2 border rounded"
                    value={billingDetails.cardNumber}
                    onChange={handleChange}
                  />
                  {billingDetails.cardNumber && (
                    <span
                      className="absolute right-2 top-8 text-xl cursor-pointer"
                      onClick={() => clearInput("cardNumber")}
                    >
                      &times;
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="expiry" className="block mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      id="expiry"
                      placeholder="MM/YY"
                      className="p-2 border rounded w-full"
                      value={billingDetails.expiry}
                      onChange={handleChange}
                    />
                    {billingDetails.expiry && (
                      <span
                        className="absolute right-2 top-8 text-xl cursor-pointer"
                        onClick={() => clearInput("expiry")}
                      >
                        &times;
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <label htmlFor="cvv" className="block mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      id="cvv"
                      placeholder="CVV"
                      className="p-2 border rounded w-full"
                      value={billingDetails.cvv}
                      onChange={handleChange}
                    />
                    {billingDetails.cvv && (
                      <span
                        className="absolute right-2 top-8 text-xl cursor-pointer"
                        onClick={() => clearInput("cvv")}
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
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$99.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$104.00</span>
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
                  effect="gooeyRight"
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
