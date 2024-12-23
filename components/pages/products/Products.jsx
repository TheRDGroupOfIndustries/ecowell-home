import { specialOfferProducts } from "@/constants/product";
import ProductCard from "../../ui/productCard";
import { Button } from "@/components/ui/button";
import { CiFilter } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";

const Products = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 mt-28">
      <div className="w-full h-fit flex-center">
        <Button variant="link" size="sm" className="text-md">
          <CiFilter size={20} />
          Filter
        </Button>
      </div>
      <div className="flex-between space-x-4 overflow-x-auto mt-4 text-lg text-primary-clr border-b-2 border-primary-clr pb-4">
        <button className="text-secondary-clr hover:text-secondary-clr">
          Premium plant protein
        </button>
        <button className="hover:text-secondary-clr">
          Premium Whey protein
        </button>
        <button className="hover:text-secondary-clr">Super Essentials</button>
        <button className="hover:text-secondary-clr">Premium Shilajit</button>
        <button className="hover:text-secondary-clr">
          Collagen & Skin Peptides
        </button>
      </div>
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-xl font-medium">420 Products</h1>
        <Button variant="outline" size="sm" className="text-md">
          <CgSortAz size={20} />
          Sort by
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {specialOfferProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
