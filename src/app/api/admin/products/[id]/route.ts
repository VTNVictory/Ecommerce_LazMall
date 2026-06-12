import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "lazmall_jwt_secret_key_2026";

interface DecodedToken {
  userId: string;
  role: string;
}

// Hàm dùng chung kiểm tra quyền ADMIN
async function checkAdminPermission() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("lazmall_auth_token");

  if (!tokenCookie || !tokenCookie.value) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const decoded = jwt.verify(tokenCookie.value, JWT_SECRET) as DecodedToken;
    if (decoded.role !== "ADMIN") {
      throw new Error("FORBIDDEN");
    }
    return decoded;
  } catch (err: any) {
    if (err.message === "FORBIDDEN") throw err;
    throw new Error("UNAUTHORIZED");
  }
}

// 1. PUT: Cập nhật sản phẩm
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    try {
      await checkAdminPermission();
    } catch (err: any) {
      if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
      return NextResponse.json({ error: "Quyền truy cập bị từ chối" }, { status: 403 });
    }

    const productId = parseInt(params.id);
    if (isNaN(productId)) {
      return NextResponse.json({ error: "ID sản phẩm không hợp lệ" }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      description,
      image,
      price,
      originalPrice,
      stock,
      discount,
      isOfficial,
      isFlashSale,
      categoryId,
    } = body;

    // Cập nhật sản phẩm
    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: {
        name,
        description: description !== undefined ? description : undefined,
        image,
        price: price !== undefined ? parseFloat(price) : undefined,
        originalPrice: originalPrice !== undefined ? (originalPrice ? parseFloat(originalPrice) : null) : undefined,
        stock: stock !== undefined ? parseInt(stock) : undefined,
        discount: discount !== undefined ? (discount ? parseInt(discount) : null) : undefined,
        isOfficial: isOfficial !== undefined ? isOfficial : undefined,
        isFlashSale: isFlashSale !== undefined ? isFlashSale : undefined,
        categoryId: categoryId !== undefined ? parseInt(categoryId) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error);
    return NextResponse.json(
      { error: "Không thể cập nhật sản phẩm" },
      { status: 500 }
    );
  }
}

// 2. DELETE: Xóa sản phẩm
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    try {
      await checkAdminPermission();
    } catch (err: any) {
      if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
      return NextResponse.json({ error: "Quyền truy cập bị từ chối" }, { status: 403 });
    }

    const productId = parseInt(params.id);
    if (isNaN(productId)) {
      return NextResponse.json({ error: "ID sản phẩm không hợp lệ" }, { status: 400 });
    }

    // Xóa sản phẩm (Prisma tự động cascade các bản ghi liên quan trong OrderItem nếu cấu hình onDelete: Cascade)
    await db.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa sản phẩm thành công khỏi database",
    });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
    return NextResponse.json(
      { error: "Không thể xóa sản phẩm do có đơn hàng liên kết hoặc lỗi hệ thống" },
      { status: 500 }
    );
  }
}
