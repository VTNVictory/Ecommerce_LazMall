"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Shield, LayoutDashboard, DollarSign, ShoppingBag, ListChecks, Calendar, User, Phone, MapPin, Loader2, Edit3, Trash2, Plus, Box, Percent, Check, X } from "lucide-react";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";

interface OrderItem {
  id: string;
  productId: number;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
  };
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  soldCount: string;
  stock: number;
  isOfficial: boolean;
  isFlashSale: boolean;
  discount?: number;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const router = useRouter();

  // Orders States
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // Products States
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Form Product modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  
  // Form fields
  const [pName, setPName] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pImage, setPImage] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pOriginalPrice, setPOriginalPrice] = useState("");
  const [pStock, setPStock] = useState("100");
  const [pDiscount, setPDiscount] = useState("");
  const [pIsOfficial, setPIsOfficial] = useState(true);
  const [pIsFlashSale, setPIsFlashSale] = useState(false);
  const [pCategoryId, setPCategoryId] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Xử lý upload ảnh lên Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate định dạng file
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chỉ chọn file hình ảnh!");
      return;
    }

    // Validate dung lượng (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Dung lượng ảnh tối đa là 5MB!");
      return;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Tải ảnh lên thất bại");
      }

      setPImage(data.secure_url);
      toast.success("Tải ảnh lên Cloudinary thành công!");
    } catch (err: any) {
      console.error("Lỗi upload ảnh:", err);
      toast.error(err.message || "Lỗi tải ảnh lên Cloudinary");
    } finally {
      setUploadingImage(false);
    }
  };

  // Bảo vệ route: Chỉ cho phép ADMIN truy cập
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login");
        toast.error("Vui lòng đăng nhập tài khoản quản trị");
      } else if (user.role !== "ADMIN") {
        toast.error("Bạn không có quyền truy cập trang quản trị");
        router.push("/");
      }
    }
  }, [user, authLoading, router]);

  // Fetch toàn bộ đơn hàng
  const fetchAllOrders = async () => {
    try {
      setOrdersLoading(true);
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        throw new Error("Không thể tải đơn hàng");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tải danh sách đơn hàng");
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch toàn bộ sản phẩm & danh mục
  const fetchAllProducts = async () => {
    try {
      setProductsLoading(true);
      
      // Load categories
      const catRes = await fetch("/api/categories");
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }

      // Load products (lấy hết không flash sale & flash sale thuộc DB)
      const prodRes = await fetch("/api/products?limit=100");
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.products || []);
      } else {
        throw new Error("Không thể tải sản phẩm");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      if (activeTab === "orders") {
        fetchAllOrders();
      } else {
        fetchAllProducts();
      }
    }
  }, [user, activeTab]);

  // Xử lý cập nhật trạng thái đơn hàng
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingOrderId(orderId);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Cập nhật trạng thái thất bại");

      toast.success(`Đã chuyển trạng thái đơn hàng sang '${newStatus}'!`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Lỗi cập nhật trạng thái đơn hàng");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Mở modal thêm sản phẩm mới
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setPName("");
    setPDescription("");
    setPImage("");
    setPPrice("");
    setPOriginalPrice("");
    setPStock("100");
    setPDiscount("");
    setPIsOfficial(true);
    setPIsFlashSale(false);
    if (categories.length > 0) {
      setPCategoryId(String(categories[0].id));
    } else {
      setPCategoryId("");
    }
    setIsModalOpen(true);
  };

  // Mở modal chỉnh sửa sản phẩm
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setPName(product.name);
    setPDescription(product.description || "");
    setPImage(product.image);
    setPPrice(String(product.price));
    setPOriginalPrice(product.originalPrice ? String(product.originalPrice) : "");
    setPStock(String(product.stock));
    setPDiscount(product.discount ? String(product.discount) : "");
    setPIsOfficial(product.isOfficial);
    setPIsFlashSale(product.isFlashSale);
    setPCategoryId(String(product.categoryId));
    setIsModalOpen(true);
  };

  // Lưu Form Thêm/Sửa sản phẩm
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pName.trim()) return toast.error("Vui lòng nhập tên sản phẩm");
    if (!pImage.trim()) return toast.error("Vui lòng cung cấp URL ảnh sản phẩm");
    if (!pPrice || isNaN(parseFloat(pPrice)) || parseFloat(pPrice) <= 0) {
      return toast.error("Giá bán phải là số dương hợp lệ");
    }
    if (!pCategoryId) return toast.error("Vui lòng chọn một danh mục sản phẩm");

    const payload = {
      name: pName,
      description: pDescription,
      image: pImage,
      price: parseFloat(pPrice),
      originalPrice: pOriginalPrice ? parseFloat(pOriginalPrice) : null,
      stock: parseInt(pStock) || 0,
      discount: pDiscount ? parseInt(pDiscount) : null,
      isOfficial: pIsOfficial,
      isFlashSale: pIsFlashSale,
      categoryId: parseInt(pCategoryId),
    };

    try {
      setFormLoading(true);
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Không thể thực hiện tác vụ");

      toast.success(editingProduct ? "Đã cập nhật sản phẩm!" : "Đăng bán sản phẩm mới thành công!");
      setIsModalOpen(false);
      fetchAllProducts(); // reload list
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Lỗi lưu sản phẩm");
    } finally {
      setFormLoading(false);
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi cửa hàng không?")) return;
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Xóa sản phẩm thất bại");

      toast.success("Sản phẩm đã được xóa thành công!");
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Lỗi xóa sản phẩm. Có thể sản phẩm này đang nằm trong đơn hàng hiện có.");
    }
  };

  // Tính toán doanh thu
  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((total, o) => total + o.totalAmount, 0);
  
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;

  if (authLoading || (user && user.role !== "ADMIN")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[#f57224] animate-spin" />
          <p className="text-gray-500 font-medium text-sm animate-pulse">Đang xác thực quyền Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-[1200px] mx-auto px-4 py-8 w-full">
        {/* Header Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5 mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
              <Shield className="w-7 h-7 text-[#f57224] fill-orange-50" />
              Bảng Điều Khiển Quản Trị
            </h1>
            <p className="text-xs text-gray-500 font-medium">Hệ thống quản lý đơn hàng & sản phẩm LazMall</p>
          </div>
          
          {/* Tab Selection */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm p-1 max-w-sm">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[#f57224] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Quản lý Đơn hàng
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#f57224] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Quản lý Sản phẩm
            </button>
          </div>
        </div>

        {/* -------------------- TAB 1: ORDERS MANAGEMENT -------------------- */}
        {activeTab === "orders" && (
          <>
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">TỔNG DOANH THU</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{formatPrice(totalRevenue)}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">(Đã loại trừ đơn hàng bị hủy)</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">TỔNG ĐƠN HÀNG</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{orders.length} đơn hàng</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Tất cả các trạng thái</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                  <ListChecks className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">ĐƠN CHỜ XỬ LÝ</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{pendingOrders} đơn hàng</p>
                  <p className="text-[10px] text-yellow-600 font-bold mt-0.5">Cần đóng gói & giao hàng ⚡</p>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-4">Quản lý hóa đơn mua sắm</h2>

            {ordersLoading ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <Loader2 className="w-10 h-10 text-[#f57224] animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500 font-medium">Đang tải dữ liệu đơn hàng...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 text-gray-400">
                Không tìm thấy đơn hàng nào trong hệ thống.
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between h-full">
                    <div>
                      {/* Order Header */}
                      <div className="bg-gray-50 border-b border-gray-100 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-gray-400">MÃ ĐƠN:</span>
                            <span className="font-mono text-xs font-bold text-gray-800">{order.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                        </div>

                        {/* Status Select dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-400">Trạng thái:</span>
                          <div className="relative flex items-center">
                            {updatingOrderId === order.id && (
                              <Loader2 className="w-3.5 h-3.5 text-[#f57224] animate-spin mr-1.5" />
                            )}
                            <select
                              disabled={updatingOrderId === order.id}
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className={`px-3 py-1.5 border text-xs font-bold rounded-lg focus:outline-none cursor-pointer bg-white ${
                                order.status === "PENDING"
                                  ? "border-yellow-300 text-yellow-700 bg-yellow-50/50"
                                  : order.status === "PROCESSING"
                                  ? "border-blue-300 text-blue-700 bg-blue-50/50"
                                  : order.status === "DELIVERED"
                                  ? "border-purple-300 text-purple-700 bg-purple-50/50"
                                  : order.status === "COMPLETED"
                                  ? "border-green-300 text-green-700 bg-green-50/50"
                                  : "border-red-300 text-red-700 bg-red-50/50"
                              }`}
                            >
                              <option value="PENDING">Chờ xử lý (Pending)</option>
                              <option value="PROCESSING">Đang đóng gói (Processing)</option>
                              <option value="DELIVERED">Đang vận chuyển (Delivered)</option>
                              <option value="COMPLETED">Đã giao hoàn tất (Completed)</option>
                              <option value="CANCELLED">Đã hủy đơn (Cancelled)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="p-4 sm:px-6 divide-y divide-gray-100">
                        {order.items.map((item) => (
                          <div key={item.id} className="py-3.5 flex gap-4 first:pt-0 last:pb-0">
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow min-w-0 flex flex-col justify-between">
                              <h4 className="text-xs font-semibold text-gray-800 line-clamp-1 leading-relaxed">
                                {item.product.name}
                              </h4>
                              <div className="flex justify-between items-baseline text-[10px] text-gray-500 mt-1">
                                <span>Số lượng: <span className="font-bold text-gray-700">{item.quantity}</span></span>
                                <span className="font-bold text-[#f57224]">{formatPrice(item.price)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Info receiver */}
                      <div className="bg-orange-50/10 border-t border-gray-100 p-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>Họ tên: <span className="font-bold text-gray-800">{order.customerName}</span></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>SĐT: <span className="font-bold text-gray-800">{order.customerPhone}</span></span>
                        </div>
                        <div className="flex items-center gap-1.5 md:col-span-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="line-clamp-1">Địa chỉ: <span className="font-semibold text-gray-800">{order.customerAddress}</span></span>
                        </div>
                      </div>

                      {/* Summary final total */}
                      <div className="bg-gray-50/50 p-4 sm:px-6 border-t border-gray-100 flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-400">Doanh thu ghi nhận:</span>
                        <span className="text-base font-bold text-[#f57224]">{formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* -------------------- TAB 2: PRODUCTS MANAGEMENT (CRUD) -------------------- */}
        {activeTab === "products" && (
          <>
            {/* Header Product Table & Add Button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Box className="w-5 h-5 text-gray-500" />
                Danh sách sản phẩm trong kho
              </h2>
              <button
                onClick={handleOpenCreateModal}
                className="px-4 py-2 bg-[#f57224] hover:bg-[#d45a1b] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Đăng bán sản phẩm mới
              </button>
            </div>

            {productsLoading ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <Loader2 className="w-10 h-10 text-[#f57224] animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500 font-medium">Đang tải danh sách sản phẩm...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 text-gray-400">
                Chưa có sản phẩm nào được tạo. Hãy nhấn nút phía trên để bắt đầu!
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold">
                        <th className="p-4 w-20">Ảnh</th>
                        <th className="p-4">Tên sản phẩm</th>
                        <th className="p-4 text-right">Giá bán</th>
                        <th className="p-4 text-right">Giá gốc</th>
                        <th className="p-4 text-center">Tồn kho</th>
                        <th className="p-4 text-center">Huy hiệu</th>
                        <th className="p-4 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50/50">
                          {/* Image */}
                          <td className="p-4">
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>
                          
                          {/* Name */}
                          <td className="p-4 max-w-[280px]">
                            <p className="font-bold text-gray-800 line-clamp-2 leading-relaxed">{product.name}</p>
                          </td>

                          {/* Price */}
                          <td className="p-4 text-right font-bold text-[#f57224]">
                            {formatPrice(product.price)}
                          </td>

                          {/* Original Price */}
                          <td className="p-4 text-right text-gray-400 line-through">
                            {product.originalPrice ? formatPrice(product.originalPrice) : "-"}
                          </td>

                          {/* Stock */}
                          <td className="p-4 text-center">
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              product.stock > 10 
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}>
                              {product.stock}
                            </span>
                          </td>

                          {/* Badges */}
                          <td className="p-4">
                            <div className="flex justify-center items-center gap-1.5 flex-wrap">
                              {product.isOfficial && (
                                <span className="bg-orange-100 text-[#f57224] text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase">Mall</span>
                              )}
                              {product.isFlashSale && (
                                <span className="bg-red-100 text-red-600 text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase">⚡ Flash</span>
                              )}
                              {product.discount && (
                                <span className="bg-yellow-100 text-yellow-800 text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase">-{product.discount}%</span>
                              )}
                            </div>
                          </td>

                          {/* Actions CRUD */}
                          <td className="p-4">
                            <div className="flex justify-center gap-2.5">
                              <button
                                onClick={() => handleOpenEditModal(product)}
                                className="p-2 border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-blue-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                                title="Sửa thông tin sản phẩm"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                                title="Xóa sản phẩm khỏi cửa hàng"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* -------------------- RADIX DIALOG MODAL FOR CREATE/EDIT PRODUCT -------------------- */}
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 z-50 max-h-[90vh] overflow-y-auto outline-none">
              
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                <Dialog.Title className="text-lg font-bold text-gray-800">
                  {editingProduct ? "Chỉnh sửa sản phẩm" : "Đăng bán sản phẩm mới"}
                </Dialog.Title>
                <Dialog.Close className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-semibold text-gray-700">
                {/* Product Name */}
                <div className="space-y-1.5">
                  <label className="text-gray-400">Tên sản phẩm *</label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="Ví dụ: Apple iPhone 15 Pro Max 256GB - Vỏ Titan"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50"
                  />
                </div>

                {/* Tải ảnh lên bằng Cloudinary & URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-400">Tải ảnh sản phẩm từ thiết bị</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                        id="cloudinary-upload-input"
                      />
                      <label
                        htmlFor="cloudinary-upload-input"
                        className={`px-3 py-2 border border-dashed border-gray-300 hover:border-[#f57224] rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5 bg-gray-50 flex-grow ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 text-[#f57224] animate-spin" />
                            Đang upload lên Cloudinary...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 text-gray-500" />
                            Chọn file ảnh tải lên
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-400">Hoặc điền URL ảnh sản phẩm *</label>
                    <input
                      type="text"
                      required
                      value={pImage}
                      onChange={(e) => setPImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50"
                    />
                  </div>
                </div>

                {/* Preview hình ảnh đã chọn/upload */}
                {pImage && (
                  <div className="p-2 border border-gray-100 rounded-lg bg-gray-50/50 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                      <img src={pImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[10px] text-gray-400 truncate">Ảnh đã chọn:</p>
                      <p className="text-[10px] font-bold text-gray-600 truncate">{pImage}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPImage("")}
                      className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Gỡ ảnh"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Price */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400">Giá bán (đ) *</label>
                    <input
                      type="number"
                      required
                      value={pPrice}
                      onChange={(e) => setPPrice(e.target.value)}
                      placeholder="Nhập giá bán thực tế"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50"
                    />
                  </div>

                  {/* Original Price */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400">Giá gốc (đ) (Không bắt buộc)</label>
                    <input
                      type="number"
                      value={pOriginalPrice}
                      onChange={(e) => setPOriginalPrice(e.target.value)}
                      placeholder="Nếu có giảm giá thì điền giá gốc vào đây"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Stock */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400">Số lượng trong kho *</label>
                    <input
                      type="number"
                      required
                      value={pStock}
                      onChange={(e) => setPStock(e.target.value)}
                      placeholder="Số lượng"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50"
                    />
                  </div>

                  {/* Discount percentage */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400">Phần trăm giảm (%) (Option)</label>
                    <input
                      type="number"
                      value={pDiscount}
                      onChange={(e) => setPDiscount(e.target.value)}
                      placeholder="Ví dụ: 15"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50"
                    />
                  </div>

                  {/* Categories List dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400">Danh mục sản phẩm *</label>
                    <select
                      value={pCategoryId}
                      onChange={(e) => setPCategoryId(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50 cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Checkboxes Toggle isOfficial / isFlashSale */}
                <div className="flex items-center gap-6 py-2 border-y border-gray-100">
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={pIsOfficial}
                      onChange={(e) => setPIsOfficial(e.target.checked)}
                      className="w-4 h-4 rounded text-[#f57224] border-gray-300 focus:ring-[#f57224]"
                    />
                    Gian hàng Mall chính hãng
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={pIsFlashSale}
                      onChange={(e) => setPIsFlashSale(e.target.checked)}
                      className="w-4 h-4 rounded text-[#f57224] border-gray-300 focus:ring-[#f57224]"
                    />
                    Sản phẩm Flash Sale ⚡
                  </label>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-gray-400">Mô tả sản phẩm chi tiết</label>
                  <textarea
                    rows={4}
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    placeholder="Mô tả các thông số kỹ thuật, bảo hành, tính năng nổi bật..."
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#f57224] bg-gray-50 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                  <Dialog.Close className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg cursor-pointer">
                    Hủy bỏ
                  </Dialog.Close>
                  <button
                    type="submit"
                    disabled={formLoading || uploadingImage}
                    className="px-5 py-2 bg-[#f57224] hover:bg-[#d45a1b] text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 disabled:bg-gray-400"
                  >
                    {formLoading && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    {editingProduct ? "Cập nhật sản phẩm" : "Đăng bán ngay"}
                  </button>
                </div>

              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

      </main>

      <Footer />
    </div>
  );
}
