import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  onClick,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`
        relative rounded-2xl overflow-hidden
        bg-gradient-to-br from-white/[0.05] to-white/[0.02]
        backdrop-blur-xl
        border border-white/[0.08]
        transition-all duration-500
        ${hover ? 'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5' : ''}
        ${glow ? 'animate-pulse-glow' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
