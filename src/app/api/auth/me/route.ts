import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "lazmall_jwt_secret_key_2026";

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("lazmall_auth_token");

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ user: null });
    }

    // Giải mã token
    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(tokenCookie.value, JWT_SECRET) as DecodedToken;
    } catch (err) {
      console.warn("Token không hợp lệ hoặc đã hết hạn");
      return NextResponse.json({ user: null });
    }

    // Lấy thông tin user trong DB
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Lỗi khi xác định thông tin phiên làm việc:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}
