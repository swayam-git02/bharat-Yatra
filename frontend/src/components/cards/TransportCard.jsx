import React from 'react';
import { Bike, Train, Compass, Ship, Shield, Star, CheckCircle2 } from 'lucide-react';

export default function TransportCard({ transport }) {
  const getIcon = (name) => {
    switch (name) {
      case 'Bike': return <Bike className="w-6 h-6 text-saffron-500" />;
      case 'Train': return <Train className="w-6 h-6 text-blue-500" />;
      case 'Ship': return <Ship className="w-6 h-6 text-cyan-500" />;
      case 'Shield': return <Shield className="w-6 h-6 text-amber-500" />;
      default: return <Compass className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
            {getIcon(transport.iconName)}
          </div>
          <div>
            <h3 className="font-poppins font-bold text-navy-900 text-lg">{transport.city}</h3>
            <span className="text-xs font-semibold text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded-md">
              {transport.recommendedMode}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-bold text-amber-700">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{transport.convenienceScore}/5</span>
        </div>
      </div>

      <p className="text-slate-600 text-xs leading-relaxed">{transport.description}</p>

      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-bold text-navy-900 uppercase tracking-wider block">Traveler Tips</span>
        <ul className="space-y-1 text-xs text-slate-500">
          {transport.tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indiangreen-600 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs">
        <span className="text-slate-400">Est. Price:</span>
        <span className="font-poppins font-bold text-navy-900">{transport.priceRange}</span>
      </div>
    </div>
  );
}
