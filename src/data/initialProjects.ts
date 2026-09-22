import { Project } from '../types';

export const INITIAL_PROJECTS: Project[] = [
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
