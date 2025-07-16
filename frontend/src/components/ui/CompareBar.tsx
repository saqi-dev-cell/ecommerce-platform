'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCompare } from '@/contexts/CompareContext';

const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const [isMinimized, setIsMinimized] = useState(false);

  if (compareList.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 transition-transform duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg 
                className={`w-5 h-5 transition-transform duration-200 ${isMinimized ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-medium text-gray-900">
                Compare Products ({compareList.length}/4)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={clearCompare}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Clear All
            </button>
            
            {compareList.length >= 2 && (
              <Link
                href="/compare"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                Compare Now
              </Link>
            )}
          </div>
        </div>

        {!isMinimized && (
          <div className="pb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {compareList.map((product) => (
                <div key={product._id} className="relative bg-gray-50 rounded-lg p-3">
                  <button
                    onClick={() => removeFromCompare(product._id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                  
                  <div className="aspect-square relative mb-2">
                    <Image
                      src={product.images[0]?.url || '/placeholder-image.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-sm text-indigo-600 font-semibold">
                    {formatPrice(product.price)}
                  </p>
                </div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: 4 - compareList.length }).map((_, index) => (
                <div key={`empty-${index}`} className="bg-gray-100 rounded-lg p-3 border-2 border-dashed border-gray-300">
                  <div className="aspect-square flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Add product to compare
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareBar;
