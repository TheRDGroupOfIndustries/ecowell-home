import React from "react";
import Image from "next/image";

const SafetyProduct = () => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <h2 className="text-center text-[40px] font-bold mb-24">
        How Our Products Are Harmless!
      </h2>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center">
          {/* First Row (top) */}
          <div className="flex items-center justify-center gap-32 mb-16">
            {/* Chemical Free */}
            <div className="text-center w-52 translate-y-12">
              <div className="relative">
                <div className="hexagon bg-white p-4 mx-auto w-24 h-24 flex items-center justify-center border-2 border-gray-200">
                  <Image
                    src="/hex1.png"
                    alt="Chemical Free"
                    width={100}
                    height={100}
                    className="w-10 h-10"
                  />
                </div>
                <div className="absolute top-1/2 left-full w-32 h-px border-t-2 border-dashed border-gray-300 -translate-y-1/2 rotate-[30deg] origin-left"></div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">Chemical Free</h3>
              <p className="text-sm text-gray-600">
                We create the products which are chemical free.
              </p>
            </div>

            {/* Safely Tested */}
            <div className="text-center w-52">
              <div className="relative">
                <div className="hexagon bg-white p-4 mx-auto w-24 h-24 flex items-center justify-center border-2 border-gray-200">
                  <Image
                    src="/hex2.png"
                    alt="Safely Tested"
                    width={100}
                    height={100}
                    className="w-10 h-10"
                  />
                </div>
                <div className="absolute top-1/2 left-full w-32 h-px border-t-2 border-dashed border-gray-300 -translate-y-1/2 rotate-[30deg] origin-left"></div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">Safely Tested</h3>
              <p className="text-sm text-gray-600">
                We ensure our products are suitable for all.
              </p>
            </div>

            {/* No-GMO */}
            <div className="text-center w-52 translate-y-12">
              <div>
                <div className="hexagon bg-white p-4 mx-auto w-24 h-24 flex items-center justify-center border-2 border-gray-200">
                  <Image
                    src="/hex3.png"
                    alt="No-GMO"
                    width={100}
                    height={100}
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">No-GMO</h3>
              <p className="text-sm text-gray-600">
                We create the products which are chemical free.
              </p>
            </div>
          </div>

          {/* Second Row (bottom) */}
          <div className="flex items-center justify-center gap-32">
            {/* Well Certified */}
            <div className="text-center w-52">
              <div className="relative">
                <div className="hexagon bg-white p-4 mx-auto w-24 h-24 flex items-center justify-center border-2 border-gray-200">
                  <Image
                    src="/hex4.png"
                    alt="Well Certified"
                    width={100}
                    height={100}
                    className="w-10 h-10"
                  />
                </div>
                <div className="absolute top-1/2 left-full w-32 h-px border-t-2 border-dashed border-gray-300 -translate-y-1/2"></div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                Well Certified
              </h3>
              <p className="text-sm text-gray-600">
                Our products are well verified and certified from fssai.
              </p>
            </div>

            {/* No Preservatives */}
            <div className="text-center w-52">
              <div>
                <div className="hexagon bg-white p-4 mx-auto w-24 h-24 flex items-center justify-center border-2 border-gray-200">
                  <Image
                    src="/hex5.png"
                    alt="No Preservatives"
                    width={100}
                    height={100}
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                No Preservatives
              </h3>
              <p className="text-sm text-gray-600">
                We highly avoid using chemical preservatives instead we use
                natural flavors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyProduct;
