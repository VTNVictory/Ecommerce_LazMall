import { Star, ShoppingCart, Eye } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  soldCount: string;
  isOfficial?: boolean;
  discount?: number;
}

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductCard({
  name,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  soldCount,
  isOfficial = true,
  discount,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#f57224] transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Official Badge */}
        {isOfficial && (
          <div className="absolute top-2 left-2 bg-[#f57224] text-white px-2 py-1 text-xs font-bold rounded">
            Mall
          </div>
        )}

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-2 right-2 bg-[#ffeb3b] text-[#d32f2f] px-2 py-1 text-xs font-bold rounded">
            -{discount}%
          </div>
        )}

        {/* Hover Actions */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-2">
            <button className="flex-1 bg-[#f57224] hover:bg-[#d45a1b] text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Thêm vào giỏ
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-lg transition-colors">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Product Name */}
        <h3 className="text-sm text-gray-800 line-clamp-2 mb-2 h-10 leading-5">{name}</h3>

        {/* Price */}
        <div className="mb-2">
          <div className="text-lg font-bold text-[#f57224]">{formatPrice(price)}</div>
          {originalPrice && (
            <div className="text-xs text-gray-400 line-through">{formatPrice(originalPrice)}</div>
          )}
        </div>

        {/* Rating & Sales */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-[#ffc107]">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-gray-700 font-medium">{rating}</span>
            </div>
            <span className="text-gray-400">({reviewCount})</span>
          </div>
          <span className="text-gray-500">Đã bán {soldCount}</span>
        </div>
      </div>
    </div>
  );
}
