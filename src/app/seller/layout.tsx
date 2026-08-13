"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Package, ShoppingBag, LayoutDashboard, Settings, Store, LogOut } from "lucide-react";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "SELLER")) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "SELLER") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-orange-500 border-orange-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <img src="/logo.png" alt="LazMall Seller" className="h-10 object-contain" />
          <div>
            <h2 className="font-bold text-gray-900 leading-tight">Kênh Người Bán</h2>
            <p className="text-xs text-gray-500">Seller Center</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link href="/seller" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Tổng quan
          </Link>
          <Link href="/seller/products" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
            <Package className="w-5 h-5" />
            Quản lý Sản phẩm
          </Link>
          <Link href="/seller/orders" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            Quản lý Đơn hàng
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-4">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 px-4 py-2 w-full transition-colors">
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-orange-500" />
            <h1 className="font-bold text-gray-900">Seller Center</h1>
          </div>
          <Link href="/" className="text-sm text-indigo-600 font-medium">Về LazMall</Link>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Về trang chủ link for desktop */}
            <div className="hidden md:flex justify-end mb-6">
              <Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors">
                Trở về trang mua sắm LazMall &rarr;
              </Link>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
