import { useState, useEffect } from 'react';
import { FileText, Plus, Edit2, Trash2, Globe, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';

export default function ManageBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI & Automation');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/blog');
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingBlog(null);
    setTitle('');
    setCategory('AI & Automation');
    setExcerpt('');
    setContent('');
    setCoverImage('');
    setTagsText('');
    setIsPublished(false);
    setModalOpen(true);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setCategory(blog.category || 'AI & Automation');
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    setCoverImage(blog.coverImage || '');
    setTagsText(blog.tags?.join(', ') || '');
    setIsPublished(blog.isPublished || false);
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
        setCoverImage(res.data.fileUrl);
        toast.success('Cover image uploaded!', { id: uploadToast });
      }
    } catch (err) {
      console.error(err);
      toast.error('File upload failed', { id: uploadToast });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      toast.error('Required fields: Title, Excerpt, Content');
      return;
    }

    const tagsList = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);

    const payload = {
      title,
      category,
      excerpt,
      content,
      coverImage,
      tags: tagsList,
      isPublished,
    };

    try {
      if (editingBlog) {
        const res = await axios.put(`/api/blog/${editingBlog._id}`, payload, { headers });
        if (res.data.success) {
          toast.success('Blog article updated!');
          fetchBlogs();
          setModalOpen(false);
        }
      } else {
        const res = await axios.post('/api/blog', payload, { headers });
        if (res.data.success) {
          toast.success('Blog article created!');
          fetchBlogs();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not save blog article');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      const res = await axios.delete(`/api/blog/${id}`, { headers });
      if (res.data.success) {
        toast.success('Article deleted');
        fetchBlogs();
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not delete blog post');
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-3xl text-white">Manage Blog</h1>
          <p className="text-sm text-text-muted mt-1">Configure technical strategy content, category listings, and publish status.</p>
        </div>
        <Button onClick={openAddModal} icon={Plus}>
          Add Blog Post
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader size="lg" />
        </div>
      ) : blogs.length === 0 ? (
        <Card className="p-12 text-center text-text-muted text-sm">No blog posts found in database.</Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog._id} className="p-6 border-white/[0.06] flex flex-col justify-between overflow-hidden">
              <div>
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(blog)}
                      className="p-2 bg-white/[0.02] hover:bg-white/[0.08] text-white rounded-lg border border-white/[0.06] cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 items-center flex-wrap">
                  <span className="bg-primary/20 text-primary border border-primary/20 px-2 py-0.5 rounded text-[10px] font-bold">
                    {blog.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 border ${
                    blog.isPublished
                      ? 'bg-green-500/15 border-green-500/20 text-green-400'
                      : 'bg-white/5 border-white/10 text-text-muted'
                  }`}>
                    {blog.isPublished ? <Globe className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-white mt-4">{blog.title}</h3>
                <p className="text-xs text-text-body mt-2 leading-relaxed line-clamp-3">{blog.excerpt}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Article Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI for Small Businesses"
              required
            />
            <Input
              label="Category *"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="AI & Automation / Web Trends / Marketing"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Article Tags (comma separated)"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="AI, Automation, Small Business"
            />
            <div className="flex items-center gap-3 h-full pt-6">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-dark-card text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-white cursor-pointer select-none">
                Publish immediately (Publicly visible)
              </label>
            </div>
          </div>

          <Input
            label="Article Summary / Excerpt *"
            type="textarea"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short card intro summary..."
            required
          />

          <Input
            label="Article Content (Supports markdown headers ###) *"
            type="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write full article body paragraphs. Use ### for subheadings."
            required
          />

          {/* Cover Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-body mb-2">Cover Image File</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-text-muted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary file:cursor-pointer hover:file:bg-primary/30"
              />
              {coverImage && (
                <div className="w-24 h-16 border border-white/[0.08] rounded-xl overflow-hidden bg-dark-card">
                  <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.06]">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Blog Article
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
