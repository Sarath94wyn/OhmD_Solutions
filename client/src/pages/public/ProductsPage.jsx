import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Tag, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SectionHeading from '../../components/ui/SectionHeading';
import Loader from '../../components/ui/Loader';
import ScrollReveal from '../../components/ui/ScrollReveal';

// Static fallbacks matching seed data
const STATIC_PRODUCTS = [
  {
    _id: 'prod-parking',
    name: 'Parking Lot Finder',
    tagline: 'Real-time parking space locator and reservation engine',
    description: 'Smart IoT-enabled app to find, reserve, and pay for parking spots instantly. Features map integration, occupancy updates, and smart reservations.',
    features: ['Real-time Occupancy Map', 'Online Slot Booking', 'Razorpay Payment Gateway', 'Admin Dashboard & Reports'],
    screenshots: ['/assets/images/products/parking-lot-finder.png'],
    pricing: { type: 'starting', amount: 25000, currency: '₹' },
    category: 'Custom Software',
  },
  {
    _id: 'prod-ai-bot',
    name: 'AI Customer Support Bot',
    tagline: '24/7 autonomous user engagement and query resolution agent',
    description: 'Context-aware chatbot trained on your company database to resolve customer queries instantly. Escalates to humans only when necessary.',
    features: ['Custom Knowledgebase Training', 'Multi-channel (Web, WhatsApp)', 'Sentiment Analysis', 'CRM Integration'],
    screenshots: ['/assets/images/products/ai-customer-support.png'],
    pricing: { type: 'starting', amount: 30000, currency: '₹' },
    category: 'AI Solutions',
  },
  {
    _id: 'prod-school',
    name: 'School Management System',
    tagline: 'Unified administrative platform for modern schools',
    description: 'Complete ERP handling admissions, student records, grading, timetables, attendance, teacher tracking, and parent communication.',
    features: ['Gradebook & Attendance', 'Fees Management Gateway', 'Parent/Student Portal', 'Timetable Planner'],
    screenshots: ['/assets/images/products/school-management.png'],
    pricing: { type: 'starting', amount: 50000, currency: '₹' },
    category: 'Enterprise ERP',
  },
  {
    _id: 'prod-restaurant',
    name: 'Restaurant POS System',
    tagline: 'High-speed billing, table, and kitchen operations control',
    description: 'Cloud-based point-of-sale featuring custom floor plans, kitchen displays, table reservations, inventory alerts, and daily sales analytics.',
    features: ['Interactive POS Billing', 'Table Management Grid', 'Kitchen Display System', 'Inventory Alerts'],
    screenshots: ['/assets/images/products/restaurant-management.png'],
    pricing: { type: 'starting', amount: 35000, currency: '₹' },
    category: 'Custom Software',
  },
  {
    _id: 'prod-pms',
    name: 'PMS Application',
    tagline: 'End-to-end lease, tenant, and property tracking tool',
    description: 'Property Management System helping owners and brokers track tenant rents, lease timelines, maintenance tickets, and booking occupancy charts.',
    features: ['Tenant Rent Invoicing', 'Maintenance Tickets System', 'Lease Reminders', 'Financial Reports'],
    screenshots: ['/assets/images/products/pms-application.png'],
    pricing: { type: 'starting', amount: 45000, currency: '₹' },
    category: 'Custom Software',
  },
  {
    _id: 'prod-ai-career',
    name: 'AI Career Guidance',
    tagline: 'AI-driven profile evaluation and professional coaching',
    description: 'Intelligent profile scanner providing skill gaps analysis, resume scoring, tailored course recommendations, and job matching scores.',
    features: ['Resume Match Analysis', 'Skills Gap Radar Charts', 'Automated Study Plans', 'Industry Job Matches'],
    screenshots: ['/assets/images/products/ai-career.png'],
    pricing: { type: 'starting', amount: 30000, currency: '₹' },
    category: 'AI Solutions',
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        if (response.data.success && response.data.data.length > 0) {
          setProducts(response.data.data);
        }
      } catch (err) {
        console.warn('Could not fetch products, using static data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 bg-dark bg-grid-pattern relative min-h-screen">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-radial-gradient opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Direct Digital Products
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl text-white leading-tight">
              AI-Powered Digital Products
            </h1>
            <p className="text-text-body mt-4 text-base md:text-xl max-w-2xl mx-auto">
              Explore our ready-to-deploy, customizable software solutions designed to automate workflows and accelerate growth.
            </p>
          </ScrollReveal>
        </div>

        {/* Categories Tab */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mt-12 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(58,107,53,0.3)]'
                    : 'bg-dark-card border-white/[0.06] text-text-body hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ScrollReveal key={product._id} delay={index * 0.1}>
                <Card className="flex flex-col h-full border-white/[0.06] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 overflow-hidden relative group">
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md border border-white/[0.08] px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {product.category}
                  </div>

                  {/* Screenshot Cover */}
                  <div className="relative h-48 bg-dark-card overflow-hidden border-b border-white/[0.06]">
                    <img
                      src={product.screenshots && product.screenshots[0] ? product.screenshots[0] : '/assets/images/products/pms-application.png'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-black text-xl text-white group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-text-muted mt-1 leading-normal italic">
                        "{product.tagline}"
                      </p>
                      <p className="text-sm text-text-body mt-4 leading-relaxed line-clamp-3">
                        {product.description}
                      </p>

                      {/* Features */}
                      <ul className="mt-5 space-y-2">
                        {product.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-text-body">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="text-xs text-text-muted">Pricing starts at</div>
                        <div className="font-heading font-bold text-lg text-white">
                          {product.pricing.currency}{product.pricing.amount?.toLocaleString()}
                        </div>
                      </div>
                      <Link to={`/products/${product._id}`}>
                        <Button variant="outline" size="sm" icon={ArrowRight}>
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
