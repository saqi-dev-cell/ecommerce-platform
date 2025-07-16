const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Public (simplified for now)
exports.getCart = async (req, res) => {
  try {
    // For now, we'll use a dummy user ID since we don't have auth middleware
    const dummyUserId = '507f1f77bcf86cd799439011'; // Valid ObjectId format
    
    let cart = await Cart.findOne({ user: dummyUserId })
      .populate('items.product', 'name images price stock');
    
    if (!cart) {
      // Create empty cart if none exists
      cart = await Cart.create({
        user: dummyUserId,
        items: []
      });
    }
    
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving cart'
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public (simplified for now)
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }
    
    // Check if product exists and is in stock
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    if (!product.isInStock(quantity)) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }
    
    // For now, we'll use a dummy user ID
    const dummyUserId = '507f1f77bcf86cd799439011';
    
    // Find user's cart or create new one
    let cart = await Cart.findOne({ user: dummyUserId });
    
    if (!cart) {
      cart = await Cart.create({
        user: dummyUserId,
        items: []
      });
    }
    
    // Add item to cart
    cart.addItem(productId, quantity, product.price);
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.product', 'name images price stock');
    
    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart'
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Public (simplified for now)
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    
    if (!quantity || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }
    
    // Check if product exists and is in stock
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    if (quantity > 0 && !product.isInStock(quantity)) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }
    
    // For now, we'll use a dummy user ID
    const dummyUserId = '507f1f77bcf86cd799439011';
    
    // Find user's cart
    const cart = await Cart.findOne({ user: dummyUserId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Update item quantity
    cart.updateItemQuantity(productId, quantity);
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.product', 'name images price stock');
    
    res.status(200).json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cart'
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Public (simplified for now)
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    // For now, we'll use a dummy user ID
    const dummyUserId = '507f1f77bcf86cd799439011';
    
    // Find user's cart
    const cart = await Cart.findOne({ user: dummyUserId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Remove item from cart
    cart.removeItem(productId);
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.product', 'name images price stock');
    
    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing item from cart'
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public (simplified for now)
exports.clearCart = async (req, res) => {
  try {
    // For now, we'll use a dummy user ID
    const dummyUserId = '507f1f77bcf86cd799439011';
    
    // Find user's cart
    const cart = await Cart.findOne({ user: dummyUserId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Clear cart
    cart.clearCart();
    
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: cart
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart'
    });
  }
};
