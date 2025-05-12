const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginHistoryController');

router.get('/', controller.getAll);
router.get('/today', controller.getTodayHistory);
router.get('/today/:login_id', controller.getTodayHistory);
router.get('/:login_id', controller.getByLoginId);

router.post('/add-login-history', controller.addLoginHistory);
router.post('/delete-login-history', controller.deleteLoginHistory);
  

module.exports = router;
