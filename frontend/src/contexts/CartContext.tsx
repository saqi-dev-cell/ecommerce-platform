'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartAPI } from '@/lib/api';
import { Cart, CartItem } from '@/types';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize cart when user becomes authenticated or load from local storage for guests
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      refreshCart();
    } else if (!authLoading && !isAuthenticated) {
      // Load cart from local storage for guest users
      const localCart = localStorage.getItem('guestCart');
      if (localCart) {
        try {
          setCart(JSON.parse(localCart));
        } catch (e) {
          localStorage.removeItem('guestCart');
          setCart({ items: [], totalItems: 0, totalPrice: 0 } as Cart);
        }
      } else {
        setCart({ items: [], totalItems: 0, totalPrice: 0 } as Cart);
      }
      setError(null);
    }
  }, [isAuthenticated, authLoading]);

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const { data } = await cartAPI.getCart();
      setCart(data);
    } catch (error: any) {
      // Handle authentication errors gracefully
      if (error.response?.status === 401) {
        setCart(null);
        setError(null); // Don't show error for unauthenticated users
      } else {
        setError(error.response?.data?.message || 'Failed to fetch cart');
        console.error('Error fetching cart:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      setIsLoading(true);
      setError(null);

      if (isAuthenticated) {
        // Use backend API for authenticated users
        const { data } = await cartAPI.addToCart(productId, quantity);
        setCart(data);
      } else {
        // Use local storage for guest users
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
        const productData = await response.json();
        const product = productData.data;

        const currentCart = cart || { items: [], totalItems: 0, totalPrice: 0 };
        const existingItemIndex = currentCart.items.findIndex(item => item.product._id === productId);

        let updatedItems;
        if (existingItemIndex >= 0) {
          updatedItems = [...currentCart.items];
          updatedItems[existingItemIndex].quantity += quantity;
        } else {
          updatedItems = [...currentCart.items, {
            product,
            quantity,
            price: product.price,
            _id: Date.now().toString()
          }];
        }

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const updatedCart = {
          ...currentCart,
          items: updatedItems,
          totalItems,
          totalPrice
        };

        setCart(updatedCart);
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      }
    } catch (error: any) {
      const errorMessage = error.message || error.response?.data?.message || 'Failed to add item to cart';
      setError(errorMessage);
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      setIsLoading(true);
      setError(null);

      if (isAuthenticated) {
        // Use backend API for authenticated users
        const { data } = await cartAPI.updateCartItem(productId, quantity);
        setCart(data);
      } else {
        // Use local storage for guest users
        if (!cart) {
          throw new Error('Cart not initialized');
        }

        const existingItemIndex = cart.items.findIndex(item => item.product._id === productId);

        if (existingItemIndex === -1) {
          throw new Error('Item not found in cart');
        }

        const updatedItems = [...cart.items];
        updatedItems[existingItemIndex].quantity = quantity;

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const updatedCart = {
          ...cart,
          items: updatedItems,
          totalItems,
          totalPrice
        };

        setCart(updatedCart);
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update cart item');
      console.error('Error updating cart item:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (isAuthenticated) {
        // Use backend API for authenticated users
        const { data } = await cartAPI.removeFromCart(productId);
        setCart(data);
      } else {
        // Use local storage for guest users
        if (!cart) {
          throw new Error('Cart not initialized');
        }

        const updatedItems = cart.items.filter(item => item.product._id !== productId);

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const updatedCart = {
          ...cart,
          items: updatedItems,
          totalItems,
          totalPrice
        };

        setCart(updatedCart);
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to remove item from cart');
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (isAuthenticated) {
        // Use backend API for authenticated users
        const { data } = await cartAPI.clearCart();
        setCart(data);
      } else {
        // Use local storage for guest users
        const emptyCart = { items: [], totalItems: 0, totalPrice: 0 };
        setCart(emptyCart);
        localStorage.setItem('guestCart', JSON.stringify(emptyCart));
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to clear cart');
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalItems = () => {
    return cart?.totalItems || 0;
  };

  const getTotalPrice = () => {
    return cart?.totalPrice || 0;
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refreshCart,
        getTotalItems,
        getTotalPrice,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
