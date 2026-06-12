import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "lazmall_jwt_secret_key_2026";

interface DecodedToken {
  userId: string;
  role: string;
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    // Xác thực người dùng
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("lazmall_auth_token");

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json(
        { error: "Vui lòng đăng nhập để thực hiện tác vụ" },
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

    // Truy vấn thông tin đơn hàng
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }

    // Kiểm tra quyền hủy: Chỉ chủ đơn hàng hoặc Admin
    if (order.userId !== decoded.userId && decoded.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bạn không có quyền hủy đơn hàng này" },
        { status: 403 }
      );
    }

    // Chỉ cho phép hủy đơn hàng đang ở trạng thái PENDING
    if (order.status !== "PENDING") {
      return NextResponse.json(
        { error: "Đơn hàng đã được xử lý hoặc giao nhận, không thể hủy vào lúc này" },
        { status: 400 }
      );
    }

    // Thực hiện transaction hoàn trả tồn kho và hủy đơn
    const updatedOrder = await db.$transaction(async (tx) => {
      // 1. Cộng trả lại tồn kho của từng sản phẩm
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      // 2. Cập nhật trạng thái đơn hàng sang CANCELLED
      const o = await tx.order.update({
        where: { id: orderId },
        data: {
          status: "CANCELLED",
        },
      });

      return o;
    });

    return NextResponse.json({
      success: true,
      message: "Đơn hàng đã được hủy thành công và đã hoàn trả tồn kho sản phẩm.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Lỗi khi hủy đơn hàng:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ trong quá trình hủy đơn hàng" },
      { status: 500 }
    );
  }
}
