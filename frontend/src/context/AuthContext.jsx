import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER } from '../data/userMockData';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bharat_yatra_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('bharat_yatra_is_logged_in') === 'true' && !!localStorage.getItem('bharat_yatra_token');
  });

  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('bharat_yatra_user', JSON.stringify(user));
    localStorage.setItem('bharat_yatra_is_logged_in', isLoggedIn);
  }, [user, isLoggedIn]);

  const login = async (email, password) => {
    try {
      const { authService } = await import('../services/api');
      const data = await authService.login(email, password);

      if (data && data.token) {
        localStorage.setItem('bharat_yatra_token', data.token);
      }
      setIsLoggedIn(true);
      const userData = data?.data || { name: email.split('@')[0].toUpperCase(), email };
      setUser((prev) => ({
        ...prev,
        ...userData
      }));
      showToast(`Welcome back, ${userData.name}! 🚀`, 'success');
      return true;
    } catch (err) {
      console.error('Backend login error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      showToast(`Login failed: ${errorMsg}`, 'error');
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { authService } = await import('../services/api');
      const data = await authService.register(name, email, password);

      if (data && data.token) {
        localStorage.setItem('bharat_yatra_token', data.token);
      }
      setIsLoggedIn(true);
      const userData = data?.data || {
        ...INITIAL_USER,
        name: name || 'Traveler',
        email,
        joinedDate: 'Just now'
      };
      setUser(userData);
      showToast(`Account created successfully! Welcome to Bharat Yatra, ${name}! 🎉`, 'success');
      return true;
    } catch (err) {
      console.error('Backend signup error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Signup failed. Please try again.';
      showToast(`Signup failed: ${errorMsg}`, 'error');
      return false;
    }
  };

  const logout = async () => {
    try {
      const { authService } = await import('../services/api');
      await authService.logout();
    } catch (e) {
      // Ignore network errors on logout
    }
    setIsLoggedIn(false);
    setUser(INITIAL_USER);
    localStorage.removeItem('bharat_yatra_token');
    localStorage.removeItem('bharat_yatra_user');
    localStorage.setItem('bharat_yatra_is_logged_in', 'false');
    showToast('Logged out successfully.', 'info');
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    showToast('Profile updated successfully! ✨', 'success');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
