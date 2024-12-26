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
import { Heart, ImageIcon } from "lucide-react";
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
import ReactCountUp from "../ui/countUp";

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
  const [results, setResults] = useState();



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
                <ProductNode key={product.id} productDetails={product} />
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

const ProductNode = ({productDetails}) => {
  const productDetail = productDetails?.productDetails;
  // console.log(productDetail);

  const chosedVariant = productDetail?.product_id?.variants.find(
    (variant) => variant?.flavor === productDetail?.variant_flavor
  );

  // console.log(chosedVariant);

  return (
    <>
      <Link href={`/products/${productDetail?.product_id?.sku}`}>
        <div className="group grid grid-cols-4 gap-3 items-center hover:shadow-md transition-transform duration-300">
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
