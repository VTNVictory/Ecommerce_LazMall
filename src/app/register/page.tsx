"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, register, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      return toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc");
    }

    if (password.length < 6) {
      return toast.error("Mật khẩu phải chứa ít nhất 6 ký tự");
    }

    if (password !== confirmPassword) {
      return toast.error("Mật khẩu xác nhận không khớp");
    }

    try {
      setIsSubmitting(true);
      const success = await register(name, email, password);
      if (success) {
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-t-[#f57224] border-gray-200 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium text-sm animate-pulse">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Quay lại */}
        <Link 
          href="/login" 
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#f57224] transition-colors mb-6 ml-4 sm:ml-0"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại trang đăng nhập
        </Link>

        {/* Logo */}
        <div className="text-center">
          <span className="text-4xl font-extrabold bg-gradient-to-r from-[#1a2332] to-[#2d3e50] bg-clip-text text-transparent">
            LazMall
          </span>
          <span className="block text-[10px] text-gray-500 tracking-widest font-bold mt-1">CHÍNH HÃNG</span>
          <h2 className="mt-6 text-2xl font-bold text-gray-800 tracking-tight">Tạo tài khoản mua sắm mới</h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 border border-gray-200 rounded-2xl shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Họ và tên */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500">Họ và tên của bạn *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f57224]/50 focus:border-[#f57224] bg-gray-50 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500">Địa chỉ Email *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f57224]/50 focus:border-[#f57224] bg-gray-50 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500">Mật khẩu *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f57224]/50 focus:border-[#f57224] bg-gray-50 text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500">Xác nhận mật khẩu *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f57224]/50 focus:border-[#f57224] bg-gray-50 text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#f57224] hover:bg-[#d45a1b] text-white font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    Đang đăng ký tài khoản...
                  </>
                ) : (
                  "Đăng ký tài khoản"
                )}
              </button>
            </div>
          </form>

          <div className="border-t border-gray-100 pt-4 text-center">
            <span className="text-xs text-gray-500">Bạn đã có tài khoản? </span>
            <Link href="/login" className="text-xs font-bold text-[#f57224] hover:underline cursor-pointer">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
