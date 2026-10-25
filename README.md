# SmartShelf – Điều hành kệ hàng & Hỗ trợ mua sắm

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Đề tài:** BTL-10 – Lĩnh vực Bán lẻ / RetailTech  
> **Khoa:** Công nghệ thông tin – Trường Đại học Thủy Lợi (TLU)  
> **Giảng viên hướng dẫn & Chấm thi:** ThS. Kiều Tuấn Dũng – ThS. Tạ Chí Hiếu  
> **Năm học:** 2026 – 2027  

---

## 1. Ngữ cảnh
Trong các siêu thị và chuỗi bán lẻ quy mô lớn, khách hàng thường gặp khó khăn khi tìm kiếm vị trí món đồ cần mua giữa hàng ngàn sản phẩm, đồng thời thất vọng khi đến nơi thì kệ đã hết sạch hàng. Ở chiều ngược lại, nhân viên kiểm kê kệ chủ yếu bằng mắt thường, phát hiện kệ trống chậm trễ khiến cửa hàng mất doanh thu, và ban quản lý khó nắm bắt tình trạng lệch kho hoặc thất thoát giữa số liệu máy tính và số lượng thực tế trên kệ.

---

## 2. Thông tin Giảng viên & Nhóm sinh viên thực hiện
* **Giảng viên hướng dẫn & Chấm điểm:** ThS. Kiều Tuấn Dũng – ThS. Tạ Chí Hiếu
* **Nhóm sinh viên thực hiện (Nhóm 5 – Lớp 67KTPM1):**
  1. **Trần Trọng Hoàng Anh (Nhóm trưởng - SV1)** – MSV: `2551170859` – Email: `2551170859@e.tlu.edu.vn`
  2. **Nguyễn Quang Long (SV2)** – MSV: `2551170915` – Email: `2551170915@e.tlu.edu.vn`
  3. **Nguyễn Văn Hân (SV3)** – MSV: `2551170885` – Email: `2551170885@e.tlu.edu.vn`

---

## 3. Phát biểu bài toán thực tế (P1 – P4)
* **P1 (Khách mua sắm):** Khách mất nhiều thời gian đi lòng vòng tìm kiếm vị trí sản phẩm trong siêu thị.
* **P2 (Cửa hàng):** Kệ hết hàng bị phát hiện muộn trong giờ cao điểm mua sắm, gây đứt gãy trải nghiệm.
* **P3 (Nhân viên):** Nhân viên thiếu danh sách ưu tiên bổ sung hàng từ kho lên kệ dựa trên sức mua thực tế.
* **P4 (Ban quản lý):** Quản lý khó nhìn thấy bức tranh tổng thể theo từng khu vực và phát hiện sai số kiểm đếm thất thoát.

---

## 4. Mục tiêu dự án (O1 – O7)
* **O1.** Chuyển hóa bài toán thực tế thành sản phẩm Web Frontend hoàn chỉnh với hành trình người dùng rõ ràng.
* **O2.** Xây dựng đầy đủ 4 vai trò độc lập với tổng cộng **14 màn hình** nghiệp vụ liên kết chặt chẽ.
* **O3.** Thao tác CRUD thực chất, vòng đời dữ liệu rõ ràng, lưu trữ bền vững qua `localStorage` và Mock Database JSON.
* **O4.** Ứng dụng HTML5 Semantic, CSS Grid/Flexbox, thiết kế Responsive trên Desktop, Tablet và Mobile.
* **O5.** Tích hợp **3 tính năng Trí tuệ nhân tạo (AI Features)** có giải trình và cơ chế xử lý khi AI thất bại.
* **O6.** Tuân thủ quy trình Git Flow (nhánh `feature/*`, PR, Peer Review) và minh chứng quá trình làm thật bằng video OBS cho từng màn hình.
* **O7.** Tích hợp các tính năng mở rộng cao cấp đạt điểm thưởng (Đồng bộ thời gian thực đa tab, Dark Mode, Xuất CSV/JSON/Print, Safe AI Key).

---

## 5. Các vai trò & Kiến trúc phân quyền (4 Roles)
| Vai trò | Phụ trách chính | Nhiệm vụ cốt lõi |
|---|---|---|
| **Khách mua sắm (Shopper)** | Trần Trọng Hoàng Anh (SV1) | Tìm kiếm hàng, xem sơ đồ vị trí kệ & tầng, nhận gợi ý sản phẩm thay thế bằng AI |
| **Nhân viên cửa hàng (Associate)** | Nguyễn Quang Long (SV2) | Kiểm kê kệ theo khu vực, nhập số lượng thực đếm, bổ sung hàng theo thứ tự ưu tiên AI |
| **Quản lý cửa hàng (Manager)** | Nguyễn Văn Hân (SV3) | Dashboard theo dõi KPI, điều phối nhiệm vụ qua bảng Kanban, xem AI chẩn đoán thất thoát |
| **Quản trị viên (Admin)** | Nguyễn Văn Hân (SV3) | Quản lý danh mục hàng hóa, cấu hình mặt bằng 4 khu vực & 14 kệ, quản lý tài khoản người dùng |

---

## 6. Luồng người dùng tổng quát (User Journey)
```text
Cổng hệ thống (index.html) / Đăng nhập phân quyền (login.html)
  │
  ├── [Khách mua sắm] ──> Tìm kiếm sản phẩm ──> Xem sơ đồ vị trí kệ - tầng ──> Hết hàng? ──> AI-2 Gợi ý thay thế ──> Thêm vào giỏ
  │
  ├── [Nhân viên kệ]  ──> Giám sát khu vực ──> Kiểm kê kệ thực tế ──> Phát hiện lệch kho? ──> AI-3 Cảnh báo bất thường ──> Nhận việc bổ sung hàng AI-1 ──> Xếp lên kệ
  │
  ├── [Quản lý]       ──> Bảng điều hành ──> Điều phối Kanban 4 cột ──> Báo cáo chẩn đoán thất thoát AI-3 ──> Khóa tồn kho / Lệnh tái kiểm kê
  │
  └── [Quản trị viên] ──> CRUD Danh mục sản phẩm ──> CRUD Cấu hình kệ & khu vực ──> Quản lý phân quyền tài khoản
```

---

## 7. Bảng kiểm kê màn hình (Screen Inventory)
Xem chi tiết đầy đủ 12 cột chuẩn tại [docs/screen-inventory.md](docs/screen-inventory.md).
Tổng số: **14 màn hình** (Vượt chuẩn quy định tối thiểu 12 màn hình của đề tài).

---

## 8. Bộ ba tính năng Trí tuệ nhân tạo (AI Features & Luồng 6 bước AI UX)
Mỗi tính năng tuân thủ nghiêm ngặt chu trình 6 bước:  
`1. Input (Dữ liệu đầu vào) → 2. Processing (Skeleton/Loading) → 3. Output (Card trực quan) → 4. Explainability (Vì sao có kết quả này? / Độ tin cậy %) → 5. User Control (Chấp nhận / Sửa / Từ chối / Tạo lại) → 6. Save / Apply (Cập nhật trực tiếp vào dữ liệu thật)`.

1. **AI-1: Restock Priority AI (Trang `pages/associate-restock-task.html`):**  
   Xếp hạng ưu tiên bổ sung hàng lên kệ dựa trên công thức đa yếu tố kết hợp tốc độ bán (sales velocity) và mức độ vơi kệ (MDVM-v2). Có kịch bản kiểm thử trực tiếp khi AI thiếu dữ liệu hoặc độ tin cậy thấp.
2. **AI-2: Product Alternative AI (Trang `pages/shopper-product-alternatives.html`):**  
   Khi khách tìm sản phẩm đã hết hàng (như Coca-Cola Không Đường), AI tự động tìm các sản phẩm thay thế cùng ngành hàng, mức giá tương đương và còn sẵn hàng trên kệ, giải thích lý do cụ thể và hỗ trợ thêm vào giỏ hàng ngay.
3. **AI-3: Shelf Anomaly Insight (Trang `pages/associate-shelf-check.html` & `pages/manager-retail-insights.html`):**  
   Đối soát số lượng đếm thực tế với số liệu máy tính, tự động chẩn đoán thất thoát bất thường (như chênh lệch -20 gói mì tại Kệ B02), phân tích xác suất nguyên nhân và đề xuất biện pháp xử lý.

---

## 9. Hệ thống thiết kế & Công nghệ áp dụng
- **Kiến trúc CSS & Design Tokens:** Khai báo tập trung trong `:root` tại [css/style.css](css/style.css), hỗ trợ đầy đủ chế độ Giao diện Tối (`[data-theme="dark"]`).
- **Khả năng tiếp cận (Accessibility - A11y):** Đầy đủ thẻ `<label for>`, thuộc tính `alt`, viền `:focus-visible` chuẩn WCAG 2.1 (≥ 4.5:1), hỗ trợ phím `Tab` và phím `Esc` đóng modal.
- **Responsive:** Tối ưu hóa mượt mà trên Desktop (≥ 1024px), Tablet (768px) và Mobile (320px–375px) qua [css/responsive.css](css/responsive.css). Không phát sinh thanh cuộn ngang ngoài ý muốn.
- **Lưu trữ dữ liệu:** Seed dữ liệu ban đầu từ [assets/data/mock-db.json](assets/data/mock-db.json) và đồng bộ liên tục vào `localStorage` qua module [js/api.js](js/api.js).

---

## 10. Thành viên nhóm & Phân công nhiệm vụ (Lát cắt dọc)
Chi tiết ma trận đóng góp tại [docs/team-assignment.md](docs/team-assignment.md):
- **Trần Trọng Hoàng Anh (SV1 - Nhóm trưởng - MSV: 2551170859):**  
  *Vertical Slice:* Khách mua sắm (Shopper), Cổng điều hướng, Đăng nhập, và tính năng **AI-2 Product Alternative AI**. (5 video OBS: `SV1-00` đến `SV1-05`).  
  *Trục chéo 1:* Hệ thống thiết kế (Design System / CSS Variables) + Điều hướng chung + Khả năng tiếp cận (A11y).
- **Nguyễn Quang Long (SV2 - MSV: 2551170915):**  
  *Vertical Slice:* Nhân viên kệ hàng (Associate), Kiểm kê kệ, Quản lý nhiệm vụ bổ sung, và tính năng **AI-1 Restock Priority AI** & **AI-3 Shelf Anomaly Insight**. (3 video OBS: `SV2-01` đến `SV2-03`).  
  *Trục chéo 2:* Kiến trúc JavaScript + Mô-đun Dữ liệu giả lập / API (`js/api.js`, `localStorage`) + Chuẩn hóa tương tác AI UX.
- **Nguyễn Văn Hân (SV3 - MSV: 2551170885):**  
  *Vertical Slice:* Quản lý (Manager Dashboard, Kanban) & Quản trị viên (Master CRUD Sản phẩm, Kệ, User), Responsive CSS và **AI-3 Deep Anomaly Matrix**. (6 video OBS: `SV3-01` đến `SV3-06`).  
  *Trục chéo 3:* Kiểm thử Responsive đa thiết bị + Hợp nhất nhánh (`dev` → `main`) + Triển khai (Deployment) & Đảm bảo chất lượng (QA).

---

## 11. Quy trình Git & Quản lý mã nguồn
- **Tên Repository:** `cse122-smartshelf-team05`
- **Địa chỉ kho mã nguồn:** `https://github.com/shunnnww/cse122-smartshelf-team05.git`
- **Chiến lược nhánh:**
  - `main`: Nhánh sản phẩm ổn định, phát hành chính thức.
  - `dev`: Nhánh tích hợp và kiểm thử chung.
  - `feature/*`: Nhánh tính năng riêng biệt của từng sinh viên cho từng màn hình.
- **Quy tắc commit:** Tuân thủ chuẩn Conventional Commits (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`).

---

## 12. Bảng quản lý tiến độ Trello / Kanban
- **Đường dẫn Bảng Trello:** [https://trello.com/b/rW6Y8Q04/cse122-btl-10-team-05-smartshelf](https://trello.com/b/rW6Y8Q04/cse122-btl-10-team-05-smartshelf)
- Bảng Kanban được tổ chức đầy đủ 5 cột tiêu chuẩn: `Backlog` → `To Do` → `In Progress` → `Review` → `Done`.
- Mỗi thẻ công việc (`TASK-00` đến `TASK-14`) đều ghi rõ: Thành viên phụ trách, Nhánh Git, PR Link, Tệp màn hình và Video OBS tương ứng.

---

## 13. Hướng dẫn cài đặt & Chạy thử cục bộ
Hệ thống là Web Frontend thuần túy (Vanilla HTML5 / CSS3 / JavaScript ES6), không đòi hỏi cài đặt môi trường nặng nề:
1. Sao chép kho mã nguồn về máy: `git clone https://github.com/shunnnww/cse122-smartshelf-team05.git`
2. Mở thư mục dự án trong **VS Code**.
3. Khởi động bằng extension **Live Server** (chuột phải vào `index.html` chọn *Open with Live Server*).
4. Sử dụng bộ chuyển vai trò (Role Switcher) ở góc phải header để chuyển đổi nhanh giữa 4 vai trò.

---

## 14. Các tính năng mở rộng đạt Điểm thưởng (Bonus +1.0 điểm)
Dự án đã hiện thực đầy đủ cả 4 hạng mục mở rộng theo quy chế thi để đạt trọn vẹn điểm thưởng:
1. **Mở rộng 1 (+0.50đ) — Đồng bộ dữ liệu đa vai trò thời gian thực (Real-time Cross-Tab Sync):**  
   Sử dụng `BroadcastChannel('smartshelf_sync_channel')` và sự kiện `storage`. Khi Khách hàng/Nhân viên cập nhật dữ liệu ở Tab 1, Dashboard của Quản lý ở Tab 2 lập tức tự động cập nhật mà không cần tải lại trang.
2. **Mở rộng 2 (+0.50đ) — Tích hợp API AI an toàn tuyệt đối:**  
   Hỗ trợ cấu hình API Key tạm thời lưu trong `sessionStorage` qua nút `⚙️ AI Key`. Tự động fallback về bộ giải thuật nội bộ khi không có key, tuyệt đối không lộ API key lên GitHub.
3. **Mở rộng 3 (+0.25đ) — Chế độ Giao diện Tối / Sáng (Dark / Light Mode):**  
   Xây dựng bằng CSS Variables `[data-theme="dark"]`, lưu trạng thái trong `localStorage` và chuyển đổi mượt mà bằng nút `🌙 Tối` trên header toàn bộ trang.
4. **Mở rộng 4 (+0.25đ) — Biểu đồ động, Lọc thời gian & Xuất báo cáo (CSV / JSON / Print):**  
   Hỗ trợ bộ lọc thời gian động (Hôm nay / 7 ngày / Tháng này), nút xuất tệp CSV, JSON và định dạng in ấn sạch sẽ theo chuẩn `@media print`.

---

## 15. Danh mục tài liệu kỹ thuật & Minh chứng kiểm toán
- [docs/project-proposal.md](docs/project-proposal.md) – Đề cương chi tiết và phân tích bài toán thực tế.
- [docs/screen-inventory.md](docs/screen-inventory.md) – Bảng kiểm kê 14 màn hình chuẩn phụ lục B.
- [docs/roles-and-features.md](docs/roles-and-features.md) – Báo cáo phân tích 4 vai trò theo 10 câu hỏi chuẩn.
- [docs/team-assignment.md](docs/team-assignment.md) – Bảng phân công lát cắt dọc và ma trận đóng góp.
- [docs/ai-usage-report.md](docs/ai-usage-report.md) – Báo cáo khai báo sử dụng AI chuẩn phụ lục F.
- [docs/obs-evidence.md](docs/obs-evidence.md) – Danh mục video OBS và biên bản nghiệm thu.
- [design/figma-link.txt](design/figma-link.txt) – Bản thiết kế Wireframe và Mockup UI/UX.
