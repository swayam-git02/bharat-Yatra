import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinationsData';
import DestinationCard from '../components/travel-cards/DestinationCard';
import SectionHeader from '../components/common/SectionHeader';
import SearchBar from '../components/forms/SearchBar';
import { LayoutGrid, List, SlidersHorizontal, MapPin, Filter, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Explore() {
  const location = useLocation();
  const initialType = location.state?.typeFilter || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState(initialType);
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const states = ['All', 'Uttarakhand', 'Goa', 'Rajasthan', 'Uttar Pradesh', 'Kerala', 'Ladakh', 'Himachal Pradesh', 'Jammu & Kashmir', 'West Bengal', 'Karnataka', 'Punjab'];
  const categories = ['All', 'Mountains', 'Beaches', 'Spiritual', 'Heritage', 'Nature'];

  const [apiDestinations, setApiDestinations] = useState(DESTINATIONS);

  React.useEffect(() => {
    async function fetchFromBackend() {
      try {
        const { destinationService } = await import('../services/api');
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (selectedState !== 'All') params.state = selectedState;
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (selectedBudget === 'under2500') params.budget = 2500;
        else if (selectedBudget === '2500-4000') params.budget = 4000;

        const res = await destinationService.getAll(params);
        if (res && res.data && res.data.length > 0) {
          setApiDestinations(res.data);
        }
      } catch (err) {
        // Local dataset fallback
        setApiDestinations(DESTINATIONS);
      }
    }
    fetchFromBackend();
  }, [searchQuery, selectedState, selectedCategory, selectedBudget]);

  const filteredDestinations = useMemo(() => {
    return apiDestinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dest.state && dest.state.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (dest.tagline && dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesState = selectedState === 'All' || dest.state === selectedState;
      const matchesCategory = selectedCategory === 'All' || dest.type === selectedCategory;

      let matchesBudget = true;
      if (selectedBudget === 'under2500') matchesBudget = dest.avgBudgetPerDay <= 2500;
      else if (selectedBudget === '2500-4000') matchesBudget = dest.avgBudgetPerDay > 2500 && dest.avgBudgetPerDay <= 4000;
      else if (selectedBudget === 'above4000') matchesBudget = dest.avgBudgetPerDay > 4000;

      return matchesSearch && matchesState && matchesCategory && matchesBudget;
    });
  }, [apiDestinations, searchQuery, selectedState, selectedCategory, selectedBudget]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedState('All');
    setSelectedCategory('All');
    setSelectedBudget('All');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Destination Discovery"
        title="Explore Incredible Destinations in India"
        subtitle="Search and filter through 25+ handpicked destinations by state, travel style, budget, and best season."
      />

      {/* Filter Control Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-2/3">
            <SearchBar
              placeholder="Search by city, state, or interest (e.g. Rishikesh, Beach, Yoga)..."
              onSelect={(dest) => setSearchQuery(dest.name)}
            />
          </div>

          {/* Grid/List View & Reset */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Select Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">State / Region</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-navy-900 bg-slate-50 focus:ring-2 focus:ring-saffron-500 outline-none"
            >
              {states.map((st) => (
                <option key={st} value={st}>{st === 'All' ? 'All States' : st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Destination Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-navy-900 bg-slate-50 focus:ring-2 focus:ring-saffron-500 outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Budget / Day</label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-navy-900 bg-slate-50 focus:ring-2 focus:ring-saffron-500 outline-none"
            >
              <option value="All">All Budgets</option>
              <option value="under2500">Under ₹2,500 / day</option>
              <option value="2500-4000">₹2,500 - ₹4,000 / day</option>
              <option value="above4000">₹4,000+ / day</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-xs font-medium">
          Showing <span className="font-bold text-navy-900">{filteredDestinations.length}</span> destinations matching filters
        </p>
      </div>

      {/* Destination Grid / List */}
      {filteredDestinations.length > 0 ? (
        <motion.div
          layout
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          <AnimatePresence>
            {filteredDestinations.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200 max-w-md mx-auto space-y-4">
          <Filter className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-poppins font-bold text-navy-900 text-lg">No destinations found</h3>
          <p className="text-slate-500 text-xs">Try clearing your filters or searching for another location.</p>
          <button
            onClick={handleResetFilters}
            className="bg-navy-900 text-white font-semibold text-xs px-4 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
