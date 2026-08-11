import React from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './routes/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-inter antialiased selection:bg-saffron-500 selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
