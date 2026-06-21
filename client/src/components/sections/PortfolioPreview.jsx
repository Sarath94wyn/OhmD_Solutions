import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const categories = ['All', 'Websites', 'Applications', 'UI Designs', 'Marketing', 'AI Projects'];

const portfolioItems = [
  {
    _id: '1',
    title: 'E-Commerce Platform Redesign',
    category: 'Websites',
    image: '/assets/images/products/clothing-ecommerce.png',
    result: 'Increased conversions by 45%',
    tags: ['React', 'Node.js', 'Stripe'],
  },
  {
    _id: '2',
    title: 'AI-Powered Customer Support Bot',
    category: 'AI Projects',
    image: '/assets/images/products/ai-customer-support.png',
    result: 'Reduced tickets by 60%',
    tags: ['Python', 'TensorFlow', 'NLP'],
  },
  {
    _id: '3',
    title: 'School Management Dashboard',
    category: 'Applications',
    image: '/assets/images/products/school-management.png',
    result: 'Reduced manual work by 70%',
    tags: ['React', 'MongoDB', 'Express'],
  },
  {
    _id: '4',
    title: 'Restaurant Branding Campaign',
    category: 'Marketing',
    image: '/assets/images/products/marketing-campaign.png',
    result: 'Grew social media by 200%',
    tags: ['Figma', 'Illustrator', 'Ads'],
  },
  {
    _id: '5',
    title: 'PMS Mobile App UI',
    category: 'UI Designs',
    image: '/assets/images/products/fintech-wireframe.png',
    result: 'Achieved 95% user satisfaction',
    tags: ['Figma', 'Prototyping', 'UX'],
  },
  {
    _id: '6',
    title: 'AI Career Guidance System',
    category: 'AI Projects',
    image: '/assets/images/products/ai-career.png',
    result: '10K+ career paths mapped',
    tags: ['Python', 'ML', 'React'],
  },
];

export default function PortfolioPreview() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((p) => p.category === activeCategory);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Portfolio"
          subtitle="Explore our latest projects and see how we've helped businesses transform digitally."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white/[0.04] text-text-muted hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to={`/portfolio/${item._id}`}>
                  <div className="glass-card overflow-hidden group cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/50 to-transparent
                                    opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center
                                    opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1.1 }}
                          className="w-14 h-14 rounded-2xl bg-primary/90 backdrop-blur-sm flex items-center justify-center"
                        >
                          <ExternalLink className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>

                      {/* Category badge */}
                      <Badge className="absolute top-4 left-4" color="purple">
                        {item.category}
                      </Badge>
                    </div>

                    <div className="p-6">
                      <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-emerald-400 text-sm font-medium mb-3">📊 {item.result}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] text-text-muted border border-white/[0.06]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-12">
          <Button href="/portfolio" variant="outline" icon={ArrowRight}>
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
