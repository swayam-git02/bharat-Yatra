import React, { useState } from 'react';
import ActivityItem from './ActivityItem';
import Modal from '../common/Modal';
import { PlusCircle, Calendar, DollarSign } from 'lucide-react';

export default function DayTimeline({ dayData, dayIndex, onUpdateDay }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  // Form states for Add/Edit
  const [formTime, setFormTime] = useState('Morning (09:00 AM)');
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCost, setFormCost] = useState('500');
  const [formCategory, setFormCategory] = useState('Attraction');
  const [formTransport, setFormTransport] = useState('Scooty / Taxi');

  const calculateDayCost = () => {
    return dayData.activities.reduce((sum, act) => sum + (parseInt(act.cost, 10) || 0), 0);
  };

  const handleOpenAddModal = () => {
    setEditingActivity(null);
    setFormTime('Morning (09:00 AM)');
    setFormTitle('');
    setFormDesc('');
    setFormCost('500');
    setFormCategory('Attraction');
    setFormTransport('Scooty / Taxi');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (act) => {
    setEditingActivity(act);
    setFormTime(act.time || 'Morning (09:00 AM)');
    setFormTitle(act.title || '');
    setFormDesc(act.desc || '');
    setFormCost(act.cost?.toString() || '500');
    setFormCategory(act.category || 'Attraction');
    setFormTransport(act.transport || 'Scooty / Taxi');
    setIsAddModalOpen(true);
  };

  const handleSaveActivity = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    let updatedActivities = [...dayData.activities];

    if (editingActivity) {
      updatedActivities = updatedActivities.map((act) =>
        act.id === editingActivity.id
          ? {
              ...act,
              time: formTime,
              title: formTitle,
              desc: formDesc,
              cost: parseInt(formCost, 10) || 0,
              category: formCategory,
              transport: formTransport
            }
          : act
      );
    } else {
      const newAct = {
        id: `act-custom-${Date.now()}`,
        time: formTime,
        title: formTitle,
        desc: formDesc,
        cost: parseInt(formCost, 10) || 0,
        category: formCategory,
        transport: formTransport
      };
      updatedActivities.push(newAct);
    }

    onUpdateDay(dayIndex, { ...dayData, activities: updatedActivities });
    setIsAddModalOpen(false);
  };

  const handleDeleteActivity = (actId) => {
    const updatedActivities = dayData.activities.filter((act) => act.id !== actId);
    onUpdateDay(dayIndex, { ...dayData, activities: updatedActivities });
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newActs = [...dayData.activities];
    const temp = newActs[index - 1];
    newActs[index - 1] = newActs[index];
    newActs[index] = temp;
    onUpdateDay(dayIndex, { ...dayData, activities: newActs });
  };

  const handleMoveDown = (index) => {
    if (index === dayData.activities.length - 1) return;
    const newActs = [...dayData.activities];
    const temp = newActs[index + 1];
    newActs[index + 1] = newActs[index];
    newActs[index] = temp;
    onUpdateDay(dayIndex, { ...dayData, activities: newActs });
  };

  return (
    <div className="relative pl-6 sm:pl-8 border-l-2 border-saffron-200 pb-10 last:pb-0">
      {/* Timeline Bullet */}
      <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-saffron-500 text-white font-poppins font-bold text-xs flex items-center justify-center shadow-lg shadow-saffron-500/30">
        D{dayData.day}
      </div>

      {/* Day Header */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider block">
            DAY {dayData.day} ITINERARY
          </span>
          <h3 className="font-poppins font-bold text-navy-900 text-xl">{dayData.title}</h3>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Est. Day Expense</span>
            <span className="font-poppins font-bold text-navy-900 text-sm">
              ₹{calculateDayCost().toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Activity</span>
          </button>
        </div>
      </div>

      {/* List of Activities */}
      <div className="space-y-4">
        {dayData.activities.map((activity, idx) => (
          <ActivityItem
            key={activity.id || idx}
            activity={activity}
            index={idx}
            totalItems={dayData.activities.length}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteActivity}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
          />
        ))}

        {dayData.activities.length === 0 && (
          <div className="text-center py-6 text-slate-400 text-xs italic bg-white rounded-xl border border-dashed border-slate-200">
            No activities scheduled for this day yet. Click 'Add Activity' to customize!
          </div>
        )}
      </div>

      {/* Add / Edit Activity Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingActivity ? `Edit Activity (Day ${dayData.day})` : `Add Custom Activity (Day ${dayData.day})`}
      >
        <form onSubmit={handleSaveActivity} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Timing</label>
            <input
              type="text"
              value={formTime}
              onChange={(e) => setFormTime(e.target.value)}
              placeholder="e.g. Morning (09:00 AM) or Evening"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-saffron-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Activity Title</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. River Rafting at Shivpuri"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-saffron-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Description & Tips</label>
            <textarea
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder="Brief details about what to expect or local tips..."
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-saffron-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-saffron-500 outline-none"
              >
                <option value="Attraction">Attraction</option>
                <option value="Food">Food / Dining</option>
                <option value="Adventure">Adventure</option>
                <option value="Spiritual">Spiritual</option>
                <option value="Heritage">Heritage</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Estimated Cost (₹)</label>
              <input
                type="number"
                value={formCost}
                onChange={(e) => setFormCost(e.target.value)}
                placeholder="500"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-saffron-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Recommended Transport</label>
            <input
              type="text"
              value={formTransport}
              onChange={(e) => setFormTransport(e.target.value)}
              placeholder="e.g. Scooty / E-Rickshaw"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-saffron-500 outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-saffron-500 hover:bg-saffron-600 text-white shadow-md"
            >
              Save Activity
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
