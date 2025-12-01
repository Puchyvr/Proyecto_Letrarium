const express = require('express');
const { authRequired } = require('../middlewares/authMiddleware');
const { getCart, addToCart, updateCartItem, removeCartItem, clearCart } = require('../controllers/cartController');

const router = express.Router();

router.get('/', authRequired, getCart);
router.post('/', authRequired, addToCart);
router.put('/:id', authRequired, updateCartItem);
router.delete('/:id', authRequired, removeCartItem);
router.delete('/', authRequired, clearCart);

module.exports = router;


