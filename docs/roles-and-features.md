# PHÂN TÍCH CHI TIẾT 4 VAI TRÒ VÀ TÍNH NĂNG (ROLES & FEATURES)

> **Dự án:** SmartShelf – Điều hành kệ hàng và hỗ trợ mua sắm (BTL-10)  
> **Nhóm 5 – 67KTPM1:** Trần Trọng Hoàng Anh · Nguyễn Quang Long · Nguyễn Văn Hân  

Theo yêu cầu chuẩn mực của đề tài và tài liệu hướng dẫn, mỗi vai trò nghiệp vụ được phân tích chi tiết thông qua 10 câu hỏi cốt lõi:

---

## 1. VAI TRÒ 1: KHÁCH MUA SẮM (SHOPPER / CUSTOMER)
*Phụ trách kỹ thuật: Trần Trọng Hoàng Anh (SV1)*

1. **Người này là ai?**  
   Là khách hàng trực tiếp đi mua sắm trong siêu thị hoặc khách hàng sử dụng thiết bị di động/kiosk tại quầy để tra cứu hàng hóa.
2. **Mục tiêu chính là gì?**  
   Tìm được món hàng mình cần nhanh nhất, biết chính xác sản phẩm đang nằm ở Kệ nào, Tầng mấy, và tìm được sản phẩm thay thế phù hợp nếu món hàng đó đã hết.
3. **Họ cần xem dữ liệu gì?**  
   Danh sách sản phẩm, hình ảnh, đơn giá, tình trạng còn hàng trên kệ, sơ đồ vị trí kệ hàng (Zone A/B/C/D), chỉ dẫn lộ trình đường đi và đề xuất thay thế từ AI.
4. **Họ tạo dữ liệu gì?**  
   Tạo giỏ hàng cá nhân (`cart`), tạo yêu cầu cảnh báo thiếu hàng trên kệ gửi tới nhân viên ca trực.
5. **Họ sửa gì?**  
   Chỉnh sửa số lượng sản phẩm trong giỏ hàng, cập nhật bộ lọc tìm kiếm và tiêu chí gợi ý AI.
6. **Họ có thể hủy / xóa / khóa gì?**  
   Xóa sản phẩm khỏi giỏ hàng, hủy phiên gợi ý thay thế, đặt lại bộ lọc tìm kiếm về mặc định.
7. **Họ cần tìm kiếm / lọc gì?**  
   Tìm theo tên sản phẩm, mã SKU, lọc theo danh mục ngành hàng (Đồ uống, Thực phẩm khô, Bánh kẹo, Mỹ phẩm), lọc theo tình trạng kệ (Còn hàng / Tạm hết).
8. **Họ cần dashboard nào?**  
   Xem bản đồ mặt bằng trực quan siêu thị với trạng thái màu sắc của từng kệ (Xanh: Đủ hàng, Vàng: Sắp hết, Đỏ: Trống kệ).
9. **AI hỗ trợ họ ở đâu?**  
   **AI-2: Product Alternative AI** – Khi một món hàng hết sạch (ví dụ Coca-Cola Zero hết hàng), AI tức thì phân tích các sản phẩm cùng ngành, cùng tầm giá, còn sẵn hàng trên kệ gần đó để gợi ý giải pháp thay thế có giải trình rõ ràng.
10. **Họ tương tác với vai trò khác như thế nào?**  
    Khách gửi tín hiệu báo thiếu hàng &rarr; Nhân viên (SV2) nhận thông báo kiểm kê; Khách đặt mua &rarr; Đơn hàng được ghi nhận vào hệ thống của Quản lý (SV3).

---

## 2. VAI TRÒ 2: NHÂN VIÊN CỬA HÀNG (STORE ASSOCIATE / STAFF)
*Phụ trách kỹ thuật: Nguyễn Quang Long (SV2)*

1. **Người này là ai?**  
   Là nhân viên vận hành, phụ trách sắp xếp, kiểm kê hàng hóa tại các dãy kệ và bổ sung hàng từ kho lên quầy.
2. **Mục tiêu chính là gì?**  
   Giữ cho các kệ hàng luôn đầy đủ sản phẩm, không bị trống hàng (out-of-stock), và nhanh chóng phát hiện sai lệch kiểm kê.
3. **Họ cần xem dữ liệu gì?**  
   Danh sách 14 kệ hàng phân theo 4 Zone, số lượng tồn hệ thống vs định mức tối thiểu, danh sách nhiệm vụ bổ sung được xếp hạng ưu tiên bởi AI.
4. **Họ tạo dữ liệu gì?**  
   Tạo biên bản kiểm kê kệ (`shelfChecks`) với số lượng đếm thực tế; tạo nhiệm vụ bổ sung hàng (`restockTasks`).
5. **Họ sửa gì?**  
   Cập nhật tiến độ nhiệm vụ (từ `Chờ xử lý` sang `Đang lấy hàng` và `Đã hoàn tất`), cập nhật số lượng hàng đếm thực địa.
6. **Họ có thể hủy / xóa / khóa gì?**  
   Hủy các nhiệm vụ bổ sung bị trùng lặp hoặc hết hàng trong kho tổng.
7. **Họ cần tìm kiếm / lọc gì?**  
   Lọc kệ theo khu vực ca trực (Zone A, B, C, D), lọc theo trạng thái kệ (Kệ rỗng, Kệ sắp hết, Kệ bất thường).
8. **Họ cần dashboard nào?**  
   Giao diện tổng quan Zone View hiển thị trực quan tỷ lệ lấp đầy (%) và các thẻ cảnh báo khẩn cấp.
9. **AI hỗ trợ họ ở đâu?**  
   - **AI-1: Restock Priority AI:** Tự động xếp hạng danh sách kệ cần lấy hàng từ kho ra bổ sung dựa trên tốc độ bán (velocity) và tỷ lệ vơi kệ.  
   - **AI-3: Shelf Anomaly Insight:** Cảnh báo ngay trên phiếu kiểm kê khi phát hiện chênh lệch đếm thực tế lớn so với hệ thống.
10. **Họ tương tác với vai trò khác như thế nào?**  
    Nhân viên hoàn thành xếp hàng &rarr; Kệ của Khách (SV1) chuyển sang trạng thái "Sẵn hàng"; Biên bản kiểm kê &rarr; Báo cáo lên Dashboard Quản lý (SV3).

---

## 3. VAI TRÒ 3: QUẢN LÝ CỬA HÀNG (STORE MANAGER)
*Phụ trách kỹ thuật: Nguyễn Văn Hân (SV3)*

1. **Người này là ai?**  
   Là cửa hàng trưởng, người giám sát toàn bộ hoạt động kinh doanh, nhân sự và hàng hóa trong ca làm việc.
2. **Mục tiêu chính là gì?**  
   Tối đa hóa doanh thu, giảm thiểu thất thoát hàng hóa, đảm bảo tỷ lệ sẵn sàng của kệ hàng đạt trên 80% và phân bổ nhân sự hợp lý.
3. **Họ cần xem dữ liệu gì?**  
   Doanh thu ước tính theo ca, tỷ lệ lấp đầy toàn cửa hàng, danh sách các điểm nóng thất thoát, bảng Kanban luân chuyển hàng, bảng tốc độ tiêu thụ sản phẩm (velocity).
4. **Họ tạo dữ liệu gì?**  
   Tạo nhiệm vụ bổ sung điều phối cho nhân viên; ban hành lệnh rà soát camera hoặc kiểm đếm lại đột xuất.
5. **Họ sửa gì?**  
   Chuyển trạng thái thẻ công việc trên Kanban, gán lại người phụ trách (assignee), điều chỉnh thứ tự ưu tiên.
6. **Họ có thể hủy / xóa / khóa gì?**  
   Khóa tạm thời số liệu tồn kho trực tuyến của kệ có bất thường; đóng hoặc hủy nhiệm vụ điều phối.
7. **Họ cần tìm kiếm / lọc gì?**  
   Lọc nhiệm vụ theo nhân viên, lọc sản phẩm theo nhóm bán chạy (Top Fast-movers) và bán chậm (Slow-movers).
8. **Họ cần dashboard nào?**  
   Bảng điều khiển Executive Dashboard với biểu đồ cột sức chứa 4 khu vực và bảng tổng hợp các sự cố cấp bách.
9. **AI hỗ trợ họ ở đâu?**  
   **AI-3: Deep Shelf Anomaly Matrix** – Phân tích ma trận sai số kiểm kê, suy luận xác suất nguyên nhân gốc rễ (Xếp nhầm kệ: 65%, Thất thoát/Trộm cắp: 25%, Quên quét POS: 10%) và đưa ra khuyến nghị xử lý tức thì.
10. **Họ tương tác với vai trò khác như thế nào?**  
    Quản lý giao task qua Kanban &rarr; Nhân viên (SV2) nhận việc; Quản lý điều chỉnh cách bố trí kệ &rarr; Tác động trực tiếp đến vị trí tìm kiếm của Khách (SV1).

---

## 4. VAI TRÒ 4: QUẢN TRỊ VIÊN HỆ THỐNG (ADMIN)
*Phụ trách kỹ thuật: Nguyễn Văn Hân (SV3)*

1. **Người này là ai?**  
   Là cán bộ quản trị hệ thống dữ liệu (Master Data Administrator).
2. **Mục tiêu chính là gì?**  
   Đảm bảo tính toàn vẹn của danh mục hàng hóa, cấu hình mặt bằng kệ hàng và duy trì tài khoản người dùng hoạt động ổn định.
3. **Họ cần xem dữ liệu gì?**  
   Toàn bộ bảng dữ liệu hệ thống: Danh mục sản phẩm, mã SKU, danh sách Zone, danh sách Shelves, tài khoản người dùng và vai trò phân quyền.
4. **Họ tạo dữ liệu gì?**  
   Thêm sản phẩm mới vào danh mục, tạo thêm Kệ hàng mới, cấp tài khoản người dùng mới.
5. **Họ sửa gì?**  
   Sửa thông tin sản phẩm, gán sản phẩm sang kệ mới, đổi số tầng kệ, sửa quyền tài khoản.
6. **Họ có thể hủy / xóa / khóa gì?**  
   Xóa/Lưu trữ sản phẩm, xóa kệ không còn sử dụng, reset mật khẩu tài khoản.
7. **Họ cần tìm kiếm / lọc gì?**  
   Tìm kiếm sản phẩm theo SKU/Tên, lọc theo kệ hàng và ngành hàng; tìm kiếm tài khoản theo username/vai trò.
8. **Họ cần dashboard nào?**  
   Bảng quản trị dữ liệu tổng hợp với các modal biểu mẫu kiểm tra hợp lệ nghiêm ngặt.
9. **AI hỗ trợ họ ở đâu?**  
   Được kế thừa các dữ liệu phân loại và cảnh báo của AI để hỗ trợ đưa ra quyết định khi gán vị trí kệ tối ưu.
10. **Họ tương tác với vai trò khác như thế nào?**  
    Admin cấu hình dữ liệu master &rarr; Toàn bộ Khách, Nhân viên và Quản lý sử dụng dữ liệu này đồng bộ trong toàn chu trình.
