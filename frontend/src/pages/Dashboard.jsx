import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import TravelMetricCard from '../components/user-panel/TravelMetricCard';
import QuickActions from '../components/user-panel/QuickActions';
import TravelChart from '../components/user-panel/TravelChart';
import SectionHeader from '../components/common/SectionHeader';
import { MOCK_NOTIFICATIONS } from '../data/userMockData';
import { Rocket, Compass, MapPin, Calendar, Bell, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { savedTrips } = useTrip();
  const navigate = useNavigate();

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Greeting Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <span className="text-xs font-semibold text-saffron-400 uppercase tracking-wider block">
            Traveler Command Center
          </span>
          <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl text-white">
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            You've planned {savedTrips.length + 10} journeys and explored {user.stats.destinationsExplored} destinations across {user.stats.statesVisited} Indian states.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => navigate('/planner')}
            className="flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-poppins font-bold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-saffron-500/30 transition-all hover:scale-105"
          >
            <Rocket className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
        </div>
      </div>

      {/* Notifications Alert Banner */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-poppins font-bold text-navy-900 text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-saffron-500" />
            <span>Recent Traveler Alerts</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_NOTIFICATIONS.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                notif.type === 'info'
                  ? 'bg-sky-50/70 border-sky-100 text-sky-900'
                  : notif.type === 'warning'
                  ? 'bg-amber-50/70 border-amber-100 text-amber-900'
                  : 'bg-emerald-50/70 border-emerald-100 text-emerald-900'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span>{notif.date}</span>
                {!notif.read && <span className="w-2 h-2 rounded-full bg-saffron-500 animate-ping" />}
              </div>
              <p>{notif.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Statistics Overview */}
      <div className="space-y-4">
        <h3 className="font-poppins font-bold text-navy-900 text-xl">Travel Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TravelMetricCard label="Trips Planned" value={user.stats.tripsPlanned} icon={Rocket} color="saffron" />
          <TravelMetricCard label="Destinations Explored" value={user.stats.destinationsExplored} icon={Compass} color="green" />
          <TravelMetricCard label="States Visited" value={user.stats.statesVisited} icon={MapPin} color="blue" />
          <TravelMetricCard label="Est. Spend Saved" value={user.stats.totalBudgetSaved} prefix="₹" icon={Heart} color="purple" />
        </div>
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="space-y-4">
        <h3 className="font-poppins font-bold text-navy-900 text-xl">Quick Actions</h3>
        <QuickActions />
      </div>

      {/* Travel Activity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <TravelChart />
        </div>

        {/* Upcoming / Recent Trip Preview */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-navy-900 text-lg">Saved Trips Preview</h3>
            <Link to="/saved-trips" className="text-xs font-bold text-saffron-600 hover:text-saffron-700">
              View All ({savedTrips.length})
            </Link>
          </div>

          <div className="space-y-3">
            {savedTrips.slice(0, 2).map((trip) => (
              <div key={trip.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <img src={trip.image} alt={trip.title} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-navy-900 text-xs truncate">{trip.title}</div>
                  <div className="text-[10px] text-slate-400">{trip.days} Days • ₹{trip.budget?.toLocaleString()}</div>
                </div>
                <button
                  onClick={() => navigate('/saved-trips')}
                  className="p-1.5 rounded-lg bg-white text-navy-900 shadow-xs border border-slate-200 text-xs font-semibold"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
