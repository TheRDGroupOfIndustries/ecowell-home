"use client";

import { useEffect, useState } from "react";
import Hero from "./sections/Hero";
import Trending from "./sections/Trending";
import ShopCategory from "./sections/ShopCategory";
import SpecialOffers from "./sections/products/SpecialOffers";
import WhyChooseUs from "./sections/WhyChooseUs";
import NewArrival from "./sections/products/NewArrival";
import RecommendedProducts from "./sections/products/RecommendedProducts";
import Certifications from "./sections/Certifications";
import SafetyProduct from "./sections/products/SafetyProduct";
import Partners from "./sections/Partners";
import VoiceOfWellness from "./sections/VoiceOfWellness";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", "1");
        params.append("limit", "4");

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Hero />
      <Trending />
      <ShopCategory />
      <SpecialOffers products={products} />
      <WhyChooseUs />
      <NewArrival />
      <RecommendedProducts />
      <SafetyProduct />
      <Certifications />
      <Partners />
      <VoiceOfWellness />
    </>
  );
}
