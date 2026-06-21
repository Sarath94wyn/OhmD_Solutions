import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import axios from 'axios';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';

const STATIC_TESTIMONIALS = [
  {
    _id: '1',
    clientName: 'Sanjay Sharma',
    company: 'FinTrack Solutions',
    role: 'CEO',
    content: 'OhmD Solutions built our custom CRM platform. The workflow automation they set up reduced our team\'s manual entry work by over 70%. Highly professional!',
    rating: 5,
  },
  {
    _id: '2',
    clientName: 'Rohan Deshmukh',
    company: 'Apex E-commerce',
    role: 'Founder',
    content: 'Our online sales boosted by 40% after launching the new landing pages and branding by OhmD. Their attention to design details is top-notch.',
    rating: 5,
  },
  {
    _id: '3',
    clientName: 'Sarah Jenkins',
    company: 'EduLearn Inc',
    role: 'Product Head',
    content: 'The school management dashboard OhmD Solutions developed is extremely clean and responsive. Our teachers and parents find it very easy to use.',
    rating: 5,
  }
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        if (response.data.success && response.data.data.length > 0) {
          setTestimonials(response.data.data);
        }
      } catch (err) {
        console.warn('Could not fetch testimonials, using defaults:', err);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, testimonials]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  if (!current) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-dark-card/50">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial-gradient opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Real feedback from businesses we've helped grow and automate"
          alignment="center"
        />

        <ScrollReveal>
          <div className="relative mt-16 glass-card p-8 md:p-12 border border-white/[0.06] rounded-3xl shadow-2xl">
            {/* Quote Icon Background */}
            <Quote className="absolute top-8 right-8 w-24 h-24 text-white/[0.02] pointer-events-none" />

            <div className="min-h-[220px] flex flex-col justify-between">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < current.rating ? 'fill-primary text-primary' : 'text-text-muted'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg md:text-xl text-text-body italic leading-relaxed"
                >
                  "{current.content}"
                </motion.p>
              </AnimatePresence>

              {/* Reviewer Details */}
              <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col"
                  >
                    <span className="font-heading font-bold text-white text-base md:text-lg">
                      {current.clientName}
                    </span>
                    <span className="text-sm text-text-muted">
                      {current.role}, <span className="text-primary">{current.company}</span>
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Slider Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-white transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-white transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
