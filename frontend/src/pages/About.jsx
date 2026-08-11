import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { MapPin, Compass, ShieldCheck, Heart, Sparkles, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SectionHeader
        badge="Our Story"
        title="Revolutionizing Indian Travel Planning"
        subtitle="Bharat Yatra was built to solve the complexity of discovering, customizing, and executing perfect travel itineraries across India."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider block">Empowering 1B+ Travelers</span>
          <h2 className="font-poppins font-bold text-3xl text-navy-900 leading-tight">
            Explore India. Your Way.
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            India is an extraordinary mosaic of cultures, terrains, cuisines, and sacred pilgrimages. Generic travel websites fail to address India-specific nuances like local scooty rentals in Rishikesh & Goa, UNESCO steam trains in Darjeeling, or timing trips with divine Ganga Aartis and vibrant festivals.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our recommendation engine calculates day-by-day routes, estimated daily budgets, local food picks, and seasonal weather advice tailored around your unique schedule.
          </p>

          <button
            onClick={() => navigate('/planner')}
            className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
          >
            <Rocket className="w-4 h-4" />
            <span>Try Smart Trip Planner</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-saffron-500 to-indiangreen-600 rounded-3xl transform rotate-2 scale-95 opacity-20 blur-lg" />
          <img
            src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000&auto=format&fit=crop"
            alt="Varanasi Ghats"
            className="relative rounded-3xl shadow-xl object-cover h-96 w-full"
          />
        </div>
      </div>
    </div>
  );
}
