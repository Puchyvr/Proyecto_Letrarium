const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 },
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'shipped', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'orders',
  timestamps: true,
});

module.exports = Order;


