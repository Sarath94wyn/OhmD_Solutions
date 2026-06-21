import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare, Briefcase, FileText, ClipboardCheck, PhoneCall,
  UserCheck, AlertCircle, ArrowRight
} from 'lucide-react';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import ScrollReveal from '../../components/ui/ScrollReveal';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    enquiries: 0,
    products: 0,
    portfolio: 0,
    blogs: 0,
    contacts: 0,
    audits: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch counts
        const [enqRes, prodRes, portRes, blogRes, contRes, audRes] = await Promise.all([
          axios.get('/api/enquiries?limit=5', { headers }).catch(() => ({ data: { data: [] } })),
          axios.get('/api/products', { headers }).catch(() => ({ data: { data: [] } })),
          axios.get('/api/portfolio', { headers }).catch(() => ({ data: { data: [] } })),
          axios.get('/api/blog', { headers }).catch(() => ({ data: { data: [] } })),
          axios.get('/api/contact', { headers }).catch(() => ({ data: { data: [] } })),
          axios.get('/api/audit', { headers }).catch(() => ({ data: { data: [] } })),
        ]);

        setStats({
          enquiries: enqRes.data.pagination?.total || enqRes.data.data?.length || 0,
          products: prodRes.data.data?.length || 0,
          portfolio: portRes.data.data?.length || 0,
          blogs: blogRes.data.data?.length || 0,
          contacts: contRes.data.data?.length || 0,
          audits: audRes.data.data?.length || 0,
        });

        setRecentEnquiries(enqRes.data.data?.slice(0, 5) || []);
        setRecentContacts(contRes.data.data?.slice(0, 5) || []);
      } catch (err) {
        console.error('Could not fetch admin statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader size="lg" />
      </div>
    );
  }

  const statsItems = [
    { label: 'Client Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'text-primary bg-primary/10', path: '/admin/enquiries' },
    { label: 'Digital Products', value: stats.products, icon: FileText, color: 'text-blue-400 bg-blue-500/10', path: '/admin/products' },
    { label: 'Portfolio Works', value: stats.portfolio, icon: Briefcase, color: 'text-purple-400 bg-purple-500/10', path: '/admin/portfolio' },
    { label: 'Audit Requests', value: stats.audits, icon: ClipboardCheck, color: 'text-yellow-400 bg-yellow-500/10', path: '/admin/audits' },
  ];

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="font-heading font-black text-3xl text-white">System Overview</h1>
        <p className="text-sm text-text-muted mt-1">Real-time status updates of active operations and leads.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link key={i} to={item.path}>
              <Card className="p-6 border-white/[0.06] hover:border-primary/20 hover:bg-white/[0.02] transition-all flex items-center gap-5">
                <div className={`p-4 rounded-2xl ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-text-muted">{item.label}</div>
                  <div className="font-heading font-black text-2xl text-white mt-1">{item.value}</div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Leads Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Recent Enquiries Card */}
        <Card className="p-6 border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
              <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> Recent Product Demos
              </h3>
              <Link to="/admin/enquiries" className="text-xs text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <div className="text-center py-12 text-text-muted text-xs flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" /> No new product enquiries registered.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.04] text-text-muted uppercase tracking-wider">
                      <th className="py-2.5 pb-2">Client</th>
                      <th className="py-2.5 pb-2">Type</th>
                      <th className="py-2.5 pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEnquiries.map((enq) => (
                      <tr key={enq._id} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01]">
                        <td className="py-3 font-semibold text-white">{enq.name}</td>
                        <td className="py-3 text-text-body capitalize">{enq.type?.replace('_', ' ')}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            enq.status === 'new' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-text-body'
                          }`}>
                            {enq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>

        {/* Recent Contacts Card */}
        <Card className="p-6 border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
              <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-blue-400" /> Recent Contact Queries
              </h3>
              <Link to="/admin/contacts" className="text-xs text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentContacts.length === 0 ? (
              <div className="text-center py-12 text-text-muted text-xs flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" /> No contact forms submitted.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.04] text-text-muted uppercase tracking-wider">
                      <th className="py-2.5 pb-2">Sender</th>
                      <th className="py-2.5 pb-2">Subject</th>
                      <th className="py-2.5 pb-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentContacts.map((cnt) => (
                      <tr key={cnt._id} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01]">
                        <td className="py-3 font-semibold text-white">{cnt.name}</td>
                        <td className="py-3 text-text-body line-clamp-1 max-w-[150px]">{cnt.subject}</td>
                        <td className="py-3 text-text-muted">{new Date(cnt.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
