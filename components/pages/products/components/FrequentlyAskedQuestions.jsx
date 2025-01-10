"use client";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { fadeIn, staggerContainer } from "@/lib/utils";

export default function FrequentlyAskedQuestions({ faqs }) {
  console.log(faqs);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col w-full gap-10 justify-center items-center mt-24 py-4"
    >
      {/* Section Header */}
      <motion.h1
        variants={fadeIn("up", 0.1, 0.3)}
        className="text-4xl text-center text-dark_jungle_green font-medium"
      >
        Frequently Asked Questions
      </motion.h1>

      {/* Accordion Items */}
      <motion.div
        variants={fadeIn("up", 0.2, 0.5)}
        className="w-full md:w-[80%] px-3 flex flex-col gap-5"
      >
        {!faqs.lenght ? (
          <Accordion type="single" collapsible className="space-y-4">
            {faqs?.map((faq, index) => (
              <motion.div key={index} variants={fadeIn("up", 0.2, 0.8 * index)}>
                <AccordionItem
                  value={`item-${index}`}
                  className="border-2 border-[#4b5d6b94] rounded-xl p-2"
                >
                  <AccordionTrigger className="text-primary-clr text-lg md:text-xl focus:no-underline">
                    {faq?.question}
                  </AccordionTrigger>
                  <AccordionContent className="md:text-lg">
                    {faq?.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        ) : (
          <div className="text-center text-lg md:text-xl text-primary-clr font-medium p-4">
            No FAQs available at the moment.
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
