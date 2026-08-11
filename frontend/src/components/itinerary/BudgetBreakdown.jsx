import React from 'react';
import { PieChart, DollarSign, Wallet, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function BudgetBreakdown({ totalBudget = 10000, itineraryDays = [] }) {
  // Calculate total costs per category
  let totalCost = 0;
  const categories = {
    Stay: 0,
    Food: 0,
    Attraction: 0,
    Adventure: 0,
    Transport: 0
  };

  itineraryDays.forEach((day) => {
    day.activities.forEach((act) => {
      const c = parseInt(act.cost, 10) || 0;
      totalCost += c;

      if (act.category === 'Food') categories.Food += c;
      else if (act.category === 'Adventure') categories.Adventure += c;
      else if (act.category === 'Stay') categories.Stay += c;
      else categories.Attraction += c;
    });
  });

  // Estimate transport & stay baselines if missing
  if (categories.Stay === 0) categories.Stay = Math.round(totalBudget * 0.35);
  if (categories.Transport === 0) categories.Transport = Math.round(totalBudget * 0.15);

  const grandTotal = categories.Stay + categories.Food + categories.Attraction + categories.Adventure + categories.Transport;
  const remainingBudget = Math.max(0, totalBudget - grandTotal);
  const isOverBudget = grandTotal > totalBudget;

  const getPercent = (amount) => {
    if (grandTotal === 0) return 0;
    return Math.round((amount / grandTotal) * 100);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider block">Financial Summary</span>
          <h3 className="font-poppins font-bold text-navy-900 text-xl">Budget Breakdown</h3>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-saffron-50 text-saffron-600 flex items-center justify-center font-bold">
          <Wallet className="w-5 h-5" />
        </div>
      </div>

      {/* Main Budget Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-500">Total Spent: ₹{grandTotal.toLocaleString()}</span>
          <span className="text-navy-900">Target Budget: ₹{totalBudget.toLocaleString()}</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          <div style={{ width: `${getPercent(categories.Stay)}%` }} className="bg-indigo-500 h-full" title="Stay" />
          <div style={{ width: `${getPercent(categories.Food)}%` }} className="bg-saffron-500 h-full" title="Food" />
          <div style={{ width: `${getPercent(categories.Attraction)}%` }} className="bg-emerald-500 h-full" title="Attractions" />
          <div style={{ width: `${getPercent(categories.Adventure)}%` }} className="bg-rose-500 h-full" title="Adventure" />
          <div style={{ width: `${getPercent(categories.Transport)}%` }} className="bg-sky-500 h-full" title="Transport" />
        </div>

        {isOverBudget ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-100">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Over budget by ₹{(grandTotal - totalBudget).toLocaleString()}. Consider adjusting activity expenses.</span>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Remaining Buffer:</span>
            <span className="font-bold text-emerald-600">₹{remainingBudget.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Category List Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100">
          <span className="text-[10px] text-indigo-700 font-semibold block uppercase">Accommodation</span>
          <span className="font-poppins font-bold text-navy-900 text-sm">₹{categories.Stay.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 block">{getPercent(categories.Stay)}% of total</span>
        </div>

        <div className="p-3 rounded-2xl bg-saffron-50/50 border border-saffron-100">
          <span className="text-[10px] text-saffron-700 font-semibold block uppercase">Local Food</span>
          <span className="font-poppins font-bold text-navy-900 text-sm">₹{categories.Food.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 block">{getPercent(categories.Food)}% of total</span>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100">
          <span className="text-[10px] text-emerald-700 font-semibold block uppercase">Sightseeing</span>
          <span className="font-poppins font-bold text-navy-900 text-sm">₹{categories.Attraction.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 block">{getPercent(categories.Attraction)}% of total</span>
        </div>

        <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100">
          <span className="text-[10px] text-rose-700 font-semibold block uppercase">Adventure</span>
          <span className="font-poppins font-bold text-navy-900 text-sm">₹{categories.Adventure.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 block">{getPercent(categories.Adventure)}% of total</span>
        </div>

        <div className="p-3 rounded-2xl bg-sky-50/50 border border-sky-100 col-span-2 sm:col-span-2">
          <span className="text-[10px] text-sky-700 font-semibold block uppercase">Local Transport</span>
          <span className="font-poppins font-bold text-navy-900 text-sm">₹{categories.Transport.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 block">{getPercent(categories.Transport)}% of total</span>
        </div>
      </div>
    </div>
  );
}
