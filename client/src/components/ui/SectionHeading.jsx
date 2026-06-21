import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, alignment = 'center', light = false }) {
  return (
    <div className={`mb-16 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
      >
        {title}
      </motion.h2>

      {/* Animated gradient underline */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: alignment === 'center' ? 80 : 60 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-1 rounded-full bg-gradient-to-r from-primary via-electric to-vivid mb-6 ${
          alignment === 'center' ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-text-muted text-lg max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
