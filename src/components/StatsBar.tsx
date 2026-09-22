import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Layers, Zap, ShieldCheck } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Award,
      val: t.stats.yearsVal,
      label: t.stats.years,
      color: 'text-cyan-400',
      border: 'hover:border-cyan-500/50',
      glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]'
    },
    {
      icon: Layers,
      val: t.stats.projectsVal,
      label: t.stats.projects,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/50',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]'
    },
    {
      icon: Zap,
      val: t.stats.performanceVal,
      label: t.stats.performance,
      color: 'text-yellow-400',
      border: 'hover:border-yellow-500/50',
      glow: 'group-hover:shadow-[0_0_20px_rgba(234,179,8,0.25)]'
    },
    {
      icon: ShieldCheck,
      val: t.stats.satisfactionVal,
      label: t.stats.satisfaction,
      color: 'text-violet-400',
      border: 'hover:border-violet-500/50',
      glow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]'
    }
  ];

  return (
    <section id="stats-section" className="relative z-10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                id={`stat-card-${idx}`}
                className={`group relative p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md transition-all duration-300 ${stat.border} ${stat.glow}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-slate-950/80 border border-white/5 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    METRIC_0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${stat.color}`}>
                    {stat.val}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
