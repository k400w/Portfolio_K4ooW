import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../context/ProjectsContext';
import { Project } from '../types';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  RotateCw,
  Lock,
  Globe,
  Layers,
  Zap,
  ShieldCheck,
  Code2,
  ChevronDown
} from 'lucide-react';

interface DevicePreviewModalProps {
  project: Project | null;
  onClose: () => void;
}

export const DevicePreviewModal: React.FC<DevicePreviewModalProps> = ({
  project: initialProject,
  onClose
}) => {
  const { t, locale } = useLanguage();
  const { projects } = useProjects();

  const [currentProject, setCurrentProject] = useState<Project | null>(initialProject);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [viewMode, setViewMode] = useState<'interactive' | 'blueprint'>('interactive');
  const [urlInput, setUrlInput] = useState<string>(initialProject?.liveUrl || '');
  const [activeUrl, setActiveUrl] = useState<string>(initialProject?.liveUrl || '');
  const [isLoadingFrame, setIsLoadingFrame] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (initialProject) {
      setCurrentProject(initialProject);
      setUrlInput(initialProject.liveUrl);
      setActiveUrl(initialProject.liveUrl);
      setIsLoadingFrame(true);
      setTimeout(() => setIsLoadingFrame(false), 800);
    }
  }, [initialProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (currentProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentProject, onClose]);

  if (!currentProject) return null;

  const handleSelectProject = (projectId: string) => {
    const selected = projects.find(p => p.id === projectId);
    if (selected) {
      setCurrentProject(selected);
      setUrlInput(selected.liveUrl);
      setActiveUrl(selected.liveUrl);
      setIsLoadingFrame(true);
      setTimeout(() => setIsLoadingFrame(false), 800);
    }
  };

  const handleNavigateUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let target = urlInput.trim();
    if (!target) return;
    if (!target.startsWith('http://') && !target.startsWith('https://') && !target.startsWith('/')) {
      target = 'https://' + target;
    }
    setUrlInput(target);
    setActiveUrl(target);
    setIsLoadingFrame(true);
    setTimeout(() => setIsLoadingFrame(false), 800);
  };

  const handleReload = () => {
    setIsLoadingFrame(true);
    if (iframeRef.current) {
      iframeRef.current.src = getIframeSrc();
    }
    setTimeout(() => setIsLoadingFrame(false), 800);
  };

  const getIframeSrc = () => {
    if (activeUrl.startsWith('http')) {
      return `/api/proxy-preview?url=${encodeURIComponent(activeUrl)}`;
    }
    return activeUrl;
  };

  const getDeviceDimensions = () => {
    if (device === 'mobile') {
      return orientation === 'portrait'
        ? { width: '393px', height: '852px', name: 'iPhone 16 Pro (393 × 852)' }
        : { width: '852px', height: '393px', name: 'iPhone 16 Pro Landscape (852 × 393)' };
    }
    if (device === 'tablet') {
      return orientation === 'portrait'
        ? { width: '820px', height: '1080px', name: 'iPad Air 11" (820 × 1080)' }
        : { width: '1080px', height: '820px', name: 'iPad Air Landscape (1080 × 820)' };
    }
    return { width: '100%', height: '100%', maxWidth: '1280px', name: 'MacBook Pro Retina (1280 × 800)' };
  };

  const dimensions = getDeviceDimensions();

  return createPortal(
    <div
      id="device-preview-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        id="device-preview-container"
        className="w-full max-w-7xl h-[92vh] flex flex-col rounded-3xl bg-slate-950/95 border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.25)] overflow-hidden relative z-[101]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Controls Toolbar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-white/10 shrink-0 gap-3">
          {/* Left: Project Selector */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative shrink-0 max-w-[220px] sm:max-w-xs">
              <select
                value={currentProject.id}
                onChange={e => handleSelectProject(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white font-bold text-xs sm:text-sm focus:outline-none focus:border-cyan-400 cursor-pointer truncate font-sans"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                    {p.title[locale] || p.title.en}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE VIEWPORT</span>
            </span>
          </div>

          {/* Center: Device Switcher & Orientation */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-white/10">
              <button
                onClick={() => setDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  device === 'desktop'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop 1280px"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                onClick={() => setDevice('tablet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  device === 'tablet'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Tablet 820px"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablet</span>
              </button>

              <button
                onClick={() => setDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  device === 'mobile'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile 393px"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            {/* Rotate Button (for mobile/tablet) */}
            {device !== 'desktop' && (
              <button
                onClick={() => setOrientation(prev => (prev === 'portrait' ? 'landscape' : 'portrait'))}
                className={`p-2 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
                  orientation === 'landscape'
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                    : 'bg-slate-950 border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Rotate Orientation"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* View Mode Switcher */}
            <div className="hidden lg:flex items-center p-1 rounded-xl bg-slate-950 border border-white/10">
              <button
                onClick={() => setViewMode('interactive')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  viewMode === 'interactive'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>Live View</span>
              </button>
              <button
                onClick={() => setViewMode('blueprint')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  viewMode === 'blueprint'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Blueprint</span>
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open Live</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-red-950/80 text-slate-300 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Browser Mockup Chrome & URL Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-white/10 shrink-0 gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          {/* Interactive URL address box */}
          <form onSubmit={handleNavigateUrl} className="flex-1 max-w-2xl mx-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/90 border border-white/10 focus-within:border-cyan-400 text-xs font-mono text-slate-300 transition-colors">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <input
                type="text"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="Enter URL to test..."
                className="w-full bg-transparent text-slate-200 focus:outline-none text-xs font-mono"
              />
              <button
                type="submit"
                className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 shrink-0"
              >
                GO
              </button>
            </div>
          </form>

          {/* Viewport size tag & Reload */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline bg-slate-900 px-2 py-1 rounded border border-white/10">
              {dimensions.name}
            </span>
            <button
              onClick={handleReload}
              className="p-1 rounded text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Reload frame"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoadingFrame ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Viewport Canvas Area */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto flex items-center justify-center bg-[#03060c] relative">
          {viewMode === 'blueprint' ? (
            /* Blueprint & Tech Specs View */
            <div className="w-full max-w-4xl p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl space-y-6 animate-fade-in overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                    {currentProject.category} • {currentProject.year || '2024'}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {currentProject.title[locale] || currentProject.title.en}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">Client: {currentProject.client}</p>
                </div>

                <button
                  onClick={() => setViewMode('interactive')}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Switch to Interactive View</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-mono text-cyan-300 font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Architectural Highlights</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans">
                    {(currentProject.architectureHighlights?.[locale] || currentProject.architectureHighlights?.en || []).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-mono text-cyan-300 font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Performance Metrics & Stack</span>
                  </h4>
                  {currentProject.metrics && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                      {currentProject.metrics[locale] || currentProject.metrics.en}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {currentProject.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                <img
                  src={currentProject.imageUrl}
                  alt="Snapshot"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover object-top"
                />
              </div>
            </div>
          ) : (
            /* Interactive Device View */
            <div
              className={`transition-all duration-300 rounded-3xl bg-slate-950 border shadow-2xl flex flex-col relative overflow-hidden ${
                device === 'mobile'
                  ? 'border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-8 ring-slate-900/90'
                  : device === 'tablet'
                  ? 'border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.7)] ring-6 ring-slate-900/80'
                  : 'border-white/10 w-full'
              }`}
              style={{
                width: dimensions.width,
                maxWidth: (dimensions as any).maxWidth || dimensions.width,
                height: device === 'desktop' ? 'calc(90vh - 140px)' : dimensions.height,
                maxHeight: 'calc(90vh - 140px)'
              }}
            >
              {/* Phone Dynamic Island / Camera Notch */}
              {device === 'mobile' && orientation === 'portrait' && (
                <div className="w-full flex justify-center py-2 bg-slate-950 shrink-0 select-none z-20">
                  <div className="w-24 h-5 rounded-full bg-black border border-white/10 flex items-center justify-between px-2">
                    <span className="w-2 h-2 rounded-full bg-slate-900" />
                    <span className="w-2 h-2 rounded-full bg-blue-900/40" />
                  </div>
                </div>
              )}

              {/* Tablet Camera dot */}
              {device === 'tablet' && (
                <div className="w-full flex justify-center py-1.5 bg-slate-950 shrink-0 select-none z-20">
                  <span className="w-2 h-2 rounded-full bg-slate-800 border border-white/10" />
                </div>
              )}

              {/* Device Screen Body */}
              <div className="flex-1 w-full h-full overflow-y-auto bg-slate-950 relative">
                {isLoadingFrame && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs gap-3">
                    <RotateCw className="w-8 h-8 text-cyan-400 animate-spin" />
                    <span className="text-xs font-mono text-cyan-300">Loading Live Viewport...</span>
                  </div>
                )}

                <iframe
                  ref={iframeRef}
                  src={getIframeSrc()}
                  title="Live Device Viewport"
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={() => setIsLoadingFrame(false)}
                  onError={() => setIsLoadingFrame(false)}
                />

                {/* Bottom live info bar */}
                <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-300 shadow-xl">
                  <div className="flex items-center gap-1.5 truncate">
                    <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">Viewing: <strong className="text-white">{currentProject.liveUrl}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      <span>Open Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile Home Bar Indicator */}
              {device === 'mobile' && orientation === 'portrait' && (
                <div className="w-full flex justify-center py-1.5 bg-slate-950 shrink-0 select-none z-20">
                  <div className="w-28 h-1 rounded-full bg-white/30" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
