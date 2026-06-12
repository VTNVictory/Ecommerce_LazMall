import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "lazmall_jwt_secret_key_2026";

interface DecodedToken {
  userId: string;
  role: string;
}

export async function POST(request: Request) {
  try {
    // Xác thực quyền Admin
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("lazmall_auth_token");

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json(
        { error: "Quyền truy cập bị từ chối" },
        { status: 401 }
      );
    }

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(tokenCookie.value, JWT_SECRET) as DecodedToken;
    } catch (err) {
      return NextResponse.json(
        { error: "Phiên làm việc hết hạn hoặc không hợp lệ" },
        { status: 401 }
      );
    }

    if (decoded.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bạn không có quyền thực hiện tác vụ này" },
        { status: 403 }
      );
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

    // Validate dữ liệu bắt buộc
    if (!name || !image || price === undefined || categoryId === undefined) {
      return NextResponse.json(
        { error: "Vui lòng nhập các thông tin bắt buộc: tên, ảnh, giá bán và danh mục" },
        { status: 400 }
      );
    }

    // Tạo sản phẩm mới
    const product = await db.product.create({
      data: {
        name,
        description: description || "",
        image,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        stock: stock !== undefined ? parseInt(stock) : 100,
        discount: discount ? parseInt(discount) : null,
        isOfficial: isOfficial !== undefined ? isOfficial : true,
        isFlashSale: isFlashSale !== undefined ? isFlashSale : false,
        categoryId: parseInt(categoryId),
        soldCount: "0",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Đăng bán sản phẩm thành công",
      product,
    });
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ trong quá trình thêm sản phẩm" },
      { status: 500 }
    );
  }
}
