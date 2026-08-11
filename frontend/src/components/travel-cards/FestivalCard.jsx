import React from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FestivalCard({ festival }) {
  const navigate = useNavigate();

  const handlePlanFestival = () => {
    navigate('/planner', { state: { preFillDest: festival.preFillDestinationId } });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={festival.image}
          alt={festival.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 bg-saffron-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {festival.season}
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-poppins font-bold text-lg leading-snug">{festival.name}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-200 mt-1">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-saffron-400" /> {festival.location}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-saffron-400" /> {festival.date}</span>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <p className="text-slate-600 text-xs leading-relaxed">{festival.whyVisit}</p>

        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-navy-900 uppercase tracking-wider block">Key Experiences</span>
          <ul className="space-y-1 text-xs text-slate-500">
            {festival.bestExperiences.slice(0, 3).map((exp, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <Sparkles className="w-3 h-3 text-saffron-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{exp}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handlePlanFestival}
          className="w-full flex items-center justify-center gap-2 bg-saffron-50 hover:bg-saffron-100 text-saffron-700 font-semibold text-xs py-2.5 rounded-xl border border-saffron-200 transition-colors"
        >
          <span>Plan Festival Trip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
