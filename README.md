# 🛒 E-Commerce Platform

A full-stack e-commerce platform built with Next.js, Node.js, Express, and MongoDB. Features a modern Nike-inspired design with complete shopping functionality.

## 🚀 Features

### 🛍️ Customer Features
- **Product Browsing** - Browse products with detailed views
- **Shopping Cart** - Add/remove items, quantity management
- **User Authentication** - Register, login, profile management
- **Order Management** - Place orders, view order history, cancel orders
- **Wishlist** - Save favorite products
- **Responsive Design** - Mobile-friendly Nike-inspired UI

### 👨‍💼 Admin Features
- **Product Management** - Add, edit, delete products
- **Order Management** - View all orders, update order status
- **User Management** - View customer information
- **Dashboard** - Sales overview and analytics

### 🔧 Technical Features
- **JWT Authentication** - Secure user sessions
- **Image Upload** - Product image management
- **Order Tracking** - Real-time order status updates
- **Stock Management** - Automatic inventory updates
- **Search & Filter** - Product search functionality
- **Payment Ready** - Stripe integration ready

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/saqi-dev-cell/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env.local file
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 4. Database Setup
- Start MongoDB service
- The application will create necessary collections automatically

### 5. Run the Application

**Backend (Port 5000):**
```bash
cd backend
npm run dev
```

**Frontend (Port 3001):**
```bash
cd frontend
npm run dev
```

## 🔧 Configuration

### Backend Environment Variables (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d
```

### Frontend Environment Variables (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📱 Usage

### Customer Flow
1. **Browse Products** - Visit homepage to see featured products
2. **Product Details** - Click on products for detailed information
3. **Add to Cart** - Add desired items to shopping cart
4. **Checkout** - Complete purchase with shipping information
5. **Order Tracking** - View order status and history

### Admin Flow
1. **Admin Login** - Use admin credentials (email: admin, password: admin123)
2. **Dashboard** - Access admin panel for management
3. **Product Management** - Add/edit products and inventory
4. **Order Management** - Process and update order status

## 🎨 Design System

The platform features a Nike-inspired design with:
- **Bold Typography** - Strong, athletic-inspired fonts
- **Dark Theme** - Professional black and gray color scheme
- **Responsive Layout** - Mobile-first design approach
- **Smooth Animations** - Engaging user interactions
- **Modern UI Components** - Clean, minimalist interface

## 🔐 Default Admin Credentials
- **Email:** admin
- **Password:** admin123

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)

### Order Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order

## 🚀 Deployment

### Quick Deploy to Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/saqi-dev-cell/ecommerce-platform)

### Frontend Deployment (Netlify)
1. **Automatic:** Click the "Deploy to Netlify" button above
2. **Manual:**
   - Connect your GitHub repository to Netlify
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/out`
   - Set environment variable: `NEXT_PUBLIC_API_URL`

### Backend Deployment
1. Set production environment variables
2. Deploy to platforms like Railway, Heroku, or DigitalOcean
3. Configure MongoDB Atlas for production database
4. Update CORS settings for your frontend domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Saqlain Kharal**
- GitHub: [@saqi-dev-cell](https://github.com/saqi-dev-cell)
- Email: saqlainkharal39@gmail.com

## 🙏 Acknowledgments

- Nike for design inspiration
- Next.js team for the amazing framework
- MongoDB for the flexible database solution
- All contributors and testers

---

⭐ **Star this repository if you found it helpful!**
