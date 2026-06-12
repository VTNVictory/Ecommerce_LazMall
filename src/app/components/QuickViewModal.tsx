"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Star, ShoppingCart, Minus, Plus, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface QuickViewModalProps {
  productId: number | null;
  isOpen: boolean;
  onClose: () => void;
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
  stock: number;
  isOfficial: boolean;
  discount?: number;
}

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function QuickViewModal({ productId, isOpen, onClose }: QuickViewModalProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!productId || !isOpen) return;

    async function fetchProductDetails() {
      try {
        setLoading(true);
        setQuantity(1);
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Không thể tải thông tin sản phẩm");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
        toast.error("Không thể tải thông tin sản phẩm");
        onClose();
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [productId, isOpen, onClose]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.warning("Đã đạt giới hạn số lượng có sẵn");
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
      },
      quantity
    );
    toast.success(`Đã thêm ${quantity} sản phẩm '${product.name}' vào giỏ hàng!`);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity animate-[fadeIn_0.2s_ease-out]" />

        {/* Content Container */}
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 z-50 max-h-[90vh] overflow-y-auto outline-none animate-[scaleUp_0.2s_ease-out]">
          
          {/* Close Button */}
          <Dialog.Close className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer outline-none">
            <X className="w-5 h-5" />
          </Dialog.Close>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-8 h-8 border-3 border-t-[#f57224] border-gray-200 rounded-full animate-spin"></div>
              <p className="text-xs text-gray-500 font-medium animate-pulse">Đang tải...</p>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
              {/* Product Image */}
              <div className="md:col-span-5 relative aspect-square border border-gray-100 rounded-xl overflow-hidden bg-gray-50">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isOfficial && (
                  <div className="absolute top-3 left-3 bg-[#f57224] text-white px-2 py-0.5 text-xs font-bold rounded shadow-sm">
                    Mall
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <Dialog.Title className="text-lg font-bold text-gray-800 leading-tight">
                    {product.name}
                  </Dialog.Title>

                  {/* Rating & Sold count */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-[#ffc107]">
                      <span className="text-gray-800 font-bold underline mr-1">{product.rating}</span>
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-gray-400">({product.reviewCount} đánh giá)</span>
                    </div>
                  </div>

                  {/* Price Area */}
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-[#f57224]">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                          <span className="bg-[#ffeb3b] text-[#d32f2f] text-[10px] font-bold px-1.5 py-0.5 rounded">
                            -{product.discount || Math.round((1 - product.price/product.originalPrice)*100)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description snippet */}
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400">Giới thiệu sản phẩm:</p>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                      {product.description || "Chưa có mô tả chi tiết."}
                    </p>
                  </div>

                  {/* Stock Status */}
                  <div className="text-xs text-gray-600">
                    Tình trạng: <span className="font-semibold text-green-600">Còn hàng ({product.stock} trong kho)</span>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-4 py-1">
                    <span className="text-xs font-bold text-gray-400 w-16">Số lượng:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                      <button
                        onClick={handleDecrease}
                        className="px-2.5 py-1.5 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-800">{quantity}</span>
                      <button
                        onClick={handleIncrease}
                        className="px-2.5 py-1.5 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 border-2 border-[#f57224] text-[#f57224] hover:bg-orange-50 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Thêm vào giỏ
                  </button>
                  <button
                    onClick={handleAddToCart} // Nhấp mua ngay sẽ chuyển thẳng vào giỏ sau khi đóng modal
                    className="flex-1 py-3 bg-[#f57224] hover:bg-[#d45a1b] text-white font-bold rounded-xl transition-colors cursor-pointer text-xs"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-sm text-gray-500">Không tìm thấy thông tin sản phẩm.</div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
