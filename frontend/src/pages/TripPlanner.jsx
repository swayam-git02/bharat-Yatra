import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TripPlannerForm from '../components/forms/TripPlannerForm';
import CustomItineraryBuilder from '../components/forms/CustomItineraryBuilder';
import SectionHeader from '../components/common/SectionHeader';
import { Sparkles, Layers, Compass, Zap } from 'lucide-react';

export default function TripPlanner() {
  const location = useLocation();
  const preFillDest = location.state?.preFillDest || location.state?.customDest;
  const initialMode = location.state?.mode === 'manual' ? 'manual' : 'ai';

  const [plannerMode, setPlannerMode] = useState(initialMode); // 'ai' | 'manual'

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Itinerary Planning Hub"
        title="India Travel Itinerary Planner"
        subtitle="Choose how you want to create your trip: auto-generate a smart grounded itinerary using Gemini AI, or build your own custom schedule manually step-by-step."
      />

      {/* Mode Selector Toggle */}
      <div className="max-w-2xl mx-auto bg-white p-2 rounded-3xl border border-slate-200 shadow-md grid grid-cols-2 gap-2">
        <button
          onClick={() => setPlannerMode('ai')}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-poppins font-bold text-xs sm:text-sm transition-all ${
            plannerMode === 'ai'
              ? 'bg-navy-900 text-white shadow-lg shadow-navy-900/20 scale-[1.02]'
              : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${plannerMode === 'ai' ? 'text-saffron-400' : 'text-slate-400'}`} />
          <span>Generate with Gemini AI</span>
        </button>

        <button
          onClick={() => setPlannerMode('manual')}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-poppins font-bold text-xs sm:text-sm transition-all ${
            plannerMode === 'manual'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-[1.02]'
              : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
          }`}
        >
          <Layers className={`w-4 h-4 ${plannerMode === 'manual' ? 'text-emerald-200' : 'text-slate-400'}`} />
          <span>Build Custom Itinerary (Manual)</span>
        </button>
      </div>

      {/* Mode Content */}
      {plannerMode === 'ai' ? (
        <TripPlannerForm initialDestId={preFillDest} />
      ) : (
        <CustomItineraryBuilder initialDestName={preFillDest} />
      )}
    </div>
  );
}
