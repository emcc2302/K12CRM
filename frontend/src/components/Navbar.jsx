import React, { useState, useEffect } from 'react';
import { GraduationCap, ArrowRight, ShieldCheck, Menu, X } from 'lucide-react';
import { getAuthToken } from '../services/api';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'programs', label: 'Programs' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ onNavigate, activeView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isAuthenticated = !!getAuthToken();

  // Scrollspy: update active link based on currently visible section
  useEffect(() => {
    if (activeView !== 'public') return;

    const handleScroll = () => {
      const sectionIds = ['home', 'about', 'programs', 'contact'];
      const scrollPosition = window.scrollY + 220; // viewport threshold offset

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);

    if (activeView !== 'public') {
      onNavigate('public');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    // Header is in natural document flow so it scrolls along with the page
    <header className="relative w-full z-40 bg-white border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 group focus:outline-none text-left cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
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

          {/* Desktop Nav Links with Hover & Active Highlight Effects */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)} 
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-brand-700 font-bold bg-brand-50/90 shadow-xs' 
                      : 'text-slate-600 hover:text-brand-700 hover:bg-slate-100/80 hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-brand-600 rounded-full animate-fadeIn" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs with Hover Effects */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>Admin Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-brand-700 hover:bg-slate-100 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Admin Login</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-700 hover:bg-brand-800 shadow-md shadow-brand-700/25 hover:shadow-lg hover:shadow-brand-700/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Submit Inquiry</span>
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
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-3 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)} 
                  className={`text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive 
                      ? 'bg-brand-50 text-brand-700 font-bold' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-brand-700'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
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
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-700 hover:bg-brand-800"
            >
              <span>Submit Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
