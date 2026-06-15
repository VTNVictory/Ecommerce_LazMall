"use client";

import { useState, useEffect, use } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ImageWithFallback } from "../../components/ImageWithFallback";
import { useCart } from "@/context/CartContext";
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Heart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  soldCount: string;
  stock: number;
  isOfficial: boolean;
  discount?: number;
  categoryId: number;
  category?: {
    name: string;
  };
}

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Sản phẩm không tồn tại");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Lỗi fetch sản phẩm:", error);
        toast.error("Không tìm thấy sản phẩm yêu cầu");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.warning("Số lượng vượt quá hàng có sẵn trong kho!");
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
      },
      quantity
    );
    toast.success(`Đã thêm ${quantity} sản phẩm '${product.name}' vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
      },
      quantity
    );
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-t-[#f57224] border-gray-200 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium animate-pulse">Đang tải chi tiết sản phẩm...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-4">
          <div className="text-center max-w-md space-y-4">
            <div className="text-6xl">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800">Không Tìm Thấy Sản Phẩm</h2>
            <p className="text-gray-500">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.</p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2.5 bg-[#f57224] text-white font-semibold rounded-lg hover:bg-[#d45a1b] transition-colors cursor-pointer"
            >
              Quay lại Trang chủ
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-[1400px] mx-auto px-4 py-8 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <span className="hover:text-[#f57224] cursor-pointer" onClick={() => router.push("/")}>Trang chủ</span>
          <span>&gt;</span>
          <span>{product.category?.name || "Danh mục"}</span>
          <span>&gt;</span>
          <span className="text-gray-800 line-clamp-1">{product.name}</span>
        </div>

        {/* Product Details Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Column Image */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-square border border-gray-100 rounded-xl overflow-hidden bg-gray-50">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isOfficial && (
                <div className="absolute top-4 left-4 bg-[#f57224] text-white px-3 py-1 text-sm font-bold rounded shadow-sm">
                  Mall
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center gap-6 py-2 border-t border-gray-100 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600" /> 100% Chính hãng</span>
              <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4 text-blue-600" /> 15 Ngày đổi trả</span>
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-purple-600" /> Giao miễn phí</span>
            </div>
          </div>

          {/* Column Info */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Product Title */}
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Sold count */}
              <div className="flex items-center gap-6 text-sm divide-x divide-gray-200">
                <div className="flex items-center gap-1 text-[#ffc107]">
                  <span className="text-gray-800 font-semibold underline mr-1">{product.rating}</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-gray-400 text-xs ml-1">({product.reviewCount} đánh giá)</span>
                </div>
                <div className="pl-6 text-gray-600">
                  Đã bán <span className="font-semibold text-gray-800">{product.soldCount}</span>
                </div>
              </div>

              {/* Price Area */}
              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-[#f57224]">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                      <span className="bg-[#ffeb3b] text-[#d32f2f] text-xs font-bold px-2 py-0.5 rounded">
                        -{product.discount || Math.round((1 - product.price/product.originalPrice)*100)}%
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  ⚡ Giá cam kết tốt nhất tại Việt Nam
                </p>
              </div>

              {/* Shipping info */}
              <div className="space-y-2 text-sm text-gray-600 py-2">
                <div className="flex gap-4">
                  <span className="w-24 font-medium text-gray-400">Vận chuyển:</span>
                  <span className="text-gray-800">Miễn phí vận chuyển đến địa chỉ của bạn.</span>
                </div>
                <div className="flex gap-4">
                  <span className="w-24 font-medium text-gray-400">Tình trạng:</span>
                  <span className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.stock > 0 ? `Còn hàng (Trong kho còn ${product.stock} sản phẩm)` : "Hết hàng"}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="flex items-center gap-4 py-2">
                  <span className="w-24 font-medium text-sm text-gray-400">Số lượng:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={handleDecrease}
                      className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold text-gray-800">{quantity}</span>
                    <button
                      onClick={handleIncrease}
                      className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
              {product.stock > 0 ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 border-2 border-[#f57224] text-[#f57224] hover:bg-orange-50 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3.5 bg-[#f57224] hover:bg-[#d45a1b] text-white font-bold rounded-xl transition-colors cursor-pointer shadow-sm shadow-orange-500/20"
                  >
                    Mua ngay
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="w-full py-3.5 bg-gray-200 text-gray-400 font-bold rounded-xl cursor-not-allowed text-center"
                >
                  Sản phẩm tạm hết hàng
                </button>
              )}
              <button className="px-4 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 cursor-pointer flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4">
            Mô tả sản phẩm
          </h2>
          <div className="prose max-w-none text-gray-600 text-sm leading-relaxed space-y-4 whitespace-pre-line">
            {product.description || "Chưa có thông tin mô tả chi tiết cho sản phẩm này."}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
