"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { partnerLogoData } from "@/constants/data";

const Partners = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = scrollContainer.scrollWidth;

    const scroll = () => {
      scrollAmount -= 1;
      if (scrollAmount <= 0) {
        scrollAmount = scrollContainer.scrollWidth / 2;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-fit p-10 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex justify-center whitespace-nowrap space-x-8"
      >
        {partnerLogoData.map((logo, index) => (
          <Image
            key={index}
            src={logo.src}
            alt={logo.alt}
            width={400}
            height={400}
            className="w-fit h-fit"
          />
        ))}
        {/* Repeat logos for infinite effect */}
        {partnerLogoData.map((logo, index) => (
          <Image
            key={`repeat-${index}`}
            src={logo.src}
            alt={logo.alt}
            width={400}
            height={400}
            className="w-fit h-fit"
          />
        ))}
      </div>
    </div>
  );
};

export default Partners;
