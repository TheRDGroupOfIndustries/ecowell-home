"use client";

import {
  Dialog,
  DialogContent,
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
import React, { useEffect, useState, useRef, useCallback } from "react";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import Notification from "./Notification";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { useDebounce } from "@/hooks/debounce";
import { cn } from "@/lib/utils";
import ReactCountUp from "../ui/countUp";

const Navbar = ({ companyName }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { noOfCartItems } = useCart();
  const { isNotificationOpen } = useNotification();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleTrendingItemClick = useCallback((text) => {
    setSearchOpen(true);
    setSearchQuery(text);
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
              className={`hover:text-gray-700 text-lg text-bold ${
                isHomeScrolled ? "text-black" : "text-white"
              } ease-in-out duration-300`}
            >
              {link.head}
            </Link>
          ))}
        </motion.div>
        <motion.div variants={fadeIn("down", 0.4)} className="flex space-x-4">
          <Search
            isHomeScrolled={isHomeScrolled}
            open={searchOpen}
            setOpen={setSearchOpen}
            initialQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Link href="/account/wishlist">
            <div className="relative">
              <CiHeart
                size={20}
                className={`hover:text-gray-700 ${
                  isHomeScrolled ? "text-black" : "text-white"
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
                className={`hover:text-gray-700 ${
                  isHomeScrolled ? "text-black" : "text-white"
                } ease-in-out duration-300`}
              />
            </div>
          </Link>
          <Link href="/account">
            <CiUser
              size={20}
              className={`hover:text-gray-700 ${
                isHomeScrolled ? "text-black" : "text-white"
              } ease-in-out duration-300`}
            />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;

export function Search({
  isHomeScrolled,
  open,
  setOpen,
  initialQuery,
  setSearchQuery: setParentSearchQuery,
}) {
  const [searchQuery, setLocalSearchQuery] = useState(initialQuery || "");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const dialogRef = useRef(null);

  useEffect(() => {
    setLocalSearchQuery(initialQuery || "");
  }, [initialQuery]);

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setLocalSearchQuery(newValue);
    setParentSearchQuery(newValue);
  };

  useEffect(() => {
    async function searchProducts() {
      if (!debouncedSearch.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/products/search?query=${encodeURIComponent(debouncedSearch)}`
        );
        const data = await response.json();

        const sortedResults = data.sort((a, b) => {
          if (a.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
            return -1;
          if (b.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
            return 1;
          if (
            a.description.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
            return -1;
          if (
            b.description.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
            return 1;
          if (
            a.category.title
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase())
          )
            return -1;
          if (
            b.category.title
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase())
          )
            return 1;
          return 0;
        });

        setResults(sortedResults);
      } catch (error) {
        console.error("Error searching products:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    searchProducts();
  }, [debouncedSearch]);

  const handleClose = () => {
    setOpen(false);
    setLocalSearchQuery("");
    setParentSearchQuery("");
    setResults([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-default">
        <CiSearch
          size={20}
          className={`hover:text-gray-700 cursor-default ${
            isHomeScrolled ? "text-black" : "text-white"
          } ease-in-out duration-300`}
          onClick={() => setOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] z-50" ref={dialogRef}>
        <DialogHeader>
          <DialogTitle className="text-left mb-4">Search Products</DialogTitle>
          <div className="relative">
            <Input
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
        </DialogHeader>

        <ScrollArea className="mt-4 max-h-[60vh] rounded-md">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : results && results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
              {results.map((product) => (
                <ProductNode
                  key={product._id}
                  productDetails={product}
                  onClose={handleClose}
                />
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
  );
}

export const ProductNode = ({ productDetails, onClose }) => {
  const chosedVariant = productDetails?.variants[0];

  return (
    <div className="w-full h-fit">
      <Link
        href={`/products/${productDetails?.sku}`}
        onClick={onClose}
        className="w-full"
      >
        <div className="w-full h-fit group flex justify-between gap-3 hover:shadow-md transition-transform duration-300">
          {chosedVariant ? (
            <div className="w-20 h-20 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <Image
                src={chosedVariant?.images[0]}
                alt={chosedVariant?.flavor}
                width={150}
                height={150}
                // className="w-full h-full animate-fade-in overflow-hidden"
              />
              {/* <Image
              src={
                chosedVariant?.images[1]
                  ? chosedVariant?.images[1]
                  : chosedVariant?.images[0]
              }
              alt={chosedVariant?.flavor}
              width={100}
              height={150}
              className="animate-fade-in hidden group-hover:block transition-transform"
            /> */}
            </div>
          ) : (
            <ImageIcon src={""} alt={""} width={100} height={150} />
          )}
          <div className="w-full flex-1 flex flex-col gap-1">
            <h5 className="text-base font-semibold">{productDetails?.title}</h5>
            <p className="text-base">{chosedVariant?.flavor}</p>
          </div>

          <div className="w-fit flex flex-col gap-1">
            <h5 className="text-base font-semibold">Price</h5>
            <p className="text-base">
              <ReactCountUp
                amt={productDetails?.salePrice || productDetails?.price || 0}
                prefix="₹"
              />
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
