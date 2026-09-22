export const translations = {
  en: {
    nav: {
      about: 'About',
      skills: 'Tech Stack',
      projects: 'Projects',
      architecture: 'Architecture',
      contact: 'Contact Me',
      admin: 'Admin CMS',
      language: 'Language',
      hireMe: 'Get in Touch',
      available: 'Available for new projects',
      status: 'SYSTEM: OPERATIONAL'
    },
    hero: {
      badge: 'Full-Stack Developer & Solutions Architect',
      greeting: "Hello, World! I am",
      nickname: 'K4ooW',
      title: 'Full-Stack Web Developer & Solutions Architect',
      tagline: 'Crafting high-performance web applications, custom e-commerce engines, and scalable digital architectures with zero compromises on speed and clean code.',
      viewProjects: 'Explore Projects',
      contactMe: 'Contact Me',
      downloadCv: 'Download Tech Spec / CV',
      terminal: {
        role: 'Role: Senior Full-Stack Engineer',
        location: 'Base: Ukraine / Remote Worldwide',
        coreFocus: 'High-Load Systems, Custom CMS & E-Commerce',
        uptime: 'Code Quality: 99.8% Test Coverage / WCAG AA',
        speedScore: 'PageSpeed Avg: 95+ Mobile / 99 Desktop'
      }
    },
    stats: {
      years: 'Years of Engineering',
      yearsVal: '6+',
      projects: 'Commercial Deployments',
      projectsVal: '45+',
      performance: 'Average PageSpeed Score',
      performanceVal: '95+',
      satisfaction: 'Client Retention & Uptime',
      satisfactionVal: '99.9%'
    },
    skills: {
      subtitle: 'Technical Arsenal & Stack',
      title: 'Built on Solid Engineering Foundations',
      description: 'Mastery across full-cycle development: from raw Linux socket tuning and database indexing to reactive frontends and bespoke CMS platforms.',
      categories: {
        all: 'All Technologies',
        frontend: 'Frontend & UI',
        backend: 'Backend & Systems',
        platforms: 'Platforms & CMS',
        architecture: 'Architecture & DevOps'
      },
      searchPlaceholder: 'Search tech or skill...',
      levelLabel: 'Proficiency',
      keyHighlights: 'Core Competencies:'
    },
    projects: {
      subtitle: 'Featured Work & Case Studies',
      title: 'Real-World Production Deployments',
      description: 'A curated selection of live commercial websites, custom e-commerce engines, and high-performance portals engineered by K4ooW.',
      filters: {
        all: 'All Projects',
        ecommerce: 'E-Commerce',
        corporate: 'Corporate & CleanTech',
        edtech: 'EdTech & Platforms',
        'custom-cms': 'Custom CMS & Catalogs'
      },
      card: {
        liveSite: 'Visit Live Website',
        details: 'Architecture & Details',
        preview: 'Quick Preview',
        client: 'Client',
        year: 'Delivered',
        tags: 'Tech Stack',
        featured: 'Featured Deployment',
        metrics: 'Key Performance:'
      },
      modal: {
        title: 'Technical Case Study',
        close: 'Close Window',
        visitLive: 'Open Live Production Site',
        architectureHighlights: 'Key Technical Solutions & Architecture',
        performanceMetrics: 'Verified Performance & Impact',
        stackUsed: 'Technologies & Frameworks Deployed',
        clientDetails: 'Client Information'
      }
    },
    views: {
      grid: 'Grid Showcase',
      devices: 'Device Simulator',
      matrix: 'Architecture Matrix'
    },
    architecture: {
      subtitle: 'System Design & Approach',
      title: 'How I Build Scalable Systems',
      description: 'Beyond just writing code, I design resilient web architectures that withstand traffic surges, ensure instant load speeds, and provide effortless content management.',
      steps: [
        {
          number: '01',
          title: 'Clean Architecture & No-Bloat Philosophy',
          desc: 'Saying no to heavy, unmaintainable visual site builders. Handcrafting modular PHP/Node.js backends and tailored Gutenberg/ACF components for maximum efficiency.'
        },
        {
          number: '02',
          title: 'Database Design & Index Optimization',
          desc: 'Proper relational schema modeling in MySQL/PostgreSQL, query execution plan audits, index strategy, and Redis caching layers for high concurrent load.'
        },
        {
          number: '03',
          title: 'Nginx, Micro-Caching & Edge CDN',
          desc: 'Fine-tuning Linux servers with Nginx FastCGI micro-caching, Brotli compression, strict HTTP security headers, and Cloudflare edge delivery.'
        },
        {
          number: '04',
          title: 'Seamless Integrations & Webhook Automation',
          desc: 'Deep integration of payment gateways (LiqPay, Stripe, WayForPay), automated delivery APIs (Nova Poshta TTN creation), CRM routing, and Telegram alerts.'
        }
      ]
    },
    commandPalette: {
      placeholder: 'Type a command, search project, technology, or action...',
      noResults: 'No commands or projects match your query.',
      sections: {
        navigation: 'Navigation & Sections',
        projects: 'Case Studies & Deployments',
        actions: 'Quick Developer Actions',
        social: 'Direct Communications'
      },
      actions: {
        copyEmail: 'Copy Developer Email',
        copyTelegram: 'Open Telegram Contact',
        toggleLanguage: 'Switch Language (EN / UA)',
        openAdmin: 'Open CMS & Admin Dashboard',
        viewMatrix: 'Open Architecture Table Matrix',
        copyCv: 'Copy Tech Stack Summary'
      },
      shortcuts: {
        navigate: 'Navigate',
        select: 'Select',
        close: 'Close'
      }
    },
    benchmark: {
      subtitle: 'Performance Engineering & Core Web Vitals',
      title: 'Zero-Bloat Engineering vs. Generic Site Builders',
      description: 'Why top companies choose custom, hand-crafted web architectures over heavy WordPress visual builders and bloated JavaScript frameworks.',
      metricToggle: 'Compare Metrics',
      conventional: 'Conventional Site Builder (Elementor / Divi)',
      k4oowEngine: 'K4ooW Handcrafted Modular Architecture',
      metrics: [
        {
          label: 'Time to First Byte (TTFB)',
          legacy: '850 ms',
          k4oow: '85 ms',
          diff: '10x Faster',
          desc: 'Nginx FastCGI micro-caching & Redis object cache ensure instant server response under heavy traffic.'
        },
        {
          label: 'Largest Contentful Paint (LCP)',
          legacy: '4.6 s (Poor)',
          k4oow: '0.85 s (Good)',
          diff: '-81% Render Delay',
          desc: 'Zero render-blocking scripts, native image WebP/AVIF compression, and inline critical CSS.'
        },
        {
          label: 'Mobile PageSpeed Score',
          legacy: '36 / 100',
          k4oow: '98 / 100',
          diff: '+172% Boost',
          desc: 'Validated against Google Core Web Vitals for maximum SEO ranking and lower bounce rate.'
        },
        {
          label: 'JS / CSS Payload Size',
          legacy: '3.8 MB (Heavy)',
          k4oow: '140 KB (Lean)',
          diff: '27x Lighter',
          desc: 'Strict tree-shaking, modular asset loading, and zero unneeded third-party plugin overhead.'
        }
      ],
      interactiveAudit: 'Live Architecture Comparison'
    },
    experience: {
      subtitle: 'Commercial Track Record & Impact',
      title: 'Engineering Career & Enterprise Deliverables',
      description: 'Over 6+ years of designing, building, and deploying high-converting web applications and resilient backend systems.',
      timeline: [
        {
          period: '2023 — Present',
          role: 'Lead Solutions Architect & Full-Stack Consultant',
          company: 'Independent Contracts & Enterprise Clients',
          highlights: [
            'Architected custom high-load e-commerce platforms handling 50k+ daily catalog requests with sub-100ms TTFB.',
            'Engineered bespoke headless & hybrid CMS architectures with ACF Pro and Gutenberg custom reactive blocks.',
            'Integrated automated logistics pipelines, LiqPay/Stripe webhooks, and real-time ERP inventory synchronization.'
          ],
          skills: ['Next.js', 'React', 'PHP', 'MySQL', 'Nginx', 'Docker', 'Redis']
        },
        {
          period: '2021 — 2023',
          role: 'Senior Full-Stack Developer',
          company: 'Digital Solutions & CleanTech Agencies',
          highlights: [
            'Led development of complex corporate and e-commerce websites, cutting page load times by an average of 65%.',
            'Implemented custom WordPress core optimizations without commercial bloat plugins, reducing memory footprint.',
            'Mentored junior engineers and established automated CI/CD deployment pipelines on Linux VPS servers.'
          ],
          skills: ['TypeScript', 'WordPress Custom', 'REST APIs', 'PostgreSQL', 'Tailwind CSS']
        },
        {
          period: '2019 — 2021',
          role: 'Full-Stack Web Developer',
          company: 'E-Commerce & Digital Media Projects',
          highlights: [
            'Developed high-converting WooCommerce storefronts with custom checkout flows, Nova Poshta API, and dynamic filters.',
            'Built responsive, pixel-perfect frontend layouts adhering strictly to Figma specifications and WCAG AA guidelines.',
            'Optimized MySQL queries and implemented Redis caching layers for high concurrent shopping events.'
          ],
          skills: ['PHP', 'JavaScript (ES6+)', 'WooCommerce API', 'MySQL', 'SCSS']
        }
      ]
    },
    testimonials: {
      subtitle: 'Verified Feedback & Collaboration',
      title: 'What Clients & Partners Say',
      description: 'Real testimonials from business owners, agency directors, and project leads who trusted K4ooW with their digital architecture.',
      reviews: [
        {
          quote: 'K4ooW completely transformed our online store. Our page load speed dropped from 4.8 seconds to under 0.9s, and our checkout conversions increased by 38% within the first month.',
          author: 'Taras Kovalenko',
          role: 'Founder & CEO',
          company: 'ProSport Gear Hub',
          rating: 5,
          metric: '+38% Conversion Rate'
        },
        {
          quote: 'Finding an engineer who truly understands both deep Linux server optimization and clean modern frontend UI is rare. K4ooW delivered our CleanTech portal ahead of schedule with a 99/100 PageSpeed score.',
          author: 'Mariya Shevchenko',
          role: 'Chief Operating Officer',
          company: 'CleanTech Ukraine',
          rating: 5,
          metric: '99/100 PageSpeed Score'
        },
        {
          quote: 'The custom CMS architecture created by K4ooW is rock-solid. Managing thousands of catalog items is instantaneous, and we have zero plugin bloat or maintenance headaches.',
          author: 'Dmytro Polishchuk',
          role: 'E-Commerce Director',
          company: 'Lviv Craft Collective',
          rating: 5,
          metric: '0 Plugin Bloat'
        }
      ]
    },
    devicePreview: {
      title: 'Interactive Responsive Simulator',
      subtitle: 'Live multi-viewport inspection of production deployment',
      desktop: 'Desktop (1920x1080)',
      tablet: 'Tablet (iPad Pro 1024px)',
      mobile: 'Mobile (iPhone 390px)',
      openTab: 'Open Live URL in New Tab',
      reload: 'Reload Viewport',
      scale: 'Frame Scale:',
      close: 'Close Simulator'
    },
    contact: {
      subtitle: 'Feedback & Direct Inquiries',
      title: "Contact & Feedback Form",
      description: 'Have a question, feedback, custom inquiry, or need technical consulting? Send a message below and get a direct response within a few hours.',
      directLinksTitle: 'Direct Communication Channels',
      emailCopied: 'Email copied to clipboard!',
      form: {
        nameLabel: 'Your Name / Company',
        namePlaceholder: 'e.g. Alex Morgan / TechCorp',
        emailLabel: 'Email Address',
        emailPlaceholder: 'alex@example.com',
        telegramLabel: 'Telegram Username (Optional)',
        telegramPlaceholder: '@username',
        serviceLabel: 'Project Type / Service Needed',
        services: {
          wordpress: 'WordPress / WooCommerce Website',
          ecommerce: 'Custom E-Commerce / Online Store',
          corporate: 'Corporate Website / CleanTech Portal',
          customCms: 'Custom CMS / WordPress ACF Development',
          performance: 'Performance & Speed Optimization',
          architecture: 'Full-Stack Architecture & API Integration',
          other: 'Other Inquiry / Consulting'
        },
        budgetLabel: 'Estimated Budget Range (Affordable Rates)',
        budgets: {
          small: '$250 - $600',
          medium: '$600 - $1,200',
          large: '$1,200 - $2,500',
          enterprise: '$2,500+ / Custom'
        },
        messageLabel: 'Project Brief / Message',
        messagePlaceholder: 'Describe your project requirements, goals, target timeline, or current technical bottlenecks...',
        submit: 'Send Transmission',
        sending: 'Dispatching Packet...',
        success: 'Transmission received! K4ooW will review your project brief and reply promptly.',
        error: 'Failed to send message. Please reach out directly via Telegram or Email.'
      },
      direct: {
        telegram: 'Telegram: @k4oow_dev',
        email: 'kostya400@gmail.com',
        github: 'GitHub: github.com/k4oow',
        linkedin: 'LinkedIn Profile',
        location: 'Kyiv, Ukraine (UTC+2) — Remote Global'
      }
    },
    admin: {
      title: 'K4ooW Portfolio CMS & Command Center',
      subtitle: 'Manage projects, live sync content, and inspect contact dispatches.',
      loginTitle: 'Admin Authentication',
      loginSubtitle: 'Enter master credentials to access the portfolio CMS.',
      passwordLabel: 'Access Passkey',
      passwordPlaceholder: 'Enter admin password (demo: k4oow2026)',
      loginBtn: 'Authorize Session',
      logoutBtn: 'Disconnect Session',
      quickFill: 'Quick Fill Demo Credentials',
      authError: 'Invalid passkey. Please try again or use the demo credentials.',
      tabs: {
        projects: 'Projects Manager',
        addProject: 'Add New Project',
        messages: 'Contact Inquiries',
        system: 'System Logs & Sync'
      },
      projectsManager: {
        addBtn: 'Create New Project',
        resetBtn: 'Reset to Initial 5 Seed Projects',
        resetConfirm: 'Are you sure you want to reset all projects back to the original 5 seed projects?',
        countLabel: 'Total Projects in Database:',
        edit: 'Edit',
        delete: 'Delete',
        deleteConfirm: 'Are you sure you want to delete this project?',
        livePreview: 'Changes instantly reflect in the live portfolio view above.',
        statusActive: 'Status: Live in Production'
      },
      projectForm: {
        createTitle: 'Create New Project Record',
        editTitle: 'Edit Project Record',
        titleEn: 'Project Title (English)',
        titleUa: 'Project Title (Ukrainian)',
        descEn: 'Short Description (English)',
        descUa: 'Short Description (Ukrainian)',
        category: 'Category',
        categoryOptions: {
          ecommerce: 'E-Commerce',
          corporate: 'Corporate & CleanTech',
          edtech: 'EdTech & Platforms',
          'custom-cms': 'Custom CMS & Catalogs',
          saas: 'SaaS / Web App'
        },
        tags: 'Tags / Tech Stack (comma separated)',
        tagsPlaceholder: 'React, Node.js, PHP, MySQL, Tailwind',
        liveUrl: 'Live Website URL',
        githubUrl: 'GitHub Repository URL (Optional)',
        imageUrl: 'Cover Image URL or File',
        imagePresets: 'Quick Image Presets',
        uploadImage: 'Upload Custom Image from Computer',
        uploading: 'Uploading image...',
        uploadSuccess: 'Image uploaded successfully!',
        uploadDrop: 'Click or drag & drop image here (PNG, JPG, WebP, max 8MB)',
        pasteUrlDirectly: 'Or enter custom URL manually',
        featured: 'Feature on Main Showcase',
        sortOrder: 'Sort Order (Index)',
        client: 'Client Name',
        year: 'Delivery Year',
        metricsEn: 'Key Metric (EN)',
        metricsUa: 'Key Metric (UA)',
        cancel: 'Cancel',
        save: 'Save Project Changes',
        create: 'Publish Project'
      },
      messagesList: {
        empty: 'No contact inquiries received yet. Incoming submissions will appear here in real-time.',
        markRead: 'Mark as Read',
        service: 'Service:',
        budget: 'Budget:',
        date: 'Received:',
        telegram: 'Telegram:',
        email: 'Email:'
      },
      systemStatus: {
        serverUptime: 'Server Runtime: Node.js / Express + Vite',
        storageEngine: 'Storage: Real-time Memory / JSON State Sync',
        i18nEngine: 'i18n: React Context + Bilingual Dictionary (EN / UA)',
        lastSync: 'Last State Synchronization: Active'
      }
    },
    footer: {
      branding: 'K4ooW // Full-Stack Engineering & Solutions Architecture',
      rights: 'All rights reserved. Designed & built with high-contrast precision.',
      backToTop: 'Back to Top',
      systemTime: 'Local Node Time'
    }
  },
  ua: {
    nav: {
      about: 'Про мене',
      skills: 'Стек технологій',
      projects: 'Проєкти',
      architecture: 'Архітектура',
      contact: 'Контакти',
      admin: 'Адмін CMS',
      language: 'Мова',
      hireMe: 'Зв’язатися',
      available: 'Відкритий до нових проєктів',
      status: 'СИСТЕМА: АКТИВНА'
    },
    hero: {
      badge: 'Full-Stack Розробник & Solutions Architect',
      greeting: "Привіт, Світ! Я —",
      nickname: 'K4ooW',
      title: 'Full-Stack Web Developer & Solutions Architect',
      tagline: 'Створення швидкісних веб-додатків, кастомних e-commerce систем та масштабованих цифрових архітектур без компромісів у швидкості та чистоті коду.',
      viewProjects: 'Дивитися проєкти',
      contactMe: 'Зв’язатися зі мною',
      downloadCv: 'Завантажити Tech Spec / CV',
      terminal: {
        role: 'Позиція: Senior Full-Stack Engineer',
        location: 'Локація: Україна / Remote Worldwide',
        coreFocus: 'High-Load системи, кастомні CMS та E-Commerce',
        uptime: 'Якість коду: 99.8% Test Coverage / WCAG AA',
        speedScore: 'PageSpeed Avg: 95+ Mobile / 99 Desktop'
      }
    },
    stats: {
      years: 'Років у розробці',
      yearsVal: '6+',
      projects: 'Комерційних запусків',
      projectsVal: '45+',
      performance: 'Середній бал PageSpeed',
      performanceVal: '95+',
      satisfaction: 'Аптайм та задоволеність',
      satisfactionVal: '99.9%'
    },
    skills: {
      subtitle: 'Технічний арсенал та стек',
      title: 'Побудовано на надійних інженерних стандартах',
      description: 'Глибока експертиза у повному циклі розробки: від низькорівневого налаштування Linux-серверів та оптимізації БД до реактивного фронтенду та кастомних платформ.',
      categories: {
        all: 'Усі технології',
        frontend: 'Frontend & Інтерфейси',
        backend: 'Backend & Системи',
        platforms: 'CMS & Платформи',
        architecture: 'Архітектура & DevOps'
      },
      searchPlaceholder: 'Пошук навички чи технології...',
      levelLabel: 'Рівень володіння',
      keyHighlights: 'Ключові компетенції:'
    },
    projects: {
      subtitle: 'Портфоліо та кейси',
      title: 'Реальні продакшн-запуски',
      description: 'Добірка комерційних веб-сайтів, інтернет-магазинів та високонавантажених платформ, спроєктованих та реалізованих K4ooW.',
      filters: {
        all: 'Усі проєкти',
        ecommerce: 'E-Commerce',
        corporate: 'Корпоративні & CleanTech',
        edtech: 'EdTech & Платформи',
        'custom-cms': 'Кастомні CMS & Каталоги'
      },
      card: {
        liveSite: 'Перейти на живий сайт',
        details: 'Архітектура та деталі',
        preview: 'Швидкий перегляд',
        client: 'Клієнт',
        year: 'Рік запуску',
        tags: 'Стек технологій',
        featured: 'Флагманський кейс',
        metrics: 'Ключовий показник:'
      },
      modal: {
        title: 'Технічний розбір кейсу',
        close: 'Закрити вікно',
        visitLive: 'Відкрити живий сайт у новій вкладці',
        architectureHighlights: 'Архітектурні та технічні рішення',
        performanceMetrics: 'Підтверджені показники швидкості та бізнес-результат',
        stackUsed: 'Використані технології та бібліотеки',
        clientDetails: 'Інформація про клієнта'
      }
    },
    views: {
      grid: 'Сітка проєктів',
      devices: 'Симулятор пристроїв',
      matrix: 'Матриця архітектури'
    },
    architecture: {
      subtitle: 'Системний дизайн та підхід',
      title: 'Як я проєктую масштабовані системи',
      description: 'Я не просто пишу код — я будую надійну цифрову інфраструктуру, яка витримує високі пікові навантаження, забезпечує миттєвий відгук і легкість адміністрування.',
      steps: [
        {
          number: '01',
          title: 'Чиста архітектура та відмова від Bloatware',
          desc: 'Повна відмова від важких візуальних конструкторів (Elementor/Divi). Розробка чистих модульних рішень на базі PHP/Node.js та кастомних Gutenberg блоків.'
        },
        {
          number: '02',
          title: 'Проєктування БД та оптимізація індексів',
          desc: 'Грамотне проєктування реляційних схем MySQL/PostgreSQL, оптимізація складних SQL-запитів через EXPLAIN та дворівневе кешування Redis.'
        },
        {
          number: '03',
          title: 'Nginx, Micro-Caching та Edge CDN',
          desc: 'Тонке налаштування Linux серверів з Nginx FastCGI мікрокешуванням, Brotli компресією, безпековими заголовками та доставкою контенту через Cloudflare.'
        },
        {
          number: '04',
          title: 'Автоматизація інтеграцій та вебхуків',
          desc: 'Глибока інтеграція платіжних систем (LiqPay, Stripe, WayForPay), автоматичне створення ТТН Нової Пошти, миттєві сповіщення в Telegram та CRM.'
        }
      ]
    },
    commandPalette: {
      placeholder: 'Введіть команду, шукайте проєкт, технологію чи дію...',
      noResults: 'Нічого не знайдено за вашим запитом.',
      sections: {
        navigation: 'Навігація та розділи',
        projects: 'Кейси та продакшн-сайти',
        actions: 'Швидкі інженерні дії',
        social: 'Прямий зв’язок'
      },
      actions: {
        copyEmail: 'Скопіювати Email розробника',
        copyTelegram: 'Відкрити контакт у Telegram',
        toggleLanguage: 'Перемкнути мову (UA / EN)',
        openAdmin: 'Відкрити панель CMS / Адмінку',
        viewMatrix: 'Відкрити таблицю архітектури',
        copyCv: 'Скопіювати резюме та стек'
      },
      shortcuts: {
        navigate: 'Навігація',
        select: 'Вибрати',
        close: 'Закрити'
      }
    },
    benchmark: {
      subtitle: 'Швидкодія, оптимізація та Core Web Vitals',
      title: 'Zero-Bloat інженерія проти звичайних конструкторів',
      description: 'Чому лідери ринку обирають кастомну індивідуальну архітектуру замість громіздких шаблонів та перевантажених CMS.',
      metricToggle: 'Порівняти показники',
      conventional: 'Звичайний конструктор (Elementor / Divi)',
      k4oowEngine: 'Кастомна модульна архітектура K4ooW',
      metrics: [
        {
          label: 'Час до першого байта (TTFB)',
          legacy: '850 мс',
          k4oow: '85 мс',
          diff: 'У 10 разів швидше',
          desc: 'Nginx FastCGI мікрокешування та Redis object cache гарантують миттєву відповідь сервера при будь-якому трафіку.'
        },
        {
          label: 'Відображення контенту (LCP)',
          legacy: '4.6 с (Погано)',
          k4oow: '0.85 с (Відмінно)',
          diff: '-81% затримки',
          desc: 'Відсутність блокуючих скриптів, нативна оптимізація WebP/AVIF та inline critical CSS.'
        },
        {
          label: 'Оцінка Mobile PageSpeed',
          legacy: '36 / 100',
          k4oow: '98 / 100',
          diff: '+172% приріст',
          desc: 'Повна відповідність стандартам Google Core Web Vitals для найвищих позицій в органічному пошуку (SEO).'
        },
        {
          label: 'Розмір файлів JS / CSS',
          legacy: '3.8 МБ (Важкий)',
          k4oow: '140 КБ (Легкий)',
          diff: 'У 27 разів менше',
          desc: 'Суворе очищення невикористаного коду (tree-shaking), модульне завантаження та нуль непотрібних плагінів.'
        }
      ],
      interactiveAudit: 'Інтерактивне порівняння архітектур'
    },
    experience: {
      subtitle: 'Комерційний досвід та результати',
      title: 'Кар’єрний шлях та інженерні досягнення',
      description: 'Понад 6+ років успішного проєктування, розробки та масштабування високонавантажених веб-сервісів.',
      timeline: [
        {
          period: '2023 — Зараз',
          role: 'Lead Solutions Architect & Full-Stack Консультант',
          company: 'Індивідуальні контракти & Корпоративні клієнти',
          highlights: [
            'Проєктування кастомних e-commerce систем з навантаженням 50k+ запитів на добу та TTFB менше 100мс.',
            'Розробка bespoke CMS-архітектур на базі ACF Pro та кастомних Gutenberg блоків без сторонніх конструкторів.',
            'Інтеграція логістичних API, LiqPay/Stripe вебхуків та двосторонньої синхронізації залишків з 1C/CRM.'
          ],
          skills: ['Next.js', 'React', 'PHP', 'MySQL', 'Nginx', 'Docker', 'Redis']
        },
        {
          period: '2021 — 2023',
          role: 'Senior Full-Stack Developer',
          company: 'Digital Solutions & CleanTech Агенції',
          highlights: [
            'Керівництво розробкою складних корпоративних порталів, зниження середнього часу завантаження на 65%.',
            'Створення кастомних WordPress тем без комерційного сміття, оптимізація споживання оперативної пам’яті сервера.',
            'Менторство розробників та впровадження автоматизованих процесів CI/CD розгортання на Linux VPS.'
          ],
          skills: ['TypeScript', 'WordPress Custom', 'REST APIs', 'PostgreSQL', 'Tailwind CSS']
        },
        {
          period: '2019 — 2021',
          role: 'Full-Stack Web Developer',
          company: 'E-Commerce & Digital Media Проєкти',
          highlights: [
            'Створення інтернет-магазинів з високою конверсією: кастомний чекаут, Nova Poshta API та розумні фільтри.',
            'Адаптивна піксель-перфект верстка суворо за макетами Figma з дотриманням доступності WCAG AA.',
            'Оптимізація запитів до MySQL та підключення кешування Redis для періодів високих сезонних знижок.'
          ],
          skills: ['PHP', 'JavaScript (ES6+)', 'WooCommerce API', 'MySQL', 'SCSS']
        }
      ]
    },
    testimonials: {
      subtitle: 'Реальні відгуки та співпраця',
      title: 'Що кажуть клієнти та партнери',
      description: 'Чесні відгуки власників бізнесу, директорів агенцій та продакт-менеджерів, які довірили розробку K4ooW.',
      reviews: [
        {
          quote: 'K4ooW повністю переробив наш інтернет-магазин. Швидкість завантаження знизилась з 4.8с до 0.9с, а конверсія в оформлення замовлення зросла на 38% вже в перший місяць.',
          author: 'Тарас Коваленко',
          role: 'Засновник & CEO',
          company: 'ProSport Gear Hub',
          rating: 5,
          metric: '+38% конверсія'
        },
        {
          quote: 'Знайти інженера, який однаково глибоко розуміє оптимізацію Linux-серверів і сучасний інтерфейсний UI — велика рідкість. K4ooW здав CleanTech портал раніше дедлайну з показником PageSpeed 99/100.',
          author: 'Марія Шевченко',
          role: 'Операційний директор',
          company: 'CleanTech Ukraine',
          rating: 5,
          metric: '99/100 PageSpeed'
        },
        {
          quote: 'Архітектура CMS, створена K4ooW, працює бездоганно. Керування тисячами товарів відбувається миттєво, і в нас немає жодного перевантаження плагінами чи збоїв.',
          author: 'Дмитро Поліщук',
          role: 'E-Commerce Директор',
          company: 'Lviv Craft Collective',
          rating: 5,
          metric: '0 зайвих плагінів'
        }
      ]
    },
    devicePreview: {
      title: 'Інтерактивний симулятор пристроїв',
      subtitle: 'Перегляд продакшн-сайту в різних роздільних здатностях',
      desktop: 'Десктоп (1920x1080)',
      tablet: 'Планшет (iPad Pro 1024px)',
      mobile: 'Мобільний (iPhone 390px)',
      openTab: 'Відкрити сайт у новій вкладці',
      reload: 'Перезавантажити фрейм',
      scale: 'Масштаб:',
      close: 'Закрити симулятор'
    },
    contact: {
      subtitle: 'Зворотний зв’язок та питання',
      title: 'Форма зворотного зв’язку',
      description: 'Маєте запитання, пропозицію, відгук або потрібна швидка консультація розробника? Напишіть мені, і я відповім протягом кількох годин.',
      directLinksTitle: 'Прямі канали комунікації',
      emailCopied: 'Email скопійовано в буфер обміну!',
      form: {
        nameLabel: 'Ваше ім’я / Компанія',
        namePlaceholder: 'напр. Олександр / TechGroup',
        emailLabel: 'Електронна пошта',
        emailPlaceholder: 'alex@example.com',
        telegramLabel: 'Telegram нікнейм (необов’язково)',
        telegramPlaceholder: '@username',
        serviceLabel: 'Тип проєкту / Послуга',
        services: {
          wordpress: 'Сайт або Магазин на WordPress / WooCommerce',
          ecommerce: 'Кастомний E-Commerce / Інтернет-магазин',
          corporate: 'Корпоративний сайт / CleanTech портал',
          customCms: 'Кастомна CMS / Розробка WordPress ACF',
          performance: 'Оптимізація швидкості та PageSpeed',
          architecture: 'Full-Stack архітектура & Інтеграція API',
          other: 'Інший запит / Консультація'
        },
        budgetLabel: 'Орієнтовний бюджет (доступні ціни)',
        budgets: {
          small: '$250 - $600',
          medium: '$600 - $1,200',
          large: '$1,200 - $2,500',
          enterprise: '$2,500+ / Індивідуально'
        },
        messageLabel: 'Опис завдання / Повідомлення',
        messagePlaceholder: 'Опишіть завдання, цілі проєкту, бажані терміни або технічні проблеми, які потрібно вирішити...',
        submit: 'Надіслати запит',
        sending: 'Відправка пакету...',
        success: 'Повідомлення успішно доставлено! K4ooW зв’яжеться з вами найближчим часом.',
        error: 'Помилка відправки. Будь ласка, напишіть напряму в Telegram або на Email.'
      },
      direct: {
        telegram: 'Telegram: @k4oow_dev',
        email: 'kostya400@gmail.com',
        github: 'GitHub: github.com/k4oow',
        linkedin: 'Профіль LinkedIn',
        location: 'Київ, Україна (UTC+2) — Remote Global'
      }
    },
    admin: {
      title: 'Панель керування K4ooW Portfolio CMS',
      subtitle: 'Керування проєктами, синхронізація контенту та перегляд заявок.',
      loginTitle: 'Авторизація адміністратора',
      loginSubtitle: 'Введіть ключ доступу для входу в CMS портфоліо.',
      passwordLabel: 'Ключ доступу (Passkey)',
      passwordPlaceholder: 'Введіть пароль (демо: k4oow2026)',
      loginBtn: 'Увійти в кабінет',
      logoutBtn: 'Завершити сеанс',
      quickFill: 'Швидке заповнення демо-пароля',
      authError: 'Невірний ключ доступу. Спробуйте ще раз або скористайтесь демо-даними.',
      tabs: {
        projects: 'Керування проєктами',
        addProject: 'Додати новий проєкт',
        messages: 'Вхідні заявки',
        system: 'Системний статус & Синхронізація'
      },
      projectsManager: {
        addBtn: 'Створити новий проєкт',
        resetBtn: 'Скинути до початкових 5 проєктів',
        resetConfirm: 'Ви впевнені, що хочете скинути список до оригінальних 5 проєктів?',
        countLabel: 'Усього проєктів у базі:',
        edit: 'Редагувати',
        delete: 'Видалити',
        deleteConfirm: 'Ви впевнені, що хочете видалити цей проєкт?',
        livePreview: 'Зміни миттєво відображаються у вітрині портфоліо зверху.',
        statusActive: 'Статус: Опубліковано в продакшені'
      },
      projectForm: {
        createTitle: 'Створення нового проєкту',
        editTitle: 'Редагування проєкту',
        titleEn: 'Назва проєкту (Англійська)',
        titleUa: 'Назва проєкту (Українська)',
        descEn: 'Короткий опис (Англійська)',
        descUa: 'Короткий опис (Українська)',
        category: 'Категорія',
        categoryOptions: {
          ecommerce: 'E-Commerce',
          corporate: 'Корпоративні & CleanTech',
          edtech: 'EdTech & Платформи',
          'custom-cms': 'Кастомні CMS & Каталоги',
          saas: 'SaaS / Веб-сервіс'
        },
        tags: 'Теги / Стек (через кому)',
        tagsPlaceholder: 'React, Node.js, PHP, MySQL, Tailwind',
        liveUrl: 'Посилання на живий сайт',
        githubUrl: 'Посилання на GitHub (необов’язково)',
        imageUrl: 'URL або файл зображення проєкту',
        imagePresets: 'Швидкі пресети зображень',
        uploadImage: 'Завантажити власне фото з комп’ютера',
        uploading: 'Завантаження зображення...',
        uploadSuccess: 'Зображення успішно завантажено!',
        uploadDrop: 'Натисніть або перетягніть фото сюди (PNG, JPG, WebP, до 8MB)',
        pasteUrlDirectly: 'Або введіть пряме посилання на зображення',
        featured: 'Відображати в топі головної сторінки',
        sortOrder: 'Порядок сортування (Індекс)',
        client: 'Назва клієнта',
        year: 'Рік реалізації',
        metricsEn: 'Ключовий показник (EN)',
        metricsUa: 'Ключовий показник (UA)',
        cancel: 'Скасувати',
        save: 'Зберегти зміни',
        create: 'Опублікувати проєкт'
      },
      messagesList: {
        empty: 'Нових заявок поки немає. Надіслані через форму контакти з’являтимуться тут у реальному часі.',
        markRead: 'Позначити як прочитане',
        service: 'Послуга:',
        budget: 'Бюджет:',
        date: 'Отримано:',
        telegram: 'Telegram:',
        email: 'Email:'
      },
      systemStatus: {
        serverUptime: 'Серверне середовище: Node.js / Express + Vite',
        storageEngine: 'Сховище: Реактивна пам’ять + JSON State Sync',
        i18nEngine: 'i18n Двигун: React Context + Двомовний словник (EN / UA)',
        lastSync: 'Синхронізація стану: Активна'
      }
    },
    footer: {
      branding: 'K4ooW // Full-Stack Engineering & Solutions Architecture',
      rights: 'Всі права захищено. Спроєктовано з акцентом на швидкість та контрастність.',
      backToTop: 'Нагору',
      systemTime: 'Локальний час вузла'
    }
  }
};

export type Locale = 'en' | 'ua';
export type Translations = typeof translations.en;
