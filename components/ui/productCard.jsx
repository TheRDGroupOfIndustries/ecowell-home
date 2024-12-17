import Image from "next/image";
import { Button } from "./button";

const ProductCard = ({ product }) => {
  return (
    <div className="w-[280px] group bg-white hover:bg-[#BDC3C7] rounded-lg shadow-md border p-2 ease-in-out duration-300 overflow-hidden">
      <div className="absolute z-50 bg-[#0B3D2E] text-white text-xs font-bold px-2 py-1 rounded-tr-lg">
        {product.discount}
      </div>

      <div className="w-full h-[200px] relative bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 ease-in-out duration-300 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 ease-in-out duration-300 overflow-hidden">
          <Image
            src={product.hoverImage}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="mt-1">
        <h3 className="text-sm font-bold">{product.title}</h3>

        <div className="w-fit flex items-center gap-1 text-xs my-2 bg-white px-1 py-0.5 rounded-sm">
          <span>⭐</span>
          <span>{product.rating}</span>
          <span className="text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{product.price}</span>
          <span className="text-sm line-through text-gray-500">
            {product.oldPrice}
          </span>
        </div>

        <Button className="mt-4 w-full bg-[#0B3D2E] text-white py-2 rounded-md hover:bg-green-700 transition">
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
