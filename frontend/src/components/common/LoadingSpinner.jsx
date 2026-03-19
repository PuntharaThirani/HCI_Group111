import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-10 h-10',
    large: 'w-14 h-14',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} rounded-full border-4 border-slate-200 border-t-[#C96A2B] animate-spin`}
      ></div>

      {message && (
        <p className="mt-4 text-sm text-slate-500">
          {message}
        </p>
      )}
    </div>
  );
};

// Skeleton Card
export const SkeletonCard = () => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm animate-pulse">
    <div className="h-44 bg-slate-200"></div>

    <div className="space-y-3 p-5">
      <div className="h-4 w-3/4 rounded bg-slate-200"></div>
      <div className="h-3 w-1/2 rounded bg-slate-200"></div>

      <div className="pt-3 flex gap-2">
        <div className="h-8 flex-1 rounded-lg bg-slate-200"></div>
        <div className="h-8 flex-1 rounded-lg bg-slate-200"></div>
      </div>
    </div>
  </div>
);

// Skeleton Table
export const SkeletonTable = () => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse">
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-6 w-full rounded bg-slate-200"></div>
      ))}
    </div>
  </div>
);

export default LoadingSpinner;