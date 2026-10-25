# BÁO CÁO ĐỀ TÀI BÀI TẬP LỚN: SMARTSHELF
## ĐIỀU HÀNH KỆ HÀNG VÀ HỖ TRỢ MUA SẮM (BTL-10)

> **Học phần:** CSE122 – Phát triển ứng dụng Web cơ bản  
> **Khoa:** Công nghệ thông tin – Trường Đại học Thủy Lợi  
> **Giảng viên hướng dẫn:** ThS. Kiều Tuấn Dũng  
> **Nhóm thực hiện:** Nhóm 5 – Lớp 67KTPM1  
> **Thành viên:**  
> 1. **Trần Trọng Hoàng Anh** (Nhóm trưởng) – MSV: 2551170859 – Email: 2551170859@e.tlu.edu.vn  
> 2. **Nguyễn Quang Long** – MSV: 2551170915 – Email: 2551170915@e.tlu.edu.vn  
> 3. **Nguyễn Văn Hân** – MSV: 2551170885 – Email: 2551170885@e.tlu.edu.vn  
> **Hà Nội, Năm học 2026 – 2027**

---

## 1. Ngữ Cảnh & Tính Cấp Thiết
Trong bối cảnh ngành bán lẻ hiện đại (RetailTech), các siêu thị và chuỗi cửa hàng tiện lợi đối mặt với lượng hàng hóa khổng lồ được phân bổ trên hàng chục, hàng trăm kệ hàng. 
Thực tế nảy sinh hai nút thắt lớn:
1. **Ở phía người tiêu dùng (Shopper):** Khách hàng bước vào siêu thị thường mất nhiều thời gian đi lòng vòng để tìm kiếm một món đồ cụ thể. Khi món hàng trên kệ đã cạn, khách hàng thất vọng bỏ đi mà không biết có món nào tương đương thay thế ngay gần đó.
2. **Ở phía vận hành cửa hàng (Store Operation):** Nhân viên kiểm kê kệ chủ yếu bằng mắt thường, phát hiện kệ cạn muộn khiến cửa hàng mất doanh thu vào các khung giờ vàng. Đồng thời, việc thất thoát hàng hóa hoặc xếp nhầm vị trí kệ giữa số liệu máy tính và thực tế rất khó phát hiện kịp thời nếu không có công cụ đối soát thông minh.

Dự án **SmartShelf** được thiết kế như một nền tảng Web Frontend toàn diện nhằm kết nối hai nhu cầu cốt lõi này: Hỗ trợ khách hàng tìm kiếm & định vị kệ hàng chính xác; đồng thời cung cấp cho nhân viên và quản lý hệ thống điều hành kệ, tự động hóa xếp hạng bổ sung hàng và chẩn đoán bất thường bằng AI.

---

## 2. Phát Biểu Vấn Đề (Problem Statement)
- **P1. Trải nghiệm tìm kiếm kém:** Khách mất từ 10–15 phút tìm sản phẩm tại các dãy kệ siêu thị nhiều tầng.
- **P2. Cạn kệ không được báo trước (Out-of-Stock latency):** Nhân viên chỉ phát hiện kệ hết hàng khi khách phàn nàn hoặc trong các đợt kiểm kho cuối ngày.
- **P3. Thiếu cơ chế ưu tiên bổ sung (Restock Prioritization):** Khi nhiều kệ cùng cạn, nhân viên không biết kệ nào nên bổ sung trước dựa trên sức mua và doanh thu.
- **P4. Thất thoát & Sai lệch tồn kho (Inventory Discrepancy):** Chênh lệch giữa tồn hệ thống POS và số lượng thực đếm trên kệ diễn ra phổ biến nhưng thiếu công cụ giải trình nguyên nhân.

---

## 3. Mục Tiêu Dự Án (Objectives)
- **O1.** Xây dựng một sản phẩm Web đa vai trò (Multi-role) với 4 vai trò rõ rệt: Khách mua sắm, Nhân viên kệ hàng, Quản lý cửa hàng và Quản trị viên.
- **O2.** Phát triển đầy đủ 14 màn hình độc lập, vượt chuẩn quy định tối thiểu (ít nhất 3 màn hình/vai trò), có tính liên kết chặt chẽ theo luồng nghiệp vụ.
- **O3.** Ứng dụng đầy đủ các kỹ thuật Web nền tảng: Semantic HTML5, CSS Flexbox/Grid, Responsive Mobile/Tablet/Desktop, JavaScript ES6 DOM Manipulation, Form Validation, LocalStorage Data Persistence.
- **O4.** Tích hợp 3 tính năng Trí tuệ nhân tạo (AI Features) có tính giải trình (Explainable AI), có đầy đủ các trạng thái Input &rarr; Loading/Progress &rarr; Result &rarr; Rationale &rarr; User Control &rarr; Application State &rarr; Failure Fallback:
  1. *AI-1: Restock Priority AI* (Xếp hạng ưu tiên bổ sung kệ).
  2. *AI-2: Product Alternative AI* (Gợi ý sản phẩm thay thế khi cạn kệ).
  3. *AI-3: Shelf Anomaly Insight* (Phát hiện & chẩn đoán sai lệch kiểm kê).
- **O5.** Áp dụng quy trình kỹ thuật phần mềm chuẩn: Trello Kanban, Git Flow (nhánh `feature/*`, PR, Code Review, commit convention) và video minh chứng OBS cho từng màn hình.

---

## 4. Bốn Vai Trò Trong Hệ Thống (User Roles)
1. **Khách mua sắm (Shopper):** Tra cứu nhanh sản phẩm, xem chính xác Kệ - Tầng, xem bản đồ chỉ đường siêu thị, nhận gợi ý sản phẩm thay thế từ AI-2 khi món hàng hết sạch.
2. **Nhân viên cửa hàng (Associate / Staff):** Giám sát trạng thái 14 kệ hàng theo 4 Zone (Đồ uống, Thực phẩm khô, Snack/Bánh kẹo, Hóa mỹ phẩm), thực hiện kiểm kê đối soát, nhận nhiệm vụ xếp hàng ưu tiên do AI-1 phân tích.
3. **Quản lý cửa hàng (Store Manager):** Theo dõi Dashboard vận hành tổng quan, điều phối luồng công việc qua bảng Kanban 4 cột, khai thác AI-3 để điều tra các điểm nóng thất thoát.
4. **Quản trị viên (Admin):** CRUD danh mục sản phẩm, định nghĩa cấu trúc phân tầng kệ và khu vực, quản lý người dùng và phân quyền.

---

## 5. Kiến Trúc Kỹ Thuật & Công Nghệ Áp Dụng
- **Giao diện & Cấu trúc:** HTML5 Semantic (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- **Tạo kiểu & Bố cục:** CSS3 thuần với hệ thống Design Tokens (CSS Variables: `--primary`, `--secondary`, `--accent-ai`, `--radius-*`, `--shadow-*`), Flexbox, CSS Grid.
- **Đáp ứng đa thiết bị (Responsive):** Breakpoints tại 1024px (Tablet) và 768px (Mobile), tối ưu hóa bảng biểu cuộn ngang và menu điều hướng co giãn.
- **Lập trình Logic:** JavaScript ES6+ (Async/Await, Promises, Event Listeners, DOM Rendering, Regex Validation).
- **Cơ sở dữ liệu & Trạng thái:** Seed dữ liệu ban đầu từ `assets/data/mock-db.json`, tự động lưu trữ và đồng bộ liên tục vào `localStorage` (`SMARTSHELF_DB_V1`, `SMARTSHELF_CART`, `SMARTSHELF_CURRENT_USER`), giúp các thao tác CRUD và AI lưu giữ trạng thái giữa các trang mà không cần cài đặt backend phức tạp.
