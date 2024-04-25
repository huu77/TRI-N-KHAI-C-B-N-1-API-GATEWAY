const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
// thư viên này cung cấp cách như nginx 
const { createProxyMiddleware } = require("http-proxy-middleware");
const {
  verifyAdmin,
  verifyUser,
  verifyAllRole,
} = require("./src/middleware/veryfiedAuth");
const rateLimit = require("express-rate-limit");

app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(cors());


const PORT = process.env.PORT;

// check path midlleware token witj admin user and all 
const authenticateTokenWith = (req, res, next) => {
  // const publicPaths = ["/api/v1/login","/api/v1/register"];
  const adminPaths = ["/api/v1/users/*"];
  const userPaths = ["/api/v1/profile/*"];
  const allPaths = ["/api/v1/refreshToken","/api/v1/cloudinary-upload/*"];
  const freePaths = ["/api/v1/loginGoogle", "/api/v1/login","/api/v1/register","/api/v1/verified?idAccount"];
  if (adminPaths.includes(req.path)) {
    return verifyAdmin(req, res, next);
  }
  if (userPaths.includes(req.path)) {
    return verifyUser(req, res, next);
  }
  if (allPaths.includes(req.path)) {
    return verifyAllRole(req, res, next);
  } else {
    return next();
  }
};

// Sử dụng bộ giới hạn tốc độ (Rate Limit) với 100 yêu cầu mỗi 15 phút
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Số lượng yêu cầu tối đa
});
// Cấu hình các server backend
const backendServers = [
  process.env.URL_SERVER_USER,
  process.env.URL_SERVER_PAYMENT,
  // Thêm các server backend khác nếu cần
];

// Tạo một mảng chứa các proxy middleware cho từng server backend
const proxyMiddleware = backendServers.map(target => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { "^/": "/" },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("Content-Type", "application/json");
    }
  });
});

//using rate limit
app.use(limiter);
// using router
app.use(
  "/",
  authenticateTokenWith ,
  proxyMiddleware
);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
