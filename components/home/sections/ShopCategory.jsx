import Image from "next/image";
import React from "react";

const ShopCategory = () => {
  const categories = [
    { name: "PROTEIN", image: "/p1.png" },
    { name: "COLLAGEN", image: "/p2.png" },
    { name: "SHILAJIT", image: "/p3.png" },
    { name: "DAILY ESSENTIALS", image: "/p4.png" },
  ];

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center gap-6 p-8">
      {/* Title */}
      <h2 className="text-xl font-semibold">Shop by Category</h2>

      {/* Category Cards */}
      <div className="w-full flex items-center justify-center gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="w-[250px] h-[250px] bg-gradient-to-t from-yellow-600 to-white rounded-lg shadow-lg flex flex-col items-center justify-center p-4"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={400}
              height={400}
              className="w-full h-full object-contain mb-4"
            />
            <p className="text-md font-semibold mb-4">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
