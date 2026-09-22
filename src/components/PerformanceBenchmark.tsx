import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Zap,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Code
} from 'lucide-react';

export const PerformanceBenchmark: React.FC = () => {
  const { t, locale } = useLanguage();
  const [activeStack, setActiveStack] = useState<'k4oow' | 'legacy'>('k4oow');

  return (
    <section id="benchmark" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.benchmark.subtitle}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.benchmark.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.benchmark.description}
          </p>
        </div>

        {/* Interactive Stack Mode Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl">
            <button
              id="benchmark-k4oow-toggle"
              onClick={() => setActiveStack('k4oow')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeStack === 'k4oow'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{t.benchmark.k4oowEngine}</span>
            </button>

            <button
              id="benchmark-legacy-toggle"
              onClick={() => setActiveStack('legacy')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeStack === 'legacy'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{t.benchmark.conventional}</span>
            </button>
          </div>
        </div>

        {/* 4 Core Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.benchmark.metrics.map((metric, idx) => {
            const isK4ooW = activeStack === 'k4oow';
            return (
              <div
                key={idx}
                id={`benchmark-card-${idx}`}
                className={`relative p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                  isK4ooW
                    ? 'bg-slate-900/70 border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-950/80 border-red-500/20 hover:border-red-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-400">{metric.label}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isK4ooW
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-950/80 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {isK4ooW ? metric.diff : 'LEGACY DRAG'}
                  </span>
                </div>

                <div className="mb-4">
                  <div
                    className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
                      isK4ooW ? 'text-cyan-400' : 'text-red-400'
                    }`}
                  >
                    {isK4ooW ? metric.k4oow : metric.legacy}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {metric.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* In-Depth Lighthouse & Architecture Inspector */}
        <div className="rounded-3xl bg-slate-900/80 border border-cyan-500/25 p-6 sm:p-10 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Lighthouse 4-Gauge Ring Display */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Google Lighthouse Audit 2026
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    All Production Deployments Verified
                  </span>
                </div>
              </div>

              {/* 4 Lighthouse Score Rings */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Performance', score: 98, color: 'text-emerald-400', stroke: '#10b981' },
                  { label: 'Accessibility', score: 100, color: 'text-emerald-400', stroke: '#10b981' },
                  { label: 'Best Practices', score: 100, color: 'text-emerald-400', stroke: '#10b981' },
                  { label: 'SEO Rank', score: 100, color: 'text-emerald-400', stroke: '#10b981' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-center space-y-2"
                  >
                    <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-800"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={item.color}
                          strokeDasharray={`${item.score}, 100`}
                          strokeWidth="3"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute font-mono text-sm font-extrabold text-white">
                        {item.score}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-300 block">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Blueprint & Optimization Stack */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>Zero-Overhead Optimization Topology</span>
              </h4>

              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-white font-bold block">1. Nginx FastCGI Micro-Caching & HTTP/3</span>
                    <span className="text-slate-400">
                      Bypasses PHP interpretation entirely for 95% of anonymous requests, returning pre-rendered HTML in &lt; 50ms.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-white font-bold block">2. Redis In-Memory Object Caching</span>
                    <span className="text-slate-400">
                      Complex SQL query results, e-commerce catalog hierarchies, and user sessions cached directly in RAM.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-violet-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-white font-bold block">3. Tree-Shaken CSS & Modular JavaScript</span>
                    <span className="text-slate-400">
                      Zero monolithic stylesheets. Clean Tailwind utility purging and deferred async script execution.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
