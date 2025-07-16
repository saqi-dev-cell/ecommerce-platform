'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ProfilePage() {
  const { user, updateProfile, changePassword, error, isLoading } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProfile = {
      name: profileData.name,
      phone: profileData.phone,
      address: {
        street: profileData.street,
        city: profileData.city,
        state: profileData.state,
        zipCode: profileData.zipCode,
        country: profileData.country,
      },
    };
    
    await updateProfile(updatedProfile);
    setSuccessMessage('Profile updated successfully');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, );
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return; // Handle error
    }
    
    await changePassword(passwordData.currentPassword, passwordData.newPassword);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    setSuccessMessage('Password changed successfully');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, );
  };

  const dashboardTabs = [
    { id: 'overview', name: 'Overview', icon: '👤' },
    { id: 'profile', name: 'Profile', icon: '⚙️' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'wishlist', name: 'Wishlist', icon: '❤️' },
    { id: 'password', name: 'Security', icon: '🔒' },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black">
        <Navbar />

        {/* Nike-Style Hero Section */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-4 leading-none">
                MY ACCOUNT
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
                {user?.name?.split(' ')[0] || 'Member'}
              </p>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>
          </div>
        </div>

        <main className="bg-white">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Nike-Style Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Dashboard</h2>
                  <nav className="space-y-2">
                    {dashboardTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-xl font-bold text-left transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'bg-black text-white transform scale-105'
                            : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                        }`}
                      >
                        <span className="mr-3 text-lg">{tab.icon}</span>
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                  {/* Success/Error Messages */}
                  {successMessage && (
                    <div className="mx-6 mt-6 bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-xl">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{successMessage}</span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="mx-6 mt-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{error}</span>
                      </div>
                    </div>
                  )}

                  {/* Tab Content */}
                  {activeTab === 'overview' && (
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Account Overview</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
                          <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Profile Info</h3>
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <span className="font-bold text-gray-900 w-20 mb-1 sm:mb-0">Name:</span>
                              <span className="text-gray-800 font-medium">{user?.name || 'Not set'}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <span className="font-bold text-gray-900 w-20 mb-1 sm:mb-0">Email:</span>
                              <span className="text-gray-800 font-medium">{user?.email}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <span className="font-bold text-gray-900 w-20 mb-1 sm:mb-0">Phone:</span>
                              <span className="text-gray-800 font-medium">{user?.phone || 'Not set'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
                          <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Quick Actions</h3>
                          <div className="space-y-3">
                            <Link href="/orders" className="flex items-center text-gray-900 hover:text-black hover:bg-gray-50 font-medium p-2 rounded-lg transition-all duration-200">
                              <span className="mr-2 text-gray-600">→</span>
                              View Recent Orders
                            </Link>
                            <Link href="/wishlist" className="flex items-center text-gray-900 hover:text-black hover:bg-gray-50 font-medium p-2 rounded-lg transition-all duration-200">
                              <span className="mr-2 text-gray-600">→</span>
                              Check Wishlist
                            </Link>
                            <button
                              onClick={() => setActiveTab('profile')}
                              className="flex items-center text-gray-900 hover:text-black hover:bg-gray-50 font-medium text-left p-2 rounded-lg transition-all duration-200 w-full"
                            >
                              <span className="mr-2 text-gray-600">→</span>
                              Update Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'profile' && (
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Profile Information</h2>

                      <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={profileData.name}
                              onChange={handleProfileChange}
                              className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={profileData.email}
                              disabled
                              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 bg-gray-100 text-gray-500 text-lg"
                            />
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              value={profileData.phone}
                              onChange={handleProfileChange}
                              className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                            />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Address Information</h3>

                          <div className="grid grid-cols-1 gap-6">
                            <div>
                              <label htmlFor="street" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                Street Address
                              </label>
                              <input
                                type="text"
                                name="street"
                                id="street"
                                value={profileData.street}
                                onChange={handleProfileChange}
                                className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                              <div>
                                <label htmlFor="city" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                  City
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  id="city"
                                  value={profileData.city}
                                  onChange={handleProfileChange}
                                  className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                                />
                              </div>

                              <div>
                                <label htmlFor="state" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                  State / Province
                                </label>
                                <input
                                  type="text"
                                  name="state"
                                  id="state"
                                  value={profileData.state}
                                  onChange={handleProfileChange}
                                  className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                                />
                              </div>

                              <div>
                                <label htmlFor="zipCode" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                  ZIP / Postal Code
                                </label>
                                <input
                                  type="text"
                                  name="zipCode"
                                  id="zipCode"
                                  value={profileData.zipCode}
                                  onChange={handleProfileChange}
                                  className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="country" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                Country
                              </label>
                              <input
                                type="text"
                                name="country"
                                id="country"
                                value={profileData.country}
                                onChange={handleProfileChange}
                                className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-black text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide"
                          >
                            {isLoading ? 'Saving...' : 'Save Profile'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {activeTab === 'orders' && (
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Order History</h2>
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Orders Yet</h3>
                        <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                        <Link href="/products" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors uppercase tracking-wide">
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  )}

                  {activeTab === 'wishlist' && (
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Wishlist</h2>
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Favorites Yet</h3>
                        <p className="text-gray-600 mb-6">Save items you love to your wishlist</p>
                        <Link href="/products" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors uppercase tracking-wide">
                          Browse Products
                        </Link>
                      </div>
                    </div>
                  )}

                  {activeTab === 'password' && (
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Change Password</h2>

                      <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="currentPassword"
                            id="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            required
                            className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                          />
                        </div>

                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                            className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                          />
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                            className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:border-black transition-colors text-lg"
                          />
                          {passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword && (
                            <p className="mt-2 text-sm text-red-600 font-medium">Passwords do not match</p>
                          )}
                        </div>

                        <div className="pt-6">
                          <button
                            type="submit"
                            disabled={isLoading || passwordData.newPassword !== passwordData.confirmPassword}
                            className="bg-black text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide"
                          >
                            {isLoading ? 'Changing Password...' : 'Change Password'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
