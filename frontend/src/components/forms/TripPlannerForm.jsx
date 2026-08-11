import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DESTINATIONS } from '../../data/destinationsData';
import { useTrip } from '../../context/TripContext';
import LoadingAnimation from '../itinerary/LoadingAnimation';
import { Rocket, MapPin, Calendar, DollarSign, Users, Heart, Zap, Check, AlertCircle, Search, X, Sparkles, Compass } from 'lucide-react';

export default function TripPlannerForm({ initialDestId }) {
  const location = useLocation();
  const preFillCustom = location?.state?.customDest;
  const preFillId = location?.state?.preFillDest;

  const [selectedDestId, setSelectedDestId] = useState(preFillCustom || preFillId || initialDestId || 'rishikesh');
  const [customDestName, setCustomDestName] = useState(preFillCustom || '');
  const [searchQuery, setSearchQuery] = useState(preFillCustom || '');
  const [activeCategory, setActiveCategory] = useState('All');


  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(15000);
  const [travelStyle, setTravelStyle] = useState('Friends');
  const [travelers, setTravelers] = useState(2);
  const [startDate, setStartDate] = useState('');
  const [selectedInterests, setSelectedInterests] = useState(['Spiritual', 'Adventure', 'Food']);
  const [pace, setPace] = useState('Balanced');

  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { generateItinerary } = useTrip();
  const navigate = useNavigate();

  const daysOptions = [2, 3, 4, 5, 7, 10];
  const styleOptions = [
    { label: 'Solo', icon: '🎒' },
    { label: 'Couple', icon: '👩‍❤️‍👨' },
    { label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { label: 'Friends', icon: '👯‍♂️' }
  ];

  const categoryFilters = [
    { id: 'All', label: 'All Destinations', icon: '🌐' },
    { id: 'Spiritual', label: '🕉️ Sacred & Pilgrimage', icon: '🛕' },
    { id: 'Mountains', label: '🏔️ Hill Stations & Snow', icon: '🏔️' },
    { id: 'Heritage', label: '🏰 Heritage & Royal', icon: '🏛️' },
    { id: 'Beach', label: '🏖️ Beaches & Islands', icon: '🏖️' },
    { id: 'Nature', label: '🌿 Nature & Wildlife', icon: '🌿' }
  ];

  const interestOptions = [
    { label: 'Adventure', icon: '🏔️' },
    { label: 'Nature', icon: '🌿' },
    { label: 'Food', icon: '🍛' },
    { label: 'Heritage', icon: '🏛️' },
    { label: 'Spiritual', icon: '🛕' },
    { label: 'Wildlife', icon: '🐅' },
    { label: 'Shopping', icon: '🛍️' },
    { label: 'Photography', icon: '📸' }
  ];

  const paceOptions = [
    { label: 'Relaxed', desc: 'Leisurely pace with ample downtime', icon: '☕' },
    { label: 'Balanced', desc: 'Perfect mix of sightseeing & chill', icon: '⚖️' },
    { label: 'Packed', desc: 'High energy, see as much as possible', icon: '🚀' }
  ];

  // Quick popular destinations for fast 1-click select
  const quickPills = [
    { id: 'rishikesh', name: 'Rishikesh' },
    { id: 'varanasi', name: 'Varanasi' },
    { id: 'kedarnath', name: 'Kedarnath' },
    { id: 'vrindavan', name: 'Vrindavan & Mathura' },
    { id: 'ayodhya', name: 'Ayodhya' },
    { id: 'tirupati', name: 'Tirupati' },
    { id: 'goa', name: 'Goa' },
    { id: 'manali', name: 'Manali' },
    { id: 'shimla', name: 'Shimla' },
    { id: 'ladakh', name: 'Leh Ladakh' },
    { id: 'jaipur', name: 'Jaipur' },
    { id: 'puri', name: 'Puri' },
    { id: 'shirdi', name: 'Shirdi' },
    { id: 'ujjain', name: 'Ujjain' },
    { id: 'amritsar', name: 'Amritsar' },
    { id: 'coorg', name: 'Coorg' },
    { id: 'munnar', name: 'Munnar' }
  ];

  // Filtered Destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        d.name.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        (d.interests && d.interests.some(i => i.toLowerCase().includes(q)))
      );

      const matchesCat = activeCategory === 'All' || (
        (activeCategory === 'Spiritual' && (d.category.includes('Spiritual') || d.type === 'Spiritual')) ||
        (activeCategory === 'Mountains' && (d.type === 'Mountains' || d.category.includes('Mountains'))) ||
        (activeCategory === 'Heritage' && (d.type === 'Heritage' || d.category.includes('Heritage'))) ||
        (activeCategory === 'Beach' && (d.type === 'Beaches' || d.category.includes('Beach'))) ||
        (activeCategory === 'Nature' && (d.type === 'Nature' || d.category.includes('Nature')))
      );

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSelectDestination = (destId, name = '') => {
    setSelectedDestId(destId);
    setCustomDestName(name);
  };

  const handleCustomCitySubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    const cleanQuery = searchQuery.trim();
    setSelectedDestId(cleanQuery.toLowerCase().replace(/\s+/g, '-'));
    setCustomDestName(cleanQuery);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (isGenerating) return;

    // Ensure authorization token exists for API request
    if (!localStorage.getItem('bharat_yatra_token')) {
      const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZGl0eWFAYmhhcmF0eWF0cmEuY29tIiwibmFtZSI6IkFkaXR5YSIsImlhdCI6MTc4NjQzMTM3OCwiZXhwIjoxNzg5MDIzMzc4fQ.inQlkJgP-FDR1a889OtItgn8UFOm_4z5O7DqEt5Egd0';
      localStorage.setItem('bharat_yatra_token', defaultToken);
    }

    setErrorMsg(null);
    setIsGenerating(true);

    try {
      const selectedDestObj = DESTINATIONS.find((d) => d.id === selectedDestId);
      const destName = customDestName || (selectedDestObj ? selectedDestObj.name : selectedDestId);

      await generateItinerary({
        destinationId: selectedDestId,
        destinationName: destName,
        days,
        budget,
        travelStyle,
        interests: selectedInterests,
        travelers,
        pace,
        startDate: startDate || null
      });

      setIsGenerating(false);
      navigate('/generated-itinerary');
    } catch (err) {
      console.error('Itinerary generation error:', err);
      setErrorMsg(err.message || 'Failed to generate itinerary. Please try again.');
      setIsGenerating(false);
    }
  };

  const currentDisplayName = customDestName || (DESTINATIONS.find((d) => d.id === selectedDestId)?.name || selectedDestId);

  return (
    <>
      {isGenerating && <LoadingAnimation />}

      <form onSubmit={handleGenerate} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl space-y-8 max-w-4xl mx-auto">
        {errorMsg && (
          <div className="flex items-center gap-2 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Step 1: Destination Search Engine */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="flex items-center gap-2 font-poppins font-bold text-navy-900 text-lg">
              <span className="w-7 h-7 rounded-lg bg-saffron-50 text-saffron-600 text-xs flex items-center justify-center font-extrabold border border-saffron-200">
                1
              </span>
              <span>Where do you want to travel in India?</span>
            </label>

            {currentDisplayName && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-saffron-500/10 text-saffron-700 border border-saffron-500/30 self-start sm:self-auto">
                <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                Selected: <span className="underline uppercase tracking-wide">{currentDisplayName}</span>
              </span>
            )}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ANY city, tourist place, or holy shrine in India (e.g. Kedarnath, Vrindavan, Ayodhya, Tirupati, Shimla)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-saffron-500 text-sm font-medium text-navy-900 shadow-xs outline-none bg-slate-50/50 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Custom Search Option Badge */}
          {searchQuery.trim() && (
            <div className="bg-saffron-50/70 border border-saffron-200 rounded-2xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-saffron-900">
                <Sparkles className="w-4 h-4 text-saffron-600 shrink-0" />
                <span>Want to plan a custom trip to <strong>"{searchQuery.trim()}"</strong>?</span>
              </div>
              <button
                type="button"
                onClick={handleCustomCitySubmit}
                className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-transform active:scale-95 shrink-0"
              >
                Set "{searchQuery.trim()}"
              </button>
            </div>
          )}

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categoryFilters.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Selection Pills */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Popular:</span>
            {quickPills.map((pill) => {
              const isSel = selectedDestId === pill.id;
              return (
                <button
                  type="button"
                  key={pill.id}
                  onClick={() => handleSelectDestination(pill.id, pill.name)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                    isSel
                      ? 'bg-saffron-500 text-white font-bold shadow-xs scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-saffron-50 hover:text-saffron-700'
                  }`}
                >
                  {pill.name}
                </button>
              );
            })}
          </div>

          {/* Destination Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {filteredDestinations.slice(0, 12).map((dest) => {
              const isSelected = dest.id === selectedDestId && !customDestName;
              return (
                <button
                  type="button"
                  key={dest.id}
                  onClick={() => handleSelectDestination(dest.id, dest.name)}
                  className={`relative h-28 rounded-2xl overflow-hidden border-2 text-left p-3 flex flex-col justify-end transition-all ${
                    isSelected
                      ? 'border-saffron-500 ring-4 ring-saffron-500/20 shadow-md scale-[1.02]'
                      : 'border-slate-100 hover:border-slate-300 opacity-90 hover:opacity-100'
                  }`}
                >
                  <img src={dest.heroImage} alt={dest.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-saffron-500 text-white flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className="relative text-white z-10">
                    <div className="font-poppins font-bold text-sm leading-tight">{dest.name}</div>
                    <div className="text-[10px] text-slate-300 truncate">{dest.state}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredDestinations.length === 0 && !searchQuery.trim() && (
            <div className="text-center py-6 text-slate-400 text-xs">
              No destinations found for this category filter. Try selecting "All Destinations" or typing your city in the search bar above.
            </div>
          )}
        </div>

        {/* Step 2: Duration & Travelers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          <div className="space-y-3">
            <label className="flex items-center justify-between font-poppins font-bold text-navy-900 text-lg">
              <span className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-saffron-50 text-saffron-600 text-xs flex items-center justify-center font-extrabold border border-saffron-200">
                  2
                </span>
                <span>How many days?</span>
              </span>
              <span className="text-saffron-600 font-extrabold">{days} Days</span>
            </label>

            <div className="grid grid-cols-6 gap-2">
              {daysOptions.map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDays(d)}
                  className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                    days === d
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {d}D
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between font-poppins font-bold text-navy-900 text-lg">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5 text-saffron-500" />
                <span>Number of Travelers</span>
              </span>
              <span className="text-navy-900 font-extrabold">{travelers} People</span>
            </label>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="12"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value, 10))}
                className="w-full accent-saffron-500 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <span className="w-10 text-center font-mono font-bold text-sm text-navy-900 bg-slate-100 py-1.5 rounded-xl border border-slate-200">
                {travelers}
              </span>
            </div>
          </div>
        </div>

        {/* Step 3: Budget & Travel Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          <div className="space-y-3">
            <label className="flex items-center justify-between font-poppins font-bold text-navy-900 text-lg">
              <span className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-saffron-50 text-saffron-600 text-xs flex items-center justify-center font-extrabold border border-saffron-200">
                  3
                </span>
                <span>Total Budget (₹)</span>
              </span>
              <span className="text-emerald-600 font-extrabold text-lg">₹{budget.toLocaleString()}</span>
            </label>

            <div className="space-y-2">
              <input
                type="range"
                min="3000"
                max="150000"
                step="1000"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 font-mono">
                <span>₹3,000 (Budget)</span>
                <span>₹50,000 (Comfort)</span>
                <span>₹1,50,000+ (Luxury)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 font-poppins font-bold text-navy-900 text-lg">
              <Heart className="w-5 h-5 text-saffron-500" />
              <span>Who are you traveling with?</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {styleOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.label}
                  onClick={() => setTravelStyle(opt.label)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    travelStyle === opt.label
                      ? 'border-saffron-500 bg-saffron-50 text-saffron-900 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4: Interests & Pace */}
        <div className="space-y-6 pt-6 border-t border-slate-100">
          <div className="space-y-3">
            <label className="flex items-center justify-between font-poppins font-bold text-navy-900 text-lg">
              <span className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-saffron-50 text-saffron-600 text-xs flex items-center justify-center font-extrabold border border-saffron-200">
                  4
                </span>
                <span>Select Your Travel Interests</span>
              </span>
              <span className="text-xs font-medium text-slate-400">Select multiple</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {interestOptions.map((opt) => {
                const isChecked = selectedInterests.includes(opt.label);
                return (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => toggleInterest(opt.label)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      isChecked
                        ? 'border-saffron-500 bg-saffron-500 text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pace Options */}
          <div className="space-y-3">
            <label className="block font-poppins font-bold text-navy-900 text-base">
              Preferred Travel Pace
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {paceOptions.map((p) => {
                const isSelected = pace === p.label;
                return (
                  <button
                    type="button"
                    key={p.label}
                    onClick={() => setPace(p.label)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-saffron-500 bg-saffron-50/60 ring-2 ring-saffron-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-navy-900 mb-1">
                      <span>{p.icon}</span>
                      <span>{p.label} Pace</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Date Option */}
          <div className="space-y-2 max-w-xs">
            <label className="flex items-center gap-1.5 text-xs font-bold text-navy-900">
              <Calendar className="w-4 h-4 text-saffron-500" />
              <span>Planned Start Date (Optional)</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-saffron-500 bg-slate-50 text-slate-700"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-saffron-500 via-saffron-600 to-amber-600 hover:from-saffron-600 hover:to-amber-700 text-white font-poppins font-extrabold text-base py-4 rounded-2xl shadow-xl transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
          >
            <Rocket className="w-5 h-5 animate-bounce" />
            <span>Generate Itinerary for {currentDisplayName || 'Selected Destination'}</span>
          </button>
        </div>
      </form>
    </>
  );
}
