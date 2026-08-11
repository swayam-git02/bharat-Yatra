import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Sparkles, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoadingAnimation({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "✈ Planning your Bharat Yatra...",
    "🔎 Researching current travel information",
    "📍 Finding places based on your interests",
    "💰 Optimizing your budget",
    "🗺 Creating your route",
    "✨ Building your day-wise itinerary"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);

    return () => clearInterval(interval);
  }, [steps.length]);

  const progressPercent = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-navy-900 border border-navy-700 text-white rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-2xl space-y-8 text-center"
      >
        {/* Animated Icon */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-saffron-500 to-indiangreen-600 animate-spin opacity-40 blur-md" />
          <div className="relative w-full h-full rounded-2xl bg-navy-950 border border-saffron-500/50 flex items-center justify-center text-saffron-400 shadow-xl">
            <Compass className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        {/* Text Header */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-saffron-500/20 text-saffron-400 border border-saffron-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            AI Itinerary Engine
          </span>
          <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            Planning Your Journey...
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Crafting a custom itinerary tailored around your budget and travel pace.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-2.5 bg-navy-950 rounded-full overflow-hidden p-0.5 border border-navy-800">
            <motion.div
              className="h-full bg-gradient-to-r from-saffron-500 via-white to-indiangreen-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-right text-xs font-mono font-bold text-saffron-400">
            {progressPercent}% Complete
          </div>
        </div>

        {/* Step Checkmarks List */}
        <div className="space-y-3 text-left pt-2 border-t border-navy-800">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isDone
                    ? 'text-emerald-400'
                    : isCurrent
                    ? 'text-saffron-400 font-bold scale-[1.02]'
                    : 'text-slate-600'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-saffron-400 shrink-0 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
