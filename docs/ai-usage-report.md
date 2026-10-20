# BÁO CÁO KHAI BÁO SỬ DỤNG TRÍ TUỆ NHÂN TẠO (AI USAGE REPORT)

> **Học phần:** CSE122 – Phát triển ứng dụng Web cơ bản  
> **Nhóm 5 – 67KTPM1:** Trần Trọng Hoàng Anh · Nguyễn Quang Long · Nguyễn Văn Hân  
> **Đề tài BTL-10:** SmartShelf – Điều hành kệ hàng và hỗ trợ mua sắm  

Nhóm sinh viên thực hiện khai báo minh bạch việc sử dụng công cụ AI trong quá trình nghiên cứu, thiết kế và phát triển dự án theo đúng Phụ lục F của Hướng dẫn thực hiện BTL:

---

### Khai Báo 1: Thiết Kế Kiến Trúc Dữ Liệu & Bản Kiểm Kê Màn Hình
- **Công cụ:** Gemini 3.8 Flash & ChatGPT.
- **Câu lệnh chính (Prompt):**  
  *"Dựa vào yêu cầu đề tài BTL-10 SmartShelf, hãy phân tích luồng người dùng cho 4 vai trò (Khách, Nhân viên, Quản lý, Quản trị) và lập bảng kiểm kê màn hình đáp ứng các tiêu chuẩn bao phủ trạng thái, lát cắt dọc và 3 tính năng AI."*
- **Phần AI sinh ra:** Gợi ý khung bảng danh sách các màn hình và danh sách các trường dữ liệu cho thực thể `products`, `shelves`, `shelfChecks`.
- **Phần sinh viên chỉnh sửa:** Tinh chỉnh tên tệp theo chuẩn `kebab-case`, điều chỉnh phù hợp với mô hình siêu thị thực tế tại Việt Nam (các sản phẩm quen thuộc như Coca-Cola, Hảo Hảo, Omachi), bổ sung thêm các trường liên kết vị trí kệ và tầng kệ (`shelfLevel`, `zoneCode`).
- **Cách sinh viên kiểm chứng:** Rà soát từng màn hình đối chiếu với tài liệu quy định của học phần CSE122 và tham vấn ý kiến duyệt đề tài của giảng viên.
- **Điều sinh viên học được:** Hiểu rõ cách phân tích lát cắt dọc (Vertical Slice) trong phát triển phần mềm, thay vì chia việc theo kiểu một người chỉ làm HTML, một người chỉ làm JS.

---

### Khai Báo 2: Xây Dựng Thuật Toán Mô Phỏng 3 Tính Năng AI
- **Công cụ:** Antigravity AI Assistant & Claude 3.5.
- **Câu lệnh chính (Prompt):**  
  *"Viết các hàm JavaScript mô phỏng trải nghiệm AI chạy trực tiếp ở Frontend: AI-1 xếp hạng ưu tiên bổ sung kệ dựa trên tốc độ bán và lượng tồn; AI-2 đề xuất sản phẩm thay thế khi hết hàng; AI-3 chẩn đoán bất thường khi sai lệch kiểm kê lớn. Bắt buộc có độ trễ giả lập loading, độ tin cậy, giải thích lý do (explainable) và xử lý ngoại lệ khi AI thất bại."*
- **Phần AI sinh ra:** Các khung hàm `Promise` với `setTimeout`, công thức tính điểm ưu tiên đa yếu tố và cấu trúc JSON trả về kết quả kèm lý do giải thích.
- **Phần sinh viên chỉnh sửa:** Tích hợp trực tiếp dữ liệu từ `localStorage` để kết quả AI có tác động thực sự đến luồng nghiệp vụ (ví dụ: Chấp nhận gợi ý AI-1 sẽ tự động tạo Task trong `restockTasks`, Chấp nhận AI-2 sẽ tự động thêm vào Giỏ hàng `cart`). Viết thêm nút bấm mô phỏng trạng thái AI thất bại / không đủ dữ liệu để đáp ứng tiêu chuẩn của giảng viên.
- **Cách sinh viên kiểm chứng:** Thao tác thử trên giao diện, kiểm tra trong Console và DevTools Network xem trạng thái loading skeleton và thông báo lỗi có hiển thị đúng kịch bản hay không.
- **Điều sinh viên học được:** Trí tuệ nhân tạo trong ứng dụng web không nhất thiết phải là một ô chat, mà phải là tính năng nhúng vào ngữ cảnh nghiệp vụ để hỗ trợ người dùng ra quyết định tốt hơn (Decision Support System).

---

### Khai Báo 3: Tối Ưu Hóa Giao Diện Responsive & Form Validation
- **Công cụ:** GitHub Copilot & ChatGPT.
- **Câu lệnh chính (Prompt):**  
  *"Cách xử lý bảng biểu dữ liệu nhiều cột (table) và hệ thống thẻ Kanban trên màn hình điện thoại di động (dưới 768px) để không bị tràn viền và dễ thao tác."*
- **Phần AI sinh ra:** Đoạn mã CSS Media Queries và gợi ý bọc thẻ `div.table-responsive` có thuộc tính `overflow-x: auto`.
- **Phần sinh viên chỉnh sửa:** Tự tay viết file `css/responsive.css`, điều chỉnh lại cỡ chữ, khoảng cách đệm (padding) của các nút bấm trên mobile để người dùng chạm ngón tay không bị bấm nhầm.
- **Cách sinh viên kiểm chứng:** Sử dụng Chrome DevTools Device Mode để kiểm tra trên màn hình iPhone 12 Pro, iPad Air và Desktop độ phân giải cao.
- **Điều sinh viên học được:** Kỹ năng xử lý CSS Grid, Flexbox và tư duy Mobile-First trong thiết kế giao diện web hiện đại.
