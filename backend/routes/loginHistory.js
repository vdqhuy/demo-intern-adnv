// routes/loginHistory.js
const express = require('express');
const router = express.Router();
const { User, UserLoginInfo } = require('../models');

// API: GET /api/login-histories/user/:userId
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const loginInfos = await UserLoginInfo.findAll({
      where: { user_id: userId },
      include: {
        model: User,
        attributes: ['login_id']
      }
    });

    const result = loginInfos.map(info => ({
      user_id: info.user_id,
      last_login: info.last_login,
      login_id: info.User.login_id
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

module.exports = router;

