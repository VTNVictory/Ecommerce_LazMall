"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Tag, Image as ImageIcon } from "lucide-react";
import { ImageWithFallback } from "@/app/components/ImageWithFallback";
import { toast } from "sonner";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  soldCount: string;
}

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Giả lập gọi API lấy sản phẩm của shop hiện tại.
      // Thực tế API sẽ lấy danh sách theo session sellerId
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        // Lọc tạm: Chỉ lấy 5 sản phẩm đầu cho demo
        setProducts(data.products.slice(0, 5));
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý kho hàng và đăng bán sản phẩm mới.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20">
          <Plus className="w-5 h-5" />
          Đăng sản phẩm mới
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Tìm tên sản phẩm, mã SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm transition-all"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-500 bg-white">
              <option>Tất cả danh mục</option>
              <option>Điện tử</option>
              <option>Thời trang</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-500 bg-white">
              <option>Còn hàng</option>
              <option>Hết hàng</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 font-medium">
                <th className="p-4 py-3 pl-6">Sản phẩm</th>
                <th className="p-4 py-3">Giá bán</th>
                <th className="p-4 py-3 text-center">Kho</th>
                <th className="p-4 py-3 text-center">Đã bán</th>
                <th className="p-4 py-3 text-right pr-6">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">Đang tải dữ liệu...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">Không tìm thấy sản phẩm nào.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                          {product.image ? (
                            <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <Link href={`/product/${product.id}`} className="font-bold text-gray-900 hover:text-orange-600 line-clamp-2 leading-snug" title={product.name}>
                            {product.name}
                          </Link>
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                            <Tag className="w-3 h-3" /> SKU: {product.id.toString().padStart(6, '0')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-orange-600">{product.price.toLocaleString("vi-VN")}đ</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.stock > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 text-center text-gray-600 font-medium">
                      {product.soldCount}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Sửa">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <p>Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-100" disabled>Trước</button>
            <button className="px-3 py-1 bg-orange-600 text-white rounded-lg font-bold">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-100">Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
}
