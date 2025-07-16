'use client';

import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

interface StripeCheckoutFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  total: number;
}

const StripeCheckoutForm = ({ 
  onSuccess, 
  onError, 
  isLoading, 
  setIsLoading, 
  total 
}: StripeCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      onError(error.message || 'An unexpected error occurred.');
    } else {
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Nike-Style Payment Header */}
      <div className="text-center">
        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wide mb-2">
          Payment Details
        </h3>
        <p className="text-gray-600 font-medium">
          Secure payment powered by Stripe
        </p>
        <div className="w-16 h-1 bg-black mx-auto mt-4"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Stripe Payment Element */}
        <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-100">
          <PaymentElement 
            options={{
              layout: 'tabs',
              defaultValues: {
                billingDetails: {
                  name: '',
                  email: '',
                }
              }
            }}
          />
        </div>

        {/* Nike-Style Submit Button */}
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 uppercase tracking-wide"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Processing Payment...
            </div>
          ) : (
            `Complete Order - ${formatPrice(total)}`
          )}
        </button>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StripeCheckoutForm;
