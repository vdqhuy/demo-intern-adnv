const db = require('../models');

exports.getAllLoginHistories = async (req, res) => {
  try {
    const logins = await db.UserLoginInfo.findAll({
      include: [{ model: db.User, attributes: ['login_id'] }]
    });

    res.json(logins);
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
}

exports.getLoginHistoryByLoginId = async (req, res) => {
  try {
    const loginId = req.params.loginId;
    const user = await db.User.findOne({ where: { login_id: loginId } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const logins = await db.UserLoginInfo.findAll({
      where: { orig_id: user.orig_id },
      include: [{ model: db.User, attributes: ['login_id'] }]
    });

    res.json(logins);
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};

