# SmartShelf – Điều Hành Kệ Hàng & Hỗ Trợ Mua Sắm

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Đề tài:** BTL-10 – Lĩnh vực Bán lẻ / RetailTech  
> **Nhóm thực hiện:** Nhóm 5 – Lớp 67KTPM1 – Khoa Công nghệ thông tin, Trường Đại học Thủy Lợi  
> **Giảng viên hướng dẫn:** ThS. Kiều Tuấn Dũng  
> **Năm học:** 2026 – 2027  

---

## 1. Ngữ Cảnh
Trong các siêu thị và chuỗi bán lẻ quy mô lớn, khách hàng thường gặp khó khăn khi tìm kiếm vị trí món đồ cần mua giữa hàng ngàn sản phẩm, đồng thời thất vọng khi đến nơi thì kệ đã hết sạch hàng. Ở chiều ngược lại, nhân viên kiểm kê kệ chủ yếu bằng mắt thường, phát hiện kệ trống chậm trễ khiến cửa hàng mất doanh thu, và ban quản lý khó nắm bắt tình trạng lệch kho hoặc thất thoát giữa số liệu máy tính và số lượng thực tế trên kệ.

## 2. Phát Biểu Vấn Đề
- **P1.** Khách mất nhiều thời gian đi lòng vòng tìm kiếm sản phẩm trong siêu thị.
- **P2.** Kệ hết hàng phát hiện muộn trong giờ cao điểm mua sắm.
- **P3.** Nhân viên thiếu danh sách ưu tiên bổ sung hàng từ kho lên kệ dựa trên sức mua thực tế.
- **P4.** Quản lý khó nhìn thấy bức tranh tổng thể theo từng khu vực và phát hiện sai số kiểm đếm.

## 3. Mục Tiêu Dự Án
- **O1.** Chuyển hóa bài toán thực tế thành sản phẩm Web Frontend hoàn chỉnh với hành trình người dùng rõ ràng.
- **O2.** Xây dựng đầy đủ 4 vai trò độc lập với tổng cộng **14 màn hình** nghiệp vụ liên kết chặt chẽ.
- **O3.** Thao tác CRUD thực chất, vòng đời dữ liệu rõ ràng, lưu trữ bền vững qua `localStorage` và Mock Database JSON.
- **O4.** Ứng dụng HTML5 Semantic, CSS Grid/Flexbox, thiết kế Responsive trên Desktop, Tablet và Mobile.
- **O5.** Tích hợp **3 tính năng Trí tuệ nhân tạo (AI Features)** có giải trình và cơ chế xử lý khi AI thất bại.
- **O6.** Tuân thủ quy trình Git Flow (nhánh `feature/*`, PR, Code Review) và minh chứng quá trình làm thật bằng video OBS cho từng màn hình.

---

## 4. Các Vai Trò Trong Hệ Thống
| Vai trò | Phụ trách chính | Nhiệm vụ cốt lõi |
|---|---|---|
| **Khách mua sắm (Shopper)** | Trần Trọng Hoàng Anh (SV1) | Tìm kiếm hàng, xem sơ đồ vị trí kệ & tầng, nhận gợi ý sản phẩm thay thế bằng AI |
| **Nhân viên cửa hàng (Associate)** | Nguyễn Quang Long (SV2) | Kiểm kê kệ theo khu vực, nhập số lượng thực đếm, bổ sung hàng theo thứ tự ưu tiên AI |
| **Quản lý cửa hàng (Manager)** | Nguyễn Văn Hân (SV3) | Dashboard theo dõi KPI, điều phối nhiệm vụ qua bảng Kanban, xem AI chẩn đoán thất thoát |
| **Quản trị viên (Admin)** | Nguyễn Văn Hân (SV3) | Quản lý danh mục hàng hóa, cấu hình mặt bằng 4 khu vực & 14 kệ, quản lý tài khoản người dùng |

---

## 5. Luồng Người Dùng Tổng Quát (User Journey)
```text
Cổng hệ thống (index.html) / Đăng nhập phân quyền (login.html)
  │
  ├── [Khách Mua Sắm] ──> Tìm kiếm sản phẩm ──> Xem bản đồ vị trí Kệ - Tầng ──> Hết hàng? ──> AI-2 Gợi ý thay thế ──> Thêm vào giỏ
  │
  ├── [Nhân Viên Kệ]  ──> Giám sát Zone View ──> Kiểm kê kệ thực tế ──> Phát hiện lệch kho? ──> AI-3 Cảnh báo bất thường ──> Nhận Task bổ sung hàng AI-1 ──> Xếp lên kệ
  │
  ├── [Quản Lý]       ──> Store Dashboard ──> Điều phối Kanban 4 cột ──> Báo cáo chẩn đoán thất thoát AI-3 ──> Khóa tồn kho / Lệnh tái kiểm kê
  │
  └── [Quản Trị Viên] ──> CRUD Danh mục sản phẩm ──> CRUD Cấu hình Kệ & Zone ──> Quản lý phân quyền tài khoản
```

---

## 6. Bảng Kiểm Kê Màn Hình (Screen Inventory)
Xem chi tiết tại [docs/screen-inventory.md](docs/screen-inventory.md).
Tổng số: **14 màn hình** (Vượt chuẩn quy định tối thiểu 12 màn hình của đề tài).

---

## 7. Ba Tính Năng Trí Tuệ Nhân Tạo (AI Features)
Mỗi tính năng tuân thủ nghiêm ngặt chu trình:  
`Người dùng nhập → Kiểm tra hợp lệ → AI xử lý (Skeleton / Loading) → Kết quả AI → Vì sao có kết quả này? (Explainable AI) → Người dùng phê duyệt (Chấp nhận / Sửa / Từ chối / Tạo lại) → Lưu vào trạng thái ứng dụng`.

1. **AI-1: Restock Priority AI (Trang `pages/associate-restock-task.html`):**  
   Xếp hạng ưu tiên bổ sung hàng lên kệ dựa trên công thức đa yếu tố kết hợp tốc độ bán (sales velocity) và mức độ vơi kệ. Có nút thử nghiệm trạng thái khi AI thiếu dữ liệu.
2. **AI-2: Product Alternative AI (Trang `pages/shopper-product-alternatives.html`):**  
   Khi khách tìm sản phẩm đã hết hàng (như Coca-Cola Không Đường), AI tự động tìm các sản phẩm thay thế cùng ngành hàng, mức giá tương đương và còn sẵn hàng trên kệ, giải thích lý do cụ thể và hỗ trợ thêm vào giỏ hàng ngay.
3. **AI-3: Shelf Anomaly Insight (Trang `pages/associate-shelf-check.html` & `pages/manager-retail-insights.html`):**  
   Đối soát số lượng đếm thực tế với số liệu máy tính, tự động chẩn đoán thất thoát bất thường (như chênh lệch -20 gói mì tại Kệ B02), phân tích xác suất nguyên nhân (xếp nhầm kệ, thất thoát, sót hóa đơn) và đề xuất biện pháp xử lý.

---

## 8. Công Nghệ Áp Dụng
- **Frontend:** HTML5 Semantic, CSS3 (CSS Variables, Flexbox, CSS Grid), JavaScript ES6+.
- **Responsive:** Tối ưu hóa mượt mà trên Desktop, Tablet (1024px) và Mobile (768px) với [css/responsive.css](css/responsive.css).
- **Lưu trữ dữ liệu:** Seed dữ liệu ban đầu từ [assets/data/mock-db.json](assets/data/mock-db.json) và đồng bộ liên tục vào `localStorage` qua module [js/api.js](js/api.js).

---

## 9. Thành Viên Nhóm & Phân Công Nhiệm Vụ (Lát Cắt Dọc)
Chi tiết tại [docs/team-assignment.md](docs/team-assignment.md):
- **Trần Trọng Hoàng Anh (SV1 - Nhóm trưởng - MSV: 2551170859):**  
  Phụ trách luồng Khách mua sắm (Shopper), Cổng điều hướng, Đăng nhập, Design Tokens CSS chung, và tính năng **AI-2 Product Alternative AI**. (5 video OBS: `SV1-00` đến `SV1-05`).
- **Nguyễn Quang Long (SV2 - MSV: 2551170915):**  
  Phụ trách luồng Nhân viên kệ hàng (Associate), Kiểm kê kệ, Quản lý nhiệm vụ bổ sung, và tính năng **AI-1 Restock Priority AI** & **AI-3 Shelf Anomaly Insight**. (3 video OBS: `SV2-01` đến `SV2-03`).
- **Nguyễn Văn Hân (SV3 - MSV: 2551170885):**  
  Phụ trách luồng Quản lý (Manager Dashboard, Kanban) & Quản trị viên (Master CRUD Sản phẩm, Kệ, User), Responsive CSS và **AI-3 Deep Anomaly Matrix**. (6 video OBS: `SV3-01` đến `SV3-06`).

---

## 10. Quy Trình Git & Quản Lý Mã Nguồn
- **Tên Repository:** `cse122-smartshelf-team05`
- **Chiến lược nhánh:**
  - `main`: Nhánh sản phẩm ổn định, phát hành cuối cùng.
  - `dev`: Nhánh tích hợp và kiểm thử chung.
  - `feature/<tên-chức-năng>`: Nhánh làm việc riêng của từng sinh viên cho từng màn hình.
- **Quy tắc commit:** `feat: ...`, `fix: ...`, `style: ...`, `refactor: ...`, `docs: ...` (tuyệt đối không commit kiểu `update`, `done`, `final`).

---

## 11. Hướng Dẫn Cài Đặt & Chạy Thử Demo
Hệ thống được thiết kế dạng Web tĩnh thuần túy không phụ thuộc framework nặng, rất dễ chạy thử:
1. Tải hoặc sao chép mã nguồn về máy tính.
2. Mở tệp `index.html` trực tiếp bằng trình duyệt Google Chrome, Edge hoặc Firefox (hoặc sử dụng extension **Live Server** trong VS Code).
3. Sử dụng menu chuyển đổi vai trò ở góc phải đầu trang để luân chuyển giữa 4 đối tượng: Khách hàng, Nhân viên, Quản lý và Quản trị viên.

---

## 12. Tài Liệu Kèm Theo & Minh Chứng Quá Trình
- [docs/project-proposal.md](docs/project-proposal.md) – Báo cáo đề tài chi tiết.
- [docs/screen-inventory.md](docs/screen-inventory.md) – Bảng kiểm kê màn hình chuẩn phụ lục B.
- [docs/roles-and-features.md](docs/roles-and-features.md) – Phân tích 4 vai trò theo 10 câu hỏi chuẩn.
- [docs/team-assignment.md](docs/team-assignment.md) – Phân công lát cắt dọc và ma trận đóng góp.
- [docs/ai-usage-report.md](docs/ai-usage-report.md) – Báo cáo khai báo sử dụng AI chuẩn phụ lục F.
- [docs/obs-evidence.md](docs/obs-evidence.md) – Hướng dẫn quay OBS và kịch bản live edit bảo vệ.
- [design/figma-link.txt](design/figma-link.txt) – Liên kết và thông số thiết kế Figma/Canva.
