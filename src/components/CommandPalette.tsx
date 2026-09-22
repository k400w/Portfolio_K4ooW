import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../context/ProjectsContext';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Terminal,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  Code2,
  Cpu,
  Mail,
  MessageSquare,
  Shield,
  Globe,
  Copy,
  Check,
  Zap,
  Activity,
  X
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject
}) => {
  const { t, locale, toggleLocale } = useLanguage();
  const { projects, selectProject } = useProjects();
  const { openAdminModal } = useAuth();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedCv, setCopiedCv] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom event or parent
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const scrollToSection = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('kostya400@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1500);
  };

  const copyCvSummary = () => {
    const cv = `K4ooW - Solutions Architect & Senior Full-Stack Engineer\nCore Stack: React, TypeScript, PHP 8.2+, Node.js, MySQL, Redis, Nginx, Tailwind, WordPress/ACF, WooCommerce, OpenCart\nEmail: kostya400@gmail.com\nTelegram: @k4oow_dev\nLocation: Kyiv, Ukraine (UTC+2) - Remote Worldwide`;
    navigator.clipboard.writeText(cv);
    setCopiedCv(true);
    setTimeout(() => {
      setCopiedCv(false);
      onClose();
    }, 1500);
  };

  // Define actions & entries
  const allItems = [
    // Navigation
    {
      id: 'nav-projects',
      type: 'nav',
      section: t.commandPalette.sections.navigation,
      title: t.nav.projects,
      subtitle: 'Browse all 5+ live production commercial websites',
      icon: Layers,
      action: () => scrollToSection('projects')
    },
    {
      id: 'nav-skills',
      type: 'nav',
      section: t.commandPalette.sections.navigation,
      title: t.nav.skills,
      subtitle: 'Technical arsenal, frameworks & infrastructure stack',
      icon: Cpu,
      action: () => scrollToSection('skills')
    },
    {
      id: 'nav-benchmarks',
      type: 'nav',
      section: t.commandPalette.sections.navigation,
      title: t.commandPalette.sections.navigation + ': ' + (locale === 'ua' ? 'Аудит швидкодії' : 'Performance Audit'),
      subtitle: 'Core Web Vitals & Zero-Bloat Engineering benchmarks',
      icon: Zap,
      action: () => scrollToSection('benchmark')
    },
    {
      id: 'nav-architecture',
      type: 'nav',
      section: t.commandPalette.sections.navigation,
      title: t.nav.architecture,
      subtitle: 'System design, database indexing & caching topology',
      icon: Code2,
      action: () => scrollToSection('architecture')
    },
    {
      id: 'nav-experience',
      type: 'nav',
      section: t.commandPalette.sections.navigation,
      title: t.commandPalette.sections.navigation + ': ' + (locale === 'ua' ? 'Досвід роботи' : 'Career Timeline'),
      subtitle: '6+ years commercial track record & enterprise deliverables',
      icon: Activity,
      action: () => scrollToSection('experience')
    },
    {
      id: 'nav-testimonials',
      type: 'nav',
      section: t.commandPalette.sections.navigation,
      title: t.commandPalette.sections.navigation + ': ' + (locale === 'ua' ? 'Відгуки клієнтів' : 'Client Endorsements'),
      subtitle: 'Verified testimonials from project founders & stakeholders',
      icon: Sparkles,
      action: () => scrollToSection('testimonials')
    },
    {
      id: 'nav-contact',
      type: 'nav',
      section: t.commandPalette.sections.navigation,
      title: t.nav.contact,
      subtitle: 'Direct channels, Telegram & project brief submission',
      icon: Mail,
      action: () => scrollToSection('contact')
    },

    // Developer Actions
    {
      id: 'act-email',
      type: 'action',
      section: t.commandPalette.sections.actions,
      title: t.commandPalette.actions.copyEmail,
      subtitle: 'kostya400@gmail.com',
      icon: copiedEmail ? Check : Copy,
      badge: copiedEmail ? 'COPIED!' : 'FAST COPY',
      action: copyEmail
    },
    {
      id: 'act-telegram',
      type: 'action',
      section: t.commandPalette.sections.actions,
      title: t.commandPalette.actions.copyTelegram,
      subtitle: '@k4oow_dev (Direct Messenger)',
      icon: MessageSquare,
      badge: 'EXTERNAL',
      action: () => {
        window.open('https://t.me/k4oow_dev', '_blank');
        onClose();
      }
    },
    {
      id: 'act-cv',
      type: 'action',
      section: t.commandPalette.sections.actions,
      title: t.commandPalette.actions.copyCv,
      subtitle: 'Copy full technical stack spec to clipboard',
      icon: copiedCv ? Check : Copy,
      badge: copiedCv ? 'COPIED!' : 'SPECS',
      action: copyCvSummary
    },
    {
      id: 'act-lang',
      type: 'action',
      section: t.commandPalette.sections.actions,
      title: t.commandPalette.actions.toggleLanguage,
      subtitle: `Current: ${locale.toUpperCase()} (Click to toggle)`,
      icon: Globe,
      badge: locale.toUpperCase(),
      action: () => {
        toggleLocale();
        onClose();
      }
    },
    {
      id: 'act-admin',
      type: 'action',
      section: t.commandPalette.sections.actions,
      title: t.commandPalette.actions.openAdmin,
      subtitle: 'Access the interactive portfolio CMS & dispatch logs',
      icon: Shield,
      badge: 'AUTH',
      action: () => {
        onClose();
        openAdminModal();
      }
    },

    // Dynamic Projects
    ...projects.map(p => ({
      id: `proj-${p.id}`,
      type: 'project',
      section: t.commandPalette.sections.projects,
      title: p.title[locale] || p.title.en,
      subtitle: `${p.client || 'Client'} • ${p.tags.slice(0, 4).join(', ')}`,
      icon: ExternalLink,
      badge: p.category.toUpperCase(),
      action: () => {
        onClose();
        if (onSelectProject) onSelectProject(p.id);
        else selectProject(p);
      }
    }))
  ];

  const filteredItems = allItems.filter(item => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q)
    );
  });

  const handleItemSelect = (index: number) => {
    const item = filteredItems[index];
    if (item) item.action();
  };

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleItemSelect(selectedIndex);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="command-palette-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="command-palette-modal"
        className="w-full max-w-2xl rounded-2xl bg-slate-950/95 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col max-h-[80vh] backdrop-blur-2xl"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={t.commandPalette.placeholder}
            className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-sm sm:text-base focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white text-xs mr-2"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-mono text-sm">
              <Terminal className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              {t.commandPalette.noResults}
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemSelect(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/60 border border-cyan-500/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'border border-transparent text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-900 text-cyan-400 border border-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate font-sans">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono block truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <span className="hidden sm:inline">{item.section}</span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'translate-x-1 text-cyan-400' : 'text-slate-600'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Command Palette Keyboard Hints Footer */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-slate-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-slate-300">↓</kbd>
              {t.commandPalette.shortcuts.navigate}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-slate-300">↵</kbd>
              {t.commandPalette.shortcuts.select}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-slate-300">ESC</kbd>
              {t.commandPalette.shortcuts.close}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>K4ooW Fast-Action Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
};
