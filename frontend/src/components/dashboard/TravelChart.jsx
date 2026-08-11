import React from 'react';

export default function TravelChart() {
  const monthsData = [
    { month: 'Jan', trips: 2, height: '40%' },
    { month: 'Feb', trips: 1, height: '25%' },
    { month: 'Mar', trips: 3, height: '60%' },
    { month: 'Apr', trips: 1, height: '25%' },
    { month: 'May', trips: 4, height: '80%' },
    { month: 'Jun', trips: 2, height: '40%' },
    { month: 'Jul', trips: 0, height: '10%' },
    { month: 'Aug', trips: 2, height: '40%' },
    { month: 'Sep', trips: 3, height: '60%' },
    { month: 'Oct', trips: 5, height: '95%' },
    { month: 'Nov', trips: 4, height: '80%' },
    { month: 'Dec', trips: 3, height: '60%' }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider block">Yearly Overview</span>
          <h3 className="font-poppins font-bold text-navy-900 text-xl">Travel Activity (2026)</h3>
        </div>
        <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
          12 Trips Planned
        </span>
      </div>

      <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-100">
        {monthsData.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
            <div className="relative w-full max-w-[28px] bg-slate-100 rounded-t-lg overflow-hidden flex items-end h-full">
              <div
                style={{ height: item.height }}
                className="w-full bg-gradient-to-t from-navy-900 to-saffron-500 rounded-t-lg group-hover:from-saffron-500 group-hover:to-saffron-600 transition-all duration-300"
              />
            </div>
            <span className="text-[11px] font-medium text-slate-500 group-hover:text-navy-900 group-hover:font-bold">
              {item.month}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Most Active Season: October (Diwali Travel)</span>
        <span className="text-emerald-600 font-semibold">100% On-Track</span>
      </div>
    </div>
  );
}
