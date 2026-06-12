import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "LazMall - Kênh mua sắm trực tuyến uy tín chính hãng",
  description: "Trải nghiệm mua sắm tuyệt vời cùng LazMall với hàng ngàn sản phẩm chính hãng, ưu đãi khủng và giao hàng siêu tốc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen bg-gray-50">
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster position="top-right" richColors toastOptions={{ duration: 2000 }} />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
