const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const sampleProducts = [
  // ELECTRONICS - Audio
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 199.99,
    comparePrice: 249.99,
    category: "Electronics",
    subcategory: "Audio",
    brand: "TechSound",
    sku: "TS-WH-001",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        alt: "Wireless Bluetooth Headphones"
      }
    ],
    stock: 50,
    lowStockThreshold: 10,
    weight: 0.3,
    tags: ["wireless", "bluetooth", "headphones", "audio"],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge - 5 min for 2 hours",
      "Premium comfort design"
    ],
    specifications: [
      { name: "Battery Life", value: "30 hours" },
      { name: "Charging Time", value: "2 hours" },
      { name: "Weight", value: "300g" },
      { name: "Connectivity", value: "Bluetooth 5.0" }
    ],
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Premium Wireless Earbuds",
    description: "True wireless earbuds with premium sound quality and active noise cancellation. Perfect for workouts and daily use.",
    price: 149.99,
    comparePrice: 199.99,
    category: "Electronics",
    subcategory: "Audio",
    brand: "SoundPro",
    sku: "SP-WE-002",
    images: [
      {
        url: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500",
        alt: "Premium Wireless Earbuds"
      }
    ],
    stock: 75,
    lowStockThreshold: 15,
    weight: 0.05,
    tags: ["wireless", "earbuds", "bluetooth", "sports"],
    features: [
      "Active Noise Cancellation",
      "6-hour battery + 24h case",
      "IPX7 Water Resistant",
      "Touch controls"
    ],
    specifications: [
      { name: "Battery Life", value: "6+24 hours" },
      { name: "Water Resistance", value: "IPX7" },
      { name: "Weight", value: "50g" },
      { name: "Connectivity", value: "Bluetooth 5.2" }
    ],
    isActive: true,
    isFeatured: true,
    rating: 4.6,
    numReviews: 0,
    reviews: []
  },
  // ELECTRONICS - Smartphones & Tablets
  {
    name: "Smartphone Pro Max 256GB",
    description: "Latest flagship smartphone with advanced camera system, 5G connectivity, and all-day battery life.",
    price: 999.99,
    comparePrice: 1099.99,
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "TechMax",
    sku: "TM-SP-003",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        alt: "Smartphone Pro Max"
      }
    ],
    stock: 30,
    lowStockThreshold: 5,
    weight: 0.2,
    tags: ["smartphone", "5g", "camera", "flagship"],
    features: [
      "Triple camera system",
      "5G connectivity",
      "Face ID & Touch ID",
      "Wireless charging"
    ],
    specifications: [
      { name: "Storage", value: "256GB" },
      { name: "Display", value: "6.7 inch OLED" },
      { name: "Camera", value: "48MP Triple" },
      { name: "Battery", value: "4000mAh" }
    ],
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Gaming Laptop RTX 4060",
    description: "High-performance gaming laptop with RTX 4060 graphics, 16GB RAM, and 144Hz display for ultimate gaming experience.",
    price: 1299.99,
    comparePrice: 1499.99,
    category: "Electronics",
    subcategory: "Computers",
    brand: "GameForce",
    sku: "GF-GL-004",
    images: [
      {
        url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
        alt: "Gaming Laptop"
      }
    ],
    stock: 15,
    lowStockThreshold: 3,
    weight: 2.5,
    tags: ["gaming", "laptop", "rtx", "high-performance"],
    features: [
      "NVIDIA RTX 4060 Graphics",
      "16GB DDR5 RAM",
      "144Hz Display",
      "RGB Backlit Keyboard"
    ],
    specifications: [
      { name: "Processor", value: "Intel i7-13700H" },
      { name: "Graphics", value: "RTX 4060 8GB" },
      { name: "RAM", value: "16GB DDR5" },
      { name: "Storage", value: "1TB NVMe SSD" }
    ],
    isActive: true,
    isFeatured: true,
    rating: 4.7,
    numReviews: 0,
    reviews: []
  },

  // CLOTHING - Men's
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.",
    price: 29.99,
    category: "Clothing",
    subcategory: "T-Shirts",
    brand: "EcoWear",
    sku: "EW-TS-005",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        alt: "Organic Cotton T-Shirt"
      }
    ],
    stock: 100,
    lowStockThreshold: 20,
    weight: 0.2,
    tags: ["organic", "cotton", "t-shirt", "sustainable"],
    features: [
      "100% Organic Cotton",
      "Pre-shrunk fabric",
      "Comfortable fit",
      "Machine washable"
    ],
    specifications: [
      { name: "Material", value: "100% Organic Cotton" },
      { name: "Care", value: "Machine wash cold" },
      { name: "Fit", value: "Regular" }
    ],
    isActive: true,
    isFeatured: false,
    rating: 4.2,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Premium Denim Jeans",
    description: "Classic straight-fit denim jeans made from premium cotton blend. Timeless style with modern comfort.",
    price: 89.99,
    comparePrice: 120.00,
    category: "Clothing",
    subcategory: "Jeans",
    brand: "DenimCraft",
    sku: "DC-DJ-006",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        alt: "Premium Denim Jeans"
      }
    ],
    stock: 60,
    lowStockThreshold: 12,
    weight: 0.6,
    tags: ["denim", "jeans", "premium", "classic"],
    features: [
      "Premium cotton blend",
      "Straight fit design",
      "Reinforced stitching",
      "Classic 5-pocket style"
    ],
    specifications: [
      { name: "Material", value: "98% Cotton, 2% Elastane" },
      { name: "Fit", value: "Straight" },
      { name: "Rise", value: "Mid-rise" },
      { name: "Care", value: "Machine wash cold" }
    ],
    isActive: true,
    isFeatured: false,
    rating: 4.4,
    numReviews: 0,
    reviews: []
  },
  // SPORTS & FITNESS
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking watch with heart rate monitor, GPS, and smartphone connectivity.",
    price: 299.99,
    comparePrice: 349.99,
    category: "Sports",
    subcategory: "Wearables",
    brand: "FitTech",
    sku: "FT-SW-007",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        alt: "Smart Fitness Watch"
      }
    ],
    stock: 25,
    lowStockThreshold: 5,
    weight: 0.1,
    tags: ["smartwatch", "fitness", "gps", "health"],
    features: [
      "Heart Rate Monitor",
      "Built-in GPS",
      "Water resistant",
      "7-day battery life",
      "Sleep tracking"
    ],
    specifications: [
      { name: "Display", value: "1.4 inch AMOLED" },
      { name: "Battery", value: "7 days" },
      { name: "Water Resistance", value: "50m" },
      { name: "Connectivity", value: "Bluetooth, WiFi" }
    ],
    isActive: true,
    isFeatured: true,
    rating: 4.7,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Professional Running Shoes",
    description: "High-performance running shoes with advanced cushioning and breathable mesh upper. Perfect for long-distance running.",
    price: 159.99,
    comparePrice: 199.99,
    category: "Sports",
    subcategory: "Footwear",
    brand: "RunMax",
    sku: "RM-RS-008",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        alt: "Professional Running Shoes"
      }
    ],
    stock: 40,
    lowStockThreshold: 8,
    weight: 0.3,
    tags: ["running", "shoes", "sports", "performance"],
    features: [
      "Advanced cushioning system",
      "Breathable mesh upper",
      "Lightweight design",
      "Durable rubber outsole"
    ],
    specifications: [
      { name: "Weight", value: "300g per shoe" },
      { name: "Drop", value: "10mm" },
      { name: "Upper", value: "Breathable mesh" },
      { name: "Sole", value: "Rubber compound" }
    ],
    isActive: true,
    isFeatured: true,
    rating: 4.6,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Yoga Mat Premium",
    description: "Extra-thick premium yoga mat with superior grip and cushioning. Perfect for all types of yoga and fitness exercises.",
    price: 49.99,
    category: "Sports",
    subcategory: "Fitness Equipment",
    brand: "ZenFit",
    sku: "ZF-YM-009",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
        alt: "Yoga Mat Premium"
      }
    ],
    stock: 80,
    lowStockThreshold: 15,
    weight: 1.2,
    tags: ["yoga", "mat", "fitness", "exercise"],
    features: [
      "6mm extra-thick cushioning",
      "Non-slip surface",
      "Eco-friendly materials",
      "Easy to clean"
    ],
    specifications: [
      { name: "Thickness", value: "6mm" },
      { name: "Dimensions", value: "183cm x 61cm" },
      { name: "Material", value: "TPE" },
      { name: "Weight", value: "1.2kg" }
    ],
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    numReviews: 0,
    reviews: []
  },
  // HOME & GARDEN
  {
    name: "Smart Home Security Camera",
    description: "Wireless security camera with 4K recording, night vision, and smartphone alerts. Keep your home safe 24/7.",
    price: 179.99,
    comparePrice: 229.99,
    category: "Home & Garden",
    subcategory: "Security",
    brand: "SecureHome",
    sku: "SH-SC-010",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        alt: "Smart Security Camera"
      }
    ],
    stock: 35,
    lowStockThreshold: 7,
    weight: 0.4,
    tags: ["security", "camera", "smart-home", "wireless"],
    features: [
      "4K Ultra HD recording",
      "Night vision capability",
      "Motion detection alerts",
      "Two-way audio"
    ],
    specifications: [
      { name: "Resolution", value: "4K Ultra HD" },
      { name: "Storage", value: "Cloud & Local" },
      { name: "Connectivity", value: "WiFi" },
      { name: "Power", value: "Battery/Wired" }
    ],
    isActive: true,
    isFeatured: true,
    rating: 4.4,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Ceramic Plant Pot Set",
    description: "Beautiful set of 3 ceramic plant pots with drainage holes and saucers. Perfect for indoor plants and herbs.",
    price: 39.99,
    category: "Home & Garden",
    subcategory: "Garden",
    brand: "GreenThumb",
    sku: "GT-PP-011",
    images: [
      {
        url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
        alt: "Ceramic Plant Pot Set"
      }
    ],
    stock: 90,
    lowStockThreshold: 18,
    weight: 1.5,
    tags: ["plants", "pots", "ceramic", "garden"],
    features: [
      "Set of 3 different sizes",
      "Drainage holes included",
      "Matching saucers",
      "Modern minimalist design"
    ],
    specifications: [
      { name: "Material", value: "High-quality ceramic" },
      { name: "Sizes", value: "Small, Medium, Large" },
      { name: "Color", value: "White/Natural" },
      { name: "Drainage", value: "Yes" }
    ],
    isActive: true,
    isFeatured: false,
    rating: 4.3,
    numReviews: 0,
    reviews: []
  },

  // BEAUTY
  {
    name: "Organic Skincare Set",
    description: "Complete organic skincare routine with cleanser, toner, serum, and moisturizer. Natural ingredients for healthy skin.",
    price: 89.99,
    comparePrice: 120.00,
    category: "Beauty",
    subcategory: "Skincare",
    brand: "PureGlow",
    sku: "PG-SS-012",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
        alt: "Organic Skincare Set"
      }
    ],
    stock: 45,
    lowStockThreshold: 9,
    weight: 0.6,
    tags: ["skincare", "organic", "beauty", "natural"],
    features: [
      "4-step skincare routine",
      "100% organic ingredients",
      "Suitable for all skin types",
      "Cruelty-free"
    ],
    specifications: [
      { name: "Set Includes", value: "Cleanser, Toner, Serum, Moisturizer" },
      { name: "Skin Type", value: "All types" },
      { name: "Ingredients", value: "100% Organic" },
      { name: "Volume", value: "50ml each" }
    ],
    isActive: true,
    isFeatured: true,
    rating: 4.7,
    numReviews: 0,
    reviews: []
  },

  // BOOKS
  {
    name: "The Art of Programming",
    description: "Comprehensive guide to modern programming techniques and best practices. Perfect for developers of all levels.",
    price: 49.99,
    category: "Books",
    subcategory: "Technology",
    brand: "TechBooks",
    sku: "TB-AP-013",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
        alt: "Programming Book"
      }
    ],
    stock: 120,
    lowStockThreshold: 25,
    weight: 0.8,
    tags: ["programming", "technology", "education", "development"],
    features: [
      "500+ pages of content",
      "Real-world examples",
      "Multiple programming languages",
      "Expert author"
    ],
    specifications: [
      { name: "Pages", value: "512" },
      { name: "Format", value: "Paperback" },
      { name: "Language", value: "English" },
      { name: "Publisher", value: "TechBooks Publishing" }
    ],
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    numReviews: 0,
    reviews: []
  },

  // FOOD & BEVERAGES
  {
    name: "Premium Coffee Beans",
    description: "Single-origin arabica coffee beans, medium roast. Perfect for espresso and drip coffee.",
    price: 24.99,
    category: "Other",
    subcategory: "Food & Beverages",
    brand: "RoastMaster",
    sku: "RM-CB-014",
    images: [
      {
        url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500",
        alt: "Premium Coffee Beans"
      }
    ],
    stock: 75,
    lowStockThreshold: 15,
    weight: 0.5,
    tags: ["coffee", "arabica", "medium-roast", "premium"],
    features: [
      "Single-origin beans",
      "Medium roast",
      "Freshly roasted",
      "Resealable bag"
    ],
    specifications: [
      { name: "Origin", value: "Colombia" },
      { name: "Roast Level", value: "Medium" },
      { name: "Weight", value: "500g" },
      { name: "Bean Type", value: "Arabica" }
    ],
    isActive: true,
    isFeatured: false,
    rating: 4.3,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Artisan Tea Collection",
    description: "Premium collection of 12 different artisan teas from around the world. Perfect for tea enthusiasts.",
    price: 59.99,
    category: "Other",
    subcategory: "Food & Beverages",
    brand: "TeaMaster",
    sku: "TM-TC-015",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
        alt: "Artisan Tea Collection"
      }
    ],
    stock: 50,
    lowStockThreshold: 10,
    weight: 0.6,
    tags: ["tea", "artisan", "collection", "premium"],
    features: [
      "12 different tea varieties",
      "Premium loose leaf",
      "Beautiful gift packaging",
      "Tasting notes included"
    ],
    specifications: [
      { name: "Varieties", value: "12 different teas" },
      { name: "Type", value: "Loose leaf" },
      { name: "Origin", value: "Various countries" },
      { name: "Total Weight", value: "600g" }
    ],
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    numReviews: 0,
    reviews: []
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Create a default admin user
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    let adminId;
    
    if (!adminUser) {
      const newAdmin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
      const savedAdmin = await newAdmin.save();
      adminId = savedAdmin._id;
      console.log('Admin user created');
    } else {
      adminId = adminUser._id;
      console.log('Admin user already exists');
    }
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');
    
    // Add createdBy field to sample products
    const productsWithCreator = sampleProducts.map(product => ({
      ...product,
      createdBy: adminId
    }));
    
    // Insert sample products
    await Product.insertMany(productsWithCreator);
    console.log('Sample products added');
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
