import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../context/ProjectsContext';
import { X, ExternalLink, ArrowUpRight, CheckCircle2, Zap, Shield, Layers, Calendar, User, Code2, Globe } from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const { t, locale } = useLanguage();
  const { selectedProject, setSelectedProject } = useProjects();
  const [showIframe, setShowIframe] = useState(false);

  if (!selectedProject) return null;

  return (
    <div
      id="project-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        id="project-detail-modal-container"
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col overflow-hidden text-left"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold">
                {t.projects.modal.title}
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">
                {selectedProject.title[locale]}
              </h3>
            </div>
          </div>

          <button
            id="close-detail-modal-btn"
            onClick={() => {
              setSelectedProject(null);
              setShowIframe(false);
            }}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Cover / Media Banner or Live Iframe */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-950">
            {showIframe ? (
              <div className="w-full h-80 sm:h-96 relative">
                <iframe
                  src={selectedProject.liveUrl}
                  title={selectedProject.title[locale]}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin"
                />
                <button
                  onClick={() => setShowIframe(false)}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-white/20 text-xs font-mono text-white hover:bg-slate-900 transition-colors"
                >
                  Switch to Image
                </button>
              </div>
            ) : (
              <div className="relative h-64 sm:h-80 w-full group">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title[locale]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 right-4 flex gap-2">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
                  >
                    <span>{t.projects.modal.visitLive}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Quick Meta Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/60 border border-white/5 font-mono text-xs">
            <div>
              <span className="text-slate-400 block mb-1">CLIENT:</span>
              <span className="text-slate-200 font-semibold">{selectedProject.client || 'Enterprise'}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">TIMELINE:</span>
              <span className="text-slate-200 font-semibold">{selectedProject.year || '2023-2024'}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">CATEGORY:</span>
              <span className="text-cyan-400 font-semibold uppercase">{selectedProject.category}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">STATUS:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                PRODUCTION
              </span>
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Project Overview & Architecture Strategy
            </h4>
            <p className="text-slate-300 text-base leading-relaxed">
              {selectedProject.fullDescription?.[locale] || selectedProject.shortDescription[locale]}
            </p>
          </div>

          {/* Architecture Highlights & Engineering Solutions */}
          {selectedProject.architectureHighlights && (
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>{t.projects.modal.architectureHighlights}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {((selectedProject.architectureHighlights as any)?.[locale] || (selectedProject.architectureHighlights as any)?.en || (Array.isArray(selectedProject.architectureHighlights) ? selectedProject.architectureHighlights : [])).map((point: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300 leading-normal font-sans">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Metrics */}
          {selectedProject.metrics && (
            <div className="space-y-3">
              <h4 className="text-sm font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>{t.projects.modal.performanceMetrics}</span>
              </h4>
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/50 to-emerald-950/50 border border-cyan-500/30 text-sm font-mono text-cyan-200">
                {selectedProject.metrics[locale]}
              </div>
            </div>
          )}

          {/* Technologies Deployed */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono text-slate-400 font-bold uppercase tracking-wider">
              {t.projects.modal.stackUsed}
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/30 text-xs font-mono text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-slate-950/80">
          <button
            onClick={() => {
              setSelectedProject(null);
              setShowIframe(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
          >
            {t.projects.modal.close}
          </button>

          <a
            href={selectedProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            <span>{t.projects.modal.visitLive}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
