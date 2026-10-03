import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import DecisionGuidePage from '@/pages/DecisionGuidePage';
import Encyclopedia from '@/pages/Encyclopedia';
import ThemeDetail from '@/pages/ThemeDetail';
import Materials from '@/pages/Materials';
import AddTheme from '@/pages/AddTheme';
import AreaTrail from '@/pages/AreaTrail';
import SectorTrail from '@/pages/SectorTrail';
import ISO9001 from '@/pages/ISO9001';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
// Add page imports here

const RedirectToLogin = () => {
  const location = useLocation();
  return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname + location.search)}`} replace />;
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<div className="p-8 text-center text-xl mt-20">Área em preparação</div>} />
      <Route path="/register" element={<div className="p-8 text-center text-xl mt-20">Área em preparação</div>} />
      <Route path="/forgot-password" element={<div className="p-8 text-center text-xl mt-20">Área em preparação</div>} />
      <Route path="/reset-password" element={<div className="p-8 text-center text-xl mt-20">Área em preparação</div>} />
      {/* Public routes — no login required */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/decisao" element={<DecisionGuidePage />} />
        <Route path="/enciclopedia" element={<Encyclopedia />} />
        <Route path="/tema/:id" element={<ThemeDetail />} />
        <Route path="/area/:areaId" element={<AreaTrail />} />
        <Route path="/setor/:sectorId" element={<SectorTrail />} />
        <Route path="/iso" element={<ISO9001 />} />
        <Route path="/acervo" element={<Materials />} />
        <Route path="/adicionar" element={<div className="p-8 text-center text-xl mt-20">Área em preparação</div>} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
