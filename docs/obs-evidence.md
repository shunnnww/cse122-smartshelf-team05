# SỔ TAY HƯỚNG DẪN QUAY VIDEO OBS & MINH CHỨNG BẢO VỆ
## BÀI TẬP LỚN BTL-10: SMARTSHELF

> **Nguyên tắc chấm thi của Giảng viên:**  
> Mỗi giao diện độc lập trong bảng kiểm kê = 1 video OBS có mặt sinh viên + giọng nói + giải thích mã nguồn + 1 thao tác chỉnh sửa trực tiếp (Live Edit) + commit GitHub tương ứng.  
> Không chấp nhận việc chỉ trình bày sản phẩm hoàn thiện mà không chứng minh được mình là người trực tiếp gõ mã và hiểu mã.

---

## 1. Cấu Hình OBS Chuẩn Bị Cho Từng Video (Thời lượng: 3 – 5 phút/video)
1. **Bố cục khung hình OBS:**
   - Cửa sổ chính: Quay màn hình máy tính (Desktop/Browser/VS Code).
   - Góc dưới bên phải: Khung Webcam hiển thị rõ khuôn mặt sinh viên (bắt buộc).
   - Âm thanh: Microphone thu âm giọng nói rõ ràng, tự tin.
2. **Kịch bản chuẩn 6 bước cho mỗi video:**
   - **Bước 1 (15s):** Chào thầy, giới thiệu họ tên, mã sinh viên, vai trò trong nhóm và tên màn hình đang quay (ví dụ: `SV1-02-shopper-product-search`).
   - **Bước 2 (30s):** Chiếu nhanh bản vẽ thiết kế Figma/Canva của màn hình này, chỉ rõ bố cục header, nội dung và các trạng thái.
   - **Bước 3 (60s):** Mở Visual Studio Code, chỉ rõ tệp HTML, CSS và JS liên quan; giải thích cấu trúc thẻ semantic (`header`, `main`, `table`, `form`) và biến dữ liệu.
   - **Bước 4 (45s):** Mở trình duyệt Web, thao tác chạy thử tính năng chính (tìm kiếm, lọc, bấm nút AI, mở modal, v.v.).
   - **Bước 5 (45s):** **Thao tác chỉnh sửa trực tiếp (Live Edit):** Đổi màu sắc một nút bấm, đổi một dòng thông báo hoặc thêm một trường mới trong code, lưu lại và F5 trình duyệt để thầy thấy thay đổi ngay lập tức.
   - **Bước 6 (30s):** Mở Terminal, gõ lệnh `git status`, `git add .`, `git commit -m "..."` và `git push` lên nhánh `feature/...` trên GitHub. Kết thúc video.

---

## 2. Kịch Bản Chi Tiết & Gợi Ý Thao Tác Chỉnh Sửa Trực Tiếp (Live Edit) Cho Từng Màn Hình

### PHẦN 1: TRẦN TRỌNG HOÀNG ANH (SV1)

#### Video 1: `SV1-01-login.mp4` (Màn hình `pages/login.html`)
- **Nội dung nói:** "Em chào thầy Kiều Tuấn Dũng, em là Trần Trọng Hoàng Anh, nhóm trưởng nhóm 5. Em phụ trách màn hình Đăng nhập phân quyền. Màn hình này cho phép chuyển đổi nhanh 4 vai trò, kiểm tra hợp lệ tài khoản và lưu trạng thái vào LocalStorage."
- **Code mở:** `pages/login.html` (đoạn xử lý `addEventListener('submit')`).
- **Gợi ý Live Edit khi quay OBS:** Đổi tiêu đề nút đăng nhập từ *"Đăng Nhập Vào Hệ Thống"* thành *"Xác Thực & Đăng Nhập Ngay"*, hoặc đổi mã màu nền nút.
- **Commit Git:** `git commit -m "feat: implement responsive login with role quick switcher"`

#### Video 2: `SV1-02-shopper-product-search.mp4` (Màn hình `pages/shopper-product-search.html`)
- **Nội dung nói:** "Màn hình này phục vụ Khách mua sắm tìm kiếm sản phẩm. Dữ liệu được đọc động từ Mock Database, có bộ lọc theo từ khóa, ngành hàng và trạng thái còn hàng trên kệ. Có giỏ hàng lưu bằng LocalStorage."
- **Code mở:** Hàm `renderProducts()` và sự kiện `input` trên ô tìm kiếm.
- **Gợi ý Live Edit:** Thêm một ngành hàng mới trong dropdown `<select id="categoryFilter">` (ví dụ thêm `<option value="Rau Củ">Rau Củ Tươi</option>`).
- **Commit Git:** `git commit -m "feat: add real-time product search and category filters"`

#### Video 3: `SV1-03-shopper-product-location.html` (`SV1-03-shopper-product-location.mp4`)
- **Nội dung nói:** "Đây là màn hình bản đồ trực quan mặt bằng siêu thị. Khi bấm vào Kệ A02, hệ thống hiển thị danh sách hàng hóa tại kệ, số lượng tồn và đoạn chỉ đường từ cửa chính."
- **Code mở:** Hàm `selectShelf(shelfId)` và khối `routeGuideBox`.
- **Gợi ý Live Edit:** Sửa chỉ dẫn đường đi của Zone A (ví dụ thêm chữ *"Lối đi có biển báo màu xanh"*).
- **Commit Git:** `git commit -m "feat: render interactive shelf map with step-by-step navigation"`

#### Video 4: `SV1-04-shopper-product-alternatives.html` (`SV1-04-shopper-product-alternatives.mp4`)
- **Nội dung nói:** "Đây là màn hình tính năng AI-2: Product Alternative AI. Khi sản phẩm như Coca Không Đường hết hàng, AI đối soát sản phẩm cùng loại, cùng giá, còn hàng để đề xuất kèm lý do. Em cũng thiết kế nút mô phỏng khi AI thất bại."
- **Code mở:** Hàm `runProductAlternativeAI()` trong `js/api.js` và hàm `runAiAnalysis()`.
- **Gợi ý Live Edit:** Sửa độ tin cậy mô phỏng từ `94.8%` thành `95.2%` hoặc sửa câu giải trình lý do trong mã.
- **Commit Git:** `git commit -m "feat: implement product alternative ai with explainable recommendations"`

---

### PHẦN 2: NGUYỄN QUANG LONG (SV2)

#### Video 5: `SV2-01-associate-zone-view.mp4` (Màn hình `pages/associate-zone-view.html`)
- **Nội dung nói:** "Em chào thầy, em là Nguyễn Quang Long. Em phụ trách vai trò Nhân viên kệ hàng. Màn hình Zone View cho nhân viên giám sát 14 kệ theo 4 khu vực, có thanh tiến trình % lấp đầy và đếm số kệ rỗng, kệ bất thường."
- **Code mở:** `pages/associate-zone-view.html` và hàm `renderZoneView()`.
- **Gợi ý Live Edit:** Đổi màu thanh tiến trình khi kệ sắp hết từ màu cam sang màu tím, hoặc thêm một thẻ thống kê mới.
- **Commit Git:** `git commit -m "feat: add zone monitoring view with real-time capacity progress"`

#### Video 6: `SV2-02-associate-shelf-check.mp4` (Màn hình `pages/associate-shelf-check.html`)
- **Nội dung nói:** "Màn hình này cho phép nhân viên nhập số lượng thực đếm tại kệ để đối chiếu với tồn hệ thống POS. Nếu phát hiện chênh lệch lớn như Kệ B02 chênh lệch -20 gói mì, hệ thống kích hoạt AI-3 Shelf Anomaly Insight để chẩn đoán nguyên nhân."
- **Code mở:** Hàm `recalcDiscrepancy()` và hàm `triggerAiDiagnosis()`.
- **Gợi ý Live Edit:** Đổi ngưỡng cảnh báo chênh lệch từ `10` sản phẩm thành `8` sản phẩm trong hàm `handleSaveCheck()`.
- **Commit Git:** `git commit -m "feat: implement shelf check form and ai anomaly diagnostic trigger"`

#### Video 7: `SV2-03-associate-restock-task.mp4` (Màn hình `pages/associate-restock-task.html`)
- **Nội dung nói:** "Đây là màn hình tích hợp AI-1: Restock Priority AI. Thuật toán tính điểm ưu tiên dựa trên độ vơi kệ và tốc độ bán để xếp hạng kệ nào cần lấy hàng trước. Khi bấm 'Đã xếp lên kệ', hệ thống tự động tăng lại tồn kho trên database."
- **Code mở:** Hàm `runRestockPriorityAI()` và hàm `advanceTaskStatus()`.
- **Gợi ý Live Edit:** Thay đổi công thức tính điểm bonus khi kệ trống từ `30` lên `35` điểm trong `js/api.js`.
- **Commit Git:** `git commit -m "feat: implement restock priority ai engine with automated inventory replenishment"`

---

### PHẦN 3: NGUYỄN VĂN HÂN (SV3)

#### Video 8: `SV3-01-manager-store-dashboard.mp4` (`pages/manager-store-dashboard.html`)
- **Nội dung nói:** "Em chào thầy, em là Nguyễn Văn Hân. Em phụ trách vai trò Quản lý cửa hàng và Quản trị viên. Màn hình Store Dashboard hiển thị các KPI doanh thu, tỷ lệ sẵn sàng của kệ và danh sách các sự cố khẩn cấp."
- **Code mở:** `pages/manager-store-dashboard.html` và hàm `renderZoneHealth()`.
- **Gợi ý Live Edit:** Sửa chỉ số KPI Doanh thu hôm nay từ `14.850.000đ` thành `15.200.000đ`.
- **Commit Git:** `git commit -m "feat: implement executive manager dashboard with zone health breakdown"`

#### Video 9: `SV3-02-manager-restock-board.mp4` (`pages/manager-restock-board.html`)
- **Nội dung nói:** "Màn hình này là bảng Kanban 4 cột giúp quản lý điều phối nhiệm vụ bổ sung hàng: Chờ phân công, Đang làm, Chờ duyệt, Hoàn tất. Có modal thêm nhiệm vụ mới có kiểm tra hợp lệ dữ liệu."
- **Code mở:** Hàm `renderKanban()` và `handleCreateTask()`.
- **Gợi ý Live Edit:** Đổi màu viền thẻ Kanban mức ưu tiên Cao sang màu cam đậm.
- **Commit Git:** `git commit -m "feat: build interactive 4-column restock kanban board with task modal"`

#### Video 10: `SV3-03-manager-retail-insights.mp4` (`pages/manager-retail-insights.html`)
- **Nội dung nói:** "Màn hình này cung cấp phân tích bán lẻ và AI-3 Deep Shelf Anomaly Matrix. AI phân tích xác suất nguyên nhân sai lệch tại Kệ B02 và đưa ra các nút hành động như khóa tồn kho, rà soát camera hoặc giao lệnh kiểm tra lại."
- **Code mở:** Bảng ma trận chẩn đoán và hàm `renderVelocityTable()`.
- **Gợi ý Live Edit:** Thêm một tiêu chí khuyến nghị cho mặt hàng bán chạy nhất (Top 1) trong bảng Sales Velocity.
- **Commit Git:** `git commit -m "feat: integrate retail sales velocity rankings and deep ai anomaly matrix"`

#### Video 11: `SV3-04-admin-product-management.mp4` (`pages/admin-product-management.html`)
- **Nội dung nói:** "Màn hình quản trị danh mục sản phẩm hỗ trợ đầy đủ CRUD: Thêm mới sản phẩm vào kệ có validation, Sửa thông tin, Xóa/Lưu trữ và tìm kiếm theo SKU."
- **Code mở:** Hàm `handleSaveProduct()` và modal `#productModal`.
- **Gợi ý Live Edit:** Thêm một trường thuộc tính nhãn mác trong form hoặc đổi thông báo xác nhận xóa.
- **Commit Git:** `git commit -m "feat: full crud product master management with modal validation"`

#### Video 12: `SV3-05-admin-zone-management.mp4` (`pages/admin-zone-management.html`)
- **Nội dung nói:** "Màn hình quản lý cấu trúc mặt bằng siêu thị. Quản trị viên có thể xem các Zone, thêm Kệ mới, cấu hình số tầng kệ và đổi trạng thái hoạt động của kệ."
- **Code mở:** Hàm `renderShelves()` và `handleAddShelf()`.
- **Gợi ý Live Edit:** Thêm một kệ mẫu mới (ví dụ Kệ B05) ngay trên giao diện và kiểm tra dữ liệu.
- **Commit Git:** `git commit -m "feat: zone and shelf master crud with structural configuration"`

#### Video 13: `SV3-06-admin-user-management.mp4` (`pages/admin-user-management.html`)
- **Nội dung nói:** "Màn hình quản trị người dùng và phân quyền theo 4 vai trò. Có sẵn tài khoản của 3 thành viên trong nhóm và tài khoản Admin, hỗ trợ cấp tài khoản mới và cấp lại mật khẩu."
- **Code mở:** Hàm `renderUsers()` và `handleAddUser()`.
- **Gợi ý Live Edit:** Đổi nhãn huy hiệu (badge) của tài khoản Admin thành *"Quản trị viên Cấp cao"*.
- **Commit Git:** `git commit -m "feat: user access control and multi-role assignment management"`

---

## 3. Danh Sách Liên Kết Video OBS Minh Chứng

| Tên Video | Sinh viên thực hiện | Màn hình tương ứng | Trạng thái | Liên kết Lưu Trữ Drive / YouTube |
|---|---|---|:---:|---|
| `SV1-00-index.mp4` | Trần Trọng Hoàng Anh | `index.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV1-01-login.mp4` | Trần Trọng Hoàng Anh | `pages/login.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV1-02-shopper-product-search.mp4` | Trần Trọng Hoàng Anh | `pages/shopper-product-search.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV1-03-shopper-product-location.mp4` | Trần Trọng Hoàng Anh | `pages/shopper-product-location.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV1-04-shopper-product-alternatives.mp4` | Trần Trọng Hoàng Anh | `pages/shopper-product-alternatives.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV2-01-associate-zone-view.mp4` | Nguyễn Quang Long | `pages/associate-zone-view.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV2-02-associate-shelf-check.mp4` | Nguyễn Quang Long | `pages/associate-shelf-check.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV2-03-associate-restock-task.mp4` | Nguyễn Quang Long | `pages/associate-restock-task.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV3-01-manager-store-dashboard.mp4` | Nguyễn Văn Hân | `pages/manager-store-dashboard.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV3-02-manager-restock-board.mp4` | Nguyễn Văn Hân | `pages/manager-restock-board.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV3-03-manager-retail-insights.mp4` | Nguyễn Văn Hân | `pages/manager-retail-insights.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV3-04-admin-product-management.mp4` | Nguyễn Văn Hân | `pages/admin-product-management.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV3-05-admin-zone-management.mp4` | Nguyễn Văn Hân | `pages/admin-zone-management.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
| `SV3-06-admin-user-management.mp4` | Nguyễn Văn Hân | `pages/admin-user-management.html` | Đã chuẩn bị | `https://drive.google.com/drive/folders/smartshelf-obs` |
