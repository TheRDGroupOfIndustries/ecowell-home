"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { links } from "@/constants/data";
import { useCart } from "@/context/CartProvider";
import { useNotification } from "@/context/NotificationProvider";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import Notification from "./Notification";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { useDebounce } from "@/hooks/debounce";
import { cn } from '@/lib/utils';

const Navbar = ({ companyName }) => {
  const pathname = usePathname();
  const { data: session } = useSession(); // console.log(session);
  const { noOfCartItems } = useCart();
  const { isNotificationOpen } = useNotification();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const heroSection = document.getElementById("hero");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  }, []);

  const isHomeScrolled = pathname === "/" ? isScrolled : true;
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="fixed top-0 left-0 w-full z-40 backdrop-blur-md overflow-hidden"
    >
      {isNotificationOpen && <Notification />}
      <div className="w-full flex justify-between items-center p-4 px-8">
        <motion.div
          variants={fadeIn("down", 0.2)}
          className="text-lg font-bold"
        >
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt={companyName || "Logo"}
              width={150}
              height={150}
            />
          </Link>
        </motion.div>
        <motion.div variants={fadeIn("down", 0.3)} className="flex space-x-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.herf}
              className={`hover:text-gray-700 text-lg text-bold ${isHomeScrolled ? "text-black" : "text-white"
                } ease-in-out duration-300`}
            >
              {link.head}
            </Link>
          ))}
        </motion.div>
        <motion.div variants={fadeIn("down", 0.4)} className="flex space-x-4">

          <Search isHomeScrolled={isHomeScrolled} />

          <Link href="/account/wishlist">
            <div className="relative">
              <CiHeart
                size={20}
                className={`hover:text-gray-700 ${isHomeScrolled ? "text-black" : "text-white"
                  } ease-in-out duration-300`}
              />
            </div>
          </Link>
          <Link href="/account/cart">
            <div className="relative">
              {noOfCartItems > 0 && (
                <div className="absolute -top-2.5 -right-2.5 text-xs text-white bg-[red] rounded-full px-1">
                  {noOfCartItems}
                </div>
              )}
              <CiShoppingCart
                size={20}
                className={`hover:text-gray-700 ${isHomeScrolled ? "text-black" : "text-white"
                  } ease-in-out duration-300`}
              />
            </div>
          </Link>
          <Link href="/account">
            <CiUser
              size={20}
              className={`hover:text-gray-700 ${isHomeScrolled ? "text-black" : "text-white"
                } ease-in-out duration-300`}
            />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;


function Search({isHomeScrolled}) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    },
    // Add more mock products as needed
  ]);



  useEffect(() => {
    async function searchProducts() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call delay
      
      } catch (error) {
        console.error('Error searching products:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    searchProducts();
  }, [debouncedSearch]);


  return (
    <Dialog>
      <DialogTrigger>
        <CiSearch
          size={20}
          className={`hover:text-gray-700 ${isHomeScrolled ? "text-black" : "text-white"
            } ease-in-out duration-300`}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] z-50">
        <DialogHeader>
          <DialogTitle className="text-left mb-4">Search Products</DialogTitle>
          <div className="relative">
            <Input
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </DialogHeader>
        
        <ScrollArea className="mt-4 max-h-[60vh] rounded-md">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-8 text-muted-foreground">
              No products found for &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Start typing to search for products
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>

  )
}

function ProductCard({ product, className }) {
  return (
    <Card className={cn('overflow-hidden group cursor-pointer', className)}>
      <CardContent className="p-0">
        <div className="aspect-square  relative">
          <Image
            src={product.image}
            alt={product.name}
            width={50}
            height={50}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          {product.discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              -{product.discount}%
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-sm">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
