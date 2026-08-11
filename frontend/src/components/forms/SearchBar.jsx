import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, ArrowRight, Sparkles } from 'lucide-react';

import { DESTINATIONS } from '../../data/destinationsData';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ placeholder = "Where in India do you want to go?", onSelect }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const filtered = DESTINATIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.state.toLowerCase().includes(query.toLowerCase()) ||
      d.interests.some((i) => i.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectDest = (dest) => {
    setQuery(dest.name);
    setIsOpen(false);
    if (onSelect) {
      onSelect(dest);
    } else {
      navigate(`/explore/${dest.id}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center bg-white rounded-2xl shadow-xl border border-slate-100 p-2 transition-all focus-within:ring-4 focus-within:ring-saffron-500/20">
        <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-sm sm:text-base text-navy-900 placeholder-slate-400 focus:outline-none font-medium"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 rounded-full text-slate-400 hover:text-navy-900 mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => {
            if (filtered.length > 0) handleSelectDest(filtered[0]);
          }}
          className="flex items-center gap-1 bg-saffron-500 hover:bg-saffron-600 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all shrink-0"
        >
          <span>Search</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-72 overflow-y-auto z-50 divide-y divide-slate-50">
          {filtered.length > 0 ? (
            filtered.map((dest) => (
              <button
                key={dest.id}
                onClick={() => handleSelectDest(dest)}
                className="w-full flex items-center gap-3 p-3 hover:bg-saffron-50 text-left transition-colors"
              >
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-poppins font-bold text-navy-900 text-sm truncate">{dest.name}</div>
                  <div className="text-xs text-slate-500 truncate">{dest.state} • {dest.tagline}</div>
                </div>
                <div className="text-xs font-semibold text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded-md border border-saffron-100 shrink-0">
                  ₹{dest.avgBudgetPerDay}/day
                </div>
              </button>
            ))
          ) : null}

          {query.trim() && (
            <button
              onClick={() => {
                navigate('/planner', { state: { customDest: query.trim() } });
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-3.5 bg-saffron-50 hover:bg-saffron-100 text-left transition-colors font-semibold text-xs text-saffron-900 border-t border-saffron-100"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-saffron-600 shrink-0 animate-pulse" />
                <span>Plan custom AI itinerary for <strong>"{query.trim()}"</strong></span>
              </div>
              <ArrowRight className="w-4 h-4 text-saffron-600 shrink-0" />
            </button>
          )}
        </div>
      )}

    </div>
  );
}
