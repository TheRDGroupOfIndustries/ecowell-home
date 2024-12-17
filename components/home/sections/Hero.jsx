"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/utils";

const Hero = () => {
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
                id="hero"
                variant="outline"
                className="btn-hover-fill"
              >
                Shop Now
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[url('https://s3-alpha-sig.figma.com/img/e658/abbc/8e6a89aaa57b64ff6b9cee629d934479?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NCYJAFmnSesfHHKOgG9T3LsIMqXkJc9H-7d3tSw5VPoDkQYmAIZYU1rmWC6iu5I4~BSL4jIhv2eGcdKbB5nJ0Mv7263LfDRPtASsBb8Rd9e1zHx04goUL~~Z5Z1921fffhipEmLCsD6VLRQAnjhjc851zAnYJVg2pJe7eW2A0M8ZKjmZli52NuaMian419-eUN7EKmO-6fHO15hTk1LlaC0QGLrPJ9VXcan7hxWjcS~z-v-SjYBbKIqPm~69s-uinCgqL9abz5fUc6GeTSXcX22ag19Y-uIlYd82q0jUtlsNORi27LkWWlHD8adQjPhWslSiS1nl2yt2DSUVp~ShXw__')] bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"></div>

      </div>
    </motion.div>
  );
};

export default Hero;
