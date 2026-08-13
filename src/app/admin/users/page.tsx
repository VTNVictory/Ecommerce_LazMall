"use client";

import { useState } from "react";
import { Search, UserCog, ShieldAlert, CheckCircle2, MoreVertical, Mail } from "lucide-react";

export default function AdminUsersPage() {
  const [users] = useState([
    { id: "1", name: "Quản trị viên", email: "admin@lazmall.com", role: "ADMIN", status: "ACTIVE", joined: "2026-08-01" },
    { id: "2", name: "Chủ gian hàng", email: "seller@lazmall.com", role: "SELLER", status: "ACTIVE", joined: "2026-08-05" },
    { id: "3", name: "Khách Hàng Demo", email: "demo@lazmall.com", role: "USER", status: "ACTIVE", joined: "2026-08-10" },
    { id: "4", name: "Nguyễn Văn A", email: "nguyenvana@example.com", role: "USER", status: "BLOCKED", joined: "2026-08-11" },
    { id: "5", name: "Trần Thị B", email: "tranthib@example.com", role: "SELLER", status: "PENDING", joined: "2026-08-12" },
  ]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN': return <span className="px-2.5 py-1 bg-red-100 text-red-700 text-[10px] font-black rounded-md">ADMIN</span>;
      case 'SELLER': return <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-[10px] font-black rounded-md">SELLER</span>;
      case 'USER': return <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-black rounded-md">USER</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> Hoạt động</span>;
      case 'BLOCKED': return <span className="flex items-center gap-1 text-red-600 text-xs font-bold"><ShieldAlert className="w-3.5 h-3.5" /> Bị khóa</span>;
      case 'PENDING': return <span className="flex items-center gap-1 text-orange-600 text-xs font-bold"><UserCog className="w-3.5 h-3.5" /> Chờ duyệt</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Khách hàng</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý người dùng, phân quyền và khóa tài khoản.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Tìm theo tên, email..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm transition-all"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-500 bg-white">
              <option>Tất cả vai trò</option>
              <option>Chỉ User</option>
              <option>Chỉ Seller</option>
              <option>Chỉ Admin</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-500 bg-white">
              <option>Trạng thái</option>
              <option>Hoạt động</option>
              <option>Bị khóa</option>
              <option>Chờ duyệt</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 font-medium">
                <th className="p-4 py-3 pl-6">Người dùng</th>
                <th className="p-4 py-3 text-center">Vai trò</th>
                <th className="p-4 py-3 text-center">Trạng thái</th>
                <th className="p-4 py-3 text-center">Ngày tham gia</th>
                <th className="p-4 py-3 text-right pr-6">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-indigo-50/30 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 font-bold flex items-center justify-center border border-indigo-200">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{u.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" /> {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {getRoleBadge(u.role)}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      {getStatusBadge(u.status)}
                    </div>
                  </td>
                  <td className="p-4 text-center text-sm font-medium text-gray-600">
                    {u.joined}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <p>Hiển thị <strong>{users.length}</strong> người dùng</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-100" disabled>Trước</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-100">Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
}
