const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderToPaid,
  cancelOrder,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

// All order routes require authentication
router.use(protect);

// User routes
router.route('/')
  .get(getMyOrders)
  .post(validateOrder, createOrder);

// Admin routes
router.get('/admin', authorize('admin'), getAllOrders);
router.get('/admin/all', authorize('admin'), getAllOrders);

router.route('/:id')
  .get(getOrder);

router.put('/:id/pay', updateOrderToPaid);
router.put('/:id/cancel', cancelOrder);
router.put('/:id/status', authorize('admin'), updateOrderStatus);

module.exports = router;
