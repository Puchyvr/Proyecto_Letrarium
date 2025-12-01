const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

async function create(req, res) {
  try {
    const { items } = req.body; // [{productId, quantity}]
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Invalid body' });
    // Validate and compute totals
    const productIds = items.map(i => i.productId);
    const products = await Product.findAll({ where: { id: productIds } });
    if (products.length !== items.length) return res.status(400).json({ message: 'Some products not found' });
    // Check stock
    for (const it of items) {
      const p = products.find(pr => pr.id === it.productId);
      if (!p || it.quantity < 1 || p.stock < it.quantity) {
        return res.status(400).json({ message: 'Insufficient stock or invalid quantity' });
      }
    }
    // Compute total
    let orderTotal = 0;
    const detailed = items.map(it => {
      const p = products.find(pr => pr.id === it.productId);
      const price = Number(p.price);
      const total = price * it.quantity;
      orderTotal += total;
      return { productId: p.id, quantity: it.quantity, price, total };
    });
    const order = await Order.create({ userId: req.user.id, quantity: items.reduce((a, b) => a + b.quantity, 0), total: orderTotal, status: 'pending' });
    for (const d of detailed) {
      await OrderItem.create({ ...d, orderId: order.id });
      const p = products.find(pr => pr.id === d.productId);
      await p.update({ stock: p.stock - d.quantity });
    }
    res.status(201).json({ orderId: order.id, total: order.total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function listAll(req, res) {
  try {
    const items = await Order.findAll({ order: [['createdAt', 'DESC']] });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getOne(req, res) {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && order.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { create, listAll, getOne };


