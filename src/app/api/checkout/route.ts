import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, customerAddress, items, userId, couponCode } = body;

    if (!customerName || !customerPhone || !customerAddress || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Thông tin đơn hàng không đầy đủ hoặc không hợp lệ" },
        { status: 400 }
      );
    }

    // Thực hiện transaction
    const order = await db.$transaction(async (tx) => {
      // 1. Tính tổng tiền sản phẩm
      let originalTotal = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Không tìm thấy sản phẩm với ID: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Sản phẩm '${product.name}' không đủ hàng trong kho (Còn lại: ${product.stock})`);
        }

        // Trừ tồn kho
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: product.stock - item.quantity,
          },
        });

        originalTotal += product.price * item.quantity;
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }

      // 2. Tính số tiền giảm giá từ coupon
      let discountAmount = 0;
      if (couponCode) {
        const code = couponCode.toUpperCase().trim();
        if (code === "LAZMALL10") {
          discountAmount = originalTotal * 0.1; // Giảm 10%
        } else if (code === "FREESHIP") {
          discountAmount = 50000; // Giảm 50.000đ
        } else if (code === "HOANXU20") {
          discountAmount = 20000; // Giảm 20.000đ
        }
      }

      const finalTotal = Math.max(0, originalTotal - discountAmount);

      // 3. Tạo đơn hàng
      const createdOrder = await tx.order.create({
        data: {
          userId: userId || null,
          customerName,
          customerEmail: customerEmail || "",
          customerPhone,
          customerAddress,
          totalAmount: finalTotal, // Tổng tiền đã áp dụng giảm giá
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      return createdOrder;
    });

    return NextResponse.json({
      success: true,
      message: "Đặt hàng thành công",
      order,
    });
  } catch (error: any) {
    console.error("Lỗi khi xử lý checkout:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi xử lý đặt hàng trên máy chủ" },
      { status: 500 }
    );
  }
}
