"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Heart, MapPin, Bell, LogOut, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Tổng quan tài khoản", href: "/user/dashboard", icon: User },
    { name: "Đơn hàng của tôi", href: "/orders", icon: Package },
    { name: "Sản phẩm yêu thích", href: "/user/wishlist", icon: Heart },
    { name: "Sổ địa chỉ", href: "/user/address", icon: MapPin },
    { name: "Thông báo", href: "/user/notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">Tài khoản của tôi</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-72 flex-shrink-0">
            {/* User Profile Summary */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-white">
                US
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Người dùng</h2>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full mt-1">
                  Thành viên Bạc
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <nav className="p-3 space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                        isActive 
                          ? "bg-indigo-50 text-indigo-700 font-bold" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
              
              <div className="p-3 border-t border-gray-50">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 font-medium transition-all">
                  <LogOut className="w-5 h-5" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
