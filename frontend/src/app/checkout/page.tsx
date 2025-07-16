'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { ordersAPI } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';


interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery'>('cash_on_delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const calculateTotals = () => {
    const subtotal = getTotalPrice();
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cart || cart.items.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    // Basic validation
    const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field as keyof ShippingAddress]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Prepare cart items for the order
      const cartItems = cart.items.map(item => ({
        product: {
          _id: item.product._id
        },
        quantity: item.quantity,
        price: item.price
      }));

      const orderData = {
        shippingAddress,
        paymentMethod,
        cartItems
      };
      
      const { data } = await ordersAPI.createOrder(orderData);
      
      // Clear cart after successful order
      await clearCart();
      
      // Redirect to order confirmation
      router.push(`/orders/${data._id}`);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to place order');
      console.error('Error placing order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { subtotal, shipping, tax } = calculateTotals();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <Navbar />
        <div className="relative min-h-screen flex items-center justify-center p-6">
          <div className="text-center text-white max-w-lg">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
              <div className="block">YOUR</div>
              <div className="block">BAG</div>
              <div className="block">IS</div>
              <div className="block">EMPTY</div>
            </h1>
            <p className="text-xl font-medium text-gray-300 mb-8 tracking-wide">
              Add some items to your bag before checking out
            </p>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <button
              onClick={() => router.push('/products')}
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 uppercase tracking-wide"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* Nike-Style Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
            <div className="block">CHECKOUT</div>
          </h1>
          <p className="text-xl font-medium text-gray-300 tracking-wide">
            Complete your order and join the movement
          </p>
          <div className="w-24 h-1 bg-white mx-auto mt-6"></div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Nike-Style Shipping Information */}
              <div className="space-y-8">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-6">
                  <h2 className="text-2xl font-black text-white uppercase tracking-wide">Shipping Info</h2>
                  <p className="text-gray-300 font-medium mt-2">Where should we send your order?</p>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        value={shippingAddress.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        required
                        value={shippingAddress.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                        placeholder="Enter your street address"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="city" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          required
                          value={shippingAddress.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                          placeholder="City"
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          required
                          value={shippingAddress.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                          placeholder="State"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          id="zipCode"
                          required
                          value={shippingAddress.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                          placeholder="ZIP Code"
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                          Country
                        </label>
                        <select
                          name="country"
                          id="country"
                          value={shippingAddress.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-black transition-colors"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                        placeholder="Phone number (optional)"
                      />
                    </div>
                  </div>
                </div>
                </div>

                {/* Nike-Style Payment Method */}
                <div className="border-t-2 border-gray-100 pt-6">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-wide mb-6">Payment Method</h3>

                  <div className="space-y-4">
                    <div className="flex items-center p-4 border-2 border-black rounded-xl bg-gray-50">
                      <input
                        id="cash_on_delivery"
                        name="paymentMethod"
                        type="radio"
                        value="cash_on_delivery"
                        checked={paymentMethod === 'cash_on_delivery'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cash_on_delivery')}
                        className="h-5 w-5 text-black border-2 border-gray-300 focus:ring-black focus:ring-2"
                      />
                      <label htmlFor="cash_on_delivery" className="ml-4 block font-bold text-gray-900">
                        💵 Cash on Delivery
                      </label>
                    </div>
                  </div>











                  {/* Nike-Style Place Order Button (for Cash on Delivery) */}
                  {paymentMethod === 'cash_on_delivery' && (
                    <div className="mt-8">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 uppercase tracking-wide"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Placing Order...
                          </div>
                        ) : (
                          `Place Order - ${formatPrice(calculateTotals().total)}`
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>



            {/* Nike-Style Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-6">
                  <h2 className="text-2xl font-black text-white uppercase tracking-wide">Your Bag</h2>
                  <p className="text-gray-300 font-medium mt-2">{getTotalItems()} items ready to ship</p>
                </div>

                <div className="p-6">
                  {/* Order Items */}
                  <div className="space-y-6">
                    {cart.items.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="flex-shrink-0 h-20 w-20 relative">
                          <Image
                            src={item.product.images[0]?.url || '/placeholder-image.jpg'}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-xl"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate text-lg">
                            {item.product.name}
                          </p>
                          <p className="text-gray-600 font-medium">
                            Qty: {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="text-xl font-black text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Nike-Style Totals */}
                  <div className="border-t-2 border-gray-100 pt-6 mt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600 font-medium">Subtotal ({getTotalItems()} items)</span>
                        <span className="font-bold">{formatPrice(subtotal)}</span>
                      </div>

                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600 font-medium">Shipping</span>
                        <span className="font-bold">
                          {shipping === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            formatPrice(shipping)
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600 font-medium">Tax</span>
                        <span className="font-bold">{formatPrice(tax)}</span>
                      </div>

                      <div className="border-t-2 border-black pt-4">
                        <div className="flex justify-between text-2xl font-black">
                          <span className="uppercase tracking-wide">Total</span>
                          <span>{formatPrice(calculateTotals().total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
        </main>
      </div>
    );
  }
