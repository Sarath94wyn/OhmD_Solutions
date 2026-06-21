import { useState, useEffect } from 'react';
import { MessageSquare, Calendar, User, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';
import Badge from '../../components/ui/Badge';

export default function ManageEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [status, setStatus] = useState('new');
  const [notes, setNotes] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/enquiries', { headers });
      if (res.data.success) {
        setEnquiries(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not load client enquiries');
    } finally {
      setLoading(false);
    }
  };

  const openDetail = (enq) => {
    setSelectedEnquiry(enq);
    setStatus(enq.status);
    setNotes(enq.notes || '');
    setDetailModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    try {
      const res = await axios.put(
        `/api/enquiries/${selectedEnquiry._id}`,
        { status, notes },
        { headers }
      );

      if (res.data.success) {
        toast.success('Enquiry status updated!');
        fetchEnquiries();
        setDetailModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry permanently?')) return;
    try {
      const res = await axios.delete(`/api/enquiries/${id}`, { headers });
      if (res.data.success) {
        toast.success('Enquiry deleted');
        fetchEnquiries();
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not delete enquiry');
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="font-heading font-black text-3xl text-white">Client Enquiries</h1>
        <p className="text-sm text-text-muted mt-1">Manage lead submissions requesting product demonstrations or quotes.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader size="lg" />
        </div>
      ) : enquiries.length === 0 ? (
        <Card className="p-12 text-center text-text-muted text-sm">No enquiries registered yet.</Card>
      ) : (
        <Card className="border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.01] text-text-muted uppercase tracking-wider">
                  <th className="p-4 font-semibold">Client Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-bold text-white">{enq.name}</td>
                    <td className="p-4 text-text-body">{enq.email}</td>
                    <td className="p-4 text-text-body capitalize">{enq.type?.replace('_', ' ')}</td>
                    <td className="p-4">
                      <Badge variant={enq.status === 'new' ? 'green' : enq.status === 'closed' ? 'gray' : 'yellow'}>
                        {enq.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => openDetail(enq)}
                        className="p-2 bg-white/[0.02] hover:bg-white/[0.08] text-white rounded-lg border border-white/[0.06] cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(enq._id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Details / Edit Status Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={`Enquiry: ${selectedEnquiry.name}`}
          size="md"
        >
          <div className="space-y-6 text-left">
            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl">
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><User className="w-3.5 h-3.5 text-primary" /> Name:</span>
                <span className="font-semibold text-white block">{selectedEnquiry.name}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-primary" /> Email:</span>
                <span className="font-semibold text-white block">{selectedEnquiry.email}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-primary" /> Phone:</span>
                <span className="font-semibold text-white block">{selectedEnquiry.phone || 'Not provided'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> Date:</span>
                <span className="font-semibold text-white block">{new Date(selectedEnquiry.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-sm text-white">Client Message:</h4>
              <p className="text-xs text-text-body p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl leading-relaxed whitespace-pre-line">
                {selectedEnquiry.message}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">Lead Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-xs"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Client Contacted</option>
                  <option value="in_progress">Demo Scheduled / Progress</option>
                  <option value="closed">Closed / Finished</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">Follow-up Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes about schedule times, user responses, etc..."
                  className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-xs h-24"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
                <Button type="button" variant="outline" onClick={() => setDetailModalOpen(false)}>
                  Close
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
