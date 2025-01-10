"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";
import { partnerLogoData } from "@/constants/data";

const Partners = () => {
  const scrollRef = useRef(null);
  const [scrollSpeed, setScrollSpeed] = useState(30);
  const controls = useAnimation();

  // Adjust speed based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScrollSpeed(width < 768 ? 20 : 30);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startAnimation = useCallback(() => {
    controls.start({
      x: [0, "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: scrollSpeed,
          ease: "linear",
        },
      },
    });
  }, [controls, scrollSpeed]);

  useEffect(() => {
    startAnimation();
  }, [scrollSpeed, startAnimation]);

  return (
    <motion.div
      className="h-fit p-4 sm:p-6 md:p-10 overflow-hidden relative"
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="show"
    >
      <div className="absolute left-0 top-0 w-60 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 w-60 h-full bg-gradient-to-l from-white to-transparent z-10" />

      <motion.div
        ref={scrollRef}
        className="flex justify-start items-center whitespace-nowrap space-x-8"
        animate={controls}
        onHoverStart={() => {
          controls.stop();
        }}
        onHoverEnd={() => {
          startAnimation();
        }}
      >
        {[...partnerLogoData, ...partnerLogoData].map((logo, index) => (
          <motion.div
            key={index}
            variants={fadeIn(
              "up",
              0.2 + (index % partnerLogoData.length) * 0.1
            )}
            className="flex-shrink-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={400}
              height={90}
              className="w-fit max-w-[400px] h-[90px] object-contain"
              loading={index < partnerLogoData.length ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Partners;
