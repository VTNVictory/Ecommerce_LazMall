"use client";

import { useState, useEffect } from "react";
import { Clock, ChevronRight, Zap } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import * as Progress from "@radix-ui/react-progress";
import { useRouter } from "next/navigation";

interface FlashProduct {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  discount: number;
  soldCount: string;
  stock: number;
}

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

function CountdownTimer() {
  const [time, setTime] = useState({
    hours: 2,
    minutes: 34,
    seconds: 45,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 2;
          minutes = 34;
          seconds = 45;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 lg:gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-inner">
      <Clock className="w-5 h-5 text-white animate-pulse" />
      <span className="text-white font-medium hidden md:inline">Kết Thúc Sau:</span>
      <div className="flex gap-1.5 items-center">
        <div className="bg-white/95 text-red-600 font-black text-sm lg:text-base px-2 py-1 rounded-md min-w-[36px] text-center shadow-sm">
          {String(time.hours).padStart(2, "0")}
        </div>
        <span className="text-white font-bold text-lg mb-1">:</span>
        <div className="bg-white/95 text-red-600 font-black text-sm lg:text-base px-2 py-1 rounded-md min-w-[36px] text-center shadow-sm">
          {String(time.minutes).padStart(2, "0")}
        </div>
        <span className="text-white font-bold text-lg mb-1">:</span>
        <div className="bg-white/95 text-red-600 font-black text-sm lg:text-base px-2 py-1 rounded-md min-w-[36px] text-center shadow-sm">
          {String(time.seconds).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

export default function FlashSaleSection() {
  const [products, setProducts] = useState<FlashProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchFlashProducts() {
      try {
        setLoading(true);
        const res = await fetch("/api/products?flashSale=true");
        if (!res.ok) throw new Error("Không thể lấy sản phẩm flash sale");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Lỗi fetch sản phẩm flash sale:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFlashProducts();
  }, []);

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-500 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-yellow-400 opacity-20 rounded-full blur-3xl"></div>
        
        {/* Header */}
        <div className="p-6 md:p-8 flex items-center justify-between flex-wrap gap-4 relative z-10">
          <div className="flex items-center gap-4 lg:gap-8">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white flex items-center gap-2 drop-shadow-md tracking-tight">
              <Zap className="w-8 h-8 md:w-10 md:h-10 text-yellow-300 animate-pulse fill-yellow-300" />
              FLASH SALE
            </h2>
            <CountdownTimer />
          </div>
          <button className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 border border-white/20">
            Xem tất cả
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Products */}
        <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-t-3xl md:rounded-t-none mt-2 md:mt-0 relative z-10 border-t border-white/50">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3 space-y-4 animate-pulse shadow-sm">
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-medium">Không có chương trình Flash Sale nào diễn ra lúc này.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {products.map((product, index) => {
                const soldNum = parseInt(product.soldCount) || 15;
                const stockTotal = product.stock || 100;
                const soldPercentage = (soldNum / (stockTotal + soldNum)) * 100;

                return (
                  <div
                    key={product.id}
                    onClick={() => router.push(`/product/${product.id}`)}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-red-200 transition-all duration-300 cursor-pointer group flex flex-col h-full justify-between transform hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      {/* Discount Badge */}
                      {product.discount && (
                        <div className="absolute top-3 right-3 bg-gradient-to-br from-yellow-300 to-yellow-500 text-red-700 px-2.5 py-1.5 rounded-lg font-black text-sm shadow-md transform rotate-3 group-hover:rotate-6 transition-transform">
                          -{product.discount}%
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 line-clamp-2 h-10 leading-5 group-hover:text-red-600 transition-colors">
                          {product.name}
                        </h3>

                        {/* Price */}
                        <div className="mt-3 flex items-end gap-2 flex-wrap">
                          <div className="text-xl font-black text-red-600 tracking-tight">
                            {formatPrice(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-xs text-gray-400 line-through font-medium mb-0.5">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-1.5 mt-auto">
                        <Progress.Root
                          className="relative overflow-hidden bg-red-100 rounded-full w-full h-4 shadow-inner"
                          value={soldPercentage}
                        >
                          <Progress.Indicator
                            className="w-full h-full bg-gradient-to-r from-red-500 to-orange-400 transition-transform duration-500 ease-out flex items-center justify-center relative"
                            style={{ transform: `translateX(-${100 - soldPercentage}%)` }}
                          >
                            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                          </Progress.Indicator>
                            <span className="absolute text-[10px] font-bold text-white left-1/2 -translate-x-1/2 top-0 bottom-0 flex items-center whitespace-nowrap drop-shadow-md z-10 mix-blend-difference">
                              Đã bán {product.soldCount}
                            </span>
                        </Progress.Root>
                        {soldPercentage > 80 && (
                          <p className="text-[10px] text-red-600 font-bold text-center mt-1 animate-pulse">🔥 Sắp cháy hàng!</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
