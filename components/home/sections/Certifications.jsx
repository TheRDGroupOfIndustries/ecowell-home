import React from "react";
import Image from "next/image";

const Certifications = () => {
  return (
    <div className="bg-[#E7F4F2] py-8">
      <h2 className="text-center text-2xl font-bold mb-8">CERTIFICATIONS</h2>
      <div className="flex justify-between px-20 2xl:px-40">
        <Image src="/c1.png" alt="FDA" width={120} height={120} />
        <Image src="/c2.png" alt="HACCP" width={120} height={120} />
        <Image src="/c3.png" alt="GMP" width={120} height={120} />
        <Image src="/c4.png" alt="ISO" width={120} height={120} />
        <Image src="/c5.png" alt="FSSAI" width={120} height={120} />
      </div>
    </div>
  );
};

export default Certifications;
