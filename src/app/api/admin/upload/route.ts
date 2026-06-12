import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "lazmall_jwt_secret_key_2026";

// Cấu hình Cloudinary lấy từ biến môi trường .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface DecodedToken {
  userId: string;
  role: string;
}

export async function POST(request: Request) {
  try {
    // 1. Xác thực quyền ADMIN từ cookie token
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("lazmall_auth_token");

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json(
        { error: "Quyền truy cập bị từ chối. Vui lòng đăng nhập." },
        { status: 401 }
      );
    }

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(tokenCookie.value, JWT_SECRET) as DecodedToken;
    } catch (err) {
      return NextResponse.json(
        { error: "Phiên làm việc hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại." },
        { status: 401 }
      );
    }

    if (decoded.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bạn không có quyền thực hiện tác vụ này" },
        { status: 403 }
      );
    }

    // 2. Lấy dữ liệu file từ formData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Không có file nào được tải lên" },
        { status: 400 }
      );
    }

    // 3. Chuyển đổi file từ ArrayBuffer sang Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Upload trực tiếp buffer lên Cloudinary bằng stream
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "lazmall_products", // lưu trong thư mục lazmall_products trên Cloudinary
          resource_type: "auto",      // tự động nhận diện ảnh/video/...
        },
        (error, result) => {
          if (error) {
            console.error("Lỗi upload stream Cloudinary:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });

  } catch (error: any) {
    console.error("Lỗi khi tải ảnh lên Cloudinary:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi máy chủ trong quá trình tải ảnh lên" },
      { status: 500 }
    );
  }
}
