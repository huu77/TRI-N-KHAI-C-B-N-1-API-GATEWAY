<h1>Mục đích chính </h1>
1.Sử dụng các middleware: Mã sử dụng nhiều middleware như morgan, helmet, compression, cors, và express-rate-limit. Điều này giúp tăng tính bảo mật, quản lý log, nén dữ liệu và giới hạn tốc độ yêu cầu vào ứng dụng.

2.Quản lý xác thực: Hàm authenticateTokenWith được sử dụng để xác định quyền truy cập của người dùng dựa trên đường dẫn của yêu cầu. Điều này cho phép xác định xem người dùng có quyền admin, user hay cả hai không, và điều hướng yêu cầu một cách tương ứng.

3.Sử dụng proxy middleware: Sử dụng http-proxy-middleware để tạo proxy cho các yêu cầu tới các máy chủ backend. Điều này cho phép ứng dụng chuyển tiếp yêu cầu từ client đến các backend khác nhau một cách dễ dàng, hữu ích trong kiến trúc dự án phân tán.

4.Cấu hình dễ dàng mở rộng: Cấu hình cho các server backend được lưu trong một mảng backendServers, cho phép thêm hoặc xoá các máy chủ một cách dễ dàng chỉ bằng cách chỉnh sửa các biến môi trường.

5.Thông báo khi khởi động server: Khi server được khởi động, một thông báo in ra console để thông báo rằng server đang lắng nghe tại cổng nào.

<h1>Cơ chế hoạt động </h1>
-Cơ chế hoạt động của http-proxy-middleware tương tự như cách Nginx xử lý proxy. Với http-proxy-middleware, bạn có thể sử dụng cho các dữ án nhỏ, không yêu cầu cao về balance và rate limit.

-Nếu bạn muốn có 1 api gateway tốt hơn. Tôi recommend bạn nên cân nhắc việc sử dụng nginx với docker.
