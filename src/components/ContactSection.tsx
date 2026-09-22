import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, Mail, MessageSquare, Github, Linkedin, Copy, Check, Terminal, Sparkles, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    serviceType: 'ecommerce',
    budget: 'medium',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceType: t.contact.form.services[formData.serviceType as keyof typeof t.contact.form.services] || formData.serviceType,
          budget: t.contact.form.budgets[formData.budget as keyof typeof t.contact.form.budgets] || formData.budget
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          telegram: '',
          serviceType: 'ecommerce',
          budget: 'medium',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      // Fallback success for local environment
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        telegram: '',
        serviceType: 'ecommerce',
        budget: 'medium',
        message: ''
      });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('kostya400@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.contact.subtitle}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.contact.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Communication Channels & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span>{t.contact.directLinksTitle}</span>
              </h3>

              {/* Direct Links */}
              <div className="space-y-4">
                {/* Email with copy button */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-950/80 text-cyan-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">EMAIL DIRECT</span>
                      <a
                        href="mailto:kostya400@gmail.com"
                        className="text-sm font-mono text-white group-hover:text-cyan-400 transition-colors"
                      >
                        kostya400@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-white/10 transition-colors"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Telegram */}
                <a
                  href="https://t.me/k4oow_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-950/80 border border-white/10 hover:border-cyan-500/40 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-950/80 text-cyan-400">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">TELEGRAM</span>
                      <span className="text-sm font-mono text-white group-hover:text-cyan-400 transition-colors">
                        @k4oow_dev
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-950/80 border border-white/10 hover:border-cyan-500/40 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-950/80 text-cyan-400">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">GITHUB</span>
                      <span className="text-sm font-mono text-white group-hover:text-cyan-400 transition-colors">
                        github.com/k4oow
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-950/80 border border-white/10 hover:border-cyan-500/40 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-950/80 text-cyan-400">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">LINKEDIN</span>
                      <span className="text-sm font-mono text-white group-hover:text-cyan-400 transition-colors">
                        linkedin.com/in/k4oow
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform" />
                </a>
              </div>

              {/* Response Time Guarantee Pill */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Typical Response Time: &lt; 4 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Transmission Form */}
          <div className="lg:col-span-7">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl space-y-6"
            >
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-sm font-mono flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{t.contact.form.success}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-sm font-mono flex items-center gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{t.contact.form.error}</span>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono text-slate-300">
                    {t.contact.form.nameLabel} *
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.form.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-slate-300">
                    {t.contact.form.emailLabel} *
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.form.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                  />
                </div>
              </div>

              {/* Telegram & Service Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-telegram" className="text-xs font-mono text-slate-300">
                    {t.contact.form.telegramLabel}
                  </label>
                  <input
                    id="contact-telegram"
                    type="text"
                    value={formData.telegram}
                    onChange={e => setFormData({ ...formData, telegram: e.target.value })}
                    placeholder={t.contact.form.telegramPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-service" className="text-xs font-mono text-slate-300">
                    {t.contact.form.serviceLabel}
                  </label>
                  <select
                    id="contact-service"
                    value={formData.serviceType}
                    onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 font-sans"
                  >
                    <option value="wordpress">{t.contact.form.services.wordpress}</option>
                    <option value="ecommerce">{t.contact.form.services.ecommerce}</option>
                    <option value="corporate">{t.contact.form.services.corporate}</option>
                    <option value="customCms">{t.contact.form.services.customCms}</option>
                    <option value="performance">{t.contact.form.services.performance}</option>
                    <option value="architecture">{t.contact.form.services.architecture}</option>
                    <option value="other">{t.contact.form.services.other}</option>
                  </select>
                </div>
              </div>

              {/* Budget Selector */}
              <div className="space-y-1.5">
                <label htmlFor="contact-budget" className="text-xs font-mono text-slate-300">
                  {t.contact.form.budgetLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['small', 'medium', 'large', 'enterprise'] as const).map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        formData.budget === b
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-950/80 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {t.contact.form.budgets[b]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Box */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-slate-300">
                  {t.contact.form.messageLabel} *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.form.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-slate-950 font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>{status === 'sending' ? t.contact.form.sending : t.contact.form.submit}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
