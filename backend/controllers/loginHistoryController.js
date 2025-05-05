const LoginHistory = require('../models/LoginHistory');

// Lấy tất cả lịch sử đăng nhập
exports.getAll = async (req, res) => {
  try {
    const data = await LoginHistory.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy lịch sử đăng nhập theo login_id
exports.getByLoginId = async (req, res) => {
    const { login_id } = req.params;
  
    try {
      const data = await LoginHistory.findAll({
        where: { login_id }
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
