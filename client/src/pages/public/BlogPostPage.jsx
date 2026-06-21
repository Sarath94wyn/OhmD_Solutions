import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Clock, Sparkles } from 'lucide-react';
import axios from 'axios';
import Loader from '../../components/ui/Loader';
import ScrollReveal from '../../components/ui/ScrollReveal';

// Fallback blogs database for detail view
const STATIC_BLOGS = [
  {
    _id: 'blog-1',
    title: 'AI for Small Businesses: Step-by-Step Automation Guide',
    slug: 'ai-for-small-businesses-automation-guide',
    excerpt: 'Discover how small companies can implement free or low-cost AI agents to handle lead generation, booking calendar, and client responses automatically.',
    content: `Running a small business is demanding, and owner-founders often spend more than 60% of their day handling administrative tasks. This includes sorting incoming emails, managing appointments, answering FAQs, and tracking down leads.

AI automation is no longer a luxury reserved for multi-million dollar corporations. With today\'s tools, any business can set up automated pathways to manage customer engagement, scheduling, and lead organization.

### 1. Setting Up Your Knowledgebase
The core of any customer-care AI bot is its data. Start by creating a detailed text document listing:
- Operating hours & location
- Product or service pricing lists
- Refund policies & onboarding steps
- Frequently asked questions

This document serves as the vector reference data, ensuring your AI chatbot answers queries accurately without hallucinating details.

### 2. Connect Webforms to a CRM
When a user submits a contact form, the data should automatically land in a structured CRM (like HubSpot) or a simple database (like MongoDB). Using tools like n8n or Zapier, you can trigger instant WhatsApp notifications to your sales representative:
- "Lead name: John, Phone: 9876543210, Query: Custom e-commerce setup"
This minimizes lead response times to under 5 minutes, boosting sales conversions.

### 3. Implement Booking Schedulers
Integrations like Calendly or custom booking databases eliminate back-and-forth emails. An AI customer care bot can directly share your calendar link:
- "You can book a free 15-minute slot directly here: calendly.com/company"`,
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
    content: `Visual first impressions matter. Studies show that visitors formulate their opinion of your company brand within 0.05 seconds of landing on your homepage. If your site looks dated, generic, or loads slowly, you lose trust instantly.

In 2026, web design trends have shifted from static interfaces to dynamic, immersive experiences that feel alive.

### 1. Glassmorphism & Depth
Layered interfaces with semi-transparent cards, backdrop filters, and subtle glowing borders create a sense of three-dimensional depth. This guides the user\'s eyes directly toward call-to-action cards, boosting conversions.

### 2. Micro-Animations & Interactivity
A static button is a dead button. Modern websites use hover-based transformations, floating particle gradients, and scroll-triggered animations. These small animations make navigation feel premium, encouraging visitors to interact longer.

### 3. Harmonious Color Palettes
Avoid using raw, generic colors (e.g. pure red, blue, or green). Use curated dark theme colors with soft accents. In the OhmD design, we combine a muted brand forest green (#3A6B35) with deep indigo and purple gradients, creating a high-end, futuristic tech look.`,
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
    content: `Setting up advertising campaigns on Facebook, Instagram, or Google is only half the battle. If your ads direct traffic to a generic, slow-loading homepage, your cost-per-lead will skyrocket.

To maximize marketing budgets, you must direct traffic to specialized, high-conversion landing pages.

### 1. The Power of Lead Magnets
Before asking a user to purchase a high-ticket service, offer immediate value. This generates goodwill and captures contact data. OhmD Solutions implements two direct lead magnets:
- **Project Cost Calculator**: Interactive pricing widget that gives instant ballparks.
- **Free Digital Audit**: Form capturing website URLs to send detailed improvement recommendations.

### 2. Clean Typography & Heading Hierarchies
Ensure your headline answers the visitor\'s primary question within 3 seconds:
- What do you build? (e.g. "We Build AI-Powered Digital Solutions")
- Who is it for? (e.g. "For Modern Businesses")
Use clean fonts (like Inter and Outfit) to establish clear reading priorities.`,
    coverImage: '/assets/images/products/ai-career.png',
    author: 'Marketing OhmD',
    category: 'Marketing',
    tags: ['Ad Campaigns', 'SEO', 'Lead Gen'],
    createdAt: '2026-06-05T08:00:00Z',
  }
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`/api/blog/slug/${slug}`);
        if (response.data.success && response.data.data) {
          setBlog(response.data.data);
        } else {
          const found = STATIC_BLOGS.find((b) => b.slug === slug);
          setBlog(found || null);
        }
      } catch (err) {
        console.warn('API error, using static blog defaults:', err);
        const found = STATIC_BLOGS.find((b) => b.slug === slug);
        setBlog(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-dark pt-32 pb-24 text-center">
        <h2 className="text-3xl text-white">Article Not Found</h2>
        <Link to="/blog" className="text-primary mt-4 inline-block hover:underline">
          Back to all articles
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-dark bg-grid-pattern relative min-h-screen text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog Listing
        </Link>

        {/* Article Header */}
        <ScrollReveal>
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-white leading-tight">
              {blog.title}
            </h1>
            <p className="text-base text-text-body mt-2 leading-relaxed italic">
              "{blog.excerpt}"
            </p>

            {/* Meta data */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-text-muted border-b border-white/[0.06] pb-6">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> By: {blog.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> 5 min read</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Cover Image */}
        <ScrollReveal>
          <div className="glass-card overflow-hidden border-white/[0.06] rounded-3xl mt-8">
            <img
              src={blog.coverImage || '/assets/images/products/ai-customer-support.png'}
              alt={blog.title}
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </div>
        </ScrollReveal>

        {/* Article Body Content */}
        <ScrollReveal>
          <div className="prose prose-invert max-w-none mt-10 text-text-body space-y-6 leading-relaxed">
            {blog.content.split('\n\n').map((para, i) => {
              if (para.startsWith('### ')) {
                return (
                  <h3 key={i} className="font-heading font-black text-xl md:text-2xl text-white pt-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('- ')) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 text-sm md:text-base">
                    {para.split('\n').map((item, idx) => (
                      <li key={idx}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-sm md:text-base whitespace-pre-line leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Tags footer */}
        <ScrollReveal>
          <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-white/[0.03] border border-white/[0.06] px-3.5 py-1.5 rounded-lg text-xs text-text-muted font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
