import React from 'react';

export default function SectionHeader({ badge, title, subtitle, centered = true, className = '' }) {
  return (
    <div className={`space-y-3 mb-10 ${centered ? 'text-center max-w-2xl mx-auto' : ''} ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-saffron-50 text-saffron-600 border border-saffron-200 shadow-sm">
          {badge}
        </span>
      )}
      <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-navy-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
