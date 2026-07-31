import { lazy, Suspense } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ProtectedRoute from '@/components/ProtectedRoute';
import PublicLayout from '@/components/layout/PublicLayout';
import BrandLogo from '@/components/BrandLogo';

const Login = lazy(() => import('@/pages/Login'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Careers = lazy(() => import('@/pages/Careers'));
const Blog = lazy(() => import('@/pages/Blog'));
const Contact = lazy(() => import('@/pages/Contact'));
const AdminLayout = lazy(() => import('@/components/layout/AdminLayout'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminProjects = lazy(() => import('@/pages/admin/AdminProjects'));
const AdminPartners = lazy(() => import('@/pages/admin/AdminPartners'));
const AdminCertificates = lazy(() => import('@/pages/admin/AdminCertificates'));
const AdminServices = lazy(() => import('@/pages/admin/AdminServices'));
const AdminBlog = lazy(() => import('@/pages/admin/AdminBlog'));
const AdminTeam = lazy(() => import('@/pages/admin/AdminTeam'));
const AdminContacts = lazy(() => import('@/pages/admin/AdminContacts'));
const AdminTestimonials = lazy(() => import('@/pages/admin/AdminTestimonials'));
const AdminCareers = lazy(() => import('@/pages/admin/AdminCareers'));

const RouteFallback = () => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#020817]">
    <div className="flex flex-col items-center gap-5">
      <div className="rounded-2xl bg-white px-4 py-3 shadow-2xl shadow-black/25">
        <BrandLogo eager className="h-auto w-40" />
      </div>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-accent" />
    </div>
  </div>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#020817]">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-2xl bg-white px-4 py-3 shadow-2xl shadow-black/25">
            <BrandLogo eager className="h-auto w-40" />
          </div>
          <div className="w-8 h-8 border-2 border-white/15 border-t-accent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Protected admin routes */}
      <Route element={<ProtectedRoute requiredRole="admin" unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/partners" element={<AdminPartners />} />
          <Route path="/admin/certificates" element={<AdminCertificates />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/team" element={<AdminTeam />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/careers" element={<AdminCareers />} />
        </Route>
      </Route>

      {/* Redirects for common mistyped admin paths */}
      <Route path="/admin/Dashboard" element={<Navigate to="/admin" replace />} />
      <Route path="/admin/AdminProjects" element={<Navigate to="/admin/projects" replace />} />
      <Route path="/admin/AdminPartners" element={<Navigate to="/admin/partners" replace />} />
      <Route path="/admin/AdminCertificates" element={<Navigate to="/admin/certificates" replace />} />
      <Route path="/admin/AdminBlog" element={<Navigate to="/admin/blog" replace />} />
      <Route path="/admin/AdminServices" element={<Navigate to="/admin/services" replace />} />
      <Route path="/admin/AdminTeam" element={<Navigate to="/admin/team" replace />} />
      <Route path="/admin/AdminContacts" element={<Navigate to="/admin/contacts" replace />} />
      <Route path="/admin/AdminTestimonials" element={<Navigate to="/admin/testimonials" replace />} />
      <Route path="/admin/AdminCareers" element={<Navigate to="/admin/careers" replace />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <SonnerToaster position="top-right" theme="dark" />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
