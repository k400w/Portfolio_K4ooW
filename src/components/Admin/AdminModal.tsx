import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectsContext';
import { Project, ContactMessage } from '../../types';
import { ProjectFormModal } from './ProjectFormModal';
import {
  Shield,
  X,
  Key,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  MessageSquare,
  Server,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Mail,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const { t, locale } = useLanguage();
  const { isAuthenticated, login, logout, isAdminModalOpen, closeAdminModal } = useAuth();
  const { projects, deleteProject, resetProjects } = useProjects();

  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'system'>('projects');
  const [passkey, setPasskey] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Project Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch {
      // ignore
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (isAdminModalOpen && isAuthenticated) {
      fetchMessages();
    }
  }, [isAdminModalOpen, isAuthenticated]);

  if (!isAdminModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    const result = await login(passkey);
    setIsLoggingIn(false);

    if (!result.success) {
      setAuthError(result.error || t.admin.authError);
    } else {
      setPasskey('');
    }
  };

  const handleQuickDemoFill = () => {
    setPasskey('k4oow2026');
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm(t.admin.projectsManager.deleteConfirm)) {
      await deleteProject(id);
    }
  };

  const handleResetProjects = async () => {
    if (window.confirm(t.admin.projectsManager.resetConfirm)) {
      await resetProjects();
    }
  };

  const markMessageRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}/read`, { method: 'PUT' });
      setMessages(prev => prev.map(m => (m.id === id ? { ...m, read: true } : m)));
    } catch {
      // ignore
    }
  };

  return (
    <>
      <div
        id="admin-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
      >
        <div
          id="admin-modal-container"
          className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col overflow-hidden text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span>{t.admin.title}</span>
                  {isAuthenticated && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                      SESSION ACTIVE
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-400 font-mono hidden sm:block">
                  {t.admin.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono border border-white/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.admin.logoutBtn}</span>
                </button>
              )}

              <button
                onClick={closeAdminModal}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          {!isAuthenticated ? (
            /* Login View */
            <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-mono">
                  {t.admin.loginTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.admin.loginSubtitle}
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    {t.admin.passwordLabel}
                  </label>
                  <input
                    type="password"
                    value={passkey}
                    onChange={e => setPasskey(e.target.value)}
                    placeholder={t.admin.passwordPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 font-mono"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoggingIn ? 'Verifying...' : t.admin.loginBtn}
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="w-full py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-cyan-300 text-xs font-mono border border-cyan-500/20 transition-colors cursor-pointer"
                >
                  {t.admin.quickFill} (k4oow2026)
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-slate-950/40">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-mono font-medium border-b-2 transition-all cursor-pointer ${
                    activeTab === 'projects'
                      ? 'border-cyan-400 text-cyan-300 bg-white/5 rounded-t-lg'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>{t.admin.tabs.projects} ({projects.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('messages');
                    fetchMessages();
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-mono font-medium border-b-2 transition-all cursor-pointer ${
                    activeTab === 'messages'
                      ? 'border-cyan-400 text-cyan-300 bg-white/5 rounded-t-lg'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.admin.tabs.messages} ({messages.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('system')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-mono font-medium border-b-2 transition-all cursor-pointer ${
                    activeTab === 'system'
                      ? 'border-cyan-400 text-cyan-300 bg-white/5 rounded-t-lg'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Server className="w-4 h-4" />
                  <span>{t.admin.tabs.system}</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {/* 1. PROJECTS TAB */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    {/* Top Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-400">
                          {t.admin.projectsManager.countLabel}{' '}
                          <strong className="text-cyan-400">{projects.length}</strong>
                        </span>
                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          {t.admin.projectsManager.livePreview}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleResetProjects}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-white/10 transition-colors cursor-pointer"
                          title="Reset to 5 original seed projects"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{t.admin.projectsManager.resetBtn}</span>
                        </button>

                        <button
                          onClick={handleAddProject}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs font-mono shadow-md hover:brightness-110 transition-all cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{t.admin.projectsManager.addBtn}</span>
                        </button>
                      </div>
                    </div>

                    {/* Projects Table / List */}
                    <div className="space-y-3">
                      {projects.map((proj, idx) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-xl bg-slate-950/70 border border-white/10 hover:border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-slate-400 w-6">
                              #{idx + 1}
                            </span>

                            <img
                              src={proj.imageUrl}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="w-14 h-12 object-cover rounded-lg bg-slate-800 shrink-0 border border-white/10"
                            />

                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-white font-mono">
                                  {proj.title[locale]}
                                </h4>
                                {proj.featured && (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                                    FEATURED
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                                {proj.shortDescription[locale]}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-mono text-cyan-400 uppercase">
                                  {proj.category}
                                </span>
                                <span className="text-[10px] text-slate-400">•</span>
                                <a
                                  href={proj.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                                >
                                  {proj.liveUrl}
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => handleEditProject(proj)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
                              title="Edit project"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-500/40 transition-colors cursor-pointer"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. MESSAGES TAB */}
                {activeTab === 'messages' && (
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-16 bg-slate-950/40 rounded-xl border border-white/5">
                        <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
                        <p className="text-slate-400 font-mono text-sm">
                          {t.admin.messagesList.empty}
                        </p>
                      </div>
                    ) : (
                      messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`p-5 rounded-xl border transition-all ${
                            msg.read
                              ? 'bg-slate-950/40 border-white/5'
                              : 'bg-slate-950/80 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-white/5">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-white font-mono text-sm">
                                {msg.name}
                              </span>
                              <span className="text-xs font-mono text-cyan-400">
                                {msg.email}
                              </span>
                              {msg.telegram && (
                                <span className="text-xs font-mono text-slate-400">
                                  TG: {msg.telegram}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                              <span>{new Date(msg.createdAt).toLocaleString()}</span>
                              {!msg.read && (
                                <button
                                  onClick={() => markMessageRead(msg.id)}
                                  className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900 transition-colors"
                                >
                                  {t.admin.messagesList.markRead}
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-400 mb-3">
                            <div>
                              <span className="text-slate-400">{t.admin.messagesList.service} </span>
                              <span className="text-slate-200">{msg.serviceType}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">{t.admin.messagesList.budget} </span>
                              <span className="text-slate-200">{msg.budget}</span>
                            </div>
                          </div>

                          <p className="text-slate-300 text-sm leading-relaxed font-sans bg-slate-900/60 p-3 rounded-lg border border-white/5">
                            {msg.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 3. SYSTEM TAB */}
                {activeTab === 'system' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold block">
                          SERVER ENVIRONMENT
                        </span>
                        <p className="text-sm font-mono text-slate-200">
                          {t.admin.systemStatus.serverUptime}
                        </p>
                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Express 4.x / Port 3000 Active
                        </span>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold block">
                          DATA PERSISTENCE
                        </span>
                        <p className="text-sm font-mono text-slate-200">
                          {t.admin.systemStatus.storageEngine}
                        </p>
                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> File /data/projects.json Mounted
                        </span>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold block">
                          LOCALIZATION ENGINE
                        </span>
                        <p className="text-sm font-mono text-slate-200">
                          {t.admin.systemStatus.i18nEngine}
                        </p>
                        <span className="text-xs font-mono text-cyan-300">
                          Active Locale: {locale.toUpperCase()}
                        </span>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold block">
                          SYNC PROTOCOL
                        </span>
                        <p className="text-sm font-mono text-slate-200">
                          {t.admin.systemStatus.lastSync}
                        </p>
                        <span className="text-xs font-mono text-emerald-400">
                          Bidirectional React State & Express REST API
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Form Modal for Add/Edit */}
      <ProjectFormModal
        isOpen={isFormOpen}
        projectToEdit={editingProject}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProject(null);
        }}
      />
    </>
  );
};
