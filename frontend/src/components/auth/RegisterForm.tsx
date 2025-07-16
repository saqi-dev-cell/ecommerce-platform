'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const RegisterForm = () => {
  const { register, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) clearError();
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (formData.name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (formData.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push('Passwords do not match');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    await register(formData.name, formData.email, formData.password);
  };

  const displayErrors = validationErrors.length > 0 ? validationErrors : (error ? [error] : []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Nike-Style Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gray-600 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative min-h-screen flex">
        {/* Left Side - Nike Brand Section */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="text-center text-white max-w-lg">
            <h1 className="text-6xl xl:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
              <div className="block">BECOME</div>
              <div className="block">A</div>
              <div className="block">MEMBER</div>
            </h1>
            <p className="text-xl font-medium text-gray-300 mb-8 tracking-wide">
              Join the community of champions and unlock your potential.
            </p>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Brand Header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">
                Join Us
              </h1>
              <div className="w-16 h-1 bg-white mx-auto"></div>
            </div>

            {/* Register Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wide">
                  Create Account
                </h2>
                <p className="mt-3 text-gray-600 font-medium">
                  Start your journey with us today
                </p>
              </div>
        
              <form className="space-y-6" onSubmit={handleSubmit}>
                {displayErrors.length > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <ul className="text-sm text-red-700 space-y-1">
                          {displayErrors.map((error, index) => (
                            <li key={index} className="font-medium">• {error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-lg"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

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
                      placeholder="Enter your email address"
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
                      autoComplete="new-password"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-lg"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-lg"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
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
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div className="text-center mt-6">
                  <p className="text-gray-600 font-medium">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="font-bold text-black hover:underline transition-all duration-200"
                    >
                      Sign In
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

export default RegisterForm;
