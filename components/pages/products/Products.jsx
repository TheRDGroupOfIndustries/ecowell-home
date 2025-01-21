"use client";

import { useEffect, useState } from "react";
import { reverseSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProductCard from "@/components/ui/productCard";
import { useNotification } from "@/context/NotificationProvider";
import { CgSortAz } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";

const Products = ({ category, search }) => {
  const { pt } = useNotification();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All Products"]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(
    category ? reverseSlug(category) : ""
  );
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  });
  const [sort, setSort] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [openPopover, setOpenPopover] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (activeCategory) params.append("category", activeCategory);
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);
        params.append("page", pagination.currentPage.toString());
        params.append("limit", "12");

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();
        setProducts(data.products);
        setCategories([...data.categories]);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchProducts();
  }, [activeCategory, sort, pagination.currentPage, search]);

  const handleSort = (value) => {
    setSort(value);
    setSelectedSort(value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    setOpenPopover(false); // Close the popover after selection
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category === "All Products" ? "" : category);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const loadPage = (pageNumber) => {
    setPagination((prev) => ({ ...prev, currentPage: pageNumber }));
  };

  return (
    <div className={`${pt} mt-[120px] px-4 sm:px-8 lg:px-16 overflow-hidden`}>
      <div className="w-full h-fit">
        <Button
          variant="link"
          effect="hoverUnderline"
          size="sm"
          className="text-md"
        >
          <CiFilter size={20} />
          Filter
        </Button>
      </div>
      <div className="flex space-x-4 overflow-x-auto mt-4 text-lg text-primary-clr border-b-2 border-primary-clr pb-4">
        {Array.isArray(categories) &&
          categories.map((category) => (
            <button
              key={category}
              className={`whitespace-nowrap ${
                (category === "All Products" && activeCategory === "") ||
                activeCategory === category
                  ? "text-secondary-clr"
                  : "hover:text-secondary-clr"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-xl font-medium">
          {loading ? "Loading..." : `${pagination.totalProducts} Products`}
          {activeCategory &&
            activeCategory !== "All Products" &&
            ` in ${activeCategory}`}
        </h1>
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="text-md">
              <CgSortAz size={20} className="mr-2" />
              Sort by
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit z-10 p-0 py-1">
            <button
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                selectedSort === "price-low-high"
                  ? "bg-gray-200"
                  : "hover:bg-gray-200/80"
              }`}
              onClick={() => handleSort("price-low-high")}
            >
              Price: Low to High
            </button>
            <button
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                selectedSort === "price-high-low"
                  ? "bg-gray-200"
                  : "hover:bg-gray-200/80"
              }`}
              onClick={() => handleSort("price-high-low")}
            >
              Price: High to Low
            </button>
            <button
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                selectedSort === "rating"
                  ? "bg-gray-200"
                  : "hover:bg-gray-200/80"
              }`}
              onClick={() => handleSort("rating")}
            >
              Highest Rated
            </button>
            <button
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                selectedSort === "newest"
                  ? "bg-gray-200"
                  : "hover:bg-gray-200/80"
              }`}
              onClick={() => handleSort("newest")}
            >
              Newest First
            </button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-6 mt-6">
        {loading ? (
          [...Array(12)].map((_, index) => (
            <ProductCard key={index} loading={true} />
          ))
        ) : (
          <>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No products found.
              </div>
            )}
          </>
        )}
      </div>
      {!loading && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8 mb-8">
          {[...Array(pagination.totalPages)].map((_, i) => (
            <Button
              size="icon"
              effect={i / 2 ? "gooeyRight" : "gooeyLeft"}
              key={i}
              className={`${
                pagination.currentPage === i + 1
                  ? "bg-[#004D3C] text-white"
                  : "text-black bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => loadPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
