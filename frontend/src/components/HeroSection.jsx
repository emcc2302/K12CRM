import React from 'react';
import { Award, Users, School, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ onScrollToForm }) {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
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
            <div id="trust-section" className="pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              
              {/* Badge 1: Trusted by 10K+ Students */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-brand-50 group-hover:bg-brand-100 border border-brand-200/60 flex items-center justify-center text-brand-700 shrink-0 transition-colors">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Trusted by</h4>
                  <p className="text-xs text-slate-600 font-medium">10K+ Students</p>
                </div>
              </div>

              {/* Badge 2: Expert Guidance */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-brand-50 group-hover:bg-brand-100 border border-brand-200/60 flex items-center justify-center text-brand-700 shrink-0 transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Expert Guidance</h4>
                  <p className="text-xs text-slate-600 font-medium">from Professionals</p>
                </div>
              </div>

              {/* Badge 3: Support for Schools */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-brand-50 group-hover:bg-brand-100 border border-brand-200/60 flex items-center justify-center text-brand-700 shrink-0 transition-colors">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Support for Schools</h4>
                  <p className="text-xs text-slate-600 font-medium">and Institutions</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Reference Visual with Student & Floating Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Soft circular background shape */}
              <div className="aspect-square rounded-full bg-gradient-to-tr from-brand-200/70 via-indigo-100 to-brand-50 border-8 border-white shadow-2xl relative flex items-center justify-center overflow-hidden">
                
                {/* Embedded High-Quality Student Portrait */}
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80"
                  alt="Student with books"
                  className="w-full h-full object-cover object-top scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge 1: Top Left - "Your Future Our Support" */}
              <div className="absolute -top-3 left-2 sm:-left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-8 h-8 rounded-lg bg-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-700/20">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Your Future</div>
                  <div className="text-[11px] font-medium text-brand-700">Our Support</div>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Right - "Join Thousands of Happy Learners" */}
              <div className="absolute -bottom-4 right-0 sm:-right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="User avatar 1"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="User avatar 2"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="User avatar 3"
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Join Thousands</div>
                  <div className="text-[11px] font-medium text-slate-500">of Happy Learners</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

