// ============================================================
// SevaPath — Main App with Routing
// ============================================================

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Navbar from './components/Navbar';
import CinematicBackground from './components/CinematicBackground';
import SevaPathBackground from './components/SevaPathBackground';
import AskSevaPath from './components/AskSevaPath';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy-load all pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const QuestionnairePage = lazy(() => import('./pages/QuestionnairePage'));
const HelpMapPage = lazy(() => import('./pages/HelpMapPage'));
const BenefitDetailPage = lazy(() => import('./pages/BenefitDetailPage'));
const DocumentsPage = lazy(() => import('./pages/DocumentsPage'));
const FormExplainerPage = lazy(() => import('./pages/FormExplainerPage'));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage'));
const FindPage = lazy(() => import('./pages/FindPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const PersonaHubPage = lazy(() => import('./pages/PersonaHubPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#B85F45]/30 border-t-[#B85F45] animate-spin" />
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#B85F45] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Background layer */}
      {isHome ? <CinematicBackground /> : <SevaPathBackground />}

      {/* Navbar */}
      <Navbar isTransparent={isHome} />

      <main id="main-content" className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/questionnaire" element={<QuestionnairePage />} />
              <Route path="/help-map" element={<HelpMapPage />} />
              <Route path="/benefit/:id" element={<BenefitDetailPage />} />
              <Route path="/documents/:id" element={<DocumentsPage />} />
              <Route path="/form-explainer" element={<FormExplainerPage />} />
              <Route path="/form-guides" element={<FormExplainerPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/find" element={<FindPage />} />
              <Route path="/find/:category" element={<FindPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/for/:persona" element={<PersonaHubPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Universal Footer with Feedback Link */}
      <Footer />

      {/* Ask SevaPath Assistant */}
      <AskSevaPath />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  );
}
