import { useState, useEffect } from 'react';
import { Package, Plus, Edit2, Trash2, Tag, DollarSign, ListChecks } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [category, setCategory] = useState('Custom Software');
  const [pricingAmount, setPricingAmount] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [demoVideo, setDemoVideo] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/products');
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not load products');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setTagline('');
    setDescription('');
    setFeaturesText('');
    setCategory('Custom Software');
    setPricingAmount('');
    setScreenshotUrl('');
    setDemoVideo('');
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setTagline(product.tagline);
    setDescription(product.description);
    setFeaturesText(product.features?.join('\n') || '');
    setCategory(product.category || 'Custom Software');
    setPricingAmount(product.pricing?.amount?.toString() || '');
    setScreenshotUrl(product.screenshots && product.screenshots[0] ? product.screenshots[0] : '');
    setDemoVideo(product.demoVideo || '');
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
        setScreenshotUrl(res.data.fileUrl);
        toast.success('Screenshot uploaded successfully!', { id: uploadToast });
      }
    } catch (err) {
      console.error(err);
      toast.error('File upload failed', { id: uploadToast });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !tagline || !description || !pricingAmount) {
      toast.error('Required fields: Name, Tagline, Description, Pricing');
      return;
    }

    const featuresList = featuresText
      .split('\n')
      .filter((f) => f.trim())
      .map((f) => f.trim());

    const payload = {
      name,
      tagline,
      description,
      features: featuresList,
      category,
      screenshots: screenshotUrl ? [screenshotUrl] : [],
      demoVideo,
      pricing: {
        type: 'starting',
        amount: parseFloat(pricingAmount),
        currency: '₹',
      },
    };

    try {
      if (editingProduct) {
        const res = await axios.put(`/api/products/${editingProduct._id}`, payload, { headers });
        if (res.data.success) {
          toast.success('Product updated!');
          fetchProducts();
          setModalOpen(false);
        }
      } else {
        const res = await axios.post('/api/products', payload, { headers });
        if (res.data.success) {
          toast.success('Product created!');
          fetchProducts();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not save product configuration');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await axios.delete(`/api/products/${id}`, { headers });
      if (res.data.success) {
        toast.success('Product deleted');
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not delete product');
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-3xl text-white">Manage Products</h1>
          <p className="text-sm text-text-muted mt-1">Configure ready-to-deploy digital platforms and pricing packages.</p>
        </div>
        <Button onClick={openAddModal} icon={Plus}>
          Add New Product
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader size="lg" />
        </div>
      ) : products.length === 0 ? (
        <Card className="p-12 text-center text-text-muted text-sm">No products found in system database.</Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="p-6 border-white/[0.06] flex flex-col justify-between overflow-hidden">
              <div>
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-2 bg-white/[0.02] hover:bg-white/[0.08] text-white rounded-lg border border-white/[0.06] cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 items-center flex-wrap">
                  <span className="bg-primary/20 text-primary border border-primary/20 px-2 py-0.5 rounded text-[10px] font-bold">
                    {product.category}
                  </span>
                  <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white font-bold flex items-center gap-0.5">
                    <DollarSign className="w-3 h-3 text-primary" /> {product.pricing?.currency}{product.pricing?.amount?.toLocaleString()}
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-white mt-4">{product.name}</h3>
                <p className="text-xs text-text-muted italic">"{product.tagline}"</p>
                <p className="text-xs text-text-body mt-2 leading-relaxed line-clamp-3">{product.description}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Edit Product Details' : 'Add New Product'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Product Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Parking Lot Finder"
              required
            />
            <Input
              label="Category *"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. AI Solutions / ERP"
              required
            />
          </div>

          <Input
            label="Product Tagline *"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Real-time slot booking engine"
            required
          />

          <Input
            label="Product Description *"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell customers what this software does..."
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Pricing Amount (INR) *"
              type="number"
              value={pricingAmount}
              onChange={(e) => setPricingAmount(e.target.value)}
              placeholder="30000"
              required
            />
            <Input
              label="Demo Video Link (optional)"
              value={demoVideo}
              onChange={(e) => setDemoVideo(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-body mb-2 flex items-center gap-1.5">
              <ListChecks className="w-4 h-4 text-primary" /> Key Features List (one per line)
            </label>
            <textarea
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Interactive Dashboard&#10;Razorpay Integrated&#10;Map Trackers"
              className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm h-32"
            />
          </div>

          {/* Screenshot File Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-body mb-2">
              Screenshot Image File
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-text-muted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary file:cursor-pointer hover:file:bg-primary/30"
              />
              {screenshotUrl && (
                <div className="w-24 h-16 border border-white/[0.08] rounded-xl overflow-hidden bg-dark-card">
                  <img src={screenshotUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="text-[10px] text-text-muted mt-1">
              File uploaded will be hosted at /uploads/ and saved in DB screenshots list.
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.06]">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Product Specifications
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
