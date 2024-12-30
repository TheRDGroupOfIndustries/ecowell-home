import { Heading } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import React from "react";

const features = [
  {
    id: 1,
    title: "Chemical Free",
    description: "We create the products which are chemical free.",
    icon: '/hex1.png',
    alt: "Hex Image One",
  },
  {
    id: 2,
    title: "No-GMO",
    description: "We create the products which are chemical free.",
    icon: '/hex2.png',
    alt: "Hex Image Two",
  },
  {
    id: 3,
    title: "Safely Tested",
    description: "We ensure our products are suitable for all.",
    icon: '/hex3.png',
    alt: "Line Image",
  },
  {
    id: 4,
    title: "Well Certified",
    description: "Our products are well verified and certified from FSSAI.",
    icon: '/hex4.png',
    alt: "Rectangle Image",
  },
  {
    id: 5,
    title: "No Preservatives",
    description:
      "We Highly avoid using chemical preservatives instead we use natural flavors.",
    icon: '/hex5.png',
    alt: "Hex Image Five",
  },
];

export default function PurposeAndTrust() {
    return (
        <div className=" flex flex-col w-full gap-10 pb-14">
            <div className=" flex flex-col justify-center items-center px-3">
                <h2 className="text-4xl text-dark_jungle_green font-medium">Built with <span className='italic font-semibold'>Purpose</span>, Backed by <span className='italic font-semibold'>Trust</span></h2>
            </div>

            <div className="flex items-center justify-between flex-wrap px-3">
            {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center `}
            >
              <Image
                  src={feature.icon}
                  width={162}
                  height={168}
                  alt={feature.alt}
                  className="h-[90px] w-[90px] object-contain sm:w-full"
                />
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-1">
                {feature.title}
              </h3>
              <p className="text-xl line-clamp-2 text-gray-600 text-center max-w-[170px]  md:max-w-[220px]">
                {feature.description}
              </p>
            </div>
          ))}
            </div>

        </div>
    )
}
