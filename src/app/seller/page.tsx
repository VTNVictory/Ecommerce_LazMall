"use client";

import { useAuth } from "@/context/AuthContext";
import { Package, TrendingUp, DollarSign, Star, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { name: 'T2', sales: 4000 },
  { name: 'T3', sales: 3000 },
  { name: 'T4', sales: 2000 },
  { name: 'T5', sales: 2780 },
  { name: 'T6', sales: 1890 },
  { name: 'T7', sales: 2390 },
  { name: 'CN', sales: 3490 },
];

export default function SellerDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tổng quan Gian hàng</h1>
          <p className="text-gray-500 text-sm mt-1">Xin chào, theo dõi hoạt động kinh doanh của bạn hôm nay.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-gray-600 flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-500" />
          Dữ liệu cập nhật lúc: {new Date().toLocaleTimeString("vi-VN")}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Doanh thu hôm nay</p>
            <p className="text-2xl font-black text-gray-900">12.5tr ₫</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Đơn hàng mới</p>
            <p className="text-2xl font-black text-gray-900">34</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tỷ lệ chuyển đổi</p>
            <p className="text-2xl font-black text-gray-900">4.2%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Đánh giá trung bình</p>
            <p className="text-2xl font-black text-gray-900">4.8</p>
          </div>
        </div>
      </div>

      {/* Chart & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Biểu đồ doanh thu (Tuần này)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="sales" fill="#f97316" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cần làm ngay */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Việc cần làm ngay</h2>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors">
              <div>
                <p className="font-bold text-orange-700">Chờ xác nhận</p>
                <p className="text-xs text-orange-600 mt-0.5">Đơn hàng mới cần xử lý</p>
              </div>
              <span className="text-xl font-black text-orange-600">12</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
              <div>
                <p className="font-bold text-blue-700">Chờ lấy hàng</p>
                <p className="text-xs text-blue-600 mt-0.5">Đã đóng gói xong</p>
              </div>
              <span className="text-xl font-black text-blue-600">5</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100 cursor-pointer hover:bg-red-100 transition-colors">
              <div>
                <p className="font-bold text-red-700">Sản phẩm hết hàng</p>
                <p className="text-xs text-red-600 mt-0.5">Cần bổ sung kho</p>
              </div>
              <span className="text-xl font-black text-red-600">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
