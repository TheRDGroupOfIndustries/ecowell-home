'use client'

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartProvider';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ShoppingCart, X } from 'lucide-react'
import Image from 'next/image';
import { toast } from 'sonner';

function WishlistPage() {
  const { wishlistProducts, removeFromWishlist, addAllToCart, cartAddToCart } = useWishlist();
  const { productExistsInCart } = useCart();

  const handleAddToCart = (product) => {
    cartAddToCart(product, 1, product.variants[0]);
    removeFromWishlist(product._id);
    toast.success('Product added to cart and removed from wishlist!');
  };

  const handleAddAllToCart = () => {
    const productsToAdd = wishlistProducts.filter(product => !productExistsInCart(product._id));
    addAllToCart(productsToAdd);
    productsToAdd.forEach(product => removeFromWishlist(product._id));
  };

  return (
    <div className="bg-white py-10 mt-[130px]">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        {wishlistProducts.length > 0 ? (
          <>
            <Table className='text-base bg-white rounded-lg overflow-hidden'>
              <TableCaption className='text-xl'>A list of your wishlist items.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-nowrap">Product Name</TableHead>
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
                        <Image src={item.variants[0].images[0]} alt={item.title} width={64} height={64} className="w-16 h-16 object-cover" />
                      </Link>
                    </TableCell>
                    <TableCell className='min-w-[200px]'>
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
                      {productExistsInCart(item._id) ? (
                        <span className="text-green-600">Already in cart</span>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          className="text-base bg-primary-clr text-white hover:bg-green-700 transition"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-6 flex justify-between">
              <Button 
                onClick={handleAddAllToCart} 
                className="text-base bg-primary-clr text-white hover:bg-green-700 transition"
              >
                Add All to Cart
              </Button>
              <Link href="/products" passHref>
                <Button variant="outline" className='text-base bg-primary-clr text-white hover:bg-green-700 transition'>Continue Shopping</Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg p-8">
            <p className="text-center text-gray-500 text-xl">No wishlist products found!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;