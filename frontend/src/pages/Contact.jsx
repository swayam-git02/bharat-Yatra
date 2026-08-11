import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { useToast } from '../context/ToastContext';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Thank you! Your message has been sent to our traveler support team. 🚀', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeader
        badge="Get in Touch"
        title="Contact Traveler Support"
        subtitle="Have questions about custom itineraries, local transport options, or festival travel?"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-navy-900 text-white rounded-3xl p-8 space-y-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="font-poppins font-bold text-2xl">Bharat Yatra HQ</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Our travel specialists are available 24/7 to assist with your journeys across India.
            </p>
          </div>

          <div className="space-y-4 pt-4 text-xs text-slate-300 border-t border-navy-800">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-saffron-400 shrink-0" />
              <span>Connaught Place, New Delhi 110001, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-saffron-400 shrink-0" />
              <span>support@bharatyatra.in</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-saffron-400 shrink-0" />
              <span>+91 1800-BHARAT-YATRA</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aditya Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aditya@traveler.in"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Message / Query</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us how we can help your travel planning..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-transform hover:scale-[1.01]"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}
