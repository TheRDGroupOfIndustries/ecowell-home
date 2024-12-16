import React from "react";
import { GiDna2, GiHoneycomb } from "react-icons/gi";
import { SiThunderstore } from "react-icons/si";
import { TbDeviceLandlinePhone } from "react-icons/tb";

const Trending = () => {
  return (
    <>
      <div className="w-full h-fit flex flex-col items-center justify-center gap-6 p-8">
        <h2 className="text-xl font-semibold">Trending searches</h2>
        <div className="w-full h-fit flex items-center justify-center gap-4">
          <div className="w-fit h-fit p-2 px-4 border border-gray-950 flex items-center justify-center gap-2 text-lg 2xl:text-xl">
            <GiDna2 size={20} />
            <span>Protein</span>
          </div>
          <div className="w-fit h-fit p-2 px-4 border border-gray-950 flex items-center justify-center gap-2 text-lg 2xl:text-xl">
            <GiHoneycomb size={20} />
            <span>Collagen</span>
          </div>
          <div className="w-fit h-fit p-2 px-4 border border-gray-950 flex items-center justify-center gap-2 text-lg 2xl:text-xl">
            <SiThunderstore size={20} />
            <span>Stamina</span>
          </div>
          <div className="w-fit h-fit p-2 px-4 border border-gray-950 flex items-center justify-center gap-2 text-lg 2xl:text-xl">
            <TbDeviceLandlinePhone size={20} />
            <span>Diabetic</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
