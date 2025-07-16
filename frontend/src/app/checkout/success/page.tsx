'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'succeeded' | 'failed'>('loading');

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const redirectStatus = searchParams.get('redirect_status');

    if (redirectStatus === 'succeeded') {
      setPaymentStatus('succeeded');
    } else if (redirectStatus === 'failed') {
      setPaymentStatus('failed');
    } else {
      // Check payment status with Stripe
      setPaymentStatus('succeeded'); // For demo purposes
    }
  }, [searchParams]);

  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <Navbar />
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold">Processing your payment...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black">
        <Navbar />
        <div className="relative min-h-screen flex items-center justify-center p-6">
          <div className="text-center text-white max-w-lg">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
              <div className="block">PAYMENT</div>
              <div className="block">FAILED</div>
            </h1>
            <p className="text-xl font-medium text-gray-300 mb-8 tracking-wide">
              Something went wrong with your payment. Please try again.
            </p>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 uppercase tracking-wide"
              >
                Try Again
              </button>
              <Link
                href="/cart"
                className="block w-full border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 uppercase tracking-wide text-center"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black">
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="text-center text-white max-w-lg">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
            <div className="block">ORDER</div>
            <div className="block">CONFIRMED</div>
          </h1>
          
          <p className="text-xl font-medium text-gray-300 mb-8 tracking-wide">
            Thank you for your purchase! Your order has been successfully placed.
          </p>
          
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          
          <div className="bg-white bg-opacity-10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">What's Next?</h3>
            <ul className="text-left space-y-2 text-gray-300">
              <li>• You'll receive an email confirmation shortly</li>
              <li>• We'll send tracking information when your order ships</li>
              <li>• Estimated delivery: 3-5 business days</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/orders"
              className="block w-full bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 uppercase tracking-wide"
            >
              View Your Orders
            </Link>
            <Link
              href="/products"
              className="block w-full border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 uppercase tracking-wide"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
