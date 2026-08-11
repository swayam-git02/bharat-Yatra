import React from 'react';
import { Compass, Clock, Map, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CircuitCard({ circuit }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={circuit.image}
          alt={circuit.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

        <div className="absolute top-3 left-3 bg-indiangreen-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
          {circuit.region}
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-poppins font-bold text-xl">{circuit.name}</h3>
          <p className="text-xs text-slate-300 line-clamp-1">{circuit.tagline}</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Info stats */}
        <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Duration</span>
            <span className="font-semibold text-xs text-navy-900">{circuit.duration}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Distance</span>
            <span className="font-semibold text-xs text-navy-900">{circuit.totalDistance}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Season</span>
            <span className="font-semibold text-xs text-navy-900">{circuit.bestSeason}</span>
          </div>
        </div>

        {/* Route stops timeline */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-navy-900 uppercase tracking-wider block">Pilgrimage Trail</span>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            {circuit.stops.map((stop, index) => (
              <React.Fragment key={index}>
                <span className="bg-saffron-50 text-saffron-800 font-semibold px-2.5 py-1 rounded-lg shrink-0 border border-saffron-200">
                  {stop.name}
                </span>
                {index < circuit.stops.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/planner')}
          className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs py-2.5 rounded-xl shadow-md transition-colors"
        >
          <Compass className="w-4 h-4 text-saffron-400" />
          <span>Plan Circuit Journey</span>
        </button>
      </div>
    </div>
  );
}
