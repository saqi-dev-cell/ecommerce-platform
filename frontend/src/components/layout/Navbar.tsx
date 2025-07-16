'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import SearchBar from '@/components/search/SearchBar';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { getTotalItems: getWishlistItems } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-1">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">E-Commerce</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block md:ml-6 md:mr-6">
              <SearchBar className="w-80" />
            </div>

            <div className="hidden md:ml-4 md:flex md:space-x-3">
              <Link
                href="/"
                className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActivePath('/')
                    ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600'
                    : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActivePath('/products') || pathname?.startsWith('/products')
                    ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600'
                    : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Products
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    href="/wishlist"
                    className={`px-2 py-2 rounded-md text-sm font-medium relative transition-colors ${
                      isActivePath('/wishlist')
                        ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600'
                        : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    Wishlist
                    {getWishlistItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {getWishlistItems()}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/cart"
                    className={`px-2 py-2 rounded-md text-sm font-medium relative transition-colors ${
                      isActivePath('/cart')
                        ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600'
                        : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    Cart
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/orders"
                    className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath('/orders')
                        ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600'
                        : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    Orders
                  </Link>
                </>
              )}
              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 px-3 py-1 bg-gray-50 rounded-md border-l-2 border-indigo-500">
                    <span className="text-gray-700 text-sm font-medium whitespace-nowrap max-w-32 lg:max-w-none">
                       <span className="text-indigo-600 font-semibold truncate">{user?.name}</span>
                    </span>
                  </div>
                  <Link
                    href="/profile"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      isActivePath('/profile')
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 whitespace-nowrap"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath('/login')
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div className={`md:hidden mobile-menu transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            {/* Navigation Links */}
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActivePath('/')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActivePath('/products') || pathname?.startsWith('/products')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              Products
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  href="/wishlist"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors relative ${
                    isActivePath('/wishlist')
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  Wishlist
                  {getWishlistItems() > 0 && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      {getWishlistItems()}
                    </span>
                  )}
                </Link>
                <Link
                  href="/cart"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors relative ${
                    isActivePath('/cart')
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  Cart
                  {getTotalItems() > 0 && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                <Link
                  href="/orders"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActivePath('/orders')
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  Orders
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActivePath('/admin')
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </>
            )}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-base font-medium text-gray-900">{user?.name}</p>
                  </div>
                  <Link
                    href="/profile"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActivePath('/profile')
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActivePath('/login')
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
