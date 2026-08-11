import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';
import SectionHeader from '../components/common/SectionHeader';
import { User, Mail, MapPin, Calendar, Award, Edit2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location || 'New Delhi, India');
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name, email, location, bio });
    setIsEditModalOpen(false);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full object-cover border-4 border-saffron-500 shadow-xl" />
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute bottom-0 right-0 p-2 rounded-full bg-navy-900 text-white shadow-md hover:bg-navy-950 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-navy-900">{user.name}</h1>
                <p className="text-slate-500 text-xs flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-saffron-500" />
                  <span>{user.email}</span>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-saffron-500" />
                  <span>{user.location}</span>
                </p>
              </div>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-1.5 bg-saffron-50 hover:bg-saffron-100 text-saffron-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-saffron-200 transition-colors self-center"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed pt-1">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="space-y-4">
        <h2 className="font-poppins font-bold text-navy-900 text-xl flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Traveler Badges & Achievements</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {user.badges.map((badge, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
              <span className="text-3xl p-2 bg-slate-50 rounded-xl border border-slate-100">{badge.icon}</span>
              <div>
                <h4 className="font-poppins font-bold text-navy-900 text-sm">{badge.title}</h4>
                <p className="text-[11px] text-slate-400">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferred Interests */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
        <h2 className="font-poppins font-bold text-navy-900 text-xl">Travel Preferences</h2>
        <div className="flex flex-wrap gap-2">
          {user.preferredInterests.map((interest) => (
            <span key={interest} className="px-3.5 py-1.5 rounded-xl bg-saffron-50 text-saffron-700 text-xs font-bold border border-saffron-200">
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Profile Details">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Traveler Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-saffron-500 hover:bg-saffron-600 text-white shadow-md"
            >
              Save Profile
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
