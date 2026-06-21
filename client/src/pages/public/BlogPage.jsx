import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Calendar, User, BookOpen } from 'lucide-react';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SectionHeading from '../../components/ui/SectionHeading';
import Loader from '../../components/ui/Loader';
import ScrollReveal from '../../components/ui/ScrollReveal';

// Fallback blogs data matching seed
const STATIC_BLOGS = [
  {
    _id: 'blog-1',
    title: 'AI for Small Businesses: Step-by-Step Automation Guide',
    slug: 'ai-for-small-businesses-automation-guide',
    excerpt: 'Discover how small companies can implement free or low-cost AI agents to handle lead generation, booking calendar, and client responses automatically.',
    coverImage: '/assets/images/products/ai-customer-support.png',
    author: 'Admin OhmD',
    category: 'AI & Automation',
    tags: ['AI', 'Automation', 'Small Business'],
    createdAt: '2026-05-15T12:00:00Z',
  },
  {
    _id: 'blog-2',
    title: 'Website Trends 2026: Aesthetics That Convert in Under 1s',
    slug: 'website-trends-2026-high-speed-aesthetics',
    excerpt: 'High speed is no longer just for developers. Fast page transitions, interactive CSS, HSL color harmony, and micro-animations are now mandatory design elements.',
    coverImage: '/assets/images/products/restaurant-management.png',
    author: 'Design OhmD',
    category: 'Web Trends',
    tags: ['Web Design', 'Aesthetics', 'UX'],
    createdAt: '2026-05-28T10:00:00Z',
  },
  {
    _id: 'blog-3',
    title: 'Scaling Leads: Automated Campaign Setups and Ad Copy Tricks',
    slug: 'scaling-leads-automated-campaigns-copywriting',
    excerpt: 'A blueprint on setting up automated lead capture landing pages that hook visitors and automatically send data to CRM systems.',
    coverImage: '/assets/images/products/ai-career.png',
    author: 'Marketing OhmD',
    category: 'Marketing',
    tags: ['Ad Campaigns', 'SEO', 'Lead Gen'],
    createdAt: '2026-06-05T08:00:00Z',
  }
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState(STATIC_BLOGS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blog');
        if (response.data.success && response.data.data.length > 0) {
          setBlogs(response.data.data);
        }
      } catch (err) {
        console.warn('API error, using static blog defaults:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['All', ...new Set(blogs.map((b) => b.category))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featured = filteredBlogs[0];
  const list = filteredBlogs.slice(1);

  return (
    <div className="pt-32 pb-24 bg-dark bg-grid-pattern relative min-h-screen text-left">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-radial-gradient opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <BookOpen className="w-3.5 h-3.5" /> Company Blog
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl text-white leading-tight">
              OhmD Solution Insights
            </h1>
            <p className="text-text-body mt-4 text-base md:text-xl">
              Knowledge resources on AI integrations, custom software trends, branding, and workflows.
            </p>
          </ScrollReveal>
        </div>

        {/* Search & Tabs Row */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 order-2 md:order-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(58,107,53,0.3)]'
                      : 'bg-dark-card border-white/[0.06] text-text-body hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80 order-1 md:order-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-sm"
              />
              <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
            </div>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader size="lg" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-24 text-text-muted">No articles found matching criteria.</div>
        ) : (
          <div className="space-y-12">
            {/* Featured Post Card */}
            {featured && selectedCategory === 'All' && search === '' && (
              <ScrollReveal>
                <div className="glass-card overflow-hidden border-white/[0.06] rounded-3xl hover:border-primary/20 transition-all duration-300 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 h-72 lg:h-[400px] overflow-hidden border-r border-white/[0.06]">
                      <img
                        src={featured.coverImage || '/assets/images/products/ai-customer-support.png'}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                          Featured : {featured.category}
                        </span>
                        <h2 className="font-heading font-black text-2xl md:text-3xl text-white group-hover:text-primary transition-colors leading-tight">
                          {featured.title}
                        </h2>
                        <p className="text-xs md:text-sm text-text-body leading-relaxed line-clamp-3">
                          {featured.excerpt}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-text-muted">
                          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {featured.author}</span>
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(featured.createdAt).toLocaleDateString()}</span>
                        </div>
                        <Link to={`/blog/${featured.slug}`}>
                          <Button variant="outline" size="sm" icon={ArrowRight}>
                            Read Article
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Blogs Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory !== 'All' || search !== '' ? filteredBlogs : list).map((blog, idx) => (
                <ScrollReveal key={blog._id} delay={idx * 0.1}>
                  <Card className="flex flex-col h-full border-white/[0.06] hover:-translate-y-1.5 transition-all group overflow-hidden">
                    <div className="relative h-48 bg-dark-card overflow-hidden border-b border-white/[0.06]">
                      <img
                        src={blog.coverImage || '/assets/images/products/ai-customer-support.png'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
                      
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide border border-white/[0.08]">
                        {blog.category}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-heading font-black text-lg text-white group-hover:text-primary transition-colors leading-snug">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-text-body mt-3 leading-relaxed line-clamp-3">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-[10px] text-text-muted flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" /> {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <Link to={`/blog/${blog.slug}`}>
                          <Button variant="outline" size="sm" icon={ArrowRight} className="px-3.5 py-1.5">
                            Read
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
