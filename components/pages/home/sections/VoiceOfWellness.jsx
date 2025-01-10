"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";

const VoiceOfWellness = () => {
  // Add testimonials data
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      role: "Professional Bodybuilder",
      image: "/pfp.png",
      text: "The quality of proteins here is unmatched. I've tried many brands, but these supplements have significantly improved my muscle recovery and strength gains. The fast delivery and authentic products keep me coming back.",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "Certified Nutrition Expert",
      image: "/pfp.png",
      text: "As a nutrition expert, I highly recommend their protein supplements. The ingredients are clean, well-sourced, and the amino acid profile is perfect for both athletes and fitness enthusiasts. Their customer service is exceptional!",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "CrossFit Trainer",
      image: "/pfp.png",
      text: "What sets them apart is their range of protein options for different dietary needs. Whether you're vegan or prefer whey, they have premium quality products. My clients have seen remarkable improvements in their performance.",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Fitness Competitor",
      image: "/pfp.png",
      text: "Finding genuine supplements can be challenging, but this platform ensures authenticity. Their protein powders mix perfectly, taste great, and have helped me maintain lean muscle mass during competition prep.",
    },
    {
      id: 5,
      name: "David Chen",
      role: "Sports Nutritionist",
      image: "/pfp.png",
      text: "The transparency about ingredient sourcing and third-party testing gives me confidence in recommending these products. Their protein supplements provide excellent value for money without compromising on quality.",
    },
  ];

  const [[page, direction], setPage] = useState([2, 0]);

  const controls = useAnimationControls();

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? -1 : 1;
      paginate(direction);
    } else {
      controls.start({ x: "20%" });
    }
  };

  const paginate = (newDirection) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < testimonials.length) {
      setPage([newPage, newDirection]);
    }
  };

  return (
    <motion.div
      className="bg-[#E7E9EB] py-20  w-full relative overflow-hidden"
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Right gradient overlay */}
      <div className="absolute right-0 top-0 w-20 md:w-60 h-full bg-gradient-to-l from-[#E7E9EB] to-transparent z-10" />
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          variants={fadeIn("down", 0.2)}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Voices Of Wellness
          </h1>
          <p className="text-sm sm:text-xl">
            Real Stories. Genuine Transformations. See How Ecowell
            <br className="hidden sm:flex" />
            Is Redefining Well-Being For Our Community.
          </p>
        </motion.div>

        {/* Testimonials Section */}
        <div className="relative h-[300px]">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={false}
              animate={{
                x:
                  index === page
                    ? "20%"
                    : index < page
                    ? `-${(page - index) * 100}px`
                    : "200%",
                y:
                  index === page
                    ? 0
                    : index < page
                    ? 40 + (page - index) * 25
                    : -10,
                scale: index === page ? 1 : 0.8,
                opacity:
                  index === page
                    ? 1
                    : Math.max(0, 1 - Math.abs(index - page) * 0.3),
                zIndex: testimonials.length - Math.abs(index - page),
                rotateY: index === page ? 0 : index < page ? 15 : -15,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.3 },
              }}
              className="absolute right-0 left-0 mx-auto cursor-grab active:cursor-grabbing"
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}

          {/* Navigation Buttons */}
          <div className="absolute bottom-[-60px] -right-10 transform -translate-x-1/2 flex justify-center gap-4 z-20">
            <button
              onClick={() => paginate(-1)}
              disabled={page === 0}
              className={`w-10 h-10 select-none rounded-full ${
                page === 0
                  ? "bg-gray-300"
                  : page === testimonials.length - 1
                  ? "bg-secondary-clr hover:bg-yellow-600 text-white"
                  : "bg-gray-200 hover:bg-secondary-clr hover:text-white text-secondary-clr"
              } flex items-center justify-center transition-colors z-50`}
            >
              <span className="text-2xl">&#8249;</span>
            </button>
            <button
              onClick={() => paginate(1)}
              disabled={page === testimonials.length - 1}
              className={`w-10 h-10 rounded-full ${
                page === testimonials.length - 1
                  ? "bg-gray-300"
                  : "bg-secondary-clr hover:bg-yellow-600"
              } text-white flex items-center justify-center transition-colors z-50`}
            >
              <span className="text-2xl -mt-0.5 ml-1">&#8250;</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// testimonial card component
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="min-h-[250px] h-fit bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto transition-all duration-500">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-12 h-12">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 48px, 48px"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
          <p className="text-gray-500 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <div className="relative space-y-2">
        <div className="">
          <Image
            src="/testimonialComa.png"
            alt="quote"
            width={50}
            height={50}
            className="w-10 h-8 overflow-hidden"
          />
        </div>
        {/* <span className="text-5xl text-secondary-clr absolute -left-4 -top-4">
          &quot;
        </span> */}
        <p className="text-gray-700 text-lg leading-relaxed overflow-auto">
          {testimonial.text}
        </p>
      </div>
    </div>
  );
};

export default VoiceOfWellness;
