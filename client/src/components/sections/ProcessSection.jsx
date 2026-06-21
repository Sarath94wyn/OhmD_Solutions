import { motion } from 'framer-motion';
import {
  Search, ClipboardList, Layout, Wrench, TestTube, Rocket, Headphones,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { PROCESS_STEPS } from '../../utils/constants';

const iconMap = {
  Search, ClipboardList, Layout, Wrench, TestTube, Rocket, HeadphonesIcon: Headphones,
};

export default function ProcessSection() {
  return (
    <section className="relative py-24 overflow-hidden" id="process">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-surface/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Process"
          subtitle="A streamlined 7-step approach that ensures exceptional results every time."
        />

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative flex items-start justify-between">
            {/* Connecting line */}
            <div className="absolute top-8 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-primary via-electric to-vivid opacity-30" />

            {PROCESS_STEPS.map((step, i) => {
              const Icon = iconMap[step.icon] || Search;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center w-[13%] relative"
                >
                  {/* Step circle */}
                  <motion.div
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="relative z-10 w-16 h-16 rounded-2xl bg-dark-card border border-white/10
                             flex items-center justify-center mb-4 group cursor-pointer
                             hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <Icon className="w-6 h-6 text-primary" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white
                                   text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </motion.div>

                  <h4 className="font-heading text-sm font-semibold text-white mb-1">{step.title}</h4>
                  <p className="text-text-muted text-xs leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-dark-card border border-primary/30
                               flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-primary/30 to-transparent" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-xs text-primary font-semibold">Step {step.step}</span>
                  <h4 className="font-heading font-semibold text-white mb-1">{step.title}</h4>
                  <p className="text-text-muted text-sm">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
