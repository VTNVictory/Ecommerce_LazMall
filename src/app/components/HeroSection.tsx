import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Zap, Star } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

const mainBanners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&q=80",
    title: "SIÊU SALE THƯƠNG HIỆU",
    subtitle: "Giảm đến 70% - Voucher 500K",
    color: "from-blue-900/90 to-transparent",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1532795986-dbef1643a596?w=1200&q=80",
    title: "MUA 1 TẶNG 1",
    subtitle: "Áp dụng cho hàng ngàn sản phẩm",
    color: "from-purple-900/90 to-transparent",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200&q=80",
    title: "FLASH SALE 12H",
    subtitle: "Deal hot mỗi ngày",
    color: "from-orange-900/90 to-transparent",
  },
];

const sideBanners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1769509456084-dacd3cde0e20?w=400&q=80",
    title: "Thương Hiệu Cao Cấp",
    badge: "TOP BRAND",
    icon: <Star className="w-4 h-4 mr-1 inline" />,
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1763998836276-dbf91ae7d452?w=400&q=80",
    title: "Siêu Voucher 50%",
    badge: "HOT DEAL",
    icon: <Zap className="w-4 h-4 mr-1 inline" />,
    gradient: "from-orange-500 to-red-500"
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainBanners.length);
    }, 5000);
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
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Banner Slider */}
        <div className="lg:col-span-8">
          <div className="relative aspect-[16/8] md:aspect-[21/9] rounded-3xl overflow-hidden group shadow-2xl h-full">
            {/* Slides */}
            <div className="absolute inset-0 w-full h-full">
              {mainBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                >
                  <ImageWithFallback
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} to-transparent mix-blend-multiply`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-16 z-10">
                    <span className="text-white/80 font-medium tracking-[0.2em] text-sm md:text-base mb-2 uppercase translate-y-4 animate-fade-in-up">
                      Exclusive Offer
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-lg">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-lg font-light drop-shadow-md">
                      {banner.subtitle}
                    </p>
                    <button className="relative overflow-hidden group/btn px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all w-fit flex items-center gap-2 transform hover:-translate-y-1">
                      <span className="relative z-10">Khám Phá Ngay</span>
                      <ChevronRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-gray-100 to-gray-200 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left"></div>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 z-20"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 z-20"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {mainBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "w-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Side Banners */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          {sideBanners.map((banner) => (
            <div
              key={banner.id}
              className="relative flex-1 rounded-3xl overflow-hidden group cursor-pointer shadow-xl min-h-[160px] h-full"
            >
              <ImageWithFallback
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} opacity-60 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent">
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold rounded-full flex items-center shadow-lg">
                    {banner.icon}
                    {banner.badge}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-extrabold text-xl md:text-2xl drop-shadow-md mb-2">{banner.title}</h3>
                  <div className="h-1 w-12 bg-white rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
