const express = require('express');
const { addProduct, getAllProducts, updateProduct, deleteProduct, getFeaturedProducts, getProductsByPrice, getProductsByRating } = require('../controllers/productController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, addProduct);
router.get('/', getAllProducts);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);
router.get('/featured', getFeaturedProducts);
router.get('/price/:price', getProductsByPrice);
router.get('/rating/:rating', getProductsByRating);

module.exports = router;
