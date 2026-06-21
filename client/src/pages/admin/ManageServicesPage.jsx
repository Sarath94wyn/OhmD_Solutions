import { useState, useEffect } from 'react';
import { Settings, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';

export default function ManageServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Settings');
  const [subServicesText, setSubServicesText] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/services');
      if (res.data.success) {
        setServices(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not load services list');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setTitle('');
    setDescription('');
    setIcon('Settings');
    setSubServicesText('');
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon || 'Settings');
    setSubServicesText(service.subServices?.map((s) => s.name).join('\n') || '');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error('Title and description are required');
      return;
    }

    const subServicesList = subServicesText
      .split('\n')
      .filter((s) => s.trim())
      .map((s) => ({ name: s.trim() }));

    const payload = {
      title,
      description,
      icon,
      subServices: subServicesList,
    };

    try {
      if (editingService) {
        // Edit service
        const res = await axios.put(`/api/services/${editingService._id}`, payload, { headers });
        if (res.data.success) {
          toast.success('Service updated successfully!');
          fetchServices();
          setModalOpen(false);
        }
      } else {
        // Add service
        const res = await axios.post('/api/services', payload, { headers });
        if (res.data.success) {
          toast.success('Service created successfully!');
          fetchServices();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not save service configurations');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await axios.delete(`/api/services/${id}`, { headers });
      if (res.data.success) {
        toast.success('Service deleted successfully!');
        fetchServices();
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not delete service');
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-3xl text-white">Manage Services</h1>
          <p className="text-sm text-text-muted mt-1">Configure service cards displayed on home page sections.</p>
        </div>
        <Button onClick={openAddModal} icon={Plus}>
          Add New Service
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader size="lg" />
        </div>
      ) : services.length === 0 ? (
        <Card className="p-12 text-center text-text-muted text-sm">No services registered in database.</Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service._id} className="p-6 border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="p-2 bg-white/[0.02] hover:bg-white/[0.08] text-white rounded-lg border border-white/[0.06] cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-heading font-black text-lg text-white mt-4">{service.title}</h3>
                <p className="text-xs text-text-body mt-2 leading-relaxed">{service.description}</p>

                <div className="mt-4 pt-4 border-t border-white/[0.04]">
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">Sub Services:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.subServices?.map((sub, idx) => (
                      <span key={idx} className="bg-white/[0.03] border border-white/[0.06] text-text-body text-[10px] px-2 py-1 rounded">
                        {sub.name}
                      </span>
                    ))}
                  </div>
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
        title={editingService ? 'Edit Service Details' : 'Register New Service'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Service Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. AI Automation Solutions"
            required
          />
          <Input
            label="Description *"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short summary of what this service offers..."
            required
          />
          <Input
            label="Lucide Icon Name"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Settings / Bot / Globe / Palette"
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-body mb-2">
              Sub-Services List (one per line)
            </label>
            <textarea
              value={subServicesText}
              onChange={(e) => setSubServicesText(e.target.value)}
              placeholder="AI Chatbots&#10;Lead Automation&#10;Workflow Scripts"
              className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm h-32"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.06]">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Service Configuration
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
