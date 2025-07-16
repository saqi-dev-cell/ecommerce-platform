'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CartPage() {
  const {
    cart,
    isLoading,
    error,
    updateCartItem,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    clearError
  } = useCart();

  const { showSuccess, showError } = useToast();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      setUpdatingItems(prev => new Set(prev).add(productId));
      await updateCartItem(productId, newQuantity);
      showSuccess('Cart updated successfully');
    } catch (error: any) {
      showError(error.response?.data?.message || 'Failed to update cart');
      console.error('Error updating quantity:', error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!confirm('Are you sure you want to remove this item from your cart?')) {
      return;
    }

    try {
      setUpdatingItems(prev => new Set(prev).add(productId));
      await removeFromCart(productId);
      showSuccess('Item removed from cart');
    } catch (error: any) {
      showError(error.response?.data?.message || 'Failed to remove item');
      console.error('Error removing item:', error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleClearCart = async () => {
    if (!confirm('Are you sure you want to clear your entire cart?')) {
      return;
    }

    try {
      await clearCart();
      showSuccess('Cart cleared successfully');
    } catch (error: any) {
      showError(error.response?.data?.message || 'Failed to clear cart');
      console.error('Error clearing cart:', error);
    }
  };

  if (isLoading && !cart) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <LoadingSpinner size="xl" color="white" />
              <p className="mt-4 text-white text-lg">Loading your bag...</p>
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

      {/* Nike-Style Hero Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-4 leading-none">
              YOUR BAG
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} ready to go
            </p>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

      <main className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

          {error && (
            <div className="mb-8 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{error}</span>
                <button
                  onClick={clearError}
                  className="text-red-500 hover:text-red-700 font-bold text-xl"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {!cart || cart.items.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-6">
                  <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your bag is empty</h3>
                <p className="text-gray-600 mb-8 text-lg">Start shopping to add items to your bag</p>
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-4 bg-black text-white font-bold text-lg rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 uppercase tracking-wide"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="px-6 py-6 flex justify-between items-center border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Bag Items</h2>
                    <button
                      onClick={handleClearCart}
                      className="text-sm font-bold text-red-600 hover:text-red-800 uppercase tracking-wide px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      Clear Bag
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {cart.items.map((item) => (
                      <div key={item._id} className="px-6 py-8 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                          <div className="flex-shrink-0 h-20 w-20 sm:h-24 sm:w-24 relative mx-auto sm:mx-0">
                            <Image
                              src={item.product.images[0]?.url || '/placeholder-image.jpg'}
                              alt={item.product.name}
                              fill
                              className="object-cover rounded-xl shadow-md"
                            />
                          </div>

                          <div className="flex-1 text-center sm:text-left">
                            <div className="flex flex-col space-y-4">
                              <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                  <Link
                                    href={`/products/${item.product._id}`}
                                    className="hover:text-black transition-colors"
                                  >
                                    {item.product.name}
                                  </Link>
                                </h3>
                                <p className="text-gray-600 font-medium">
                                  {formatPrice(item.price)} each
                                </p>
                              </div>

                              <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-center sm:justify-start space-x-3">
                                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Qty:</span>
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                      disabled={item.quantity <= 1 || updatingItems.has(item.product._id)}
                                      className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                      -
                                    </button>

                                    <span className="w-16 text-center font-bold text-lg">
                                      {updatingItems.has(item.product._id) ? (
                                        <LoadingSpinner size="sm" className="mx-auto" />
                                      ) : (
                                        item.quantity
                                      )}
                                    </span>

                                    <button
                                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                      disabled={updatingItems.has(item.product._id)}
                                      className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="text-xl font-bold text-black">
                                    {formatPrice(item.price * item.quantity)}
                                  </div>

                                  <button
                                    onClick={() => handleRemoveItem(item.product._id)}
                                    disabled={updatingItems.has(item.product._id)}
                                    className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full hover:bg-red-50 transition-colors"
                                  >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-black text-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
                  <div className="px-6 py-6">
                    <h2 className="text-2xl font-bold uppercase tracking-wide">Order Summary</h2>
                  </div>

                  <div className="px-6 py-6 bg-gray-900">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">Subtotal ({getTotalItems()} items)</span>
                        <span className="font-bold text-lg">{formatPrice(getTotalPrice())}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">Shipping</span>
                        <span className="font-bold text-lg">
                          {getTotalPrice() > 100 ? (
                            <span className="text-green-400">Free</span>
                          ) : (
                            formatPrice(10)
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">Tax</span>
                        <span className="font-bold text-lg">{formatPrice(getTotalPrice() * 0.08)}</span>
                      </div>

                      <div className="border-t border-gray-700 pt-6">
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span>Total</span>
                          <span>
                            {formatPrice(
                              getTotalPrice() +
                              (getTotalPrice() > 100 ? 0 : 10) +
                              (getTotalPrice() * 0.08)
                            )}
                          </span>
                        </div>
                      </div>

                      {getTotalPrice() <= 100 && (
                        <div className="bg-yellow-500 text-black px-4 py-3 rounded-xl">
                          <p className="text-sm font-bold">
                            Add {formatPrice(100 - getTotalPrice())} more for free shipping!
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 space-y-4">
                      <Link
                        href="/checkout"
                        className="w-full bg-white text-black py-4 px-6 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center block font-bold text-lg uppercase tracking-wide"
                      >
                        Checkout
                      </Link>

                      <Link
                        href="/products"
                        className="w-full bg-transparent border-2 border-white text-white py-4 px-6 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 text-center block font-bold text-lg uppercase tracking-wide"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
