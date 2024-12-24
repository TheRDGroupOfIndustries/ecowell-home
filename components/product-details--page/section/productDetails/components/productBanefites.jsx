'use client'
import React from 'react';
import { Card } from '@/components/ui/card';

const WellnessBenefits = () => {
  const benefits = [
    {
      title: "Boost Strength And Recovery",
      icon: "💪"
    },
    {
      title: "Lower Fat Percentage",
      icon: "💪"
    },
    {
      title: "Balance Blood Sugar",
      icon: "💪"
    },
    {
      title: "Build Immunity",
      icon: "💪"
    },
    {
      title: "Promotes Sleep & Relaxation",
      icon: "💪"
    },
    {
      title: "Helps Reduce Anxiety & Mood",
      icon: "💪"
    }
  ];

  return (
    <div className=" max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        How This Formula Supports Your Wellness
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="p-2 bg-[#FDFBF9] max-w-[230px] flex flex-col items-center justify-center border-2 border-[#D4A017] rounded-2xl hover:shadow-lg transition-shadow">
            <div className="text-[#D4A017] text-2xl mb-4">
              {benefit.icon}
            </div>
            <h2 className="text-xl text-muted_navy text-center font-medium">
              {benefit.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessBenefits;