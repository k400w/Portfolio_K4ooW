import React, { useState } from 'react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../context/ProjectsContext';
import { ExternalLink, Layers, ArrowUpRight, Sparkles, ShieldCheck, Zap, Globe, Eye, Smartphone, Monitor } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onPreviewDevice?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPreviewDevice }) => {
  const { t, locale } = useLanguage();
  const { setSelectedProject } = useProjects();
  const [imageError, setImageError] = useState(false);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ecommerce':
        return t.projects.filters.ecommerce;
      case 'corporate':
        return t.projects.filters.corporate;
      case 'edtech':
        return t.projects.filters.edtech;
      case 'custom-cms':
        return t.projects.filters['custom-cms'];
      default:
        return category.toUpperCase();
    }
  };

  return (
    <div
      id={`project-card-${project.id}`}
      className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/95 border border-white/10 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] flex flex-col justify-between overflow-hidden"
    >
      {/* Visual Header / Cover Image */}
      <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-950">
        {!imageError ? (
          <img
            src={project.imageUrl}
            alt={project.title[locale] || project.title.en}
            loading="lazy"
            decoding="async"
            width="600"
            height="340"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-cyan-400 p-6">
            <Globe className="w-10 h-10 mb-2 opacity-60" />
            <span className="text-xs font-mono font-bold tracking-wider">{project.liveUrl}</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-slate-950/85 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 backdrop-blur-md">
            {getCategoryLabel(project.category)}
          </span>

          {project.featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/85 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{t.projects.card.featured}</span>
            </span>
          )}
        </div>

        {/* Floating Quick Action Overlay on Hover */}
        {onPreviewDevice && (
          <button
            onClick={() => onPreviewDevice(project)}
            aria-label={`Launch Multi-Device Simulator for ${project.title[locale] || project.title.en}`}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold cursor-pointer"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] transform -translate-y-2 group-hover:translate-y-0 transition-transform">
              <Monitor className="w-4 h-4" />
              <span>Launch Multi-Device Simulator</span>
            </div>
          </button>
        )}

        {/* Year & Client info badge overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pointer-events-none">
          <span className="bg-slate-950/90 px-2 py-0.5 rounded border border-white/10">
            {project.client}
          </span>
          <span className="bg-slate-950/90 px-2 py-0.5 rounded border border-white/10">
            {project.year || '2024'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
            {project.title[locale] || project.title.en}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
            {project.shortDescription[locale] || project.shortDescription.en}
          </p>

          {/* Performance Metric Pill */}
          {project.metrics && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="line-clamp-1">{project.metrics[locale] || project.metrics.en}</span>
            </div>
          )}
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-[11px] font-mono text-slate-300 group-hover:border-cyan-500/30 transition-colors"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="px-2 py-1 rounded-md bg-slate-900/60 text-[11px] font-mono text-slate-500">
                +{project.tags.length - 5}
              </span>
            )}
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10">
            <button
              id={`project-details-${project.id}`}
              onClick={() => setSelectedProject(project)}
              aria-label={`${t.projects.card.details}: ${project.title[locale] || project.title.en}`}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer"
              title={t.projects.card.details}
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{t.projects.card.details}</span>
            </button>

            {onPreviewDevice && (
              <button
                id={`project-simulator-${project.id}`}
                onClick={() => onPreviewDevice(project)}
                aria-label={`Simulate device for ${project.title[locale] || project.title.en}`}
                className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 text-xs font-bold border border-cyan-500/40 transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                title="Device Simulator"
              >
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate</span>
              </button>
            )}

            <a
              id={`project-live-link-${project.id}`}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.projects.card.liveSite}: ${project.title[locale] || project.title.en}`}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-white/10 hover:border-white/30 transition-all cursor-pointer group/link"
              title={t.projects.card.liveSite}
            >
              <span className="hidden sm:inline">{t.projects.card.liveSite}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform text-cyan-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

