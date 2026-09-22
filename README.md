# K4ooW — Full-Stack Portfolio & CMS Platform

A high-performance personal developer portfolio and integrated CMS platform engineered with React 19, TypeScript, Tailwind CSS v4, and Node.js / Express.

Designed with a modern dark cyberpunk aesthetic, sub-second interactive animations, multilingual support (EN / UA), an interactive project cost estimator, and an embedded administrative dashboard.

---

## ⚡ Key Features

- **Cyberpunk Dark Mode Interface**: Built with bespoke glowing borders, fluid glassmorphism, and hardware-accelerated spotlight cursor effects.
- **Multilingual Architecture (EN / UA)**: Complete internationalization with zero-layout-shift language toggling.
- **Interactive Project Showcase**: Filterable showcase featuring real-world production applications, architecture breakdowns, client metrics, and tech stacks.
- **Live Device Simulator**: Built-in multi-viewport device previewer (Desktop, Tablet, Mobile) with frame rotation and viewport toggles.
- **Project Cost & Timeline Estimator**: Interactive calculator that calculates estimated delivery time, architecture complexity, and budgetary estimates.
- **Performance Benchmark Dashboard**: Live metrics visualizer demonstrating PageSpeed scores, TTFB benchmarks, and infrastructure reliability.
- **Full-Stack CMS & Inquiries Engine**: Server-side storage for projects and client inquiries with protected admin management panel.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Vite 6
- **Backend**: Node.js, Express, TSX, Compression (Brotli/Gzip), ESBuild
- **Architecture**: Modular Component-Driven Architecture, RESTful API endpoints

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/k4oow-portfolio.git
cd k4oow-portfolio
npm install
```

### 2. Environment Setup

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Configurable variables:
- `PORT` — Server listening port (default: `3000`)
- `NODE_ENV` — Environment mode (`development` / `production`)
- `ADMIN_PASSWORD` — Master password for the admin panel

### 3. Development

Start the development server with Vite hot reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

Build the client assets and bundle the server:

```bash
npm run build
npm start
```

### 5. Type Checking

Run TypeScript verification without emitting files:

```bash
npm run lint
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
