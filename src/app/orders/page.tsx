"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ClipboardList, ArrowLeft, Calendar, PackageCheck, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  productId: number;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
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
      return <span className="px-2.5 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full">Đang chờ xử lý</span>;
    case "PROCESSING":
      return <span className="px-2.5 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded-full">Đang đóng gói</span>;
    case "DELIVERED":
      return <span className="px-2.5 py-1 text-xs font-bold bg-purple-100 text-purple-800 rounded-full">Đang vận chuyển</span>;
    case "COMPLETED":
      return <span className="px-2.5 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">Đã nhận hàng (Hoàn tất)</span>;
    case "CANCELLED":
      return <span className="px-2.5 py-1 text-xs font-bold bg-red-100 text-red-800 rounded-full">Đã hủy đơn</span>;
    default:
      return <span className="px-2.5 py-1 text-xs font-bold bg-gray-100 text-gray-800 rounded-full">{status}</span>;
  }
}

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const router = useRouter();

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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-[#f57224] animate-spin" />
            <p className="text-gray-500 font-medium text-sm animate-pulse">Đang tải lịch sử đơn hàng...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-[1000px] mx-auto px-4 py-8 w-full">
        {/* Breadcrumb */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#f57224] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <ClipboardList className="w-7 h-7 text-[#f57224]" /> Đơn hàng của tôi
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm space-y-6">
            <div className="text-6xl">📦</div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-800">Bạn chưa có đơn hàng nào</h2>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Lịch sử mua sắm của bạn hiện đang trống. Hãy đặt hàng ngay hôm nay để nhận nhiều ưu đãi LazMall hấp dẫn!
              </p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-[#f57224] text-white font-bold rounded-xl hover:bg-[#d45a1b] transition-colors cursor-pointer inline-flex items-center gap-2 mx-auto text-sm"
            >
              Khám phá sản phẩm ngay
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between h-full">
                <div>
                  {/* Order Header */}
                  <div className="bg-gray-50 border-b border-gray-100 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-400">MÃ ĐƠN:</span>
                        <span className="font-mono text-xs font-bold text-gray-800">{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-gray-400 block">TỔNG THANH TOÁN:</span>
                      <span className="text-[#f57224] font-bold text-lg">{formatPrice(order.totalAmount)}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:px-6 divide-y divide-gray-100">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                        {/* Product Image */}
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                          <ImageWithFallback
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow min-w-0 flex flex-col justify-between">
                          <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-5">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                            <span>Số lượng: <span className="font-semibold text-gray-700">{item.quantity}</span></span>
                            <span className="font-bold text-[#f57224]">{formatPrice(item.price)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Info Address */}
                  <div className="bg-orange-50/20 border-t border-gray-100 p-4 sm:px-6 text-xs text-gray-600 space-y-1.5">
                    <div>
                      <span className="font-bold text-gray-500">Người nhận:</span>{" "}
                      <span className="font-semibold text-gray-800">{order.customerName}</span> (SĐT: {order.customerPhone})
                    </div>
                    <div>
                      <span className="font-bold text-gray-500">Địa chỉ:</span>{" "}
                      <span className="font-semibold text-gray-800">{order.customerAddress}</span>
                    </div>
                  </div>
                </div>

                {/* User Order Operations */}
                {(order.status === "PENDING" || order.status === "DELIVERED") && (
                  <div className="bg-gray-50/50 p-4 sm:px-6 border-t border-gray-100 flex justify-end gap-3">
                    {order.status === "PENDING" && (
                      <button
                        disabled={actionId === order.id}
                        onClick={() => handleCancelOrder(order.id)}
                        className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"
                      >
                        {actionId === order.id ? "Đang hủy..." : "Hủy đơn hàng"}
                      </button>
                    )}
                    {order.status === "DELIVERED" && (
                      <button
                        disabled={actionId === order.id}
                        onClick={() => handleConfirmReceived(order.id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 disabled:bg-gray-400"
                      >
                        <PackageCheck className="w-4 h-4" />
                        {actionId === order.id ? "Đang xử lý..." : "Đã nhận được hàng"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
