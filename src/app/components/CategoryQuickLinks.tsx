"use client";

import { Smartphone, Shirt, Sparkles, Baby, Home, Watch, Dumbbell, BookOpen } from "lucide-react";

const categories = [
  { id: 1, name: "Điện Tử", icon: Smartphone, color: "from-blue-400 to-blue-600 text-white shadow-blue-500/40" },
  { id: 2, name: "Thời Trang", icon: Shirt, color: "from-pink-400 to-pink-600 text-white shadow-pink-500/40" },
  { id: 3, name: "Làm Đẹp", icon: Sparkles, color: "from-purple-400 to-purple-600 text-white shadow-purple-500/40" },
  { id: 4, name: "Mẹ & Bé", icon: Baby, color: "from-green-400 to-green-600 text-white shadow-green-500/40" },
  { id: 5, name: "Nhà Cửa", icon: Home, color: "from-orange-400 to-orange-600 text-white shadow-orange-500/40" },
  { id: 6, name: "Đồng Hồ", icon: Watch, color: "from-yellow-400 to-yellow-600 text-white shadow-yellow-500/40" },
  { id: 7, name: "Thể Thao", icon: Dumbbell, color: "from-red-400 to-red-600 text-white shadow-red-500/40" },
  { id: 8, name: "Sách", icon: BookOpen, color: "from-indigo-400 to-indigo-600 text-white shadow-indigo-500/40" },
];

interface CategoryQuickLinksProps {
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export default function CategoryQuickLinks({ selectedId, onSelect }: CategoryQuickLinksProps) {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Danh Mục Nổi Bật
          </h2>
          {selectedId !== null && (
            <button
              onClick={() => onSelect(null)}
              className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold transition-colors flex items-center gap-2"
            >
              <span>✕ Bỏ chọn</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selectedId === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onSelect(isSelected ? null : category.id)}
                className={`flex flex-col items-center gap-3 p-2 rounded-2xl transition-all duration-300 group cursor-pointer animate-fade-in-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg flex items-center justify-center transform transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-3 ${
                    isSelected ? "ring-4 ring-offset-2 ring-gray-900 scale-110 -translate-y-2" : ""
                  }`}
                >
                  <Icon className={`w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 ${isSelected ? "scale-110" : "group-hover:scale-110"}`} />
                </div>
                <span className={`text-xs md:text-sm font-semibold text-center transition-colors duration-300 ${
                  isSelected ? "text-gray-900 drop-shadow-sm" : "text-gray-600 group-hover:text-gray-900"
                }`}>
                  {category.name}
                </span>
                
                {/* Active indicator */}
                <div className={`h-1 rounded-full transition-all duration-300 ${
                  isSelected ? "w-8 bg-gray-900" : "w-0 bg-gray-300 group-hover:w-4"
                }`} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
