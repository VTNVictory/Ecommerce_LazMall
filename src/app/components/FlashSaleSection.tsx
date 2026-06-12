"use client";

import { useState, useEffect } from "react";
import { Clock, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import * as Progress from "@radix-ui/react-progress";
import { useRouter } from "next/navigation";

interface FlashProduct {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  price: number; // Trong DB lưu cột price là giá khuyến mãi
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
          // Reset when countdown ends
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
    <div className="flex items-center gap-2">
      <Clock className="w-5 h-5 text-white" />
      <span className="text-white font-semibold">Kết Thúc Sau:</span>
      <div className="flex gap-1">
        <div className="bg-white text-[#d32f2f] font-bold px-2 py-1 rounded min-w-[32px] text-center">
          {String(time.hours).padStart(2, "0")}
        </div>
        <span className="text-white font-bold">:</span>
        <div className="bg-white text-[#d32f2f] font-bold px-2 py-1 rounded min-w-[32px] text-center">
          {String(time.minutes).padStart(2, "0")}
        </div>
        <span className="text-white font-bold">:</span>
        <div className="bg-white text-[#d32f2f] font-bold px-2 py-1 rounded min-w-[32px] text-center">
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
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-[#d32f2f] to-[#f44336] rounded-2xl overflow-hidden shadow-md">
        {/* Header */}
        <div className="p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">⚡ FLASH SALE</h2>
            <CountdownTimer />
          </div>
          <button className="flex items-center gap-2 text-white hover:text-white/90 font-semibold cursor-pointer">
            Xem tất cả
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Products */}
        <div className="bg-white p-4">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 space-y-4 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Không có chương trình Flash Sale nào diễn ra lúc này.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => {
                const soldNum = parseInt(product.soldCount) || 15;
                const stockTotal = product.stock || 100;
                const soldPercentage = (soldNum / (stockTotal + soldNum)) * 100;

                return (
                  <div
                    key={product.id}
                    onClick={() => router.push(`/product/${product.id}`)}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full justify-between"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Discount Badge */}
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-[#ffeb3b] text-[#d32f2f] px-2 py-1 rounded font-bold text-xs">
                          -{product.discount}%
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 h-10 leading-5">
                          {product.name}
                        </h3>

                        {/* Price */}
                        <div className="mb-3">
                          <div className="text-lg font-bold text-[#d32f2f]">
                            {formatPrice(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-xs text-gray-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-1 mt-2">
                        <Progress.Root
                          className="relative overflow-hidden bg-gray-200 rounded-full w-full h-5"
                          value={soldPercentage}
                        >
                          <Progress.Indicator
                            className="w-full h-full bg-gradient-to-r from-[#f57224] to-[#d45a1b] transition-transform duration-300 ease-in-out flex items-center justify-center"
                            style={{ transform: `translateX(-${100 - soldPercentage}%)` }}
                          >
                            <span className="absolute text-[10px] font-bold text-white left-1/2 -translate-x-1/2 whitespace-nowrap">
                              Đã bán {product.soldCount}
                            </span>
                          </Progress.Indicator>
                        </Progress.Root>
                        {soldPercentage > 80 && (
                          <p className="text-[10px] text-[#d32f2f] font-semibold text-center mt-1">🔥 Sắp cháy hàng!</p>
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
