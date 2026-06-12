"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { Trash2, ShoppingBag, ArrowLeft, Send, CheckCircle2, ShieldCheck, User, QrCode, CreditCard, Receipt, Percent } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // Coupon states
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discountVal, setDiscountVal] = useState(0);

  // Checkout states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  // Tự động điền thông tin từ người dùng đăng nhập
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleApplyCoupon = (e: React.MouseEvent) => {
    e.preventDefault();
    const code = couponInput.toUpperCase().trim();
    
    if (!code) {
      return toast.error("Vui lòng nhập mã giảm giá");
    }

    if (code === "LAZMALL10") {
      const discount = cartTotal * 0.1;
      setDiscountVal(discount);
      setAppliedCoupon(code);
      toast.success("Áp dụng mã LAZMALL10 thành công! Giảm 10% đơn hàng.");
    } else if (code === "FREESHIP") {
      const discount = Math.min(50000, cartTotal);
      setDiscountVal(discount);
      setAppliedCoupon(code);
      toast.success("Áp dụng mã FREESHIP thành công! Giảm 50.000đ.");
    } else if (code === "HOANXU20") {
      const discount = Math.min(20000, cartTotal);
      setDiscountVal(discount);
      setAppliedCoupon(code);
      toast.success("Áp dụng mã HOANXU20 thành công! Giảm 20.000đ.");
    } else {
      toast.error("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    setDiscountVal(0);
    setCouponInput("");
    toast.info("Đã hủy áp dụng mã giảm giá");
  };

  const finalTotal = Math.max(0, cartTotal - discountVal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Vui lòng nhập họ tên nhận hàng");
    if (!phone.trim()) return toast.error("Vui lòng nhập số điện thoại");
    if (!address.trim()) return toast.error("Vui lòng nhập địa chỉ giao hàng");

    const checkoutItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          customerAddress: address,
          items: checkoutItems,
          userId: user ? user.id : null,
          couponCode: appliedCoupon || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Có lỗi xảy ra khi đặt hàng");
      }

      toast.success("Đặt hàng thành công!");
      setOrderSuccess(data.order);
      clearCart();
    } catch (error: any) {
      console.error("Lỗi đặt hàng:", error);
      toast.error(error.message || "Đặt hàng thất bại, vui lòng thử lại");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    // Rút gọn Order ID để làm nội dung chuyển khoản chuyển gọn gàng
    const shortOrderId = orderSuccess.id.split("-")[0].toUpperCase();
    const qrUrl = `https://img.vietqr.io/image/MB-0987654321-print.png?amount=${orderSuccess.totalAmount}&addInfo=${encodeURIComponent(`LAZMALL ${shortOrderId}`)}&accountName=LAZMALL%20VIETNAM`;

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow max-w-[900px] mx-auto px-4 py-12 w-full">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Success message & Order details */}
            <div className="md:col-span-7 space-y-6">
              <div className="text-center md:text-left space-y-3">
                <div className="flex justify-center md:justify-start">
                  <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Đặt Đơn Hàng Thành Công!</h1>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Cảm ơn bạn đã tin chọn LazMall. Chúng tôi đã ghi nhận đơn hàng và đang chuẩn bị đóng gói giao hàng.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-2xl text-sm space-y-2.5 border border-gray-100">
                <div className="flex items-center gap-1.5 font-bold text-gray-700 pb-2 border-b border-gray-200">
                  <Receipt className="w-4 h-4 text-gray-400" /> Chi tiết hóa đơn:
                </div>
                <div className="flex justify-between"><span className="text-gray-400">Mã đơn hàng:</span> <span className="font-mono font-bold text-gray-800">{orderSuccess.id}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Người nhận:</span> <span className="font-semibold text-gray-800">{orderSuccess.customerName}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Số điện thoại:</span> <span className="font-semibold text-gray-800">{orderSuccess.customerPhone}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Địa chỉ giao:</span> <span className="font-semibold text-gray-800 line-clamp-1">{orderSuccess.customerAddress}</span></div>
                <div className="border-t border-gray-200 pt-2.5 mt-2 flex justify-between items-baseline">
                  <span className="text-gray-500 font-bold">Tổng thanh toán:</span>
                  <span className="text-[#f57224] font-bold text-lg">{formatPrice(orderSuccess.totalAmount)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 py-3.5 bg-[#f57224] hover:bg-[#d45a1b] text-white font-bold rounded-xl transition-colors cursor-pointer text-sm shadow-sm"
                >
                  Tiếp tục mua sắm
                </button>
                {user && (
                  <button
                    onClick={() => router.push("/orders")}
                    className="flex-1 py-3.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-colors cursor-pointer text-sm"
                  >
                    Lịch sử đơn hàng
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: QR Code Payment */}
            <div className="md:col-span-5 bg-orange-50/50 rounded-2xl border border-orange-100 p-6 flex flex-col items-center text-center space-y-4">
              <div className="flex items-center gap-1.5 text-sm font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
                <QrCode className="w-4 h-4" />
                <span>QUÉT MÃ THANH TOÁN QR</span>
              </div>
              
              <p className="text-xs text-orange-700 leading-relaxed max-w-[240px]">
                Hãy quét mã QR dưới đây bằng ứng dụng ngân hàng bất kỳ để thực hiện chuyển khoản tự động.
              </p>

              {/* QR Image Container */}
              <div className="bg-white p-3 rounded-xl border border-orange-200/50 shadow-sm relative group overflow-hidden">
                <img 
                  src={qrUrl}
                  alt="Mã QR Chuyển Khoản LazMall"
                  className="w-48 h-48 object-contain"
                />
              </div>

              {/* Payment Details info */}
              <div className="text-[11px] text-gray-600 space-y-1 bg-white p-3 rounded-xl border border-gray-100 w-full text-left font-medium">
                <div><span className="text-gray-400">Ngân hàng:</span> <span className="font-bold text-gray-800">MB (Quân Đội)</span></div>
                <div><span className="text-gray-400">Chủ tài khoản:</span> <span className="font-bold text-gray-800">LAZMALL VIETNAM</span></div>
                <div><span className="text-gray-400">Số tài khoản:</span> <span className="font-bold text-gray-800">0987654321</span></div>
                <div><span className="text-gray-400">Số tiền:</span> <span className="font-bold text-red-600">{formatPrice(orderSuccess.totalAmount)}</span></div>
                <div><span className="text-gray-400">Nội dung CK:</span> <span className="font-mono font-bold text-blue-600 select-all">LAZMALL {shortOrderId}</span></div>
              </div>

              <div className="text-[10px] text-gray-400 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                <span>Hệ thống sẽ tự động duyệt khi nhận được tiền.</span>
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-[1400px] mx-auto px-4 py-8 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <ShoppingBag className="w-7 h-7 text-[#f57224]" /> Giỏ hàng của bạn
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm space-y-6">
            <div className="text-6xl">🛒</div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-800">Giỏ hàng trống</h2>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Không có sản phẩm nào trong giỏ hàng. Hãy quay lại trang chủ và khám phá hàng ngàn sản phẩm chất lượng.
              </p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-[#f57224] text-white font-bold rounded-xl hover:bg-[#d45a1b] transition-colors cursor-pointer flex items-center gap-2 mx-auto text-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              Bắt đầu mua sắm ngay
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Products List (Left side) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                      {/* Product Image */}
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product details */}
                      <div className="flex-grow flex flex-col justify-between min-w-0">
                        <div className="space-y-1">
                          <h3
                            onClick={() => router.push(`/product/${item.id}`)}
                            className="text-sm font-semibold text-gray-800 hover:text-[#f57224] transition-colors line-clamp-2 cursor-pointer pr-4"
                          >
                            {item.name}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-bold text-[#f57224]">{formatPrice(item.price)}</span>
                            {item.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                            )}
                          </div>

                          {/* Quantity selector & Delete */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer text-xs"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-gray-800">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer text-xs"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to shopping */}
              <button
                onClick={() => router.push("/")}
                className="text-sm text-[#f57224] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer pl-2"
              >
                <ArrowLeft className="w-4 h-4" /> Tiếp tục lựa chọn sản phẩm khác
              </button>
            </div>

            {/* Delivery Form & Summary (Right side) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">Tóm tắt đơn hàng</h2>
                <div className="space-y-3.5 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Số lượng sản phẩm:</span>
                    <span className="font-semibold text-gray-800">{cartItems.reduce((t, i) => t + i.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-semibold text-gray-800">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="text-green-600 font-semibold">Miễn phí</span>
                  </div>

                  {/* Coupon section */}
                  <div className="border-t border-gray-100 pt-3">
                    {appliedCoupon ? (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
                        <div className="text-xs text-green-800">
                          <p className="font-bold flex items-center gap-1"><Percent className="w-3.5 h-3.5 text-green-600" /> Đã áp dụng: {appliedCoupon}</p>
                          <p className="mt-0.5">Giảm giá: -{formatPrice(discountVal)}</p>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs text-red-500 hover:text-red-700 underline font-bold cursor-pointer"
                        >
                          Gỡ
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500">Mã giảm giá (Coupon)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Mã: LAZMALL10, FREESHIP..."
                            className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50 uppercase"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="px-4 py-1.5 bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Áp dụng
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-baseline">
                    <span className="font-bold text-gray-800">Tổng thanh toán:</span>
                    <span className="text-xl font-bold text-[#f57224]">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#f57224]" /> Thông tin nhận hàng
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500">Họ và tên người nhận *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57224]/50 focus:border-[#f57224] bg-gray-50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ví dụ: 0987654321"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57224]/50 focus:border-[#f57224] bg-gray-50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500">Địa chỉ giao hàng *</label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố..."
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57224]/50 focus:border-[#f57224] bg-gray-50 resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57224]/50 focus:border-[#f57224] bg-gray-50"
                    />
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-[10px] text-gray-400 py-2">
                    <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Thông tin cá nhân của bạn được bảo mật tuyệt đối 100%.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#f57224] hover:bg-[#d45a1b] text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed text-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        Đang tạo đơn hàng...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Xác nhận đặt hàng
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
