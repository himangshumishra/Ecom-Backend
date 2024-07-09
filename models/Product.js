const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: mongoose.Decimal128,
    default: 0.0
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  company: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
