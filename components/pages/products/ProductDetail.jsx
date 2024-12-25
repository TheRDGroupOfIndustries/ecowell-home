"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { specialOfferProducts } from "@/constants/product";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/productCard";
import NewArrival from "../home/sections/products/NewArrival";
import { FrequentlyBoughtTogether } from "./components/BroughtTogether";
import RelatedProduct from "./components/RelatedProduct";
import ProductDiscover from "./components/ProductDiscover";
import TheStories from "./components/TheStories";
import PurposeAndTrust from "./components/PurposeAndTrust";
import FrequentlyAskedQuestions from "./components/FrequentlyAskedQuestions";
import CustomerReviews from "./components/CustomerReviews";

const ProductDetail = () => {
  return (
    <>
      <section className="w-full h-full space-y-8 p-4 md:px-8 lg:px-10 xl:px-14 md:pt-28">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 md:gap-6 lg:gap-8">
          <ImageGallery />
          <Details />
        </div>
        <FrequentlyBoughtTogether/>
        <RelatedProduct/>
        <ProductDiscover/>
        <TheStories/>
        <PurposeAndTrust/>
        <FrequentlyAskedQuestions/>
        <CustomerReviews/>
      </section>
    </>
  );
};

export default ProductDetail;

const ImageGallery = () => {
  return (
    <>
      <div
        id="image-section"
        className="relative lg:sticky top-28 z-10 w-full h-fit space-y-4 overflow-hidden"
      >
        <div
          id="images-gallery"
          className="w-full h-fit lg:h-[65vh] flex gap-4 select-none overflow-hidden"
        >
          <div
            id="images"
            className="w-[20%] h-full overflow-x-hidden overflow-y-scroll scroll-none"
          >
            {["/p1.png", "/p2.png", "/p3.png", "/p4.png"].map((c, index) => (
              <Image
                key={index}
                src={c}
                alt={"image " + (index + 1)}
                width={200}
                height={200}
                className="w-full h-fit"
              />
            ))}
          </div>
          <div id="active-image" className="w-[80%] h-full">
            <Image
              src="/p1.png"
              alt="images"
              width={1000}
              height={1000}
              className="w-full h-fit"
            />
          </div>
        </div>
        <div
          id="certified-by-logos"
          className="w-full h-16 lg:h-20 flex-center flex-wrap gap-6 bg-[#F9F6F0] rounded-lg py-2 px-4 md:px-6 lg:px-8 overflow-hidden"
        >
          <i className="w-fit font-semibold font-serif text-primary-clr overflow-hidden">
            Certified By
          </i>
          <div className="w-full h-full flex-1 flex gap-6 overflow-x-scroll overflow-y-hidden">
            {["/c1.png", "/c2.png", "/c3.png", "/c4.png", "/c5.png"].map(
              (c, index) => (
                <Image
                  key={index}
                  src={c}
                  alt={"certificate " + (index + 1)}
                  width={100}
                  height={100}
                  className="w-fit h-full"
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Details = () => {
  return (
    <>
      <div
        id="product-details-section"
        className="w-full h-fit flex-1 space-y-4 overflow-hidden"
      >
        <div className="w-fit bg-[#F9F6F0] text-xs py-1 px-4 overflow-hidden">
          Heart | Longevity
        </div>
        <div className="space-y-1">
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-primary-clr font-semibold">
            Product Name
          </div>
          <div className="space-y-1 text-primary-clr">
            <div className="text-md md:text-lg lg:text-2xl xl:text-3xl font-semibold">
              ₹1,499/-
            </div>
            <div className="text-xs">Price include GST</div>
          </div>
        </div>
        {/* <div className="space-y-2">
          <div className="w-fit bg-[#333333] text-white font-extralight text-sm p-2">
            Extra 10% off auto-applied at checkout
          </div>
          <div className="">Earn 🪙 500 EcoCoins</div>
        </div> */}
        <div className="space-y-1">
          <div className="text-sm md:text-md lg:text-lg xl:text-xl">
            Description
          </div>
          <p className="text-xs md:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
            similique qui totam doloribus voluptatibus eius nulla delectus...{" "}
            <span>
              <Button
                variant="link"
                size="sm"
                className="w-fit px-0 text-xs md:text-sm"
              >
                Read more
              </Button>
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {["300 mg", "1 kg", "200 ml"].map((smth, index) => (
            <div
              key={index}
              className="text-sm text-primary-clr border border-gray-300 p-1 px-3"
            >
              {smth}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {["VANILLA", "CHOCOLATE", "PEACH"].map((smth, index) => (
            <div
              key={index}
              className="text-sm text-primary-clr border border-gray-300 p-1 px-3"
            >
              {smth}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { discount: 5, lable: "PACK OF 2", price: 2750 },
            { discount: 10, lable: "PACK OF 5", price: 5000 },
            { discount: 20, lable: "PACK OF 10", price: 12000 },
            { discount: 30, lable: "PACK OF 15", price: 15000 },
            { discount: 35, lable: "PACK OF 20", price: 20000 },
          ].map((smth, index) => (
            <div
              key={index}
              className="text-sm text-primary-clr border border-gray-300 p-1 px-3 space-y-1"
            >
              <div className="w-fit h-fit font-semibold text-[10px] text-white bg-[red] rounded-md px-2">
                {smth.discount}% OFF
              </div>
              <div className="">{smth.lable}</div>
              <div className="text-[15px]">{smth.price}</div>
            </div>
          ))}
        </div>
        <hr className="border border-gray-300" />
        <div className="grid grid-cols-3 gap-4 overflow-hidden">
          {[
            { img: "/assets/emi.png", lable: "EMI Available" },
            { img: "/assets/cod.png", lable: "Cash on Delivery Available" },
            {
              img: "/assets/freeShipping.png",
              lable: "Free Shipping On Orders Above ₹999",
            },
          ].map((s, index) => (
            <div key={index} className="flex-center flex-col gap-2 text-center">
              <Image
                src={s.img}
                alt={s.lable}
                width={400}
                height={400}
                className="w-fit h-fit"
              />
              <span>{s.lable}</span>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <div className="text-md md:text-lg lg:text-xl xl:text-2xl">
            How this Formula supports your wellness
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              "Boost Strength and Recovery",
              "Lower Fat Percentage",
              "Balance Blood Sugar",
              "Build Immunity",
              "Promotes Sleep & Relaxation",
              "Helps Reduce Anxiety & Mood",
            ].map((f, index) => (
              <div
                key={index}
                className="flex-center flex-col gap-1 text-center border border-secondary-clr rounded-xl p-2 px-4 md:px-6 overflow-hidden"
              >
                <Image
                  src="/assets/biceps.png"
                  alt={f}
                  width={400}
                  height={400}
                  className="w-fit h-fit"
                />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// const NewArrival = () => {
//   return (
//     <motion.div
//       variants={staggerContainer(0.1, 0.1)}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: false, amount: 0.25 }}
//       className="w-full h-fit flex flex-col items-center justify-center gap-6 p-8"
//     >
//       <motion.h2
//         variants={fadeIn("down", 0.2)}
//         className="text-2xl font-semibold"
//       >
//         New Arrival
//       </motion.h2>
//       <div className="w-full flex flex-wrap items-center justify-center gap-6">
//         {specialOfferProducts &&
//           specialOfferProducts.map((product, index) => (
//             <motion.div key={index} variants={fadeIn("up", 0.3 + index * 0.1)}>
//               <ProductCard product={product} />
//             </motion.div>
//           ))}
//       </div>
//     </motion.div>
//   );
// };
