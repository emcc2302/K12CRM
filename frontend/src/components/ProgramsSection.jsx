import React from 'react';
import { 
  Award, 
  GraduationCap, 
  Music, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Users 
} from 'lucide-react';

export default function ProgramsSection({ onSelectProgram }) {
  const programs = [
    {
      category: 'Scholarship',
      title: 'Scholarship Programs',
      badge: 'Financial Aid & Merit',
      icon: Award,
      description: 'Merit-based scholarships, STEM aptitude rewards, sports excellence grants, and socio-economic support programs designed for aspiring students.',
      highlights: ['Class 6-12 entrance scholarships', 'Up to 100% tuition assistance', 'Fast-track eligibility evaluation'],
      color: 'border-blue-200 hover:border-blue-400 group-hover:bg-blue-600',
      iconColor: 'bg-blue-50 text-blue-600',
      badgeColor: 'bg-blue-50 text-blue-700'
    },
    {
      category: 'Admission',
      title: 'Admission Guidance',
      badge: 'K-12 & Higher Secondary',
      icon: GraduationCap,
      description: 'End-to-end admission counseling for top-tier schools, Grade 11 Science/Commerce/Arts stream selection, and application preparation.',
      highlights: ['Direct seat availability tracking', 'Stream counseling sessions', 'Documentation & portfolio assistance'],
      color: 'border-brand-200 hover:border-brand-400 group-hover:bg-brand-600',
      iconColor: 'bg-brand-50 text-brand-700',
      badgeColor: 'bg-brand-50 text-brand-700'
    },
    {
      category: 'Concert',
      title: 'Concerts & Events',
      badge: 'Inter-School & Arts',
      icon: Music,
      description: 'Annual inter-school music competitions, theatrical showcases, cultural concerts, and leadership workshops for creative expression.',
      highlights: ['School choir & band registration', 'Audience and bulk ticket passes', 'Celebrity mentor masterclasses'],
      color: 'border-purple-200 hover:border-purple-400 group-hover:bg-purple-600',
      iconColor: 'bg-purple-50 text-purple-600',
      badgeColor: 'bg-purple-50 text-purple-700'
    },
    {
      category: 'General Query',
      title: 'General Inquiries',
      badge: 'Academic Counseling',
      icon: HelpCircle,
      description: 'Have specific questions about curriculum, doubt-clearing sessions, hostel accommodations, or partner institutions? Our counselors are here.',
      highlights: ['Direct phone & email support', 'Response within 24 business hours', 'Free consultation with senior advisors'],
      color: 'border-emerald-200 hover:border-emerald-400 group-hover:bg-emerald-600',
      iconColor: 'bg-emerald-50 text-emerald-600',
      badgeColor: 'bg-emerald-50 text-emerald-700'
    }
  ];

  return (
    <section id="programs" className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-semibold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Academic & Institutional Offerings</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Explore Our Specialized <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 bg-clip-text text-transparent">
              Programs & Categories
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Select a program below to learn more, or submit a direct inquiry with pre-filled category selection.
          </p>
        </div>

        {/* 4 Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.category}
                className={`bg-white rounded-3xl p-6 border ${prog.color} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1`}
              >
                <div>
                  {/* Card Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${prog.iconColor} flex items-center justify-center shadow-xs transition-colors`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${prog.badgeColor}`}>
                      {prog.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                    {prog.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {prog.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectProgram(prog.category)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-700 hover:text-white transition-all shadow-xs"
                  >
                    <span>Inquire for {prog.category}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
