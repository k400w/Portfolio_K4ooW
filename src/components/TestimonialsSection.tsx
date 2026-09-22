import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Quote, Sparkles, ExternalLink, CheckCircle2, Star, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.testimonials.subtitle}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.testimonials.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.testimonials.description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {((t.testimonials as any).reviews || (t.testimonials as any).items || []).map((item: any, idx: number) => (
            <div
              key={idx}
              id={`testimonial-card-${idx}`}
              className="group relative p-7 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Top: Quote Icon & Metric Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                    <Quote className="w-5 h-5" />
                  </div>

                  {item.metric && (
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-semibold">
                      {item.metric}
                    </span>
                  )}
                </div>

                {/* Rating 5 stars */}
                <div className="flex gap-1 text-amber-400">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Project Footer */}
              <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white group-hover:text-cyan-300 transition-colors">
                    <span>{item.author}</span>
                    <ShieldCheck className="w-4 h-4 text-cyan-400" title="Verified Client" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono block">
                    {item.role || item.position} {item.company ? `• ${item.company}` : ''}
                  </span>
                </div>

                {item.project && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                    <span>{item.project}</span>
                    {item.link && <ExternalLink className="w-3.5 h-3.5" />}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
