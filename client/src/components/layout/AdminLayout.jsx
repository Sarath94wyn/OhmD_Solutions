import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import Loader from '../ui/Loader';

export default function AdminLayout({ children }) {
  const { isAuthenticated, loading, admin } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [contRes, enqRes, audRes] = await Promise.all([
          axios.get('/api/contact', { headers }).catch(() => ({ data: { data: [] } })),
          axios.get('/api/enquiries', { headers }).catch(() => ({ data: { data: [] } })),
          axios.get('/api/audit', { headers }).catch(() => ({ data: { data: [] } })),
        ]);

        const unreadContacts = (contRes.data.data || []).filter(c => !c.isRead).map(c => ({
          id: c._id,
          type: 'contact',
          title: 'New Contact Query',
          desc: `${c.name}: ${c.subject}`,
          date: c.createdAt,
          path: '/admin/contacts'
        }));

        const unreadEnquiries = (enqRes.data.data || []).filter(e => e.status === 'new').map(e => ({
          id: e._id,
          type: 'enquiry',
          title: 'New Product/Demo Enquiry',
          desc: `${e.name} requested demo`,
          date: e.createdAt,
          path: '/admin/enquiries'
        }));

        const unreadAudits = (audRes.data.data || []).filter(a => a.status === 'pending').map(a => ({
          id: a._id,
          type: 'audit',
          title: 'New Audit Request',
          desc: `Audit for: ${a.businessName}`,
          date: a.createdAt,
          path: '/admin/audits'
        }));

        const combined = [...unreadContacts, ...unreadEnquiries, ...unreadAudits].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setNotifications(combined);
      } catch (err) {
        console.error('Could not fetch notifications:', err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000); // refresh every 15 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleMarkAllRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      await Promise.all(notifications.map(notif => {
        if (notif.type === 'contact') {
          return axios.put(`/api/contact/${notif.id}/read`, { isRead: true }, { headers });
        } else if (notif.type === 'enquiry') {
          return axios.put(`/api/enquiries/${notif.id}`, { status: 'contacted' }, { headers });
        } else if (notif.type === 'audit') {
          return axios.put(`/api/audit/${notif.id}`, { status: 'reviewed' }, { headers });
        }
        return Promise.resolve();
      }));

      setNotifications([]);
      toast.success('All notifications marked as read');
    } catch (err) {
      console.error('Could not clear notifications:', err);
      toast.error('Failed to clear notifications');
    }
  };

  if (loading) return <Loader fullPage />;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-dark">
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="ml-[280px] transition-all duration-300">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-dark-card/80 backdrop-blur-xl border-b border-white/[0.06]
                          flex items-center justify-between px-8">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl
                           text-sm text-white placeholder-text-muted
                           focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative p-2 rounded-xl hover:bg-white/[0.04] text-text-muted hover:text-white transition-all cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 border border-dark">
                  {notifications.length}
                </span>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-80 bg-dark-card border border-white/[0.08] rounded-2xl shadow-2xl p-4 z-50 text-left backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                  {notifications.length > 0 && (
                    <button 
                      onClick={handleMarkAllRead} 
                      className="text-[10px] text-primary hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2 py-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-text-muted text-xs">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <Link
                        key={`${notif.type}-${notif.id}`}
                        to={notif.path}
                        onClick={() => setDropdownOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/[0.04] transition-all"
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-xs font-bold text-white leading-tight">{notif.title}</span>
                          <span className="text-[9px] text-text-muted whitespace-nowrap ml-2">
                            {new Date(notif.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-[11px] text-text-body mt-1 line-clamp-1">{notif.desc}</p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-electric
                            flex items-center justify-center text-white text-sm font-bold">
                {admin?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-sm font-medium text-white hidden sm:block">
                {admin?.name || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
