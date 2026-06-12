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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Chỉ hiện Hero khi không tìm kiếm hoặc lọc */}
        {!isFiltering && <HeroSection />}
        
        <CategoryQuickLinks 
          selectedId={selectedCategoryId} 
          onSelect={setSelectedCategoryId} 
        />
        
        {/* Chỉ hiện Carousel thương hiệu và Flash Sale khi không lọc và không tìm kiếm */}
        {!isFiltering && (
          <>
            <TopBrandsCarousel />
            <FlashSaleSection />
          </>
        )}
        
        {/* Thanh lọc sản phẩm nâng cao */}
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
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-[#f57224] border-gray-200 rounded-full animate-spin"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
