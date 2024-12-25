'use client'

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ShoppingCart, X } from 'lucide-react'

function WishlistPage() {
  const { wishlistProducts, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto py-10 mt-[130px]">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlistProducts.length > 0 ? (
        <Table className='text-base'>
          <TableCaption className='text-xl'>A list of your wishlist items.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wishlistProducts.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Link href={`/page/product/${item.sku}`}>
                    <img src={item.variants[0].images[0]} alt={item.title} className="w-16 h-16 object-cover" />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/page/product/${item.sku}`} className="font-medium">
                    {item.title}
                  </Link>
                </TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  {item.variants[0].stock > 0 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromWishlist(item._id)}
                    className="mr-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500 text-xl">No wishlist products found!</p>
      )}
      <div className="mt-6 flex justify-center">
        <Link href="/" passHref>
          <Button variant="outline" className='text-base bg-primary-clr hover:bg-green-700 text-white transition-colors'>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}

export default WishlistPage;