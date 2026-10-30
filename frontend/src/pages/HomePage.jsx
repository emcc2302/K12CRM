import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProgramsSection from '../components/ProgramsSection';
import InquiryForm from '../components/InquiryForm';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export default function HomePage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('Scholarship');

  const handleScrollToForm = () => {
    window.history.pushState(null, '', '#contact');
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProgram = (category) => {
    setSelectedCategory(category);
    window.history.pushState(null, '', '#contact');
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar: Natural scroll flow, responsive hover effects, active scrollspy */}
      <Navbar onNavigate={onNavigate} activeView="public" />

      {/* Main Content Area */}
      <main className="flex-1 space-y-4">
        {/* 1. Home Section */}
        <HeroSection onScrollToForm={handleScrollToForm} />

        {/* 2. About Section */}
        <AboutSection onScrollToForm={handleScrollToForm} />

        {/* 3. Programs Section */}
        <ProgramsSection onSelectProgram={handleSelectProgram} />

        {/* 4. Contact & Public Inquiry Section */}
        <InquiryForm 
          initialCategory={selectedCategory}
          onSubmitted={() => {}}
        />
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-700 text-white flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 text-sm">EduCRM</span>
            <span>&bull; Full-Stack Inquiry Management Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('login')}
              className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
            <span>&copy; {new Date().getFullYear()} All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
