import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    return NextResponse.json(
      { error: "Không thể lấy danh mục" },
      { status: 500 }
    );
  }
}
