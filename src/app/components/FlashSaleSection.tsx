import { useState, useEffect } from "react";
import { Clock, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import * as Progress from "@radix-ui/react-progress";

interface FlashProduct {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  sold: number;
  stock: number;
}

const flashProducts: FlashProduct[] = [
  {
    id: 1,
    name: "MacBook Pro 14\" M3 Chip",
    image: "https://images.unsplash.com/photo-1636115305669-9096bffe87fd?w=300&q=80",
    originalPrice: 45990000,
    salePrice: 32193000,
    discount: 30,
    sold: 78,
    stock: 100,
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max 256GB",
    image: "https://images.unsplash.com/photo-1426024084828-5da21e13f5dc?w=300&q=80",
    originalPrice: 29990000,
    salePrice: 20993000,
    discount: 30,
    sold: 145,
    stock: 200,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Headphones",
    image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=300&q=80",
    originalPrice: 8990000,
    salePrice: 6293000,
    discount: 30,
    sold: 234,
    stock: 300,
  },
  {
    id: 4,
    name: "iPad Pro 12.9\" M2",
    image: "https://images.unsplash.com/photo-1596207498818-edb80522f50b?w=300&q=80",
    originalPrice: 28990000,
    salePrice: 20293000,
    discount: 30,
    sold: 89,
    stock: 150,
  },
  {
    id: 5,
    name: "Apple Watch Ultra 2",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=300&q=80",
    originalPrice: 19990000,
    salePrice: 13993000,
    discount: 30,
    sold: 167,
    stock: 250,
  },
];

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
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-[#d32f2f] to-[#f44336] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">⚡ FLASH SALE</h2>
            <CountdownTimer />
          </div>
          <button className="flex items-center gap-2 text-white hover:text-white/90 font-semibold">
            Xem tất cả
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Products */}
        <div className="bg-white p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {flashProducts.map((product) => {
              const soldPercentage = (product.sold / product.stock) * 100;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 bg-[#ffeb3b] text-[#d32f2f] px-2 py-1 rounded font-bold text-sm">
                      -{product.discount}%
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 h-10">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-3">
                      <div className="text-lg font-bold text-[#d32f2f]">
                        {formatPrice(product.salePrice)}
                      </div>
                      <div className="text-xs text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1">
                      <Progress.Root
                        className="relative overflow-hidden bg-gray-200 rounded-full w-full h-5"
                        value={soldPercentage}
                      >
                        <Progress.Indicator
                          className="w-full h-full bg-gradient-to-r from-[#f57224] to-[#d45a1b] transition-transform duration-300 ease-in-out flex items-center justify-center"
                          style={{ transform: `translateX(-${100 - soldPercentage}%)` }}
                        >
                          <span className="absolute text-xs font-bold text-white left-1/2 -translate-x-1/2">
                            Đã bán {product.sold}
                          </span>
                        </Progress.Indicator>
                      </Progress.Root>
                      {soldPercentage > 80 && (
                        <p className="text-xs text-[#d32f2f] font-semibold">🔥 Sắp cháy hàng!</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
