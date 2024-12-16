import { specialOfferProducts } from "@/constants/product";
import ProductCard from "@/components/ui/productCard";

const RecommendedProducts = () => {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center gap-6 p-8">
      <h2 className="text-2xl font-semibold">Recommended Products</h2>
      <div className="w-full flex flex-wrap items-center justify-center gap-6">
        {specialOfferProducts &&
          specialOfferProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
