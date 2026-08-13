<div align="center">
  <img src="public/logo.png" alt="LazMall Logo" width="150" height="auto" />
  <h1>XÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ LAZMALL</h1>
  
  <p>
    A modern, high-performance, full-stack multi-vendor e-commerce platform built with <strong>Next.js 15</strong> (App Router), <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, and <strong>Prisma (Neon PostgreSQL)</strong>.
  </p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-15.0+-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/Neon_PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=black" alt="Neon" />
  </p>
</div>

<hr />

## 📑 Mục Lục
- [Tổng Quan (Overview)](#-mở-đầu-overview)
- [Tính Năng Nổi Bật](#-tính-năng-nổi-bật-key-features)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng-tech-stack)
- [Cài Đặt & Chạy Dự Án](#-cài-đặt--chạy-dự-án-getting-started)
- [Cấu Trúc Mã Nguồn](#-cấu-trúc-mã-nguồn-project-structure)
- [API Documentation](#-api-documentation)
- [Tài Khoản Mặc Định](#-tài-khoản-mặc-định)
- [Scripts Hữu Ích](#-scripts-hữu-ích)
- [Troubleshooting (Xử lý sự cố)](#-troubleshooting-xử-lý-sự-cố)

---

## 📖 Mở đầu (Overview)

**LazMall** là một dự án xây dựng hệ thống website thương mại điện tử đa gian hàng (Multi-vendor) mô phỏng theo các nền tảng lớn như Shopee, Lazada. Dự án được thiết kế theo kiến trúc **Full-stack** gom chung (monorepo) bằng cách tận dụng sức mạnh của Next.js API Routes (Server Components & Server Actions), giúp rút ngắn thời gian phát triển trong khi vẫn đảm bảo hiệu năng và khả năng mở rộng.

## ✨ Tính năng nổi bật (Key Features)

Hệ thống được phân chia thành 3 phân hệ (Role-based UI) chuyên biệt:

### 🛍️ Dành cho Người Mua (Buyers / Users)
- **Trải nghiệm mua sắm mượt mà:** Giao diện tối ưu UI/UX, hỗ trợ Responsive đa thiết bị.
- **Tìm kiếm thông minh (Autocomplete):** Gợi ý sản phẩm tự động (Debounced Search) kết hợp bộ lọc (Flash Sale, Danh mục).
- **Giỏ hàng toàn cục (Global Cart):** Quản lý giỏ hàng bằng React Context, xử lý tính toán tổng tiền theo thời gian thực.
- **Quy trình Thanh toán (Checkout):** Áp dụng mã giảm giá (Voucher), xử lý đặt hàng và thanh toán mô phỏng qua mã VietQR.

### 🏪 Dành cho Người Bán (Sellers)
- **Kênh Người Bán (Seller Center):** Bảng điều khiển (Dashboard) thiết kế riêng biệt giúp quản lý hiệu quả kinh doanh.
- **Quản lý Sản phẩm (Product Management):** Đăng tải sản phẩm mới, cập nhật giá bán/tồn kho, hỗ trợ upload ảnh trực tiếp lên **Cloudinary**.
- **Quản lý Đơn hàng (Order Management):** Theo dõi và chuyển đổi trạng thái giao hàng của các đơn hàng thuộc sở hữu của shop.

### 🛡️ Dành cho Quản Trị Viên (Admins)
- **Admin Dashboard:** Cung cấp cái nhìn toàn cảnh về hệ thống (Tổng người dùng, Doanh thu toàn sàn, Tổng đơn hàng).
- **Quản trị Người Dùng & Sản phẩm:** Khóa/Mở khóa tài khoản, phân quyền (Role) và kiểm duyệt danh sách hàng hóa trên sàn.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Lớp (Layer) | Công nghệ / Thư viện | Mục đích |
| :--- | :--- | :--- |
| **Frontend** | ReactJS, Next.js (App Router), Tailwind CSS, shadcn/ui, Lucide Icons | Xây dựng giao diện (UI) và xử lý tương tác người dùng (CSR/SSR). |
| **Backend** | Next.js API Routes (Route Handlers), JWT | Xây dựng RESTful API nội bộ và quản lý xác thực (Authentication). |
| **Database** | PostgreSQL (hosted on [Neon.tech](https://neon.tech/)), Prisma ORM | Lưu trữ và truy vấn dữ liệu quan hệ, quản lý Schema & Migration. |
| **Storage** | Cloudinary | Dịch vụ đám mây tối ưu hóa và lưu trữ hình ảnh sản phẩm. |
| **Deployment** | Vercel | Triển khai (Deploy) dự án trực tuyến với cơ chế CI/CD tự động. |

---

## 🚀 Cài đặt & Chạy dự án (Getting Started)

### 1. Yêu cầu hệ thống (Prerequisites)
- [Node.js](https://nodejs.org/) (phiên bản 18.x hoặc mới hơn)
- Cơ sở dữ liệu PostgreSQL (Khuyên dùng [Neon](https://neon.tech/) để thiết lập nhanh)
- Tài khoản [Cloudinary](https://cloudinary.com/) để lấy API Keys.

### 2. Cài đặt (Installation)

Clone mã nguồn về máy:
```bash
git clone https://github.com/VTNVictory/Ecommerce_LazMall.git
cd Ecommerce_LazMall
```

Cài đặt các gói thư viện (Dependencies):
```bash
npm install
# hoặc yarn install
```

### 3. Cấu hình Biến môi trường (Environment Variables)

Đổi tên file `.env.example` thành `.env` và điền các thông tin của bạn vào:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
JWT_SECRET="chuoi_bi_mat_cua_ban_o_day"
```

### 4. Khởi tạo Cơ sở dữ liệu (Database Setup)

Khởi tạo cấu trúc bảng thông qua Prisma:
```bash
npx prisma generate
npx prisma db push
```

*(Tùy chọn)* Nạp dữ liệu mẫu (Seed Data) để test:
```bash
npm run seed
```

### 5. Chạy môi trường Dev (Development)
```bash
npm run dev
```
Truy cập ứng dụng tại địa chỉ: `http://localhost:3000`

---

## 📂 Cấu trúc mã nguồn (Project Structure)

Dự án được tổ chức theo chuẩn Modular của Next.js App Router:

```text
Ecommerce_LazMall/
├── prisma/                 # Định nghĩa Database Schema (schema.prisma) và Script Seed
├── public/                 # Tài nguyên tĩnh (Hình ảnh, Logo, Icons)
├── src/
│   ├── app/                # Các trang giao diện (Pages) và API Routes
│   │   ├── (public)/       # Trang chủ, Chi tiết SP, Giỏ hàng, Đăng nhập...
│   │   ├── admin/          # Giao diện Admin Dashboard (được bảo vệ)
│   │   ├── seller/         # Giao diện Seller Center (được bảo vệ)
│   │   └── api/            # Hệ thống RESTful API (auth, products, orders...)
│   ├── components/         # Các Reusable React Components (Header, Footer, Card...)
│   ├── context/            # React Context (AuthContext, CartContext)
│   └── lib/                # Cấu hình thư viện (Prisma db client, Utility functions)
├── .env.example            # Biến môi trường mẫu
└── next.config.mjs         # Cấu hình Next.js
```

---

## 📡 API Documentation

### Base URL
`http://localhost:3000/api`

### Endpoints Chính
**Authentication (Xác thực)**
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Lấy thông tin user hiện tại

**Products (Sản phẩm)**
- `GET /api/products` - Danh sách sản phẩm (hỗ trợ lọc, phân trang)
- `GET /api/products/:id` - Chi tiết sản phẩm

**Orders (Đơn hàng)**
- `GET /api/orders` - Lấy danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PATCH /api/orders/:id/status` - Cập nhật trạng thái đơn hàng (Dành cho Seller)

**Shops/Sellers (Cửa hàng)**
- `GET /api/shops` - Danh sách gian hàng
- `GET /api/shops/:id` - Chi tiết gian hàng

---

## 👥 Tài Khoản Mặc Định

Sau khi chạy lệnh `npm run seed` thành công, bạn có thể đăng nhập bằng các tài khoản kiểm thử (demo) sau:

**1. Quản Trị Viên (Admin)**
- **Email:** admin@lazmall.com
- **Mật khẩu:** 123456
- **Quyền:** Truy cập toàn bộ Admin Dashboard, khóa tài khoản, xem thống kê.

**2. Người Bán (Seller)**
- **Email:** seller@lazmall.com
- **Mật khẩu:** 123456
- **Quyền:** Truy cập Seller Center, đăng/sửa/xóa sản phẩm, quản lý đơn hàng của shop.

**3. Khách Hàng (User)**
- **Email:** user@lazmall.com
- **Mật khẩu:** 123456
- **Quyền:** Mua hàng, xem lịch sử đơn hàng cá nhân.

---

## 💻 Scripts Hữu Ích

**Môi trường Development**
```bash
npm run dev        # Chạy dev server với HMR (Hot Module Replacement)
```

**Môi trường Production (Vercel)**
```bash
npm run build      # Build toàn bộ dự án
npm start          # Khởi chạy bản production
```

**Database (Prisma)**
```bash
npx prisma studio  # Mở giao diện web quản lý Database trực quan
npx prisma db push # Đồng bộ schema với cơ sở dữ liệu
npm run seed       # Chạy script tạo dữ liệu mẫu
```

---

## 🔧 Troubleshooting (Xử lý sự cố)

### Lỗi kết nối Database (PrismaClientInitializationError)
- **Nguyên nhân:** Chuỗi kết nối `DATABASE_URL` trong file `.env` bị sai hoặc Neon DB đang ngủ (sleep mode).
- **Khắc phục:** Kiểm tra lại URL, hoặc vào Dashboard của Neon để "đánh thức" database nếu bản free bị tạm dừng.

### Lỗi Port 3000 đang được sử dụng
- **Nguyên nhân:** Có một tiến trình Node.js khác đang chạy ở port 3000.
- **Khắc phục:**
  - Trên Windows: Chạy lệnh `netstat -ano | findstr :3000`, tìm PID và dùng `taskkill /PID <PID> /F`.
  - Trên Mac/Linux: `lsof -i :3000` rồi `kill -9 <PID>`.

### Giao diện không cập nhật sau khi đổi code (Cache Issue)
- **Nguyên nhân:** Next.js có cơ chế cache tĩnh (Static Rendering) rất mạnh.
- **Khắc phục:** Xóa thư mục `.next` và chạy lại `npm run dev`.
  ```bash
  rm -rf .next
  npm run dev
  ```

---

## 📜 Bản quyền (License)
Dự án được xây dựng phục vụ mục đích nghiên cứu, học tập và làm đồ án tốt nghiệp. Phân phối dưới giấy phép [MIT License](https://opensource.org/licenses/MIT).

---
*Made with by Vương Thanh Nghị