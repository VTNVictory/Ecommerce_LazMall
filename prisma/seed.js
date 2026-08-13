import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Bắt đầu dọn dẹp cơ sở dữ liệu cũ...");
  await prisma.review.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.voucher.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.shop.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Đang tạo người dùng demo (Users)...");
  const hashedPassword = bcrypt.hashSync("123456", 10);
  const demoUser = await prisma.user.create({
    data: {
      name: "Khách Hàng Demo",
      email: "demo@lazmall.com",
      password: hashedPassword,
      role: "USER",
    },
  });
  console.log("Đã tạo người dùng demo:", demoUser.email);

  const hashedAdminPassword = bcrypt.hashSync("admin123", 10);
  const adminUser = await prisma.user.create({
    data: {
      name: "Quản Trị Viên LazMall",
      email: "admin@lazmall.com",
      password: hashedAdminPassword,
      role: "ADMIN",
    },
  });
  console.log("Đã tạo tài khoản quản trị:", adminUser.email);

  // Tạo thêm một SELLER demo
  const sellerUser = await prisma.user.create({
    data: {
      name: "Người Bán Apple Official",
      email: "seller@lazmall.com",
      password: hashedPassword,
      role: "SELLER",
    },
  });

  console.log("Đang tạo Shop demo...");
  const appleShop = await prisma.shop.create({
    data: {
      name: "Apple Flagship Store",
      description: "Cửa hàng ủy quyền chính thức của Apple tại Việt Nam.",
      userId: sellerUser.id,
    },
  });

  const adminShop = await prisma.shop.create({
    data: {
      name: "LazMall Official Store",
      description: "Gian hàng chính hãng do LazMall phân phối.",
      userId: adminUser.id,
    },
  });

  console.log("Đang tạo danh mục (Categories)...");
  const categoriesData = [
    { name: "Điện Tử", icon: "Smartphone", color: "bg-blue-100 text-blue-600" },
    { name: "Thời Trang", icon: "Shirt", color: "bg-pink-100 text-pink-600" },
    { name: "Làm Đẹp", icon: "Sparkles", color: "bg-purple-100 text-purple-600" },
    { name: "Mẹ & Bé", icon: "Baby", color: "bg-green-100 text-green-600" },
    { name: "Nhà Cửa", icon: "Home", color: "bg-orange-100 text-orange-600" },
    { name: "Đồng Hồ", icon: "Watch", color: "bg-yellow-100 text-yellow-600" },
    { name: "Thể Thao", icon: "Dumbbell", color: "bg-red-100 text-red-600" },
    { name: "Sách", icon: "BookOpen", color: "bg-indigo-100 text-indigo-600" },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.create({
      data: cat,
    });
    categories.push(createdCat);
  }

  const catDienTu = categories.find((c) => c.name === "Điện Tử")?.id || 1;
  const catLamDep = categories.find((c) => c.name === "Làm Đẹp")?.id || 3;
  const catDongHo = categories.find((c) => c.name === "Đồng Hồ")?.id || 6;
  const catNhaCua = categories.find((c) => c.name === "Nhà Cửa")?.id || 5;

  console.log("Đang tạo sản phẩm Flash Sale...");
  const flashProductsData = [
    {
      name: "MacBook Pro 14\" M3 Chip",
      description: "MacBook Pro 14 inch trang bị chip M3 cực kỳ mạnh mẽ, màn hình Liquid Retina XDR sắc nét và thời lượng pin trâu lên tới 22 giờ. Một sản phẩm hoàn hảo cho mọi nhu cầu làm việc và sáng tạo chuyên nghiệp.",
      image: "https://images.unsplash.com/photo-1636115305669-9096bffe87fd?w=600&q=80",
      originalPrice: 45990000,
      price: 32193000,
      discount: 30,
      soldCount: "78",
      stock: 100,
      isOfficial: true,
      isFlashSale: true,
      categoryId: catDienTu,
      shopId: appleShop.id,
    },
    {
      name: "iPhone 15 Pro Max 256GB",
      description: "iPhone 15 Pro Max sở hữu khung vỏ Titan siêu bền nhẹ, nút Tác Vụ mới tiện lợi cùng cụm camera zoom 5x ấn tượng nhất từ trước đến nay. Bản quốc tế VN/A chính hãng.",
      image: "https://images.unsplash.com/photo-1426024084828-5da21e13f5dc?w=600&q=80",
      originalPrice: 29990000,
      price: 20993000,
      discount: 30,
      soldCount: "145",
      stock: 200,
      isOfficial: true,
      isFlashSale: true,
      categoryId: catDienTu,
      shopId: appleShop.id,
    },
    {
      name: "Sony WH-1000XM5 Headphones",
      description: "Tai nghe chụp tai chống ồn hàng đầu thế giới với vi xử lý V1 mới nhất, 8 micro thu âm thông minh đem lại trải nghiệm âm thanh thuần khiết, không tạp âm.",
      image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=600&q=80",
      originalPrice: 8990000,
      price: 6293000,
      discount: 30,
      soldCount: "234",
      stock: 300,
      isOfficial: true,
      isFlashSale: true,
      categoryId: catDienTu,
      shopId: adminShop.id,
    },
    {
      name: "iPad Pro 12.9\" M2",
      description: "Sức mạnh bứt phá từ vi xử lý Apple M2, màn hình mini-LED siêu rực rỡ mang cả rạp phim di động trên đôi tay bạn. Hỗ trợ Apple Pencil hover và phụ kiện thông minh.",
      image: "https://images.unsplash.com/photo-1596207498818-edb80522f50b?w=600&q=80",
      originalPrice: 28990000,
      price: 20293000,
      discount: 30,
      soldCount: "89",
      stock: 150,
      isOfficial: true,
      isFlashSale: true,
      categoryId: catDienTu,
      shopId: appleShop.id,
    },
    {
      name: "Apple Watch Ultra 2",
      description: "Được chế tác cho các vận động viên và nhà thám hiểm, Apple Watch Ultra 2 có thiết kế vỏ titan chắc chắn, thời lượng pin sử dụng nhiều ngày và màn hình sáng nhất từ trước đến nay.",
      image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&q=80",
      originalPrice: 19990000,
      price: 13993000,
      discount: 30,
      soldCount: "167",
      stock: 250,
      isOfficial: true,
      isFlashSale: true,
      categoryId: catDongHo,
      shopId: appleShop.id,
    },
  ];

  console.log("Đang tạo sản phẩm thường...");
  const normalProductsData = [
    {
      name: "MacBook Pro 14 M3 Chip - 512GB SSD - 18GB RAM - Chính hãng Apple Việt Nam",
      description: "Cấu hình nâng cấp 18GB RAM giúp xử lý đa nhiệm, thiết kế đồ họa, lập trình mượt mà. SSD 512GB siêu tốc lưu trữ dữ liệu thoải mái.",
      image: "https://images.unsplash.com/photo-1636115305669-9096bffe87fd?w=600&q=80",
      originalPrice: 52990000,
      price: 45990000,
      discount: 13,
      soldCount: "2.5k+",
      rating: 4.9,
      reviewCount: 543,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catDienTu,
      shopId: appleShop.id,
    },
    {
      name: "iPhone 15 Pro Max 256GB - Chính hãng VN/A - Trả góp 0%",
      description: "Điện thoại đỉnh cao của Apple năm nay với camera chính 48MP và khả năng chụp đêm siêu phàm. Khung titan bền bỉ sang trọng.",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
      originalPrice: 34990000,
      price: 29990000,
      discount: 14,
      soldCount: "5k+",
      rating: 4.8,
      reviewCount: 892,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catDienTu,
    },
    {
      name: "La Roche-Posay Serum Vitamin C10 - Làm sáng da, mờ thâm nám",
      description: "Serum Vitamin C nguyên chất giúp chống oxy hóa mạnh mẽ, làm sáng da tức thì, mờ vết thâm sạm và cải thiện nếp nhăn rõ rệt chỉ sau 1 tuần sử dụng.",
      image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&q=80",
      originalPrice: 950000,
      price: 725000,
      discount: 24,
      soldCount: "10k+",
      rating: 4.7,
      reviewCount: 1234,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catLamDep,
    },
    {
      name: "Sony WH-1000XM5 - Tai nghe chống ồn cao cấp - Chính hãng",
      description: "Chất âm tuyệt hảo cùng tính năng chống ồn tự động thích ứng với môi trường xung quanh. Kết nối Bluetooth đa điểm siêu tiện lợi.",
      image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=600&q=80",
      originalPrice: 9990000,
      price: 8490000,
      discount: 15,
      soldCount: "3.2k+",
      rating: 4.9,
      reviewCount: 678,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catDienTu,
    },
    {
      name: "Ghế Gaming E-Dra Mars EGC203 - Tựa lưng cao - Đệm êm ái",
      description: "Thiết kế chuẩn công thái học nâng đỡ cột sống, khung thép chịu lực tốt, đệm đúc nguyên khối chống xẹp lún bền bỉ theo thời gian.",
      image: "https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=600&q=80",
      originalPrice: 4990000,
      price: 3490000,
      discount: 30,
      soldCount: "1.8k+",
      rating: 4.6,
      reviewCount: 432,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catNhaCua,
    },
    {
      name: "iPad Pro 12.9 M2 - 256GB - WiFi - Chính hãng Apple",
      description: "iPad màn hình lớn, siêu mượt 120Hz Liquid Retina XDR mang lại trải nghiệm xem phim, thiết kế và vẽ phác thảo vô cùng đã mắt.",
      image: "https://images.unsplash.com/photo-1596207498818-edb80522f50b?w=600&q=80",
      originalPrice: 31990000,
      price: 28990000,
      discount: 9,
      soldCount: "1.5k+",
      rating: 4.8,
      reviewCount: 456,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catDienTu,
    },
    {
      name: "Bộ Makeup Charlotte Tilbury - Pillow Talk Collection - Chính hãng UK",
      description: "Bộ trang điểm tone hồng nude kinh điển gồm son thỏi, phấn má hồng và bảng phấn mắt 4 ô thời thượng, mang lại phong cách thanh lịch cuốn hút.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
      originalPrice: 3290000,
      price: 2490000,
      discount: 24,
      soldCount: "4.3k+",
      rating: 4.9,
      reviewCount: 789,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catLamDep,
    },
    {
      name: "Bàn làm việc gỗ Oak cao cấp - Thiết kế Bắc Âu hiện đại",
      description: "Chất liệu gỗ Sồi tự nhiên phủ sáp bảo vệ chống trầy xước ẩm mốc, khung chân vững chãi tối giản giúp góc làm việc của bạn thêm trang nhã.",
      image: "https://images.unsplash.com/photo-1602872029708-84d970d3382b?w=600&q=80",
      originalPrice: 7990000,
      price: 5990000,
      discount: 25,
      soldCount: "890+",
      rating: 4.7,
      reviewCount: 234,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catNhaCua,
    },
    {
      name: "Sofa 3 chỗ ngồi vải nhung cao cấp - Chân gỗ Sồi tự nhiên",
      description: "Nệm mút đàn hồi cao êm ái bọc vải nhung mịn màng. Gam màu xám hiện đại, phù hợp cho chung cư căn hộ nhỏ hoặc văn phòng công ty.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      originalPrice: 16990000,
      price: 12990000,
      discount: 24,
      soldCount: "567+",
      rating: 4.8,
      reviewCount: 345,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catNhaCua,
    },
    {
      name: "Apple Watch Ultra 2 - 49mm Titanium - GPS + Cellular",
      description: "Thép Titan bền bỉ chuẩn quân đội Mỹ, định vị tần số kép siêu chính xác. Thích hợp cho người dùng thường xuyên tập thể dục và dã ngoại ngoài trời.",
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80",
      originalPrice: 22990000,
      price: 19990000,
      discount: 13,
      soldCount: "2.1k+",
      rating: 4.9,
      reviewCount: 567,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catDongHo,
    },
    {
      name: "L'Oreal Paris Revitalift Crystal Serum - Tinh chất dưỡng da cao cấp",
      description: "Tinh chất dưỡng da đột phá thẩm thấu nhanh vào 10 lớp biểu bì, cung cấp Salicylic Acid kiểm soát dầu thừa và se khít lỗ chân lông hoàn hảo.",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80",
      originalPrice: 625000,
      price: 445000,
      discount: 29,
      soldCount: "15k+",
      rating: 4.6,
      reviewCount: 1567,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catLamDep,
    },
    {
      name: "Đèn LED trang trí phòng khách - Thiết kế hiện đại - Điều khiển từ xa",
      description: "Ánh sáng LED ấm áp dịu mắt, có thể điều chỉnh 3 chế độ màu sắc khác nhau, lắp đặt dễ dàng tăng độ thẩm mỹ sang trọng cho căn phòng của bạn.",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&q=80",
      originalPrice: 1790000,
      price: 1290000,
      discount: 28,
      soldCount: "3.4k+",
      rating: 4.7,
      reviewCount: 678,
      isOfficial: true,
      isFlashSale: false,
      categoryId: catNhaCua,
    },
  ];

  console.log("Đang thêm sản phẩm vào database...");
  for (const prod of [...flashProductsData, ...normalProductsData]) {
    await prisma.product.create({
      data: prod,
    });
  }

  console.log("Nạp dữ liệu mẫu thành công!");
}

main()
  .catch((e) => {
    console.error("Lỗi khi seed database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
