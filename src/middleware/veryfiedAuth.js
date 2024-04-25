const decode = require("../jwt");
const ResponseFactory= require('../response_design')
 

// Middleware xác thực role admin
const verifyAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        
        return ResponseFactory.createResponse(401, 'Unauthorized: No token provided')
    }

    try {
        // Giải mã JWT và lấy role từ payload
        const role = await decode(token);

        // Kiểm tra role
        if (role === 'admin') {
            // Nếu là admin, tiếp tục middleware tiếp theo
            next();
        } else {
             
            return ResponseFactory.createResponse(403,'Forbidden: Access denied')
        }
    } catch (error) {
         
        return ResponseFactory.createResponse(500,error)
    }
};

// Middleware xác thực role user
const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return ResponseFactory.createResponse(401, 'Unauthorized: No token provided')
    }

    try {
        // Giải mã JWT và lấy role từ payload
        const role = await decode(token);

        // Kiểm tra role
        if (role === 'user') {
            // Nếu là user, tiếp tục middleware tiếp theo
            next();
        } else {
            return ResponseFactory.createResponse(403,'Forbidden: Access denied')
        }
    } catch (error) {
        return ResponseFactory.createResponse(500,error)
    }
};

// Middleware xác thực cho cả hai role admin và user
const verifyAllRole = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return ResponseFactory.createResponse(401, 'Unauthorized: No token provided')
    }

    try {
        // Giải mã JWT và lấy role từ payload
        const role = await decode(token);

        // Kiểm tra role
        if (role === 'admin' || role === 'user') {
            // Nếu là admin hoặc user, tiếp tục middleware tiếp theo
            next();
        } else {
            return ResponseFactory.createResponse(403,'Forbidden: Access denied')
        }
    } catch (error) {
        return ResponseFactory.createResponse(500,error)
    }
};

module.exports = { verifyAdmin, verifyUser, verifyAllRole };
