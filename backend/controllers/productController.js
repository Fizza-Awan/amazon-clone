const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: 'i' } }
    : {};
  const category = req.query.category ? { category: req.query.category } : {};
  const products = await Product.find({ ...keyword, ...category });
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const getCategories = async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories);
};

module.exports = { getProducts, getProductById, getCategories };