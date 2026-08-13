"use client";

import { Search, ShoppingCart, Check, Package, RefreshCcw, User, LogOut, ClipboardList, Shield } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchVal, setSearchVal] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  // Đồng bộ giá trị tìm kiếm trên ô input khi query thay đổi
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchVal(q);
    } else {
      setSearchVal("");
    }
  }, [searchParams]);

  // Lấy danh sách gợi ý (Debounced)
  useEffect(() => {
    if (!searchVal.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(searchVal)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.products || []);
        }
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchVal]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/?q=${encodeURIComponent(searchVal.trim())}`);
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl relative z-50">
      <div className="relative">
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Tìm kiếm thương hiệu, sản phẩm chính hãng..."
          className="w-full px-4 py-3 pr-12 border-2 border-[#f57224] rounded-lg focus:outline-none focus:border-[#d45a1b] text-sm"
        />
        <button 
          type="submit"
          className="absolute right-0 top-0 h-full px-5 bg-[#f57224] text-white rounded-r-lg hover:bg-[#d45a1b] transition-colors cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Dropdown Gợi ý sản phẩm */}
      {isFocused && searchVal.trim() && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden py-2">
          <div className="px-4 py-2 text-xs font-bold text-gray-400 bg-gray-50/50">GỢI Ý SẢN PHẨM</div>
          {suggestions.map((item) => (
            <Link 
              key={item.id} 
              href={`/product/${item.id}`}
              className="flex items-center gap-3 px-4 py-2 hover:bg-orange-50 transition-colors"
            >
              <div className="w-10 h-10 rounded overflow-hidden border border-gray-100 flex-shrink-0 bg-white">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                <p className="text-xs font-bold text-[#f57224]">
                  {item.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            </Link>
          ))}
          <div 
            onClick={handleSearchSubmit}
            className="px-4 py-3 text-sm font-medium text-center text-indigo-600 hover:bg-gray-50 border-t border-gray-100 cursor-pointer mt-1"
          >
            Xem tất cả kết quả cho "{searchVal}"
          </div>
        </div>
      )}
    </form>
  );
}

export default function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogoutClick = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 cursor-pointer block flex items-center gap-3">
            <img src="/logo.png" alt="LazMall" className="h-14 object-contain" />
            <div className="flex flex-col justify-center">
              <div className="text-3xl font-black bg-gradient-to-r from-[#f57224] to-[#d45a1b] bg-clip-text text-transparent leading-none">
                LazMall
              </div>
              <div className="text-xs text-gray-500 font-semibold tracking-[0.2em] mt-1">CHÍNH HÃNG</div>
            </div>
          </Link>

          {/* Search Bar */}
          <Suspense fallback={
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm thương hiệu, sản phẩm chính hãng..."
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none text-sm bg-gray-50"
                  disabled
                />
                <button 
                  disabled
                  className="absolute right-0 top-0 h-full px-5 bg-gray-300 text-white rounded-r-lg"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          }>
            <SearchBar />
          </Suspense>

          {/* Trust Badges & Auth & Cart */}
          <div className="flex items-center gap-6">
            {/* Auth section */}
            <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
              {user ? (
                <div className="relative group flex items-center gap-1.5 cursor-pointer text-sm">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    user.role === "ADMIN" ? "bg-red-100 text-red-600" : "bg-orange-100 text-[#f57224]"
                  }`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-[10px] text-gray-400 -mb-0.5">
                      {user.role === "ADMIN" ? "Quản trị viên" : "Xin chào,"}
                    </p>
                    <p className="font-semibold text-gray-700 max-w-[160px] truncate flex items-center gap-1.5">
                      {user.name}
                      {user.role === "ADMIN" && (
                        <span className="bg-red-100 text-red-600 text-[8px] font-extrabold px-1.5 py-0.5 rounded tracking-wide">ADMIN</span>
                      )}
                    </p>
                  </div>
                  
                  {/* Account Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {user.role === "ADMIN" && (
                      <>
                        <Link href="/admin/orders" className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer font-bold">
                          <Shield className="w-4 h-4 text-red-500" />
                          Quản lý đơn hàng (Admin)
                        </Link>
                        <hr className="border-gray-100 my-1" />
                      </>
                    )}
                    {user.role === "SELLER" && (
                      <>
                        <Link href="/seller" className="flex items-center gap-2 px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 cursor-pointer font-bold">
                          <Package className="w-4 h-4 text-orange-500" />
                          Kênh Người Bán
                        </Link>
                        <hr className="border-gray-100 my-1" />
                      </>
                    )}
                    <Link href="/orders" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                      <ClipboardList className="w-4 h-4 text-gray-400" />
                      Đơn hàng của tôi
                    </Link>
                    <hr className="border-gray-100 my-1" />
                    <button
                      onClick={handleLogoutClick}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-[#f57224] transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Đăng nhập</span>
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer block">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f57224] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-100 py-2 px-4 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-around text-[10px] md:text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span>100% Chính hãng</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RefreshCcw className="w-3.5 h-3.5 text-blue-600" />
            <span>Đổi trả 15 ngày</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-purple-600" />
            <span>Freeship toàn quốc</span>
          </div>
        </div>
      </div>
    </header>
  );
}
