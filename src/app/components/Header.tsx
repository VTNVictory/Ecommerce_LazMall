import { Search, ShoppingCart, Check, Package, RefreshCcw } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#1a2332] to-[#2d3e50] bg-clip-text text-transparent">
              LazMall
            </div>
            <div className="text-[10px] text-gray-500 -mt-1">CHÍNH HÃNG</div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm thương hiệu, sản phẩm chính hãng..."
                className="w-full px-4 py-3 pr-12 border-2 border-[#f57224] rounded-lg focus:outline-none focus:border-[#d45a1b]"
              />
              <button className="absolute right-0 top-0 h-full px-5 bg-[#f57224] text-white rounded-r-lg hover:bg-[#d45a1b] transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Trust Badges & Cart */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-gray-700 font-medium">100% Chính hãng</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 font-medium">15 ngày đổi trả</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700 font-medium">Miễn phí vận chuyển</span>
              </div>
            </div>

            {/* Cart */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-[#f57224] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Trust Badges */}
      <div className="lg:hidden border-t border-gray-200 py-2 px-4">
        <div className="flex items-center justify-around text-xs">
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-600" />
            <span className="text-gray-600">Chính hãng</span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCcw className="w-3 h-3 text-blue-600" />
            <span className="text-gray-600">Đổi trả 15 ngày</span>
          </div>
          <div className="flex items-center gap-1">
            <Package className="w-3 h-3 text-purple-600" />
            <span className="text-gray-600">Freeship</span>
          </div>
        </div>
      </div>
    </header>
  );
}
