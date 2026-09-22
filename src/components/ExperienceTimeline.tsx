import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Calendar, CheckCircle2, Award, ArrowUpRight, Sparkles } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <section id="experience" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.experience.subtitle}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.experience.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.experience.description}
          </p>
        </div>

        {/* Chronological Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central connector line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-500 to-violet-500 -translate-x-1/2 opacity-30" />

          <div className="space-y-12">
            {(t.experience.timeline || []).map((item, idx) => {
              const isEven = idx % 2 === 0;
              const achievementsList = (item as any).highlights || (item as any).achievements || [];
              const skillsList = (item as any).skills || (item as any).stack || [];

              return (
                <div
                  key={idx}
                  id={`experience-item-${idx}`}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-8 group`}
                >
                  {/* Center Node Indicator */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_20px_#06b6d4] transition-all z-20">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Empty Spacer Column for Desktop alternating */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Content Card */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-6">
                    <div className="p-7 rounded-2xl bg-slate-900/80 border border-white/10 group-hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-4">
                      {/* Period Badge & Role */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          {item.period}
                        </span>

                        <span className="text-xs font-mono text-slate-400">
                          {item.company}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.role}
                      </h3>

                      {/* Key Deliverables Bullet Points */}
                      {achievementsList.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-white/5">
                          {achievementsList.map((ach: string, aIdx: number) => (
                            <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      {skillsList.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3">
                          {skillsList.map((tech: string, tIdx: number) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-950 border border-white/10 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/20 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
