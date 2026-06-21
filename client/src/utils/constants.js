import {
  Bot, Globe, Code2, Palette, PenTool, FileText,
  MessageCircle, Mail, Phone,
  Search, ClipboardList, Layout, Wrench, TestTube, Rocket, HeadphonesIcon,
} from 'lucide-react';

/* ────────────────────────────────────────────
   Services
   ──────────────────────────────────────────── */
export const SERVICES = [
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    icon: 'Bot',
    description: 'Leverage cutting-edge artificial intelligence to automate, predict, and optimize your business operations.',
    subServices: [
      'AI Chatbots & Virtual Assistants',
      'AI-Powered Customer Support',
      'Machine Learning Models',
      'Natural Language Processing',
      'Predictive Analytics',
      'AI Career Guidance Systems',
    ],
    color: '#3A6B35',
  },
  {
    id: 'web-development',
    title: 'Website Development',
    icon: 'Globe',
    description: 'Beautiful, fast, and responsive websites that convert visitors into customers.',
    subServices: [
      'Business Websites',
      'E-Commerce Platforms',
      'Landing Pages',
      'Progressive Web Apps',
      'CMS Development',
      'Website Redesign',
    ],
    color: '#2563EB',
  },
  {
    id: 'software-development',
    title: 'Software Development',
    icon: 'Code2',
    description: 'Custom software solutions tailored to streamline your unique business workflows.',
    subServices: [
      'SaaS Applications',
      'CRM & ERP Systems',
      'School Management Systems',
      'Restaurant POS Systems',
      'Inventory Management',
      'Custom Dashboards',
    ],
    color: '#7C3AED',
  },
  {
    id: 'creative-services',
    title: 'Creative Services',
    icon: 'Palette',
    description: 'Stand out with stunning visuals and compelling content that captures attention.',
    subServices: [
      'Social Media Marketing',
      'Content Creation',
      'Video Production',
      'Ad Campaign Design',
      'SEO Optimization',
      'Email Marketing',
    ],
    color: '#f59e0b',
  },
  {
    id: 'design-services',
    title: 'Design Services',
    icon: 'PenTool',
    description: 'Pixel-perfect designs that blend aesthetics with functionality for memorable experiences.',
    subServices: [
      'UI/UX Design',
      'Logo & Brand Identity',
      'Product Packaging',
      'Print & Banner Design',
      'Motion Graphics',
      'Design Systems',
    ],
    color: '#ec4899',
  },
  {
    id: 'business-documents',
    title: 'Business Documents',
    icon: 'FileText',
    description: 'Professional documents that establish credibility and drive business growth.',
    subServices: [
      'Business Plans',
      'Pitch Decks',
      'Project Proposals',
      'Company Profiles',
      'Financial Reports',
      'Marketing Plans',
    ],
    color: '#06b6d4',
  },
];

/* ────────────────────────────────────────────
   Pricing Tiers
   ──────────────────────────────────────────── */
export const PRICING_TIERS = [
  {
    name: 'Starter',
    price: '₹10,000+',
    description: 'Perfect for small businesses and startups getting started online.',
    features: [
      { text: 'Basic Website (up to 5 pages)', included: true },
      { text: 'Mobile Responsive Design', included: true },
      { text: 'Contact Form Integration', included: true },
      { text: 'Basic SEO Setup', included: true },
      { text: '1 Revision Round', included: true },
      { text: '7-Day Delivery', included: true },
      { text: 'Custom Animations', included: false },
      { text: 'CMS Integration', included: false },
      { text: 'Priority Support', included: false },
    ],
    cta: 'Get Started',
    popular: false,
    color: '#3A6B35',
  },
  {
    name: 'Business',
    price: '₹30,000+',
    description: 'Advanced solutions for growing businesses that need more power.',
    features: [
      { text: 'Advanced Website (up to 15 pages)', included: true },
      { text: 'Mobile Responsive Design', included: true },
      { text: 'Full Branding Package', included: true },
      { text: 'Advanced SEO & Analytics', included: true },
      { text: '3 Revision Rounds', included: true },
      { text: '14-Day Delivery', included: true },
      { text: 'Custom Animations', included: true },
      { text: 'CMS Integration', included: true },
      { text: 'Priority Support', included: false },
    ],
    cta: 'Choose Business',
    popular: true,
    color: '#2563EB',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored AI-powered solutions for enterprises with complex needs.',
    features: [
      { text: 'Full-Stack Web/Mobile App', included: true },
      { text: 'AI & Automation Features', included: true },
      { text: 'SaaS / Custom Software', included: true },
      { text: 'Complete Branding Suite', included: true },
      { text: 'Unlimited Revisions', included: true },
      { text: 'Dedicated Project Manager', included: true },
      { text: 'Custom Integrations', included: true },
      { text: 'Performance Optimization', included: true },
      { text: '24/7 Priority Support', included: true },
    ],
    cta: 'Contact Us',
    popular: false,
    color: '#7C3AED',
  },
];

/* ────────────────────────────────────────────
   Process Steps
   ──────────────────────────────────────────── */
export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Discovery Call',
    icon: 'Search',
    description: 'We understand your business, goals, and vision through an in-depth consultation.',
  },
  {
    step: 2,
    title: 'Requirement Analysis',
    icon: 'ClipboardList',
    description: 'Detailed analysis and documentation of project scope, features, and timeline.',
  },
  {
    step: 3,
    title: 'Design & Planning',
    icon: 'Layout',
    description: 'Creating wireframes, mockups, and architectural plans for your approval.',
  },
  {
    step: 4,
    title: 'Development',
    icon: 'Wrench',
    description: 'Building your solution with modern technologies and best practices.',
  },
  {
    step: 5,
    title: 'Testing & QA',
    icon: 'TestTube',
    description: 'Rigorous testing across devices and scenarios to ensure perfection.',
  },
  {
    step: 6,
    title: 'Launch',
    icon: 'Rocket',
    description: 'Deploying your project live with optimization and monitoring setup.',
  },
  {
    step: 7,
    title: 'Ongoing Support',
    icon: 'HeadphonesIcon',
    description: 'Continuous maintenance, updates, and support to keep you ahead.',
  },
];

/* ────────────────────────────────────────────
   Navigation Links
   ──────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

/* ────────────────────────────────────────────
   Social Links
   ──────────────────────────────────────────── */
export const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/ohmd-solutions' },
  { name: 'WhatsApp', icon: 'MessageCircle', url: 'https://wa.me/919876543210' },
  { name: 'Email', icon: 'Mail', url: 'mailto:hello@ohmdsolutions.com' },
  { name: 'Phone', icon: 'Phone', url: 'tel:+919876543210' },
];

/* ────────────────────────────────────────────
   Calculator Options
   ──────────────────────────────────────────── */
export const CALCULATOR_OPTIONS = {
  serviceTypes: [
    { id: 'website', label: 'Website', basePrice: 10000 },
    { id: 'ai-bot', label: 'AI Chatbot', basePrice: 25000 },
    { id: 'mobile-app', label: 'Mobile App', basePrice: 40000 },
    { id: 'saas', label: 'SaaS Platform', basePrice: 80000 },
    { id: 'uiux', label: 'UI/UX Design', basePrice: 8000 },
    { id: 'branding', label: 'Branding', basePrice: 15000 },
  ],
  complexity: [
    { id: 'basic', label: 'Basic', multiplier: 1, description: 'Simple features, standard design' },
    { id: 'standard', label: 'Standard', multiplier: 2, description: 'Custom features, unique design' },
    { id: 'premium', label: 'Premium', multiplier: 3.5, description: 'Advanced features, AI-powered' },
  ],
};

/* ────────────────────────────────────────────
   Company Stats
   ──────────────────────────────────────────── */
export const COMPANY_STATS = [
  { label: 'Projects', value: 50, suffix: '+' },
  { label: 'Clients', value: 30, suffix: '+' },
  { label: 'Years', value: 5, suffix: '+' },
  { label: 'Satisfaction', value: 100, suffix: '%' },
];

/* ────────────────────────────────────────────
   Admin Sidebar Links
   ──────────────────────────────────────────── */
export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', path: '/admin', icon: 'LayoutDashboard' },
  { label: 'Services', path: '/admin/services', icon: 'Settings' },
  { label: 'Products', path: '/admin/products', icon: 'Package' },
  { label: 'Portfolio', path: '/admin/portfolio', icon: 'Briefcase' },
  { label: 'Enquiries', path: '/admin/enquiries', icon: 'MessageSquare' },
  { label: 'Blog', path: '/admin/blog', icon: 'FileEdit' },
  { label: 'Testimonials', path: '/admin/testimonials', icon: 'Star' },
  { label: 'Contacts', path: '/admin/contacts', icon: 'Users' },
  { label: 'Audit Requests', path: '/admin/audits', icon: 'ClipboardCheck' },
];
