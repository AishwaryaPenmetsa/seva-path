// ============================================================
// SevaPath — Main App with Routing
// ============================================================

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Navbar from './components/Navbar';
import CinematicBackground from './components/CinematicBackground';
import SevaPathBackground from './components/SevaPathBackground';
import HomePage from './pages/HomePage';
import QuestionnairePage from './pages/QuestionnairePage';
import HelpMapPage from './pages/HelpMapPage';
import BenefitDetailPage from './pages/BenefitDetailPage';
import DocumentsPage from './pages/DocumentsPage';
import FormExplainerPage from './pages/FormExplainerPage';
import ApplicationsPage from './pages/ApplicationsPage';
import FindPage from './pages/FindPage';
import ProfilePage from './pages/ProfilePage';
import AskSevaPath from './components/AskSevaPath';

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background layer — cinematic on home, warm on other pages */}
      {isHome ? <CinematicBackground /> : <SevaPathBackground />}

      {/* Navbar — transparent over hero on home, opaque on other pages */}
      <Navbar isTransparent={isHome} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/help-map" element={<HelpMapPage />} />
          <Route path="/benefit/:id" element={<BenefitDetailPage />} />
          <Route path="/documents/:id" element={<DocumentsPage />} />
          <Route path="/form-explainer" element={<FormExplainerPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      {/* Ask SevaPath Assistant Floating Component */}
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
