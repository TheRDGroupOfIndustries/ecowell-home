"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { useNotification } from "@/context/NotificationProvider";
import { Button } from "@/components/ui/button";

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
        className={`w-full h-[330px] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] relative bg-transparent ${
          isNotificationOpen ? "mt-6" : "mt-0"
        } overflow-hidden`}
      >
        <div className="z-10 w-full h-full flex items-end justify-center pb-10 sm:pb-8 md:pb-12 lg:pb-14 2xl:pb-20">
          <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 text-center grid items-center gap-4 md:gap-6 lg:gap-8">
            <motion.h1
              variants={fadeIn("up", 0.3)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl sm:font-extralight text-white text-balanc"
            >
              Redefining Wellness, One Scoop at a Time
            </motion.h1>
            <motion.div variants={fadeIn("up", 0.5)}>
              <Button
                onClick={handleShopNowBtn}
                id="hero"
                variant="outline"
                effect="shine"
                className="btn-hover-fil rounded-full bg-white/30 backdrop-blur-md text-white font-semibold mt-2 px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3"
              >
                Shop Now
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[url('/assets/2.jpg')] bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"></div>
      </div>
    </motion.div>
  );
};

export default Hero;
