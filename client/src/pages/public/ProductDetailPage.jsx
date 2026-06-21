import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Video, HelpCircle, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';
import ScrollReveal from '../../components/ui/ScrollReveal';

// Static products database for fallback
const STATIC_PRODUCTS = [
  {
    _id: 'prod-parking',
    name: 'Parking Lot Finder',
    tagline: 'Real-time parking space locator and reservation engine',
    description: 'Smart IoT-enabled app to find, reserve, and pay for parking spots instantly. Features map integration, occupancy updates, and smart reservations.',
    features: ['Real-time Occupancy Map', 'Online Slot Booking', 'Razorpay Payment Gateway', 'Admin Dashboard & Reports', 'Push Notifications for Booking Confirmations', 'Integrated Map Navigation Services', 'Intelligent Slot Allocations'],
    screenshots: ['/assets/images/products/parking-lot-finder.png'],
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    pricing: { type: 'starting', amount: 25000, currency: '₹' },
    category: 'Custom Software',
  },
  {
    _id: 'prod-ai-bot',
    name: 'AI Customer Support Bot',
    tagline: '24/7 autonomous user engagement and query resolution agent',
    description: 'Context-aware chatbot trained on your company database to resolve customer queries instantly. Escalates to humans only when necessary.',
    features: ['Custom Knowledgebase Training', 'Multi-channel (Web, WhatsApp)', 'Sentiment Analysis', 'CRM Integration', '24/7 Auto responses', 'Weekly Performance Analytics', 'Custom Tone & Branding Setup'],
    screenshots: ['/assets/images/products/ai-customer-support.png'],
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    pricing: { type: 'starting', amount: 30000, currency: '₹' },
    category: 'AI Solutions',
  },
  {
    _id: 'prod-school',
    name: 'School Management System',
    tagline: 'Unified administrative platform for modern schools',
    description: 'Complete ERP handling admissions, student records, grading, timetables, attendance, teacher tracking, and parent communication.',
    features: ['Gradebook & Attendance', 'Fees Management Gateway', 'Parent/Student Portal', 'Timetable Planner', 'Bus Route Trackers', 'Direct SMS/Email Announcements', 'Teacher Attendance & Payroll modules'],
    screenshots: ['/assets/images/products/school-management.png'],
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    pricing: { type: 'starting', amount: 50000, currency: '₹' },
    category: 'Enterprise ERP',
  },
  {
    _id: 'prod-restaurant',
    name: 'Restaurant POS System',
    tagline: 'High-speed billing, table, and kitchen operations control',
    description: 'Cloud-based point-of-sale featuring custom floor plans, kitchen displays, table reservations, inventory alerts, and daily sales analytics.',
    features: ['Interactive POS Billing', 'Table Management Grid', 'Kitchen Display System', 'Inventory Alerts', 'Split-bill payment options', 'Delivery partner integrations', 'Dynamic QR Code Menu Generator'],
    screenshots: ['/assets/images/products/restaurant-management.png'],
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    pricing: { type: 'starting', amount: 35000, currency: '₹' },
    category: 'Custom Software',
  },
  {
    _id: 'prod-pms',
    name: 'PMS Application',
    tagline: 'End-to-end lease, tenant, and property tracking tool',
    description: 'Property Management System helping owners and brokers track tenant rents, lease timelines, maintenance tickets, and booking occupancy charts.',
    features: ['Tenant Rent Invoicing', 'Maintenance Tickets System', 'Lease Reminders', 'Financial Reports', 'Tenant background check tracking', 'Automated Late Fee Calculations', 'Landlord Payout Reports'],
    screenshots: ['/assets/images/products/pms-application.png'],
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    pricing: { type: 'starting', amount: 45000, currency: '₹' },
    category: 'Custom Software',
  },
  {
    _id: 'prod-ai-career',
    name: 'AI Career Guidance',
    tagline: 'AI-driven profile evaluation and professional coaching',
    description: 'Intelligent profile scanner providing skill gaps analysis, resume scoring, tailored course recommendations, and job matching scores.',
    features: ['Resume Match Analysis', 'Skills Gap Radar Charts', 'Automated Study Plans', 'Industry Job Matches', 'Mock Interview AI Bots', 'LinkedIn Profile Scanners', 'Global Hiring Demand Analysis'],
    screenshots: ['/assets/images/products/ai-career.png'],
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    pricing: { type: 'starting', amount: 30000, currency: '₹' },
    category: 'AI Solutions',
  }
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Enquiry Modal State
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Razorpay Payment Loading
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        if (response.data.success && response.data.data) {
          setProduct(response.data.data);
        } else {
          // Fallback to static matching
          const found = STATIC_PRODUCTS.find((p) => p._id === id);
          setProduct(found || null);
        }
      } catch (err) {
        console.warn('API error, matching static products:', err);
        const found = STATIC_PRODUCTS.find((p) => p._id === id);
        setProduct(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!product) return;
    setPaying(true);

    try {
      // 1. Create order on backend first
      const response = await axios.post('/api/payment/order', {
        amount: product.pricing.amount,
        currency: 'INR',
      });

      if (!response.data.success) {
        toast.error('Failed to initialize transaction order');
        setPaying(false);
        return;
      }

      const { orderId, amount, currency, key, isMock } = response.data;

      // 2. Open Razorpay Checkout modal (or mock if local testing)
      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: 'OhmD Solutions',
        description: `License Setup: ${product.name}`,
        image: '/assets/images/logo.png',
        order_id: isMock ? null : orderId,
        handler: async function (paymentResponse) {
          try {
            // 3. Verify payment signature
            const verifyRes = await axios.post('/api/payment/verify', {
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              isMock: isMock,
            });

            if (verifyRes.data.success) {
              toast.success('Payment Verified! Our setup team will contact you.', { duration: 6000 });
            } else {
              toast.error('Payment verification failed');
            }
          } catch (err) {
            console.error(err);
            toast.error('Payment verification handler crashed');
          }
        },
        prefill: {
          name: 'Sarath',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3A6B35',
        },
      };

      if (isMock) {
        // Mock prompt for test mode checkout
        const mockPaymentId = `pay_mock_${Date.now()}`;
        toast.success(`Mock Payment Triggered! ID: ${mockPaymentId}`);
        setTimeout(async () => {
          await options.handler({
            razorpay_payment_id: mockPaymentId,
          });
          setPaying(false);
        }, 1500);
      } else {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          toast.error('Razorpay SDK failed to load. Are you offline?');
          setPaying(false);
          return;
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setPaying(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment setup crashed');
      setPaying(false);
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Name, Email and Message are required');
      return;
    }
    setSubmitting(true);
    try {
      const response = await axios.post('/api/enquiries', {
        name,
        email,
        phone,
        type: 'product_demo',
        productId: product._id,
        message,
      });

      if (response.data.success) {
        toast.success('Enquiry Submitted Successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setIsEnquiryOpen(false);
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not submit enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-dark pt-32 pb-24 text-center">
        <h2 className="text-3xl text-white">Product Not Found</h2>
        <Link to="/products" className="text-primary mt-4 inline-block hover:underline">
          Back to all products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-dark bg-grid-pattern relative min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal>
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="font-heading font-black text-3xl md:text-5xl text-white mt-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-base md:text-lg text-primary font-medium mt-2 italic leading-relaxed">
                "{product.tagline}"
              </p>
              <p className="text-sm md:text-base text-text-body mt-6 leading-relaxed">
                {product.description}
              </p>
            </ScrollReveal>

            {/* Screenshots Display */}
            <ScrollReveal>
              <div className="glass-card overflow-hidden border-white/[0.06] rounded-3xl mt-8">
                <img
                  src={product.screenshots && product.screenshots[0] ? product.screenshots[0] : '/assets/images/products/pms-application.png'}
                  alt={product.name}
                  className="w-full h-auto object-cover max-h-[400px]"
                />
              </div>
            </ScrollReveal>

            {/* Product Demo Video */}
            {product.demoVideo && (
              <ScrollReveal>
                <div className="mt-8">
                  <h3 className="font-heading font-black text-xl text-white mb-4 flex items-center gap-2">
                    <Video className="text-primary w-5 h-5" /> Video Demonstration Walkthrough
                  </h3>
                  <div className="relative rounded-2xl overflow-hidden glass aspect-video border border-white/[0.06]">
                    <video controls src={product.demoVideo} className="w-full h-full object-cover">
                      Your browser does not support HTML5 video tags.
                    </video>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Pricing & Checkout Side */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <Card className="p-8 border-white/[0.06] bg-gradient-to-br from-dark-card to-dark-surface/35 shadow-xl">
                <div className="text-xs text-text-muted uppercase tracking-wider font-bold">Standard Setup Pricing</div>
                <div className="font-heading font-black text-3xl md:text-4xl text-white mt-3 flex items-baseline gap-1">
                  <span className="text-primary">
                    {product.pricing.currency || '₹'}{product.pricing.amount?.toLocaleString()}
                  </span>
                  <span className="text-text-muted text-sm font-normal"> / one-time license setup</span>
                </div>

                {/* Features List */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-4">
                  <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">What's Included:</h4>
                  <div className="space-y-3">
                    {product.features.map((feat, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs md:text-sm text-text-body">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Purchase/Checkout Buttons */}
                <div className="mt-8 space-y-3">
                  <Button
                    onClick={handlePayment}
                    loading={paying}
                    icon={ShoppingCart}
                    className="w-full justify-center bg-gradient-to-r from-primary to-electric hover:shadow-[0_0_20px_rgba(58,107,53,0.4)]"
                  >
                    Deploy Instantly (Test Mode)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEnquiryOpen(true)}
                    className="w-full justify-center border-white/[0.08] hover:bg-white/5"
                  >
                    Request Live Custom Demo
                  </Button>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-text-muted justify-center">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Secure checkout via Sandbox Payment Engine
                </div>
              </Card>
            </ScrollReveal>

            {/* Help desk */}
            <ScrollReveal>
              <div className="glass p-6 rounded-2xl border-white/[0.06] flex gap-4">
                <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">Need Custom Features?</h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Our pre-built systems are 100% extensible. We can build custom workflows, APIs, or database models on top of these products to match your exact business requirements.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <Modal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        title={`Request Demo - ${product.name}`}
        size="md"
      >
        <form onSubmit={handleEnquirySubmit} className="space-y-5 text-left">
          <Input
            label="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
          <Input
            label="Your Email *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            required
          />
          <Input
            label="WhatsApp Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765-43210"
          />
          <Input
            label="Demo Specifications *"
            type="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please specify your business use case and preferred scheduling dates..."
            required
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.06]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEnquiryOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={submitting}
            >
              Submit Demo Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
