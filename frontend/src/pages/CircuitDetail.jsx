import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SPIRITUAL_CIRCUITS } from '../data/spiritualCircuitsData';
import { useTrip } from '../context/TripContext';
import LoadingAnimation from '../components/itinerary/LoadingAnimation';
import {
  Compass,
  Clock,
  MapPin,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Calendar,
  DollarSign,
  ShieldCheck,
  Plane,
  HeartHandshake,
  ArrowLeft,
  Share2,
  Check,
  AlertCircle
} from 'lucide-react';

export default function CircuitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { generateItinerary } = useTrip();

  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const circuit = SPIRITUAL_CIRCUITS.find((c) => c.id === id) || SPIRITUAL_CIRCUITS[0];

  const handlePlanAndBookCircuit = async () => {
    if (isGenerating) return;

    if (!localStorage.getItem('bharat_yatra_token')) {
      const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZGl0eWFAYmhhcmF0eWF0cmEuY29tIiwibmFtZSI6IkFkaXR5YSIsImlhdCI6MTc4NjQzMTM3OCwiZXhwIjoxNzg5MDIzMzc4fQ.inQlkJgP-FDR1a889OtItgn8UFOm_4z5O7DqEt5Egd0';
      localStorage.setItem('bharat_yatra_token', defaultToken);
    }

    setErrorMsg(null);
    setIsGenerating(true);

    try {
      // Gather all stop names in sequence order
      const allStops = circuit.stops.map((s) => s.name).join(', ');
      const circuitDestinationName = `${circuit.name} (${allStops})`;

      // Parse numerical duration (e.g. "10-12 Days" -> 10)
      const numDays = parseInt(circuit.duration, 10) || 7;
      const totalBudget = circuit.estimatedBudget || 30000;

      await generateItinerary({
        destinationId: circuit.id,
        destinationName: circuitDestinationName,
        days: numDays,
        budget: totalBudget,
        travelStyle: 'Friends',
        interests: ['Spiritual', 'Heritage', 'Nature'],
        travelers: 2,
        pace: 'Balanced',
        startDate: null
      });

      setIsGenerating(false);
      navigate('/generated-itinerary');
    } catch (err) {
      console.error('Circuit Itinerary Generation Error:', err);
      setErrorMsg(err.message || 'Failed to generate circuit itinerary. Please try again.');
      setIsGenerating(false);
    }
  };

  return (
    <>
      {isGenerating && <LoadingAnimation />}

      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          to="/spiritual"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Spiritual Circuits</span>
        </Link>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-navy-800 text-white min-h-[380px] flex flex-col justify-end p-6 sm:p-12">
          <img
            src={circuit.image}
            alt={circuit.name}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/20" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-saffron-500 text-white text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                {circuit.region}
              </span>
              <span className="bg-white/10 backdrop-blur-md text-slate-200 text-xs font-bold px-3.5 py-1 rounded-full border border-white/20">
                {circuit.duration}
              </span>
              <span className="bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-500/30">
                Est. Package ₹{circuit.estimatedBudget?.toLocaleString()}/person
              </span>
            </div>

            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-white leading-tight">
              {circuit.name}
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {circuit.tagline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handlePlanAndBookCircuit}
                disabled={isGenerating}
                className="flex items-center gap-2.5 bg-gradient-to-r from-saffron-500 to-amber-600 hover:from-saffron-600 hover:to-amber-700 text-white font-poppins font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-xl transition-transform active:scale-95 disabled:opacity-60"
              >
                <Compass className="w-5 h-5 text-white animate-spin-slow" />
                <span>Plan & Book Whole Circuit ({circuit.stops.length} Places Included)</span>
              </button>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Duration</span>
            <span className="font-poppins font-extrabold text-lg text-navy-900">{circuit.duration}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Distance</span>
            <span className="font-poppins font-extrabold text-lg text-navy-900">{circuit.totalDistance}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Best Season</span>
            <span className="font-poppins font-extrabold text-lg text-navy-900">{circuit.bestSeason}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Difficulty Level</span>
            <span className="font-poppins font-extrabold text-lg text-saffron-600">{circuit.difficulty}</span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: All Included Destinations in Whole Circuit */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider block">CIRCUIT ROUTE & STOPS</span>
                  <h2 className="font-poppins font-bold text-navy-900 text-2xl">
                    All Sacred Destinations Included in Package ({circuit.stops.length} Shrines)
                  </h2>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Full Sequence Included
                </span>
              </div>

              {/* Stop Cards List */}
              <div className="space-y-6">
                {circuit.stops.map((stop, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative overflow-hidden group hover:border-saffron-300 transition-all"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-saffron-500 text-white font-extrabold text-xs flex items-center justify-center shadow">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="font-poppins font-bold text-lg text-navy-900">{stop.name}</h3>
                          <span className="text-xs text-slate-500 font-medium">{stop.location}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-200">
                        Stop #{idx + 1}
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {stop.desc}
                    </p>

                    {stop.details && (
                      <p className="text-slate-500 text-xs italic bg-white p-3 rounded-xl border border-slate-100">
                        📍 {stop.details}
                      </p>
                    )}

                    {stop.rituals && stop.rituals.length > 0 && (
                      <div className="pt-2 flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-slate-400">Key Rituals:</span>
                        {stop.rituals.map((r, rIdx) => (
                          <span key={rIdx} className="text-xs font-semibold bg-white text-navy-900 px-2.5 py-1 rounded-lg border border-slate-200">
                            🛕 {r}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Circuit Highlights */}
            {circuit.highlights && circuit.highlights.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-navy-900 text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-saffron-500" />
                  <span>Key Package Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {circuit.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-navy-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Package Booking & Services */}
          <div className="space-y-6">
            {/* Sticky Action Card */}
            <div className="bg-gradient-to-br from-navy-900 via-navy-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-6 border border-navy-800">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-saffron-400">PACKAGE ACTION</span>
                <h3 className="font-poppins font-bold text-xl text-white">Book Complete {circuit.name}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Generate a full day-by-day AI travel itinerary covering all <strong>{circuit.stops.length} sacred destinations</strong> included in this circuit.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-navy-800 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Destinations Included:</span>
                  <strong className="text-white">{circuit.stops.length} Sacred Places</strong>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <strong className="text-white">{circuit.duration}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Est. Total Budget:</span>
                  <strong className="text-emerald-400 font-bold">₹{circuit.estimatedBudget?.toLocaleString()} / person</strong>
                </div>
              </div>

              <button
                onClick={handlePlanAndBookCircuit}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-500 to-amber-600 hover:from-saffron-600 hover:to-amber-700 text-white font-poppins font-extrabold text-sm py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 disabled:opacity-60"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Plan & Book Whole Circuit</span>
              </button>
            </div>

            {/* Included Services */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-poppins font-bold text-navy-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>What's Included in Package</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                {circuit.inclusions ? (
                  circuit.inclusions.map((inc, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Complete Yatra Registration & Permits</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Transport (Helicopter/Private SUV options)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Hotel & Ashram Stays near Temples</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Pure Vegetarian Meals</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
