import { motion } from 'framer-motion';

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden ${className}`}>
      <div className="animate-pulse">
        <div className="h-48 bg-white/[0.05]" />
        <div className="p-6 space-y-3">
          <div className="h-4 bg-white/[0.06] rounded-lg w-3/4" />
          <div className="h-3 bg-white/[0.04] rounded-lg w-full" />
          <div className="h-3 bg-white/[0.04] rounded-lg w-2/3" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="animate-pulse space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4">
          {[...Array(cols)].map((_, j) => (
            <div
              key={j}
              className="h-10 bg-white/[0.04] rounded-lg flex-1"
              style={{ width: j === 0 ? '30%' : 'auto' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Loader({ fullPage = false, size = 'md' }) {
  const sizeMap = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeMap[size]} rounded-full border-2 border-white/10 border-t-primary`}
      />
      <p className="text-text-muted text-sm animate-pulse">Loading...</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">{spinner}</div>
  );
}
