import { ChevronRight, BadgeCheck } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

const brands = [
  {
    id: 1,
    name: "Gucci",
    coverImage: "https://images.unsplash.com/photo-1722898412903-c22ad6241a20?w=400&q=80",
    logo: "https://images.unsplash.com/photo-1722898412903-c22ad6241a20?w=100&q=80",
    discount: "Ưu đãi đến 50%",
    verified: true,
  },
  {
    id: 2,
    name: "Hermès",
    coverImage: "https://images.unsplash.com/photo-1765285336356-d898b27b3242?w=400&q=80",
    logo: "https://images.unsplash.com/photo-1765285336356-d898b27b3242?w=100&q=80",
    discount: "Giảm đến 40%",
    verified: true,
  },
  {
    id: 3,
    name: "Cartier",
    coverImage: "https://images.unsplash.com/photo-1763998836276-dbf91ae7d452?w=400&q=80",
    logo: "https://images.unsplash.com/photo-1763998836276-dbf91ae7d452?w=100&q=80",
    discount: "Sale cuối mùa 35%",
    verified: true,
  },
  {
    id: 4,
    name: "Bottega Veneta",
    coverImage: "https://images.unsplash.com/photo-1763914766929-d3c06c12e340?w=400&q=80",
    logo: "https://images.unsplash.com/photo-1763914766929-d3c06c12e340?w=100&q=80",
    discount: "Voucher 1 triệu",
    verified: true,
  },
  {
    id: 5,
    name: "YSL",
    coverImage: "https://images.unsplash.com/photo-1772987004126-ccf35a67c623?w=400&q=80",
    logo: "https://images.unsplash.com/photo-1772987004126-ccf35a67c623?w=100&q=80",
    discount: "Mua 1 tặng 1",
    verified: true,
  },
];

export default function TopBrandsCarousel() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-purple-800">
            Thương Hiệu Nổi Bật
          </h2>
          <p className="text-gray-500 mt-2 font-medium">Bộ sưu tập từ các thương hiệu hàng đầu</p>
        </div>
        <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold group transition-colors px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-full">
          Xem tất cả
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {brands.map((brand, index) => (
          <div
            key={brand.id}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 animate-fade-in-up relative"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Cover Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <ImageWithFallback
                src={brand.coverImage}
                alt={brand.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent transition-opacity duration-300" />

              {/* Logo Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full p-1.5 shadow-[0_0_20px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow duration-300 z-10 transform group-hover:-translate-y-2">
                <div className="w-full h-full overflow-hidden rounded-full">
                  <ImageWithFallback
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Brand Info */}
            <div className="pt-8 pb-5 px-4 text-center relative z-10 bg-white group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-indigo-50/30 transition-colors">
              <div className="flex items-center justify-center gap-1.5 mb-3">
                <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-indigo-900 transition-colors">{brand.name}</h3>
                {brand.verified && <BadgeCheck className="w-5 h-5 text-blue-500 fill-white drop-shadow-sm" />}
              </div>
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-bold rounded-full shadow-sm border border-indigo-100/50 group-hover:scale-105 transition-transform">
                {brand.discount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
