import React from 'react';

export default function TravelMetricCard({ label, value, prefix = '', suffix = '', icon: Icon, color = 'saffron' }) {
  const getColorStyles = () => {
    switch (color) {
      case 'green': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'blue': return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'purple': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      default: return 'bg-saffron-50 text-saffron-600 border-saffron-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
      {Icon && (
        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold shrink-0 ${getColorStyles()}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{label}</span>
        <div className="font-poppins font-bold text-navy-900 text-2xl sm:text-3xl">
          {prefix}{value?.toLocaleString() || 0}{suffix}
        </div>
      </div>
    </div>
  );
}
