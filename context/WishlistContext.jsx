'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      fetchWishlist();
    }
  }, [session]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/account/wishlist');
      if (response.ok) {
        const data = await response.json();
        setWishlistProducts(data.wishlist);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await fetch('/api/account/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        fetchWishlist();
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch('/api/account/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        fetchWishlist();
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistProducts, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}