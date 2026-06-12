import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "lazmall_jwt_secret_key_2026";

interface DecodedToken {
  userId: string;
}

export async function GET() {
  try {
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

    // Lấy các đơn hàng thuộc về user này
    const orders = await db.order.findMany({
      where: {
        userId: decoded.userId,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Lỗi lấy lịch sử đơn hàng:", error);
    return NextResponse.json(
      { error: "Không thể lấy lịch sử đơn hàng" },
      { status: 500 }
    );
  }
}
