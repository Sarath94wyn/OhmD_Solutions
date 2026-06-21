import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import { PRICING_TIERS } from '../../utils/constants';

export default function PricingSection() {
  return (
    <section className="relative py-24 overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-electric/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Simple, Transparent Pricing"
          subtitle="Choose the perfect plan for your business. No hidden fees, no surprises."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`
                  relative rounded-2xl overflow-hidden h-full
                  ${tier.popular
                    ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-primary/40 shadow-2xl shadow-primary/10'
                    : 'bg-gradient-to-b from-white/[0.04] to-white/[0.01] border-white/[0.08]'
                  }
                  border backdrop-blur-xl
                `}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-electric to-vivid" />
                )}

                <div className="p-8">
                  {tier.popular && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-primary">Most Popular</span>
                    </div>
                  )}

                  <h3 className="font-heading text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-text-muted text-sm mb-6">{tier.description}</p>

                  <div className="mb-8">
                    <span className="font-heading text-4xl font-bold text-white">{tier.price}</span>
                    {tier.price !== 'Custom' && (
                      <span className="text-text-muted text-sm ml-1">starting</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3 text-sm">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-white/20 mt-0.5 shrink-0" />
                        )}
                        <span className={feature.included ? 'text-text-body' : 'text-white/30'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="/contact"
                    variant={tier.popular ? 'primary' : 'outline'}
                    className="w-full"
                    icon={ArrowRight}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
