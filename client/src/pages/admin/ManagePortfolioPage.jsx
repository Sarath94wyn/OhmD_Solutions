import { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit2, Trash2, Tag, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';

export default function ManagePortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Website');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [caseStudy, setCaseStudy] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [technologiesText, setTechnologiesText] = useState('');
  
  // Results Metrics Form States
  const [metric1, setMetric1] = useState('');
  const [value1, setValue1] = useState('');
  const [metric2, setMetric2] = useState('');
  const [value2, setValue2] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/portfolio');
      if (res.data.success) {
        setPortfolio(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not load portfolio list');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setCategory('Website');
    setClient('');
    setDescription('');
    setCaseStudy('');
    setImageUrl('');
    setTechnologiesText('');
    setMetric1('');
    setValue1('');
    setMetric2('');
    setValue2('');
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setTitle(project.title);
    setCategory(project.category || 'Website');
    setClient(project.client || '');
    setDescription(project.description || '');
    setCaseStudy(project.caseStudy || '');
    setImageUrl(project.images && project.images[0] ? project.images[0] : '');
    setTechnologiesText(project.technologies?.join(', ') || '');
    
    // Load metrics
    setMetric1(project.results && project.results[0] ? project.results[0].metric : '');
    setValue1(project.results && project.results[0] ? project.results[0].value : '');
    setMetric2(project.results && project.results[1] ? project.results[1].metric : '');
    setValue2(project.results && project.results[1] ? project.results[1].value : '');
    
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const uploadToast = toast.loading('Uploading file...');
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
      });

      if (res.data.success) {
        setImageUrl(res.data.fileUrl);
        toast.success('Cover image uploaded!', { id: uploadToast });
      }
    } catch (err) {
      console.error(err);
      toast.error('File upload failed', { id: uploadToast });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !client || !description) {
      toast.error('Title, Client and Description are required');
      return;
    }

    const techList = technologiesText
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);

    const results = [];
    if (metric1 && value1) results.push({ metric: metric1, value: value1 });
    if (metric2 && value2) results.push({ metric: metric2, value: value2 });

    const payload = {
      title,
      category,
      client,
      description,
      caseStudy,
      images: imageUrl ? [imageUrl] : [],
      results,
      technologies: techList,
    };

    try {
      if (editingProject) {
        const res = await axios.put(`/api/portfolio/${editingProject._id}`, payload, { headers });
        if (res.data.success) {
          toast.success('Portfolio item updated!');
          fetchPortfolio();
          setModalOpen(false);
        }
      } else {
        const res = await axios.post('/api/portfolio', payload, { headers });
        if (res.data.success) {
          toast.success('Portfolio item created!');
          fetchPortfolio();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not save case study');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this case study?')) return;
    try {
      const res = await axios.delete(`/api/portfolio/${id}`, { headers });
      if (res.data.success) {
        toast.success('Portfolio item deleted');
        fetchPortfolio();
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not delete item');
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-3xl text-white">Manage Portfolio</h1>
          <p className="text-sm text-text-muted mt-1">Configure client case studies, metrics and technologies badges.</p>
        </div>
        <Button onClick={openAddModal} icon={Plus}>
          Add Portfolio Item
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader size="lg" />
        </div>
      ) : portfolio.length === 0 ? (
        <Card className="p-12 text-center text-text-muted text-sm">No portfolio items registered in database.</Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((project) => (
            <Card key={project._id} className="p-6 border-white/[0.06] flex flex-col justify-between overflow-hidden">
              <div>
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(project)}
                      className="p-2 bg-white/[0.02] hover:bg-white/[0.08] text-white rounded-lg border border-white/[0.06] cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 items-center flex-wrap">
                  <span className="bg-primary/20 text-primary border border-primary/20 px-2 py-0.5 rounded text-[10px] font-bold">
                    {project.category}
                  </span>
                  <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white font-medium">
                    Client: {project.client}
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-white mt-4">{project.title}</h3>
                <p className="text-xs text-text-body mt-2 leading-relaxed line-clamp-3">{project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? 'Edit Case Study Details' : 'Add New Case Study'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Project Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. B2B E-commerce Store Development"
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-body mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
              >
                <option value="Website">Website</option>
                <option value="Application">Application</option>
                <option value="UI Design">UI Design</option>
                <option value="Marketing">Marketing</option>
                <option value="AI Project">AI Project</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Client Name *"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="e.g. StitchFashion India"
              required
            />
            <Input
              label="Technologies Used (comma separated)"
              value={technologiesText}
              onChange={(e) => setTechnologiesText(e.target.value)}
              placeholder="React, Tailwind, Node.js, Mongoose"
            />
          </div>

          <Input
            label="Short Summary *"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short card summary description of the project..."
            required
          />

          <Input
            label="Full Case Study Detail / Challenge"
            type="textarea"
            value={caseStudy}
            onChange={(e) => setCaseStudy(e.target.value)}
            placeholder="Detailed paragraphs explaining business bottleneck and how our system resolved it..."
          />

          {/* Results Metrics */}
          <div className="border-t border-white/[0.06] pt-5">
            <h4 className="font-heading font-bold text-sm text-white mb-3">Project Metric Outcomes (Results)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Input
                  label="Metric 1 Label"
                  value={metric1}
                  onChange={(e) => setMetric1(e.target.value)}
                  placeholder="e.g. Reduced manual work"
                />
                <Input
                  label="Metric 1 Value"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  placeholder="e.g. 70%"
                />
              </div>
              <div className="space-y-3">
                <Input
                  label="Metric 2 Label"
                  value={metric2}
                  onChange={(e) => setMetric2(e.target.value)}
                  placeholder="e.g. Increased booking volume"
                />
                <Input
                  label="Metric 2 Value"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  placeholder="e.g. 40%"
                />
              </div>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="mb-4 border-t border-white/[0.06] pt-5">
            <label className="block text-sm font-medium text-text-body mb-2">Project Image Cover</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-text-muted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary file:cursor-pointer hover:file:bg-primary/30"
              />
              {imageUrl && (
                <div className="w-24 h-16 border border-white/[0.08] rounded-xl overflow-hidden bg-dark-card">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.06]">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Portfolio Configuration
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
