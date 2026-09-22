import React, { useEffect, useState, lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectsProvider } from './context/ProjectsContext';
import { TechBackground } from './components/TechBackground';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { Footer } from './components/Footer';

// Code-split heavy interactive and below-the-fold modules
const PerformanceBenchmark = lazy(() =>
  import('./components/PerformanceBenchmark').then(m => ({ default: m.PerformanceBenchmark }))
);
const ArchitecturePlayground = lazy(() =>
  import('./components/ArchitecturePlayground').then(m => ({ default: m.ArchitecturePlayground }))
);
const ProjectEstimator = lazy(() =>
  import('./components/ProjectEstimator').then(m => ({ default: m.ProjectEstimator }))
);
const ExperienceTimeline = lazy(() =>
  import('./components/ExperienceTimeline').then(m => ({ default: m.ExperienceTimeline }))
);
const TestimonialsSection = lazy(() =>
  import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then(m => ({ default: m.ContactSection }))
);

// Code-split Modals (only loaded when triggered)
const ProjectDetailModal = lazy(() =>
  import('./components/ProjectDetailModal').then(m => ({ default: m.ProjectDetailModal }))
);
const AdminModal = lazy(() =>
  import('./components/Admin/AdminModal').then(m => ({ default: m.AdminModal }))
);
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then(m => ({ default: m.CommandPalette }))
);

const SectionFallback: React.FC = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
  </div>
);

const MainPortfolio: React.FC = () => {
  const { openAdminModal } = useAuth();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    // Open the admin CMS only through its dedicated route.
    const adminPath = '/k400w_admin';
    if (window.location.pathname === adminPath || window.location.pathname === `${adminPath}/`) {
      openAdminModal();
    }

    // Global Cmd+K / Ctrl+K listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openAdminModal]);

  return (
    <div className="relative min-h-screen bg-[#070a12] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      <Preloader />

      {/* Dynamic Cyberpunk Particle & Grid Canvas */}
      <TechBackground />

      {/* Main Glassmorphic Navigation Header */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Page Content */}
      <main className="relative">
        <Hero />
        <StatsBar />
        <ProjectsSection />
        <SkillsSection />
        <ArchitectureSection />

        <Suspense fallback={<SectionFallback />}>
          <PerformanceBenchmark />
          <ArchitecturePlayground />
          <ProjectEstimator />
          <ExperienceTimeline />
          <TestimonialsSection />
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Command Menu loaded on demand */}
      <Suspense fallback={null}>
        {commandPaletteOpen && (
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
          />
        )}
        <ProjectDetailModal />
        <AdminModal />
      </Suspense>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ProjectsProvider>
          <MainPortfolio />
        </ProjectsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

