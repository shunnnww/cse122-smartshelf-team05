# KỊCH BẢN NÓI CHI TIẾT TỪNG VIDEO QUAY OBS MINH CHỨNG (WORD-FOR-WORD)
## BÀI TẬP LỚN: SMARTSHELF – ĐIỀU HÀNH KỆ HÀNG & HỖ TRỢ MUA SẮM (BTL-10)
> **Môn học:** Nền tảng phát triển web cơ bản – CSE122  
> **Giảng viên hướng dẫn:** ThS. Kiều Tuấn Dũng  
> **Nhóm thực hiện:** Nhóm 5 – Lớp 67KTPM1, Trường Đại học Thủy Lợi  

---

## QUY TẮC CHUNG KHI QUAY OBS:
1. **Thời lượng lý tưởng:** Mỗi video kéo dài **2 phút 30 giây đến 4 phút**.
2. **Khung hình OBS:** Bật webcam góc dưới bên phải quay rõ mặt sinh viên + cửa sổ chính quay màn hình (Desktop/Trình duyệt/VS Code).
3. **Trình tự chuẩn của mọi video:**
   - **Phần 1 (20 giây):** Chào thầy, giới thiệu bản thân, mã sinh viên và vai trò.
   - **Phần 2 (40 giây):** Mở trình duyệt Web, giải thích mục đích và demo chức năng của màn hình.
   - **Phần 3 (60 giây):** Mở Visual Studio Code, chỉ rõ mã nguồn (cấu trúc HTML, CSS, hàm JavaScript xử lý).
   - **Phần 4 (45 giây):** Thao tác sửa code trực tiếp (**Live Edit**), bấm Lưu và F5 trên trình duyệt để thấy giao diện đổi ngay trước mắt thầy.
   - **Phần 5 (20 giây):** Mở Terminal gõ commit Git minh chứng. Cảm ơn thầy và kết thúc video.

---

# PHẦN 1: SINH VIÊN 1 – TRẦN TRỌNG HOÀNG ANH (NHÓM TRƯỞNG - MSV: 2551170859)
> Phụ trách: Cổng điều hướng, Đăng nhập, và Phân hệ Khách mua sắm (Shopper) + Tính năng AI 2.

---

### VIDEO 1: `SV1-00-index.mp4` – Cổng thông tin & Điều hướng hệ thống (`index.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Kính chào thầy Kiều Tuấn Dũng và các bạn. Em tên là **Trần Trọng Hoàng Anh**, mã số sinh viên **2551170859**, là nhóm trưởng nhóm 5. Hôm nay em xin quay video minh chứng cho màn hình đầu tiên của dự án SmartShelf: **Cổng thông tin và điều hướng hệ thống - `index.html`**."

**[Chuyển màn hình sang Trình duyệt Web - Trang `index.html`]:**
> "Màn hình `index.html` đóng vai trò là trang chủ trung tâm (Portal). Ở đây, người dùng có thể nắm bắt bức tranh toàn cảnh của hệ thống SmartShelf gồm 4 vai trò chính: Khách hàng mua sắm, Nhân viên kệ hàng, Quản lý cửa hàng và Quản trị viên. 
> Em đã thiết kế các thẻ phân vai trực quan với màu sắc nhận diện riêng, hiển thị số lượng màn hình phụ trách của từng thành viên trong nhóm, đồng thời tóm tắt 3 tính năng Trí tuệ nhân tạo nổi bật của dự án. Người dùng có thể bấm vào từng nút để truy cập ngay vào phân hệ tương ứng."

**[Chuyển màn hình sang Visual Studio Code - Mở tệp `index.html`]:**
> "Về mặt mã nguồn, trang được xây dựng hoàn toàn bằng HTML5 Semantic: có thẻ `<header>`, `<main>`, và các `<section>` phân chia rõ ràng. 
> Bố cục 4 thẻ vai trò được em dựng bằng **CSS Grid (`grid-4`)** trong tệp `css/style.css`, có hiệu ứng hover nổi khối 3D nhẹ nhàng và tự động co giãn 1 cột trên điện thoại di động nhờ `css/responsive.css`. Em cũng tích hợp thanh chuyển vai trò nhanh toàn cục `<select id='globalRoleSwitcher'>` liên kết với tệp `js/main.js`."

**[Thao tác Live Edit trên VS Code]:**
> "Bây giờ em xin thực hiện thao tác chỉnh sửa trực tiếp (Live Edit) để chứng minh em là người trực tiếp xây dựng mã nguồn này:
> Tại dòng 50, em sẽ sửa câu giới thiệu từ:
> *'Nền tảng RetailTech thông minh tối ưu hóa vận hành kệ hàng'*  
> thành:  
> *'Nền tảng RetailTech thông minh tối ưu hóa 14 kệ hàng siêu thị Thủy Lợi'*.  
> Em bấm `Ctrl + S` để lưu, sau đó quay lại trình duyệt và bấm F5... Thầy có thể thấy dòng chữ đã cập nhật ngay lập tức!"

**[Mở Terminal trong VS Code và gõ:]**
```bash
git status
git add index.html
git commit -m "docs: update portal heading for Thuy Loi supermarket demo"
```
> "Em đã commit thay đổi lên Git. Em xin kết thúc video minh chứng màn hình `index.html` tại đây. Em cảm ơn thầy!"

---

### VIDEO 2: `SV1-01-login.mp4` – Trang đăng nhập phân quyền (`pages/login.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy Dũng. Em là Trần Trọng Hoàng Anh, MSV 2551170859. Em xin trình bày video minh chứng cho màn hình thứ hai: **Đăng nhập phân quyền hệ thống - `pages/login.html`**."

**[Chuyển sang Trình duyệt Web - Trang `login.html`]:**
> "Trang đăng nhập này được thiết kế để phục vụ việc bảo vệ và kiểm thử nhanh. Thay vì phải gõ tay mật khẩu phức tạp, em đã thiết kế **4 nút đăng nhập nhanh (Quick Login)** tương ứng với 3 thành viên trong nhóm và tài khoản Quản trị:
> - Nút 1: Hoàng Anh (Khách mua sắm)
> - Nút 2: Quang Long (Nhân viên)
> - Nút 3: Văn Hân (Quản lý)
> - Nút 4: Quản trị viên
> Khi em bấm vào nút 'Khách mua sắm', form tự động điền tài khoản `hoanganh` và chuyển ngay sang màn hình tìm kiếm sản phẩm. Hệ thống có kiểm tra hợp lệ: nếu để trống trường tên đăng nhập hoặc mật khẩu, thông báo lỗi đỏ sẽ hiện lên ngay dưới ô nhập."

**[Chuyển sang VS Code - Mở tệp `pages/login.html`]:**
> "Trong mã nguồn, form được bao bọc trong thẻ `<form id='loginForm' novalidate>`. Khi người dùng submit, sự kiện `addEventListener('submit')` ở dòng 120 sẽ kiểm tra tính hợp lệ dữ liệu. Nếu thành công, hàm `setCurrentUser()` trong `js/api.js` sẽ lưu phiên đăng nhập vào `localStorage` với khóa `smartshelf_user_v2` để các trang sau nhận diện đúng quyền người dùng."

**[Thao tác Live Edit trên VS Code]:**
> "Em xin thực hiện Live Edit: Em sẽ đổi màu nền của nút bấm Đăng nhập từ màu xanh lục sang màu xanh dương đậm tại tệp `css/style.css` hoặc đổi chữ nút từ *'Đăng nhập vào hệ thống'* thành *'Xác thực và đăng nhập ngay'*.  
> Em lưu lại và F5 trình duyệt... Nút bấm đã đổi chữ và màu sắc ngay tức thì."

**[Mở Terminal và gõ commit:]**
```bash
git add pages/login.html
git commit -m "feat: polish login button label and validation state"
```
> "Em đã hoàn thành minh chứng cho màn hình đăng nhập. Em cảm ơn thầy!"

---

### VIDEO 3: `SV1-02-shopper-product-search.mp4` – Tìm kiếm & Lọc sản phẩm (`pages/shopper-product-search.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy. Em là Trần Trọng Hoàng Anh. Em xin quay video minh chứng cho màn hình cốt lõi của Khách mua sắm: **Tìm kiếm sản phẩm và tra cứu tình trạng kệ - `pages/shopper-product-search.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Màn hình này giải quyết vấn đề số 1 trong đề bài: Khách hàng thường mất thời gian đi tìm hàng hóa trong siêu thị. 
> Tại đây, khách có thể gõ từ khóa tìm kiếm trực tiếp, ví dụ gõ chữ 'Coca', danh sách sản phẩm lọc ngay lập tức theo thời gian thực (Live Search). 
> Khách cũng có thể lọc theo từng ngành hàng: Đồ uống, Thực phẩm, Snack, Gia vị hoặc lọc theo trạng thái: Còn hàng, Sắp hết, Hết hàng. 
> Đặc biệt, mỗi sản phẩm đều hiển thị rõ: Nằm ở Kệ nào (ví dụ Kệ A02), Tầng mấy, và nút bấm 'Xem vị trí trên bản đồ'."

**[Chuyển sang VS Code - Mở `pages/shopper-product-search.html`]:**
> "Về mặt lập trình, dữ liệu được hàm `getProducts()` lấy từ Mock Database lưu trong `localStorage`. Sự kiện `input` trên ô tìm kiếm và `change` trên dropdown gọi đến hàm `filterProducts()`. Danh sách thẻ sản phẩm được render động thông qua hàm `renderProducts()` sử dụng template string. Em cũng xử lý trạng thái Empty State: nếu tìm một từ khóa không có thật như 'xyz', hệ thống hiển thị biểu tượng giỏ hàng rỗng và thông báo rất thân thiện."

**[Thao tác Live Edit]:**
> "Em thực hiện Live Edit: Tại dòng lọc ngành hàng, em thêm một tùy chọn mới là `<option value='Trái Cây'>Trái cây tươi</option>`. Em bấm Lưu và F5 trên trình duyệt... Mục 'Trái cây tươi' đã xuất hiện ngay trên bộ lọc ngành hàng."

**[Commit Git]:**
```bash
git add pages/shopper-product-search.html
git commit -m "feat: add real-time product search with category filters and empty states"
```
> "Em xin kết thúc video minh chứng tìm kiếm sản phẩm tại đây."

---

### VIDEO 4: `SV1-03-shopper-product-location.mp4` – Sơ đồ vị trí mặt bằng siêu thị (`pages/shopper-product-location.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy. Em là Trần Trọng Hoàng Anh, MSV 2551170859. Em xin trình bày màn hình: **Sơ đồ vị trí kệ hàng và chỉ dẫn lộ trình mua sắm - `pages/shopper-product-location.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Đây là tính năng độc đáo giúp khách hàng không bị lạc trong siêu thị. Em đã dựng sơ đồ mặt bằng siêu thị phân thành 4 khu vực: Khu vực A (Đồ uống), Khu vực B (Thực phẩm khô), Khu vực C (Snack & Bánh kẹo) và Khu vực D (Gia vị & Hàng hộp).
> Khi khách hàng bấm vào một kệ bất kỳ trên bản đồ, ví dụ Kệ A01, hệ thống sẽ:
> 1. Đổi màu viền kệ để làm nổi bật vị trí.
> 2. Bảng bên phải lập tức hiển thị thông tin chi tiết: Sức chứa, tỷ lệ đầy hàng, và danh sách các sản phẩm đang đặt tại kệ đó kèm vị trí tầng cụ thể.
> 3. Hộp chỉ dẫn đường đi phía dưới tự động hiển thị lộ trình từng bước: Từ Cổng vào &rarr; Rẽ vào Lối đi nào &rarr; Kệ nằm ở bên tay trái hay tay phải."

**[Chuyển sang VS Code - Mở `pages/shopper-product-location.html`]:**
> "Bản đồ siêu thị được em bố trí bằng **CSS Grid** mô phỏng sơ đồ thực tế. Mỗi ô kệ là một thẻ có `data-shelf-id`. Sự kiện click gọi hàm `selectShelf(shelfId)`. Hàm này sẽ tra cứu thông tin kệ qua hàm `getShelfById()` và tìm các sản phẩm tương ứng, sau đó cập nhật DOM mà không cần tải lại trang."

**[Thao tác Live Edit]:**
> "Em xin Live Edit: Tại phần chỉ dẫn đường đi của Khu vực A, em sửa câu hướng dẫn: thêm câu *'Lối đi có vạch kẻ hướng dẫn màu xanh'* vào hàm cập nhật chỉ dẫn. Lưu file, F5 trình duyệt, bấm vào Kệ A01... Câu chỉ dẫn mới đã hiển thị ngay."

**[Commit Git]:**
```bash
git add pages/shopper-product-location.html
git commit -m "feat: render interactive supermarket floor layout with shelf details"
```
> "Em cảm ơn thầy đã theo dõi video này!"

---

### VIDEO 5: `SV1-04-shopper-product-alternatives.mp4` – Tính năng AI 2: Gợi ý sản phẩm thay thế (`pages/shopper-product-alternatives.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy Kiều Tuấn Dũng. Em là Trần Trọng Hoàng Anh. Em xin trình bày tính năng AI quan trọng do em phụ trách: **Tính năng AI 2 - Product Alternative AI (Gợi ý mặt hàng thay thế khi kệ hết hàng) tại trang `pages/shopper-product-alternatives.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Khi khách hàng đến kệ tìm mua một sản phẩm đã cạn kiệt, ví dụ như *Coca-Cola Không Đường*, họ thường thất vọng ra về. Tính năng AI 2 giải quyết triệt để vấn đề này theo đúng chu trình chuẩn:
> - **Bước 1:** Khách chọn sản phẩm đang hết hàng.
> - **Bước 2:** Bấm nút 'Chạy AI phân tích sản phẩm thay thế'. Hệ thống sẽ hiện Skeleton Loading mô phỏng AI đang đối soát dữ liệu.
> - **Bước 3:** AI trả về kết quả gợi ý là *Pepsi Không Calo*, kèm theo **giải trình AI (Explainable AI)**: Vì sao chọn sản phẩm này? (Cùng hương vị cola không đường, cùng dung tích 330ml, giá bằng 10.000đ và đang còn 45 lon tại Kệ A01 tầng 2).
> - **Bước 4:** Khách có thể bấm nút 'Thêm sản phẩm thay thế vào giỏ hàng' ngay lập tức.
> Đặc biệt, em có thiết kế thêm nút **'Thử nghiệm trạng thái lỗi AI'** để chứng minh ứng dụng có cơ chế xử lý khi AI mất mạng hoặc thiếu dữ liệu."

**[Chuyển sang VS Code - Mở `pages/shopper-product-alternatives.html` và `js/api.js`]:**
> "Thuật toán AI nằm tại hàm `runProductAlternativeAI()` trong tệp `js/api.js`. Thuật toán sẽ tính điểm tương đồng `matchScore` dựa trên các trọng số: cùng danh mục (+40 điểm), chênh lệch giá nhỏ (+30 điểm) và số lượng tồn kho khả dụng (+30 điểm). Toàn bộ được viết bất đồng bộ bằng `async/await` với độ trễ mô phỏng 800 mili-giây."

**[Thao tác Live Edit]:**
> "Em xin Live Edit: Trong tệp `js/api.js`, tại hàm `runProductAlternativeAI`, em sửa độ tin cậy hiển thị từ `94.8%` thành `96.5%`. Lưu lại, quay lại trang web bấm chạy AI... Độ tin cậy trên huy hiệu đã đổi thành 96.5%!"

**[Commit Git]:**
```bash
git add pages/shopper-product-alternatives.html js/api.js
git commit -m "feat: implement product alternative ai engine with explainable insights"
```
> "Em đã hoàn thành phần trình bày 5 video của SV1. Em xin cảm ơn thầy!"

---

# PHẦN 2: SINH VIÊN 2 – NGUYỄN QUANG LONG (MSV: 2551170915)
> Phụ trách: Phân hệ Nhân viên kệ hàng (Associate) + Tính năng AI 1 & AI 3 (Kiểm kê).

---

### VIDEO 6: `SV2-01-associate-zone-view.mp4` – Điều hành 14 kệ hàng theo 4 khu vực (`pages/associate-zone-view.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Kính chào thầy Kiều Tuấn Dũng. Em tên là **Nguyễn Quang Long**, mã sinh viên **2551170915**. Trong bài tập lớn SmartShelf nhóm 5, em đảm nhiệm vai trò Sinh viên 2, phụ trách phân hệ dành cho **Nhân viên kệ hàng (Store Associate)**. Hôm nay em xin quay video minh chứng cho màn hình: **Điều hành khu vực và giám sát 14 kệ hàng - `pages/associate-zone-view.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Màn hình này là công cụ làm việc đầu ca của nhân viên. Nhân viên có thể quan sát nhanh 4 khu vực: Khu vực A, B, C, D với tổng số 14 kệ hàng của siêu thị.
> Mỗi khu vực hiển thị các thẻ thống kê tổng quan: Tổng số kệ, số kệ đang đầy đủ, số kệ sắp hết hàng và số kệ rỗng.
> Bên dưới là từng kệ hàng với thanh đo tỷ lệ phần trăm lấp đầy. Kệ nào dưới 20% thanh tiến trình sẽ chuyển màu đỏ cảnh báo cạn hàng, kèm theo nút bấm nhanh 'Kiểm kê kệ' hoặc 'Bổ sung ngay'."

**[Chuyển sang VS Code - Mở `pages/associate-zone-view.html`]:**
> "Trong mã nguồn, hàm `renderZoneView()` lấy danh sách khu vực bằng `getZones()` và danh sách kệ bằng `getShelves()`. Với mỗi khu vực, code sẽ tính tổng sức chứa `maxCapacity` và số lượng tồn hiện tại `currentCount` để tính tỷ lệ lấp đầy %. Dữ liệu này được kết nối trực tiếp với Mock Database trong `localStorage`, do đó bất cứ khi nào có thay đổi ở kho hay quầy thu ngân, giao diện này đều phản ánh tức thì."

**[Thao tác Live Edit]:**
> "Em xin thực hiện Live Edit: Tại tệp `pages/associate-zone-view.html`, em thêm vào phần tiêu đề phụ một thẻ thông báo: `<span class='badge badge-normal'>Ca trực: Buổi sáng</span>`. Bấm `Ctrl + S`, quay lại trình duyệt và F5... Thẻ huy hiệu 'Ca trực: Buổi sáng' đã xuất hiện ngay ngắn bên cạnh tiêu đề."

**[Commit Git]:**
```bash
git add pages/associate-zone-view.html
git commit -m "feat: add zone overview dashboard with visual shelf capacity gauges"
```
> "Em xin kết thúc video minh chứng màn hình điều hành khu vực tại đây."

---

### VIDEO 7: `SV2-02-associate-shelf-check.mp4` – Phiếu kiểm kê & AI phát hiện bất thường (`pages/associate-shelf-check.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy Dũng. Em là Nguyễn Quang Long, MSV 2551170915. Em xin quay video minh chứng cho màn hình nghiệp vụ: **Phiếu kiểm tra kệ hàng và tích hợp Tính năng AI 3: Shelf Anomaly Insight - `pages/associate-shelf-check.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Màn hình này phục vụ quy trình nhân viên đi đếm hàng thực tế trên kệ để đối chiếu với phần mềm POS:
> 1. Nhân viên chọn kệ cần kiểm tra từ danh sách, ví dụ chọn **Kệ B02**.
> 2. Hệ thống tải ra các mặt hàng đang bày trên kệ cùng số lượng tồn trên máy tính.
> 3. Nhân viên nhập số lượng đếm thực tế vào cột 'Đếm thực tế'. Hệ thống tự tính toán chênh lệch ngay lập tức.
> 4. Nếu phát hiện chênh lệch nghiêm trọng (như Kệ B02 bị thiếu hụt 20 gói mì Omachi), nhân viên bấm nút **'Chẩn đoán sai lệch với AI'**.
> 5. Hộp thoại **AI Anomaly Insight** sẽ bung ra, chẩn đoán xác suất nguyên nhân: Xếp nhầm sang Kệ B01 kế bên (65%), Khách bỏ quên tại giỏ (25%), và đề xuất hướng xử lý.
> 6. Khi bấm 'Lưu biên bản kiểm kê', số liệu được lưu vĩnh viễn vào lịch sử kiểm kê bên dưới."

**[Chuyển sang VS Code - Mở `pages/associate-shelf-check.html`]:**
> "Ở file mã nguồn, hàm `loadShelfProducts()` đổ dữ liệu sản phẩm của kệ vào bảng. Hàm `recalcDiscrepancy()` lắng nghe sự kiện `oninput` trên ô đếm thực tế để tính toán chênh lệch và đổi màu huy hiệu theo ngưỡng. Nút bấm AI gọi đến hàm `runShelfAnomalyInsight(shelfId)` trong `js/api.js`. Hàm `handleSaveCheck()` sẽ ghi biên bản mới qua `addShelfCheck()` và đồng bộ lại sức chứa của kệ."

**[Thao tác Live Edit]:**
> "Em xin thực hiện Live Edit: Tại hàm `handleSaveCheck()`, em sửa điều kiện phát hiện sai lệch nghiêm trọng: giảm ngưỡng từ `10` sản phẩm xuống `8` sản phẩm. Em lưu lại, F5 và thử nhập sai lệch -9 sản phẩm... Hệ thống lập tức nhận diện trạng thái 'Bất thường' chuẩn xác."

**[Commit Git]:**
```bash
git add pages/associate-shelf-check.html
git commit -m "feat: integrate shelf audit form with ai anomaly insight diagnosis"
```
> "Em cảm ơn thầy đã theo dõi video này!"

---

### VIDEO 8: `SV2-03-associate-restock-task.mp4` – Tính năng AI 1: Bổ sung kệ cấp bách (`pages/associate-restock-task.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy. Em là Nguyễn Quang Long. Em xin trình bày video cho tính năng AI trọng tâm của phân hệ nhân viên: **Tính năng AI 1 - Restock Priority AI (Điều phối bổ sung kệ cấp bách) tại trang `pages/associate-restock-task.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Trong siêu thị giờ cao điểm, nhân viên không biết nên lấy hàng nào từ kho ra kệ trước. Tính năng AI 1 giải quyết bài toán này:
> - Khi nhân viên mở trang, mô hình AI tự động quét toàn bộ 14 kệ, phân tích tốc độ bán (velocity) và tỷ lệ vơi kệ để chấm điểm độ khẩn cấp từ 0 đến 100 điểm.
> - Kệ A03 (Coca Zero) và Kệ C03 (Snack Lay's) bị hết hàng 100% được AI chấm điểm 95 điểm, xếp mức độ 'Cực kỳ khẩn cấp'.
> - Mỗi dòng đều có mục **Lý do đề xuất (Explainable AI)** giải thích cặn kẽ thuật toán.
> - Nhân viên bấm **'Duyệt và tạo việc'**, nhiệm vụ lập tức được chuyển xuống bảng hàng đợi phía dưới.
> - Nhân viên bấm 'Bắt đầu' &rarr; 'Đã xếp lên kệ', hệ thống sẽ **tự động cộng thêm số lượng tồn kho** của sản phẩm và cập nhật trạng thái kệ từ 'Hết hàng' sang 'Đầy đủ' trên toàn hệ thống."

**[Chuyển sang VS Code - Mở `pages/associate-restock-task.html` và `js/api.js`]:**
> "Thuật toán AI nằm tại hàm `runRestockPriorityAI()` trong `js/api.js`. Công thức tính điểm kết hợp: Tỷ lệ cạn hàng (trọng số 50%), Tốc độ tiêu thụ (trọng số 30%) và điểm cộng ưu tiên nếu kệ trống hoàn toàn (20%). Khi nhân viên hoàn thành việc, hàm `advanceTaskStatus()` tự động gọi `updateProduct()` và `updateShelf()` để đóng vòng đời dữ liệu."

**[Thao tác Live Edit]:**
> "Em xin Live Edit: Em bấm thử nút 'Thử nghiệm trạng thái lỗi AI' trên giao diện để thầy thấy khung thông báo lỗi màu đỏ kèm nút 'Tạo nhiệm vụ thủ công' hiện ra. Sau đó trong code, em sửa thông báo lỗi thành: *'Máy chủ AI đang bảo trì kết nối thời gian thực'*. Lưu và bấm lại... Dòng thông báo lỗi mới đã cập nhật tức thì."

**[Commit Git]:**
```bash
git add pages/associate-restock-task.html js/api.js
git commit -m "feat: complete restock priority ai engine with automated inventory updates"
```
> "Em đã hoàn thành phần minh chứng của Sinh viên 2. Em xin cảm ơn thầy!"

---

# PHẦN 3: SINH VIÊN 3 – NGUYỄN VĂN HÂN (MSV: 2551170885)
> Phụ trách: Phân hệ Quản lý cửa hàng (Manager) & Quản trị hệ thống (Admin).

---

### VIDEO 9: `SV3-01-manager-store-dashboard.mp4` – Bảng điều khiển quản lý cửa hàng (`pages/manager-store-dashboard.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Kính chào thầy Kiều Tuấn Dũng. Em tên là **Nguyễn Văn Hân**, mã số sinh viên **2551170885**. Trong nhóm 5, em đảm nhận vai trò Sinh viên 3, phụ trách hai phân hệ lớn là **Quản lý cửa hàng (Store Manager)** và **Quản trị hệ thống (System Admin)**. Hôm nay em xin quay video minh chứng cho màn hình: **Bảng điều khiển quản lý vận hành kệ hàng - `pages/manager-store-dashboard.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Màn hình Dashboard này cung cấp cho Quản lý góc nhìn tổng quan thời gian thực về tình hình kinh doanh và sức khỏe kệ hàng:
> - **4 thẻ KPI đầu trang:** Doanh thu ước tính hôm nay (14.850.000đ), Tỷ lệ sẵn sàng của kệ (82.4%), Số kệ cần xếp hàng gấp (2 kệ rỗng) và Cảnh báo lệch kho (1 điểm nóng tại Kệ B02).
> - **Cột bên trái:** Biểu đồ thanh ngang theo dõi tỷ lệ đầy hàng của 4 khu vực và bảng các sự cố ưu tiên khẩn cấp có nút điều hướng xử lý nhanh.
> - **Cột bên phải:** Danh sách nhân sự đang trong ca trực cùng hộp tóm tắt khuyến nghị vận hành tự động từ AI."

**[Chuyển sang VS Code - Mở `pages/manager-store-dashboard.html`]:**
> "Trang web được tổ chức theo bố cục CSS Grid `grid-3`. Hàm `renderZoneHealth()` tính toán động tỷ lệ phần trăm lấp đầy của từng khu vực dựa trên sức chứa của các kệ thuộc khu vực đó. Nếu tỷ lệ dưới 50%, thanh màu sẽ tự động chuyển sang màu đỏ nguy hiểm; từ 50-75% là màu vàng cảnh báo, và trên 75% là màu xanh an toàn."

**[Thao tác Live Edit]:**
> "Em xin thực hiện Live Edit: Tại tệp `pages/manager-store-dashboard.html`, em cập nhật chỉ số KPI Doanh thu ước tính từ `14.850.000đ` thành `15.500.000đ`. Em bấm lưu, quay lại trình duyệt bấm F5... Thẻ KPI Doanh thu đã cập nhật con số mới ngay lập tức."

**[Commit Git]:**
```bash
git add pages/manager-store-dashboard.html
git commit -m "feat: render store executive dashboard with live kpi metrics and zone health"
```
> "Em xin kết thúc video minh chứng màn hình Dashboard tại đây."

---

### VIDEO 10: `SV3-02-manager-restock-board.mp4` – Bảng Kanban điều phối nhiệm vụ (`pages/manager-restock-board.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy Dũng. Em là Nguyễn Văn Hân, MSV 2551170885. Em xin quay video minh chứng cho màn hình: **Bảng điều phối Kanban bổ sung hàng lên kệ - `pages/manager-restock-board.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Đây là công cụ giúp quản lý giám sát quy trình luân chuyển hàng từ kho lên kệ một cách trực quan qua 4 cột chuẩn Kanban:
> 1. **Chờ phân công** &rarr; 2. **Đang thực hiện** &rarr; 3. **Chờ quản lý duyệt** &rarr; 4. **Đã hoàn tất**.
> Trên mỗi thẻ công việc đều hiển thị rõ: Mặt hàng, vị trí kệ, số lượng cần lấy, mức ưu tiên có mã màu và nhân viên phụ trách.
> Quản lý có thể bấm nút mũi tên để chuyển trạng thái công việc sang cột tiếp theo, hoặc bấm nút **'+ Thêm nhiệm vụ mới'** để mở hộp thoại tạo việc thủ công có kiểm tra hợp lệ."

**[Chuyển sang VS Code - Mở `pages/manager-restock-board.html`]:**
> "Về kỹ thuật, bảng Kanban được dựng bằng CSS Grid 4 cột (`kanban-board`). Hàm `renderKanban()` duyệt qua mảng công việc từ `getRestockTasks()` và phân loại thẻ HTML tương ứng vào 4 container: `colPending`, `colInProgress`, `colReview`, `colCompleted`, đồng thời cập nhật số đếm trên đầu mỗi cột. Hàm `moveTask(taskId, nextStatus)` sẽ cập nhật dữ liệu và hiển thị thông báo Toast đẹp mắt."

**[Thao tác Live Edit]:**
> "Em xin thực hiện Live Edit: Em mở form tạo nhiệm vụ mới trên web, chọn sản phẩm 'Sữa chua Vinamilk', nhập số lượng 40 và bấm 'Xác nhận tạo việc'. Thẻ việc mới lập tức xuất hiện ở cột Chờ phân công. Sau đó trong code, em sửa màu viền thẻ ưu tiên 'Cao' từ màu đỏ sang màu cam đỏ đậm. Lưu code và F5... Màu viền thẻ đã đổi mượt mà."

**[Commit Git]:**
```bash
git add pages/manager-restock-board.html
git commit -m "feat: implement interactive 4-column kanban board with task modal"
```
> "Em cảm ơn thầy đã theo dõi video này!"

---

### VIDEO 11: `SV3-03-manager-retail-insights.mp4` – AI 3: Phân tích bán lẻ & Thất thoát kệ (`pages/manager-retail-insights.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy. Em là Nguyễn Văn Hân. Em xin trình bày video cho màn hình: **Phân tích bán lẻ và Chẩn đoán chuyên sâu AI 3: Shelf Anomaly Insight tại `pages/manager-retail-insights.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Màn hình này phục vụ ban quản lý phát hiện các điểm rò rỉ doanh thu trong siêu thị:
> - **Khối trên:** Hộp chẩn đoán trọng điểm từ AI về sự cố lệch -20 gói mì tại Kệ B02. AI giải trình thuật toán rất chi tiết: Không có giao dịch bán vào sáng sớm nhưng kệ bên cạnh lại dư 15 gói, kết luận 65% là do xếp nhầm vị trí. Quản lý có 3 nút hành động nhanh: *Trích xuất camera Khu vực B*, *Khóa tạm tồn kho trực tuyến*, và *Giao lệnh tái kiểm tra kệ*.
> - **Khối dưới:** Bảng xếp hạng tốc độ bán của hàng hóa (Sales Velocity). Sản phẩm bán chạy nhất được gắn huy hiệu Vàng Top 1, kèm theo **khuyến nghị bố trí kệ**: Hàng bán chạy nên bày ở Tầng 2-3 ngang tầm mắt khách mua, còn hàng bán chậm nên chuyển xuống Tầng đáy."

**[Chuyển sang VS Code - Mở `pages/manager-retail-insights.html`]:**
> "Trong mã nguồn, hàm `renderVelocityTable()` lấy danh sách sản phẩm và thực hiện sắp xếp giảm dần theo thuộc tính `salesVelocity`. Thuật toán tự động sinh ra các nhãn khuyến nghị vị trí tầng dựa trên ngưỡng tốc độ bán: trên 50 sản phẩm/ngày thì ưu tiên tầng tầm mắt, dưới 15 sản phẩm thì hạ tầng đáy để tối ưu diện tích trưng bày."

**[Thao tác Live Edit]:**
> "Em xin Live Edit: Trong hàm `renderVelocityTable`, em sửa ngưỡng khuyến nghị tầng từ `50` sản phẩm xuống `45` sản phẩm. Lưu file và F5 trình duyệt... Bảng đã tự động tính toán lại các dòng khuyến nghị tương ứng."

**[Commit Git]:**
```bash
git add pages/manager-retail-insights.html
git commit -m "feat: integrate sales velocity ranking and deep ai shelf anomaly insights"
```
> "Em xin kết thúc video phân tích bán lẻ tại đây."

---

### VIDEO 12: `SV3-04-admin-product-management.mp4` – Quản lý danh mục sản phẩm CRUD (`pages/admin-product-management.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy Dũng. Em là Nguyễn Văn Hân, MSV 2551170885. Em xin quay video minh chứng cho màn hình: **Quản trị danh mục sản phẩm (Full CRUD) - `pages/admin-product-management.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Màn hình này phục vụ quản trị viên quản lý danh mục toàn bộ hàng hóa trong siêu thị với đầy đủ 4 thao tác CRUD thực chất:
> - **Create (Thêm mới):** Bấm nút '+ Thêm sản phẩm mới' mở hộp thoại modal có kiểm tra hợp lệ, chọn Kệ và Tầng bố trí.
> - **Read (Đọc & Tìm kiếm):** Bảng hiển thị đầy đủ Mã SKU, Tên, Giá bán, Tồn kho và Vị trí kệ, có ô tìm kiếm theo tên hoặc SKU.
> - **Update (Sửa):** Bấm biểu tượng cây bút để sửa giá bán hoặc vị trí kệ.
> - **Delete (Xóa):** Bấm biểu tượng thùng rác để xóa sản phẩm khỏi hệ thống có xác nhận an toàn."

**[Chuyển sang VS Code - Mở `pages/admin-product-management.html`]:**
> "Dữ liệu được quản lý đồng bộ với `js/api.js`. Hàm `handleSaveProduct()` xử lý cả hai trường hợp: nếu có `editingProductId` thì gọi `updateProduct()`, nếu không thì gọi `addProduct()`. Sau khi lưu, bảng được tự động vẽ lại qua `renderProductsTable()` và đồng bộ ngay vào `localStorage`."

**[Thao tác Live Edit]:**
> "Em xin thực hiện Live Edit: Em bấm nút thêm sản phẩm trực tiếp trên web: Nhập tên 'Trà Xanh Oolong', SKU 'TEA-01', giá '12000', chọn Kệ A02 tầng 1 và bấm 'Lưu thông tin sản phẩm'. Sản phẩm mới xuất hiện ngay trên dòng đầu của bảng. Sau đó trong code, em sửa tiêu đề modal từ *'Thêm sản phẩm mới'* thành *'Thêm sản phẩm vào kệ siêu thị'*. Lưu và F5... Tiêu đề modal đã đổi chính xác."

**[Commit Git]:**
```bash
git add pages/admin-product-management.html
git commit -m "feat: full crud product master management with modal validation"
```
> "Em xin kết thúc video quản lý sản phẩm."

---

### VIDEO 13: `SV3-05-admin-zone-management.mp4` – Quản lý cấu hình khu vực & kệ hàng (`pages/admin-zone-management.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy. Em là Nguyễn Văn Hân. Em xin trình bày video minh chứng cho màn hình: **Quản trị cấu hình mặt bằng 4 khu vực và 14 kệ hàng - `pages/admin-zone-management.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Màn hình này cho phép quản trị viên cấu hình cấu trúc vật lý của siêu thị:
> - Quản lý 4 khu vực: Khu vực A (Đồ uống), B (Thực phẩm), C (Snack), D (Gia vị).
> - Quản lý chi tiết từng kệ hàng: Mã kệ (như Kệ A01), Sức chứa tối đa (ví dụ 100 sản phẩm), Số tầng kệ (3 tầng), Trạng thái hoạt động (Đang hoạt động hoặc Bảo trì).
> - Hỗ trợ thêm kệ mới vào khu vực, chỉnh sửa sức chứa và chuyển trạng thái kệ."

**[Chuyển sang VS Code - Mở `pages/admin-zone-management.html`]:**
> "Trong mã nguồn, hàm `renderZones()` và `renderShelves()` đọc dữ liệu từ hai bảng `zones` và `shelves` trong Mock Database. Hàm `handleAddShelf()` kiểm tra mã kệ không được trùng lặp trước khi gọi `addShelf()` trong `js/api.js`. Nếu quản trị viên đổi trạng thái một kệ sang 'Bảo trì', hệ thống bên phía nhân viên và khách hàng sẽ lập tức cập nhật trạng thái tương ứng."

**[Thao tác Live Edit]:**
> "Em xin Live Edit: Trên web, em bấm thêm một kệ mới: Mã kệ 'Kệ B04', thuộc 'Khu vực B', sức chứa '80', 3 tầng. Kệ B04 lập tức xuất hiện trong bảng danh sách. Tiếp theo, em vào code sửa màu chữ của nhãn 'Đang hoạt động' sang màu xanh lá đậm hơn. Bấm Lưu và F5... Màu sắc đã cập nhật thành công."

**[Commit Git]:**
```bash
git add pages/admin-zone-management.html
git commit -m "feat: zone and shelf structural configuration management"
```
> "Em xin kết thúc video quản trị khu vực và kệ hàng."

---

### VIDEO 14: `SV3-06-admin-user-management.mp4` – Quản lý tài khoản & Phân quyền (`pages/admin-user-management.html`)

**[Bật OBS - Nhìn vào Webcam và nói:]**
> "Em chào thầy Kiều Tuấn Dũng. Em là Nguyễn Văn Hân, MSV 2551170885. Em xin quay video minh chứng cho màn hình cuối cùng của dự án SmartShelf: **Quản trị tài khoản người dùng và phân quyền hệ thống - `pages/admin-user-management.html`**."

**[Chuyển sang Trình duyệt Web]:**
> "Hệ thống SmartShelf được thiết kế theo mô hình phân quyền 4 vai trò rõ rệt: Shopper, Staff, Manager và Admin. Màn hình này giúp Quản trị viên:
> - Xem danh sách toàn bộ tài khoản trong hệ thống, trong đó có sẵn tài khoản của 3 thành viên trong nhóm kèm mã sinh viên và vai trò phân công.
> - Thêm tài khoản mới, phân quyền đúng vai trò và gán email liên hệ.
> - Nút thao tác nhanh **'Đặt lại mật khẩu'** để cấp lại mật khẩu mặc định nếu nhân viên quên thông tin đăng nhập."

**[Chuyển sang VS Code - Mở `pages/admin-user-management.html`]:**
> "Mã nguồn sử dụng hàm `getUsers()` để lấy danh sách tài khoản từ Mock DB. Mỗi vai trò được gán một class màu CSS riêng (`role-shopper`, `role-associate`, `role-manager`, `role-admin`). Hàm `handleAddUser()` kiểm tra tính duy nhất của tên đăng nhập trước khi gọi `addUser()`. Khi tài khoản được thêm mới, người đó có thể dùng tài khoản này đăng nhập ngay lập tức tại trang `login.html`."

**[Thao tác Live Edit]:**
> "Em xin thực hiện Live Edit: Em bấm nút '+ Thêm người dùng mới' trên web: Họ tên 'Nguyễn Văn Test', Username 'testuser', vai trò 'Nhân viên kệ hàng'. Bấm Lưu... Tài khoản mới xuất hiện ngay trên bảng. Sau đó trong code, em sửa thông báo cấp lại mật khẩu từ *'Đã cấp lại mật khẩu mặc định 123456'* thành *'Đặt lại mật khẩu thành công: 123456'*. Lưu và F5... Thông báo đã đổi chính xác."

**[Commit Git]:**
```bash
git add pages/admin-user-management.html
git commit -m "feat: user management and role-based access control"
```
> "Em đã hoàn thành video minh chứng cuối cùng của nhóm 5. Nhóm chúng em xin chân thành cảm ơn thầy Kiều Tuấn Dũng đã tận tình hướng dẫn chúng em trong suốt học phần Nền tảng phát triển web cơ bản này!"

---

## TỔNG KẾT BẢNG PHÂN CÔNG & DANH SÁCH 14 VIDEO OBS:

| STT | Tên Video File | Người quay | Màn hình | Tính năng nổi bật |
|:---:|---|---|---|---|
| 1 | `SV1-00-index.mp4` | Trần Trọng Hoàng Anh | `index.html` | Portal 4 vai trò, điều hướng toàn cục |
| 2 | `SV1-01-login.mp4` | Trần Trọng Hoàng Anh | `pages/login.html` | Đăng nhập phân quyền, Quick Switcher |
| 3 | `SV1-02-shopper-product-search.mp4` | Trần Trọng Hoàng Anh | `pages/shopper-product-search.html` | Tìm kiếm thời gian thực, lọc ngành hàng |
| 4 | `SV1-03-shopper-product-location.mp4` | Trần Trọng Hoàng Anh | `pages/shopper-product-location.html` | Sơ đồ mặt bằng 4 khu vực, chỉ dẫn đường |
| 5 | `SV1-04-shopper-product-alternatives.mp4` | Trần Trọng Hoàng Anh | `pages/shopper-product-alternatives.html` | **Tính năng AI 2** (Hàng thay thế khi cạn kệ) |
| 6 | `SV2-01-associate-zone-view.mp4` | Nguyễn Quang Long | `pages/associate-zone-view.html` | Điều hành 14 kệ, đo % lấp đầy khu vực |
| 7 | `SV2-02-associate-shelf-check.mp4` | Nguyễn Quang Long | `pages/associate-shelf-check.html` | Phiếu đếm thực tế, **Tính năng AI 3** chẩn đoán |
| 8 | `SV2-03-associate-restock-task.mp4` | Nguyễn Quang Long | `pages/associate-restock-task.html` | **Tính năng AI 1** (Xếp hạng kệ ưu tiên cấp bách) |
| 9 | `SV3-01-manager-store-dashboard.mp4` | Nguyễn Văn Hân | `pages/manager-store-dashboard.html` | Dashboard chỉ số KPI, điểm nóng sự cố |
| 10 | `SV3-02-manager-restock-board.mp4` | Nguyễn Văn Hân | `pages/manager-restock-board.html` | Kanban 4 cột luân chuyển hàng lên kệ |
| 11 | `SV3-03-manager-retail-insights.mp4` | Nguyễn Văn Hân | `pages/manager-retail-insights.html` | Ma trận thất thoát AI 3, Tốc độ bán hàng |
| 12 | `SV3-04-admin-product-management.mp4` | Nguyễn Văn Hân | `pages/admin-product-management.html` | Master CRUD danh mục sản phẩm |
| 13 | `SV3-05-admin-zone-management.mp4` | Nguyễn Văn Hân | `pages/admin-zone-management.html` | Master CRUD cấu hình 4 khu vực & 14 kệ |
| 14 | `SV3-06-admin-user-management.mp4` | Nguyễn Văn Hân | `pages/admin-user-management.html` | Quản trị tài khoản & phân quyền 4 vai trò |
