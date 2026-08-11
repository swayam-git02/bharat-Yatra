import React from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import SectionHeader from '../components/common/SectionHeader';
import { Calendar, Sun, CloudRain, Snowflake, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BestTimeToVisit() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Seasonal Matrix"
        title="Best Time To Visit Destinations in India"
        subtitle="Plan your travels avoiding monsoonal landslides and extreme heatwaves. Discover peak vs off-season windows."
      />

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm overflow-x-auto space-y-6">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-13 gap-2 border-b border-slate-100 pb-3 font-poppins font-bold text-navy-900 text-xs uppercase tracking-wider text-center">
            <div className="col-span-3 text-left">Destination & State</div>
            {months.map((m) => (
              <div key={m} className="col-span-1">{m}</div>
            ))}
          </div>

          <div className="divide-y divide-slate-50">
            {DESTINATIONS.slice(0, 10).map((dest) => (
              <div key={dest.id} className="grid grid-cols-13 gap-2 py-4 items-center text-xs">
                <div className="col-span-3 flex items-center gap-2">
                  <img src={dest.heroImage} alt={dest.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                  <div>
                    <Link to={`/explore/${dest.id}`} className="font-bold text-navy-900 hover:text-saffron-600 truncate block">
                      {dest.name}
                    </Link>
                    <span className="text-[10px] text-slate-400 block">{dest.state}</span>
                  </div>
                </div>

                {months.map((m, i) => {
                  const monthFullNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                  const isPeak = dest.peakMonths?.includes(monthFullNames[i]);
                  return (
                    <div key={m} className="col-span-1 flex justify-center">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isPeak
                            ? 'bg-saffron-500 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                        title={isPeak ? `Peak Season for ${dest.name}` : `Off-peak`}
                      >
                        {isPeak ? '★' : '•'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-slate-100 text-xs text-slate-500 justify-center">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-saffron-500 text-white flex items-center justify-center text-[9px]">★</span>
            <span>Peak Season (Ideal Climate)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[9px]">•</span>
            <span>Shoulder / Off-Season</span>
          </div>
        </div>
      </div>
    </div>
  );
}
