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
  
// Add a login history record with a check for existing session
exports.addLoginHistory = async (req, res) => {
  const { login_id, app, time, session } = req.body;

  try {
    // Check if a record with the same app and session already exists
    const existingRecord = await LoginHistory.findOne({
      where: { app, session },
    });

    if (existingRecord) {
      // If record exists, skip the insert
      return res.status(200).json({ message: 'Login history already exists for this session' });
    }

    // If no record exists, proceed with inserting the new login history
    await LoginHistory.create({
      login_id,
      app,
      time,
      session
    });

    res.status(201).json({ message: 'Login history added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};