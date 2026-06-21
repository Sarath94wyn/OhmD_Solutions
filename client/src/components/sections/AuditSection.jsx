import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Sparkles, TrendingUp, Cpu, Award } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import ScrollReveal from '../ui/ScrollReveal';

const BENEFITS = [
  {
    icon: Cpu,
    title: 'AI Automation Opportunities',
    desc: 'We identify manual workflows that can be replaced with automated AI agents, saving you hours of work daily.',
  },
  {
    icon: TrendingUp,
    title: 'Conversion Rate Analysis',
    desc: 'A check on how well your current website or online funnel turns visitors into high-paying inquiries.',
  },
  {
    icon: Sparkles,
    title: 'Digital Branding Grade',
    desc: 'An assessment of your online social presence, video strategies, and marketing credibility score.',
  },
  {
    icon: Award,
    title: 'Performance & SEO Benchmarks',
    desc: 'Speed analysis and organic search engine positioning checklist against your primary competitors.',
  },
];

export default function AuditSection() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('E-commerce');
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!businessName || !contactEmail || !contactPhone) {
      toast.error('Please fill in required fields');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/api/audit', {
        businessName,
        industry,
        currentWebsite,
        contactEmail,
        contactPhone,
      });

      if (response.data.success) {
        toast.success('Audit Request Submitted Successfully!');
        setSuccess(true);
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-dark-card/30">
      {/* Glow elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-radial-gradient opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-radial-gradient opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Benefits Info Side */}
          <div className="lg:col-span-6 text-left">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
                <ClipboardCheck className="w-4 h-4" /> Free Lead Magnet
              </div>
              <h2 className="font-heading font-black text-3xl md:text-5xl text-white leading-tight">
                Get a Free AI & Digital Transformation Audit
              </h2>
              <p className="text-text-body mt-4 text-base md:text-lg leading-relaxed max-w-xl">
                Submit your business details and receive a customized PDF report indicating where your company can automate tasks using AI bots, scale user retention, and outrank competitors.
              </p>

              <div className="mt-8 space-y-6">
                {BENEFITS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 p-3 bg-white/[0.03] border border-white/[0.08] text-primary rounded-xl h-fit">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-white text-base md:text-lg">
                          {item.title}
                        </h4>
                        <p className="text-sm text-text-muted mt-1 leading-normal max-w-md">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <Card className="p-8 md:p-10 border-white/[0.06] shadow-2xl relative overflow-hidden">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ClipboardCheck className="text-primary w-8 h-8" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-3">Audit Scheduled!</h3>
                    <p className="text-text-body max-w-sm mx-auto mb-8 text-sm leading-relaxed">
                      We have received your business information. Our team is running a competitor analysis and digital performance scan. We will email the report within 48 hours to <span className="text-primary font-semibold">{contactEmail}</span>.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setBusinessName('');
                        setCurrentWebsite('');
                        setContactEmail('');
                        setContactPhone('');
                        setSuccess(false);
                      }}
                    >
                      Audit Another Business
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-heading text-xl font-extrabold text-white mb-6">
                      Enter Company Specifications
                    </h3>

                    <Input
                      label="Business Name *"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Acme Corp"
                      required
                    />

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-text-body mb-2">Industry Sector</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-base"
                      >
                        <option value="E-commerce">E-commerce / Retail</option>
                        <option value="Healthcare">Healthcare & Wellness</option>
                        <option value="Education">Education & Schooling</option>
                        <option value="Finance">Financial Services</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Hospitality">Hospitality & Food</option>
                        <option value="Technology">Technology & SaaS</option>
                        <option value="Other">Other Sector</option>
                      </select>
                    </div>

                    <Input
                      label="Current Website (optional)"
                      value={currentWebsite}
                      onChange={(e) => setCurrentWebsite(e.target.value)}
                      placeholder="https://mybusiness.com"
                    />

                    <Input
                      label="Contact Email *"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="ceo@mybusiness.com"
                      required
                    />

                    <Input
                      label="Phone / WhatsApp Number *"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765-43210"
                      required
                    />

                    <div className="pt-4">
                      <Button
                        type="submit"
                        loading={loading}
                        className="w-full"
                      >
                        Request Free Audit Report
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
