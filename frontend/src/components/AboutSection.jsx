import React from 'react';
import { 
  GraduationCap, 
  Users, 
  School, 
  CheckCircle2, 
  Compass, 
  ArrowRight 
} from 'lucide-react';

export default function AboutSection({ onScrollToForm }) {
  const pillars = [
    {
      icon: GraduationCap,
      title: "For Students",
      tagline: "Empowering Your Academic Journey",
      description: "From scholarship tests to stream selection guidance, we provide direct one-on-one mentorship to help every learner achieve their highest potential.",
      features: [
        "Merit & talent scholarship matching",
        "Stream selection & career counseling",
        "Entrance exam preparation advice"
      ],
      borderColor: "border-blue-200 hover:border-blue-500",
      hoverShadow: "hover:shadow-blue-500/10",
      bgColor: "bg-blue-50/40 hover:bg-blue-50/70",
      iconBg: "bg-blue-600 text-white shadow-blue-500/20",
      tagColor: "text-blue-700/85",
      accentDot: "text-blue-600"
    },
    {
      icon: Users,
      title: "For Parents",
      tagline: "Clarity, Trust & Transparent Support",
      description: "We partner with parents to remove admission anxiety by providing transparent criteria, fee structures, and verified institutional insights.",
      features: [
        "Transparent school admission criteria",
        "Personalized doubt-clearing sessions",
        "Continuous inquiry & application tracking"
      ],
      borderColor: "border-brand-200 hover:border-brand-500",
      hoverShadow: "hover:shadow-brand-500/10",
      bgColor: "bg-brand-50/40 hover:bg-brand-50/70",
      iconBg: "bg-brand-700 text-white shadow-brand-700/20",
      tagColor: "text-brand-700/85",
      accentDot: "text-brand-600"
    },
    {
      icon: School,
      title: "For Schools & Institutions",
      tagline: "Collaborative Educational Partnerships",
      description: "Connecting leading educational institutions with qualified student applicants, cultural concerts, and community scholarship initiatives.",
      features: [
        "Inter-school concert & workshop bookings",
        "Institutional scholarship allocations",
        "Streamlined CRM inquiry management"
      ],
      borderColor: "border-emerald-200 hover:border-emerald-500",
      hoverShadow: "hover:shadow-emerald-500/10",
      bgColor: "bg-emerald-50/40 hover:bg-emerald-50/70",
      iconBg: "bg-emerald-600 text-white shadow-emerald-600/20",
      tagColor: "text-emerald-700/85",
      accentDot: "text-emerald-600"
    }
  ];

  return (
    <section id="about" className="py-12 lg:py-16 bg-white border-y border-slate-200 relative overflow-hidden scroll-mt-24">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-50/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold tracking-wide shadow-xs">
            <Compass className="w-3.5 h-3.5 text-brand-600" />
            <span>About EduCRM Platform</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Bridging Aspirations with <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 bg-clip-text text-transparent">
              Educational Opportunities
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600/75 leading-relaxed font-normal max-w-xl mx-auto">
            EduCRM connects parents, students, and schools through transparent, timely, and personalized counseling support.
          </p>
        </div>

        {/* 3 Pillar Cards - Compact Size with Prominent Borders and Rich Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className={`group rounded-2xl p-5 sm:p-6 border-2 ${pillar.borderColor} ${pillar.bgColor} shadow-sm hover:shadow-xl ${pillar.hoverShadow} transition-all duration-300 ease-out transform hover:-translate-y-1.5 hover:scale-[1.01] flex flex-col justify-between cursor-pointer`}
              >
                <div>
                  {/* Icon with Hover Pop */}
                  <div className={`w-10 h-10 rounded-xl ${pillar.iconBg} flex items-center justify-center shadow-md mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title & Tagline with Opacity */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight group-hover:text-brand-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 mb-2.5 ${pillar.tagColor}`}>
                    {pillar.tagline}
                  </p>

                  {/* Description with Opacity */}
                  <p className="text-xs text-slate-600/80 leading-relaxed mb-4 font-normal group-hover:text-slate-700 transition-colors">
                    {pillar.description}
                  </p>

                  {/* Feature Checkpoints with Opacity */}
                  <div className="space-y-2 pt-3 border-t border-slate-200/80">
                    {pillar.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-700/85 group-hover:text-slate-800 transition-colors">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${pillar.accentDot} shrink-0`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action with Arrow Hover Shift */}
                <div className="pt-4 mt-5 border-t border-slate-200/60">
                  <button
                    type="button"
                    onClick={onScrollToForm}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 group-hover:text-brand-800 cursor-pointer"
                  >
                    <span>Send an Inquiry</span>
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
