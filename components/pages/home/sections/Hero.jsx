"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { useNotification } from "@/context/NotificationProvider";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/ui/carousel";

const Hero = () => {
  const router = useRouter();
  const { isNotificationOpen } = useNotification();

  const handleShopNowBtn = () => router.push("/products");

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="group"
    >
      <div
        className={`w-full h-[30vh] sm:h-[60vh] md:h-[65vh] lg:h-[85vh] xl:h-[100vh] relative bg-transparent ${
          isNotificationOpen ? "mt-4 sm:mt-6" : "mt-0"
        } overflow-hidden`}
      >
        <div className="z-10 w-full h-full flex items-end justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
          <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl text-center grid items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16">
            <motion.div
              variants={fadeIn("up", 0.3)}
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold font-serif leading-tight sm:leading-snug md:leading-normal text-white text-balance px-2 sm:px-4"
            >
              Redefining Wellness, One Scoop at a Time
            </motion.div>
            <motion.div 
              variants={fadeIn("up", 0.5)}
              className="mt-2 sm:mt-3 md:mt-4"
            >
              <Button
                onClick={handleShopNowBtn}
                id="hero"
                variant="outline"
                effect="shine"
                className="btn-hover-fil rounded-full bg-white/30 backdrop-blur-md text-white font-semibold 
                text-sm sm:text-base md:text-lg
                px-4 sm:px-6 md:px-8 lg:px-10 
                py-1.5 sm:py-2 md:py-2.5 lg:py-3
                min-w-[120px] sm:min-w-[140px] md:min-w-[160px]
                hover:scale-105 transition-transform duration-300"
              >
                Shop Now
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 group-hover:scale-110 duration-700 ease-in-out overflow-hidden">
          <video
            src="/assets/hero-banner-1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
