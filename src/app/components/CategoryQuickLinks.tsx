import { Smartphone, Shirt, Sparkles, Baby, Home, Watch, Dumbbell, BookOpen } from "lucide-react";

const categories = [
  { id: 1, name: "Điện Tử", icon: Smartphone, color: "bg-blue-100 text-blue-600" },
  { id: 2, name: "Thời Trang", icon: Shirt, color: "bg-pink-100 text-pink-600" },
  { id: 3, name: "Làm Đẹp", icon: Sparkles, color: "bg-purple-100 text-purple-600" },
  { id: 4, name: "Mẹ & Bé", icon: Baby, color: "bg-green-100 text-green-600" },
  { id: 5, name: "Nhà Cửa", icon: Home, color: "bg-orange-100 text-orange-600" },
  { id: 6, name: "Đồng Hồ", icon: Watch, color: "bg-yellow-100 text-yellow-600" },
  { id: 7, name: "Thể Thao", icon: Dumbbell, color: "bg-red-100 text-red-600" },
  { id: 8, name: "Sách", icon: BookOpen, color: "bg-indigo-100 text-indigo-600" },
];

export default function CategoryQuickLinks() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Danh Mục Nổi Bật</h2>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-all group"
              >
                <div
                  className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-xs md:text-sm text-gray-700 font-medium text-center">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
