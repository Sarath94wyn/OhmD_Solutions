import { useState } from 'react';
import { Mail, Phone, MessageSquare, Clock, Send, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SOCIAL_LINKS } from '../../utils/constants';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Find social link targets
  const waLink = SOCIAL_LINKS.find((s) => s.name === 'WhatsApp')?.url || '#';
  const mailLink = SOCIAL_LINKS.find((s) => s.name === 'Email')?.url || '#';
  const phoneLink = SOCIAL_LINKS.find((s) => s.name === 'Phone')?.url || '#';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Name, Email, and Message are required');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/api/contact', {
        name,
        email,
        phone,
        subject: subject || 'General Query',
        message,
      });

      if (response.data.success) {
        toast.success('Your message has been sent!');
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-dark">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Let's Build Something Together"
          subtitle="Get in touch to explore service offerings, request custom products, or schedule consultations"
          alignment="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-stretch">
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <ScrollReveal className="space-y-6">
              <h3 className="font-heading font-black text-2xl md:text-3xl text-white">
                Contact Information
              </h3>
              <p className="text-text-body leading-relaxed max-w-sm">
                Have an idea, custom requirement, or operational bottleneck? Get in touch and let\'s build the solution.
              </p>

              {/* Cards Grid */}
              <div className="space-y-4 pt-4">
                {/* Email */}
                <a
                  href={mailLink}
                  className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-primary hover:bg-white/[0.04] transition-all group"
                >
                  <div className="p-3 bg-primary/15 text-primary rounded-xl group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-text-muted">Email Us</div>
                    <div className="text-sm font-medium text-white">hello@ohmdsolutions.com</div>
                  </div>
                </a>

                {/* WhatsApp Chat */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-primary hover:bg-white/[0.04] transition-all group"
                >
                  <div className="p-3 bg-green-500/15 text-green-400 rounded-xl group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-text-muted">Chat on WhatsApp</div>
                    <div className="text-sm font-medium text-white">+91 98765 43210</div>
                  </div>
                </a>

                {/* Call */}
                <a
                  href={phoneLink}
                  className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-primary hover:bg-white/[0.04] transition-all group"
                >
                  <div className="p-3 bg-blue-500/15 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-text-muted">Direct Phone Call</div>
                    <div className="text-sm font-medium text-white">+91 98765 43210</div>
                  </div>
                </a>
              </div>

              {/* Hours / Schedule */}
              <div className="bg-white/[0.02] border border-white/[0.06] p-6 rounded-2xl flex gap-4 mt-6">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-heading font-bold text-white text-sm">Business Operations</h4>
                  <p className="text-xs text-text-muted mt-1 leading-normal">
                    Monday - Saturday: 9:00 AM - 7:00 PM IST<br />
                    Response within 2-4 hours for WhatsApp/Email enquiries.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <Card className="p-8 md:p-10 border-white/[0.06] shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765-43210"
                    />
                    <Input
                      label="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Website development query"
                    />
                  </div>

                  <Input
                    label="Your Message *"
                    type="textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project requirements..."
                    required
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      Your data is stored securely. No spam.
                    </div>
                    <Button
                      type="submit"
                      loading={loading}
                      icon={Send}
                      className="w-full sm:w-auto"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
