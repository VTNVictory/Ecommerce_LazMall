import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const flashSale = searchParams.get("flashSale");
    const query = searchParams.get("q");
    
    // Tham số bộ lọc và sắp xếp nâng cao
    const sortBy = searchParams.get("sortBy");
    const filterOfficial = searchParams.get("filterOfficial");
    const filterDiscount = searchParams.get("filterDiscount");
    
    // Tham số phân trang
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "100"); 
    
    const skip = (page - 1) * limit;
    const where: any = {};

    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    if (flashSale === "true") {
      where.isFlashSale = true;
    } else if (flashSale === "false") {
      where.isFlashSale = false;
    }

    if (filterOfficial === "true") {
      where.isOfficial = true;
    }

    if (filterDiscount === "true") {
      where.discount = {
        gt: 0,
      };
    }

    if (query) {
      where.OR = [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ];
    }

    // Sắp xếp
    let orderBy: any = { id: "asc" };
    if (sortBy === "price_asc") {
      orderBy = { price: "asc" };
    } else if (sortBy === "price_desc") {
      orderBy = { price: "desc" };
    }

    // Lấy sản phẩm và đếm tổng
    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      db.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    return NextResponse.json(
      { error: "Không thể lấy danh sách sản phẩm" },
      { status: 500 }
    );
  }
}
