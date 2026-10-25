# BẢNG KIỂM KÊ MÀN HÌNH (SCREEN INVENTORY) – SMARTSHELF (BTL-10)

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Nhóm thực hiện:** Nhóm 5 – Lớp 67KTPM1 – Khoa CNTT, Đại học Thủy Lợi  
> **Giảng viên hướng dẫn:** ThS. Kiều Tuấn Dũng  
> **Sinh viên:**  
> 1. Trần Trọng Hoàng Anh (Nhóm trưởng - SV1) – MSV: 2551170859 – Email: 2551170859@e.tlu.edu.vn  
> 2. Nguyễn Quang Long (SV2) – MSV: 2551170915 – Email: 2551170915@e.tlu.edu.vn  
> 3. Nguyễn Văn Hân (SV3) – MSV: 2551170885 – Email: 2551170885@e.tlu.edu.vn  

---

## 1. Bảng Kiểm Kê Chi Tiết Toàn Bộ Giao Diện

| # | Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD | Bao phủ trạng thái | Tính năng AI | Sinh viên phụ trách | Mã Task | Tên nhánh Git | Video OBS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | Hệ thống | Khám phá & định tuyến | Điều hướng cổng chung & chọn vai trò | Cổng hệ thống SmartShelf | `index.html` | R | Normal | Giới thiệu 3 AI | Trần Trọng Hoàng Anh (SV1) | TASK-00 | `main` | SV1-00-index.mp4 |
| 0b | Hệ thống | Xác thực người dùng | Đăng nhập tài khoản & chuyển đổi vai trò | Đăng nhập phân quyền | `pages/login.html` | R | Normal, Loading, Error | – | Trần Trọng Hoàng Anh (SV1) | TASK-01 | `feature/auth-login` | SV1-01-login.mp4 |
| 1 | Khách mua sắm | Tìm kiếm sản phẩm | Tra cứu hàng, lọc theo ngành hàng, xem tồn kệ | Product Search | `pages/shopper-product-search.html` | R | Normal, Loading, Empty | – | Trần Trọng Hoàng Anh (SV1) | TASK-02 | `feature/shopper-search` | SV1-02-shopper-product-search.mp4 |
| 2 | Khách mua sắm | Định vị kệ hàng | Xem sơ đồ mặt bằng, chỉ đường đến kệ, báo thiếu hàng | Product Location | `pages/shopper-product-location.html` | C/R/U | Normal, Active target | – | Trần Trọng Hoàng Anh (SV1) | TASK-03 | `feature/shopper-location` | SV1-03-shopper-product-location.mp4 |
| 3 | Khách mua sắm | Tìm hàng thay thế | Nhận đề xuất sản phẩm tương đương khi hết hàng | Product Alternatives | `pages/shopper-product-alternatives.html` | C/R/U/D | Normal, AI Loading, AI Error | **AI-2: Product Alternative AI** | Trần Trọng Hoàng Anh (SV1) | TASK-04 | `feature/shopper-ai-alternatives` | SV1-04-shopper-product-alternatives.mp4 |
| 4 | Nhân viên | Giám sát ca trực | Xem trạng thái đầy/vơi/trống của 14 kệ theo 4 Zone | Zone View | `pages/associate-zone-view.html` | R | Normal, Filtered | – | Nguyễn Quang Long (SV2) | TASK-05 | `feature/associate-zone-view` | SV2-01-associate-zone-view.mp4 |
| 5 | Nhân viên | Kiểm kê hiện trường | Nhập số lượng thực đếm, đối soát tồn POS, phát hiện sai lệch | Shelf Check | `pages/associate-shelf-check.html` | C/R/U | Normal, Anomaly Alert | **AI-3: Shelf Anomaly Insight** | Nguyễn Quang Long (SV2) | TASK-06 | `feature/associate-shelf-check` | SV2-02-associate-shelf-check.mp4 |
| 6 | Nhân viên | Bổ sung hàng lên kệ | Nhận danh sách kệ ưu tiên AI, lấy hàng từ kho, xếp lên kệ | Restock Task | `pages/associate-restock-task.html` | C/R/U/D | Normal, AI Loading, AI Error, Pending, Completed | **AI-1: Restock Priority AI** | Nguyễn Quang Long (SV2) | TASK-07 | `feature/associate-restock-task` | SV2-03-associate-restock-task.mp4 |
| 7 | Quản lý | Giám sát tổng thể | Xem KPI doanh thu, tỷ lệ lấp đầy, điểm nóng cảnh báo | Store Dashboard | `pages/manager-store-dashboard.html` | R | Normal, Real-time update | AI Summary | Nguyễn Văn Hân (SV3) | TASK-08 | `feature/manager-dashboard` | SV3-01-manager-store-dashboard.mp4 |
| 8 | Quản lý | Điều phối nhân sự | Quản lý vòng đời nhiệm vụ bổ sung qua bảng Kanban | Restock Board | `pages/manager-restock-board.html` | C/R/U | Drag/Move, Modal validate | – | Nguyễn Văn Hân (SV3) | TASK-09 | `feature/manager-kanban` | SV3-02-manager-restock-board.mp4 |
| 9 | Quản lý | Chẩn đoán chuyên sâu | Phân tích tốc độ bán (velocity), chẩn đoán thất thoát kệ | Retail Insights | `pages/manager-retail-insights.html` | C/R/U/D | Normal, Anomaly High | **AI-3: Deep Shelf Anomaly Matrix** | Nguyễn Văn Hân (SV3) | TASK-10 | `feature/manager-retail-insights` | SV3-03-manager-retail-insights.mp4 |
| 10 | Quản trị | Quản lý danh mục | Thêm, sửa, gán vị trí kệ, cập nhật định mức tồn kho | Product Management | `pages/admin-product-management.html` | C/R/U/D | Normal, Empty, Modal validate | – | Nguyễn Văn Hân (SV3) | TASK-11 | `feature/admin-product` | SV3-04-admin-product-management.mp4 |
| 11 | Quản trị | Cấu hình mặt bằng | Quản lý sơ đồ 4 Zone, thêm kệ mới, cấu hình số tầng | Zone Management | `pages/admin-zone-management.html` | C/R/U | Normal, Toggle state | – | Nguyễn Văn Hân (SV3) | TASK-12 | `feature/admin-zone` | SV3-05-admin-zone-management.mp4 |
| 12 | Quản trị | Quản lý người dùng | Cấp tài khoản, phân quyền theo 4 vai trò, reset mật khẩu | User Management | `pages/admin-user-management.html` | C/R/U/D | Normal, Modal validate | – | Nguyễn Văn Hân (SV3) | TASK-13 | `feature/admin-user` | SV3-06-admin-user-management.mp4 |
| 13 | Hệ thống | Xử lý ngoại lệ | Trang thông báo không tìm thấy tài nguyên | 404 Not Found | `pages/404.html` | R | 404 State | – | Nhóm thực hiện chung | TASK-14 | `feature/common-pages` | SV1-05-404.mp4 |

---

## 2. Thống Kê Phân Bổ Công Việc Kỹ Thuật (Lát Cắt Dọc)

- **SV1 (Trần Trọng Hoàng Anh - Nhóm trưởng):** 5 màn hình (`index.html`, `login.html`, `shopper-product-search.html`, `shopper-product-location.html`, `shopper-product-alternatives.html` + `404.html`). Tính năng AI: **AI-2 Product Alternative AI**. Phụ trách: Hệ thống UI/CSS Tokens & Điều hướng.
- **SV2 (Nguyễn Quang Long):** 3 màn hình nghiệp vụ nặng (`associate-zone-view.html`, `associate-shelf-check.html`, `associate-restock-task.html`). Tính năng AI: **AI-1 Restock Priority AI** & **AI-3 Shelf Anomaly Insight (hiện trường)**. Phụ trách: Dữ liệu mô phỏng, Logic JavaScript đối soát và cập nhật kho hàng.
- **SV3 (Nguyễn Văn Hân):** 6 màn hình quản lý & quản trị (`manager-store-dashboard.html`, `manager-restock-board.html`, `manager-retail-insights.html`, `admin-product-management.html`, `admin-zone-management.html`, `admin-user-management.html`). Tính năng AI: **AI-3 Deep Shelf Anomaly Matrix**. Phụ trách: Bảng Kanban, CRUD Quản trị master, Responsive và tích hợp toàn hệ thống.
