"use client";

import { useSession } from "next-auth/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { data: session } = useSession(); // console.log("session", session);

  const router = useRouter();
  const userId = session?.user?._id;

  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [userOrderList, setUserOrderList] = useState([]);
  const [placingOrder, setPlacingOrder] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await fetch(`/api/products/cart/get/${userId}`, {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await response.json();
      // console.log("data of cart:", data);
      if (response.ok) {
        setCartItems(data?.cart?.items || []);
        setTotalQuantity(data?.cart?.totalQuantity || 0);
        setTotalPrice(data?.cart?.totalPrice || 0);
      } // else {
      //   toast.error(data?.message || "Failed to fetch cart items.");
      // }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [userId]);

  const addToCart = async (product, quantity, variant) => {
    // console.log("add to cart variant", product, quantity, variant);
    if (!userId) {
      router.push("/auth/sign-in");
      return;
    }

    try {
      const selectedVariant = {
        flavor: variant.flavor,
        image_link: variant.images[0],
        stock: variant.stock,
      };

      const newCartItemData = {
        userId,
        productId: product._id,
        variant: selectedVariant,
        quantity,
      };

      // console.log("new Cart Item Data", newCartItemData);

      const response = await fetch("/api/products/cart/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCartItemData),
      });

      const data = await response.json();

      if (response.ok) {
        // console.log("cartTotal: ", data?.updatedCart, data?.updatedCart?.items);

        if (data.status === 200) {
          setCartItems(data?.updatedCart?.items || []);
          setTotalQuantity(data?.updatedCart?.totalQuantity || 0);
          setTotalPrice(data?.updatedCart?.totalPrice || 0);

          toast.success("Product added to cart Successfully!");
          return;
        }
      } else {
        toast.error(data?.error || "Failed to add product to cart.");
        return;
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong, please try again later.");
    }
  };

  const updateCartItem = async (cartItemId, action, quantity, variant) => {
    // console.log("update to cart variant", cartItemId, quantity, variant);
    if (!userId) {
      router.push("/auth/sign-in");
      return;
    }

    try {
      const selectedVariant = {
        flavor: variant?.flavor,
        image_link: variant?.images[0],
        stock: variant?.stock,
      };

      const updatedCartItemData = {
        userId,
        cartItemId,
        action,
        quantity,
        variant: selectedVariant,
      };

      // console.log("updated Cart Item Data", updatedCartItemData);

      const response = await fetch("/api/products/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCartItemData),
      });

      const data = await response.json();

      // console.log("cartTotal: ", data);
      if (response.ok) {
        if (data?.status === 400) {
          return toast.error(
            data?.error ||
              "Failed to update product quantity, please try again."
          );
        }
        setCartItems(data?.updatedCart?.items || []);
        setTotalQuantity(data?.updatedCart?.totalQuantity || 0);
        setTotalPrice(data?.updatedCart?.totalPrice || 0);

        toast.success(data?.message || "Product quantity updated!");
      } else {
        // Handle error response
        toast.error(
          data?.error || "Failed to update product quantity, please try again."
        );
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong, please try again later.");
    }
  };

  const removeCartItem = async (cartItemId) => {
    // console.log("add to cart variant", cartItemId);
    if (!userId) {
      router.push("/auth/sign-in");
      return;
    }

    try {
      const response = await fetch("/api/products/cart/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cartItemId }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === 400) {
          return toast.error(
            data?.error ||
              "Failed to remove product from the cart, please try again."
          );
        }
        setCartItems(data?.updatedCart?.items || []);
        setTotalQuantity(data?.updatedCart?.totalQuantity || 0);
        setTotalPrice(data?.updatedCart?.totalPrice || 0);

        // console.log("cartTotal: ", data?.updatedCart?.items || []);
        toast.success(data?.message || "Removed Product from your cart!");
      } else {
        // Handle error response
        toast.error(
          data?.error ||
            "Failed to remove product from the cart, please try again."
        );
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong, please try again later.");
    }
  };

  const noOfCartItems = cartItems.length;

  const productExistsInCart = (productId) => {
    return cartItems.some((item) => item.productId._id === productId);
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const placeOrder = async (order_info, products) => {
    // console.log("order_info", products);

    if (!userId) {
      router.push("/auth/sign-in");
      return;
    }
    try {
      setPlacingOrder(true);
      const orderResponse = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, order_info, products }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResult.success) {
        toast.error(orderResult.error || "Failed to create order");
        return false;
      }

      if (orderResult.status === 200) {
        setUserOrderList(orderResult?.updatedOrders || []);
        router.push(
          `/account/orders/order-success?orderId=${orderResult?.orderId}`
        );
        toast.success(orderResult?.message || "Order placed successfully!");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Something went wrong while placing your order");
      return false;
    } finally {
      setPlacingOrder(false);
    }
  };

  const cancelPlacedOrder = async (order_id) => {
    try {
      const response = await fetch("/api/order/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          order_id,
          updatedStatus: "cancelled",
        }),
      });

      const data = await response.json();
      // console.log("cancel order data:", data);

      if (response.ok) {
        if (data.status === 404) {
          return toast.error(
            data?.error || "Failed to cancel order, please try again."
          );
        }
        setUserOrderList(data?.updatedOrders?.orders || userOrderList || []);
        toast.success(data?.message || "Order cancelled successfully!");
      } else {
        toast.error(data?.error || "Failed to cancel order, please try again.");
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        noOfCartItems,
        totalQuantity,
        totalPrice,
        addToCart,
        removeCartItem,
        productExistsInCart,
        updateCartItem,

        placeOrder,
        placingOrder,
        cancelPlacedOrder,
        userOrderList,
        setUserOrderList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
