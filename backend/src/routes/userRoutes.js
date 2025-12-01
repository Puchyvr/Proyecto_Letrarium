const express = require('express');
const { authRequired } = require('../middlewares/authMiddleware');
const { getMe, updateMe } = require('../controllers/userController');

const router = express.Router();

router.get('/me', authRequired, getMe);
router.put('/me', authRequired, updateMe);

module.exports = router;


