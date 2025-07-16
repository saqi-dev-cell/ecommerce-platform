'use client';

import { ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingStateProps {
  isLoading: boolean;
  children: ReactNode;
  loadingComponent?: ReactNode;
  className?: string;
  overlay?: boolean;
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingState = ({
  isLoading,
  children,
  loadingComponent,
  className = '',
  overlay = false,
  text = 'Loading...',
  size = 'md'
}: LoadingStateProps) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  // Custom loading component
  if (loadingComponent) {
    return <>{loadingComponent}</>;
  }

  // Overlay loading (shows over existing content)
  if (overlay) {
    return (
      <div className={`relative ${className}`}>
        {children}
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-3">
            <LoadingSpinner size={size} />
            {text && (
              <p className="text-sm text-gray-600 font-medium" role="status" aria-live="polite">
                {text}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full loading state (replaces content)
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <LoadingSpinner size={size} />
      {text && (
        <p className="mt-3 text-sm text-gray-600 font-medium" role="status" aria-live="polite">
          {text}
        </p>
      )}
    </div>
  );
};

// Page-level loading component
export const PageLoading = ({ text = 'Loading page...' }: { text?: string }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="xl" />
      <p className="mt-4 text-lg text-gray-600 font-medium" role="status" aria-live="polite">
        {text}
      </p>
    </div>
  </div>
);

// Section-level loading component
export const SectionLoading = ({ 
  text = 'Loading...', 
  height = 'h-64',
  className = '' 
}: { 
  text?: string; 
  height?: string;
  className?: string;
}) => (
  <div className={`${height} flex items-center justify-center ${className}`}>
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-3 text-sm text-gray-600 font-medium" role="status" aria-live="polite">
        {text}
      </p>
    </div>
  </div>
);

// Button loading state
export const ButtonLoading = ({ 
  isLoading, 
  children, 
  loadingText = 'Loading...',
  className = '',
  disabled = false,
  ...props 
}: {
  isLoading: boolean;
  children: ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}) => (
  <button
    className={`relative ${className} ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingSpinner size="sm" color="white" />
        {loadingText && (
          <span className="ml-2 text-sm">{loadingText}</span>
        )}
      </div>
    )}
    <span className={isLoading ? 'invisible' : 'visible'}>
      {children}
    </span>
  </button>
);

// Card loading skeleton
export const CardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
    <div className="space-y-2">
      <div className="bg-gray-200 rounded h-4 w-3/4"></div>
      <div className="bg-gray-200 rounded h-4 w-1/2"></div>
      <div className="bg-gray-200 rounded h-6 w-1/4"></div>
    </div>
  </div>
);

// List loading skeleton
export const ListSkeleton = ({ 
  items = 5, 
  className = '' 
}: { 
  items?: number; 
  className?: string;
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="animate-pulse flex space-x-4">
        <div className="bg-gray-200 rounded-full h-10 w-10"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="bg-gray-200 rounded h-4 w-3/4"></div>
          <div className="bg-gray-200 rounded h-4 w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

export default LoadingState;
