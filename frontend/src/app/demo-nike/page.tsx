'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NikeDemoPage() {
  const [selectedImage, setSelectedImage] = useState(0);

  // Demo product data - Your actual product structure
  const product = {
    name: "Premium Wireless Headphones",
    category: "Electronics",
    description: "Experience crystal-clear sound with our premium wireless headphones featuring advanced noise cancellation technology.",
    price: 299,
    comparePrice: 399,
    stock: 15,
    images: [
      { url: '/placeholder-headphones.jpg', alt: 'Premium Wireless Headphones - Main View' },
      { url: '/placeholder-headphones-2.jpg', alt: 'Premium Wireless Headphones - Side View' },
      { url: '/placeholder-headphones-3.jpg', alt: 'Premium Wireless Headphones - Case View' },
    ],
    features: [
      'Active noise cancellation',
      '30-hour battery life',
      'Premium leather headband',
      'Wireless charging case',
      'Hi-Fi audio quality'
    ],
    rating: 4.8,
    numReviews: 127
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          } fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section - Exact Nike Air Jordan 40 Style */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Large Product Image - Centered and Angled */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="relative w-[600px] h-[400px] transform -rotate-12 opacity-80">
            {/* Placeholder product image */}
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <p className="text-sm opacity-75">Your Product Here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Overlay - Exact Nike Layout */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          {/* Large Product Name - Nike Style with Line Breaks */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter mb-4 leading-none text-white drop-shadow-lg">
            {product.name.split(' ').map((word, index) => (
              <div key={index} className="block">
                {word}
              </div>
            ))}
          </h1>

          {/* Tagline - Nike Style */}
          <p className="text-xl md:text-2xl font-medium text-white mb-12 tracking-wide">
            Never been done is what we do.
          </p>

          {/* Horizontal Line - Nike Style */}
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
        </div>

        {/* Bottom Navigation Dots - Nike Style */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-3">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedImage === index ? 'bg-white' : 'bg-white bg-opacity-40 hover:bg-opacity-70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Hero Section - Product Info */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Product Category */}
          <div className="mb-6">
            <span className="text-sm font-bold tracking-widest uppercase text-gray-600">
              {product.category}
            </span>
          </div>

          {/* Product Description */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-3xl md:text-4xl font-bold text-black">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
          </div>

          {/* CTA Buttons - Nike Style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <button className="bg-black text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 min-w-[220px]">
              Add to Bag
            </button>
            <button className="border-2 border-black text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 min-w-[220px]">
              Favorite
            </button>
          </div>

          {/* Stock Status */}
          <div className="text-sm text-gray-600">
            <span className="text-green-600">
              {product.stock} in stock
            </span>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4"></div>
                  <p>Product Image Placeholder</p>
                </div>
              </div>
              
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {[1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index - 1)}
                    className={`relative h-20 w-20 rounded-xl overflow-hidden border-3 transition-all duration-200 bg-gray-100 ${
                      selectedImage === index - 1 ? 'border-black scale-105' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-500">{index}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="ml-3 text-gray-600">
                    ({product.numReviews} reviews)
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  Quantity
                </label>
                <select className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 text-lg font-medium focus:border-black focus:ring-0 transition-colors">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
