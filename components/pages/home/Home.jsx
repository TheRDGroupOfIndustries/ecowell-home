"use client";

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
import { useSession } from "next-auth/react";

export default function Home({ session }) {
  console.log("server session : ", session);
  const { data: sessionTwo } = useSession();
  console.log("client session : ", sessionTwo);

  return (
    <>
      <Hero />
      <Trending />
      <ShopCategory />
      <SpecialOffers />
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
