import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, User, Tag, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import ScrollReveal from '../../components/ui/ScrollReveal';

// Fallback database for detail view
const STATIC_PORTFOLIO = [
  {
    _id: 'port-1',
    title: 'Logistics Operations Automation',
    category: 'Application',
    client: 'FastTrack Logistics',
    description: 'We built a custom vehicle allocation dashboard and automated route optimization software using Node.js and MongoDB.',
    images: ['/assets/images/products/pms-application.png'],
    results: [
      { metric: 'Reduced manual dispatch work', value: '70%' },
      { metric: 'Optimized travel route efficiency', value: '25%' }
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Mapbox API'],
    caseStudy: 'Our client was struggling with manual spreadsheet-based booking dispatches, leading to delayed arrivals and fuel waste. We engineered a real-time auto-dispatch algorithm that tracks vehicle location coordinates and maps delivery points dynamically. The resulting admin portal allows dispatchers to manage allocations in a single click.',
    liveUrl: 'https://example.com',
    createdAt: '2026-04-12T10:00:00Z',
  },
  {
    _id: 'port-2',
    title: 'Modern B2B Clothing Hub',
    category: 'Website',
    client: 'StitchFashion India',
    description: 'Designed and developed a premium bulk-ordering B2B e-commerce store with high performance styling.',
    images: ['/assets/images/products/restaurant-management.png'],
    results: [
      { metric: 'Increased bulk purchase volume', value: '40%' },
      { metric: 'Boosted load speed score', value: '98%' }
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Razorpay', 'Redux Toolkit'],
    caseStudy: 'StitchFashion needed a fast, bulk e-commerce platform that allows boutique owners to order garments in sets. We designed a grid selector matrix where users can input quantities of different sizes simultaneously. Integrated with a secure billing checkout, the site load times were optimized to under 1.2s.',
    liveUrl: 'https://example.com',
    createdAt: '2026-05-01T10:00:00Z',
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
    caseStudy: 'To resolve a high load of routine booking requests, we developed a medical context chatbot. It answers common questions about operating times, specialist lists, and schedules by referencing vectors. The system handles 60% of requests completely autonomously, easing burden on live support.',
    liveUrl: 'https://example.com',
    createdAt: '2026-05-18T10:00:00Z',
  },
  {
    _id: 'port-4',
    title: 'Fintech Mobile Dashboard Wireframing',
    category: 'UI Design',
    client: 'WealthGrow Corp',
    description: 'Detailed user flow mapping, interaction designs, and prototype design specs for a wealth tracking system.',
    images: ['/assets/images/products/ai-career.png'],
    results: [
      { metric: 'Enhanced user onboarding score', value: '45%' },
      { metric: 'Positive beta client feedback', value: '92%' }
    ],
    technologies: ['Figma', 'Wireframes', 'Interactive Prototypes', 'Design Systems'],
    caseStudy: 'WealthGrow wanted to simplify mutual funds investment for retail users. We performed extensive user testing to design clean, high-fidelity visual cards showing growth analytics. The interactive Figma designs were fully mapped for transitions and developer specifications.',
    liveUrl: 'https://example.com',
    createdAt: '2026-06-02T10:00:00Z',
  }
];

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/portfolio/${id}`);
        if (response.data.success && response.data.data) {
          setProject(response.data.data);
        } else {
          const found = STATIC_PORTFOLIO.find((p) => p._id === id);
          setProject(found || null);
        }
      } catch (err) {
        console.warn('API error, using static fallback:', err);
        const found = STATIC_PORTFOLIO.find((p) => p._id === id);
        setProject(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-dark pt-32 pb-24 text-center">
        <h2 className="text-3xl text-white">Project Case Study Not Found</h2>
        <Link to="/portfolio" className="text-primary mt-4 inline-block hover:underline">
          Back to all works
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-dark bg-grid-pattern relative min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Link */}
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>

        {/* Project Header */}
        <ScrollReveal>
          <div className="border-b border-white/[0.06] pb-8 mb-8">
            <h1 className="font-heading font-black text-3xl md:text-5xl text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-text-body mt-4 leading-relaxed max-w-3xl">
              {project.description}
            </p>

            {/* Quick Specs Row */}
            <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-text-muted">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> Client: <span className="text-white font-medium">{project.client}</span></span>
              <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-primary" /> Category: <span className="text-white font-medium">{project.category}</span></span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" /> Created: <span className="text-white font-medium">{new Date(project.createdAt).toLocaleDateString()}</span>
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Case Study */}
          <div className="lg:col-span-8 space-y-8">
            {/* Project Image */}
            <ScrollReveal>
              <div className="glass-card overflow-hidden border-white/[0.06] rounded-3xl">
                <img
                  src={project.images && project.images[0] ? project.images[0] : '/assets/images/products/pms-application.png'}
                  alt={project.title}
                  className="w-full h-auto object-cover max-h-[450px]"
                />
              </div>
            </ScrollReveal>

            {/* Full Case Study Text */}
            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="font-heading font-black text-2xl text-white">Project Case Study & Challenge</h3>
                <p className="text-sm md:text-base text-text-body leading-relaxed whitespace-pre-line bg-white/[0.02] border border-white/[0.06] p-6 md:p-8 rounded-3xl">
                  {project.caseStudy || 'No case study details provided for this entry.'}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar Metrics & Specs */}
          <div className="lg:col-span-4 space-y-6">
            {/* Results Card */}
            {project.results && project.results.length > 0 && (
              <ScrollReveal>
                <Card className="p-6 md:p-8 border-white/[0.06] bg-gradient-to-br from-primary/5 to-transparent">
                  <h4 className="font-heading font-black text-sm text-primary uppercase tracking-wider mb-6">
                    Project Performance Results
                  </h4>
                  <div className="space-y-6">
                    {project.results.map((res, index) => (
                      <div key={index} className="text-left border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
                        <div className="font-heading font-black text-3xl md:text-4xl text-white">
                          {res.value}
                        </div>
                        <div className="text-xs text-text-muted mt-1 leading-normal">
                          {res.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {/* Tech Specs */}
            <ScrollReveal>
              <Card className="p-6 md:p-8 border-white/[0.06]">
                <h4 className="font-heading font-black text-sm text-white uppercase tracking-wider mb-4">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-white/[0.03] border border-white/[0.06] px-3.5 py-1.5 rounded-lg text-xs text-text-body font-medium flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {tech}
                    </span>
                  ))}
                </div>

                {project.liveUrl && (
                  <div className="mt-8 pt-6 border-t border-white/[0.06]">
                    <Button
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={ExternalLink}
                      className="w-full justify-center"
                    >
                      Visit Live Project
                    </Button>
                  </div>
                )}
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
