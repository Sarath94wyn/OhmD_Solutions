import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle, Mail, Phone, MapPin,
  ArrowRight, Heart, Send,
} from 'lucide-react';
import { NAV_LINKS, SERVICES } from '../../utils/constants';

const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socialIcons = [
  { Icon: LinkedinIcon, href: 'https://linkedin.com/company/ohmd-solutions', label: 'LinkedIn' },
  { Icon: MessageCircle, href: 'https://wa.me/919876543210', label: 'WhatsApp' },
  { Icon: Mail, href: 'mailto:hello@ohmdsolutions.com', label: 'Email' },
  { Icon: Phone, href: 'tel:+919876543210', label: 'Phone' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="relative bg-gradient-to-b from-dark to-[#050508] mt-20">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/assets/images/logo.png" alt="OhmD" className="w-10 h-10 rounded-full" />
              <div>
                <span className="font-heading text-lg font-bold text-white">OhmD</span>
                <span className="font-heading text-lg font-bold text-primary"> Solutions</span>
              </div>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              We build AI-powered digital solutions for modern businesses. From websites to SaaS platforms,
              we help you automate, scale, and grow.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialIcons.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08]
                             flex items-center justify-center text-text-muted
                             hover:text-primary hover:border-primary/30 hover:bg-primary/5
                             transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-muted hover:text-primary text-sm flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <span className="text-text-muted hover:text-primary text-sm cursor-pointer transition-colors">
                    {s.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Contact Info</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                hello@ohmdsolutions.com
              </li>
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                India
              </li>
            </ul>

            {/* Newsletter */}
            <h4 className="font-heading font-semibold text-white mb-3 text-sm">Stay Updated</h4>
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
              className="flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white
                           placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30
                           transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-light transition-colors"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm flex items-center gap-1">
            © 2026 OhmD Solutions. All rights reserved. Made with
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
          <div className="flex gap-6 text-sm text-text-muted">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
