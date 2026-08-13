"use client";

import { Star, ShoppingCart, Eye, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import QuickViewModal from "./QuickViewModal";

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
  id,
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
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, image, price, originalPrice });
    toast.success(`Đã thêm '${name}' vào giỏ hàng!`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative subtle border on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ padding: '1px' }}>
          <div className="w-full h-full bg-white rounded-2xl"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full bg-white rounded-2xl overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
            <ImageWithFallback
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            
            {/* Overlay gradient for premium look */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {isOfficial && (
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 text-xs font-bold rounded-lg shadow-md flex items-center gap-1 backdrop-blur-sm">
                  <Star className="w-3 h-3 fill-current" />
                  Mall
                </div>
              )}
            </div>

            {discount && (
              <div className="absolute top-3 right-3 bg-gradient-to-br from-yellow-300 to-yellow-500 text-red-700 px-2.5 py-1.5 text-xs font-black rounded-lg shadow-md transform rotate-3 group-hover:rotate-6 transition-transform z-10">
                -{discount}%
              </div>
            )}

            {/* Hover Actions */}
            <div
              className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 z-20 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg backdrop-blur-md"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Thêm vào giỏ
                </button>
                <button 
                  onClick={handleQuickView}
                  className="bg-white/90 hover:bg-white text-gray-900 p-2.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg backdrop-blur-md"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 flex flex-col flex-1 justify-between bg-white relative">
            <div>
              {/* Product Name */}
              <h3 className="text-sm text-gray-700 line-clamp-2 h-10 leading-5 font-medium group-hover:text-gray-900 transition-colors">{name}</h3>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2 flex-wrap">
                <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                  {formatPrice(price)}
                </div>
                {originalPrice && (
                  <div className="text-xs text-gray-400 line-through font-medium">
                    {formatPrice(originalPrice)}
                  </div>
                )}
              </div>
            </div>

            {/* Rating & Sales */}
            <div className="flex items-center justify-between text-xs text-gray-600 mt-4 border-t border-gray-50 pt-3">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-3.5 h-3.5 fill-current drop-shadow-sm" />
                  <span className="text-gray-800 font-bold">{rating}</span>
                </div>
                <span className="text-gray-400">({reviewCount})</span>
              </div>
              <span className="text-gray-500 flex items-center gap-1 font-medium">
                {parseInt(soldCount) > 1000 && <TrendingUp className="w-3 h-3 text-red-500" />}
                Đã bán {soldCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <QuickViewModal 
        productId={id}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
