import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    signup(name, email);
    navigate('/dashboard');
  };

  return (
    <div className="pt-28 pb-20 min-h-[85vh] flex items-center justify-center max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-500 via-white to-indiangreen-600 p-0.5 shadow-lg mx-auto mb-3">
            <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-saffron-500" />
            </div>
          </div>
          <h1 className="font-poppins font-bold text-2xl text-navy-900">Create Account</h1>
          <p className="text-slate-500 text-xs">Join thousands of travelers exploring India personalized around their style.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aditya Sharma"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-saffron-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aditya@traveler.in"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-saffron-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-saffron-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-poppins font-bold text-sm py-3 rounded-xl shadow-md transition-all hover:scale-[1.01]"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-navy-900 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
