import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, User, Eye, Trash2, ShieldCheck, ShieldAlert } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';
import Badge from '../../components/ui/Badge';

export default function ManageContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/contact', { headers });
      if (res.data.success) {
        setContacts(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not load contact messages');
    } finally {
      setLoading(false);
    }
  };

  const openDetail = async (c) => {
    setSelectedContact(c);
    setDetailModalOpen(true);

    if (!c.isRead) {
      try {
        await axios.put(`/api/contact/${c._id}/read`, { isRead: true }, { headers });
        // Update local list
        setContacts((prev) =>
          prev.map((item) => (item._id === c._id ? { ...item, isRead: true } : item))
        );
      } catch (err) {
        console.error('Could not mark contact as read:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const res = await axios.delete(`/api/contact/${id}`, { headers });
      if (res.data.success) {
        toast.success('Message deleted');
        fetchContacts();
        setDetailModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not delete contact message');
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="font-heading font-black text-3xl text-white">Contact Submissions</h1>
        <p className="text-sm text-text-muted mt-1">Review inquiries submitted via the public contact form.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader size="lg" />
        </div>
      ) : contacts.length === 0 ? (
        <Card className="p-12 text-center text-text-muted text-sm">No contact messages received.</Card>
      ) : (
        <Card className="border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.01] text-text-muted uppercase tracking-wider">
                  <th className="p-4 font-semibold">Sender</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Subject</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-bold text-white">{c.name}</td>
                    <td className="p-4 text-text-body">{c.email}</td>
                    <td className="p-4 text-text-body">{c.subject}</td>
                    <td className="p-4">
                      <Badge variant={c.isRead ? 'gray' : 'green'}>
                        {c.isRead ? 'Read' : 'New'}
                      </Badge>
                    </td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => openDetail(c)}
                        className="p-2 bg-white/[0.02] hover:bg-white/[0.08] text-white rounded-lg border border-white/[0.06] cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
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

      {/* Detail Modal */}
      {selectedContact && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={`Message: ${selectedContact.subject}`}
          size="md"
        >
          <div className="space-y-6 text-left">
            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl">
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><User className="w-3.5 h-3.5 text-primary" /> From:</span>
                <span className="font-semibold text-white block">{selectedContact.name}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-primary" /> Email:</span>
                <span className="font-semibold text-white block">{selectedContact.email}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-primary" /> Phone:</span>
                <span className="font-semibold text-white block">{selectedContact.phone || 'Not provided'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> Date Received:</span>
                <span className="font-semibold text-white block">{new Date(selectedContact.createdAt).toLocaleString()}</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-sm text-white">Query Details:</h4>
              <p className="text-xs text-text-body p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl leading-relaxed whitespace-pre-line">
                {selectedContact.message}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
              <Button
                type="button"
                variant="outline"
                className="border-red-500/20 hover:bg-red-500/10 text-red-400"
                onClick={() => handleDelete(selectedContact._id)}
              >
                Delete Message
              </Button>
              <Button type="button" onClick={() => setDetailModalOpen(false)}>
                Close Window
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
