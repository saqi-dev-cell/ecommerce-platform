const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const { validateCartItem } = require('../middleware/validation');

// All cart routes require authentication
router.use(protect);

router.route('/')
  .get(getCart)
  .post(validateCartItem, addToCart)
  .delete(clearCart);

router.route('/:productId')
  .put(updateCartItem)
  .delete(removeFromCart);

module.exports = router;
