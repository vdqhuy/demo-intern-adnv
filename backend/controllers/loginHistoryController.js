const LoginHistory = require('../models/LoginHistory');

// Get all login history
exports.getAll = async (req, res) => {
  try {
    const data = await LoginHistory.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get login history by login_id
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
  
// Add a login history record
exports.addLoginHistory = async (login_id, app, time) => {
  try {
    await LoginHistory.create({
      login_id,
      app,
      time
    });
    console.log('Login history added successfully');
  } catch (err) {
    console.error('Error adding login history:', err.message);
  }
};