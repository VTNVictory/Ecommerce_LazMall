import { v2 as cloudinary } from "cloudinary";

// 1. Cấu hình Cloudinary (Inline credentials)
cloudinary.config({
  cloud_name: "dnvkbdyv2",
  api_key: "972812273656244",
  api_secret: "9_Hn04t3BYARpOC0Td2c13mgYVA",
  secure: true
});

async function run() {
  try {
    const sampleImageUrl = "https://res.cloudinary.com/demo/image/upload/sample.jpg";

    console.log("Đang upload ảnh lên Cloudinary...");
    // 2. Upload ảnh mẫu từ demo domain của Cloudinary
    const uploadResult = await cloudinary.uploader.upload(sampleImageUrl, {
      public_id: "sample_upload_test"
    });

    console.log("Upload thành công!");
    console.log("Secure URL:", uploadResult.secure_url);
    console.log("Public ID:", uploadResult.public_id);

    console.log("\nĐang lấy siêu dữ liệu (metadata)...");
    // 3. Lấy thông tin chi tiết của ảnh đã tải lên
    const details = await cloudinary.api.resource(uploadResult.public_id);
    console.log("Chiều rộng (width):", details.width);
    console.log("Chiều cao (height):", details.height);
    console.log("Định dạng (format):", details.format);
    console.log("Kích thước tệp (bytes):", details.bytes);

    console.log("\nĐang sinh link ảnh đã tối ưu hóa...");
    // 4. Tối ưu hóa ảnh qua f_auto (tự động chọn định dạng) và q_auto (tự động nén chất lượng)
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      // f_auto: Tự động lựa chọn định dạng tối ưu nhất dựa trên trình duyệt (AVIF, WebP, JPEG...)
      fetch_format: "auto",
      // q_auto: Tự động điều chỉnh chất lượng nén tối ưu nhất để tiết kiệm dung lượng mà không làm vỡ hình
      quality: "auto"
    });

    console.log("Done! Click link below to see optimized version of the image. Check the size and the format.");
    console.log("Transformed URL:", transformedUrl);

  } catch (error) {
    console.error("Lỗi:", error);
  }
}

run();
