import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}></div>
      {message && <p className="mt-4 text-gray-600 animate-pulse">{message}</p>}
    </div>
  );
};

// Skeleton Loader
export const SkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-soft animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="flex gap-2 pt-2">
        <div className="h-8 bg-gray-200 rounded flex-1"></div>
        <div className="h-8 bg-gray-200 rounded flex-1"></div>
      </div>
    </div>
  </div>
);

export const SkeletonTable = () => (
  <div className="bg-white rounded-xl p-6 shadow-soft animate-pulse">
    <div className="space-y-3">
      <div className="h-8 bg-gray-200 rounded"></div>
      <div className="h-8 bg-gray-200 rounded"></div>
      <div className="h-8 bg-gray-200 rounded"></div>
      <div className="h-8 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default LoadingSpinner;