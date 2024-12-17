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
      role: "Professional weight lifter",
      image: "/pfp.png",
      text: "Lorem ipsum dolor sit amet consectetur. Massa sapien tincidunt faucibus gravida ullamcorper pulvinar. Auctor varius ultrices et purus id pellentesque velit maecenas euismod.",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "Fitness Instructor",
      image: "/pfp.png",
      text: "Exceptional results and amazing support throughout my fitness journey. The personalized approach made all the difference in achieving my goals.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Yoga Enthusiast",
      image: "/pfp.png",
      text: "The holistic approach to wellness here is unmatched. It's not just about physical fitness, but mental well-being too. Truly transformative experience.",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Nutrition Coach",
      image: "/pfp.png",
      text: "As a nutrition coach, I'm impressed by the comprehensive wellness programs. The results my clients achieve here are remarkable.",
    },
    {
      id: 5,
      name: "David Chen",
      role: "Marathon Runner",
      image: "/pfp.png",
      text: "The supportive community and expert guidance helped me prepare for my first marathon. Couldn't have done it without this amazing team.",
    },
  ];

  const [[page, direction], setPage] = useState([0, 0]);

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
      className="bg-[#E7E9EB] py-20 relative overflow-hidden"
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      
    >
      {/* Right gradient overlay */}
      <div className="absolute right-0 top-0 w-60 h-full bg-gradient-to-l from-[#E7E9EB] to-transparent z-10" />
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          variants={fadeIn("down", 0.2)}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-4">Voices Of Wellness</h1>
          <p className="text-xl">
            Real Stories. Genuine Transformations. See How Ecowell
            <br />
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
                y: index === page ? 0 : index < page ? 40 : -40,
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
          <div className="absolute bottom-[-60px] -right-10 transform -translate-x-1/2 flex justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              disabled={page === 0}
              className={`w-10 h-10 rounded-full ${
                page === 0
                  ? "bg-gray-300"
                  : page === testimonials.length - 1
                  ? "bg-[#D4A017] hover:bg-yellow-600 text-white"
                  : "bg-gray-200 hover:bg-[#D4A017] hover:text-white text-[#D4A017]"
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
                  : "bg-[#D4A017] hover:bg-yellow-600"
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

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto transition-all duration-500">
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
      <div className="relative">
        <span className="text-5xl text-[#D4A017] absolute -left-4 -top-4">
          &quot;
        </span>
        <p className="text-gray-700 text-lg leading-relaxed pl-4">
          {testimonial.text}
        </p>
      </div>
    </div>
  );
};

export default VoiceOfWellness;
