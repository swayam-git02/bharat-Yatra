import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, LogIn, Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    login(email, password);
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
          <h1 className="font-poppins font-bold text-2xl text-navy-900">Welcome Back</h1>
          <p className="text-slate-500 text-xs">Log in to manage your Bharat Yatra saved itineraries.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-saffron-500" />
              <span>Remember me</span>
            </label>
            <a href="#" className="font-semibold text-saffron-600 hover:text-saffron-700">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-950 text-white font-poppins font-bold text-sm py-3 rounded-xl shadow-md transition-all hover:scale-[1.01]"
          >
            <LogIn className="w-4 h-4" />
            <span>Log In</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-saffron-600 hover:text-saffron-700">
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
}
