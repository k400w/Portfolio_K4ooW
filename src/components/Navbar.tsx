import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Terminal,
  Globe, 
  Menu, 
  X, 
  Code2, 
  Sparkles, 
  Send, 
  Command, 
  Zap, 
  Briefcase,
  Volume2,
  VolumeX,
  Clock,
  Activity,
  Calculator
} from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { locale, setLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState<boolean>(sound.getMuted());
  const [kyivTime, setKyivTime] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update live Kyiv time
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Kyiv',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setKyivTime(timeStr);
      } catch {
        setKyivTime('20:00');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleSound = () => {
    const isNowMuted = sound.toggleMute();
    setSoundMuted(isNowMuted);
  };

  const scrollTo = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090d16]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Nickname */}
        <button
          id="navbar-brand-btn"
          onClick={() => {
            sound.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none shrink-0"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
            <Terminal className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                K4ooW
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                PRO ARCHITECT
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 tracking-tight hidden sm:flex">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1 text-cyan-300/80">
                <Clock className="w-3 h-3 text-cyan-400" />
                KYIV {kyivTime || 'UTC+2'}
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <button
            id="nav-about-btn"
            onClick={() => scrollTo('hero')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all cursor-pointer"
          >
            {t.nav.about}
          </button>
          <button
            id="nav-projects-btn"
            onClick={() => scrollTo('projects')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all cursor-pointer"
          >
            {t.nav.projects}
          </button>
          <button
            id="nav-skills-btn"
            onClick={() => scrollTo('skills')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all cursor-pointer"
          >
            {t.nav.skills}
          </button>
          <button
            id="nav-benchmarks-btn"
            onClick={() => scrollTo('benchmark')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all cursor-pointer"
          >
            {locale === 'ua' ? 'Швидкодія' : 'Performance'}
          </button>
          <button
            id="nav-playground-btn"
            onClick={() => scrollTo('architecture-playground')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all cursor-pointer flex items-center gap-1"
          >
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>{locale === 'ua' ? 'Лабораторія' : 'Lab'}</span>
          </button>
          <button
            id="nav-estimator-btn"
            onClick={() => scrollTo('estimator')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all cursor-pointer flex items-center gap-1"
          >
            <Calculator className="w-3 h-3 text-emerald-400" />
            <span>{locale === 'ua' ? 'Калькулятор' : 'Estimator'}</span>
          </button>
          <button
            id="nav-experience-btn"
            onClick={() => scrollTo('experience')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all cursor-pointer"
          >
            {locale === 'ua' ? 'Досвід' : 'Career'}
          </button>
          <button
            id="nav-testimonials-btn"
            onClick={() => scrollTo('testimonials')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all cursor-pointer"
          >
            {locale === 'ua' ? 'Відгуки' : 'Reviews'}
          </button>
          <button
            id="nav-contact-btn"
            onClick={() => scrollTo('contact')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all cursor-pointer"
          >
            {t.nav.contact}
          </button>
        </nav>

        {/* Right Actions: Command Palette Button, Sound Toggle, Language Switcher, Admin Button, CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Command Palette Trigger ⌘K */}
          {onOpenCommandPalette && (
            <button
              id="navbar-cmd-palette-btn"
              onClick={() => {
                sound.playClick();
                onOpenCommandPalette();
              }}
              title="Open Command Palette (⌘K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all cursor-pointer shadow-sm"
            >
              <Command className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden lg:inline text-slate-400">Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-[10px] text-cyan-400">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Audio Sound FX Toggle */}
          <button
            id="navbar-sound-toggle-btn"
            onClick={handleToggleSound}
            aria-label={soundMuted ? 'Enable sound effects' : 'Mute sound effects'}
            title={soundMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              !soundMuted
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/80 border-white/10 text-slate-500 hover:text-slate-300'
            }`}
          >
            {!soundMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Language Switcher (EN / UA) */}
          <div id="language-switcher" className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-cyan-500/20 text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-cyan-400 ml-1.5 mr-1" />
            <button
              id="lang-btn-en"
              onClick={() => {
                sound.playClick();
                setLocale('en');
              }}
              aria-label="Switch language to English"
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                locale === 'en'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              id="lang-btn-ua"
              onClick={() => {
                sound.playClick();
                setLocale('ua');
              }}
              aria-label="Перемкнути мову на українську"
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                locale === 'ua'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UA
            </button>
          </div>
          {/* Hire Me CTA */}
          <button
            id="navbar-hire-cta"
            onClick={() => scrollTo('contact')}
            aria-label={t.nav.hireMe}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.nav.hireMe}</span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {onOpenCommandPalette && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenCommandPalette();
              }}
              aria-label="Open Command Search"
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-cyan-400"
              title="Command Palette"
            >
              <Command className="w-4 h-4" />
            </button>
          )}

          {/* Language Switcher for Mobile */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-cyan-500/20 text-[11px] font-mono">
            <button
              onClick={() => {
                sound.playClick();
                setLocale('en');
              }}
              aria-label="English"
              className={`px-1.5 py-0.5 rounded font-bold ${
                locale === 'en' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setLocale('ua');
              }}
              aria-label="Українська"
              className={`px-1.5 py-0.5 rounded font-bold ${
                locale === 'ua' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              UA
            </button>
          </div>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#090d16]/98 border-b border-cyan-500/20 px-6 py-6 space-y-4 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-2 text-sm font-mono">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 font-medium border-b border-white/5"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 font-medium border-b border-white/5"
            >
              {t.nav.projects}
            </button>
            <button
              onClick={() => scrollTo('skills')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 font-medium border-b border-white/5"
            >
              {t.nav.skills}
            </button>
            <button
              onClick={() => scrollTo('benchmark')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 font-medium border-b border-white/5"
            >
              {locale === 'ua' ? 'Швидкодія & Core Web Vitals' : 'Performance Audit'}
            </button>
            <button
              onClick={() => scrollTo('architecture-playground')}
              className="text-left py-2 text-cyan-300 hover:text-cyan-400 font-medium border-b border-white/5"
            >
              {locale === 'ua' ? 'Лабораторія навантаження' : 'High-Load Lab'}
            </button>
            <button
              onClick={() => scrollTo('estimator')}
              className="text-left py-2 text-emerald-300 hover:text-emerald-400 font-medium border-b border-white/5"
            >
              {locale === 'ua' ? 'Калькулятор проекту' : 'Project Estimator'}
            </button>
            <button
              onClick={() => scrollTo('architecture')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 font-medium border-b border-white/5"
            >
              {t.nav.architecture}
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 font-medium border-b border-white/5"
            >
              {locale === 'ua' ? 'Досвід та кар’єра' : 'Career Timeline'}
            </button>
            <button
              onClick={() => scrollTo('testimonials')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 font-medium border-b border-white/5"
            >
              {locale === 'ua' ? 'Відгуки клієнтів' : 'Client Reviews'}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 font-medium"
            >
              {t.nav.contact}
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">

            <button
              onClick={() => scrollTo('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm"
            >
              <Send className="w-4 h-4" />
              <span>{t.nav.hireMe}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

