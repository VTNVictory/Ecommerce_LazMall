import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

const mainBanners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&q=80",
    title: "SIÊU SALE THƯƠNG HIỆU",
    subtitle: "Giảm đến 70% - Voucher 500K",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1532795986-dbef1643a596?w=1200&q=80",
    title: "MUA 1 TẶNG 1",
    subtitle: "Áp dụng cho hàng ngàn sản phẩm",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200&q=80",
    title: "FLASH SALE 12H",
    subtitle: "Deal hot mỗi ngày",
  },
];

const sideBanners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1769509456084-dacd3cde0e20?w=400&q=80",
    title: "Thương Hiệu Cao Cấp",
    badge: "TOP BRAND",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1763998836276-dbf91ae7d452?w=400&q=80",
    title: "Siêu Voucher 50%",
    badge: "HOT DEAL",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainBanners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mainBanners.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mainBanners.length) % mainBanners.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Banner Slider */}
        <div className="lg:col-span-8">
          <div className="relative aspect-[16/7] rounded-2xl overflow-hidden group">
            {/* Slides */}
            <div className="relative w-full h-full">
              {mainBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <ImageWithFallback
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
                    <div className="flex flex-col justify-center h-full px-8 lg:px-12">
                      <h2 className="text-3xl lg:text-5xl font-bold text-white mb-2">
                        {banner.title}
                      </h2>
                      <p className="text-lg lg:text-xl text-white/90">{banner.subtitle}</p>
                      <button className="mt-6 px-8 py-3 bg-[#f57224] text-white font-semibold rounded-lg hover:bg-[#d45a1b] transition-colors w-fit">
                        Mua Ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {mainBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Side Banners */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
          {sideBanners.map((banner) => (
            <div
              key={banner.id}
              className="relative aspect-[16/7] lg:aspect-[2/1] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <ImageWithFallback
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-[#f57224] text-white text-xs font-bold rounded-full">
                    {banner.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-sm lg:text-base">{banner.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
