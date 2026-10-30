import React from 'react';
import { 
  Award, 
  GraduationCap, 
  Music, 
  HelpCircle, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

export default function ProgramsSection({ onSelectProgram }) {
  const programs = [
    {
      category: 'Scholarship',
      title: 'Scholarship Programs',
      badge: 'Financial Aid & Merit',
      icon: Award,
      description: 'Merit-based scholarships, STEM aptitude rewards, and sports excellence grants for aspiring students.',
      highlights: ['Class 6-12 entrance scholarships', 'Up to 100% tuition assistance', 'Fast-track evaluation'],
      borderColor: 'border-blue-200 hover:border-blue-500',
      hoverShadow: 'hover:shadow-blue-500/10',
      iconColor: 'bg-blue-50 text-blue-600 border border-blue-200/60',
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200/60'
    },
    {
      category: 'Admission',
      title: 'Admission Guidance',
      badge: 'K-12 & Higher Secondary',
      icon: GraduationCap,
      description: 'End-to-end admission counseling for top-tier schools, Grade 11 stream selection, and application kits.',
      highlights: ['Seat availability tracking', 'Stream counseling sessions', 'Documentation assistance'],
      borderColor: 'border-brand-200 hover:border-brand-500',
      hoverShadow: 'hover:shadow-brand-500/10',
      iconColor: 'bg-brand-50 text-brand-700 border border-brand-200/60',
      badgeColor: 'bg-brand-50 text-brand-700 border border-brand-200/60'
    },
    {
      category: 'Concert',
      title: 'Concerts & Events',
      badge: 'Inter-School & Arts',
      icon: Music,
      description: 'Annual inter-school music competitions, creative arts workshops, and cultural symposiums.',
      highlights: ['School band registration', 'Audience and bulk passes', 'Masterclass workshops'],
      borderColor: 'border-purple-200 hover:border-purple-500',
      hoverShadow: 'hover:shadow-purple-500/10',
      iconColor: 'bg-purple-50 text-purple-600 border border-purple-200/60',
      badgeColor: 'bg-purple-50 text-purple-700 border border-purple-200/60'
    },
    {
      category: 'General Query',
      title: 'General Inquiries',
      badge: 'Academic Counseling',
      icon: HelpCircle,
      description: 'Specific questions about curriculum, doubt clearing, or partner institutions? Our team is available.',
      highlights: ['Direct phone & email support', 'Response within 24 hours', 'Senior advisor consults'],
      borderColor: 'border-emerald-200 hover:border-emerald-500',
      hoverShadow: 'hover:shadow-emerald-500/10',
      iconColor: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
    }
  ];

  return (
    <section id="programs" className="py-12 lg:py-16 bg-slate-50 relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Academic Offerings</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Explore Our Specialized <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 bg-clip-text text-transparent">
              Programs & Categories
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600/75 leading-relaxed font-normal max-w-xl mx-auto">
            Select a program below to submit a direct inquiry with pre-filled category selection.
          </p>
        </div>

        {/* 4 Program Cards - Compact with Well-Defined Borders and Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.category}
                className={`group bg-white rounded-2xl p-5 border-2 ${prog.borderColor} shadow-xs hover:shadow-xl ${prog.hoverShadow} transition-all duration-300 ease-out transform hover:-translate-y-1.5 hover:scale-[1.01] flex flex-col justify-between cursor-pointer`}
              >
                <div>
                  {/* Card Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${prog.iconColor} flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${prog.badgeColor}`}>
                      {prog.badge}
                    </span>
                  </div>

                  {/* Title & Description with Opacity */}
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600/80 leading-relaxed font-normal group-hover:text-slate-700 transition-colors">
                    {prog.description}
                  </p>

                  {/* Highlights with Opacity */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5">
                    {prog.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600/85 font-medium group-hover:text-slate-800 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectProgram(prog.category)}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 group-hover:bg-brand-700 group-hover:text-white transition-all shadow-xs cursor-pointer"
                  >
                    <span>Inquire for {prog.category}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
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
