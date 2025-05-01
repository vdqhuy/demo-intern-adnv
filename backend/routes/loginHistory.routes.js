const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginHistory.controller');

router.get('/histories', controller.getAllLoginHistories);

router.get('/histories/loginId/:loginId', controller.getLoginHistoryByLoginId);

module.exports = router;

