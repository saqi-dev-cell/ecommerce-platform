'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  fallbackClassName?: string;
  priority?: boolean;
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  fallbackClassName = '',
  priority = false,
}: SafeImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if URL is a redirect URL that won't work as direct image
  const isRedirectUrl = src && (
    src.includes('goo.gl') ||
    src.includes('bit.ly') ||
    src.includes('tinyurl.com') ||
    src.includes('t.co') ||
    src.includes('short.link')
  );

  // Debug logging
  if (process.env.NODE_ENV === 'development' && src) {
    console.log('SafeImage Debug:', {
      src: src.substring(0, 50) + '...',
      alt,
      imageError,
      isLoading,
      isExternal: src.startsWith('http://') || src.startsWith('https://'),
      isRedirectUrl
    });
  }

  // If there's an error, no src, or it's a redirect URL, show fallback
  if (imageError || !src || isRedirectUrl) {
    return (
      <div className={`bg-gray-200 flex flex-col items-center justify-center ${fallbackClassName || className}`}>
        <svg
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500 mt-1 text-center">
            {!src ? 'No URL' : isRedirectUrl ? 'Redirect URL' : imageError ? 'Load Error' : 'Loading...'}
          </div>
        )}
      </div>
    );
  }

  // For external images and base64 images, use regular img tag to avoid Next.js restrictions
  const isExternalImage = src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:');
  
  if (isExternalImage) {
    return (
      <div className={fill ? `relative w-full h-full ${className}` : `relative ${className}`}>
        {isLoading && (
          <div className={`absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10`}>
            <svg className="h-4 w-4 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className={fill ? 'absolute inset-0 w-full h-full object-cover' : className}
          onLoad={() => {
            console.log('✅ Image loaded successfully:', src.substring(0, 50));
            setIsLoading(false);
          }}
          onError={(e) => {
            console.error('❌ Image failed to load:', src, e);
            setIsLoading(false);
            setImageError(true);
          }}
          style={fill ? undefined : {
            width: width,
            height: height
          }}
        />
      </div>
    );
  }

  // For local images, use Next.js Image component
  const imageProps = fill 
    ? { fill: true }
    : { width: width || 300, height: height || 300 };

  return (
    <Image
      src={src}
      alt={alt}
      {...imageProps}
      className={className}
      priority={priority}
      onError={() => setImageError(true)}
      onLoad={() => setIsLoading(false)}
    />
  );
}
