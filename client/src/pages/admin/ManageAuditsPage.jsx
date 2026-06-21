import { useState, useEffect } from 'react';
import { ClipboardCheck, Calendar, User, Mail, Phone, Globe, Edit3, Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';
import Badge from '../../components/ui/Badge';

export default function ManageAuditsPage() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [status, setStatus] = useState('pending');
  const [recommendations, setRecommendations] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/audit', { headers });
      if (res.data.success) {
        setAudits(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not load audit requests');
    } finally {
      setLoading(false);
    }
  };

  const openDetail = (audit) => {
    setSelectedAudit(audit);
    setStatus(audit.status);
    setRecommendations(audit.recommendations || '');
    setDetailModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedAudit) return;

    try {
      const res = await axios.put(
        `/api/audit/${selectedAudit._id}`,
        { status, recommendations },
        { headers }
      );

      if (res.data.success) {
        toast.success('Audit specifications updated!');
        fetchAudits();
        setDetailModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not save audit modifications');
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="font-heading font-black text-3xl text-white">Free Audit Requests</h1>
        <p className="text-sm text-text-muted mt-1">Manage submitted digital transformation audits, write report recommendations, and set statuses.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader size="lg" />
        </div>
      ) : audits.length === 0 ? (
        <Card className="p-12 text-center text-text-muted text-sm">No business audit requests received.</Card>
      ) : (
        <Card className="border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.01] text-text-muted uppercase tracking-wider">
                  <th className="p-4 font-semibold">Business</th>
                  <th className="p-4 font-semibold">Industry</th>
                  <th className="p-4 font-semibold">Current Website</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {audits.map((a) => (
                  <tr key={a._id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-bold text-white">{a.businessName}</td>
                    <td className="p-4 text-text-body">{a.industry}</td>
                    <td className="p-4 text-text-body">
                      {a.currentWebsite ? (
                        <a
                          href={a.currentWebsite.startsWith('http') ? a.currentWebsite : `https://${a.currentWebsite}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {a.currentWebsite.replace(/(^\w+:|^)\/\//, '')} <Globe className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-text-muted">None</span>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge variant={a.status === 'pending' ? 'red' : a.status === 'reviewed' ? 'yellow' : 'green'}>
                        {a.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => openDetail(a)}
                        className="p-2 bg-white/[0.02] hover:bg-white/[0.08] text-white rounded-lg border border-white/[0.06] cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Audit Detail Modal */}
      {selectedAudit && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={`Audit: ${selectedAudit.businessName}`}
          size="lg"
        >
          <div className="space-y-6 text-left">
            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl">
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><User className="w-3.5 h-3.5 text-primary" /> Company:</span>
                <span className="font-semibold text-white block">{selectedAudit.businessName} ({selectedAudit.industry})</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-primary" /> Site:</span>
                {selectedAudit.currentWebsite ? (
                  <a
                    href={selectedAudit.currentWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline block font-semibold"
                  >
                    {selectedAudit.currentWebsite}
                  </a>
                ) : (
                  <span className="font-semibold text-text-muted block">No website provided</span>
                )}
              </div>
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-primary" /> Contact Email:</span>
                <span className="font-semibold text-white block">{selectedAudit.contactEmail}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-primary" /> Contact Phone:</span>
                <span className="font-semibold text-white block">{selectedAudit.contactPhone}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdate} className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">Audit Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                >
                  <option value="pending">Pending Scan</option>
                  <option value="reviewed">Reviewed (Recommendations Written)</option>
                  <option value="sent">Report Sent to Client</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">Audit Report Recommendations</label>
                <textarea
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  placeholder="Provide automated suggestions, speed index reports, or SEO findings to email to the client..."
                  className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-xs h-40"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
                <Button type="button" variant="outline" onClick={() => setDetailModalOpen(false)}>
                  Close
                </Button>
                <Button type="submit">
                  Save Audit Report
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
