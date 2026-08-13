"use client";

import { Wallet, Package, Clock, Star, Gift, TrendingUp, CreditCard } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const spendingData = [
  { name: 'Tháng 1', amount: 1500000 },
  { name: 'Tháng 2', amount: 2300000 },
  { name: 'Tháng 3', amount: 800000 },
  { name: 'Tháng 4', amount: 4500000 },
  { name: 'Tháng 5', amount: 1200000 },
  { name: 'Tháng 6', amount: 3100000 },
];

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan tài khoản</h1>
        <p className="text-gray-500 mt-1">Quản lý hoạt động mua sắm và theo dõi chi tiêu của bạn.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1">Đơn hàng hiện tại</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-gray-900">3</h3>
              <span className="text-sm text-indigo-600 font-medium">Đang giao</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1">Chi tiêu tháng này</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-gray-900">3.1M</h3>
              <span className="text-sm font-medium text-gray-400">VND</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Gift className="w-7 h-7" />
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1">LazCoins</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-gray-900">12,500</h3>
              <span className="text-sm font-medium text-emerald-600 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +500</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-500" />
              Thống kê chi tiêu 6 tháng qua
            </h2>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2">
              <option>Năm nay</option>
              <option>Năm ngoái</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip 
                  cursor={{fill: '#f3f4f6'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: number) => [`${value.toLocaleString('vi-VN')} đ`, 'Chi tiêu']}
                />
                <Bar dataKey="amount" fill="#4f46e5" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            Hoạt động gần đây
          </h2>
          
          <div className="space-y-6">
            {/* Activity Item 1 */}
            <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:w-px before:h-full before:bg-gray-200 last:before:hidden">
              <div className="absolute left-0 top-1.5 w-4 h-4 bg-emerald-100 border-2 border-emerald-500 rounded-full z-10"></div>
              <p className="text-sm font-bold text-gray-900">Giao hàng thành công</p>
              <p className="text-sm text-gray-600 mt-1">Đơn hàng #LAZ-123456 đã được giao đến bạn.</p>
              <span className="text-xs text-gray-400 font-medium mt-2 inline-block">Hôm qua, 14:30</span>
            </div>

            {/* Activity Item 2 */}
            <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:w-px before:h-full before:bg-gray-200 last:before:hidden">
              <div className="absolute left-0 top-1.5 w-4 h-4 bg-indigo-100 border-2 border-indigo-500 rounded-full z-10"></div>
              <p className="text-sm font-bold text-gray-900">Đặt hàng thành công</p>
              <p className="text-sm text-gray-600 mt-1">Đơn hàng #LAZ-789012 đã được xác nhận.</p>
              <span className="text-xs text-gray-400 font-medium mt-2 inline-block">3 ngày trước</span>
            </div>

            {/* Activity Item 3 */}
            <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:w-px before:h-full before:bg-gray-200 last:before:hidden">
              <div className="absolute left-0 top-1.5 w-4 h-4 bg-yellow-100 border-2 border-yellow-500 rounded-full z-10"></div>
              <p className="text-sm font-bold text-gray-900">Đánh giá sản phẩm</p>
              <p className="text-sm text-gray-600 mt-1">Bạn đã đánh giá 5 <Star className="w-3 h-3 inline text-yellow-500 fill-current" /> cho sản phẩm Tai nghe Bluetooth.</p>
              <span className="text-xs text-gray-400 font-medium mt-2 inline-block">1 tuần trước</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
