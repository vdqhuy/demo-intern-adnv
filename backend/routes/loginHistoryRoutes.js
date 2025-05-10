const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginHistoryController');

router.get('/', controller.getAll);
router.get('/:login_id', controller.getByLoginId);

router.post('/add-login-history', controller.addLoginHistory);
  
router.get('/today/:login_id', controller.getTodayHistory);

module.exports = router;
