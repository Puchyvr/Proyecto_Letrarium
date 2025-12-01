const Product = require('../models/Product');

async function list(req, res) {
  try {
    const items = await Product.findAll({ order: [['createdAt', 'DESC']] });
    // Asegurar que todos los productos tengan el campo 'name'
    const formattedItems = items.map(item => {
      const itemData = item.toJSON();
      if (!itemData.name && itemData.title) {
        itemData.name = itemData.title;
      }
      return itemData;
    });
    res.json(formattedItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getOne(req, res) {
  try {
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    const itemData = item.toJSON();
    // Asegurar que el producto tenga el campo 'name'
    if (!itemData.name && itemData.title) {
      itemData.name = itemData.title;
    }
    res.json(itemData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res) {
  try {
    const item = await Product.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function update(req, res) {
  try {
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function remove(req, res) {
  try {
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { list, getOne, create, update, remove };


