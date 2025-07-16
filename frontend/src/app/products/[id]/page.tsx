'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ImageZoom from '@/components/ui/ImageZoom';
import LoginPrompt from '@/components/ui/LoginPrompt';
import ProductRecommendations from '@/components/products/ProductRecommendations';
import { productsAPI } from '@/lib/api';
import { Product, Review } from '@/types';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { showSuccess, showError } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await productsAPI.getProduct(id as string);
        setProduct(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch product');
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = async () => {
    if (!product) return;

    // Check if user is authenticated first
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      setIsAddingToCart(true);
      await addToCart(product._id, quantity);
      showSuccess(`Added ${quantity} ${product.name} to cart!`);
    } catch (error: any) {
      const errorMessage = error.message || error.response?.data?.message || 'Failed to add item to cart';
      showError(errorMessage);
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value,
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    try {
      setIsSubmittingReview(true);
      setReviewError(null);
      
      await productsAPI.createReview(product?._id as string, {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      
      // Refresh product data to show the new review
      const response = await productsAPI.getProduct(id as string);
      setProduct(response.data);
      
      // Reset form
      setReviewForm({
        rating: 5,
        comment: '',
      });
    } catch (error: any) {
      setReviewError(error.response?.data?.message || 'Failed to submit review');
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <LoadingSpinner size="xl" />
              <p className="mt-4 text-gray-600">Loading product details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-md">
                <svg className="w-12 h-12 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="text-lg font-medium mb-2">Product Not Found</h3>
                <p className="mb-4">{error || 'The product you are looking for does not exist.'}</p>
                <Link
                  href="/products"
                  className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section - Exact Nike Style */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Large Product Image - Centered */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="relative w-[600px] h-[400px] transform -rotate-12 opacity-80">
            <Image
              src={product.images[selectedImage]?.url || '/placeholder-image.jpg'}
              alt={product.images[selectedImage]?.alt || product.name}
              fill
              className="object-contain filter drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          {/* Large Product Name - Nike Style */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter mb-4 leading-none text-white drop-shadow-lg">
            {product.name.split(' ').map((word, index) => (
              <div key={index} className="block">
                {word}
              </div>
            ))}
          </h1>

          {/* Tagline - Nike Style */}
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-8 sm:mb-12 tracking-wide">
            Never been done is what we do.
          </p>

          {/* Horizontal Line - Nike Style */}
          <div className="w-16 sm:w-24 h-1 bg-white mx-auto mb-6 sm:mb-8"></div>
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
            {product.stock > 0 ? (
              <>
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="bg-black text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[220px]"
                >
                  {isAddingToCart ? 'Adding...' : 'Add to Bag'}
                </button>
                <button className="border-2 border-black text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 min-w-[220px]">
                  Favorite
                </button>
              </>
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white px-12 py-4 rounded-full font-bold text-lg cursor-not-allowed min-w-[220px]"
              >
                Out of Stock
              </button>
            )}
          </div>

          {/* Stock Status */}
          <div className="text-sm text-gray-600">
            {product.stock > 0 ? (
              <span className={product.stock <= product.lowStockThreshold ? 'text-orange-600' : 'text-green-600'}>
                {product.stock} in stock
              </span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-gray-100">
                <ImageZoom
                  src={product.images[selectedImage]?.url || '/placeholder-image.jpg'}
                  alt={product.images[selectedImage]?.alt || product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 w-20 rounded-xl overflow-hidden border-3 transition-all duration-200 ${
                        selectedImage === index ? 'border-black scale-105' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || `${product.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
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

              {product.features.length > 0 && (
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
              )}

              {/* Quantity Selector - Styled for Nike theme */}
              {product.stock > 0 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 text-lg font-medium focus:border-black focus:ring-0 transition-colors"
                    >
                      {[...Array(Math.min(10, product.stock))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Customer Reviews</h2>

          {product.reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.reviews.map((review: Review) => (
                <div key={review._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-gray-900">{review.name}</div>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  <div className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No reviews yet. Be the first to review this product!</p>
            </div>
          )}

          {/* Review Form */}
          {isAuthenticated && (
            <div className="max-w-2xl mx-auto mt-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Write a Review</h3>

                {reviewError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
                    {reviewError}
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="rating" className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      Rating
                    </label>
                    <div className="flex items-center justify-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                          className="focus:outline-none transform hover:scale-110 transition-transform"
                        >
                          <svg
                            className={`h-8 w-8 ${
                              star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                            } fill-current`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comment" className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      Review
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={4}
                      value={reviewForm.comment}
                      onChange={handleReviewChange}
                      required
                      className="block w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                      placeholder="Write your review here..."
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="bg-black text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                    >
                      {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <ProductRecommendations
            currentProductId={product?._id || ''}
            category={product?.category || ''}
            title="You Might Also Like"
            limit={4}
          />
        </div>
      </div>

      <Footer />

      {/* Login Prompt Modal */}
      <LoginPrompt
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        message="You need to be logged in to add items to your cart"
        action="add items to cart"
      />
    </div>
  );
}
