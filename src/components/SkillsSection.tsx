import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TECH_SKILLS } from '../data/skills';
import {
  Code,
  Server,
  Database,
  Layers,
  Terminal,
  Cpu,
  Zap,
  ShoppingBag,
  BookOpen,
  Layout,
  Palette,
  Network,
  Search,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { t, locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
      case 'FileCode':
      case 'Code':
        return Code;
      case 'Server':
        return Server;
      case 'Database':
        return Database;
      case 'Terminal':
        return Terminal;
      case 'Layers':
        return Layers;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'BookOpen':
        return BookOpen;
      case 'Layout':
        return Layout;
      case 'Palette':
        return Palette;
      case 'Network':
        return Network;
      case 'Zap':
        return Zap;
      default:
        return Cpu;
    }
  };

  const filteredSkills = useMemo(() => {
    return TECH_SKILLS.filter(skill => {
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        skill.name.toLowerCase().includes(query) ||
        skill.description?.[locale]?.toLowerCase().includes(query) ||
        skill.highlights?.some(h => h.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, locale]);

  return (
    <section id="skills" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.skills.subtitle}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.skills.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.skills.description}
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md w-full md:w-auto">
            {(['all', 'frontend', 'backend', 'platforms', 'architecture'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.skills.categories[cat]}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.skills.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all font-mono placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => {
            const Icon = getIcon(skill.iconName);
            return (
              <div
                key={idx}
                id={`skill-card-${idx}`}
                className="group relative p-6 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Level */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-950/90 border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {skill.level}%
                      </span>
                      <div className="w-20 h-1.5 bg-slate-950 rounded-full overflow-hidden mt-1 border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {skill.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {skill.description?.[locale]}
                  </p>
                </div>

                {/* Highlights / Tags */}
                {skill.highlights && skill.highlights.length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {skill.highlights.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-white/10 text-[11px] font-mono text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-white/5">
            <p className="text-slate-400 font-mono">No matching technologies found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </section>
  );
};
