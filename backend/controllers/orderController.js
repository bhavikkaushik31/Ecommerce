
const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user').populate('products');
  res.json(orders);
};
