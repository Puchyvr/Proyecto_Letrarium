const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

async function getCart(req, res) {
  try {
    const items = await CartItem.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity < 1) return res.status(400).json({ message: 'Invalid body' });
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const existing = await CartItem.findOne({ where: { userId: req.user.id, productId } });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json(existing);
    }
    const item = await CartItem.create({ userId: req.user.id, productId, quantity });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateCartItem(req, res) {
  try {
    const item = await CartItem.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!item) return res.status(404).json({ message: 'Not found' });
    const { quantity } = req.body;
    if (!quantity || quantity < 1) return res.status(400).json({ message: 'Invalid quantity' });
    item.quantity = quantity;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function removeCartItem(req, res) {
  try {
    const item = await CartItem.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function clearCart(req, res) {
  try {
    await CartItem.destroy({ where: { userId: req.user.id } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };


