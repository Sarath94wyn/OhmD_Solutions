import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '../../utils/constants';
import Button from '../ui/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-dark-card/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img
                whileHover={{ rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                src="/assets/images/logo.png"
                alt="OhmD Solutions"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <span className="font-heading text-lg font-bold text-white group-hover:text-primary transition-colors">
                  OhmD
                </span>
                <span className="font-heading text-lg font-bold text-primary group-hover:text-white transition-colors">
                  {' '}Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path ||
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative px-4 py-2 group"
                  >
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-text-body hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                    {/* Animated underline */}
                    <motion.span
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-electric rounded-full"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button href="/contact" size="sm" icon={ArrowRight}>
                Free Consultation
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/5 text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-dark-card border-l border-white/[0.08] lg:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center gap-3">
                    <img src="/assets/images/logo.png" alt="OhmD" className="w-8 h-8 rounded-full" />
                    <span className="font-heading font-bold text-white">OhmD Solutions</span>
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/5"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-1 flex-1">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          className={`
                            block px-4 py-3 rounded-xl text-base font-medium transition-all
                            ${isActive
                              ? 'bg-primary/10 text-primary border border-primary/20'
                              : 'text-text-body hover:bg-white/5 hover:text-white'
                            }
                          `}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Mobile CTA */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <Button href="/contact" className="w-full" icon={ArrowRight}>
                    Get Free Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
