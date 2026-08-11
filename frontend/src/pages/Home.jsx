import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { DESTINATIONS } from '../data/destinationsData';
import { FESTIVALS } from '../data/festivalsData';
import { SPIRITUAL_CIRCUITS } from '../data/spiritualCircuitsData';
import DestinationCard from '../components/travel-cards/DestinationCard';
import FestivalCard from '../components/travel-cards/FestivalCard';
import CircuitCard from '../components/travel-cards/CircuitCard';
import SectionHeader from '../components/common/SectionHeader';
import SearchBar from '../components/forms/SearchBar';
import { Rocket, Compass, Sparkles, MapPin, ShieldCheck, HeartHandshake, Zap, Award, ArrowRight } from 'lucide-react';

export default function Home() {
  const heroRef = useRef(null);
  const floatingCardsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP subtle floating animation for hero elements
    if (floatingCardsRef.current) {
      gsap.to(floatingCardsRef.current.children, {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.3
      });
    }
  }, []);

  const categories = [
    { title: 'Mountains', icon: '🏔️', type: 'Mountains' },
    { title: 'Beaches', icon: '🏖️', type: 'Beaches' },
    { title: 'Spiritual', icon: '🛕', type: 'Spiritual' },
    { title: 'Heritage', icon: '🏛️', type: 'Heritage' },
    { title: 'Nature', icon: '🌿', type: 'Nature' },
    { title: 'Wildlife', icon: '🐅', type: 'Nature' },
    { title: 'Food', icon: '🍛', type: 'Heritage' },
    { title: 'Adventure', icon: '🏕️', type: 'Mountains' }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 bg-navy-950 text-white">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop"
            alt="Himalayan Rishikesh Hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider text-saffron-400"
          >
            <Sparkles className="w-4 h-4 text-saffron-400" />
            <span>Smart India Travel Itinerary Planner</span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-0 max-w-4xl mx-auto flex flex-col items-center justify-center text-center"
          >
            <h1 className="font-poppins font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-none sm:leading-[1.02] tracking-tight text-center w-full">
              Explore Incredible India <span className="bg-gradient-to-r from-saffron-400 via-white to-indiangreen-500 bg-clip-text text-transparent">Your Way.</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed mt-2 sm:mt-1 text-center">
              Plan unforgettable personalized journeys across India, custom tailored around your days, budget, interests, and travel style.
            </p>
          </motion.div>

          {/* Search Bar Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-2"
          >
            <SearchBar placeholder="Search Rishikesh, Goa, Ladakh, Varanasi, Jaipur..." />
          </motion.div>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => navigate('/planner')}
              className="flex items-center gap-2.5 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-poppins font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-saffron-500/30 hover:shadow-saffron-500/50 hover:-translate-y-0.5 transition-all"
            >
              <Rocket className="w-5 h-5" />
              <span>Plan My Trip</span>
            </button>

            <Link
              to="/explore"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-poppins font-semibold text-base px-7 py-4 rounded-2xl border border-white/20 backdrop-blur-md transition-all"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Destinations</span>
            </Link>
          </motion.div>

          {/* GSAP Floating Cards Preview */}
          <div ref={floatingCardsRef} className="hidden lg:grid grid-cols-3 gap-6 pt-12 max-w-5xl mx-auto text-left">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold text-xl">📍</div>
              <div>
                <div className="font-bold text-white text-sm">25+ Destinations</div>
                <div className="text-xs text-slate-300">Hand-curated authentic guides</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indiangreen-600/20 text-emerald-400 flex items-center justify-center font-bold text-xl">⚡</div>
              <div>
                <div className="font-bold text-white text-sm">Instant Itineraries</div>
                <div className="text-xs text-slate-300">Day-wise drag & drop plans</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-sky-400 flex items-center justify-center font-bold text-xl">🚲</div>
              <div>
                <div className="font-bold text-white text-sm">Local Transport</div>
                <div className="text-xs text-slate-300">Scooty, Houseboat, Toy Train</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Must Visit Spots"
          title="Popular Indian Destinations"
          subtitle="From snow-capped Himalayan peaks to tranquil southern backwaters and royal desert palaces."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.slice(0, 8).map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>

        <div className="text-center pt-10">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-950 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 text-saffron-400" />
          </Link>
        </div>
      </section>

      {/* EXPLORE BY INTEREST */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Personalized Travel"
            title="Explore India By Interest"
            subtitle="Choose your travel passion and discover tailored itineraries."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => navigate('/explore', { state: { typeFilter: cat.type } })}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-saffron-400 transition-all duration-300 flex flex-col items-center gap-2 group hover:-translate-y-1"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="font-poppins font-bold text-navy-900 text-base">{cat.title}</span>
                <span className="text-xs text-slate-400">Discover Places →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FESTIVAL TRAVEL EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeader
            badge="Cultural Celebration"
            title="Experience Indian Festivals"
            subtitle="Plan trips centered around India's grandest cultural and spiritual festivals."
            centered={false}
          />
          <Link
            to="/festivals"
            className="flex items-center gap-1 font-semibold text-saffron-600 hover:text-saffron-700 text-sm shrink-0"
          >
            <span>Explore All Festivals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FESTIVALS.slice(0, 3).map((fest) => (
            <FestivalCard key={fest.id} festival={fest} />
          ))}
        </div>
      </section>

      {/* SPIRITUAL CIRCUITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Sacred Pilgrimages"
          title="Spiritual Circuits & Heritage Trails"
          subtitle="Embark on life-changing pilgrimages across sacred riverbanks, mountain shrines, and ancient temples."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SPIRITUAL_CIRCUITS.slice(0, 2).map((circuit) => (
            <CircuitCard key={circuit.id} circuit={circuit} />
          ))}
        </div>
      </section>

      {/* WHY BHARAT YATRA */}
      <section className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-saffron-500/20 text-saffron-400 border border-saffron-500/30">
              Why Choose Us
            </span>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white">
              Smart Travel Recommendations
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Built specifically for India's diverse landscapes, transportation modes, and seasonal nuances.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-navy-950/60 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold text-xl">🎯</div>
              <h3 className="font-poppins font-bold text-lg text-white">Personalized Planning</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Custom itineraries generated specifically for your travel style, budget slider, and interest tags.
              </p>
            </div>

            <div className="bg-navy-950/60 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">🛵</div>
              <h3 className="font-poppins font-bold text-lg text-white">Smart Local Transport</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                India-specific advice: Scooty rentals in Rishikesh & Goa, Toy Train in Darjeeling, Metro in Delhi.
              </p>
            </div>

            <div className="bg-navy-950/60 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xl">🎉</div>
              <h3 className="font-poppins font-bold text-lg text-white">Festival-Aware Suggestions</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Smart recommendations timed perfectly with Holi in Mathura, Diwali in Kashi, and Durga Puja in Kolkata.
              </p>
            </div>

            <div className="bg-navy-950/60 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xl">☀️</div>
              <h3 className="font-poppins font-bold text-lg text-white">Best Time Recommendations</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Real-time seasonal weather insights avoiding heavy monsoon landslides or extreme heatwaves.
              </p>
            </div>

            <div className="bg-navy-950/60 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl">🍲</div>
              <h3 className="font-poppins font-bold text-lg text-white">Local Food Discovery</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Discover iconic dishes from Amritsari Kulcha to Goan Fish Curry and Kerala Appam stew.
              </p>
            </div>

            <div className="bg-navy-950/60 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xl">❤️</div>
              <h3 className="font-poppins font-bold text-lg text-white">Save & Share Trips</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Save your trips locally, export print-ready PDFs, and share instant WhatsApp trip links.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
