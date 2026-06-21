import { useState, useEffect } from 'react';
import { Star, Plus, Edit2, Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';

export default function ManageTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  // Form states
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isActive, setIsActive] = useState(true);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/testimonials');
      if (res.data.success) {
        setTestimonials(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not load testimonials list');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingTestimonial(null);
    setClientName('');
    setCompany('');
    setRole('');
    setContent('');
    setRating(5);
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditingTestimonial(t);
    setClientName(t.clientName);
    setCompany(t.company);
    setRole(t.role);
    setContent(t.content);
    setRating(t.rating || 5);
    setIsActive(t.isActive !== undefined ? t.isActive : true);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientName || !company || !content) {
      toast.error('Name, Company, and Content are required');
      return;
    }

    const payload = {
      clientName,
      company,
      role,
      content,
      rating: parseInt(rating),
      isActive,
    };

    try {
      if (editingTestimonial) {
        const res = await axios.put(`/api/testimonials/${editingTestimonial._id}`, payload, { headers });
        if (res.data.success) {
          toast.success('Testimonial updated!');
          fetchTestimonials();
          setModalOpen(false);
        }
      } else {
        const res = await axios.post('/api/testimonials', payload, { headers });
        if (res.data.success) {
          toast.success('Testimonial created!');
          fetchTestimonials();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not save testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      const res = await axios.delete(`/api/testimonials/${id}`, { headers });
      if (res.data.success) {
        toast.success('Testimonial deleted');
        fetchTestimonials();
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not delete testimonial');
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-3xl text-white">Manage Testimonials</h1>
          <p className="text-sm text-text-muted mt-1">Configure client review cards shown on the website carousel.</p>
        </div>
        <Button onClick={openAddModal} icon={Plus}>
          Add Testimonial
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader size="lg" />
        </div>
      ) : testimonials.length === 0 ? (
        <Card className="p-12 text-center text-text-muted text-sm">No testimonials found in database.</Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t._id} className="p-6 border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < t.rating ? 'fill-primary text-primary' : 'text-text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(t)}
                      className="p-2 bg-white/[0.02] hover:bg-white/[0.08] text-white rounded-lg border border-white/[0.06] cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-text-body mt-4 italic">"{t.content}"</p>

                <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">{t.clientName}</div>
                    <div className="text-[10px] text-text-muted">
                      {t.role}, {t.company}
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                    t.isActive ? 'bg-primary/20 text-primary' : 'bg-white/10 text-text-muted'
                  }`}>
                    {t.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTestimonial ? 'Edit Testimonial' : 'Register New Testimonial'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Client Name *"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Sanjay Sharma"
              required
            />
            <Input
              label="Company *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. FinTrack Solutions"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Role / Designation"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. CEO"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-body mb-2">Rating (1-5 stars) *</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>

          <Input
            label="Review / Feedback Content *"
            type="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Feedback comments from client..."
            required
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-dark-card text-primary focus:ring-primary cursor-pointer"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-white cursor-pointer select-none">
              Is Active (Visible on home page carousel)
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.06]">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Testimonial
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
