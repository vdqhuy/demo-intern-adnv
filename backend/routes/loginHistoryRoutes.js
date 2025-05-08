const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginHistoryController');

router.get('/:login_id', controller.getByLoginId);
router.get('/', controller.getAll);

router.post('/add-login-history', async (req, res) => {
    const { login_id, app, time } = req.body;
    
    try {
      await addLoginHistory(login_id, app, time);
      res.status(201).json({ message: 'Login history added successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
