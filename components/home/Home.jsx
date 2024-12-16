import React from "react";
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

const Home = () => {
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
};

export default Home;
