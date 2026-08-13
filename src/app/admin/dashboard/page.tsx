"use client";

import { Users, ShoppingBag, Package, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'T2', doanhThu: 4000000, donHang: 24 },
  { name: 'T3', doanhThu: 3000000, donHang: 13 },
  { name: 'T4', doanhThu: 2000000, donHang: 98 },
  { name: 'T5', doanhThu: 2780000, donHang: 39 },
  { name: 'T6', doanhThu: 1890000, donHang: 48 },
  { name: 'T7', doanhThu: 2390000, donHang: 38 },
  { name: 'CN', doanhThu: 3490000, donHang: 43 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan Hệ thống</h1>
        <p className="text-gray-500 text-sm mt-1">Quản lý hoạt động kinh doanh toàn sàn LazMall.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Doanh thu tuần</p>
            <p className="text-2xl font-black text-gray-900">19.55tr ₫</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tổng Đơn hàng</p>
            <p className="text-2xl font-black text-gray-900">303</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Sản phẩm hoạt động</p>
            <p className="text-2xl font-black text-gray-900">1,245</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Người dùng</p>
            <p className="text-2xl font-black text-gray-900">8,594</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Biểu đồ doanh thu & đơn hàng (Tuần này)</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis yAxisId="left" orientation="left" stroke="#4f46e5" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar yAxisId="left" dataKey="doanhThu" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Doanh thu (₫)" />
              <Bar yAxisId="right" dataKey="donHang" fill="#10b981" radius={[4, 4, 0, 0]} name="Đơn hàng" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
