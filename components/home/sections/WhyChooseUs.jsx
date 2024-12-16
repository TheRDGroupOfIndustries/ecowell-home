import Image from "next/image";
import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why to choose us?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          At Ecowell, we don&apos;t just create products – we craft experiences
          that elevate your wellness journey. Here&apos;s what sets us apart:
        </p>
      </div>

      {/* Bento Grid */}
      <div className="w-full flex flex-col justify-center items-center">
        <Image
          src="/card1.png"
          alt="Why Choose Us"
          width={1000}
          height={1000}
        />
        <Image
          src="/bento.png"
          alt="Why Choose Us"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default WhyChooseUs;

//<div className="grid grid-cols-12 gap-6">
{
  /* First Card - Full Width */
}
{
  /* <div className="col-span-12 bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center p-8">
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-4">{features[0].title}</h3>
              <p className="text-gray-600">{features[0].description}</p>
            </div>
            <div className="flex-1">
              <Image
                src={features[0].image}
                alt={features[0].title}
                width={500}
                height={300}
                className="rounded-xl"
              />
            </div>
          </div>
        </div> */
}

{
  /* Second Card */
}
{
  /* <div className="col-span-8 bg-blue-50 rounded-2xl p-8">
          <div className="flex items-center h-full">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4">{features[1].title}</h3>
              <p className="text-gray-600">{features[1].description}</p>
            </div>
            <div className="flex-1">
              <Image
                src={features[1].image}
                alt={features[1].title}
                width={400}
                height={400}
                className="rounded-xl"
              />
            </div>
          </div>
        </div> */
}

{
  /* Third Card */
}
{
  /* <div className="col-span-4 bg-gray-100 rounded-2xl p-8">
          <h3 className="text-3xl font-bold mb-4">{features[2].title}</h3>
          <p className="text-gray-600 mb-4">{features[2].description}</p>
          <Image
            src={features[2].image}
            alt={features[2].title}
            width={300}
            height={200}
            className="rounded-xl w-full"
          />
        </div> */
}

{
  /* Fourth Card */
}
{
  /* <div className="col-span-4 bg-yellow-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold mb-4">{features[3].title}</h3>
          <p className="text-gray-600 mb-4">{features[3].description}</p>
          <Image
            src={features[3].image}
            alt={features[3].title}
            width={300}
            height={200}
            className="rounded-xl w-full"
          />
        </div> */
}

{
  /* Fifth Card */
}
{
  /* <div className="col-span-8 bg-gray-50 rounded-2xl p-8">
          <div className="flex items-center h-full">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4">{features[4].title}</h3>
              <p className="text-gray-600">{features[4].description}</p>
            </div>
            <div className="flex-1">
              <Image
                src={features[4].image}
                alt={features[4].title}
                width={400}
                height={400}
                className="rounded-xl"
              />
            </div>
          </div>
        </div> */
}
//     </div>
