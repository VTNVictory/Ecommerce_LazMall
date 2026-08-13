"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, login, loading } = useAuth();
  const router = useRouter();

  // Nếu đã đăng nhập, tự động chuyển hướng về trang chủ
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return toast.error("Vui lòng điền đầy đủ email và mật khẩu");
    }

    try {
      setIsSubmitting(true);
      const success = await login(email, password);
      if (success) {
        router.push("/");
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
        {/* Quay lại trang chủ */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#f57224] transition-colors mb-6 ml-4 sm:ml-0"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
        </Link>

        {/* Logo */}
        <div className="text-center flex flex-col items-center">
          <img src="/logo.png" alt="LazMall Logo" className="h-20 w-auto object-contain drop-shadow-md mb-2" />
          <div className="flex flex-col justify-center">
            <span className="text-4xl font-black bg-gradient-to-r from-[#f57224] to-[#d45a1b] bg-clip-text text-transparent leading-none">
              LazMall
            </span>
            <span className="block text-xs text-gray-500 font-semibold tracking-[0.2em] mt-1">CHÍNH HÃNG</span>
          </div>
          <h2 className="mt-8 text-2xl font-bold text-gray-800 tracking-tight">Đăng nhập tài khoản của bạn</h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 border border-gray-200 rounded-2xl shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500">Địa chỉ Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@lazmall.com"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f57224]/50 focus:border-[#f57224] bg-gray-50 text-sm"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-500">Mật khẩu</label>
                <a href="#" className="text-xs font-semibold text-[#f57224] hover:underline">Quên mật khẩu?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
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
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </div>
          </form>

          {/* Quick login info for tester */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-xs text-orange-800 space-y-1">
            <p className="font-bold flex items-center gap-1">💡 Tài khoản thử nghiệm (Tester):</p>
            <p>Email: <span className="font-mono font-bold select-all">demo@lazmall.com</span></p>
            <p>Mật khẩu: <span className="font-mono font-bold select-all">123456</span></p>
          </div>

          <div className="border-t border-gray-100 pt-4 text-center">
            <span className="text-xs text-gray-500">Bạn chưa có tài khoản? </span>
            <Link href="/register" className="text-xs font-bold text-[#f57224] hover:underline cursor-pointer">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
