const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (simplified for now)
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, cartItems } = req.body;

    // Basic validation
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address and payment method are required'
      });
    }

    // Check if cart items are provided
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // For now, we'll use a dummy user ID
    const dummyUserId = '507f1f77bcf86cd799439011';
    
    // Check stock availability and create order items
    const orderItems = [];
    for (const item of cartItems) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product not found: ${item.product._id}`
        });
      }

      if (!product.isInStock(item.quantity)) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0]?.url || '',
        price: product.price,
        quantity: item.quantity
      });
    }

    // Create order
    const order = new Order({
      user: dummyUserId,
      orderItems,
      shippingAddress,
      paymentMethod
    });

    // Calculate totals
    order.calculateTotals();

    // Save order
    await order.save();

    // Update product stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      product.updateStock(item.quantity, 'subtract');
      await product.save();
    }
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order'
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Public (simplified for now)
exports.getMyOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // For now, we'll use a dummy user ID
    const dummyUserId = '507f1f77bcf86cd799439011';
    
    const total = await Order.countDocuments({ user: dummyUserId });
    
    const orders = await Order.find({ user: dummyUserId })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('orderItems.product', 'name images');
    
    const pagination = {
      total,
      pages: Math.ceil(total / limit),
      page,
      limit
    };
    
    res.status(200).json({
      success: true,
      count: orders.length,
      pagination,
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving orders'
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Public (simplified for now)
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('orderItems.product', 'name images');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving order'
    });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Public (simplified for now)
exports.updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    if (order.isPaid) {
      return res.status(400).json({
        success: false,
        message: 'Order is already paid'
      });
    }
    
    // Mark as paid
    order.markAsPaid(req.body);
    
    await order.save();
    
    res.status(200).json({
      success: true,
      message: 'Order marked as paid',
      data: order
    });
  } catch (error) {
    console.error('Update order to paid error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order'
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Public (simplified for now)
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    if (order.orderStatus === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Order is already cancelled'
      });
    }
    
    if (order.orderStatus === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel delivered order'
      });
    }
    
    // Cancel order
    order.cancelOrder(req.body.reason);
    
    // Restore product stock
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.updateStock(item.quantity, 'add');
        await product.save();
      }
    }
    
    await order.save();
    
    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order'
    });
  }
};
