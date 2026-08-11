import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Compass, Heart, Bookmark, Sparkles } from 'lucide-react';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { title: 'Plan New Trip', desc: 'Create a custom personalized itinerary', icon: Rocket, path: '/planner', color: 'from-saffron-500 to-saffron-600 text-white' },
    { title: 'Explore Destinations', desc: 'Discover 25+ iconic Indian spots', icon: Compass, path: '/explore', color: 'bg-white text-navy-900 border border-slate-200' },
    { title: 'View Saved Trips', desc: 'Edit or share your created journeys', icon: Bookmark, path: '/saved-trips', color: 'bg-white text-navy-900 border border-slate-200' },
    { title: 'My Wishlist', desc: 'Saved destination collections', icon: Heart, path: '/wishlist', color: 'bg-white text-navy-900 border border-slate-200' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act, i) => (
        <button
          key={i}
          onClick={() => navigate(act.path)}
          className={`p-5 rounded-2xl text-left shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${act.color}`}
        >
          <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center mb-3">
            <act.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h4 className="font-poppins font-bold text-base">{act.title}</h4>
            <p className="text-xs opacity-80 mt-1 line-clamp-1">{act.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
