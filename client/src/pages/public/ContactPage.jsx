import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MapPin, Mail, MessageSquare } from 'lucide-react';
import ContactSection from '../../components/sections/ContactSection';
import Card from '../../components/ui/Card';
import ScrollReveal from '../../components/ui/ScrollReveal';

const FAQS = [
  {
    q: 'What is the estimated delivery time for a custom website?',
    a: 'Basic landing pages and business websites are completed in 7-14 days. Custom software databases or multi-page SaaS applications generally take 4-8 weeks, depending on requirements.',
  },
  {
    q: 'Can you integrate AI agents with our existing database/CRM?',
    a: 'Absolutely. We specialize in building custom APIs that connect AI chatbots and customer support automation scripts directly to platforms like Salesforce, HubSpot, or custom MongoDB/SQL systems.',
  },
  {
    q: 'Do you offer monthly maintenance and hosting plans?',
    a: 'Yes, we offer recurring maintenance packages starting at ₹2,000/month. This covers secure cloud hosting, SSL certification, database backups, uptime monitoring, and small content adjustments.',
  },
  {
    q: 'Are your digital solution prices fixed or flexible?',
    a: 'Our starting prices are listed, but we provide customized proposals for every client. The Project Cost Calculator on our home page can give you an instant ballpark estimation.',
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-dark min-h-screen">
      {/* Contact Form Section */}
      <ContactSection />

      {/* Map & FAQs */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Map Column */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <h3 className="font-heading font-black text-2xl md:text-3xl text-white mb-6">
                Our Headquarters
              </h3>
              <Card className="overflow-hidden border-white/[0.06] rounded-3xl h-96 relative">
                {/* Mocking a premium dark theme map */}
                <div className="absolute inset-0 bg-[#0c0c14] flex flex-col justify-center items-center p-6 text-center space-y-4">
                  <div className="p-4 bg-primary/15 text-primary rounded-full">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-lg">OhmD Solutions</h4>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed max-w-sm">
                      Indiranagar Double Road, Bengaluru,<br />
                      Karnataka - 560038, India
                    </p>
                  </div>
                  
                  {/* Styling decoration */}
                  <div className="w-full h-1/3 border-t border-white/[0.06] mt-6 flex justify-around items-center text-xs text-text-muted pt-4">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-white">4.9 / 5</span>
                      <span>Google Rating</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-white">50+</span>
                      <span>Clients Served</span>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {/* FAQs Column */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal>
              <h3 className="font-heading font-black text-2xl md:text-3xl text-white mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-white/[0.06] rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-5 text-left text-white cursor-pointer"
                      >
                        <span className="font-heading font-bold text-sm md:text-base flex items-center gap-3">
                          <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-text-body border-t border-white/[0.06] bg-white/[0.005] leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
