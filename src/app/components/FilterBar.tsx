"use client";

import { useState } from "react";
import { SlidersHorizontal, ArrowUpDown, CheckCircle, Percent, DollarSign, X } from "lucide-react";
import { toast } from "sonner";

interface FilterBarProps {
  sortBy: string;
  setSortBy: (val: string) => void;
  filterOfficial: boolean;
  setFilterOfficial: (val: boolean) => void;
  filterDiscount: boolean;
  setFilterDiscount: (val: boolean) => void;
  onPriceFilter: (min: string, max: string) => void;
}

export default function FilterBar({
  sortBy,
  setSortBy,
  filterOfficial,
  setFilterOfficial,
  filterDiscount,
  setFilterDiscount,
  onPriceFilter,
}: FilterBarProps) {
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [isPriceFiltered, setIsPriceFiltered] = useState(false);

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const minVal = parseFloat(minPriceInput);
    const maxVal = parseFloat(maxPriceInput);

    if (minPriceInput && isNaN(minVal)) {
      return toast.error("Giá tối thiểu phải là một số hợp lệ");
    }
    if (maxPriceInput && isNaN(maxVal)) {
      return toast.error("Giá tối đa phải là một số hợp lệ");
    }
    if (minPriceInput && maxPriceInput && minVal > maxVal) {
      return toast.error("Giá tối đa phải lớn hơn hoặc bằng giá tối thiểu");
    }

    onPriceFilter(minPriceInput, maxPriceInput);
    setIsPriceFiltered(true);
    toast.success("Đã áp dụng bộ lọc khoảng giá");
  };

  const handleClearPrice = () => {
    setMinPriceInput("");
    setMaxPriceInput("");
    onPriceFilter("", "");
    setIsPriceFiltered(false);
    toast.info("Đã xóa bộ lọc khoảng giá");
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-4 mb-2">
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        
        {/* Left Side: Filter Options */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="text-gray-400 font-bold flex items-center gap-1.5 mr-1">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            BỘ LỌC:
          </span>

          {/* Filter Official Badge */}
          <button
            onClick={() => setFilterOfficial(!filterOfficial)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              filterOfficial
                ? "bg-orange-50 border-[#f57224] text-[#f57224]"
                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${filterOfficial ? "text-[#f57224] fill-orange-100" : "text-gray-400"}`} />
            Gian hàng Mall chính hãng
          </button>

          {/* Filter Discount Badge */}
          <button
            onClick={() => setFilterDiscount(!filterDiscount)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              filterDiscount
                ? "bg-orange-50 border-[#f57224] text-[#f57224]"
                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            Đang giảm giá
          </button>
        </div>

        {/* Middle: Price Range Filter */}
        <form onSubmit={handlePriceSubmit} className="flex flex-wrap items-center gap-3 text-xs border-t xl:border-t-0 xl:border-l xl:border-r border-gray-100 pt-4 xl:pt-0 xl:px-4">
          <span className="text-gray-400 font-semibold flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-gray-400" />
            Khoảng giá (đ):
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              placeholder="Tối thiểu"
              className="w-24 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50 font-semibold"
            />
            <span className="text-gray-400">-</span>
            <input
              type="text"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              placeholder="Tối đa"
              className="w-24 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50 font-semibold"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-lg transition-colors cursor-pointer"
            >
              Áp dụng
            </button>
            {isPriceFiltered && (
              <button
                type="button"
                onClick={handleClearPrice}
                className="p-1.5 border border-gray-200 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Right Side: Sorting Options */}
        <div className="flex items-center gap-3 text-sm border-t xl:border-t-0 pt-4 xl:pt-0">
          <span className="text-gray-400 font-semibold flex items-center gap-1">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            Sắp xếp theo:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#f57224]/50 focus:border-[#f57224] cursor-pointer"
          >
            <option value="">Phổ biến nhất</option>
            <option value="price_asc">Giá: Thấp đến Cao</option>
            <option value="price_desc">Giá: Cao đến Thấp</option>
          </select>
        </div>

      </div>
    </div>
  );
}
