import { Heading } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { Text } from "@/components/ui/text";
import React from "react";

const featureData = [
  {
    id: 1,
    title: "Chemical Free",
    description: "We create the products which are chemical free.",
    icon: "/p1.p",
    alt: "Hex Image One",
  },
  {
    id: 2,
    title: "No-GMO",
    description: "We create the products which are chemical free.",
    icon: "/p2.png",
    alt: "Hex Image Two",
  },
  {
    id: 3,
    title: "Safely Tested",
    description: "We ensure our products are suitable for all.",
    icon: "/p3.png",
    alt: "Line Image",
  },
  {
    id: 4,
    title: "Well Certified",
    description: "Our products are well verified and certified from FSSAI.",
    icon: "/p4.png",
    alt: "Rectangle Image",
  },
  {
    id: 5,
    title: "No Preservatives",
    description:
      "We Highly avoid using chemical preservatives instead we use natural flavors.",
    icon: "/p1.png",
    alt: "Hex Image Five",
  },
];

export default function ProductSafetySection() {
  return (
    <div className="mt-[38px]">
      <div className="flex flex-col items-center justify-center bg-off-white py-[100px] lg:py-8 md:py-5 sm:py-6">
        <div className="mx-auto mb-1 flex w-full max-w-[1712px] flex-col items-center gap-[76px] px-14 lg:gap-[76px] lg:px-5 md:gap-[57px] md:px-5 sm:gap-[38px]">
          {/* Header */}
          <Heading
            size="text-xl"
            as="h2"
            className="font-helveticaneue text-[64px] font-medium capitalize text-black-900 lg:text-[48px] md:text-[48px]"
          >
            How our products are harmless!
          </Heading>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featureData.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center gap-4 text-center"
              >
                <Img
                  src={feature.icon}
                  width={162}
                  height={168}
                  alt={feature.alt}
                  className="h-[168px] w-[16%] object-contain sm:w-full"
                />
                <Heading
                  size="heading-md"
                  as="h3"
                  className="font-albragrotesktrial text-[36px] font-semibold tracking-[2.16px] text-black-900 lg:text-[30px] md:text-[30px] sm:text-[28px]"
                >
                  {feature.title}
                </Heading>
                <Text
                  as="p"
                  className="text-center font-helveticaneue text-[16px] font-normal leading-[19px] tracking-[0.96px] text-black-900 lg:text-[13px]"
                >
                  {feature.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
