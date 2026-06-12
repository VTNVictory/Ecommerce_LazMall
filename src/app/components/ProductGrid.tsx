"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  soldCount: string;
  isOfficial?: boolean;
  discount?: number;
}

interface ProductGridProps {
  categoryId: number | null;
  searchQuery: string;
  sortBy: string;
  filterOfficial: boolean;
  filterDiscount: boolean;
  minPrice: string;
  maxPrice: string;
}

export default function ProductGrid({
  categoryId,
  searchQuery,
  sortBy,
  filterOfficial,
  filterDiscount,
  minPrice,
  maxPrice,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const limit = 6; // Số sản phẩm hiển thị mỗi trang

  // Mỗi khi thay đổi category, từ khóa tìm kiếm hoặc các bộ lọc nâng cao, reset lại trang
  useEffect(() => {
    async function initProducts() {
      try {
        setLoading(true);
        setPage(1);
        
        let url = `/api/products?flashSale=false&page=1&limit=${limit}`;
        if (categoryId !== null) {
          url = `/api/products?categoryId=${categoryId}&page=1&limit=${limit}`;
        } else if (searchQuery.trim() !== "") {
          url = `/api/products?q=${encodeURIComponent(searchQuery)}&page=1&limit=${limit}`;
        }

        // Ghép thêm các bộ lọc nâng cao
        if (sortBy) url += `&sortBy=${sortBy}`;
        if (filterOfficial) url += `&filterOfficial=true`;
        if (filterDiscount) url += `&filterDiscount=true`;
        if (minPrice) url += `&minPrice=${minPrice}`;
        if (maxPrice) url += `&maxPrice=${maxPrice}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Không thể tải sản phẩm");
        const data = await res.json();
        
        setProducts(data.products || []);
        setHasMore(data.page < data.totalPages);
      } catch (error) {
        console.error("Lỗi fetch sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    }

    initProducts();
  }, [categoryId, searchQuery, sortBy, filterOfficial, filterDiscount, minPrice, maxPrice]);

  // Hàm tải thêm sản phẩm khi bấm nút Xem thêm
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      
      let url = `/api/products?flashSale=false&page=${nextPage}&limit=${limit}`;
      if (categoryId !== null) {
        url = `/api/products?categoryId=${categoryId}&page=${nextPage}&limit=${limit}`;
      } else if (searchQuery.trim() !== "") {
        url = `/api/products?q=${encodeURIComponent(searchQuery)}&page=${nextPage}&limit=${limit}`;
      }

      // Ghép thêm các bộ lọc nâng cao
      if (sortBy) url += `&sortBy=${sortBy}`;
      if (filterOfficial) url += `&filterOfficial=true`;
      if (filterDiscount) url += `&filterDiscount=true`;
      if (minPrice) url += `&minPrice=${minPrice}`;
      if (maxPrice) url += `&maxPrice=${maxPrice}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Không thể tải thêm sản phẩm");
      const data = await res.json();
      
      setProducts((prev) => [...prev, ...(data.products || [])]);
      setPage(nextPage);
      setHasMore(data.page < data.totalPages);
    } catch (error) {
      console.error("Lỗi tải thêm sản phẩm:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {searchQuery !== "" 
            ? `Kết quả tìm kiếm cho: "${searchQuery}"`
            : categoryId !== null 
              ? "Kết Quả Lọc Danh Mục" 
              : "Dành Riêng Cho Bạn"}
        </h2>
        <p className="text-gray-600 mt-1 font-medium">
          {searchQuery !== ""
            ? "Tìm thấy các sản phẩm phù hợp nhất với từ khóa"
            : categoryId !== null 
              ? "Các sản phẩm thuộc danh mục đã chọn" 
              : "Sản phẩm được chọn lọc đặc biệt"}
        </p>
      </div>

      {loading ? (
        // Loading Skeletons
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden p-3 space-y-4 animate-pulse h-[320px] flex flex-col justify-between">
              <div className="aspect-square bg-gray-200 rounded-lg w-full flex-shrink-0"></div>
              <div className="space-y-2 flex-grow mt-4">
                <div className="h-3.5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-1/3 mt-2"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 font-bold text-base">Không tìm thấy sản phẩm nào phù hợp.</p>
          <p className="text-gray-400 text-xs mt-1">Hãy thử đổi bộ lọc hoặc tìm kiếm từ khóa khác.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-8 text-center">
              <button 
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-8 py-3 border-2 border-[#f57224] text-[#f57224] hover:bg-[#f57224] hover:text-white font-bold rounded-lg transition-colors cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed inline-flex items-center gap-2 text-sm"
              >
                {loadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-t-transparent border-[#f57224] rounded-full animate-spin"></div>
                    Đang tải thêm...
                  </>
                ) : (
                  "Xem thêm sản phẩm"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
