import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ họ tên, email và mật khẩu" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải chứa ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    // Kiểm tra trùng email
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email này đã được đăng ký sử dụng" },
        { status: 400 }
      );
    }

    // Hash mật khẩu
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Tạo User
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Đăng ký tài khoản thành công",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ trong quá trình đăng ký" },
      { status: 500 }
    );
  }
}
