'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import AdvancedFilters from '@/components/products/AdvancedFilters';
import SearchBar from '@/components/search/SearchBar';
import { ProductFilters as ProductFiltersType } from '@/types';

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleFilterChange = (newFilters: Partial<ProductFiltersType>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({
      ...prev,
      search: query
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    const handleBodyScroll = () => {
      // Only prevent scroll on mobile when sidebar is open (when it's an overlay)
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      if (isSidebarOpen && isMobile) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('keydown', handleEscape);
      handleBodyScroll();

      // Listen for window resize to update scroll behavior
      window.addEventListener('resize', handleBodyScroll);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleBodyScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Nike-Style Hero Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-4 leading-none">
              ALL PRODUCTS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
              Never been done is what we do.
            </p>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

      <main className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Nike-Style Header with Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">Shop All</h2>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">Find your perfect match</span>
              </div>

              {/* Nike-Style Filter Toggle */}
              <button
                onClick={toggleSidebar}
                className={`inline-flex items-center px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 ${
                  isSidebarOpen
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
                aria-label={isSidebarOpen ? 'Hide filters' : 'Show filters'}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
                {!isSidebarOpen && Object.keys(filters).filter(key => filters[key as keyof typeof filters]).length > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-white text-black">
                    {Object.keys(filters).filter(key => filters[key as keyof typeof filters]).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Nike-Style Search Bar */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <SearchBar
                placeholder="Search for products..."
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-full py-4 px-6 text-lg focus:border-black focus:ring-0 transition-colors"
                showSuggestions={true}
              />
            </div>
          </div>

          <div className="relative">
            {/* Nike-Style Overlay for mobile sidebar */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden backdrop-blur-sm"
                onClick={toggleSidebar}
                aria-hidden="true"
              />
            )}

            <div className={`grid gap-8 transition-all duration-500 ${isSidebarOpen ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
              {/* Nike-Style Sidebar */}
              {isSidebarOpen && (
                <div className="lg:col-span-1 space-y-6 lg:relative lg:translate-x-0 lg:bg-transparent lg:shadow-none lg:w-auto fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform translate-x-0 transition-all duration-500 ease-in-out overflow-y-auto lg:transform-none lg:static lg:inset-auto lg:z-auto lg:w-auto lg:shadow-none">
                  {/* Nike-Style Mobile sidebar header */}
                  <div className="lg:hidden flex items-center justify-between p-6 border-b border-gray-200 bg-black">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide">Filters</h2>
                    <button
                      onClick={toggleSidebar}
                      className="p-2 rounded-full text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                      aria-label="Close filters"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Nike-Style Filters content */}
                  <div className="p-6 lg:p-0">
                    <div className="lg:bg-gray-50 lg:rounded-2xl lg:p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide lg:block hidden">
                        Filter & Sort
                      </h3>
                      <AdvancedFilters
                        filters={filters}
                        onFiltersChange={handleFilterChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Nike-Style Main content */}
              <div className={`${isSidebarOpen ? 'lg:col-span-3' : 'col-span-1'}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <ProductGrid filters={filters} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
