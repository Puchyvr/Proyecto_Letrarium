const express = require('express');
const { register, login, forgot, reset } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot', forgot);
router.post('/reset', reset);

module.exports = router;


