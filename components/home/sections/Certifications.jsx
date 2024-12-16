import Image from "next/image";
import { certificationsData } from "@/constants/data";

const Certifications = () => {
  return (
    <div className="bg-[#E7F4F2] py-8">
      <h2 className="text-center text-2xl font-bold mb-8">CERTIFICATIONS</h2>
      <div className="flex justify-between px-20 2xl:px-40">
        {certificationsData.map((c, index) => (
          <Image key={index} src={c.img} alt={c.alt} width={120} height={120} />
        ))}
      </div>
    </div>
  );
};

export default Certifications;
