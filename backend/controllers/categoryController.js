
const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
