import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calculator, 
  Check, 
  Sparkles, 
  Layers, 
  Clock, 
  DollarSign, 
  Send, 
  ShieldCheck, 
  CheckCircle2,
  FileText,
  CreditCard,
  Truck,
  Zap,
  Bot,
  Globe2,
  Search,
  Lock,
  RefreshCw
} from 'lucide-react';
import { sound } from '../utils/audio';
import { OrderModal } from './OrderModal';

interface ProjectTypeConfig {
  id: 'wordpress' | 'ecommerce' | 'corporate' | 'custom-cms' | 'audit';
  labelEn: string;
  labelUa: string;
  basePrice: number;
  baseDays: number;
  badge?: string;
  descUa: string;
  descEn: string;
}

interface CmsConfig {
  id: 'wp_custom' | 'wp_woo' | 'react_next' | 'clean_php';
  titleEn: string;
  titleUa: string;
  descEn: string;
  descUa: string;
  addonPrice: number;
  addonDays: number;
}

interface ScaleConfig {
  id: 'mvp' | 'medium' | 'highload';
  titleEn: string;
  titleUa: string;
  descEn: string;
  descUa: string;
  multiplier: number;
  extraDays: number;
}

interface FeatureModule {
  id: string;
  labelEn: string;
  labelUa: string;
  price: number;
  days: number;
  icon: React.ReactNode;
}

export const ProjectEstimator: React.FC = () => {
  const { locale } = useLanguage();

  // State
  const [projectType, setProjectType] = useState<'wordpress' | 'ecommerce' | 'corporate' | 'custom-cms' | 'audit'>('wordpress');
  const [cmsEngine, setCmsEngine] = useState<'wp_custom' | 'wp_woo' | 'react_next' | 'clean_php'>('wp_custom');
  const [scale, setScale] = useState<'mvp' | 'medium' | 'highload'>('mvp');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'payments',
    'delivery',
    'redis',
    'seo'
  ]);

  const toggleFeature = (id: string) => {
    sound.playClick();
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // 1. Project Categories
  const projectTypes: ProjectTypeConfig[] = [
    { 
      id: 'wordpress', 
      labelEn: 'WordPress Landing / Site', 
      labelUa: 'WordPress Landing / Сайт', 
      basePrice: 190, 
      baseDays: 4,
      badge: locale === 'ua' ? 'Популярно' : 'Popular',
      descUa: 'Адаптивний сайт на кастомній чистій темі WP (ACF Pro) без важких конструкторів',
      descEn: 'Clean custom WP theme (ACF Pro) without heavy page-builders, fast 95+ load'
    },
    { 
      id: 'corporate', 
      labelEn: 'Corporate Website', 
      labelUa: 'Корпоративний сайт', 
      basePrice: 290, 
      baseDays: 7,
      descUa: 'Багатосторінковий сайт (5-12 сторінок): послуги, про нас, кейси, форми',
      descEn: 'Multi-page business site (5-12 pages): services, about, cases, lead capture'
    },
    { 
      id: 'ecommerce', 
      labelEn: 'E-Commerce Store', 
      labelUa: 'Інтернет-магазин', 
      basePrice: 390, 
      baseDays: 9,
      badge: locale === 'ua' ? 'Топ продажів' : 'Top Seller',
      descUa: 'Каталог товарів, категорії, фільтри, кошик, сторінка оформлення замовлення',
      descEn: 'Full product catalog, categories, filters, shopping cart, custom checkout'
    },
    { 
      id: 'custom-cms', 
      labelEn: 'Custom Web App / Portal', 
      labelUa: 'Веб-сервіс / Кабінет', 
      basePrice: 490, 
      baseDays: 14,
      descUa: 'Особистий кабінет клієнта, робота з базою даних MySQL/PostgreSQL, REST API',
      descEn: 'Client dashboard, custom database architecture, auth, secure REST API'
    },
    { 
      id: 'audit', 
      labelEn: 'Speed Audit & Optimization', 
      labelUa: 'Аудит & Прискорення 95+', 
      basePrice: 90, 
      baseDays: 2,
      descUa: 'Оптимізація існуючого сайту: кеш, WebP, скрипти, налаштування Nginx',
      descEn: 'Speed optimization for existing sites: caching, WebP, scripts, Nginx config'
    }
  ];

  // 2. CMS Platforms
  const cmsEngines: CmsConfig[] = [
    { 
      id: 'wp_custom', 
      titleEn: 'WordPress 6.x + ACF Pro (Custom Theme)', 
      titleUa: 'WordPress 6.x (Кастомна тема + ACF Pro)', 
      descEn: 'Clean PHP/Tailwind, No Elementor, ready admin panel, 95+ PageSpeed',
      descUa: 'Чистий код без Elementor, готова зручна адмінка, швидкість 95+ PageSpeed',
      addonPrice: 0,
      addonDays: 0
    },
    { 
      id: 'wp_woo', 
      titleEn: 'WordPress + WooCommerce Store Engine', 
      titleUa: 'WordPress + WooCommerce Магазин', 
      descEn: 'WooCommerce shop engine, product catalog, custom checkout hooks & inventory',
      descUa: 'Движок WooCommerce: каталог, кошик, кастомний чекаут, управління залишками',
      addonPrice: 90,
      addonDays: 3
    },
    { 
      id: 'react_next', 
      titleEn: 'React 19 / Next.js 15 Fullstack (SSR/SPA)', 
      titleUa: 'React 19 / Next.js 15 Fullstack (SSR/SPA)', 
      descEn: 'Bespoke component UI, TypeScript, REST/Server Actions, state management & SSR',
      descUa: 'Індивідуальна реактивна архітектура, TypeScript, API роути, SSR гідрація',
      addonPrice: 240,
      addonDays: 6
    },
    { 
      id: 'clean_php', 
      titleEn: 'Clean PHP 8.3 MVC + MySQL (Lightweight)', 
      titleUa: 'Чистий PHP 8.3 MVC + MySQL (Легкий)', 
      descEn: 'Lightweight custom backend, zero CMS overhead, blazing fast TTFB response',
      descUa: 'Легкий кастомний бекенд без важких CMS, миттєвий відгук сервера TTFB',
      addonPrice: 80,
      addonDays: 2
    }
  ];

  // 3. Project Scales
  const scales: ScaleConfig[] = [
    { 
      id: 'mvp', 
      titleEn: 'Starter / MVP Scope', 
      titleUa: 'Стартовий / MVP', 
      descEn: '1-5 key pages/sections, core functionality, quick launch', 
      descUa: '1-5 основних сторінок/секцій, базовий контент, швидкий запуск',
      multiplier: 1.0,
      extraDays: 0
    },
    { 
      id: 'medium', 
      titleEn: 'Business Pro Scope', 
      titleUa: 'Бізнес Pro (Стандарт)', 
      descEn: '5-15 pages, advanced animations, detailed catalog & forms', 
      descUa: '5-15 сторінок, розширені анімації, каталог, адаптивність',
      multiplier: 1.3,
      extraDays: 3
    },
    { 
      id: 'highload', 
      titleEn: 'High-Load / Enterprise', 
      titleUa: 'Масштабний / High-Load', 
      descEn: '15+ pages, high traffic architecture, multi-level caching', 
      descUa: '15+ сторінок, архітектура під високі навантаження, кешування',
      multiplier: 1.65,
      extraDays: 6
    }
  ];

  // 4. Additional Modules with transparent pricing
  const availableFeatures: FeatureModule[] = [
    { 
      id: 'payments', 
      labelEn: 'Online Payments (LiqPay / Stripe / Monobank) (+$45)', 
      labelUa: 'Платіжні шлюзи (LiqPay / Monobank / Stripe) (+$45)',
      price: 45,
      days: 1,
      icon: <CreditCard className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
    },
    { 
      id: 'delivery', 
      labelEn: 'Logistics API (Nova Poshta TTN automation) (+$45)', 
      labelUa: 'Логістика (API Нової Пошти, відділення, ТТН) (+$45)',
      price: 45,
      days: 1,
      icon: <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
    },
    { 
      id: 'redis', 
      labelEn: 'Redis Cache + Nginx FastCGI Microcache (+$35)', 
      labelUa: 'Redis кеш + Nginx FastCGI прискорення TTFB (+$35)',
      price: 35,
      days: 0.5,
      icon: <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
    },
    { 
      id: 'crm', 
      labelEn: 'Telegram Bot Alerts / CRM Lead Sync (+$35)', 
      labelUa: 'Сповіщення в Telegram / Інтеграція з CRM (+$35)',
      price: 35,
      days: 1,
      icon: <Bot className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
    },
    { 
      id: 'i18n', 
      labelEn: 'Multilingual Engine (UA / EN / PL etc.) (+$40)', 
      labelUa: 'Повна мультимовність (UA / EN / PL тощо) (+$40)',
      price: 40,
      days: 1,
      icon: <Globe2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
    },
    { 
      id: 'seo', 
      labelEn: 'SEO Schema.org & 95+ PageSpeed Setup (+$35)', 
      labelUa: 'SEO розмітка Schema.org + 95+ PageSpeed (+$35)',
      price: 35,
      days: 1,
      icon: <Search className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
    },
    { 
      id: 'wp_security', 
      labelEn: 'Security Hardening (WAF, Anti-Spam, 2FA) (+$30)', 
      labelUa: 'Захист сайту (WAF, Anti-Spam, 2FA, захист адмінки) (+$30)',
      price: 30,
      days: 0.5,
      icon: <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />
    },
    { 
      id: 'sync_import', 
      labelEn: 'Products Import / Sync (XML / Excel / 1C / Prom) (+$50)', 
      labelUa: 'Імпорт / Синхронізація товарів (XML/Excel/1С) (+$50)',
      price: 50,
      days: 1.5,
      icon: <RefreshCw className="w-3.5 h-3.5 text-purple-400 shrink-0" />
    }
  ];

  // Calculations
  const currentProjectType = projectTypes.find(p => p.id === projectType) || projectTypes[0];
  const currentCms = cmsEngines.find(c => c.id === cmsEngine) || cmsEngines[0];
  const currentScale = scales.find(s => s.id === scale) || scales[0];

  const selectedModulesObjects = availableFeatures.filter(f => selectedFeatures.includes(f.id));
  const featuresTotalCost = selectedModulesObjects.reduce((acc, feat) => acc + feat.price, 0);
  const featuresTotalDays = selectedModulesObjects.reduce((acc, feat) => acc + feat.days, 0);

  // Exact base + scale + engine calculation
  const calculatedBase = Math.round(currentProjectType.basePrice * currentScale.multiplier);
  const totalExactPrice = calculatedBase + currentCms.addonPrice + featuresTotalCost;
  
  // 10-15% realistic corridor for minor custom tweaks
  const estimatedMin = Math.round(totalExactPrice / 5) * 5;
  const estimatedMax = Math.round((totalExactPrice * 1.15) / 5) * 5;

  // Real Days calculation
  const totalWorkingDays = Math.ceil(
    (currentProjectType.baseDays + currentScale.extraDays + currentCms.addonDays + featuresTotalDays)
  );

  let estimatedWeeksString = '';
  if (totalWorkingDays <= 5) {
    estimatedWeeksString = locale === 'ua' ? `${totalWorkingDays} робочих днів` : `${totalWorkingDays} working days`;
  } else if (totalWorkingDays <= 10) {
    estimatedWeeksString = locale === 'ua' ? `1 — 2 тижні (${totalWorkingDays} роб. днів)` : `1 — 2 weeks (${totalWorkingDays} work days)`;
  } else if (totalWorkingDays <= 18) {
    estimatedWeeksString = locale === 'ua' ? `2 — 3 тижні (${totalWorkingDays} роб. днів)` : `2 — 3 weeks (${totalWorkingDays} work days)`;
  } else {
    estimatedWeeksString = locale === 'ua' ? `3 — 4 тижні (${totalWorkingDays} роб. днів)` : `3 — 4 weeks (${totalWorkingDays} work days)`;
  }

  const handleDispatchSpec = () => {
    sound.playChirp();
    setIsModalOpen(true);
  };

  return (
    <>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        specDetails={{
          projectType: currentProjectType.labelUa,
          cmsEngine: currentCms.titleUa,
          scale: currentScale.titleUa,
          selectedFeatures: selectedModulesObjects.map(m => m.labelUa),
          estimatedMin,
          estimatedMax,
          estimatedWeeks: estimatedWeeksString
        }}
      />

      <section id="estimator" className="py-24 relative overflow-hidden bg-slate-950/40 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {locale === 'ua' ? 'Чесний розрахунок вартості та термінів' : 'Transparent Pricing & Sprint Estimator'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {locale === 'ua' ? 'Розрахуйте архітектуру та терміни вашого проєкту' : 'Interactive Project Scope & Blueprint'}
            </h2>

            <p className="text-base sm:text-lg text-slate-300">
              {locale === 'ua'
                ? 'Реальні ринкові ціни без прихованих платежів. Оберіть тип сайту, CMS WordPress або інший стек та потрібні модулі.'
                : 'Honest market rates and realistic timelines with zero hidden fees. Select your project scope, CMS WordPress, and integrations.'}
            </p>
          </div>

          {/* Estimator Interactive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form & Selectors */}
            <div className="lg:col-span-7 space-y-7 bg-[#090d16]/90 border border-cyan-500/20 p-6 sm:p-8 rounded-2xl backdrop-blur-xl">
              
              {/* Step 1: Project Type */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                    {locale === 'ua' ? '1. Тип проєкту / Базовий формат:' : '1. Project Category:'}
                  </label>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {locale === 'ua' ? '✓ Без посередників' : '✓ Direct Developer Rate'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {projectTypes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setProjectType(item.id);
                        sound.playClick();
                      }}
                      className={`p-3 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer relative ${
                        projectType === item.id
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                          : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {item.badge && (
                        <span className="absolute -top-2 right-2 text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-bold">
                          {item.badge}
                        </span>
                      )}
                      <div className="font-bold text-white text-xs mb-1">
                        {locale === 'ua' ? item.labelUa : item.labelEn}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 mb-1.5">
                        {locale === 'ua' ? item.descUa : item.descEn}
                      </div>
                      <div className="text-[10px] font-mono text-cyan-400/90 flex items-center justify-between border-t border-white/5 pt-1">
                        <span>від ${item.basePrice}</span>
                        <span>{item.baseDays} {locale === 'ua' ? 'днів' : 'days'}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: CMS Engine Choice */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  {locale === 'ua' ? '2. Базова CMS / Платформа движка:' : '2. Engine / CMS Architecture:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {cmsEngines.map((cms) => (
                    <button
                      key={cms.id}
                      onClick={() => {
                        setCmsEngine(cms.id);
                        sound.playClick();
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        cmsEngine === cms.id
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                          : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs font-mono text-white mb-1 flex items-center justify-between">
                        <span>{locale === 'ua' ? cms.titleUa : cms.titleEn}</span>
                        {cms.id.startsWith('wp') && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300">
                            WP
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mb-1">
                        {locale === 'ua' ? cms.descUa : cms.descEn}
                      </div>
                      <div className="text-[10px] font-mono text-emerald-400/90">
                        {cms.addonPrice === 0 
                          ? (locale === 'ua' ? 'Базовий стек (+$0)' : 'Included (+$0)') 
                          : `+${cms.addonPrice}$ (${cms.addonDays} ${locale === 'ua' ? 'дн' : 'days'})`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Scale & Traffic */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  {locale === 'ua' ? '3. Масштаб та обсяг робіт:' : '3. Project Scale & Concurrency:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {scales.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setScale(item.id);
                        sound.playClick();
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        scale === item.id
                          ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400'
                          : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs font-mono text-white mb-1">
                        {locale === 'ua' ? item.titleUa : item.titleEn}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {locale === 'ua' ? item.descUa : item.descEn}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Architecture Modules & Integrations */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  {locale === 'ua' ? '4. Додаткові модулі та готові інтеграції:' : '4. Modules & Integrations:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableFeatures.map((feat) => {
                    const isChecked = selectedFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                            : 'bg-slate-950/50 border-white/10 text-slate-400 hover:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                            isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-white/20'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          {feat.icon}
                          <span className="truncate">{locale === 'ua' ? feat.labelUa : feat.labelEn}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Blueprint Output Card & Itemized Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-gradient-to-b from-[#0e1526] to-[#070b14] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    {locale === 'ua' ? 'Розрахунок вартості' : 'Cost & Scope Estimate'}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
                    {locale === 'ua' ? 'РЕАЛЬНИЙ КОШТОРИС' : 'ACCURATE ESTIMATE'}
                  </span>
                </div>

                {/* Estimate Summary Numbers */}
                <div className="py-5 space-y-3">
                  <div>
                    <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                      <span>{locale === 'ua' ? 'Орієнтовна ринкова вартість:' : 'Estimated Investment Range:'}</span>
                      <span className="text-[11px] text-emerald-400 font-mono">
                        {locale === 'ua' ? 'Чесна ціна' : 'Fair Price'}
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-400 mt-1">
                      ${estimatedMin.toLocaleString()} — ${estimatedMax.toLocaleString()}
                    </div>
                    <p className="text-[11px] text-slate-300 font-mono mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{locale === 'ua' ? 'Включає повний цикл розробки «під ключ»' : 'Includes full-cycle turnkey development'}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6 pt-2 text-xs font-mono border-t border-white/5">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>{locale === 'ua' ? `Термін: ${estimatedWeeksString}` : `Sprint: ${estimatedWeeksString}`}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{locale === 'ua' ? 'Гарантія: 12 міс' : 'Warranty: 12 mos'}</span>
                    </div>
                  </div>
                </div>

                {/* Itemized Cost Breakdown (Деталізація чека) */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-white/10 space-y-2.5 mb-5 text-xs font-mono">
                  <div className="text-[11px] text-cyan-300 uppercase tracking-wider font-bold flex items-center justify-between">
                    <span>{locale === 'ua' ? 'Деталізація розрахунку:' : 'Itemized Cost Breakdown:'}</span>
                    <span className="text-slate-400 text-[10px]">{locale === 'ua' ? 'Вартість' : 'Price'}</span>
                  </div>

                  <div className="space-y-1.5 text-slate-300 divide-y divide-white/5">
                    <div className="flex items-center justify-between pt-1">
                      <span className="truncate pr-2">
                        • {locale === 'ua' ? currentProjectType.labelUa : currentProjectType.labelEn} ({currentScale.titleUa})
                      </span>
                      <span className="text-white font-bold">${calculatedBase}</span>
                    </div>

                    {currentCms.addonPrice > 0 && (
                      <div className="flex items-center justify-between pt-1 text-slate-400">
                        <span className="truncate pr-2">• {locale === 'ua' ? currentCms.titleUa : currentCms.titleEn}</span>
                        <span className="text-white font-bold">+${currentCms.addonPrice}</span>
                      </div>
                    )}

                    {selectedModulesObjects.map((mod) => (
                      <div key={mod.id} className="flex items-center justify-between pt-1 text-slate-400">
                        <span className="truncate pr-2">• {locale === 'ua' ? mod.labelUa.split('(')[0] : mod.labelEn.split('(')[0]}</span>
                        <span className="text-cyan-300 font-bold">+${mod.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-cyan-500/30 pt-2 flex items-center justify-between font-bold text-white">
                    <span>{locale === 'ua' ? 'Разом без націнок:' : 'Total Calculated:'}</span>
                    <span className="text-emerald-400">${totalExactPrice}</span>
                  </div>
                </div>

                {/* Dispatch Button */}
                <button
                  onClick={handleDispatchSpec}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {locale === 'ua' ? 'Замовити проєкт за цією ціною' : 'Order Project at this Price'}
                  </span>
                </button>

                <p className="text-center text-[11px] font-mono text-slate-400 mt-3">
                  {locale === 'ua' ? 'Відкриється форма швидкого замовлення (Ім’я та телефон)' : 'Opens quick 20-second order popup (Name & phone)'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

