"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCart } from './CartProvider';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const { addToCart: cartAddToCart } = useCart();

  useEffect(() => {
    if (session?.user) {
      fetchWishlist();
    }
  }, [session]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch("/api/account/wishlist");
      if (response.ok) {
        const data = await response.json();
        setWishlistProducts(data.wishlist || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await fetch("/api/account/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        fetchWishlist();
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch("/api/account/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        fetchWishlist();
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistProducts.some(product => product._id === productId);
  };

  const addAllToCart = async (products) => {
    for (const product of products) {
      if (!product.inCart) {
        await cartAddToCart(product, 1, product.variants[0]);
      }
    }
    router.push('/account/cart');
    toast.success('All available items added to cart!');
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistProducts, addToWishlist, removeFromWishlist, isInWishlist, addAllToCart, cartAddToCart }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};