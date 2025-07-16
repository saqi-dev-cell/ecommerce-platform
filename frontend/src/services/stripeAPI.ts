import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
  cartItems: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  paymentMethodId: string;
}

export const stripeAPI = {
  // Create payment intent
  createPaymentIntent: async (data: CreatePaymentIntentRequest): Promise<PaymentIntent> => {
    const response = await axios.post(`${API_BASE_URL}/stripe/create-payment-intent`, data);
    return response.data;
  },

  // Confirm payment
  confirmPayment: async (data: ConfirmPaymentRequest): Promise<PaymentIntent> => {
    const response = await axios.post(`${API_BASE_URL}/stripe/confirm-payment`, data);
    return response.data;
  },

  // Get payment intent
  getPaymentIntent: async (paymentIntentId: string): Promise<PaymentIntent> => {
    const response = await axios.get(`${API_BASE_URL}/stripe/payment-intent/${paymentIntentId}`);
    return response.data;
  },

  // Calculate shipping
  calculateShipping: async (address: any): Promise<{ cost: number; methods: any[] }> => {
    const response = await axios.post(`${API_BASE_URL}/stripe/calculate-shipping`, { address });
    return response.data;
  },

  // Apply coupon
  applyCoupon: async (code: string, amount: number): Promise<{ discount: number; valid: boolean }> => {
    const response = await axios.post(`${API_BASE_URL}/stripe/apply-coupon`, { code, amount });
    return response.data;
  },
};

export default stripeAPI;
