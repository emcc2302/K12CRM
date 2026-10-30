import React from 'react';
import { 
  GraduationCap, 
  Users, 
  School, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  HeartHandshake, 
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
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50/60",
      borderColor: "border-blue-100",
      iconBg: "bg-blue-600 text-white"
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
      color: "from-brand-700 to-brand-500",
      bgColor: "bg-brand-50/60",
      borderColor: "border-brand-100",
      iconBg: "bg-brand-700 text-white"
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
      color: "from-emerald-600 to-teal-600",
      bgColor: "bg-emerald-50/60",
      borderColor: "border-emerald-100",
      iconBg: "bg-emerald-600 text-white"
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-y border-slate-100 relative overflow-hidden scroll-mt-24">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-50/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-50/80 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-semibold tracking-wide shadow-xs">
            <Compass className="w-3.5 h-3.5 text-brand-600" />
            <span>About EduCRM Platform</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Bridging Aspirations with <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 bg-clip-text text-transparent">
              Educational Opportunities
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            EduCRM is a specialized inquiry management and guidance platform created to connect parents, students, and schools through transparent, timely, and personalized counseling.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className={`rounded-3xl p-8 border ${pillar.borderColor} ${pillar.bgColor} hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center shadow-md mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mt-1 mb-3">
                    {pillar.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-200/60">
                    {pillar.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6">
                  <button
                    onClick={onScrollToForm}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-850 hover:underline group cursor-pointer"
                  >
                    <span>Send an Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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

