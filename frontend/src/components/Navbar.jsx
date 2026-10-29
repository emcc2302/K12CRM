import React, { useState } from 'react';
import { GraduationCap, ArrowRight, ShieldCheck, Menu, X } from 'lucide-react';
import { getAuthToken } from '../services/api';

export default function Navbar({ onNavigate, activeView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = !!getAuthToken();

  const handleNavClick = (sectionId) => {
    if (activeView !== 'public') {
      onNavigate('public');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => onNavigate('public')} 
            className="flex items-center gap-3 group focus:outline-none text-left"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                EduCRM
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase -mt-1">
                Admissions & Inquiries
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('trust-section')} 
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('inquiry-form')} 
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Programs
            </button>
            <button 
              onClick={() => handleNavClick('inquiry-form')} 
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-brand-700 hover:bg-slate-100 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                Admin Login
              </button>
            )}

            <button
              onClick={() => handleNavClick('inquiry-form')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-700 hover:bg-brand-800 shadow-md shadow-brand-700/25 hover:shadow-lg hover:shadow-brand-700/35 transition-all transform active:scale-95"
            >
              Submit Inquiry
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('trust-section')} 
              className="text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('inquiry-form')} 
              className="text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Programs
            </button>
            <button 
              onClick={() => handleNavClick('inquiry-form')} 
              className="text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Contact
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(isAuthenticated ? 'dashboard' : 'login');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              <ShieldCheck className="w-4 h-4" />
              {isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
            </button>
            <button
              onClick={() => handleNavClick('inquiry-form')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-700 hover:bg-brand-800"
            >
              Submit Inquiry
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

