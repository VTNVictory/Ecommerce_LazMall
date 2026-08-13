"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategoryQuickLinks from "./components/CategoryQuickLinks";
import TopBrandsCarousel from "./components/TopBrandsCarousel";
import FlashSaleSection from "./components/FlashSaleSection";
import ProductGrid from "./components/ProductGrid";
import FilterBar from "./components/FilterBar";
import Footer from "./components/Footer";

function HomeContent() {
  const searchParams = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // States lọc nâng cao
  const [sortBy, setSortBy] = useState("");
  const [filterOfficial, setFilterOfficial] = useState(false);
  const [filterDiscount, setFilterDiscount] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Đồng bộ từ khóa tìm kiếm từ URL
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q);
    
    // Nếu có tìm kiếm mới, reset bộ lọc danh mục
    if (q) {
      setSelectedCategoryId(null);
    }
  }, [searchParams]);

  // Reset toàn bộ bộ lọc khi đổi danh mục hoặc từ khóa tìm kiếm
  useEffect(() => {
    setSortBy("");
    setFilterOfficial(false);
    setFilterDiscount(false);
    setMinPrice("");
    setMaxPrice("");
  }, [selectedCategoryId, searchQuery]);

  const isFiltering = selectedCategoryId !== null || searchQuery !== "";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Global Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/80 via-white to-transparent -z-10 pointer-events-none"></div>
      
      <Header />
      <main className="flex-grow pt-4 pb-12 space-y-8 md:space-y-12">
        {/* Chỉ hiện Hero khi không tìm kiếm hoặc lọc */}
        {!isFiltering && <HeroSection />}
        
        <div className="relative">
          <CategoryQuickLinks 
            selectedId={selectedCategoryId} 
            onSelect={setSelectedCategoryId} 
          />
        </div>
        
        {/* Chỉ hiện Carousel thương hiệu và Flash Sale khi không lọc và không tìm kiếm */}
        {!isFiltering && (
          <div className="space-y-8 md:space-y-12">
            <FlashSaleSection />
            <TopBrandsCarousel />
          </div>
        )}
        
        {/* Thanh lọc sản phẩm nâng cao & Grid */}
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col gap-6">
          <FilterBar 
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterOfficial={filterOfficial}
            setFilterOfficial={setFilterOfficial}
            filterDiscount={filterDiscount}
            setFilterDiscount={setFilterDiscount}
            onPriceFilter={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
          />
          
          <ProductGrid 
            categoryId={selectedCategoryId} 
            searchQuery={searchQuery} 
            sortBy={sortBy}
            filterOfficial={filterOfficial}
            filterDiscount={filterDiscount}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-indigo-600 border-indigo-200 rounded-full animate-spin shadow-lg"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
