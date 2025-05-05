const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginHistoryController');

router.get('/:login_id', controller.getByLoginId);
router.get('/', controller.getAll);

module.exports = router;
