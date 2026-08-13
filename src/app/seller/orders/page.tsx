"use client";

import { useState, useEffect } from "react";
import { Search, Eye, Filter, CheckCircle2, Truck, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Order {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  customerName: string;
}

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    // Mock data giả lập thay vì gọi API thực tế để demo
    setTimeout(() => {
      setOrders([
        { id: "ORD-982374", createdAt: "2026-08-13T10:20:00Z", totalAmount: 450000, status: "PENDING", customerName: "Nguyễn Văn A" },
        { id: "ORD-982375", createdAt: "2026-08-12T15:45:00Z", totalAmount: 1250000, status: "PROCESSING", customerName: "Trần Thị B" },
        { id: "ORD-982376", createdAt: "2026-08-11T09:10:00Z", totalAmount: 890000, status: "SHIPPED", customerName: "Lê Hoàng C" },
        { id: "ORD-982377", createdAt: "2026-08-10T14:30:00Z", totalAmount: 2100000, status: "DELIVERED", customerName: "Phạm Văn D" },
        { id: "ORD-982378", createdAt: "2026-08-09T08:15:00Z", totalAmount: 320000, status: "CANCELLED", customerName: "Hoàng Thị E" },
      ]);
      setLoading(false);
    }, 500);
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700"><Clock className="w-3.5 h-3.5" /> Chờ xử lý</span>;
      case 'PROCESSING':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700"><CheckCircle2 className="w-3.5 h-3.5" /> Đã xác nhận</span>;
      case 'SHIPPED':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700"><Truck className="w-3.5 h-3.5" /> Đang giao</span>;
      case 'DELIVERED':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3.5 h-3.5" /> Hoàn thành</span>;
      case 'CANCELLED':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"><XCircle className="w-3.5 h-3.5" /> Đã hủy</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
          <p className="text-gray-500 text-sm mt-1">Xử lý và theo dõi trạng thái giao hàng.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
          <Filter className="w-4 h-4" />
          Xuất báo cáo
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Tìm mã đơn hàng, tên khách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm transition-all"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button className="px-4 py-2 rounded-xl text-sm font-bold bg-orange-50 text-orange-600 whitespace-nowrap border border-orange-100">Tất cả</button>
            <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 whitespace-nowrap border border-transparent">Chờ xác nhận</button>
            <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 whitespace-nowrap border border-transparent">Chờ lấy hàng</button>
            <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 whitespace-nowrap border border-transparent">Đang giao</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 font-medium">
                <th className="p-4 py-3 pl-6">Mã Đơn / Ngày đặt</th>
                <th className="p-4 py-3">Khách hàng</th>
                <th className="p-4 py-3 text-center">Tổng tiền</th>
                <th className="p-4 py-3 text-center">Trạng thái</th>
                <th className="p-4 py-3 text-right pr-6">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">Đang tải dữ liệu...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">Chưa có đơn hàng nào.</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-mono font-bold text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleString("vi-VN")}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-800">{order.customerName}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-bold text-orange-600">{order.totalAmount.toLocaleString("vi-VN")}đ</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        {getStatusBadge(order.status)}
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button className="px-3 py-1.5 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
