import React, { useState } from 'react';
import { FESTIVALS } from '../data/festivalsData';
import FestivalCard from '../components/travel-cards/FestivalCard';
import SectionHeader from '../components/common/SectionHeader';
import { Calendar, Sparkles, Filter } from 'lucide-react';

export default function Festivals() {
  const [selectedSeason, setSelectedSeason] = useState('All');

  const seasons = ['All', 'Spring', 'Autumn', 'Winter', 'Monsoon'];

  const filteredFestivals = FESTIVALS.filter(
    (f) => selectedSeason === 'All' || f.season.toLowerCase() === selectedSeason.toLowerCase()
  );

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Cultural Experience"
        title="Indian Festival Travel Explorer"
        subtitle="Discover India's vibrant tapestry of celebrations and plan trips aligned with iconic cultural festivals."
      />

      {/* Season Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {seasons.map((season) => (
          <button
            key={season}
            onClick={() => setSelectedSeason(season)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedSeason === season
                ? 'bg-saffron-500 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {season} {season === 'All' ? 'Festivals' : ''}
          </button>
        ))}
      </div>

      {/* Festival Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredFestivals.map((fest) => (
          <FestivalCard key={fest.id} festival={fest} />
        ))}
      </div>
    </div>
  );
}
