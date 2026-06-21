import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CALCULATOR_OPTIONS } from '../../utils/constants';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import ScrollReveal from '../ui/ScrollReveal';

const FEATURES_LIST = {
  website: [
    { id: 'auth', label: 'User Authentication', price: 10000 },
    { id: 'payment', label: 'Payment Gateway', price: 15000 },
    { id: 'db', label: 'Database Integration', price: 15000 },
    { id: 'cms', label: 'Content Management System', price: 12000 },
    { id: 'seo', label: 'Advanced SEO Setup', price: 5000 },
  ],
  'ai-bot': [
    { id: 'custom-training', label: 'Train on Custom Documents', price: 15000 },
    { id: 'voice', label: 'Voice & Speech Support', price: 20000 },
    { id: 'crm-int', label: 'CRM & Database Integration', price: 18000 },
    { id: 'whatsapp', label: 'WhatsApp / Telegram Channel', price: 10000 },
  ],
  'mobile-app': [
    { id: 'auth', label: 'User Auth & Profiles', price: 12000 },
    { id: 'payment', label: 'In-App Purchases / Payments', price: 18000 },
    { id: 'push', label: 'Push Notifications', price: 8000 },
    { id: 'map', label: 'Maps & Geolocation', price: 15000 },
    { id: 'offline', label: 'Offline Mode Support', price: 20000 },
  ],
  saas: [
    { id: 'multi-tenant', label: 'Multi-Tenant Architecture', price: 30000 },
    { id: 'billing', label: 'Subscription Billing (Razorpay/Stripe)', price: 25000 },
    { id: 'analytics', label: 'Advanced Data Visualizations', price: 20000 },
    { id: 'api-access', label: 'Developer API Access', price: 15000 },
  ],
  uiux: [
    { id: 'wireframes', label: 'Wireframes & User Flows', price: 5000 },
    { id: 'interactive', label: 'High-Fidelity Interactive Prototype', price: 10000 },
    { id: 'assets', label: 'Production Asset Export', price: 4000 },
  ],
  branding: [
    { id: 'logo-variations', label: 'Secondary Logos & Mark Variations', price: 5000 },
    { id: 'guidelines', label: 'Brand Guidelines Document', price: 8000 },
    { id: 'collateral', label: 'Social Media Templates & Mockups', price: 6000 },
  ],
};

export default function CalculatorSection() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('website');
  const [complexity, setComplexity] = useState('basic');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [pricingEstimate, setPricingEstimate] = useState({ min: 10000, max: 25000, timeline: '1-2 weeks' });

  // Lead capture fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    calculatePrice();
  }, [service, complexity, selectedFeatures]);

  const calculatePrice = () => {
    const selectedService = CALCULATOR_OPTIONS.serviceTypes.find((s) => s.id === service);
    const selectedComp = CALCULATOR_OPTIONS.complexity.find((c) => c.id === complexity);

    if (!selectedService || !selectedComp) return;

    let base = selectedService.basePrice;
    let multiplier = selectedComp.multiplier;

    // Calculate features price
    const serviceFeatures = FEATURES_LIST[service] || [];
    const featuresPrice = selectedFeatures.reduce((acc, fId) => {
      const feat = serviceFeatures.find((f) => f.id === fId);
      return acc + (feat ? feat.price : 0);
    }, 0);

    const minAmount = Math.round((base * multiplier) + featuresPrice);
    const maxAmount = Math.round(minAmount * 1.35);

    // Calculate timeline
    let timeline = '1-2 weeks';
    if (service === 'saas' || service === 'mobile-app' || complexity === 'premium') {
      timeline = '6-12 weeks';
    } else if (complexity === 'standard') {
      timeline = '3-5 weeks';
    } else if (service === 'website' && complexity === 'basic') {
      timeline = '1-2 weeks';
    } else {
      timeline = '2-4 weeks';
    }

    setPricingEstimate({ min: minAmount, max: maxAmount, timeline });
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
    setSelectedFeatures([]);
  };

  const toggleFeature = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error('Please fill in all fields');
      return;
    }
    setSubmitting(true);
    try {
      const response = await axios.post('/api/calculator', {
        name,
        email,
        phone,
        serviceType: service,
        complexity,
        features: selectedFeatures,
        minEstimate: pricingEstimate.min,
        maxEstimate: pricingEstimate.max,
        timeline: pricingEstimate.timeline,
      });

      if (response.data.success) {
        toast.success('Quote request sent! Check your email.');
        setStep(3);
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not submit quote. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-dark bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Interactive Project Cost Calculator"
          subtitle="Select details to receive an instant timeline & budget estimate for your project"
          alignment="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7">
            <Card className="p-8 border-white/[0.06] shadow-xl">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Calculator className="text-primary w-5 h-5" /> 1. Project Specifications
                    </h3>

                    {/* Service Type */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-text-body mb-2">Service Category</label>
                      <select
                        value={service}
                        onChange={handleServiceChange}
                        className="w-full bg-dark-card border border-white/[0.08] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-base"
                      >
                        {CALCULATOR_OPTIONS.serviceTypes.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.label} (Starting at ₹{t.basePrice.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Complexity */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-text-body mb-3">Project Complexity</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {CALCULATOR_OPTIONS.complexity.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => setComplexity(c.id)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                              complexity === c.id
                                ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(58,107,53,0.2)]'
                                : 'bg-dark-card border-white/[0.06] hover:border-white/20'
                            }`}
                          >
                            <div className="font-heading font-bold text-white text-sm uppercase tracking-wide">
                              {c.label}
                            </div>
                            <div className="text-xs text-text-muted mt-1 leading-normal">
                              {c.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features checklist */}
                    {FEATURES_LIST[service] && FEATURES_LIST[service].length > 0 && (
                      <div className="mb-8">
                        <label className="block text-sm font-medium text-text-body mb-3">Additional Features</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {FEATURES_LIST[service].map((f) => {
                            const isSelected = selectedFeatures.includes(f.id);
                            return (
                              <div
                                key={f.id}
                                onClick={() => toggleFeature(f.id)}
                                className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-primary/10 border-primary'
                                    : 'bg-dark-card border-white/[0.06] hover:border-white/20'
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded flex items-center justify-center border ${
                                    isSelected
                                      ? 'bg-primary border-primary text-white'
                                      : 'border-white/30 text-transparent'
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-medium text-white">{f.label}</div>
                                  <div className="text-xs text-primary">+₹{f.price.toLocaleString()}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        icon={ArrowRight}
                        className="w-full md:w-auto"
                      >
                        Request Complete Quote
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-heading text-xl font-bold text-white mb-6">
                      2. Submit Request
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <Input
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                      <Input
                        label="Business Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                      <Input
                        label="WhatsApp Phone Number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765-43210"
                        required
                      />

                      <div className="pt-4 flex flex-col md:flex-row gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          icon={ArrowLeft}
                          className="w-full md:w-auto md:order-1"
                        >
                          Modify Details
                        </Button>
                        <Button
                          type="submit"
                          loading={submitting}
                          icon={ArrowRight}
                          className="w-full md:flex-1 md:order-2"
                        >
                          Get Detailed Proposal
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="text-primary w-8 h-8" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-3">Proposal Request Received!</h3>
                    <p className="text-text-body max-w-md mx-auto mb-8">
                      We have sent the detailed estimation breakdown to <span className="text-primary font-medium">{email}</span>. A digital solutions expert will contact you within 24 hours on WhatsApp.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setName('');
                        setEmail('');
                        setPhone('');
                        setSelectedFeatures([]);
                        setStep(1);
                      }}
                    >
                      Calculate New Project
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>

          {/* Pricing Display Side */}
          <div className="lg:col-span-5 h-full">
            <div className="sticky top-28 bg-gradient-to-br from-dark-card to-dark-surface/50 p-8 border border-white/[0.06] rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-primary mb-3">
                  Instant Pricing Summary
                </h4>
                <div className="font-heading font-black text-white text-3xl md:text-4xl mt-3 flex items-baseline gap-1">
                  <span className="text-sm font-medium text-text-muted">Est. Budget:</span>
                  <span className="text-primary">
                    ₹{pricingEstimate.min.toLocaleString()}
                  </span>
                  <span className="text-text-muted text-xl font-normal"> - </span>
                  <span className="text-primary">
                    ₹{pricingEstimate.max.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-text-muted mt-2">
                  *Prices are projections. Submit request for final custom quotation.
                </div>

                <div className="mt-8 space-y-4 border-t border-white/[0.06] pt-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Selected Service:</span>
                    <span className="font-medium text-white capitalize">{service.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Complexity Level:</span>
                    <span className="font-medium text-white capitalize">{complexity}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Estimated Delivery:</span>
                    <span className="font-medium text-primary">{pricingEstimate.timeline}</span>
                  </div>
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-text-muted">Active Add-ons:</span>
                    <span className="font-medium text-white text-right max-w-[200px]">
                      {selectedFeatures.length === 0 ? 'None selected' : `${selectedFeatures.length} feature(s)`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white/[0.02] border border-white/[0.04] p-4 rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div className="text-left text-xs leading-normal">
                  <span className="font-bold text-white block">Includes 3 Months Free Maintenance</span>
                  Our proposals include hosting management, security checking, and monthly backup reports at no extra cost.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
