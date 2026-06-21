import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const staticProducts = [
  {
    _id: 'prod-parking',
    name: 'Parking Lot Finder',
    tagline: 'Real-time parking space locator and reservation engine',
    image: '/assets/images/products/parking-lot-finder.png',
    category: 'AI Application',
  },
  {
    _id: 'prod-ai-bot',
    name: 'AI Customer Support',
    tagline: 'Intelligent chatbot that handles customer queries 24/7',
    image: '/assets/images/products/ai-customer-support.png',
    category: 'AI Solutions',
  },
  {
    _id: 'prod-school',
    name: 'School Management System',
    tagline: 'Complete academic management for modern institutions',
    image: '/assets/images/products/school-management.png',
    category: 'Software',
  },
  {
    _id: 'prod-restaurant',
    name: 'Restaurant Management',
    tagline: 'End-to-end restaurant operations and POS solution',
    image: '/assets/images/products/restaurant-management.png',
    category: 'Software',
  },
  {
    _id: 'prod-pms',
    name: 'PMS Application',
    tagline: 'Powerful project management for high-performing teams',
    image: '/assets/images/products/pms-application.png',
    category: 'Software',
  },
  {
    _id: 'prod-ai-career',
    name: 'AI Career Guidance',
    tagline: 'AI-powered career recommendation and planning system',
    image: '/assets/images/products/ai-career.png',
    category: 'AI Solutions',
  },
];

export default function ProductsPreview() {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState(staticProducts);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        if (response.data.success && response.data.data.length > 0) {
          setProducts(response.data.data);
        }
      } catch (err) {
        console.warn('Could not fetch products for preview, using static fallback:', err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener('scroll', checkScroll);
    return () => el?.removeEventListener('scroll', checkScroll);
  }, [products]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-surface/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading
            title="Our Products"
            subtitle="Ready-to-deploy solutions built with modern technology stacks."
            alignment="left"
          />
          <div className="hidden sm:flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white
                         disabled:opacity-30 hover:bg-white/[0.08] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white
                         disabled:opacity-30 hover:bg-white/[0.08] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Scrollable Products */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x"
        >
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[320px] sm:min-w-[360px] snap-start"
            >
              <Link to={`/products/${product._id}`}>
                <div className="glass-card overflow-hidden group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={product.screenshots && product.screenshots[0] ? product.screenshots[0] : product.image || '/assets/images/products/pms-application.png'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium
                                   bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-text-muted text-sm line-clamp-2">{product.tagline}</p>
                    <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium
                                  opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button href="/products" variant="outline" icon={ArrowRight}>
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
