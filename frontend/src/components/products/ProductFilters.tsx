'use client';

import { useState, useEffect } from 'react';
import { ProductFilters } from '@/types';

interface ProductFiltersProps {
  onFilterChange: (filters: Partial<ProductFilters>) => void;
  initialFilters?: ProductFilters;
}

const ProductFiltersComponent = ({ onFilterChange, initialFilters = {} }: ProductFiltersProps) => {
  const [filters, setFilters] = useState<ProductFilters>({
    category: initialFilters.category || '',
    minPrice: initialFilters.minPrice || undefined,
    maxPrice: initialFilters.maxPrice || undefined,
    search: initialFilters.search || '',
    featured: initialFilters.featured || false,
    inStock: initialFilters.inStock || false,
    sort: initialFilters.sort || 'createdAt:-1',
  });

  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice?.toString() || '',
    max: filters.maxPrice?.toString() || '',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Apply filters when component mounts
    onFilterChange(filters);
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      category: e.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      sort: e.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: checked,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange({
      ...priceRange,
      [name]: value,
    });
  };

  const applyPriceFilter = () => {
    const min = priceRange.min ? parseFloat(priceRange.min) : undefined;
    const max = priceRange.max ? parseFloat(priceRange.max) : undefined;
    
    const newFilters = {
      ...filters,
      minPrice: min,
      maxPrice: max,
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilters(prev => ({
      ...prev,
      search: value,
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      search: '',
      featured: false,
      inStock: false,
      sort: 'createdAt:-1',
    };
    setFilters(clearedFilters);
    setPriceRange({ min: '', max: '' });
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className={`${isExpanded ? 'block' : 'hidden'} md:block space-y-4`}>
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={handleSearchChange}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
            <option value="Beauty">Beauty</option>
            <option value="Toys">Toys</option>
            <option value="Automotive">Automotive</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sort"
            name="sort"
            value={filters.sort}
            onChange={handleSortChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="createdAt:-1">Newest First</option>
            <option value="price:1">Price: Low to High</option>
            <option value="price:-1">Price: High to Low</option>
            <option value="name:1">Name: A to Z</option>
            <option value="name:-1">Name: Z to A</option>
            <option value="rating:-1">Highest Rated</option>
          </select>
        </div>

        <div>
          <p className="block text-sm font-medium text-gray-700 mb-1">Price Range</p>
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="number"
                name="min"
                placeholder="Min"
                value={priceRange.min}
                onChange={handlePriceInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                name="max"
                placeholder="Max"
                value={priceRange.max}
                onChange={handlePriceInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="button"
              onClick={applyPriceFilter}
              className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={filters.featured}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
              Featured Products Only
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="inStock"
              name="inStock"
              type="checkbox"
              checked={filters.inStock}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
              In Stock Only
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={clearFilters}
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFiltersComponent;
