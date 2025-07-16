'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Nike-Style Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-600 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative min-h-screen flex">
        {/* Left Side - Nike Brand Section */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="text-center text-white max-w-lg">
            <h1 className="text-6xl xl:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
              <div className="block">JUST</div>
              <div className="block">DO</div>
              <div className="block">IT</div>
            </h1>
            <p className="text-xl font-medium text-gray-300 mb-8 tracking-wide">
              Your journey to greatness starts here.
            </p>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Brand Header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">
                Welcome Back
              </h1>
              <div className="w-16 h-1 bg-white mx-auto"></div>
            </div>

            {/* Login Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wide">
                  Sign In
                </h2>
                <p className="mt-3 text-gray-600 font-medium">
                  Welcome back to your account
                </p>
              </div>
        
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
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

                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-lg"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-lg"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-5 w-5 text-black border-2 border-gray-300 rounded focus:ring-black focus:ring-2"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm font-medium text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-gray-600 hover:text-black transition-colors underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 uppercase tracking-wide"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <div className="text-center mt-6">
                  <p className="text-gray-600 font-medium">
                    Don't have an account?{' '}
                    <Link
                      href="/register"
                      className="font-bold text-black hover:underline transition-all duration-200"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
