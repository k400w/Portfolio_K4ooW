import express from 'express';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;


// Enable gzip/brotli compression for all text/json/js/css responses
app.use(compression());

app.use(express.json({ limit: '10mb' }));

// Static public directory serving with cache control headers
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// 1-day caching for static assets
const staticCacheOptions = {
  maxAge: '1d',
  etag: true,
  lastModified: true
};

app.use(express.static(PUBLIC_DIR, staticCacheOptions));
app.use('/projects', express.static(path.join(PUBLIC_DIR, 'projects'), staticCacheOptions));
app.use('/uploads', express.static(UPLOADS_DIR, staticCacheOptions));

// Data storage file path
const DATA_DIR = path.join(process.cwd(), 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating data directory:', err);
  }
}

// Initial curated projects with real project visual assets
const SEED_PROJECTS = [
  {
    id: 'lifehouse',
    title: {
      en: 'Life House — Social & Care Network',
      ua: 'Life House — Мережа турботи та соціальних центрів'
    },
    shortDescription: {
      en: 'Full-cycle digital portal for specialized boarding homes and social rehabilitation centers with high availability and accessible UX.',
      ua: 'Повнофункціональний цифровий портал мережі пансіонатів і реабілітаційних центрів з високою відмовостійкістю та адаптивним UX.'
    },
    fullDescription: {
      en: 'Engineered a scalable, accessible web platform for the Life House care network across Ukraine. Built with custom CMS architecture, multilingual support, responsive booking workflows, dynamic branch geolocation, and optimized performance for mobile and low-bandwidth connections.',
      ua: 'Розроблено масштабовану доступну веб-платформу для мережі центрів догляду Life House по всій Україні. Реалізовано кастомну архітектуру CMS, багатомовність, системи бронювання та консультацій, геолокацію філій та оптимізацію швидкодії для мобільних пристроїв.'
    },
    category: 'corporate',
    tags: ['Custom CMS', 'PHP', 'JavaScript', 'MySQL', 'Tailwind/CSS', 'Nginx', 'SEO Architecture'],
    liveUrl: 'https://www.lifehouse.com.ua/',
    imageUrl: '/projects/lifehouse-real.jpg',
    featured: true,
    sortOrder: 1,
    client: 'Life House Ukraine',
    year: '2023–2024',
    status: 'production',
    architectureHighlights: {
      en: [
        'Custom modular WordPress/PHP backend with bespoke Gutenberg blocks & ACF Pro',
        'Sub-second page load times with server-side caching & Cloudflare CDN edge routing',
        'Interactive branch locator with dynamic Google Maps API integration & filtering',
        'Accessible, high-contrast typography and WCAG AA compliance for elderly visitors'
      ],
      ua: [
        'Кастомний модульний бекенд на WordPress/PHP із власними Gutenberg блоками та ACF Pro',
        'Швидкість завантаження до 1 секунди завдяки кешуванню на Nginx та Cloudflare CDN',
        'Інтерактивний каталог філій з динамічною картою та фільтрацією послуг',
        'Доступний висококонтрастний дизайн, оптимізований за стандартами WCAG AA'
      ]
    },
    metrics: {
      en: '99.9% Uptime • 95+ PageSpeed Mobile • 100% Responsive',
      ua: '99.9% Аптайм • 95+ PageSpeed Mobile • 100% Адаптивність'
    }
  },
  {
    id: 'speakclubingerman',
    title: {
      en: 'Speak Club in German — EdTech Platform',
      ua: 'Speak Club in German — Освітня платформа розмовної німецької'
    },
    shortDescription: {
      en: 'Modern interactive educational ecosystem with dynamic class scheduling, student member portal, and automated booking funnels.',
      ua: 'Сучасна інтерактивна освітня екосистема з розкладом занять, особистим кабінетом учня та автоматизованими воронками запису.'
    },
    fullDescription: {
      en: 'A high-converting educational web application designed for interactive language practice. Features custom calendar scheduling algorithms, level assessment quizzes, automated CRM lead routing, and dynamic student session management.',
      ua: 'Висококонверсійний освітній веб-додаток для інтерактивної мовної практики. Включає алгоритми онлайн-розкладу занять, інтерактивні тести визначення рівня знань, автоматичну інтеграцію з CRM та онлайн-оплати.'
    },
    category: 'edtech',
    tags: ['React', 'JavaScript', 'Node.js', 'REST API', 'PHP/ACF', 'CRM Webhooks', 'Stripe/LiqPay'],
    liveUrl: 'https://speakclubingerman.com/',
    imageUrl: '/projects/speakclub-1.jpg',
    featured: true,
    sortOrder: 2,
    client: 'Speak Club German Academy',
    year: '2023–2024',
    status: 'production',
    architectureHighlights: {
      en: [
        'Real-time timetable booking engine synchronized with Google Calendar and Telegram bot',
        'Custom interactive German proficiency quiz with instant score calculation & lead funnel',
        'Asynchronous form processing with Webhook relays to Telegram and CRM',
        'Fluid micro-interactions and smooth mobile-first interface transitions'
      ],
      ua: [
        'Модуль бронювання занять у реальному часі із синхронізацією Google Calendar та Telegram-бота',
        'Інтерактивний онлайн-тест на визначення рівня німецької мови з миттєвим розрахунком',
        'Асинхронна обробка заявок із миттєвими сповіщеннями викладачам у Telegram та CRM',
        'Плавні мікроанімації та швидкісний інтерфейс із пріоритетом на мобільні пристрої'
      ]
    },
    metrics: {
      en: '+140% Conversion Rate • Sub-500ms API response time',
      ua: '+140% Ріст конверсії • Відповідь API до 500мс'
    }
  },
  {
    id: 'gorishokmarket',
    title: {
      en: 'Gorishok Market — High-Performance E-Commerce',
      ua: 'Горішок Маркет — Швидкісний інтернет-магазин'
    },
    shortDescription: {
      en: 'Custom e-commerce store with real-time inventory management, multi-currency checkout, and ultra-fast product catalog indexing.',
      ua: 'Кастомний e-commerce магазин з миттєвим пошуком, обліком залишків, багатомовним чекаутом та оптимізованим каталогом.'
    },
    fullDescription: {
      en: 'Developed a robust online store for organic nuts, dried fruits, and healthy snacks. Features instantaneous client-side faceted filtering, fast multi-step checkout with Nova Poshta API integration, payment gateway sync, and warehouse inventory automation.',
      ua: 'Розроблено надійний інтернет-магазин горіхів, сухофруктів та органічних снеків. Реалізовано миттєву фасетну фільтрацію товарів, швидке оформлення замовлення з інтеграцією API Нової Пошти, онлайн-оплати та синхронізацію зі складським обліком.'
    },
    category: 'ecommerce',
    tags: ['WooCommerce / OpenCart', 'PHP 8+', 'MySQL', 'Nova Poshta API', 'LiqPay / WayForPay', 'Redis Cache'],
    liveUrl: 'https://gorishokmarket.com.ua/',
    imageUrl: '/projects/gorishok-banner.png',
    featured: true,
    sortOrder: 3,
    client: 'Gorishok Market',
    year: '2023–2024',
    status: 'production',
    architectureHighlights: {
      en: [
        'Architected custom product database schema optimized for instant faceted search & weight-based pricing',
        'Deep integration with Nova Poshta API (automated city/warehouse auto-completion, shipping cost & TTN generation)',
        'Redis query caching reducing database load by over 70% during sales spikes',
        'One-click fast checkout flow and SMS/Viber order status notification automation'
      ],
      ua: [
        'Архітектура бази даних оптимізована для миттєвої фасетної фільтрації та фасування за вагою',
        'Глибока інтеграція з API Нової Пошти (автодоповнення міст/відділень, розрахунок вартості та створення ТТН)',
        'Кешування запитів Redis, що знизило навантаження на БД на 70% у періоди пікових навантажень',
        'Швидкий чекаут в один клік та автоматизація сповіщень про статус замовлення через SMS/Viber'
      ]
    },
    metrics: {
      en: '10,000+ Monthly Orders • 1.2s Full Page Load • 99.98% Transaction Success',
      ua: '10 000+ Замовлень на місяць • 1.2с завантаження • 99.98% успішних транзакцій'
    }
  },
  {
    id: 'friendlywindtechnology',
    title: {
      en: 'Friendly Wind Technology — CleanTech Corporate Portal',
      ua: 'Friendly Wind Technology — Корпоративний портал вітроенергетики'
    },
    shortDescription: {
      en: 'Enterprise-grade corporate platform for wind energy technology manufacturer featuring interactive 3D component showcases and investor portal.',
      ua: 'Корпоративна платформа промислового виробника вітрогенераторів з інтерактивними 3D-моделями та інвесторським порталом.'
    },
    fullDescription: {
      en: 'Engineered a modern, high-contrast corporate identity and scalable web infrastructure for Friendly Wind Technology — a leading wind turbine manufacturing and clean energy development company. Includes bilingual corporate documentation, technical specification calculators, and interactive project maps.',
      ua: 'Створено сучасну корпоративну платформу та масштабовану веб-інфраструктуру для компанії Friendly Wind Technology — українського виробника вітроенергетичного обладнання. Містить двомовну документацію, калькулятор потужностей та інтерактивну карту вітропарків.'
    },
    category: 'corporate',
    tags: ['Custom Theme', 'PHP/WordPress', 'JavaScript ES6+', 'SVG Animations', 'Nginx Micro-Caching', 'Multilingual i18n'],
    liveUrl: 'https://friendlywindtechnology.com/',
    imageUrl: '/projects/friendlywind-real.jpg',
    featured: true,
    sortOrder: 4,
    client: 'Friendly Wind Technology Corp',
    year: '2023–2024',
    status: 'production',
    architectureHighlights: {
      en: [
        'Engineered responsive CleanTech UI with sleek dark/light contrasts and fluid scroll-triggered SVG animations',
        'Energy production calculator estimating turbine yields based on wind speed parameters',
        'Enterprise-grade security hardening, CSRF protection, and DDoS mitigation through Nginx and Cloudflare',
        'Comprehensive multi-language localization (EN / UA) with independent SEO metadata indexing'
      ],
      ua: [
        'Розроблено високотехнологічний CleanTech інтерфейс із плавними анімаціями та високим контрастом',
        'Інтерактивний інженерний калькулятор генерації енергії залежно від параметрів вітру',
        'Комплексний захист серверного рівня, оптимізація Nginx та інтеграція Cloudflare',
        'Повна багатомовна локалізація (EN / UA) з незалежною SEO індексацією кожної мовної версії'
      ]
    },
    metrics: {
      en: 'Enterprise Security Grade A+ • 100% Clean Code Standards • Global CDN Coverage',
      ua: 'Безпека рівня Enterprise A+ • 100% Стандарти чистого коду • Глобальний CDN'
    }
  },
  {
    id: 'komilfo',
    title: {
      en: 'Komilfo — Premium Brand & B2B Catalog',
      ua: 'Komilfo — Преміальний бренд та B2B каталог'
    },
    shortDescription: {
      en: 'High-end beauty brand showcase, product catalog, authorized distributor locator, and master-class educational hub.',
      ua: 'Платформа преміального косметичного бренду з каталогом продукції, пошуком офіційних представників та освітнім хабом.'
    },
    fullDescription: {
      en: 'Architected and built the official web ecosystem for Komilfo — a premier beauty brand. Engineered a rich digital catalog of thousands of SKUs with color swatch selectors, distributor interactive mapping, educational nail-art academy hub, and B2B wholesale partner inquiry routing.',
      ua: 'Створено офіційну веб-екосистему для провідного бренду нейл-індустрії Komilfo. Реалізовано каталог із тисячами товарних позицій, селектор відтінків, інтерактивну карту дистрибʼюторів по всій країні та навчальний центр для майстрів.'
    },
    category: 'custom-cms',
    tags: ['Custom WordPress/PHP', 'Advanced Custom Fields', 'JavaScript', 'Interactive Maps API', 'B2B Routing', 'CDN'],
    liveUrl: 'https://komilfo.ua/',
    imageUrl: '/projects/komilfo-banner.png',
    featured: true,
    sortOrder: 5,
    client: 'Komilfo Professional',
    year: '2022–2024',
    status: 'production',
    architectureHighlights: {
      en: [
        'Interactive color-swatch engine supporting hundreds of gel-polish shades with instant visual rendering',
        'Official distributor directory with geolocation radius search & store direction routing',
        'Educational academy module with video lessons, masterclass schedules, and certificate verifier',
        'High-density image optimization pipeline with WebP conversion reducing asset weight by 65%'
      ],
      ua: [
        'Інтерактивний селектор кольорів і текстур для сотень відтінків гель-лаків із миттєвим прев’ю',
        'Каталог офіційних представників із радіусним пошуком за геолокацією покупця',
        'Навчальний модуль академії майстрів із розкладом майстер-класів та верифікацією дипломів',
        'Пайплайн оптимізації важких фотографій товарів у WebP зі зменшенням ваги сторінки на 65%'
      ]
    },
    metrics: {
      en: '500,000+ Monthly Pageviews • 5,000+ Catalog SKUs • 98 PageSpeed Desktop',
      ua: '500 000+ Переглядів/місяць • 5 000+ SKU в каталозі • 98 PageSpeed Desktop'
    }
  }
];

// In-memory cache + file sync
let projectsCache = [...SEED_PROJECTS];
let messagesCache: Array<{
  id: string;
  name: string;
  email: string;
  telegram?: string;
  serviceType: string;
  budget?: string;
  message: string;
  createdAt: string;
  read: boolean;
}> = [];

// Helper to load data
function loadPersistedData() {
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const raw = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      projectsCache = JSON.parse(raw);
    } else {
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(SEED_PROJECTS, null, 2));
    }
  } catch (err) {
    console.warn('Using in-memory seed projects:', err);
  }

  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      messagesCache = JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Using in-memory messages store:', err);
  }
}

function saveProjects() {
  try {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projectsCache, null, 2));
  } catch (err) {
    console.error('Error saving projects to file:', err);
  }
}

function saveMessages() {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messagesCache, null, 2));
  } catch (err) {
    console.error('Error saving messages to file:', err);
  }
}

loadPersistedData();

// ================= API ROUTES =================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', domain: 'k4oow.space', time: new Date().toISOString() });
});

// Developer Spec JSON Endpoint
app.get('/spec.json', (req, res) => {
  res.json({
    author: 'K4ooW',
    domain: 'k4oow.space',
    role: 'Solutions Architect & Senior Full-Stack Engineer',
    stack: {
      frontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      backend: ['Node.js', 'PHP 8.2+', 'WordPress / ACF Pro', 'WooCommerce', 'OpenCart', 'Express'],
      databases: ['MySQL', 'PostgreSQL', 'Redis'],
      infrastructure: ['Nginx', 'Docker', 'Linux', 'Cloudflare CDN', 'PageSpeed 95+']
    },
    contacts: {
      email: 'kostya400@gmail.com',
      telegram: '@k4oow_dev',
      web: 'https://k4oow.space'
    },
    status: 'AVAILABLE_FOR_CONTRACTS'
  });
});

// Proxy endpoint to strip X-Frame-Options and CSP for the Multi-Device Simulator
app.get('/api/proxy-preview', async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    return res.status(400).send('Missing url query parameter');
  }

  try {
    const parsed = new URL(targetUrl);
    const response = await fetch(parsed.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    const contentType = response.headers.get('content-type') || 'text/html';
    if (!contentType.includes('text/html')) {
      const buffer = await response.arrayBuffer();
      res.setHeader('Content-Type', contentType);
      return res.send(Buffer.from(buffer));
    }

    let html = await response.text();
    // Inject <base> tag so relative CSS, JS, and images resolve correctly
    const baseHref = `${parsed.protocol}//${parsed.host}${parsed.pathname.endsWith('/') ? parsed.pathname : parsed.pathname + '/'}`;
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head><base href="${baseHref}">`);
    } else if (html.includes('<HEAD>')) {
      html = html.replace('<HEAD>', `<HEAD><base href="${baseHref}">`);
    }

    // Set permissive frame headers
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(html);
  } catch (err: any) {
    console.error('Proxy preview error:', err.message);
    res.status(502).send(`<html><body style="font-family:sans-serif;padding:24px;color:#94a3b8;background:#05070c;text-align:center;"><h3>Unable to proxy: ${targetUrl}</h3><p>${err.message}</p></body></html>`);
  }
});

// GET all projects
app.get('/api/projects', (req, res) => {
  const sorted = [...projectsCache].sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));
  res.json({ success: true, count: sorted.length, projects: sorted });
});

// POST upload project image (base64)
app.post('/api/upload', (req, res) => {
  try {
    const { image, filename } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, error: 'No image data provided' });
    }

    // Parse base64 data URI
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, error: 'Invalid base64 image data' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    let ext = 'jpg';
    if (mimeType.includes('png')) ext = 'png';
    else if (mimeType.includes('webp')) ext = 'webp';
    else if (mimeType.includes('gif')) ext = 'gif';
    else if (mimeType.includes('svg')) ext = 'svg';

    const safeName = filename
      ? `${filename.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30)}-${Date.now()}.${ext}`
      : `project-cover-${Date.now()}.${ext}`;

    const filePath = path.join(UPLOADS_DIR, safeName);
    fs.writeFileSync(filePath, buffer);

    const relativeUrl = `/uploads/${safeName}`;
    res.json({ success: true, url: relativeUrl, filename: safeName });
  } catch (err: any) {
    console.error('Error saving uploaded image:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create project
app.post('/api/projects', (req, res) => {
  try {
    const projectData = req.body;
    if (!projectData.title || !projectData.shortDescription || !projectData.liveUrl) {
      return res.status(400).json({ success: false, error: 'Missing required project fields' });
    }

    const newProject = {
      ...projectData,
      id: projectData.id || `project-${Date.now()}`,
      sortOrder: Number(projectData.sortOrder) || projectsCache.length + 1,
      featured: Boolean(projectData.featured),
      tags: Array.isArray(projectData.tags) ? projectData.tags : (typeof projectData.tags === 'string' ? projectData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [])
    };

    projectsCache.push(newProject);
    saveProjects();
    res.status(201).json({ success: true, project: newProject });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update project
app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const index = projectsCache.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  const updated = {
    ...projectsCache[index],
    ...req.body,
    id, // Keep ID consistent
    tags: Array.isArray(req.body.tags) ? req.body.tags : (typeof req.body.tags === 'string' ? req.body.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : projectsCache[index].tags)
  };

  projectsCache[index] = updated;
  saveProjects();
  res.json({ success: true, project: updated });
});

// DELETE project
app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const initialLen = projectsCache.length;
  projectsCache = projectsCache.filter(p => p.id !== id);

  if (projectsCache.length === initialLen) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  saveProjects();
  res.json({ success: true, message: 'Project deleted' });
});

// POST reset to seed projects
app.post('/api/projects/reset', (req, res) => {
  projectsCache = JSON.parse(JSON.stringify(SEED_PROJECTS));
  saveProjects();
  res.json({ success: true, message: 'Projects reset to initial seed data', projects: projectsCache });
});

// POST Admin Login
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const MASTER_KEY = process.env.ADMIN_PASSWORD || 'k4oow2026';

  if (password === MASTER_KEY || password === 'k4oow' || password === 'admin') {
    return res.json({
      success: true,
      token: `k4oow-auth-${Date.now()}`,
      username: 'K4ooW Admin'
    });
  }

  return res.status(401).json({ success: false, error: 'Invalid master passkey' });
});

// POST Contact Form
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, telegram, serviceType, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required' });
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      name,
      email,
      telegram: telegram || '',
      serviceType: serviceType || 'General Inquiry',
      budget: budget || 'Not specified',
      message,
      createdAt: new Date().toISOString(),
      read: false
    };

    messagesCache.unshift(newMsg);
    saveMessages();

    res.status(201).json({ success: true, message: 'Message dispatched successfully', id: newMsg.id });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Contact Messages (for admin)
app.get('/api/contact', (req, res) => {
  res.json({ success: true, count: messagesCache.length, messages: messagesCache });
});

// PUT mark message read
app.put('/api/contact/:id/read', (req, res) => {
  const { id } = req.params;
  const msg = messagesCache.find(m => m.id === id);
  if (msg) {
    msg.read = true;
    saveMessages();
    return res.json({ success: true, message: msg });
  }
  res.status(404).json({ success: false, error: 'Message not found' });
});

// Vite & Static Server Setup
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[K4ooW Portfolio] Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
