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

exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByPrice = async (req, res) => {
  try {
    const price = parseFloat(req.params.price);
    if (isNaN(price)) {
      return res.status(400).json({ error: 'Invalid price value' });
    }
    const products = await Product.find({ price: { $lt: price } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByRating = async (req, res) => {
  try {
    const rating = parseFloat(req.params.rating);
    if (isNaN(rating)) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }
    const products = await Product.find({ rating: { $gt: rating } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};