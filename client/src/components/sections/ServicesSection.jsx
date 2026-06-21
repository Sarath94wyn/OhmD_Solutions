import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Bot, Globe, Code2, Palette, PenTool, FileText, ArrowRight,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import { SERVICES } from '../../utils/constants';

const iconMap = { Bot, Globe, Code2, Palette, PenTool, FileText };

export default function ServicesSection() {
  return (
    <section className="relative py-24 overflow-hidden" id="services">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive digital solutions tailored to accelerate your business growth with cutting-edge technology."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] || Bot;

            return (
              <ScrollReveal key={service.id} delay={i * 0.1}>
                <Card className="p-6 h-full group">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                      border: `1px solid ${service.color}30`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: service.color }} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted text-sm mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Sub-services list */}
                  <ul className="space-y-2">
                    {service.subServices.slice(0, 4).map((sub) => (
                      <li key={sub} className="flex items-center gap-2 text-sm text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                        {sub}
                      </li>
                    ))}
                    {service.subServices.length > 4 && (
                      <li className="text-xs text-primary">
                        +{service.subServices.length - 4} more services
                      </li>
                    )}
                  </ul>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button href="/contact" variant="outline" icon={ArrowRight}>
            Explore All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
