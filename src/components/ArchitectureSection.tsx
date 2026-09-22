import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Cpu, Database, Server, Network, CheckCircle2, ArrowRight } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const { t } = useLanguage();

  const icons = [Cpu, Database, Server, Network];

  return (
    <section id="architecture" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.architecture.subtitle}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.architecture.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.architecture.description}
          </p>
        </div>

        {/* 4-Step Scalable Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.architecture.steps.map((step, idx) => {
            const Icon = icons[idx] || Cpu;
            return (
              <div
                key={idx}
                id={`arch-step-${idx}`}
                className="group relative p-8 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top: Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                      {step.number}
                    </span>

                    <div className="p-3 rounded-xl bg-slate-950/90 border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>STANDARD: VERIFIED</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    PRODUCTION GRADE
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
