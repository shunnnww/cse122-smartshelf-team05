# BẢNG PHÂN CÔNG NHIỆM VỤ & LÁT CẮT DỌC NHÓM 3 SINH VIÊN

> **Học phần:** CSE122 – Phát triển ứng dụng Web cơ bản  
> **Nhóm 5 – Lớp 67KTPM1 – ĐH Thủy Lợi**  
> **Đề tài BTL-10:** SmartShelf – Điều hành kệ hàng và hỗ trợ mua sắm  
> **Bảng Trello quản lý tiến độ:** [https://trello.com/b/rW6Y8Q04/cse122-btl-10-team-05-smartshelf](https://trello.com/b/rW6Y8Q04/cse122-btl-10-team-05-smartshelf)  

Nhóm tuân thủ nghiêm ngặt nguyên tắc **Lát cắt dọc (Vertical Slice)**: Mỗi sinh viên đều tự chủ thực hiện trọn vẹn chuỗi:  
`Phân tích yêu cầu → Thiết kế Mockup → HTML Semantic → CSS → JavaScript DOM → Dữ liệu mock → Responsive → Nhánh Git → Commit chuẩn → Pull Request → Video OBS`.

---

## 1. Phân Công Chi Tiết Từng Sinh Viên

### Sinh Viên 1: TRẦN TRỌNG HOÀNG ANH (Nhóm trưởng)
- **Mã sinh viên:** 2551170859
- **Email:** 2551170859@e.tlu.edu.vn
- **Lát cắt dọc chính:** **Vai trò Khách Mua Sắm (Shopper / Customer)**
- **Các màn hình phụ trách xây dựng:**
  1. `index.html` – Cổng thông tin điều hướng trung tâm hệ thống SmartShelf.
  2. `pages/login.html` – Trang đăng nhập phân quyền và chuyển đổi vai trò nhanh.
  3. `pages/shopper-product-search.html` – Tìm kiếm sản phẩm, lọc theo danh mục, vị trí kệ, xem trạng thái hàng trực tiếp.
  4. `pages/shopper-product-location.html` – Bản đồ mặt bằng siêu thị, định vị kệ hàng trực quan, hướng dẫn đường đi tới từng tầng kệ.
  5. `pages/shopper-product-alternatives.html` – **AI-2: Product Alternative AI** (Đề xuất sản phẩm thay thế khi cạn kệ, minh bạch lý do và thêm vào giỏ).
  6. `pages/404.html` – Trang lỗi 404 thân thiện.
- **Trách nhiệm kỹ thuật chéo:**
  - Thiết lập **Hệ thống thiết kế (Design System & CSS Tokens)**: Định nghĩa biến CSS màu sắc, typography, card borders, badge styles.
  - Xây dựng thanh điều hướng chung (`app-header`), thanh phân quyền (`role-switcher-select`), và hệ thống thông báo (`Toast Notifications`).
- **Minh chứng kỹ thuật:** 5 video OBS cá nhân (`SV1-00` đến `SV1-05`), nhánh `feature/shopper-*`, PR hợp nhất vào `dev`.

---

### Sinh Viên 2: NGUYỄN QUANG LONG
- **Mã sinh viên:** 2551170915
- **Email:** 2551170915@e.tlu.edu.vn
- **Lát cắt dọc chính:** **Vai trò Nhân Viên Cửa Hàng (Store Associate / Staff)**
- **Các màn hình phụ trách xây dựng:**
  1. `pages/associate-zone-view.html` – Bảng điều hành tình trạng 14 kệ hàng theo 4 Zone, hiển thị % lấp đầy và trạng thái cảnh báo.
  2. `pages/associate-shelf-check.html` – Phiếu kiểm kê thực địa, nhập số lượng đếm, đối soát chênh lệch với tồn POS, tích hợp **AI-3: Shelf Anomaly Insight**.
  3. `pages/associate-restock-task.html` – Bổ sung kệ hàng cấp bách, tích hợp **AI-1: Restock Priority AI** (Xếp hạng độ ưu tiên dựa trên tốc độ bán và lượng tồn), cập nhật trạng thái nhiệm vụ và tự động hoàn trả tồn kho vào database.
- **Trách nhiệm kỹ thuật chéo:**
  - Chịu trách nhiệm kiến trúc **Cơ sở dữ liệu mô phỏng (`assets/data/mock-db.json`)** và module API trung tâm (`js/api.js`).
  - Lập trình 2 thuật toán AI mô phỏng: Thuật toán tính điểm ưu tiên bổ sung kệ (MDVM-v2) và thuật toán chẩn đoán sai số kiểm kê hiện trường.
- **Minh chứng kỹ thuật:** 3 video OBS cá nhân (`SV2-01` đến `SV2-03`), nhánh `feature/associate-*`, PR hợp nhất vào `dev`.

---

### Sinh Viên 3: NGUYỄN VĂN HÂN
- **Mã sinh viên:** 2551170885
- **Email:** 2551170885@e.tlu.edu.vn
- **Lát cắt dọc chính:** **Vai trò Quản Lý Cửa Hàng (Manager) & Quản Trị Viên (Admin)**
- **Các màn hình phụ trách xây dựng:**
  1. `pages/manager-store-dashboard.html` – Executive Dashboard: Theo dõi KPI doanh thu, tỷ lệ lấp đầy, bảng các điểm nóng cần xử lý ngay.
  2. `pages/manager-restock-board.html` – Bảng Kanban 4 cột điều phối luồng công việc bổ sung hàng, modal tạo nhiệm vụ mới với form validation.
  3. `pages/manager-retail-insights.html` – Bảng phân tích tốc độ tiêu thụ (Sales Velocity) và ma trận chẩn đoán bất thường chuyên sâu (**AI-3 Deep Shelf Anomaly Matrix**).
  4. `pages/admin-product-management.html` – CRUD danh mục sản phẩm, gán vị trí kệ, thiết lập ngưỡng cảnh báo tồn kho.
  5. `pages/admin-zone-management.html` – CRUD cấu hình khu vực và 14 kệ hàng, đổi số tầng kệ, tải trọng và chuyển trạng thái vận hành.
  6. `pages/admin-user-management.html` – CRUD tài khoản người dùng, phân quyền theo 4 vai trò, mô phỏng reset mật khẩu.
- **Trách nhiệm kỹ thuật chéo:**
  - Chịu trách nhiệm **Kiểm thử Responsive đa màn hình** (Desktop, Tablet, Mobile) trên toàn bộ dự án (`css/responsive.css`).
  - Kiểm thử tích hợp tổng thể, rà soát tính nhất quán UI/UX và đảm bảo chất lượng phát hành (Release QA).
- **Minh chứng kỹ thuật:** 6 video OBS cá nhân (`SV3-01` đến `SV3-06`), nhánh `feature/manager-*` và `feature/admin-*`, PR hợp nhất vào `dev`.

---

## 2. Ma Trận Đánh Giá Khối Lượng Công Việc

| Thành viên | Số màn hình | Độ phức tạp logic JS | Tính năng AI tích hợp | Trách nhiệm chéo hệ thống | Đánh giá đóng góp |
|---|:---:|---|---|---|:---:|
| **Trần Trọng Hoàng Anh (SV1)** | 5 màn hình | Tìm kiếm lọc đa tiêu chí, Bản đồ SVG/Grid, Giỏ hàng LocalStorage | AI-2: Product Alternative AI | Design Tokens, UI Header/Toast, Điều hướng | 33.3% |
| **Nguyễn Quang Long (SV2)** | 3 màn hình | Đối soát tồn kho, Tính toán chênh lệch, Vòng đời nhiệm vụ xếp dỡ | AI-1: Restock Priority AI + AI-3 Insight | Kiến trúc Mock DB, API State Management | 33.3% |
| **Nguyễn Văn Hân (SV3)** | 6 màn hình | Bảng Kanban 4 cột, 3 bảng CRUD Admin có Modal Validation, Biểu đồ | AI-3: Deep Shelf Anomaly Matrix | Responsive CSS, Tích hợp & Kiểm thử QA | 33.3% |
