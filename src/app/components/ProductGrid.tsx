import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "MacBook Pro 14 M3 Chip - 512GB SSD - 18GB RAM - Chính hãng Apple Việt Nam",
    image: "https://images.unsplash.com/photo-1636115305669-9096bffe87fd?w=400&q=80",
    price: 45990000,
    originalPrice: 52990000,
    rating: 4.9,
    reviewCount: 543,
    soldCount: "2.5k+",
    discount: 13,
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max 256GB - Chính hãng VN/A - Trả góp 0%",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
    price: 29990000,
    originalPrice: 34990000,
    rating: 4.8,
    reviewCount: 892,
    soldCount: "5k+",
    discount: 14,
  },
  {
    id: 3,
    name: "La Roche-Posay Serum Vitamin C - Làm sáng da, mờ thâm nám",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&q=80",
    price: 725000,
    originalPrice: 950000,
    rating: 4.7,
    reviewCount: 1234,
    soldCount: "10k+",
    discount: 24,
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 - Tai nghe chống ồn cao cấp - Chính hãng",
    image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=400&q=80",
    price: 8490000,
    originalPrice: 9990000,
    rating: 4.9,
    reviewCount: 678,
    soldCount: "3.2k+",
    discount: 15,
  },
  {
    id: 5,
    name: "Ghế Gaming E-Dra Mars EGC203 - Tựa lưng cao - Đệm êm ái",
    image: "https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=400&q=80",
    price: 3490000,
    originalPrice: 4990000,
    rating: 4.6,
    reviewCount: 432,
    soldCount: "1.8k+",
    discount: 30,
  },
  {
    id: 6,
    name: "iPad Pro 12.9 M2 - 256GB - WiFi - Chính hãng Apple",
    image: "https://images.unsplash.com/photo-1596207498818-edb80522f50b?w=400&q=80",
    price: 28990000,
    originalPrice: 31990000,
    rating: 4.8,
    reviewCount: 456,
    soldCount: "1.5k+",
    discount: 9,
  },
  {
    id: 7,
    name: "Bộ Makeup Charlotte Tilbury - Pillow Talk Collection - Chính hãng UK",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
    price: 2490000,
    originalPrice: 3290000,
    rating: 4.9,
    reviewCount: 789,
    soldCount: "4.3k+",
    discount: 24,
  },
  {
    id: 8,
    name: "Bàn làm việc gỗ Oak cao cấp - Thiết kế Bắc Âu hiện đại",
    image: "https://images.unsplash.com/photo-1602872029708-84d970d3382b?w=400&q=80",
    price: 5990000,
    originalPrice: 7990000,
    rating: 4.7,
    reviewCount: 234,
    soldCount: "890+",
    discount: 25,
  },
  {
    id: 9,
    name: "Sofa 3 chỗ ngồi vải nhung cao cấp - Chân gỗ Sồi tự nhiên",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    price: 12990000,
    originalPrice: 16990000,
    rating: 4.8,
    reviewCount: 345,
    soldCount: "567+",
    discount: 24,
  },
  {
    id: 10,
    name: "Apple Watch Ultra 2 - 49mm Titanium - GPS + Cellular",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80",
    price: 19990000,
    originalPrice: 22990000,
    rating: 4.9,
    reviewCount: 567,
    soldCount: "2.1k+",
    discount: 13,
  },
  {
    id: 11,
    name: "L'Oreal Paris Revitalift Crystal Serum - Tinh chất dưỡng da cao cấp",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80",
    price: 445000,
    originalPrice: 625000,
    rating: 4.6,
    reviewCount: 1567,
    soldCount: "15k+",
    discount: 29,
  },
  {
    id: 12,
    name: "Đèn LED trang trí phòng khách - Thiết kế hiện đại - Điều khiển từ xa",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&q=80",
    price: 1290000,
    originalPrice: 1790000,
    rating: 4.7,
    reviewCount: 678,
    soldCount: "3.4k+",
    discount: 28,
  },
];

export default function ProductGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dành Riêng Cho Bạn</h2>
        <p className="text-gray-600 mt-1">Sản phẩm được chọn lọc đặc biệt</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-8 text-center">
        <button className="px-8 py-3 border-2 border-[#f57224] text-[#f57224] hover:bg-[#f57224] hover:text-white font-semibold rounded-lg transition-colors">
          Xem thêm sản phẩm
        </button>
      </div>
    </section>
  );
}
