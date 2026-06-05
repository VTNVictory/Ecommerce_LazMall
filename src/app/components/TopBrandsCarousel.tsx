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
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Thương Hiệu Nổi Bật</h2>
        <button className="flex items-center gap-2 text-[#f57224] hover:text-[#d45a1b] font-semibold">
          Xem tất cả
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Cover Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <ImageWithFallback
                src={brand.coverImage}
                alt={brand.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Logo Overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full p-2 shadow-lg">
                <ImageWithFallback
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Brand Info */}
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <h3 className="font-bold text-gray-800">{brand.name}</h3>
                {brand.verified && <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500" />}
              </div>
              <div className="inline-block px-3 py-1 bg-[#fff3ed] text-[#f57224] text-sm font-semibold rounded-full">
                {brand.discount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
