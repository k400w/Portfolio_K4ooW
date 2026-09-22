import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Send, 
  Phone, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { sound } from '../utils/audio';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  specDetails: {
    projectType: string;
    cmsEngine: string;
    scale: string;
    selectedFeatures: string[];
    estimatedMin: number;
    estimatedMax: number;
    estimatedWeeks: string;
  };
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  specDetails
}) => {
  const { locale } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    sound.playClick();
    setStatus('sending');

    const projectSummary = `[Замовлення з калькулятора]
• Категорія: ${specDetails.projectType}
• CMS / Движок: ${specDetails.cmsEngine}
• Масштаб: ${specDetails.scale}
• Модулі: ${specDetails.selectedFeatures.join(', ')}
• Орієнтовна ціна: $${specDetails.estimatedMin} - $${specDetails.estimatedMax}
• Термін: ${specDetails.estimatedWeeks}
• Контактний телефон: ${phone}
• Telegram: ${telegram || 'не вказано'}`;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: 'order-via-modal@k4oow.space',
          telegram: telegram || phone,
          serviceType: specDetails.projectType,
          budget: `$${specDetails.estimatedMin} - $${specDetails.estimatedMax}`,
          message: projectSummary
        })
      });

      const data = await response.json();
      if (data.success) {
        sound.playChirp();
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      sound.playChirp();
      setStatus('success');
    }
  };

  const handleClose = () => {
    sound.playClick();
    onClose();
    if (status === 'success') {
      setStatus('idle');
      setName('');
      setPhone('');
      setTelegram('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#0e1628] to-[#080d18] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.25)] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white border border-white/10 hover:border-cyan-500/40 transition-colors cursor-pointer"
          title={locale === 'ua' ? 'Закрити' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-white">
              {locale === 'ua' ? 'Замовлення прийнято!' : 'Order Received!'}
            </h3>

            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              {locale === 'ua'
                ? `Дякую, ${name}! Я зв'яжуся з вами за номером ${phone} або в Telegram найближчим часом для узгодження деталей та запуску проєкту.`
                : `Thank you, ${name}! I will reach out to you via ${phone} shortly to discuss specifics and start your project.`}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-emerald-300 font-mono text-xs text-left space-y-1">
              <div className="font-bold text-white mb-1">
                {locale === 'ua' ? 'Зафіксовані умови:' : 'Fixed Terms:'}
              </div>
              <div>• {locale === 'ua' ? 'Бюджет' : 'Budget'}: ${specDetails.estimatedMin} - ${specDetails.estimatedMax}</div>
              <div>• {locale === 'ua' ? 'Термін' : 'Timeline'}: {specDetails.estimatedWeeks}</div>
              <div>• {locale === 'ua' ? 'Гарантія' : 'Warranty'}: 12 {locale === 'ua' ? 'місяців' : 'months'}</div>
            </div>

            <button
              onClick={handleClose}
              className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm hover:brightness-110 transition-all cursor-pointer"
            >
              {locale === 'ua' ? 'Чудово, дякую' : 'Great, Thank you'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{locale === 'ua' ? 'Швидке замовлення за фіксованою ціною' : 'Quick Project Order'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {locale === 'ua' ? 'Оформлення заявки' : 'Project Order Request'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {locale === 'ua'
                  ? 'Залиште контакти — я зателефоную або напишу для старту розробки'
                  : 'Leave your contact info — I will reach out shortly to initiate your project'}
              </p>
            </div>

            {/* Spec Snapshot Card */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{locale === 'ua' ? 'Розрахована вартість:' : 'Estimated Price:'}</span>
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-400">
                  ${specDetails.estimatedMin} — ${specDetails.estimatedMax}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{locale === 'ua' ? 'Термін виконання:' : 'Sprint delivery:'}</span>
                <span className="text-slate-200">{specDetails.estimatedWeeks}</span>
              </div>
              <div className="pt-1.5 border-t border-white/5 space-y-1">
                <div className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="font-semibold text-white">{specDetails.projectType}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-cyan-300 text-[10px]">{specDetails.cmsEngine}</span>
                </div>
                {specDetails.selectedFeatures.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {specDetails.selectedFeatures.slice(0, 4).map((feat, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-300 truncate max-w-[200px]">
                        {feat.split('(')[0].trim()}
                      </span>
                    ))}
                    {specDetails.selectedFeatures.length > 4 && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300">
                        +{specDetails.selectedFeatures.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'error' && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{locale === 'ua' ? 'Помилка надсилання. Спробуйте ще раз або напишіть у Telegram.' : 'Error sending. Please retry or contact directly.'}</span>
                </div>
              )}

              {/* Name field */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{locale === 'ua' ? 'Ваше ім’я *' : 'Your Name *'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={locale === 'ua' ? 'наприклад: Костянтин / ТОВ "Смарт"' : 'e.g. Alex / TechStudio'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                />
              </div>

              {/* Phone field */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{locale === 'ua' ? 'Номер телефону (Viber / WhatsApp / Дзвінок) *' : 'Phone Number (Call / WhatsApp) *'}</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+380 (__) ___-__-__"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 font-mono"
                />
              </div>

              {/* Telegram field (optional) */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">
                  {locale === 'ua' ? 'Telegram нікнейм (за бажанням)' : 'Telegram (optional)'}
                </label>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@username"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === 'sending' 
                      ? (locale === 'ua' ? 'Відправка...' : 'Sending...') 
                      : (locale === 'ua' ? 'Підтвердити замовлення' : 'Confirm Project Order')}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {locale === 'ua' ? 'Без спаму' : 'No spam'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {locale === 'ua' ? 'Відповідь до 1 год' : 'Reply &lt; 1hr'}
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
