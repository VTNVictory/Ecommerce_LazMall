import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a2332] text-white mt-12">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">LazMall</h3>
            <p className="text-gray-300 text-sm mb-4">
              Nền tảng mua sắm trực tuyến hàng đầu với hàng triệu sản phẩm chính hãng từ các thương
              hiệu uy tín.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#f57224] rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#f57224] rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#f57224] rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#f57224] rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold mb-4">Chăm Sóc Khách Hàng</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-[#f57224] transition-colors">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f57224] transition-colors">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f57224] transition-colors">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f57224] transition-colors">
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f57224] transition-colors">
                  Thanh toán
                </a>
              </li>
            </ul>
          </div>

          {/* About LazMall */}
          <div>
            <h4 className="font-bold mb-4">Về LazMall</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-[#f57224] transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f57224] transition-colors">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f57224] transition-colors">
                  Điều khoản
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f57224] transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f57224] transition-colors">
                  Chính sách cookie
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Delivery */}
          <div>
            <h4 className="font-bold mb-4">Thanh Toán & Vận Chuyển</h4>
            <p className="text-sm text-gray-300 mb-3">Phương thức thanh toán</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-700">
                VISA
              </div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-blue-600">
                MC
              </div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-700">
                JCB
              </div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-green-600">
                COD
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-3">Đơn vị vận chuyển</p>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1 bg-white/10 rounded text-xs">Giao hàng nhanh</div>
              <div className="px-3 py-1 bg-white/10 rounded text-xs">Giao hàng tiết kiệm</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2026 LazMall. Bản quyền thuộc về Công ty LazMall Việt Nam.</p>
        </div>
      </div>
    </footer>
  );
}
