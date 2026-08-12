import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Compass, Calendar, Sparkles, Bookmark, User, Menu, X, Rocket, LogIn, LogOut, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Trip Planner', path: '/planner' },
    { name: 'Festivals', path: '/festivals' },
    { name: 'Spiritual Circuits', path: '/spiritual' },
    { name: 'Saved Trips', path: '/saved-trips' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
          : 'bg-gradient-to-b from-navy-950/80 to-transparent text-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-500 via-white to-indiangreen-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-saffron-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className={`font-poppins font-bold text-xl leading-tight tracking-tight ${isScrolled ? 'text-navy-900' : 'text-white'}`}>
              Bharat <span className="text-saffron-500">Yatra</span>
            </span>
            <span className={`text-[10px] font-medium tracking-wider uppercase ${isScrolled ? 'text-slate-500' : 'text-slate-300'}`}>
              Explore India. Your Way.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? isScrolled
                      ? 'bg-saffron-50 text-saffron-600 font-semibold'
                      : 'bg-white/20 text-white font-semibold shadow-inner'
                    : isScrolled
                    ? 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  isScrolled
                    ? 'border-slate-200 bg-slate-50 text-navy-900 hover:bg-slate-100'
                    : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <button
                onClick={async () => {
                  await logout();
                  navigate('/login');
                }}
                title="Log Out"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isScrolled
                    ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                    : 'border-white/30 bg-white/10 text-red-300 hover:bg-red-500/20'
                }`}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
                isScrolled ? 'text-navy-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              Log In
            </Link>
          )}

          <button
            onClick={() => navigate('/planner')}
            className="flex items-center gap-2 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white px-4 py-2.5 rounded-xl font-poppins font-semibold text-xs tracking-wide shadow-lg shadow-saffron-500/25 hover:shadow-saffron-500/40 hover:-translate-y-0.5 transition-all"
          >
            <Rocket className="w-4 h-4" />
            <span>Plan My Trip</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${isScrolled ? 'text-navy-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-navy-950/95 backdrop-blur-xl border-b border-white/10 p-6 text-white shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-saffron-500/20 text-saffron-400 font-bold border-l-4 border-saffron-500'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl text-sm font-semibold text-slate-200"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-white">{user.name}</div>
                    <div className="text-xs text-slate-400">{user.email}</div>
                  </div>
                </Link>
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-semibold bg-white/10 text-white"
              >
                Log In / Register
              </Link>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/planner');
              }}
              className="w-full flex items-center justify-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-saffron-500/30"
            >
              <Rocket className="w-5 h-5" />
              <span>Plan My Trip Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
