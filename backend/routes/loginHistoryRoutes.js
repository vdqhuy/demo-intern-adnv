const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginHistoryController');

router.get('/all-history/', controller.getAll);
router.get('/today', controller.getTodayHistory);
router.get('/today/:login_id', controller.getTodayHistory);
router.get('/all-history/:login_id', controller.getByLoginId);

router.post('/add-login-history', controller.addLoginHistory);
router.get('/delete-login-history', controller.deleteLoginHistoryByDate);
  

module.exports = router;
