# Backend Deployment Guide

## Railway Deployment

### Prerequisites
1. Create a [Railway](https://railway.app) account
2. Set up a MongoDB Atlas database
3. Have your GitHub repository ready

### Step 1: Deploy to Railway

1. **Go to [Railway](https://railway.app)**
2. **Click "Start a New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your `ecommerce-platform` repository**
5. **Select the `backend` folder as the root directory**

### Step 2: Configure Environment Variables

In Railway dashboard, go to your project → Variables tab and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NODE_ENV=production
PORT=5000
CORS_ORIGINS=https://your-netlify-domain.netlify.app
```

### Step 3: MongoDB Atlas Setup

1. **Go to [MongoDB Atlas](https://cloud.mongodb.com)**
2. **Create a free cluster**
3. **Create a database user**
4. **Whitelist Railway's IP addresses (or use 0.0.0.0/0 for all IPs)**
5. **Get your connection string**

### Step 4: Update Frontend

After deployment, update your frontend's `NEXT_PUBLIC_API_URL` in Netlify:
```
NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app/api
```

### Step 5: Test Deployment

Your API will be available at:
```
https://your-railway-app.railway.app/api
```

Test endpoints:
- GET `/api/products` - Get all products
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

## Alternative: Render Deployment

If you prefer Render:

1. **Go to [Render](https://render.com)**
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Set root directory to `backend`**
5. **Set build command: `npm install`**
6. **Set start command: `npm start`**
7. **Add environment variables as above**

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `super-secret-key-123` |
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `5000` |
| `CORS_ORIGINS` | Allowed origins | `https://yourapp.netlify.app` |

## Troubleshooting

### Common Issues:
1. **MongoDB connection fails**: Check connection string and IP whitelist
2. **CORS errors**: Ensure frontend domain is in CORS_ORIGINS
3. **JWT errors**: Make sure JWT_SECRET is set and secure
4. **Port issues**: Railway automatically assigns PORT, don't hardcode it

### Logs:
- Railway: Check the "Deployments" tab for build logs
- Runtime logs: Check the "Logs" tab in Railway dashboard
