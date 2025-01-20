import Hero from "./sections/Hero";
import TrendingSearches from "./sections/TrendingSearches";
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
  return (
    <>
      <Hero />
      <TrendingSearches />
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
