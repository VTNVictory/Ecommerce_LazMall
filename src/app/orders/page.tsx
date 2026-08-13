"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ClipboardList, ArrowLeft, Calendar, PackageCheck, Loader2, RotateCw, Trash2 } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

interface OrderItem {
  id: string;
  productId: number;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
    originalPrice?: number;
  };
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusBadge(status: string) {
  switch (status) {
    case "PENDING":
      return <span className="px-3 py-1.5 text-xs font-bold bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1.5 shadow-sm">⏳ Chờ xử lý</span>;
    case "PROCESSING":
      return <span className="px-3 py-1.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full flex items-center gap-1.5 shadow-sm">📦 Đang đóng gói</span>;
    case "DELIVERED":
      return <span className="px-3 py-1.5 text-xs font-bold bg-purple-100 text-purple-700 rounded-full flex items-center gap-1.5 shadow-sm">🚚 Đang giao hàng</span>;
    case "COMPLETED":
      return <span className="px-3 py-1.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full flex items-center gap-1.5 shadow-sm">✅ Thành công</span>;
    case "CANCELLED":
      return <span className="px-3 py-1.5 text-xs font-bold bg-red-100 text-red-700 rounded-full flex items-center gap-1.5 shadow-sm">❌ Đã hủy</span>;
    default:
      return <span className="px-3 py-1.5 text-xs font-bold bg-gray-100 text-gray-700 rounded-full shadow-sm">{status}</span>;
  }
}

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      toast.error("Vui lòng đăng nhập để xem lịch sử đơn hàng");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        setLoading(true);
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          throw new Error("Lỗi khi tải đơn hàng");
        }
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải lịch sử đơn hàng");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  // Xử lý tự hủy đơn hàng
  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) return;
    try {
      setActionId(orderId);
      const res = await fetch(`/api/orders/${orderId}/cancel`, {
        method: "POST",
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Hủy đơn hàng thất bại");
      
      toast.success("Đơn hàng đã được hủy thành công!");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "CANCELLED" } : o))
      );
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Lỗi khi hủy đơn hàng");
    } finally {
      setActionId(null);
    }
  };

  // Xử lý xác nhận nhận hàng thành công
  const handleConfirmReceived = async (orderId: string) => {
    try {
      setActionId(orderId);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "COMPLETED" }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Xác nhận nhận hàng thất bại");
      
      toast.success("Đã xác nhận nhận hàng! Đơn hàng hoàn tất.");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "COMPLETED" } : o))
      );
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Lỗi khi xác nhận nhận hàng");
    } finally {
      setActionId(null);
    }
  };

  // Xử lý Mua lại đơn hàng
  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart(
        {
          id: item.productId,
          name: item.product.name,
          image: item.product.image,
          price: item.price,
          originalPrice: item.product.originalPrice
        },
        item.quantity
      );
    });
    toast.success("Đã thêm các sản phẩm vào giỏ hàng!");
    router.push("/cart");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <p className="text-gray-500 font-medium text-sm animate-pulse">Đang tải lịch sử đơn hàng...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-[1000px] mx-auto px-4 py-8 w-full">
        {/* Breadcrumb */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors mb-6 cursor-pointer bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
            <ClipboardList className="w-6 h-6" />
          </div>
          Lịch sử đơn hàng
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm space-y-6">
            <div className="w-32 h-32 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <span className="text-6xl">🛍️</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Chưa có đơn hàng nào</h2>
              <p className="text-gray-500 text-base max-w-sm mx-auto">
                Lịch sử mua sắm của bạn hiện đang trống. Hãy đặt hàng ngay hôm nay để nhận ưu đãi hấp dẫn!
              </p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all cursor-pointer inline-flex items-center gap-2 mx-auto shadow-lg shadow-indigo-600/30 transform hover:-translate-y-1"
            >
              Khám phá sản phẩm
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div 
                key={order.id} 
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col justify-between h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div>
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-5 sm:px-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-sm font-black text-gray-900 bg-gray-200/50 px-3 py-1 rounded-lg">#{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>Đặt lúc: {formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div className="text-right p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Tổng tiền</span>
                      <span className="text-indigo-600 font-black text-xl">{formatPrice(order.totalAmount)}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-5 sm:px-8 divide-y divide-gray-100">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-5 flex gap-5 first:pt-2 last:pb-2 group">
                        {/* Product Image */}
                        <div className="w-20 h-20 relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                          <ImageWithFallback
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow min-w-0 flex flex-col justify-center">
                          <h4 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center justify-between mt-3">
                            <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-lg">x{item.quantity}</span>
                            <span className="font-bold text-gray-900">{formatPrice(item.price)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Info Address */}
                  <div className="bg-gray-50/50 border-t border-gray-100 p-5 sm:px-8 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <span className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Khách hàng</span>
                      <span className="font-bold text-gray-900 block text-base">{order.customerName}</span>
                      <span className="text-gray-500">{order.customerPhone}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <span className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Địa chỉ nhận hàng</span>
                      <span className="font-medium text-gray-800 leading-relaxed">{order.customerAddress}</span>
                    </div>
                  </div>
                </div>

                {/* User Order Operations */}
                <div className="bg-white p-5 sm:px-8 border-t border-gray-100 flex flex-wrap justify-end gap-3 items-center">
                  {(order.status === "COMPLETED" || order.status === "CANCELLED") && (
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2 mr-auto"
                    >
                      <RotateCw className="w-4 h-4" />
                      Mua lại
                    </button>
                  )}
                  
                  {order.status === "PENDING" && (
                    <button
                      disabled={actionId === order.id}
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-5 py-2.5 bg-white border-2 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 text-sm font-bold rounded-xl transition-colors cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      {actionId === order.id ? "Đang hủy..." : "Hủy đơn hàng"}
                    </button>
                  )}
                  
                  {order.status === "DELIVERED" && (
                    <button
                      disabled={actionId === order.id}
                      onClick={() => handleConfirmReceived(order.id)}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 disabled:bg-gray-400 shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5"
                    >
                      <PackageCheck className="w-5 h-5" />
                      {actionId === order.id ? "Đang xử lý..." : "Đã nhận được hàng"}
                    </button>
                  )}
                  
                  {order.status === "COMPLETED" && (
                    <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-orange-500/30">
                      Đánh giá sản phẩm
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
