"use client";

import { useState, useEffect, use } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ImageWithFallback } from "../../components/ImageWithFallback";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Heart, Minus, Plus, Share2, ThumbsUp } from "lucide-react";
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

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews'>('desc');
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const fetchProductAndReviews = async () => {
    try {
      setLoading(true);
      const [resProd, resRev] = await Promise.all([
        fetch(`/api/products/${id}`),
        fetch(`/api/reviews?productId=${id}`)
      ]);
      
      if (!resProd.ok) throw new Error("Sản phẩm không tồn tại");
      const dataProd = await resProd.json();
      setProduct(dataProd);

      if (resRev.ok) {
        const dataRev = await resRev.json();
        setReviews(dataRev);
      }
    } catch (error) {
      console.error("Lỗi fetch sản phẩm:", error);
      toast.error("Không tìm thấy sản phẩm yêu cầu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductAndReviews();
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
    handleAddToCart();
    router.push("/cart");
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Vui lòng đăng nhập để đánh giá");
      return;
    }
    if (!commentInput.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product?.id,
          rating: ratingInput,
          comment: commentInput,
          userId: user.id
        })
      });

      if (!res.ok) throw new Error("Lỗi khi gửi đánh giá");
      
      toast.success("Gửi đánh giá thành công!");
      setCommentInput("");
      setRatingInput(5);
      fetchProductAndReviews(); // Refresh data
    } catch (error) {
      toast.error("Có lỗi xảy ra, thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-t-indigo-600 border-indigo-200 rounded-full animate-spin shadow-lg"></div>
            <p className="text-gray-500 font-medium animate-pulse">Đang tải chi tiết sản phẩm...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-4">
          <div className="text-center max-w-md space-y-4 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800">Không Tìm Thấy Sản Phẩm</h2>
            <p className="text-gray-500">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-[1200px] mx-auto px-4 py-8 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 bg-white py-2 px-4 rounded-full w-fit shadow-sm border border-gray-100">
          <span className="hover:text-indigo-600 font-medium transition-colors cursor-pointer" onClick={() => router.push("/")}>Trang chủ</span>
          <span>/</span>
          <span className="hover:text-indigo-600 font-medium transition-colors cursor-pointer">{product.category?.name || "Danh mục"}</span>
          <span>/</span>
          <span className="text-gray-800 font-semibold line-clamp-1">{product.name}</span>
        </div>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          {/* Column Image */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative aspect-square border border-gray-100 rounded-2xl overflow-hidden bg-gray-50 group shadow-inner">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {product.isOfficial && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 text-sm font-bold rounded-lg shadow-md flex items-center gap-1 backdrop-blur-sm z-10">
                  <Star className="w-4 h-4 fill-current" />
                  Mall
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs md:text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500" /> 100% Chính hãng</span>
              <span className="flex items-center gap-2"><RotateCcw className="w-5 h-5 text-blue-500" /> 15 Ngày đổi trả</span>
              <span className="flex items-center gap-2"><Truck className="w-5 h-5 text-purple-500" /> Giao miễn phí</span>
            </div>
          </div>

          {/* Column Info */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Product Title */}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
                  {product.name}
                </h1>
                
                {/* Rating & Sold count */}
                <div className="flex items-center gap-6 text-sm divide-x divide-gray-200">
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <span className="text-gray-900 font-bold text-base border-b border-gray-900">{product.rating.toFixed(1)}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(product.rating)
                              ? "fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 font-medium ml-1">({product.reviewCount} Đánh giá)</span>
                  </div>
                  <div className="pl-6 text-gray-500 font-medium flex items-center gap-2">
                    Đã bán <span className="font-bold text-gray-900">{product.soldCount}</span>
                  </div>
                </div>
              </div>

              {/* Price Area */}
              <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-100 p-6 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="flex items-baseline gap-4 relative z-10">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <div className="flex flex-col">
                      <span className="text-base text-gray-400 line-through font-medium">{formatPrice(product.originalPrice)}</span>
                      <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-red-700 text-xs font-black px-2 py-0.5 rounded shadow-sm w-fit mt-1">
                        -{product.discount || Math.round((1 - product.price/product.originalPrice)*100)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="flex items-center gap-6 py-2">
                  <span className="w-24 text-sm font-medium text-gray-400">Số lượng:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                    <button
                      onClick={handleDecrease}
                      className="p-3 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer active:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-14 text-center text-base font-bold text-gray-900">{quantity}</span>
                    <button
                      onClick={handleIncrease}
                      className="p-3 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer active:bg-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-4 border-t border-gray-100">
              {product.stock > 0 ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:translate-y-0"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/30 transform hover:-translate-y-1 active:translate-y-0"
                  >
                    Mua ngay
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="w-full py-4 bg-gray-200 text-gray-400 font-bold rounded-2xl cursor-not-allowed text-center"
                >
                  Sản phẩm tạm hết hàng
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section for Description and Reviews */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-10">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('desc')}
              className={`flex-1 py-5 text-lg font-bold transition-all relative ${
                activeTab === 'desc' ? 'text-indigo-600 bg-indigo-50/30' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Mô Tả Sản Phẩm
              {activeTab === 'desc' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-5 text-lg font-bold transition-all relative ${
                activeTab === 'reviews' ? 'text-indigo-600 bg-indigo-50/30' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Đánh Giá & Nhận Xét ({product.reviewCount})
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full"></div>
              )}
            </button>
          </div>

          <div className="p-6 md:p-10">
            {activeTab === 'desc' && (
              <div className="animate-fade-in-up">
                <div className="prose max-w-none text-gray-700 text-base leading-relaxed space-y-6 whitespace-pre-line font-medium">
                  {product.description || "Chưa có thông tin mô tả chi tiết cho sản phẩm này."}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fade-in-up space-y-10">
                {/* Rating Overview */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-center flex flex-col items-center min-w-[150px]">
                    <span className="text-5xl font-black text-gray-900">{product.rating.toFixed(1)}</span>
                    <span className="text-gray-500 font-medium mb-3 mt-1">trên 5</span>
                    <div className="flex gap-1 text-yellow-400 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-current" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{product.reviewCount} đánh giá</span>
                  </div>
                  
                  {/* Form Gửi Đánh Giá */}
                  <div className="flex-1 w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 text-lg">Viết đánh giá của bạn</h3>
                    {user ? (
                      <form onSubmit={submitReview} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">Chọn sao:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRatingInput(star)}
                                className="focus:outline-none"
                              >
                                <Star className={`w-6 h-6 ${star <= ratingInput ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <textarea
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này..."
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-28 text-sm"
                          required
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        >
                          {isSubmitting ? "Đang gửi..." : "Gửi Đánh Giá"}
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-3 text-sm">Vui lòng đăng nhập để viết đánh giá</p>
                        <button
                          onClick={() => router.push("/login")}
                          className="px-6 py-2 bg-white border border-gray-200 text-indigo-600 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm"
                        >
                          Đăng Nhập
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg">
                              {review.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{review.user.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex gap-0.5 text-yellow-400">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-400 font-medium">
                                  {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
