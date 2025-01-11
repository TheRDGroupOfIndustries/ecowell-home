"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { useNotification } from "@/context/NotificationProvider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  const router = useRouter();
  const { isNotificationOpen } = useNotification();
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleShopNowBtn = () => router.push("/products");

  const backgrounds = [
    "/assets/hero-banner-image.jpg",
    "/assets/hero-banner.gif",
  ];

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="group"
    >
      <div
        className={`w-full h-[330px] sm:h-[60vh] md:h-[65vh] lg:h-[75vh] relative bg-transparent ${
          isNotificationOpen ? "mt-6" : "mt-0"
        } overflow-hidden`}
      >
        <div className="z-10 w-full h-full flex items-end justify-center pb-10 sm:pb-8 md:pb-12 lg:pb-14 2xl:pb-20">
          <div className="w-full md:max-w-3xl lg:max-w-4xl text-center grid items-center gap-4 md:gap-5 lg:gap-6">
            <motion.div
              variants={fadeIn("up", 0.3)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl sm:font-extralight leading-10 text-white text-center text-balanc"
            >
              Redefining Wellness, One Scoop at a Time
            </motion.div>
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
        {/* <div className="absolute inset-0 -z-10 bg-[url('/assets/hero-banner.gif')] bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-in-out group-hover:scale-110"></div> */}

        <div className="absolute inset-0 -z-10 group-hover:scale-110 duration-500 ease-in-out overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentBg}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.95, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${backgrounds[currentBg]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
