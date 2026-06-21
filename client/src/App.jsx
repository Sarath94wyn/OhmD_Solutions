import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import ProductsPage from './pages/public/ProductsPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import PortfolioPage from './pages/public/PortfolioPage';
import PortfolioDetailPage from './pages/public/PortfolioDetailPage';
import BlogPage from './pages/public/BlogPage';
import BlogPostPage from './pages/public/BlogPostPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ManageServicesPage from './pages/admin/ManageServicesPage';
import ManageProductsPage from './pages/admin/ManageProductsPage';
import ManagePortfolioPage from './pages/admin/ManagePortfolioPage';
import ManageEnquiriesPage from './pages/admin/ManageEnquiriesPage';
import ManageBlogPage from './pages/admin/ManageBlogPage';
import ManageTestimonialsPage from './pages/admin/ManageTestimonialsPage';
import ManageContactsPage from './pages/admin/ManageContactsPage';
import ManageAuditsPage from './pages/admin/ManageAuditsPage';

// Scroll Restoration
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        // Small delay to ensure the page has finished mounting and layed out
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// Protected Admin Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Layout wrapper for public website to keep Navbar & Footer
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-dark text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#111118',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
        },
      }} />
      <Routes>
        {/* Admin Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Panel routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/services" element={<ManageServicesPage />} />
                <Route path="/products" element={<ManageProductsPage />} />
                <Route path="/portfolio" element={<ManagePortfolioPage />} />
                <Route path="/enquiries" element={<ManageEnquiriesPage />} />
                <Route path="/blog" element={<ManageBlogPage />} />
                <Route path="/testimonials" element={<ManageTestimonialsPage />} />
                <Route path="/contacts" element={<ManageContactsPage />} />
                <Route path="/audits" element={<ManageAuditsPage />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* Public Website paths */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </AuthProvider>
  );
}
