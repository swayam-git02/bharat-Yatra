import React, { useState } from 'react';
import { SPIRITUAL_CIRCUITS } from '../data/spiritualCircuitsData';
import CircuitCard from '../components/travel-cards/CircuitCard';
import SectionHeader from '../components/common/SectionHeader';
import { Search, Compass, Sparkles, MapPin } from 'lucide-react';

export default function SpiritualCircuits() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCircuits = SPIRITUAL_CIRCUITS.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q) ||
      c.stops.some((s) => s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q))
    );
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Sacred Pilgrimage Packages"
        title="Spiritual Circuits & Yatra Packages of India"
        subtitle="View comprehensive package information for sacred pilgrimage trails and book AI-powered day-by-day itineraries covering every holy destination included in the entire circuit."
      />

      {/* Search & Banner Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pilgrimage circuits or holy shrines (e.g. Char Dham, Kedarnath, Jyotirlinga, Vrindavan, Ramayana, Golden Temple)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-saffron-500 text-sm font-medium text-navy-900 shadow-xs outline-none bg-slate-50/50 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-slate-100 pt-6">
          <div className="space-y-1">
            <span className="text-2xl font-poppins font-extrabold text-saffron-600">6+</span>
            <span className="text-xs font-semibold text-slate-600 block">Sacred Circuits</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-poppins font-extrabold text-navy-900">30+</span>
            <span className="text-xs font-semibold text-slate-600 block">Holy Shrines Covered</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-poppins font-extrabold text-emerald-600">100%</span>
            <span className="text-xs font-semibold text-slate-600 block">Google Search Grounded</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-poppins font-extrabold text-amber-600">All-Inclusive</span>
            <span className="text-xs font-semibold text-slate-600 block">Whole Circuit Booking</span>
          </div>
        </div>
      </div>

      {/* Circuits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCircuits.map((circuit) => (
          <CircuitCard key={circuit.id} circuit={circuit} />
        ))}
      </div>

      {filteredCircuits.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8 space-y-4">
          <Compass className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-poppins font-bold text-lg text-navy-900">No matching spiritual circuit found</h3>
          <p className="text-slate-500 text-xs max-w-md mx-auto">
            Can't find your specific pilgrimage route? Use our AI Trip Planner to create a custom itinerary for any sacred shrine in India.
          </p>
        </div>
      )}
    </div>
  );
}
