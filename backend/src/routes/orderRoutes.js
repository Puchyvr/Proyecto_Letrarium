const express = require('express');
const { authRequired, adminOnly } = require('../middlewares/authMiddleware');
const { create, listAll, getOne } = require('../controllers/orderController');

const router = express.Router();

router.post('/', authRequired, create);
router.get('/', authRequired, adminOnly, listAll);
router.get('/:id', authRequired, getOne);

module.exports = router;


