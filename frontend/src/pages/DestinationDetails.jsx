import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinationsData';
import { useWishlist } from '../context/WishlistContext';
import TransportCard from '../components/travel-cards/TransportCard';
import FoodCard from '../components/travel-cards/FoodCard';
import { MapPin, Calendar, Star, DollarSign, Clock, Thermometer, Rocket, Heart, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const dest = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];
  const isWishlisted = isInWishlist(dest.id);

  const handlePlanTrip = () => {
    navigate('/planner', { state: { preFillDest: dest.id } });
  };

  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* Hero Header */}
      <div className="relative h-[65vh] min-h-[420px] bg-navy-950 text-white">
        <img
          src={dest.heroImage}
          alt={dest.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-6 right-4 sm:right-8 z-10">
          <button
            onClick={() => toggleWishlist(dest.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${
              isWishlisted ? 'bg-rose-500 text-white shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            <span>{isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
          </button>
        </div>

        {/* Hero Overlay Text */}
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-saffron-500 text-white shadow">
            <MapPin className="w-3.5 h-3.5" />
            <span>{dest.state}, {dest.region}</span>
          </div>

          <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white">
            {dest.name}
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl font-medium">
            {dest.tagline}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quick Stats Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg grid grid-cols-2 md:grid-cols-5 gap-4 -mt-16 relative z-20">
          <div className="space-y-1 border-r border-slate-100 last:border-0 pr-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Best Season</span>
            <div className="font-poppins font-bold text-navy-900 text-sm sm:text-base flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-saffron-500" />
              <span>{dest.bestSeason}</span>
            </div>
          </div>

          <div className="space-y-1 border-r border-slate-100 last:border-0 pr-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Avg. Budget / Day</span>
            <div className="font-poppins font-bold text-navy-900 text-sm sm:text-base flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>₹{dest.avgBudgetPerDay?.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-1 border-r border-slate-100 last:border-0 pr-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Duration</span>
            <div className="font-poppins font-bold text-navy-900 text-sm sm:text-base flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>{dest.recommendedDays} Days</span>
            </div>
          </div>

          <div className="space-y-1 border-r border-slate-100 last:border-0 pr-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Weather</span>
            <div className="font-poppins font-bold text-navy-900 text-sm sm:text-base flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-rose-500" />
              <span>{dest.weather?.temp || 'Pleasant'}</span>
            </div>
          </div>

          <div className="space-y-1 col-span-2 md:col-span-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Rating</span>
            <div className="font-poppins font-bold text-navy-900 text-sm sm:text-base flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{dest.rating} ({dest.reviewsCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Overview & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
              <h2 className="font-poppins font-bold text-2xl text-navy-900">About {dest.name}</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{dest.description}</p>
            </div>

            {/* Top Attractions */}
            <div className="space-y-6">
              <h2 className="font-poppins font-bold text-2xl text-navy-900">Top Attractions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dest.topAttractions.map((attr, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <img src={attr.image} alt={attr.name} className="h-40 w-full object-cover" />
                    <div className="p-4 space-y-1">
                      <h4 className="font-poppins font-bold text-navy-900 text-base">{attr.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{attr.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Things to Do */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
              <h2 className="font-poppins font-bold text-2xl text-navy-900">Things To Do</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dest.thingsToDo.map((thing, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-medium text-navy-900">
                    <CheckCircle2 className="w-4 h-4 text-indiangreen-600 shrink-0 mt-0.5" />
                    <span>{thing}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA & Transport Guide */}
          <div className="space-y-6">
            {/* Sticky Action Card */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-950 text-white rounded-3xl p-6 space-y-6 shadow-xl sticky top-24">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-saffron-400 uppercase tracking-wider block">Ready to Explore?</span>
                <h3 className="font-poppins font-bold text-2xl text-white">Plan your trip to {dest.name}</h3>
                <p className="text-xs text-slate-300">
                  Generate a day-by-day customized itinerary with local food, transport, and budget recommendations.
                </p>
              </div>

              <button
                onClick={handlePlanTrip}
                className="w-full flex items-center justify-center gap-2.5 bg-saffron-500 hover:bg-saffron-600 text-white font-poppins font-bold text-base py-3.5 rounded-2xl shadow-lg shadow-saffron-500/30 transition-all hover:scale-105"
              >
                <Rocket className="w-5 h-5" />
                <span>Plan A Trip To {dest.name}</span>
              </button>
            </div>

            {/* Local Transport Widget */}
            {dest.transport && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-poppins font-bold text-navy-900 text-lg">
                  <Sparkles className="w-5 h-5 text-saffron-500" />
                  <span>Recommended Transport</span>
                </div>
                <div className="p-4 bg-saffron-50 rounded-2xl border border-saffron-200 space-y-2">
                  <div className="font-bold text-saffron-700 text-base">{dest.transport.primary}</div>
                  <div className="text-xs text-slate-600">{dest.transport.description}</div>
                  <div className="text-xs font-semibold text-navy-900 pt-1">Cost: {dest.transport.estimatedCost}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
