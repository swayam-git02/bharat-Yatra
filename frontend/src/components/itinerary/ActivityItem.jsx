import React, { useState } from 'react';
import { Clock, DollarSign, Navigation, Edit2, Trash2, ArrowUp, ArrowDown, MoveVertical } from 'lucide-react';

export default function ActivityItem({
  activity,
  index,
  totalItems,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown
}) {
  return (
    <div className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Time & Title info */}
      <div className="flex items-start gap-3 flex-1">
        {/* Category Icon Badge */}
        <div className="w-10 h-10 rounded-xl bg-saffron-50 border border-saffron-100 text-saffron-600 flex items-center justify-center shrink-0 font-bold text-sm">
          {index + 1}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              <Clock className="w-3 h-3 text-saffron-500" />
              {activity.time}
            </span>
            <span className="text-[11px] font-semibold text-navy-900 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
              {activity.category}
            </span>
          </div>

          <h4 className="font-poppins font-bold text-navy-900 text-base leading-snug">{activity.title}</h4>
          {activity.desc && <p className="text-slate-500 text-xs leading-relaxed">{activity.desc}</p>}

          <div className="flex items-center gap-3 pt-1 text-xs">
            {activity.transport && (
              <span className="flex items-center gap-1 text-slate-500">
                <Navigation className="w-3 h-3 text-sky-500" />
                {activity.transport}
              </span>
            )}
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Est. ₹{activity.cost?.toLocaleString() || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1 self-end sm:self-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-slate-50 p-1.5 rounded-xl border border-slate-100">
        <button
          onClick={() => onMoveUp(index)}
          disabled={index === 0}
          className="p-1.5 text-slate-400 hover:text-navy-900 disabled:opacity-30 disabled:hover:text-slate-400 rounded-lg hover:bg-white transition-colors"
          title="Move Up"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => onMoveDown(index)}
          disabled={index === totalItems - 1}
          className="p-1.5 text-slate-400 hover:text-navy-900 disabled:opacity-30 disabled:hover:text-slate-400 rounded-lg hover:bg-white transition-colors"
          title="Move Down"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(activity)}
          className="p-1.5 text-slate-400 hover:text-saffron-600 rounded-lg hover:bg-white transition-colors"
          title="Edit Activity"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(activity.id)}
          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
          title="Delete Activity"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
