import Image from 'next/image';
import { Star } from 'lucide-react';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={imageError ? '/placeholder.svg' : (product.variants && product.variants[0]?.images[0] || '/placeholder.svg')}
          alt={product.title}
          width={400}
          height={400}
          className="w-full h-[300px] object-cover"
          onError={() => setImageError(true)}
        />
        {product.discount && product.discount > 0 && (
          <span className="absolute top-2 right-2 bg-[#004D3C] text-white px-2 py-1 text-xs rounded">
            {Math.round(product.discount)}% OFF
          </span>
        )}
        {product.new && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded">
            NEW
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{product.title}</h3>
        {product.category && (
          <p className="text-sm text-gray-600 mb-2">{product.category.title}</p>
        )}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">
            {product.ratings ? product.ratings.toFixed(1) : 'N/A'} ({product.reviews_number || 0})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">₹{product.salePrice}/-</span>
          {product.price > product.salePrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price}/-
            </span>
          )}
        </div>
        <button className="w-full mt-4 bg-[#004D3C] text-white py-2 rounded hover:bg-[#003D2F] transition-colors">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;