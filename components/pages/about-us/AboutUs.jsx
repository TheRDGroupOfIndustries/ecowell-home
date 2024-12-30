"use client"
import { fadeIn, staggerContainer } from '@/lib/utils'
import { motion } from 'framer-motion'
import { default as Image } from 'next/image'
import React from 'react'

export default function AboutUs() {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <motion.div
      id="shop-categories"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      className="w-full bg-[#f4ede3] mt-10"
    >
      <section className="py-16 flex flex-col gap-3 w-[95%] sm:w-[85%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full"
        >
          <Image
            src={"/aboutUsBG.jpeg"}
            alt="Banner"
            width={1000}
            height={540}
            className='w-full hover:scale-[1.02] transition-transform duration-300'
          />
        </motion.div>
        <motion.h4
          variants={fadeIn("up", 0.2, 1)}
          className="text-xl font-semibold"
        >
          Empowering Wellness Through Natural, Science-Driven Nutrition
        </motion.h4>
        <motion.div
          variants={fadeIn("up", 0.3, 1)}
          className="text-xl text-[#777]"
        >
          <motion.p variants={fadeIn("up", 0.2, 1)}>
            At EcoWell, we are dedicated to transforming health through innovative, sustainable nutritional supplements.
          </motion.p>
          Our mission goes beyond simply creating supplements. We are committed to providing holistic wellness solutions that address the complex nutritional needs of modern life. By combining cutting-edge nutritional science with sustainable, natural ingredients, we create supplements that support your body&apos;s optimal functioning. We understand that true wellness is a journey, not a destination. That&apos;s why our approach is comprehensive – focusing not just on individual supplements, but on supporting your overall health, energy, and vitality. Each product is carefully formulated to meet the highest standards of quality, efficacy, and environmental responsibility.
        </motion.div>
      </section>

      <section className="py-16 flex flex-col bg-[#f7f7f7] gap-3 w-[100%] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          className="w-[95%] sm:w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0"
        >
          <motion.div
            variants={cardVariants}
            // whileHover={{ scale: 1.05 }}
            className="lg:border-r-2 flex flex-row items-center gap-6"
          >
            <div className="w-fit flex flex-col items-center justify-center">
              <motion.div
                // whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="w-[128px] h-[128px] mb-2 rounded-full border outline-1 flex items-center justify-center"
              >
                <Image src="/Founder.jpg" alt="Banner" width={120} height={120} className="w-[120px] h-[120px] border rounded-full" />
              </motion.div>
              <p className="text-[#d4a017] text-nowrap text-center font-semibold">Dr. Emily Chen</p>
              <p className="text-[#777] text-nowrap text-center">Founder</p>
            </div>
            <motion.p 
            variants={fadeIn("up", 0.2, 1)} 
            className="text-[#777] w-[65%]">
              With over 15 years of experience in nutrition and holistic wellness, I founded EcoWell to provide scientifically-backed, natural supplements that support optimal health and well-being.
            </motion.p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            // whileHover={{ scale: 1.05 }}
            className="flex flex-row items-center gap-6 lg:px-8"
          >
            <div className="w-fit flex flex-col items-center justify-center">
              <motion.div
                // whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="w-[128px] h-[128px] mb-2 rounded-full border outline-1 flex items-center justify-center"
              >
                <Image src="/Director.jpg" alt="Banner" width={120} height={120} className="w-[120px] h-[120px] border rounded-full" />
              </motion.div>
              <p className="text-[#d4a017] text-center text-nowrap font-semibold">Michael Rodriguez</p>
              <p className="text-[#777] text-nowrap text-center">Research Director</p>
            </div>
            <motion.p variants={fadeIn("up", 0.2, 1)}  className="text-[#777] w-[65%]">
              Our rigorous research process ensures that every EcoWell supplement is developed using the highest quality, sustainably sourced ingredients and cutting-edge nutritional science.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 flex flex-col gap-3 w-[95%] sm:w-[85%] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-row mb-4"
        >
          <h1 className="text-3xl font-semibold">OUR TEAM</h1>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          className="w-full flex flex-row items-center justify-start overflow-x-auto gap-1"
        >
          <OurTeamCard src="" name="Michael Rodriguez" title="Head of Research & Development" />
          <OurTeamCard src="" name="Sarah Thompson" title="Wallness Strategy Director" />
          <OurTeamCard src="" name="David Kim" title="Quality Assurance lead" />
          <OurTeamCard src="" name="Lisa Chen" title="Nutrition Science Specialist" />
        </motion.div>
      </section>
    </motion.div>
  )
}

function OurTeamCard({ src, name, title }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 }
      }}
      // whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center justify-center w-full max-w-[240px]"
    >
      <motion.div
        // whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="h-[350px] w-full mb-2 bg-slate-400"
      >
        <Image height={350} width={240} src={src} alt={name} />
      </motion.div>
      <p className="text-[#d4a017] font-semibold">{name}</p>
      <p className="text-[#777] line-clamp-1">{title}</p>
    </motion.div>
  )
}