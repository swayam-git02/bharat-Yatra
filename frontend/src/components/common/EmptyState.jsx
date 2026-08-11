import React from 'react';
import { Compass, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyState({
  icon: Icon = Compass,
  title = 'No items found',
  description = 'Start exploring and planning your journeys across India.',
  actionLabel = 'Plan My Trip',
  actionPath = '/planner'
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200 shadow-sm max-w-md mx-auto my-8 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-saffron-50 text-saffron-500 flex items-center justify-center mx-auto shadow-inner">
        <Icon className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="font-poppins font-bold text-navy-900 text-xl">{title}</h3>
        <p className="text-slate-500 text-sm">{description}</p>
      </div>
      {actionLabel && (
        <button
          onClick={() => navigate(actionPath)}
          className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-950 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all hover:scale-105"
        >
          <PlusCircle className="w-4 h-4 text-saffron-400" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
