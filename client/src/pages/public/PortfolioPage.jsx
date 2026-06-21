import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Award } from 'lucide-react';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SectionHeading from '../../components/ui/SectionHeading';
import Loader from '../../components/ui/Loader';
import ScrollReveal from '../../components/ui/ScrollReveal';

// Fallback portfolio data matching seed
const STATIC_PORTFOLIO = [
  {
    _id: 'port-1',
    title: 'Logistics Operations Automation',
    category: 'Application',
    client: 'FastTrack Logistics',
    description: 'We built a custom vehicle allocation dashboard and automated route optimization software using Node.js and MongoDB.',
    images: ['/assets/images/products/logistics-automation.png'],
    results: [
      { metric: 'Reduced manual dispatch work', value: '70%' },
      { metric: 'Optimized travel route efficiency', value: '25%' }
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Mapbox API'],
  },
  {
    _id: 'port-2',
    title: 'Modern B2B Clothing Hub',
    category: 'Website',
    client: 'StitchFashion India',
    description: 'Designed and developed a premium bulk-ordering B2B e-commerce store with high performance styling.',
    images: ['/assets/images/products/clothing-ecommerce.png'],
    results: [
      { metric: 'Increased bulk purchase volume', value: '40%' },
      { metric: 'Boosted load speed score', value: '98%' }
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Razorpay', 'Redux Toolkit'],
  },
  {
    _id: 'port-3',
    title: 'Customer Care Conversational Bot',
    category: 'AI Project',
    client: 'CareFirst Healthcare',
    description: 'Trained a custom LLM customer support assistant integrated directly into WhatsApp and web chat interfaces.',
    images: ['/assets/images/products/ai-customer-support.png'],
    results: [
      { metric: 'Reduced first response times', value: '60%' },
      { metric: 'Lowered overall operations overhead', value: '35%' }
    ],
    technologies: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'React'],
  },
  {
    _id: 'port-4',
    title: 'Fintech Mobile Dashboard Wireframing',
    category: 'UI Design',
    client: 'WealthGrow Corp',
    description: 'Detailed user flow mapping, interaction designs, and prototype design specs for a wealth tracking system.',
    images: ['/assets/images/products/fintech-wireframe.png'],
    results: [
      { metric: 'Enhanced user onboarding score', value: '45%' },
      { metric: 'Positive beta client feedback', value: '92%' }
    ],
    technologies: ['Figma', 'Wireframes', 'Interactive Prototypes', 'Design Systems'],
  }
];

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(STATIC_PORTFOLIO);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get('/api/portfolio');
        if (response.data.success && response.data.data.length > 0) {
          setPortfolio(response.data.data);
        }
      } catch (err) {
        console.warn('API error, matching static portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const categories = ['All', 'Website', 'Application', 'UI Design', 'Marketing', 'AI Project'];

  const filteredPortfolio = activeTab === 'All'
    ? portfolio
    : portfolio.filter((p) => p.category === activeTab);

  return (
    <div className="pt-32 pb-24 bg-dark bg-grid-pattern relative min-h-screen">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial-gradient opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Briefcase className="w-3.5 h-3.5" /> Our Works
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl text-white leading-tight">
              Case Studies & Portfolio
            </h1>
            <p className="text-text-body mt-4 text-base md:text-xl max-w-2xl mx-auto">
              Browse through our successfully launched digital solutions, user designs, and automated frameworks.
            </p>
          </ScrollReveal>
        </div>

        {/* Tab Filters */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mt-12 mb-16">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border cursor-pointer ${
                  activeTab === tab
                    ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(58,107,53,0.3)]'
                    : 'bg-dark-card border-white/[0.06] text-text-body hover:border-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPortfolio.map((project, index) => (
              <ScrollReveal key={project._id} delay={index * 0.1}>
                <Card className="flex flex-col h-full border-white/[0.06] hover:shadow-2xl hover:shadow-primary/5 transition-all overflow-hidden group">
                  {/* Image Cover */}
                  <div className="relative h-64 bg-dark-card overflow-hidden border-b border-white/[0.06]">
                    <img
                      src={project.images && project.images[0] ? project.images[0] : '/assets/images/products/pms-application.png'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-75" />
                    
                    {/* Category Label */}
                    <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                      {project.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-text-muted mb-2">Client: <span className="text-white font-semibold">{project.client}</span></div>
                      <h3 className="font-heading font-black text-2xl text-white group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-body mt-4 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Result metrics */}
                      {project.results && project.results.length > 0 && (
                        <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] grid grid-cols-2 gap-4">
                          {project.results.slice(0, 2).map((res, i) => (
                            <div key={i} className="text-left">
                              <div className="font-heading font-black text-xl md:text-2xl text-primary flex items-center gap-1">
                                <Award className="w-4 h-4" /> {res.value}
                              </div>
                              <div className="text-[10px] md:text-xs text-text-muted mt-1 leading-normal font-medium">
                                {res.metric}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Technologies & Link */}
                    <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-md text-[10px] text-text-body">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="bg-white/[0.03] border border-white/[0.06] px-2 py-1 rounded-md text-[10px] text-text-muted">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      <Link to={`/portfolio/${project._id}`}>
                        <Button variant="outline" size="sm" icon={ArrowRight}>
                          Case Study
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
