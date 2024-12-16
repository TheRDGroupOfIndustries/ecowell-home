const { default: Image } = require("next/image");
const { Button } = require("./button");

const ProductCard = ({ product }) => {
  return (
    <div className="w-[280px] bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="absolute bg-[#0B3D2E] text-white text-xs font-bold px-2 py-1 rounded-tr-lg">
        {product.discount}
      </div>

      <div className="w-full h-[200px] flex items-center justify-center bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="w-[80%] h-[80%] object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold">{product.title}</h3>

        <div className="flex items-center gap-1 text-sm my-2">
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
