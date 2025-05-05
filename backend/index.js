const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '7Hnl/THVafYYlT8dzHPSiyNNb4KBTR+DGbt9GpIVyd7eE6vszauXc7wTVHqyDVxSywD3FHmffmgNlLA7nNaPjA==';

const loginHistoryRoutes = require('./routes/loginHistoryRoutes');

function decodeAndVerifyJWT(token_base64, secret_key) {

  var decode = jwt.verify(token_base64, secret_key);
  console.log(decode)
  return decode;
}

const app = express();
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true // Cho phép gửi cookie qua CORS
 }))

// Middleware để kiểm tra JWT token
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1]; // Tách 'Bearer <token>'

      jwt.verify(token, JWT_SECRET, (err, user) => {
          if (err) {
              return res.sendStatus(403); // Forbidden
          }

          // Token hợp lệ, lưu thông tin user vào request
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401); // Unauthorized
  }
}

// ✅ Middleware kiểm tra & giải mã JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Lấy phần sau "Bearer"

  if (token == null) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, email) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.email = email; // ✅ Giải mã xong, gán vào req.user
    next();
  });
}

app.get('/', authenticateJWT, (req, res) => {
  res.json({
    message: 'Đã xác thực thành công!',
    email: req.email // Thông tin giải mã từ token
  });
});

// Routes
app.use('/api/login-history', authenticateJWT, loginHistoryRoutes);

// Kết nối DB và khởi động server
sequelize.authenticate()
  .then(() => {
    console.log('Kết nối database thành công.');
    app.listen(3000, () => {
      console.log('Server chạy ở http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Không kết nối được database:', err);
  });

