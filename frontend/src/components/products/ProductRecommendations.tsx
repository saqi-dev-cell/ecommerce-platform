'use client';

import { useState, useEffect } from 'react';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ProductRecommendationsProps {
  currentProductId?: string;
  category?: string;
  title?: string;
  limit?: number;
}

const ProductRecommendations = ({ 
  currentProductId, 
  category, 
  title = "You might also like",
  limit = 4 
}: ProductRecommendationsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const filters: any = {
          limit,
          page: 1
        };
        
        if (category) {
          filters.category = category;
        }
        
        const response = await productsAPI.getProducts(filters);
        
        // Filter out current product if provided
        let filteredProducts = response.data;
        if (currentProductId) {
          filteredProducts = response.data.filter(
            (product: Product) => product._id !== currentProductId
          );
        }
        
        // Shuffle and take the limit
        const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, limit));
        
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch recommendations');
        console.error('Error fetching recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentProductId, category, limit]);

  if (isLoading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <a 
          href="/products" 
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          View all products →
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
