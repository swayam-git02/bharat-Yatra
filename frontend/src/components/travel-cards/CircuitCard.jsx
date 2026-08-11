import React from 'react';
import { Compass, Clock, MapPin, ChevronRight, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CircuitCard({ circuit }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between">
      <div>
        <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => navigate(`/spiritual/${circuit.id}`)}>
          <img
            src={circuit.image}
            alt={circuit.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

          <div className="absolute top-3 left-3 bg-indiangreen-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
            {circuit.region}
          </div>

          {circuit.estimatedBudget && (
            <div className="absolute top-3 right-3 bg-saffron-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow">
              ₹{circuit.estimatedBudget.toLocaleString()}/person
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-poppins font-bold text-xl group-hover:text-saffron-400 transition-colors">{circuit.name}</h3>
            <p className="text-xs text-slate-300 line-clamp-1">{circuit.tagline}</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Info stats */}
          <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Duration</span>
              <span className="font-bold text-navy-900">{circuit.duration}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Distance</span>
              <span className="font-bold text-navy-900">{circuit.totalDistance}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Season</span>
              <span className="font-bold text-navy-900">{circuit.bestSeason}</span>
            </div>
          </div>

          {/* Route stops timeline */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-navy-900 uppercase tracking-wider block">
              All Included Shrines ({circuit.stops.length} Stops)
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
              {circuit.stops.map((stop, index) => (
                <React.Fragment key={index}>
                  <span className="bg-saffron-50 text-saffron-900 font-bold px-2.5 py-1 rounded-xl shrink-0 border border-saffron-200">
                    {stop.name}
                  </span>
                  {index < circuit.stops.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={() => navigate(`/spiritual/${circuit.id}`)}
          className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs py-3 rounded-xl transition-colors"
        >
          <Info className="w-4 h-4 text-slate-600" />
          <span>View Package</span>
        </button>

        <button
          onClick={() => navigate(`/spiritual/${circuit.id}`)}
          className="flex items-center justify-center gap-1.5 bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-transform active:scale-95"
        >
          <Compass className="w-4 h-4 text-white" />
          <span>Plan & Book</span>
        </button>
      </div>
    </div>
  );
}
