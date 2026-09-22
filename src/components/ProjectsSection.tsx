import React, { useState, useMemo, lazy, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../context/ProjectsContext';
import { useAuth } from '../context/AuthContext';
import { ProjectCard } from './ProjectCard';
import { Project } from '../types';

const DevicePreviewModal = lazy(() =>
  import('./DevicePreviewModal').then(m => ({ default: m.DevicePreviewModal }))
);
import {
  Layers,
  Plus,
  RefreshCw,
  Sparkles,
  Filter,
  Code2,
  LayoutGrid,
  Monitor,
  Table,
  Search,
  Zap,
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { t, locale } = useLanguage();
  const { projects, loading, resetProjects, setSelectedProject } = useProjects();
  const { isAuthenticated, openAdminModal } = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'devices' | 'matrix'>('grid');
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const categories = [
    { id: 'all', label: t.projects.filters.all },
    { id: 'ecommerce', label: t.projects.filters.ecommerce },
    { id: 'corporate', label: t.projects.filters.corporate },
    { id: 'edtech', label: t.projects.filters.edtech },
    { id: 'custom-cms', label: t.projects.filters['custom-cms'] }
  ];

  // Extract top unique tech tags
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => set.add(t)));
    return ['all', ...Array.from(set).slice(0, 8)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        // Category filter
        if (activeCategory !== 'all' && project.category !== activeCategory) {
          return false;
        }
        // Tech Tag filter
        if (selectedTag !== 'all' && !project.tags.includes(selectedTag)) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const title = (project.title[locale] || project.title.en).toLowerCase();
          const desc = (project.shortDescription[locale] || project.shortDescription.en).toLowerCase();
          const client = (project.client || '').toLowerCase();
          const tagsMatch = project.tags.some(t => t.toLowerCase().includes(q));
          if (!title.includes(q) && !desc.includes(q) && !client.includes(q) && !tagsMatch) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));
  }, [projects, activeCategory, selectedTag, searchQuery, locale]);

  const handleReset = async () => {
    if (window.confirm(t.admin.projectsManager.resetConfirm)) {
      setIsResetting(true);
      await resetProjects();
      setIsResetting(false);
    }
  };

  return (
    <section id="projects" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.projects.subtitle}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.projects.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.projects.description}
          </p>
        </div>

        {/* View Switcher Bar & Global Filter Header */}
        <div className="space-y-4 mb-10">
          {/* Row 1: Search & View Mode Switcher */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={locale === 'ua' ? 'Пошук за проєктом, клієнтом чи стеком...' : 'Search case studies, clients, or technologies...'}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-cyan-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Mode Toggle Switcher */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl">
                <button
                  id="view-mode-grid"
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.views.grid}</span>
                </button>

                <button
                  id="view-mode-devices"
                  onClick={() => setViewMode('devices')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'devices'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.views.devices}</span>
                </button>

                <button
                  id="view-mode-matrix"
                  onClick={() => setViewMode('matrix')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'matrix'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.views.matrix}</span>
                </button>
              </div>

              {/* Admin CTA */}
              <button
                id="admin-manage-projects-btn"
                onClick={openAdminModal}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">{t.admin.projectsManager.addBtn}</span>
              </button>

              {isAuthenticated && (
                <button
                  id="admin-reset-projects-btn"
                  onClick={handleReset}
                  disabled={isResetting}
                  title="Reset projects to initial 5 seed records"
                  className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin text-cyan-400' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Category Filters & Tech Stack Quick Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {/* Category Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  id={`filter-btn-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-bold'
                      : 'bg-slate-900/60 border border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Tech Tag Selector */}
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[11px] font-mono text-slate-500 mr-1 hidden lg:inline">
                Stack:
              </span>
              {availableTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    selectedTag === tag
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {tag === 'all' ? 'All Tech' : tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic View Rendering */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-slate-900/50 border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onPreviewDevice={p => setPreviewProject(p)}
              />
            ))}
          </div>
        ) : viewMode === 'devices' ? (
          /* Interactive Multi-Device Showcase Mode */
          <div className="space-y-12">
            {filteredProjects.map((project, pIdx) => (
              <div
                key={project.id}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/25 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.1)] space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 mb-2 inline-block">
                      {project.category.toUpperCase()} • {project.year}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {project.title[locale] || project.title.en}
                    </h3>
                    <p className="text-sm text-slate-300 font-mono mt-1">
                      {project.client} — {project.shortDescription[locale] || project.shortDescription.en}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPreviewProject(project)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Simulate Responsive Frames</span>
                    </button>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-white/10"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Device Mockup Shell */}
                <div className="rounded-2xl bg-slate-950 border border-white/10 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-white/10 text-xs font-mono text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>{project.liveUrl}</span>
                  </div>
                  <div className="max-h-[420px] overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title[locale]}
                      className="w-full object-cover object-top hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Architectural Table Matrix Mode */
          <div className="rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950/90 text-slate-400 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Project & Client</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Architecture & Stack</th>
                    <th className="px-6 py-4">Core Optimization</th>
                    <th className="px-6 py-4">PageSpeed Score</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredProjects.map(project => (
                    <tr
                      key={project.id}
                      className="hover:bg-cyan-950/20 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                          {project.title[locale] || project.title.en}
                        </div>
                        <div className="text-slate-400 text-[11px]">{project.client}</div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-white/10 text-cyan-300 text-[10px]">
                          {project.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {project.metrics?.[locale] || 'Micro-caching & Redis'}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                          <Zap className="w-3 h-3 text-emerald-400" />
                          98 / 100
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setPreviewProject(project)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10"
                            title="Device Simulator"
                          >
                            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                          </button>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 transition-all"
                            title="Visit Website"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-white/5">
            <p className="text-slate-400 font-mono">No projects found matching your query.</p>
          </div>
        )}
      </div>

      {/* Device Simulator Modal */}
      <Suspense fallback={null}>
        {previewProject && (
          <DevicePreviewModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </Suspense>
    </section>
  );
};

