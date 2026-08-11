import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Mail, Phone, Globe, ShieldCheck, Compass, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      {/* Indian flag accent top line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-saffron-500 via-white to-indiangreen-600 mb-12 -mt-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-500 via-white to-indiangreen-600 p-0.5 shadow-lg">
                <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-saffron-500" />
                </div>
              </div>
              <span className="font-poppins font-bold text-2xl text-white">
                Bharat <span className="text-saffron-500">Yatra</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Smart India Travel Itinerary Planner. Plan personalized journeys across India, custom tailored around your days, budget, interests, and travel style.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-indiangreen-500" />
                <span>100% Verified Local Guides</span>
              </div>
              <span>•</span>
              <div>Made with ❤️ for Incredible India</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-base mb-4 tracking-wide">Discover</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/explore" className="hover:text-saffron-400 transition-colors">Popular Destinations</Link></li>
              <li><Link to="/festivals" className="hover:text-saffron-400 transition-colors">Festival Explorer</Link></li>
              <li><Link to="/spiritual" className="hover:text-saffron-400 transition-colors">Spiritual Circuits</Link></li>
              <li><Link to="/best-time" className="hover:text-saffron-400 transition-colors">Best Time to Visit</Link></li>
              <li><Link to="/food" className="hover:text-saffron-400 transition-colors">Local Food Discovery</Link></li>
            </ul>
          </div>

          {/* Planner & Account */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-base mb-4 tracking-wide">Planner & Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/planner" className="hover:text-saffron-400 transition-colors">Smart Trip Planner</Link></li>
              <li><Link to="/saved-trips" className="hover:text-saffron-400 transition-colors">Saved Itineraries</Link></li>
              <li><Link to="/wishlist" className="hover:text-saffron-400 transition-colors">Wishlist Collections</Link></li>
              <li><Link to="/dashboard" className="hover:text-saffron-400 transition-colors">Traveler Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-saffron-400 transition-colors">My Profile</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-base mb-4 tracking-wide">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-saffron-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-saffron-400 transition-colors">Contact & Support</Link></li>
              <li><a href="#faq" className="hover:text-saffron-400 transition-colors">Traveler FAQs</a></li>
              <li><span className="text-slate-500 cursor-not-allowed">Terms of Service</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Bharat Yatra Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>🇮🇳 Proudly Built in India</span>
            <span>React • Vite • Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
