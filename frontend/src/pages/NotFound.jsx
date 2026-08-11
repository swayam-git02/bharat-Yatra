import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-28 pb-20 max-w-md mx-auto text-center space-y-6 px-4">
      <div className="w-20 h-20 rounded-3xl bg-saffron-50 text-saffron-500 flex items-center justify-center mx-auto shadow-inner text-4xl">
        🧭
      </div>
      <div className="space-y-2">
        <h1 className="font-poppins font-bold text-4xl text-navy-900">404</h1>
        <h2 className="font-poppins font-bold text-xl text-navy-900">Destination Not Found</h2>
        <p className="text-slate-500 text-xs leading-relaxed">
          Looks like you navigated off the travel trail! Let's get you back to exploring Incredible India.
        </p>
      </div>

      <a
        href="/"
        className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105"
      >
        <Home className="w-4 h-4 text-saffron-400" />
        <span>Return to Home</span>
      </a>
    </div>
  );
}
