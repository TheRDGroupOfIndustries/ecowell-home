const ProductCardSkeleton = () => {
    return (
      <div className="flex flex-col bg-white rounded-lg overflow-hidden h-full animate-pulse">
        <div className="w-full aspect-square bg-gray-200"></div>
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-12 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  };
  
  export default ProductCardSkeleton;