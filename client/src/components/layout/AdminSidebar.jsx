import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Settings, Package, Briefcase,
  MessageSquare, FileEdit, Star, Users, ClipboardCheck,
  ChevronLeft, ChevronRight, LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ADMIN_NAV_LINKS } from '../../utils/constants';

const iconMap = {
  LayoutDashboard, Settings, Package, Briefcase,
  MessageSquare, FileEdit, Star, Users, ClipboardCheck,
};

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, admin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 bottom-0 z-40 bg-dark-card border-r border-white/[0.06] flex flex-col"
    >
      {/* Logo */}
      <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
        <img src="/assets/images/logo.png" alt="OhmD" className="w-10 h-10 rounded-full shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <p className="font-heading font-bold text-white text-sm">OhmD Solutions</p>
              <p className="text-xs text-text-muted">Admin Panel</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {ADMIN_NAV_LINKS.map((link) => {
          const Icon = iconMap[link.icon] || LayoutDashboard;
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 group relative
                ${isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-text-muted hover:text-white hover:bg-white/[0.04]'
                }
              `}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-white'}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-dark-surface text-white text-xs rounded-lg
                               opacity-0 invisible group-hover:opacity-100 group-hover:visible
                               transition-all whitespace-nowrap border border-white/10 shadow-xl z-50">
                  {link.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Admin Info + Logout */}
      <div className="p-3 border-t border-white/[0.06] space-y-2">
        {!collapsed && admin && (
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-white truncate">{admin.name || 'Admin'}</p>
            <p className="text-xs text-text-muted truncate">{admin.email || ''}</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                     text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl
                     text-text-muted hover:text-white hover:bg-white/[0.04] transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}
