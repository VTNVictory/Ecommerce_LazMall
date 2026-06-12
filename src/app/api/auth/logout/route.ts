import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Đăng xuất thành công",
    });

    // Xóa cookie bằng cách set maxAge về 0
    response.cookies.set({
      name: "lazmall_auth_token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ trong quá trình đăng xuất" },
      { status: 500 }
    );
  }
}
