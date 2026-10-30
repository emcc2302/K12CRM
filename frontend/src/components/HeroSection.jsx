import React from 'react';
import { Award, Users, School, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ onScrollToForm }) {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 scroll-mt-24">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 w-72 h-72 bg-blue-100/50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and Trust Badges */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* "Get in Touch" Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Get in Touch</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Have a Question? <br />
              <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 bg-clip-text text-transparent">
                We're Here to Help
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              Whether you're a parent, student, or school, we're happy to assist you with scholarships, admissions, concerts and more.
            </p>

            {/* Quick CTA button for mobile or direct trigger */}
            <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={onScrollToForm}
                className="px-7 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold shadow-lg shadow-brand-700/25 hover:shadow-xl hover:shadow-brand-700/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Inquire Now
              </button>
            </div>

            {/* 3 Trust Indicator Badges */}
            <div id="trust-section" className="pt-5 sm:pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-left">
              
              {/* Badge 1: Direct Inquiry Channel */}
              <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-slate-200/90 bg-white/80 hover:bg-white hover:border-brand-500 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-brand-50 group-hover:bg-brand-600 group-hover:text-white border border-brand-200/80 flex items-center justify-center text-brand-700 shrink-0 transition-all">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">Direct Inquiries</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-600/80 font-medium">Students & Parents</p>
                </div>
              </div>

              {/* Badge 2: Expert Guidance */}
              <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-slate-200/90 bg-white/80 hover:bg-white hover:border-brand-500 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-brand-50 group-hover:bg-brand-600 group-hover:text-white border border-brand-200/80 flex items-center justify-center text-brand-700 shrink-0 transition-all">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">Expert Guidance</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-600/80 font-medium">from Professionals</p>
                </div>
              </div>

              {/* Badge 3: Support for Schools */}
              <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-slate-200/90 bg-white/80 hover:bg-white hover:border-brand-500 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-brand-50 group-hover:bg-brand-600 group-hover:text-white border border-brand-200/80 flex items-center justify-center text-brand-700 shrink-0 transition-all">
                  <School className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">Support for Schools</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-600/80 font-medium">and Institutions</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Reference Visual with Student & Floating Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Soft circular background shape */}
              <div className="aspect-square rounded-full bg-gradient-to-tr from-brand-200/70 via-indigo-100 to-brand-50 border-8 border-white shadow-2xl relative flex items-center justify-center overflow-hidden">
                
                {/* High-Quality Student Portrait */}
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80"
                  alt="Student with books"
                  className="w-full h-full object-cover object-top scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge: Top Left - "Your Future Our Support" */}
              <div className="absolute -top-3 left-2 sm:-left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-8 h-8 rounded-lg bg-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-700/20">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Your Future</div>
                  <div className="text-[11px] font-medium text-brand-700">Our Support</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

