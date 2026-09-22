import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Terminal, ArrowRight, ShieldCheck, Zap, Sparkles, Code, Cpu, ExternalLink, Copy, Check, Globe } from 'lucide-react';
import { sound } from '../utils/audio';

export const Hero: React.FC = () => {
  const { t, locale, toggleLocale } = useLanguage();
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<'spec' | 'stack' | 'live'>('spec');

  const scrollTo = (id: string) => {
    sound.playClick();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const copyShellCommand = () => {
    sound.playChirp();
    navigator.clipboard.writeText('curl -sL https://k4oow.space/spec.json');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Branding & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span>{t.hero.badge}</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-semibold">{t.nav.available}</span>
            </div>

            {/* Main Branding & Heading */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-slate-400 font-mono text-lg sm:text-xl">
                  {t.hero.greeting}
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400 font-mono">
                  {t.hero.nickname}
                </h1>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 leading-tight">
                {t.hero.title}
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed pt-2 font-normal">
                {t.hero.tagline}
              </p>
            </div>

            {/* Action Buttons & Language Switcher */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-view-projects-cta"
                onClick={() => scrollTo('projects')}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm sm:text-base hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-contact-cta"
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/15 hover:border-cyan-500/50 font-semibold text-sm sm:text-base backdrop-blur-md transition-all cursor-pointer"
              >
                <span>{t.hero.contactMe}</span>
              </button>

              {/* Quick Language Toggle in Hero */}
              <button
                id="hero-lang-toggle"
                onClick={toggleLocale}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-cyan-300 border border-cyan-500/20 font-mono text-xs hover:border-cyan-400/40 transition-all cursor-pointer"
                title="Toggle Language EN / UA"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>LOCALE: {locale.toUpperCase()}</span>
              </button>
            </div>

            {/* Quick Interactive Terminal Command */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-950/80 border border-white/10 font-mono text-xs text-slate-300">
                <span className="text-cyan-400">$</span>
                <span className="text-slate-400">curl -sL k4oow.space/spec.json</span>
                <button
                  onClick={copyShellCommand}
                  className="text-slate-400 hover:text-cyan-300 transition-colors ml-2"
                  title="Copy command"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Cyberpunk Interactive Code Console */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-cyan-500/30 p-1 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-xl">
              {/* Console Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950/60 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">k4oow@core-node: ~</span>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveTab('spec')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                      activeTab === 'spec' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    config.ts
                  </button>
                  <button
                    onClick={() => setActiveTab('stack')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                      activeTab === 'stack' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    stack.json
                  </button>
                  <button
                    onClick={() => setActiveTab('live')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                      activeTab === 'live' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    status.log
                  </button>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 space-y-3 min-h-[300px] overflow-x-auto bg-slate-950/90 rounded-b-xl">
                {activeTab === 'spec' && (
                  <div className="space-y-2 text-slate-300 leading-relaxed">
                    <p className="text-slate-500">// K4ooW Developer Profile Specification</p>
                    <p>
                      <span className="text-violet-400">const</span>{' '}
                      <span className="text-yellow-300">architectProfile</span> = &#123;
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">handle</span>: <span className="text-emerald-300">'K4ooW'</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">role</span>: <span className="text-emerald-300">'Solutions Architect & Full-Stack'</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">focus</span>: [
                      <span className="text-emerald-300">'High-Load Systems'</span>,{' '}
                      <span className="text-emerald-300">'Custom E-Commerce'</span>,{' '}
                      <span className="text-emerald-300">'Zero-Bloat CMS'</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">standards</span>: &#123;
                    </p>
                    <p className="pl-8">
                      <span className="text-cyan-300">pageSpeedTarget</span>: <span className="text-amber-300">95</span>,
                    </p>
                    <p className="pl-8">
                      <span className="text-cyan-300">architecture</span>: <span className="text-emerald-300">'Modular & Scalable'</span>,
                    </p>
                    <p className="pl-8">
                      <span className="text-cyan-300">uptimeGuarantee</span>: <span className="text-emerald-300">'99.9%'</span>
                    </p>
                    <p className="pl-4">&#125;,</p>
                    <p className="pl-4">
                      <span className="text-cyan-300">status</span>: <span className="text-emerald-400 font-bold">'AVAILABLE_FOR_CONTRACTS'</span>
                    </p>
                    <p>&#125;;</p>
                    <p className="text-slate-500 pt-2">// Ready to engineer next-generation web platforms.</p>
                  </div>
                )}

                {activeTab === 'stack' && (
                  <div className="space-y-2 text-slate-300 leading-relaxed">
                    <p className="text-slate-500">// Core Technologies & Infrastructure Matrix</p>
                    <p>&#123;</p>
                    <p className="pl-4">
                      <span className="text-cyan-300">"frontend"</span>: [
                      <span className="text-emerald-300">"React"</span>, <span className="text-emerald-300">"Next.js"</span>, <span className="text-emerald-300">"TypeScript"</span>, <span className="text-emerald-300">"Tailwind"</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">"backend"</span>: [
                      <span className="text-emerald-300">"PHP 8.2+"</span>, <span className="text-emerald-300">"Node.js"</span>, <span className="text-emerald-300">"Express"</span>, <span className="text-emerald-300">"REST APIs"</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">"databases"</span>: [
                      <span className="text-emerald-300">"MySQL"</span>, <span className="text-emerald-300">"PostgreSQL"</span>, <span className="text-emerald-300">"Redis"</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">"platforms"</span>: [
                      <span className="text-emerald-300">"Custom WooCommerce"</span>, <span className="text-emerald-300">"OpenCart"</span>, <span className="text-emerald-300">"ACF Pro"</span>, <span className="text-emerald-300">"OJS"</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">"infrastructure"</span>: [
                      <span className="text-emerald-300">"Nginx"</span>, <span className="text-emerald-300">"Linux CLI"</span>, <span className="text-emerald-300">"Cloudflare"</span>]
                    </p>
                    <p>&#125;</p>
                  </div>
                )}

                {activeTab === 'live' && (
                  <div className="space-y-2 text-slate-300 leading-relaxed">
                    <p className="text-emerald-400">[SYSTEM:OK] Core daemon initialized on port 3000</p>
                    <p className="text-cyan-300">[I18N:ACTIVE] Bilingual dictionary loaded: EN / UA</p>
                    <p className="text-slate-400">[CACHE:SYNC] 5 production projects mounted in memory</p>
                    <p className="text-amber-300">[METRICS:VERIFIED] Average client response latency &lt; 200ms</p>
                    <p className="text-slate-400">[SECURITY:SHIELD] CSRF, XSS filter, Rate limiting: ACTIVE</p>
                    <p className="text-emerald-400 animate-pulse">&gt; Ready for incoming client transmission...</p>
                  </div>
                )}
              </div>

              {/* Console Footer / Quick Stat */}
              <div className="px-4 py-2.5 bg-slate-950/80 border-t border-white/5 rounded-b-xl flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  Engine: V8 / Node / TypeScript
                </span>
                <span className="text-emerald-400 font-bold">100% PRODUCTION READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
