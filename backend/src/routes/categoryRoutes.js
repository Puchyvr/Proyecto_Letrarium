const express = require('express');
const { authRequired, adminOnly } = require('../middlewares/authMiddleware');
const { list, getOne, create, update, remove } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', list);
router.get('/:id', getOne);
router.post('/', authRequired, adminOnly, create);
router.put('/:id', authRequired, adminOnly, update);
router.delete('/:id', authRequired, adminOnly, remove);

module.exports = router;


