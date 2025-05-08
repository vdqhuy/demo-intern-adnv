const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const sequelize = require('./config/database');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const SECRET_KEY = '7Hnl/THVafYYlT8dzHPSiyNNb4KBTR+DGbt9GpIVyd7eE6vszauXc7wTVHqyDVxSywD3FHmffmgNlLA7nNaPjA==';

const loginHistoryRoutes = require('./routes/loginHistoryRoutes');

const app = express();

// read SSL certificate and key
const options = {
  key: fs.readFileSync('./certs/privkey.pem'),   // Path to private key
  cert: fs.readFileSync('./certs/fullchain.pem') // Path to certificate
};

const cors = require('cors');

const allowedOrigins = [
  'https://iamwebapp.adnovumlabs.com',
  'https://iamintern.adnovumlabs.com'
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
            loginId: decodedToken.loginId
          };
          next();
      });
  } else {
      res.sendStatus(401); // Unauthorized
  }
}

app.get('/', authenticateJWT, async (req, res) => {
  const { loginId, app, time } = req.user;

  // Send the login history data to be added via the routes
  const loginHistoryData = {
    login_id: loginId,
    app: app,
    time: time
  };

  // Add login history record
  try {
    // Call the router's post method for /add-login-history directly
    const response = await loginHistoryRoutes.handle({
      method: 'POST',
      url: '/add-login-history',
      body: loginHistoryData,
      headers: req.headers,
    });

    if (response.status === 201) {
      res.status(201).json({ message: 'Login history added successfully' });
    } else {
      res.status(500).json({ error: response.data.error });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error adding login history: ' + err.message });
  }
});

app.get('/api/me', authenticateJWT, (req, res) => {
  const sessionCookie = req.cookies['Session_Minced-Baker_SSO_realm'];
  console.log('Session_Minced-Baker_SSO_realm:', sessionCookie);

  res.json({
    app: req.user.app,
    time: req.user.time,
    loginId: req.user.loginId
  });
});

// app.get('/api/me', (req, res) => {
//   console.log(req);
//   console.log(req.headers);

//   // Get token from header
//   const authHeader = req.headers.authorization1; // Make sure 'authorization1' is the correct header name in the request
  
//   if (!authHeader) {
//     return res.sendStatus(401); // Unauthorized if no token is provided
//   }

//   const token = authHeader.split(' ')[1]; // Split 'Bearer <token>'

//   // Verify JWT token
//   jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
//     if (err) {
//       return res.sendStatus(403); // Forbidden if the token is invalid
//     }

//     // If the token is valid, return the user information
//     res.json({
//       app: decodedToken.app,
//       time: decodedToken.time,
//       loginId: decodedToken.loginId
//     });
//   });
// });


// Routes
app.use('/api/login-history', authenticateJWT, loginHistoryRoutes);

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
