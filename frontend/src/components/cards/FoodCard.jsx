import React from 'react';
import { Utensils, MapPin, Tag } from 'lucide-react';

export default function FoodCard({ food }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 bg-saffron-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
          {food.state}
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-poppins font-bold text-lg">{food.name}</h3>
          <span className="text-xs text-saffron-300 font-medium">{food.category}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-3">
        <p className="text-slate-600 text-xs leading-relaxed">{food.desc}</p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-saffron-500 shrink-0" />
            <span className="truncate max-w-[170px]" title={food.famousSpot}>{food.famousSpot}</span>
          </div>
          <span className="font-poppins font-bold text-navy-900 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            {food.priceRange}
          </span>
        </div>
      </div>
    </div>
  );
}
