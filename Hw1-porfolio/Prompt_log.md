Prompt 1:
Tôi làm HW1 Production Portfolio bằng HTML, CSS và JavaScript thuần.

Hãy chỉ tạo nội dung file TASK_DECOMPOSITION.md, chưa viết code website.
File phải chia công việc thành bốn mốc bắt buộc:

M1: WCAG 2.2 AA — kiểm tra contrast và semantic landmarks.
M2: Keyboard navigation — kiểm tra điều hướng bàn phím và tránh keyboard trap.
M3: Strict CSP — không có inline event handlers.
M4: Lighthouse audit — tối ưu tài nguyên theo yêu cầu đề.

Với mỗi mốc, ghi:
- Các công việc nhỏ.
- Tiêu chí hoàn thành có thể kiểm tra.
- Cách kiểm tra bằng trình duyệt.
- Commit message phù hợp.
Giữ nội dung ngắn, dễ làm theo. Chưa tạo file khác.

Prompt 2:
Dựa trên TASK_DECOMPOSITION.md, hãy tạo giao diện portfolio cá nhân bằng
HTML, CSS và JavaScript thuần.

Yêu cầu:
- Tạo riêng index.html, css/style.css và js/main.js.
- Có các phần giới thiệu, kỹ năng, dự án và liên hệ.
- Dùng semantic landmarks phù hợp: header, nav, main, section, footer.
- Giao diện responsive trên điện thoại và máy tính.
- Tất cả CSS và JavaScript phải nằm trong file riêng.
- Không dùng framework, thư viện, font bên ngoài hoặc inline event handler.
- Dùng nội dung mẫu có thể thay thế dễ dàng.
- Trước khi xuất code, hãy nêu ngắn gọn từng file làm nhiệm vụ gì.
- Không làm báo cáo Lighthouse trong bước này.

Prompt 3:
Hãy thực hiện riêng M3 của HW1.
Yêu cầu:
- Tìm và loại bỏ toàn bộ inline event handlers như onclick, onchange.
- Gắn sự kiện trong js/main.js bằng addEventListener.
- Thêm chính sách CSP nghiêm ngặt phù hợp với website tĩnh dùng file CSS/JS cùng nguồn.
- Không dùng thư viện, font hoặc script bên ngoài.
- Giữ CSS và JavaScript trong file riêng.
- Sau khi sửa, liệt kê cách kiểm tra rằng không còn inline handlers
và không có lỗi CSP trong Console.
Chỉ sửa các file cần thiết cho M3.

Prompt 4:
Tôi đã chạy Lighthouse cho HW1 và kết quả là:
[Dán điểm và các lỗi Lighthouse liệt kê]

Hãy chỉ đề xuất các sửa đổi cần thiết để cải thiện kết quả.
Giữ website bằng HTML, CSS và JavaScript thuần.
Không thêm thư viện hoặc tài nguyên bên ngoài.
Không tuyên bố đạt 100 nếu chưa có kết quả chạy kiểm tra xác nhận.
Cho tôi biết cần sửa file nào và cách chạy Lighthouse lại.