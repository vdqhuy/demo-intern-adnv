const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const sequelize = require('./config/database');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '7Hnl/THVafYYlT8dzHPSiyNNb4KBTR+DGbt9GpIVyd7eE6vszauXc7wTVHqyDVxSywD3FHmffmgNlLA7nNaPjA==';

const loginHistoryRoutes = require('./routes/loginHistoryRoutes');

// read SSL certificate and key
const options = {
  key: fs.readFileSync('./certs/privkey.pem'),   // Path to private key
  cert: fs.readFileSync('./certs/fullchain.pem') // Path to certificate
};

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({ 
  origin: 'https://iamwebapp.adnovumlabs.com'
}));

// Middleware to check JWT token
function authenticateJWT(req, res, next) {
  console.log(req);
  console.log(req.headers);

  const authHeader = req.headers.authorization1;

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

// app.get('/api/me', authenticateJWT, (req, res) => {
//   res.json({
//     app: req.user.app,
//     time: req.user.time,
//     loginId: req.user.loginId
//   });
// });

app.get('/api/me', (req, res) => {
  console.log(req);
  console.log(req.headers);

  // Get token from header
  const authHeader = req.headers.authorization1; // Make sure 'authorization1' is the correct header name in the request
  
  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized if no token is provided
  }

  const token = authHeader.split(' ')[1]; // Split 'Bearer <token>'

  // Verify JWT token
  jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if the token is invalid
    }

    // If the token is valid, return the user information
    res.json({
      app: decodedToken.app,
      time: decodedToken.time,
      loginId: decodedToken.loginId
    });
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
