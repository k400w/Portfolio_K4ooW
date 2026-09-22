import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useProjects } from '../../context/ProjectsContext';
import { X, Save, Plus, Image, Sparkles, Check, Upload, Loader2, Link2, AlertCircle } from 'lucide-react';

interface ProjectFormModalProps {
  isOpen: boolean;
  projectToEdit?: Project | null;
  onClose: () => void;
}

const PRESET_IMAGES = [
  { label: 'CleanTech / Wind', url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80' },
  { label: 'E-Commerce / Food', url: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=1200&q=80' },
  { label: 'EdTech / Language', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Medical / Care', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Beauty / Cosmetics', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80' },
  { label: 'SaaS / Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' }
];

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ isOpen, projectToEdit, onClose }) => {
  const { t } = useLanguage();
  const { createProject, updateProject } = useProjects();

  const [formData, setFormData] = useState({
    titleEn: '',
    titleUa: '',
    descEn: '',
    descUa: '',
    fullDescEn: '',
    fullDescUa: '',
    category: 'corporate',
    tags: 'React, Node.js, PHP, MySQL',
    liveUrl: '',
    githubUrl: '',
    imageUrl: PRESET_IMAGES[0].url,
    featured: true,
    sortOrder: 1,
    client: '',
    year: '2024',
    metricsEn: '99.9% Uptime • 95+ PageSpeed',
    metricsUa: '99.9% Аптайм • 95+ PageSpeed'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP, SVG)');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size exceeds 8MB limit');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      // Convert file to Base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result as string;
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              image: base64String,
              filename: file.name
            })
          });

          const data = await response.json();
          if (data.success && data.url) {
            setFormData(prev => ({ ...prev, imageUrl: data.url }));
          } else {
            // Fallback to local data URI if server upload fails
            setFormData(prev => ({ ...prev, imageUrl: base64String }));
          }
        } catch (err) {
          // If server fails, use data URI directly in browser
          setFormData(prev => ({ ...prev, imageUrl: base64String }));
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = () => {
        setUploadError('Failed to read image file');
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        titleEn: projectToEdit.title.en,
        titleUa: projectToEdit.title.ua,
        descEn: projectToEdit.shortDescription.en,
        descUa: projectToEdit.shortDescription.ua,
        fullDescEn: projectToEdit.fullDescription?.en || '',
        fullDescUa: projectToEdit.fullDescription?.ua || '',
        category: projectToEdit.category,
        tags: projectToEdit.tags.join(', '),
        liveUrl: projectToEdit.liveUrl,
        githubUrl: projectToEdit.githubUrl || '',
        imageUrl: projectToEdit.imageUrl,
        featured: projectToEdit.featured,
        sortOrder: projectToEdit.sortOrder || 1,
        client: projectToEdit.client || '',
        year: projectToEdit.year || '2024',
        metricsEn: projectToEdit.metrics?.en || '',
        metricsUa: projectToEdit.metrics?.ua || ''
      });
    } else {
      setFormData({
        titleEn: '',
        titleUa: '',
        descEn: '',
        descUa: '',
        fullDescEn: '',
        fullDescUa: '',
        category: 'corporate',
        tags: 'React, Node.js, PHP, MySQL',
        liveUrl: 'https://',
        githubUrl: '',
        imageUrl: PRESET_IMAGES[0].url,
        featured: true,
        sortOrder: 1,
        client: '',
        year: '2024',
        metricsEn: '99.9% Uptime • 95+ PageSpeed',
        metricsUa: '99.9% Аптайм • 95+ PageSpeed'
      });
    }
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const projectPayload: Partial<Project> = {
      title: {
        en: formData.titleEn,
        ua: formData.titleUa
      },
      shortDescription: {
        en: formData.descEn,
        ua: formData.descUa
      },
      fullDescription: {
        en: formData.fullDescEn || formData.descEn,
        ua: formData.fullDescUa || formData.descUa
      },
      category: formData.category as any,
      tags: tagsArray,
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl || undefined,
      imageUrl: formData.imageUrl,
      featured: formData.featured,
      sortOrder: Number(formData.sortOrder) || 1,
      client: formData.client || 'Client Platform',
      year: formData.year || '2024',
      metrics: {
        en: formData.metricsEn,
        ua: formData.metricsUa
      }
    };

    if (projectToEdit) {
      await updateProject(projectToEdit.id, projectPayload);
    } else {
      await createProject(projectPayload);
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      id="project-form-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        id="project-form-modal-container"
        className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{projectToEdit ? t.admin.projectForm.editTitle : t.admin.projectForm.createTitle}</span>
          </h3>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Title EN & UA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-cyan-300 font-semibold">
                {t.admin.projectForm.titleEn} *
              </label>
              <input
                required
                type="text"
                value={formData.titleEn}
                onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                placeholder="e.g. Life House Care Network"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-emerald-300 font-semibold">
                {t.admin.projectForm.titleUa} *
              </label>
              <input
                required
                type="text"
                value={formData.titleUa}
                onChange={e => setFormData({ ...formData, titleUa: e.target.value })}
                placeholder="напр. Life House — Мережа центрів"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Short Description EN & UA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-cyan-300 font-semibold">
                {t.admin.projectForm.descEn} *
              </label>
              <textarea
                required
                rows={3}
                value={formData.descEn}
                onChange={e => setFormData({ ...formData, descEn: e.target.value })}
                placeholder="Brief summary in English..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-emerald-300 font-semibold">
                {t.admin.projectForm.descUa} *
              </label>
              <textarea
                required
                rows={3}
                value={formData.descUa}
                onChange={e => setFormData({ ...formData, descUa: e.target.value })}
                placeholder="Короткий опис українською..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 resize-none"
              />
            </div>
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">
                {t.admin.projectForm.category}
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="corporate">{t.admin.projectForm.categoryOptions.corporate}</option>
                <option value="ecommerce">{t.admin.projectForm.categoryOptions.ecommerce}</option>
                <option value="edtech">{t.admin.projectForm.categoryOptions.edtech}</option>
                <option value="custom-cms">{t.admin.projectForm.categoryOptions['custom-cms']}</option>
                <option value="saas">{t.admin.projectForm.categoryOptions.saas}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">
                {t.admin.projectForm.tags}
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                placeholder={t.admin.projectForm.tagsPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          {/* Live URL & GitHub URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">
                {t.admin.projectForm.liveUrl} *
              </label>
              <input
                required
                type="url"
                value={formData.liveUrl}
                onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">
                {t.admin.projectForm.githubUrl}
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          {/* Image Upload, Direct URL & Preset Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.admin.projectForm.imageUrl} *</span>
              </label>
              {formData.imageUrl && (
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {t.admin.projectForm.uploadSuccess}
                </span>
              )}
            </div>

            {/* Drag and drop upload zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'border-white/15 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-950/90'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="hidden"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              <div className="flex flex-col items-center justify-center gap-2">
                {isUploading ? (
                  <>
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    <span className="text-xs font-mono text-cyan-300">{t.admin.projectForm.uploading}</span>
                  </>
                ) : (
                  <>
                    <div className="p-3 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium text-slate-200">
                        {t.admin.projectForm.uploadImage}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400">
                        {t.admin.projectForm.uploadDrop}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {uploadError && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Current Image Preview & Manual URL */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
              <div className="sm:col-span-3 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <Link2 className="w-3 h-3 text-slate-500" />
                  <span>{t.admin.projectForm.pasteUrlDirectly}:</span>
                </div>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/... or /uploads/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="sm:col-span-1">
                <div className="w-full h-16 rounded-xl border border-white/15 overflow-hidden bg-slate-950 flex items-center justify-center relative group">
                  {formData.imageUrl ? (
                    <img
                      src={formData.imageUrl}
                      alt="Cover Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">No image</span>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-mono text-white pointer-events-none">
                    Preview
                  </div>
                </div>
              </div>
            </div>

            {/* Preset Selection */}
            <div className="pt-1">
              <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
                {t.admin.projectForm.imagePresets}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${
                      formData.imageUrl === preset.url
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                        : 'bg-slate-950/80 border-white/10 text-slate-400 hover:border-white/30 hover:text-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Client, Year, Sort Order & Featured */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">
                {t.admin.projectForm.client}
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={e => setFormData({ ...formData, client: e.target.value })}
                placeholder="Client Name"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">
                {t.admin.projectForm.year}
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                placeholder="2024"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">
                {t.admin.projectForm.sortOrder}
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={e => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-xs font-mono"
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                id="featured-checkbox"
                type="checkbox"
                checked={formData.featured}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-950 border-white/20 text-cyan-500 focus:ring-cyan-400"
              />
              <label htmlFor="featured-checkbox" className="text-xs font-mono text-slate-300 cursor-pointer">
                {t.admin.projectForm.featured}
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono cursor-pointer"
            >
              {t.admin.projectForm.cancel}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{projectToEdit ? t.admin.projectForm.save : t.admin.projectForm.create}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
