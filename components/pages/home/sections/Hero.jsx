"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const router = useRouter();
  const handleShopNowBtn = () => router.push("/products");
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="group"
    >
      <div className="w-full mt-8 h-[70vh] relative overflow-hidden bg-transparent">
        <div className="z-10 w-full h-full flex items-end justify-center pb-14 2xl:pb-20">
          <div className="w-1/2 text-center flex flex-col items-center gap-4">
            <motion.h1
              variants={fadeIn("up", 0.3)}
              className="text-5xl 2xl:text-7xl font-extralight text-white"
            >
              Redefining Wellness, One Scoop at a Time
            </motion.h1>
            <motion.div variants={fadeIn("up", 0.5)}>
              <Button
                onClick={handleShopNowBtn}
                id="hero"
                variant="outline"
                className="btn-hover-fill text-white"
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
