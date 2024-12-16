import React from "react";
import Image from 'next/image';

const VoiceOfWellness = () => {
  return (
    <div className="bg-[#E7E9EB] py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4">Voices Of Wellness</h1>
          <p className="text-xl">
            Real Stories. Genuine Transformations. See How Ecowell
            <br />
            Is Redefining Well-Being For Our Community.
          </p>
        </div>

        {/* Testimonials Section */}
        <div className="relative">
          {/* Background Cards (blurred/faded effect) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 scale-75 -translate-x-1/2">
            <TestimonialCard />
          </div>
          <div className="absolute left-[20%] top-1/2 -translate-y-1/2 opacity-40 scale-90 -translate-x-1/2">
            <TestimonialCard />
          </div>

          {/* Main Card */}
          <div className="relative z-10">
            <TestimonialCard />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="w-10 h-10 rounded-full bg-gray-200 text-yellow-500 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-colors">
              &#8249;
            </button>
            <button className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center hover:bg-yellow-600 transition-colors">
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-12 h-12">
          <Image
            src="/pfp.png"
            alt="Profile"
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 48px, 48px"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Jhon smith</h3>
          <p className="text-gray-500 text-sm">Professional weight lifter</p>
        </div>
      </div>
      <div className="relative">
        <span className="text-5xl text-yellow-500 absolute -left-4 -top-4">
          &quot;
        </span>
        <p className="text-gray-700 text-lg leading-relaxed pl-4">
          Lorem ipsum dolor sit amet consectetur. Massa sapien tincidunt
          faucibus gravida ullamcorper pulvinar. Auctor varius ultrices et purus
          id pellentesque velit maecenas euismod.
        </p>
      </div>
    </div>
  );
};

export default VoiceOfWellness;
