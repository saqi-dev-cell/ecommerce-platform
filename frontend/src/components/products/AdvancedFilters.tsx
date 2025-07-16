'use client';

import { useState } from 'react';
import { ProductFilters } from '@/types';

interface AdvancedFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: Partial<ProductFilters>) => void;
  className?: string;
}

const AdvancedFilters = ({ filters, onFiltersChange, className = "" }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPriceInput, setShowPriceInput] = useState(false);

  // Quick filter options
  const quickFilters = [
    {
      key: 'featured',
      label: 'Featured',
      icon: '⭐',
      active: filters.featured,
      action: () => onFiltersChange({ featured: !filters.featured })
    },
    {
      key: 'inStock',
      label: 'In Stock',
      icon: '✓',
      active: filters.inStock,
      action: () => onFiltersChange({ inStock: !filters.inStock })
    },
    {
      key: 'highRated',
      label: '4+ Stars',
      icon: '⭐',
      active: filters.minRating === 4,
      action: () => onFiltersChange({ minRating: filters.minRating === 4 ? undefined : 4 })
    }
  ];

  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports & Outdoors', 'Books', 'Health & Beauty'];
  const brands = ['TechSound', 'EcoWear', 'FitTech', 'RoastMaster', 'HomeStyle', 'SportsPro'];

  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200+', min: 200, max: 1000 }
  ];

  const sortOptions = [
    { value: '', label: 'Relevance' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: '-rating', label: 'Highest Rated' },
    { value: 'createdAt', label: 'Newest' }
  ];

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      brand: '',
      minPrice: undefined,
      maxPrice: undefined,
      sort: '',
      inStock: false,
      featured: false,
      minRating: undefined
    });
  };

  const activeFiltersCount = [
    filters.category,
    filters.brand,
    filters.minPrice,
    filters.maxPrice,
    filters.sort,
    filters.inStock,
    filters.featured,
    filters.minRating
  ].filter(Boolean).length;

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      {/* Nike-Style Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left bg-gradient-to-r from-black to-gray-800 text-white rounded-t-2xl"
        >
          <div className="flex items-center">
            <span className="font-bold text-lg uppercase tracking-wide">
              Filters
            </span>
            {activeFiltersCount > 0 && (
              <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white text-black">
                {activeFiltersCount} Active
              </span>
            )}
          </div>
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Modern Nike-Style Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-6 space-y-6`}>

        {/* Quick Filters Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              Quick Filters
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-red-600 hover:text-red-800 font-medium text-sm underline"
              >
                Clear All ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={filter.action}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter.active
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Sort By
          </label>
          <select
            value={filters.sort || ''}
            onChange={(e) => onFiltersChange({ sort: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 font-medium focus:border-black focus:outline-none transition-colors"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Pills */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFiltersChange({ category: '' })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !filters.category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onFiltersChange({ category })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.category === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Pills */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Brand
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFiltersChange({ brand: '' })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !filters.brand
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => onFiltersChange({ brand })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.brand === brand
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Pills */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Price Range
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFiltersChange({ minPrice: undefined, maxPrice: undefined })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !filters.minPrice && !filters.maxPrice
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Any Price
            </button>
            {priceRanges.map((range) => (
              <button
                key={`${range.min}-${range.max}`}
                onClick={() => onFiltersChange({
                  minPrice: range.min === 0 ? undefined : range.min,
                  maxPrice: range.max === 1000 ? undefined : range.max
                })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.minPrice === range.min && filters.maxPrice === range.max
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Price Input */}
        <div className="space-y-3">
          <button
            onClick={() => setShowPriceInput(!showPriceInput)}
            className="text-sm font-medium text-gray-600 hover:text-black underline"
          >
            {showPriceInput ? 'Hide' : 'Set'} Custom Price Range
          </button>

          {showPriceInput && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice || ''}
                  onChange={(e) => onFiltersChange({ minPrice: Number(e.target.value) || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-black focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice || ''}
                  onChange={(e) => onFiltersChange({ maxPrice: Number(e.target.value) || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-black focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdvancedFilters;
