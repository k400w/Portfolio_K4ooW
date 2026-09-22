import { SkillItem } from '../types';

export const TECH_SKILLS: SkillItem[] = [
  // Frontend
  {
    name: 'React & Next.js',
    level: 95,
    iconName: 'Atom',
    category: 'frontend',
    description: {
      en: 'App Router, SSR, SSG, Server Actions, component architecture, hooks & performance profiling.',
      ua: 'App Router, SSR, SSG, Server Actions, компонентна архітектура, кастомні хуки та оптимізація швидкодії.'
    },
    highlights: ['Next.js 14/15', 'React 18/19', 'State Management', 'Virtual DOM']
  },
  {
    name: 'JavaScript (ES6+) & TypeScript',
    level: 96,
    iconName: 'FileCode',
    category: 'frontend',
    description: {
      en: 'Modern asynchronous JavaScript, strict type safety, event loop deep-dive, DOM manipulation & Web APIs.',
      ua: 'Сучасний асинхронний JS, сувора типізація TypeScript, робота з Web APIs та оптимізація скриптів.'
    },
    highlights: ['Async/Await', 'Generics', 'WebSockets', 'Canvas / WebGL']
  },
  {
    name: 'Tailwind CSS & Modern UI',
    level: 98,
    iconName: 'Palette',
    category: 'frontend',
    description: {
      en: 'Utility-first styling, design token systems, dark/light themes, Framer Motion transitions & micro-interactions.',
      ua: 'Utility-first стилізація, дизайн-системи токенів, темні/світлі теми, плавні мікроанімації та переходи.'
    },
    highlights: ['Tailwind v3/v4', 'Framer Motion', 'Glassmorphism', 'Cyberpunk Aesthetics']
  },
  {
    name: 'HTML5/CSS3 & Responsive Design',
    level: 99,
    iconName: 'Layout',
    category: 'frontend',
    description: {
      en: 'Semantic markup, accessibility (WCAG AA), fluid typography, CSS Grid, Flexbox, and cross-device perfection.',
      ua: 'Семантична розмітка, доступність (WCAG AA), адаптивна верстка під будь-які екрани, CSS Grid та Flexbox.'
    },
    highlights: ['Mobile-First', 'Fluid Layouts', 'SEO Semantics', 'Cross-Browser']
  },

  // Backend & Systems
  {
    name: 'PHP 7.4 / 8.x',
    level: 94,
    iconName: 'Server',
    category: 'backend',
    description: {
      en: 'High-speed object-oriented backend programming, custom architectural plugins, API endpoints & data processors.',
      ua: 'Високопродуктивний ООП бекенд, розробка кастомних плагінів, REST API ендпоінтів та обробників даних.'
    },
    highlights: ['PHP 8.2+', 'OOP & Design Patterns', 'Composer', 'Security Filtering']
  },
  {
    name: 'Node.js & Express',
    level: 92,
    iconName: 'Cpu',
    category: 'backend',
    description: {
      en: 'Event-driven server architecture, RESTful microservices, WebSocket streams, rate limiting, and middleware chains.',
      ua: 'Подійно-орієнтована архітектура серверів, RESTful мікросервіси, вебсокети та проміжне ПЗ.'
    },
    highlights: ['Express', 'REST API', 'Auth & JWT', 'Stream Processing']
  },
  {
    name: 'MySQL & PostgreSQL',
    level: 90,
    iconName: 'Database',
    category: 'backend',
    description: {
      en: 'Complex relational database schema design, index optimization, execution plan analysis, and migration pipelines.',
      ua: 'Проєктування реляційних баз даних, індексація, оптимізація важких запитів та безшовні міграції.'
    },
    highlights: ['Query Optimization', 'Foreign Keys & Indexing', 'Transactions', 'ACID Compliance']
  },
  {
    name: 'Nginx & Linux Server Admin',
    level: 90,
    iconName: 'Terminal',
    category: 'backend',
    description: {
      en: 'Reverse proxying, SSL/TLS certificates, gzip/brotli compression, FastCGI caching, Linux shell automation & cron tasks.',
      ua: 'Налаштування reverse proxy, SSL/TLS, FastCGI кешування, захист від атак та автоматизація Linux CLI.'
    },
    highlights: ['Reverse Proxy', 'FastCGI Micro-caching', 'Bash Scripting', 'Security Firewalls']
  },

  // Platforms & CMS
  {
    name: 'WordPress & WooCommerce (Custom / ACF)',
    level: 98,
    iconName: 'Layers',
    category: 'platforms',
    description: {
      en: 'Clean custom theme/plugin development without bloated page builders. Bespoke Gutenberg blocks, ACF Pro, speed tuning.',
      ua: 'Розробка кастомних тем і плагінів з нуля без важких конструкторів. Власні блоки Gutenberg, ACF Pro, макс. швидкість.'
    },
    highlights: ['Custom Themes/Plugins', 'ACF Pro / Gutenberg', 'WooCommerce Hooks', 'Zero Bloat']
  },
  {
    name: 'OpenCart & Custom E-Commerce',
    level: 92,
    iconName: 'ShoppingBag',
    category: 'platforms',
    description: {
      en: 'Custom module architecture, payment gateways (LiqPay, Stripe, WayForPay), delivery APIs (Nova Poshta), 1C/CRM sync.',
      ua: 'Розробка модулів для інтернет-магазинів, платіжних шлюзів, служб доставки (Нова Пошта) та синхронізації з CRM.'
    },
    highlights: ['Checkout Optimization', 'Payment Gateways', 'Delivery APIs', 'ERP/CRM Sync']
  },
  {
    name: 'OJS (Open Journal Systems) & Headless',
    level: 88,
    iconName: 'BookOpen',
    category: 'platforms',
    description: {
      en: 'Academic scientific journal publishing systems, custom editorial workflows, DOI indexing, and headless CMS integrations.',
      ua: 'Платформи для наукових журналів (OJS), кастомізація редакційних процесів, DOI індексація та Headless CMS.'
    },
    highlights: ['OJS Theming', 'Scientific Metadata', 'DOI Plugins', 'Headless API']
  },

  // Architecture & Optimization
  {
    name: 'High Performance & Speed Optimization',
    level: 96,
    iconName: 'Zap',
    category: 'architecture',
    description: {
      en: '90+ Google PageSpeed scores, Critical CSS extraction, image WebP/AVIF pipelines, Redis caching, asset minification.',
      ua: 'Досягнення 90+ PageSpeed, Critical CSS, WebP/AVIF оптимізація медіа, Redis кешування та стиснення коду.'
    },
    highlights: ['Core Web Vitals', 'Redis / Memcached', 'Cloudflare CDN', 'Asset Bundling']
  },
  {
    name: 'REST APIs & Webhooks Integration',
    level: 95,
    iconName: 'Network',
    category: 'architecture',
    description: {
      en: 'Bespoke API development, third-party CRM hooks (HubSpot, KeyCRM, Bitrix), Telegram Bot notifications, and data pipelines.',
      ua: 'Створення надійних API, інтеграція з CRM, Telegram-ботами для миттєвих сповіщень та платіжними системами.'
    },
    highlights: ['RESTful Standards', 'Telegram Bot APIs', 'CRM Webhooks', 'OAuth / Auth']
  }
];
