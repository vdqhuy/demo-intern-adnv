const LoginHistory = require('../models/LoginHistory');
const { Op } = require('sequelize');

// Get all login history
exports.getAll = async (req, res) => {
  try {
    const data = await LoginHistory.findAll({
      order: [['time', 'DESC']]
    });
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
        where: { login_id },
        order: [['time', 'DESC']]
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
  
// Add a login history record with a check for existing session
exports.addLoginHistory = async (req, res) => {
  const { login_id, app, time } = req.user;

  try {
    // Check if a record with the same app, time and loginId already exists
    const existingRecord = await LoginHistory.findOne({
      where: { app, time, login_id },
    });

    console.log('Existing record:', existingRecord);

    if (existingRecord) {
      // If record exists, skip the insert
      return { message: 'Login history already exists for this session' };
    }

    // If no record exists, proceed with inserting the new login history
    await LoginHistory.create({
      login_id,
      app,
      time
    });

    return { message: 'Login history added successfully' };
  } catch (err) {
    return { error: err.message };
  }
};

// Get login history for the current day, optionally filtered by login_id
exports.getTodayHistory = async (req, res) => {
  const { login_id } = req.params;

  try {
    const now = new Date();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    console.log(startOfDay, endOfDay)

    // Define the where condition
    const where = {
      time: {
        [Op.between]: [startOfDay, endOfDay]
      },
      app: {
        [Op.ne]: 'Diet coke'
      }
    };

    // If the login_id is provided, add it to the where condition
    if (login_id) {
      where.login_id = login_id;
    }

    const data = await LoginHistory.findAll({
      where,
      order: [['time', 'DESC']]
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};