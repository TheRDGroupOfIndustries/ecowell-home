'use client';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from 'react'
import { fadeIn, staggerContainer } from '@/lib/utils';

export default function FrequentlyAskedQuestions() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col w-full gap-10 justify-center items-center"
    >
      {/* Section Header */}
      <motion.h1
        variants={fadeIn('up', 0.1, 0.8)}
        className="text-4xl text-center text-dark_jungle_green font-medium"
      >
        Frequently Asked Questions
      </motion.h1>

      {/* Accordion Items */}
      <motion.div
        variants={fadeIn('up', 0.2, 0.8)}
        className="w-full md:w-[80%] px-3 flex flex-col gap-5"
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that match the other components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </motion.div>
  );
}
