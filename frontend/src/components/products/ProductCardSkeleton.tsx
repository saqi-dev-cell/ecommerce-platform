import SkeletonLoader from '@/components/ui/SkeletonLoader';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-48 w-full">
        <SkeletonLoader className="w-full h-full" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <SkeletonLoader variant="text" lines={2} className="mb-2" />
        
        {/* Description skeleton */}
        <SkeletonLoader variant="text" lines={2} className="mb-3" />
        
        {/* Rating skeleton */}
        <div className="flex items-center mb-4">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLoader
                key={index}
                variant="rectangular"
                width={16}
                height={16}
                className="rounded-sm"
              />
            ))}
          </div>
          <SkeletonLoader variant="text" width={80} className="ml-2" />
        </div>
        
        {/* Price and stock skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SkeletonLoader variant="text" width={60} />
            <SkeletonLoader variant="text" width={50} />
          </div>
          <SkeletonLoader variant="text" width={70} />
        </div>
        
        {/* Button skeleton */}
        <SkeletonLoader height={40} className="rounded-md" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
