# Hướng Dẫn Từng Bước Triển Khai LazMall Lên Vercel

Tài liệu này tóm tắt toàn bộ quy trình thiết lập, chuẩn bị và các bước cần thực hiện để đưa dự án Next.js (LazMall) kết nối cơ sở dữ liệu Neon PostgreSQL lên môi trường production Vercel.

---

## 1. Chuẩn Bị Dự Án & Bảo Mật

Chúng ta đã hoàn thành việc chuẩn bị mã nguồn:
* **Tương thích Next.js 15+:** Đã chuyển đổi `params` trong các dynamic routes sang kiểu `Promise` và sử dụng `React.use()` hoặc `await` để giải quyết kiểu dữ liệu động.
* **Sửa lỗi Prerender (Suspense):** Đã bao bọc component ô tìm kiếm (`SearchBar`) của `Header` vào thẻ `<Suspense>` để tránh lỗi bails out khi pre-rendering tĩnh các trang khác.
* **Cấu hình Dependency:** 
  * Đã bổ sung `typescript` và các gói `@types/react` vào `devDependencies` để môi trường của Vercel có thể biên dịch code TypeScript.
  * Đã tạo tệp `.npmrc` chứa `legacy-peer-deps=true` để tự động xử lý xung đột phiên bản của `react-day-picker` khi cài đặt thư viện trên Vercel.

> [!WARNING]
> **Không bao giờ đẩy file `.env` lên GitHub.** File này chứa thông tin bảo mật và mật khẩu database Neon của bạn. Hãy đảm bảo `.env` đã được liệt kê trong `.gitignore`.

---

## 2. Các Bước Triển Khai Trên Vercel Dashboard

Thực hiện theo các bước sau để cấu hình và deploy dự án:

### Bước 1: Đẩy toàn bộ mã nguồn lên GitHub
Nếu bạn thực hiện thêm bất kỳ chỉnh sửa nào ở local, hãy chạy các lệnh sau để cập nhật GitHub:
```bash
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

### Bước 2: Liên kết với Vercel
1. Đăng nhập vào trang quản trị [Vercel Dashboard](https://vercel.com).
2. Nhấp vào nút **Add New** > Chọn **Project**.
3. Kết nối với tài khoản GitHub của bạn và nhấn **Import** tại kho lưu trữ `Ecommerce_LazMall`.

### Bước 3: Cấu hình Build Command
Vercel sẽ tự động nhận diện đây là dự án **Next.js**. Giữ nguyên các cấu hình build mặc định:
* **Framework Preset:** `Next.js`
* **Build Command:** `npm run build` (lệnh này sẽ thực hiện chạy `prisma generate` để tạo Prisma Client trước khi chạy `next build`).

### Bước 4: Thiết lập Biến Môi Trường (Environment Variables)
Đây là bước **quan trọng nhất** để ứng dụng có thể chạy và kết nối được dữ liệu. Mở rộng mục **Environment Variables** trên giao diện Vercel và thêm đầy đủ các khóa sau:

| Tên Biến (Key) | Giá Trị (Value) | Mô Tả |
| :--- | :--- | :--- |
| `DATABASE_URL` | *Chuỗi kết nối Neon PostgreSQL của bạn* | `postgresql://neondb_owner:...` (Xem trong tệp `.env` của bạn) |
| `JWT_SECRET` | *Khóa bảo mật JWT dùng để tạo token đăng nhập* | `lazmall_super_secure_jwt_secret_key_2026_...` |
| `CLOUDINARY_CLOUD_NAME` | `dnvkbdyv2` | Tên cloud lưu trữ ảnh sản phẩm trên Cloudinary |
| `CLOUDINARY_API_KEY` | `972812273656244` | Khóa API Cloudinary |
| `CLOUDINARY_API_SECRET` | `9_Hn04t3BYARpOC0Td2c13mgYVA` | Mã bí mật API Cloudinary |

*Lưu ý: Bạn chỉ cần copy chính xác các dòng tương ứng từ tệp `.env` local của mình dán vào Vercel.*

### Bước 5: Tiến Hành Deploy
1. Sau khi cấu hình xong các biến môi trường, nhấp vào nút **Deploy**.
2. Vercel sẽ tự động clone code, chạy `npm install` (với file `.npmrc` đã cấu hình để bỏ qua xung đột phiên bản), chạy `prisma generate` tạo client, biên dịch mã nguồn và cung cấp cho bạn một URL live chính thức.

---

## 3. Quy Trình Cập Nhật Code Sau Này

Khi dự án đã hoạt động trên Vercel, bất cứ lúc nào bạn sửa code ở máy local và muốn cập nhật lên web:
1. Chạy các lệnh Git để push code lên GitHub:
   ```bash
   git add .
   git commit -m "Mô tả thay đổi mới của bạn"
   git push origin main
   ```
2. Vercel sẽ tự động phát hiện commit mới trên nhánh `main`, tự động tiến hành build và cập nhật phiên bản mới lên trang web của bạn trong vòng 1-2 phút (CI/CD hoàn toàn tự động).
