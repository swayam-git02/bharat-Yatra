import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DESTINATIONS } from '../../data/destinationsData';
import { useTrip } from '../../context/TripContext';
import { useToast } from '../../context/ToastContext';
import {
  Plus,
  Trash2,
  Edit3,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Sparkles,
  Check,
  Search,
  ArrowRight,
  Heart,
  Save,
  Layers,
  Utensils,
  Camera,
  Compass,
  AlertCircle
} from 'lucide-react';

export default function CustomItineraryBuilder({ initialDestName = '' }) {
  const navigate = useNavigate();
  const { setCurrentItinerary, saveCurrentTrip } = useTrip();
  const { showToast } = useToast();

  const [destinationName, setDestinationName] = useState(initialDestName || 'Rishikesh');
  const [searchQuery, setSearchQuery] = useState('');
  const [tripTitle, setTripTitle] = useState('My Custom Travel Itinerary');
  const [numDays, setNumDays] = useState(3);
  const [budget, setBudget] = useState(15000);
  const [travelStyle, setTravelStyle] = useState('Friends');

  // Initial Days Structure
  const [days, setDays] = useState([
    {
      day: 1,
      title: 'Day 1: Arrival & Exploration',
      dayBudget: 3000,
      tips: ['Check in to accommodation', 'Keep cash handy for local autos'],
      activities: [
        {
          id: 'act-1-1',
          time: 'Morning (09:00 AM)',
          title: 'Arrival & Check-in',
          desc: 'Arrive at destination, check into hotel/guesthouse and unpack.',
          cost: 500,
          category: 'Attraction',
          transport: 'Local Auto / Taxi',
          duration: '2 hours'
        },
        {
          id: 'act-1-2',
          time: 'Afternoon (01:30 PM)',
          title: 'Local Sightseeing & Lunch',
          desc: 'Visit iconic local sights and enjoy traditional regional cuisine.',
          cost: 800,
          category: 'Sightseeing',
          transport: 'Walking',
          duration: '3 hours'
        }
      ]
    },
    {
      day: 2,
      title: 'Day 2: Main Attractions & Culture',
      dayBudget: 4000,
      tips: ['Wear comfortable walking shoes'],
      activities: [
        {
          id: 'act-2-1',
          time: 'Morning (08:30 AM)',
          title: 'Main Temple / Landmark Visit',
          desc: 'Explore famous heritage monuments, temples, or nature spots.',
          cost: 600,
          category: 'Attraction',
          transport: 'Scooty / Cab',
          duration: '3 hours'
        }
      ]
    },
    {
      day: 3,
      title: 'Day 3: Shopping & Departure',
      dayBudget: 3000,
      tips: ['Bargain politely in local bazaars'],
      activities: [
        {
          id: 'act-3-1',
          time: 'Morning (10:00 AM)',
          title: 'Local Market & Souvenir Shopping',
          desc: 'Pick up local handicrafts, spices, and souvenirs.',
          cost: 1000,
          category: 'Shopping',
          transport: 'Walking',
          duration: '2 hours'
        }
      ]
    }
  ]);

  // Form modal state for adding new activity
  const [activeDayIdx, setActiveDayIdx] = useState(null);
  const [newActivity, setNewActivity] = useState({
    time: 'Morning (09:00 AM)',
    title: '',
    desc: '',
    cost: 200,
    category: 'Attraction',
    transport: 'Local Transport',
    duration: '2 hours'
  });

  // Handle adding a day
  const handleAddDay = () => {
    if (days.length >= 14) {
      showToast('Maximum 14 days allowed in manual builder.', 'info');
      return;
    }
    const newDayNum = days.length + 1;
    setDays([
      ...days,
      {
        day: newDayNum,
        title: `Day ${newDayNum}: Custom Exploration`,
        dayBudget: 3000,
        tips: [],
        activities: []
      }
    ]);
    setNumDays(newDayNum);
    showToast(`Added Day ${newDayNum} to your itinerary! ✨`, 'success');
  };

  // Handle removing a day
  const handleRemoveDay = (dayIdx) => {
    if (days.length <= 1) {
      showToast('Itinerary must have at least 1 day.', 'info');
      return;
    }
    const updated = days.filter((_, idx) => idx !== dayIdx).map((d, idx) => ({ ...d, day: idx + 1 }));
    setDays(updated);
    setNumDays(updated.length);
  };

  // Handle editing day title
  const handleUpdateDayTitle = (dayIdx, newTitle) => {
    const updated = [...days];
    updated[dayIdx].title = newTitle;
    setDays(updated);
  };

  // Add activity to day
  const handleSaveActivity = (e) => {
    e.preventDefault();
    if (activeDayIdx === null || !newActivity.title.trim()) return;

    const updated = [...days];
    const createdActivity = {
      ...newActivity,
      id: `act-${Date.now()}-${Math.random()}`,
      cost: parseInt(newActivity.cost, 10) || 0
    };

    updated[activeDayIdx].activities.push(createdActivity);
    setDays(updated);
    setActiveDayIdx(null);
    setNewActivity({
      time: 'Morning (09:00 AM)',
      title: '',
      desc: '',
      cost: 200,
      category: 'Attraction',
      transport: 'Local Transport',
      duration: '2 hours'
    });
    showToast('Activity added to your day schedule! 📍', 'success');
  };

  // Delete activity from day
  const handleDeleteActivity = (dayIdx, actId) => {
    const updated = [...days];
    updated[dayIdx].activities = updated[dayIdx].activities.filter((a) => a.id !== actId);
    setDays(updated);
  };

  // Calculate live total estimated budget from activities
  const calculatedTotalCost = useMemo(() => {
    return days.reduce((sum, d) => {
      const dayTotal = d.activities.reduce((actSum, a) => actSum + (a.cost || 0), 0);
      return sum + dayTotal;
    }, 0);
  }, [days]);

  // Submit and create custom itinerary
  const handleSubmitCustomItinerary = (e) => {
    e.preventDefault();

    if (!destinationName.trim()) {
      showToast('Please enter a destination name.', 'error');
      return;
    }

    const matchedDest = DESTINATIONS.find(
      (d) => d.name.toLowerCase() === destinationName.toLowerCase() || d.id === destinationName.toLowerCase()
    );

    const customTrip = {
      id: `custom-trip-${Date.now()}`,
      title: tripTitle || `Custom ${destinationName} Itinerary`,
      destinationName: destinationName.trim(),
      destinationId: matchedDest ? matchedDest.id : destinationName.toLowerCase().replace(/\s+/g, '-'),
      days: days.length,
      budget: parseInt(budget, 10) || 15000,
      estimatedTotal: calculatedTotalCost > 0 ? calculatedTotalCost : parseInt(budget, 10),
      travelStyle,
      travelers: 2,
      pace: 'Custom',
      createdDate: new Date().toISOString().split('T')[0],
      image: matchedDest ? matchedDest.heroImage : 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
      itineraryDays: days,
      budgetBreakdown: {
        accommodation: Math.round(calculatedTotalCost * 0.4),
        transport: Math.round(calculatedTotalCost * 0.2),
        activities: Math.round(calculatedTotalCost * 0.25),
        food: Math.round(calculatedTotalCost * 0.15),
        total: calculatedTotalCost || budget
      },
      travelTips: [
        'Custom user-designed itinerary.',
        'Verify local timings and entry fees before visiting.'
      ],
      sources: [],
      isAiGenerated: false
    };

    setCurrentItinerary(customTrip);
    showToast('Your custom itinerary has been created! 🎉', 'success');
    navigate('/generated-itinerary');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl space-y-8 max-w-4xl mx-auto">
      {/* Header Badge */}
      <div className="border-b border-slate-100 pb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            Manual Itinerary Builder
          </span>
          <h2 className="font-poppins font-bold text-navy-900 text-2xl">
            Design Your Own Travel Schedule
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Build your travel plan manually step-by-step. Add custom days, places, activities, and budget costs without using AI.
          </p>
        </div>

        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Calculated Total</span>
          <span className="font-poppins font-extrabold text-lg text-emerald-600">
            ₹{calculatedTotalCost.toLocaleString()}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmitCustomItinerary} className="space-y-8">
        {/* Basic Trip Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
              Destination City / Shrine
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-saffron-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={destinationName}
                onChange={(e) => setDestinationName(e.target.value)}
                placeholder="Enter any Indian city (e.g. Rishikesh, Kedarnath, Vrindavan, Goa)..."
                className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-navy-900 outline-none focus:ring-2 focus:ring-saffron-500 bg-slate-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
              Itinerary Title
            </label>
            <input
              type="text"
              required
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
              placeholder="e.g. My Custom 4-Day Road Trip"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-navy-900 outline-none focus:ring-2 focus:ring-saffron-500 bg-slate-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
              Target Budget (₹)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-emerald-600 outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
              Travel Style
            </label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-navy-900 outline-none focus:ring-2 focus:ring-saffron-500 bg-slate-50"
            >
              <option value="Friends">Friends 👯‍♂️</option>
              <option value="Couple">Couple 👩‍❤️‍👨</option>
              <option value="Family">Family 👨‍👩‍👧‍👦</option>
              <option value="Solo">Solo 🎒</option>
            </select>
          </div>
        </div>

        {/* Day-by-Day Activity Builder */}
        <div className="space-y-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider block">DAY SCHEDULE BUILDER</span>
              <h3 className="font-poppins font-bold text-navy-900 text-xl">
                Manual Days ({days.length} Days)
              </h3>
            </div>

            <button
              type="button"
              onClick={handleAddDay}
              className="flex items-center gap-1.5 bg-saffron-50 hover:bg-saffron-100 text-saffron-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-saffron-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Day</span>
            </button>
          </div>

          {/* Days Accordion Cards */}
          <div className="space-y-6">
            {days.map((dayData, dayIdx) => (
              <div
                key={dayIdx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 relative"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="w-8 h-8 rounded-xl bg-navy-900 text-white font-extrabold text-xs flex items-center justify-center shadow shrink-0">
                      D{dayData.day}
                    </span>
                    <input
                      type="text"
                      value={dayData.title}
                      onChange={(e) => handleUpdateDayTitle(dayIdx, e.target.value)}
                      className="font-poppins font-bold text-base text-navy-900 bg-transparent border-b border-dashed border-slate-300 focus:border-saffron-500 outline-none w-full max-w-md"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveDayIdx(dayIdx)}
                      className="flex items-center gap-1 bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs px-3 py-2 rounded-xl shadow-xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Activity</span>
                    </button>

                    {days.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDay(dayIdx)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-100 transition-colors"
                        title="Delete Day"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Activity Items List */}
                <div className="space-y-2 pt-2">
                  {dayData.activities.map((act) => (
                    <div
                      key={act.id}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs shadow-2xs"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 font-bold text-navy-900">
                          <span className="text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-100 text-[11px]">
                            {act.time}
                          </span>
                          <span>{act.title}</span>
                          <span className="text-emerald-600 font-semibold ml-auto font-mono">
                            ₹{act.cost}
                          </span>
                        </div>
                        {act.desc && <p className="text-slate-500 text-[11px] line-clamp-1">{act.desc}</p>}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteActivity(dayIdx, act.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Delete Activity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {dayData.activities.length === 0 && (
                    <div className="text-center py-4 text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                      No activities added for Day {dayData.day} yet. Click "+ Add Activity" above to add morning, afternoon, or evening events.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Inline Overlay to Add Activity */}
        {activeDayIdx !== null && (
          <div className="p-6 rounded-2xl bg-navy-950 text-white space-y-4 border border-navy-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h4 className="font-poppins font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-saffron-400" />
                <span>Add Custom Activity to Day {days[activeDayIdx].day}</span>
              </h4>
              <button
                type="button"
                onClick={() => setActiveDayIdx(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Time Slot</label>
                <select
                  value={newActivity.time}
                  onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs font-medium text-white outline-none"
                >
                  <option value="Morning (08:30 AM)">Morning (08:30 AM)</option>
                  <option value="Afternoon (01:30 PM)">Afternoon (01:30 PM)</option>
                  <option value="Evening (06:00 PM)">Evening (06:00 PM)</option>
                  <option value="Night (09:00 PM)">Night (09:00 PM)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Activity Title</label>
                <input
                  type="text"
                  required
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  placeholder="e.g. Sunrise Boat Ride or Ganga Aarti"
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs font-medium text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Category</label>
                <select
                  value={newActivity.category}
                  onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs font-medium text-white outline-none"
                >
                  <option value="Attraction">Attraction</option>
                  <option value="Sightseeing">Sightseeing</option>
                  <option value="Food">Food & Dining</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Shopping">Shopping</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Estimated Cost (₹)</label>
                <input
                  type="number"
                  value={newActivity.cost}
                  onChange={(e) => setNewActivity({ ...newActivity, cost: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs font-medium text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Local Transport</label>
                <input
                  type="text"
                  value={newActivity.transport}
                  onChange={(e) => setNewActivity({ ...newActivity, transport: e.target.value })}
                  placeholder="Scooty / Walking / Auto"
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs font-medium text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Short Description</label>
              <input
                type="text"
                value={newActivity.desc}
                onChange={(e) => setNewActivity({ ...newActivity, desc: e.target.value })}
                placeholder="Optional details or instructions..."
                className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs font-medium text-white outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveActivity}
                className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
              >
                Save Activity
              </button>
            </div>
          </div>
        )}

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-slate-500 font-medium">
            Building <strong>{days.length} Days</strong> for <strong>{destinationName}</strong> (Total ₹{calculatedTotalCost.toLocaleString()})
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-poppins font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-xl transition-transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Create & View My Custom Itinerary</span>
          </button>
        </div>
      </form>
    </div>
  );
}
