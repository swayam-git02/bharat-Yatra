import React from 'react';

export default function SkeletonCard({ type = 'card' }) {
  if (type === 'itinerary') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-36 bg-slate-200 rounded-md" />
          <div className="h-6 w-20 bg-slate-200 rounded-md" />
        </div>
        <div className="space-y-3 pt-2">
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
      <div className="h-48 bg-slate-200 w-full" />
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-slate-200 rounded w-1/2" />
          <div className="h-5 bg-slate-200 rounded w-1/4" />
        </div>
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="flex items-center gap-2 pt-2">
          <div className="h-7 w-20 bg-slate-100 rounded-full" />
          <div className="h-7 w-20 bg-slate-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}
