import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Cần truyền productId" },
        { status: 400 }
      );
    }

    const reviews = await db.review.findMany({
      where: {
        productId: parseInt(productId),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Lỗi lấy danh sách đánh giá:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Để đơn giản, hiện tại ta nhận userId trực tiếp từ client.
    // Thực tế nên verify token JWT/Session để lấy userId.
    const body = await request.json();
    const { productId, rating, comment, userId } = body;

    if (!productId || !rating || !comment || !userId) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const review = await db.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        productId: parseInt(productId),
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // Cập nhật lại rating trung bình và số lượng đánh giá của sản phẩm
    const allReviews = await db.review.findMany({
      where: { productId: parseInt(productId) },
    });
    
    const averageRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;

    await db.product.update({
      where: { id: parseInt(productId) },
      data: {
        rating: averageRating,
        reviewCount: allReviews.length,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Lỗi tạo đánh giá:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}
