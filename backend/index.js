const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '7Hnl/THVafYYlT8dzHPSiyNNb4KBTR+DGbt9GpIVyd7eE6vszauXc7wTVHqyDVxSywD3FHmffmgNlLA7nNaPjA==';

const loginHistoryRoutes = require('./routes/loginHistoryRoutes');

// Đọc chứng chỉ SSL
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/iamwebapp.adnovumlabs.com/privkey.pem'),   // Đường dẫn đến private key
  cert: fs.readFileSync('/etc/letsencrypt/live/iamwebapp.adnovumlabs.com/fullchain.pem') // Đường dẫn đến certificate
};

function decodeAndVerifyJWT(token_base64, secret_key) {
  const decoded = jwt.verify(token_base64, secret_key);
  console.log(decoded);
  return decoded;
}

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({ 
  origin: 'https://iamwebapp.adnovumlabs.com',
  credentials: true // Allow sending cookies through CORS
}));

// Middleware to check JWT token
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1]; // Split 'Bearer <token>'

      jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
          if (err) {
              return res.sendStatus(403); // Forbidden
          }

          // Token is valid, store user info in request
          req.user = {
            app: decodedToken.app,
            time: decodedToken.time,
            loginId: decodedToken.loginId
          };
          next();
      });
  } else {
      res.sendStatus(401); // Unauthorized
  }
}

app.get('/', authenticateJWT, (req, res) => {
  res.json({
    message: 'Authentication successful!',
    app: req.user.app,
    time: req.user.time,
    loginId: req.user.loginId
  });
});

app.get('/api/me', authenticateJWT, (req, res) => {
  res.json({
    app: req.user.app,
    time: req.user.time,
    loginId: req.user.loginId
  });
});

// Routes
app.use('/api/login-history', authenticateJWT, loginHistoryRoutes);

// Kết nối DB và chạy server
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful.');
    https.createServer(options, app).listen(3000, () => {
      console.log('Server is running at https://iamwebapp.adnovumlabs.com:3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
