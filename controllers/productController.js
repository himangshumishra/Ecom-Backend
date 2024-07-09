const Product = require('../models/Product');

// Add a product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch products with price less than a certain value
exports.getProductsByPrice = async (req, res) => {
  try {
    const products = await Product.find({ price: { $lt: req.params.price } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch products with rating higher than a certain value
exports.getProductsByRating = async (req, res) => {
  try {
    const products = await Product.find({ rating: { $gt: req.params.rating } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
