import Image from "next/image";
import React from "react";

const features = [
  {
    title: 'Chemical Free',
    description: 'Made without harmful chemicals',
    link : '/hex1.png'
  },
  {
    title: 'Well Certified',
    description: 'Meets highest standards',
      link : '/hex2.png'
  },
  {
    title: 'Safety Tested',
    description: 'Thoroughly tested for safety',
      link : '/hex3.png'
  },
  {
    title: 'No Preservatives',
    description: 'Pure and natural formula',
      link : '/hex4.png'
  },
  {
    title: 'No-GMO',
    description: '100% natural ingredients',
      link : '/hex5.png'
  }
];

const SafetyProduct = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
        How Our Products Are Harmless!
      </h2>

      <div className="relative min-h-[200px]">
        {/* <HexagonConnector /> */}

        <div className="grid grid-cols-5 gap-4 relative z-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center ${index % 2 === 1 ? 'mt-20' : ''
                }`}
            >
              <Image
                src={feature.link}
                alt="Chemical Free"
                width={100}
                height={100}
                className="w-20 h-20"
              />
              <h3 className="text-sm font-semibold text-gray-800 text-center mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600 text-center max-w-[120px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyProduct;


const HexagonConnector = () => {
  return (
    <svg
      className="absolute left-0 right-0 w-full"
      height="200"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: -1,
        overflow: 'visible'
      }}
    >
      <g>
        <line
          x1="25%" y1="30%"
          x2="35%" y2="70%"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="35%" y1="70%"
          x2="45%" y2="30%"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="45%" y1="30%"
          x2="55%" y2="70%"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="55%" y1="70%"
          x2="65%" y2="30%"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </g>
    </svg>
  );
};

