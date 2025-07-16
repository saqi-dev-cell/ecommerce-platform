const mongoose = require('mongoose');
const Product = require('../models/Product');

// Sample product data with placeholder images
const sampleProducts = [
  {
    name: 'KEFGOIWEHPF',
    description: 'Premium wireless headphones with noise cancellation',
    price: 373.00,
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'TechBrand',
    sku: 'KEFG-001',
    stock: 50,
    lowStockThreshold: 10,
    weight: 0.5,
    tags: ['wireless', 'headphones', 'premium'],
    features: ['Noise Cancellation', 'Wireless Connectivity', 'Long Battery Life'],
    images: [{
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      alt: 'Premium Wireless Headphones'
    }],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'PREMIUM COFFEE BEANS',
    description: 'Artisan roasted coffee beans from premium farms',
    price: 24.99,
    category: 'Food',
    subcategory: 'Coffee',
    brand: 'CoffeeMaster',
    sku: 'COFFEE-001',
    stock: 100,
    lowStockThreshold: 20,
    weight: 1.0,
    tags: ['coffee', 'premium', 'organic'],
    features: ['Single Origin', 'Medium Roast', 'Fair Trade'],
    images: [{
      url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
      alt: 'Premium Coffee Beans'
    }],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'ARTISAN TEA COLLECTION',
    description: 'Curated collection of premium teas from around the world',
    price: 59.99,
    category: 'Food',
    subcategory: 'Tea',
    brand: 'TeaMaster',
    sku: 'TEA-001',
    stock: 75,
    lowStockThreshold: 15,
    weight: 0.8,
    tags: ['tea', 'collection', 'artisan'],
    features: ['5 Different Varieties', 'Premium Quality', 'Gift Box Included'],
    images: [{
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      alt: 'Artisan Tea Collection'
    }],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'THE ART OF PROGRAMMING',
    description: 'Comprehensive guide to modern programming techniques',
    price: 49.99,
    category: 'Books',
    subcategory: 'Technology',
    brand: 'TechBooks',
    sku: 'BOOK-001',
    stock: 30,
    lowStockThreshold: 5,
    weight: 0.6,
    tags: ['programming', 'book', 'education'],
    features: ['500+ Pages', 'Code Examples', 'Digital Access Included'],
    images: [{
      url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop',
      alt: 'Programming Book'
    }],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'WIRELESS GAMING MOUSE',
    description: 'High-precision wireless gaming mouse with RGB lighting',
    price: 89.99,
    category: 'Electronics',
    subcategory: 'Gaming',
    brand: 'GameTech',
    sku: 'MOUSE-001',
    stock: 40,
    lowStockThreshold: 8,
    weight: 0.2,
    tags: ['gaming', 'mouse', 'wireless'],
    features: ['RGB Lighting', 'High DPI', 'Ergonomic Design'],
    images: [{
      url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      alt: 'Wireless Gaming Mouse'
    }],
    isActive: true,
    isFeatured: false
  },
  {
    name: 'SMART FITNESS WATCH',
    description: 'Advanced fitness tracking watch with heart rate monitor',
    price: 199.99,
    category: 'Electronics',
    subcategory: 'Wearables',
    brand: 'FitTech',
    sku: 'WATCH-001',
    stock: 25,
    lowStockThreshold: 5,
    weight: 0.1,
    tags: ['fitness', 'smartwatch', 'health'],
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant'],
    images: [{
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      alt: 'Smart Fitness Watch'
    }],
    isActive: true,
    isFeatured: false
  }
];

async function addSampleProducts() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Add sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Added ${products.length} sample products`);

    console.log('Sample products added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample products:', error);
    process.exit(1);
  }
}

addSampleProducts();
