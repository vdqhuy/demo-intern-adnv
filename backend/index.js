const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const sequelize = require('./config/database');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const SECRET_KEY = '7Hnl/THVafYYlT8dzHPSiyNNb4KBTR+DGbt9GpIVyd7eE6vszauXc7wTVHqyDVxSywD3FHmffmgNlLA7nNaPjA==';

const loginHistoryRoutes = require('./routes/loginHistoryRoutes');
const controller = require('./controllers/loginHistoryController'); // Import the controller

const app = express();

// read SSL certificate and key
const options = {
  key: fs.readFileSync('./certs/privkey.pem'),   // Path to private key
  cert: fs.readFileSync('./certs/fullchain.pem') // Path to certificate
};

const cors = require('cors');

const allowedOrigins = [
  'https://iamwebapp.adnovumlabs.com',
  'https://iamintern.adnovumlabs.com',
  'http://localhost:5173'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'), false);  // Reject the request
    }
  },
  credentials: true,  // Allow cookies and credentials
};

// app.use(cors(corsOptions));

// Allow all origins (for development purposes only, not recommended for production)
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(cookieParser());

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
            login_id: decodedToken.loginId
          };
          next();
      });
  } else {
      res.sendStatus(401); // Unauthorized
  }
}

// app.get('/', authenticateJWT, async (req, res) => {

// });

app.get('/api/me', authenticateJWT, async (req, res) => {
  try {
    // Add login history
    const loginHistoryResponse = await controller.addLoginHistory(req, res);

    // Log the response for debugging
    console.log(loginHistoryResponse);

    // Return user's login information
    res.json({
      app: req.user.app,
      time: req.user.time,
      loginId: req.user.login_id,
      loginHistoryMessage: loginHistoryResponse.message // Include login history status
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use('/api/login-history', authenticateJWT, loginHistoryRoutes);

app.get("/grafana/dashboard", async (req, res) => {
  const grafanaUrl = "http://iamintern.adnovumlabs.com/d/tmsOtSxZk/amazon-ec2?from=now-1h&to=now"; // dashboard URL

  const response = await fetch(grafanaUrl, {
    headers: {
      "Authorization": "Bearer <token>"
    }
  });

  const html = await response.text();
  res.send(html);
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Connect to the database and start the server
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
