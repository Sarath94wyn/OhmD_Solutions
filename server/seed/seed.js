const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Import models
const Admin = require('../models/Admin');
const Service = require('../models/Service');
const Product = require('../models/Product');
const Portfolio = require('../models/Portfolio');
const Testimonial = require('../models/Testimonial');
const BlogPost = require('../models/BlogPost');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Service.deleteMany({}),
      Product.deleteMany({}),
      Portfolio.deleteMany({}),
      Testimonial.deleteMany({}),
      BlogPost.deleteMany({}),
    ]);
    console.log('Existing data cleared.');

    // ========== 1. Admin ==========
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@ohmd.in',
      password: 'admin123',
    });
    console.log(`Admin created: ${admin.email}`);

    // ========== 2. Services (6) ==========
    const services = await Service.insertMany([
      {
        title: 'AI Solutions',
        description:
          'Transform your business with cutting-edge artificial intelligence solutions. From intelligent chatbots to predictive analytics, we build AI that drives results.',
        icon: 'Brain',
        order: 1,
        subServices: [
          { name: 'AI Chatbots', description: 'Custom conversational AI for customer support and engagement' },
          { name: 'Machine Learning Models', description: 'Predictive analytics and data-driven decision making' },
          { name: 'Natural Language Processing', description: 'Text analysis, sentiment detection, and language understanding' },
          { name: 'Computer Vision', description: 'Image recognition and visual data processing solutions' },
        ],
      },
      {
        title: 'Website Development',
        description:
          'Build stunning, high-performance websites that captivate visitors and convert them into customers. Modern designs with seamless user experience.',
        icon: 'Globe',
        order: 2,
        subServices: [
          { name: 'Corporate Websites', description: 'Professional business websites with modern design' },
          { name: 'E-commerce Stores', description: 'Full-featured online stores with payment integration' },
          { name: 'Landing Pages', description: 'High-converting landing pages for campaigns' },
          { name: 'Progressive Web Apps', description: 'Fast, reliable web apps that work offline' },
        ],
      },
      {
        title: 'Software Development',
        description:
          'Custom software solutions tailored to your unique business needs. From enterprise applications to SaaS platforms, we build scalable software.',
        icon: 'Code',
        order: 3,
        subServices: [
          { name: 'Custom Applications', description: 'Bespoke software solutions for your workflows' },
          { name: 'SaaS Development', description: 'Scalable cloud-based software platforms' },
          { name: 'API Development', description: 'RESTful and GraphQL API design and implementation' },
          { name: 'Mobile Applications', description: 'Cross-platform mobile apps for iOS and Android' },
        ],
      },
      {
        title: 'Creative Services',
        description:
          'Make your brand stand out with creative services that tell your story. From video production to content strategy, we bring your vision to life.',
        icon: 'Palette',
        order: 4,
        subServices: [
          { name: 'Video Production', description: 'Professional video content for marketing and branding' },
          { name: 'Content Writing', description: 'SEO-optimized blogs, articles, and copywriting' },
          { name: 'Social Media Management', description: 'Strategic social media presence and campaigns' },
          { name: 'Motion Graphics', description: 'Eye-catching animations and visual effects' },
        ],
      },
      {
        title: 'Design Services',
        description:
          'User-centered design that creates memorable digital experiences. Beautiful interfaces paired with intuitive interactions.',
        icon: 'PenTool',
        order: 5,
        subServices: [
          { name: 'UI/UX Design', description: 'User interface and experience design for web and mobile' },
          { name: 'Brand Identity', description: 'Logo design, brand guidelines, and visual identity' },
          { name: 'Graphic Design', description: 'Marketing materials, presentations, and print design' },
          { name: 'Wireframing & Prototyping', description: 'Interactive prototypes and user flow mapping' },
        ],
      },
      {
        title: 'Business Documents',
        description:
          'Professional business documentation services to support your operations. From proposals to technical documentation, we ensure clarity and professionalism.',
        icon: 'FileText',
        order: 6,
        subServices: [
          { name: 'Business Proposals', description: 'Persuasive proposals that win contracts' },
          { name: 'Technical Documentation', description: 'Clear and comprehensive technical docs' },
          { name: 'Pitch Decks', description: 'Investor-ready presentation decks' },
          { name: 'Reports & Analytics', description: 'Data-driven business reports and analytics summaries' },
        ],
      },
    ]);
    console.log(`${services.length} services created.`);

    // ========== 3. Products (6) ==========
    const products = await Product.insertMany([
      {
        name: 'Parking Lot Finder',
        tagline: 'Find parking spots in real-time with AI',
        description:
          'An AI-powered application that helps drivers find available parking spots in real-time. Uses computer vision and IoT sensors to monitor parking lot occupancy and guide users to the nearest available spot.',
        features: [
          'Real-time parking availability',
          'AI-powered spot detection',
          'Navigation to nearest spot',
          'Reservation system',
          'Payment integration',
          'Analytics dashboard',
        ],
        screenshots: ['/assets/images/products/parking-lot-finder.png'],
        category: 'AI Application',
        pricing: { type: 'starting', amount: 50000, currency: '₹' },
      },
      {
        name: 'AI Customer Support Bot',
        tagline: 'Never miss a customer query again',
        description:
          'An intelligent customer support chatbot that handles queries 24/7. Powered by natural language processing, it understands context, provides accurate responses, and seamlessly escalates complex issues to human agents.',
        features: [
          '24/7 automated support',
          'Multi-language support',
          'Context-aware conversations',
          'Seamless human handoff',
          'Analytics & insights',
          'Custom training on your data',
        ],
        screenshots: ['/assets/images/products/ai-customer-support.png'],
        category: 'AI Application',
        pricing: { type: 'starting', amount: 30000, currency: '₹' },
      },
      {
        name: 'School Management System',
        tagline: 'Complete school administration made simple',
        description:
          'A comprehensive school management system that digitizes attendance, grades, fees, timetables, and parent communication. Simplify school administration with one powerful platform.',
        features: [
          'Student & staff management',
          'Attendance tracking',
          'Grade & report cards',
          'Fee management',
          'Timetable scheduling',
          'Parent portal & notifications',
        ],
        screenshots: ['/assets/images/products/school-management.png'],
        category: 'SaaS',
        pricing: { type: 'starting', amount: 75000, currency: '₹' },
      },
      {
        name: 'Restaurant Management System',
        tagline: 'Streamline your restaurant operations',
        description:
          'End-to-end restaurant management solution covering table reservations, order management, kitchen display, inventory tracking, and billing. Boost efficiency and enhance dining experience.',
        features: [
          'Table reservation system',
          'Digital menu & ordering',
          'Kitchen display system',
          'Inventory management',
          'Billing & POS',
          'Customer feedback system',
        ],
        screenshots: ['/assets/images/products/restaurant-management.png'],
        category: 'SaaS',
        pricing: { type: 'starting', amount: 60000, currency: '₹' },
      },
      {
        name: 'PMS Application',
        tagline: 'Project management, simplified',
        description:
          'A powerful project management system designed for teams of all sizes. Track tasks, manage resources, monitor timelines, and collaborate effectively with built-in communication tools.',
        features: [
          'Task & project tracking',
          'Team collaboration',
          'Gantt charts & timelines',
          'Resource allocation',
          'Time tracking',
          'Reports & analytics',
        ],
        screenshots: ['/assets/images/products/pms-application.png'],
        category: 'SaaS',
        pricing: { type: 'starting', amount: 40000, currency: '₹' },
      },
      {
        name: 'AI Career',
        tagline: 'Your AI-powered career companion',
        description:
          'An AI-driven career guidance platform that analyzes skills, suggests learning paths, matches job opportunities, and provides personalized career roadmaps. Built for students and professionals.',
        features: [
          'Skill assessment & analysis',
          'Personalized learning paths',
          'Job matching algorithm',
          'Resume builder with AI',
          'Interview preparation',
          'Career roadmap generator',
        ],
        screenshots: ['/assets/images/products/ai-career.png'],
        category: 'AI Application',
        pricing: { type: 'starting', amount: 45000, currency: '₹' },
      },
    ]);
    console.log(`${products.length} products created.`);

    // ========== 4. Portfolio (5) ==========
    const portfolioItems = await Portfolio.insertMany([
      {
        title: 'E-commerce Platform for Fashion Brand',
        category: 'Website',
        client: 'StyleVogue India',
        description:
          'Designed and developed a complete e-commerce platform for a leading fashion brand. The platform features an AI-powered recommendation engine, virtual try-on capability, and seamless payment integration.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'TensorFlow'],
        results: [
          { metric: 'Sales Increase', value: '150%' },
          { metric: 'Page Load Time', value: '1.2s' },
          { metric: 'Customer Retention', value: '45% improvement' },
          { metric: 'Mobile Conversions', value: '200% increase' },
        ],
        images: ['/assets/images/products/clothing-ecommerce.png'],
        isFeatured: true,
      },
      {
        title: 'AI-Powered Healthcare Assistant',
        category: 'AI Project',
        client: 'MedCare Solutions',
        description:
          'Built an intelligent healthcare assistant that helps patients schedule appointments, understand symptoms, and get preliminary health assessments using natural language processing and medical knowledge bases.',
        technologies: ['Python', 'TensorFlow', 'React Native', 'PostgreSQL', 'Docker'],
        results: [
          { metric: 'Patient Satisfaction', value: '92%' },
          { metric: 'Query Resolution', value: '85% automated' },
          { metric: 'Appointment Scheduling', value: '3x faster' },
          { metric: 'Cost Reduction', value: '40%' },
        ],
        images: ['/assets/images/products/healthcare-assistant.png'],
        isFeatured: true,
      },
      {
        title: 'Restaurant Chain Mobile App',
        category: 'Application',
        client: 'FoodieHub',
        description:
          'Developed a cross-platform mobile application for a restaurant chain with 50+ outlets. Features include digital menu, online ordering, table reservation, loyalty rewards, and real-time order tracking.',
        technologies: ['React Native', 'Node.js', 'Firebase', 'Razorpay', 'Redis'],
        results: [
          { metric: 'App Downloads', value: '100K+ in 3 months' },
          { metric: 'Online Orders', value: '300% increase' },
          { metric: 'Average Rating', value: '4.7 stars' },
          { metric: 'Customer Repeat Rate', value: '65%' },
        ],
        images: ['/assets/images/products/restaurant-management.png'],
        isFeatured: true,
      },
      {
        title: 'Brand Identity & Website for Tech Startup',
        category: 'UI Design',
        client: 'NexaFlow Technologies',
        description:
          'Created a complete brand identity including logo, color palette, typography, and brand guidelines. Designed and built a modern marketing website with animated micro-interactions and lead generation system.',
        technologies: ['Figma', 'React', 'GSAP', 'Tailwind CSS', 'Next.js'],
        results: [
          { metric: 'Brand Recall', value: '78% improvement' },
          { metric: 'Lead Generation', value: '250% increase' },
          { metric: 'Bounce Rate', value: 'Reduced by 55%' },
          { metric: 'Time on Site', value: '4.2 minutes avg' },
        ],
        images: ['/assets/images/products/fintech-wireframe.png'],
        isFeatured: false,
      },
      {
        title: 'Digital Marketing Campaign for Education Platform',
        category: 'Marketing',
        client: 'LearnSphere Academy',
        description:
          'Designed and executed a comprehensive digital marketing campaign including SEO optimization, social media strategy, Google Ads management, and content marketing for an online education platform.',
        technologies: ['Google Ads', 'Meta Ads', 'SEO Tools', 'Google Analytics', 'HubSpot'],
        results: [
          { metric: 'Website Traffic', value: '400% increase' },
          { metric: 'Student Enrollment', value: '180% growth' },
          { metric: 'Cost per Acquisition', value: 'Reduced by 60%' },
          { metric: 'Social Media Reach', value: '500K+ monthly' },
        ],
        images: ['/assets/images/products/marketing-campaign.png'],
        isFeatured: true,
      },
    ]);
    console.log(`${portfolioItems.length} portfolio items created.`);

    // ========== 5. Testimonials (5) ==========
    const testimonials = await Testimonial.insertMany([
      {
        clientName: 'Rajesh Sharma',
        company: 'StyleVogue India',
        role: 'CEO & Founder',
        content:
          'OhmD Solutions transformed our online presence completely. Their e-commerce platform boosted our sales by 150% within the first quarter. The AI recommendations feature has been a game-changer for our customers. Truly exceptional work!',
        rating: 5,
      },
      {
        clientName: 'Dr. Priya Menon',
        company: 'MedCare Solutions',
        role: 'Chief Technology Officer',
        content:
          'The healthcare assistant they built for us has revolutionized how we handle patient queries. The AI accuracy is remarkable, and the patient satisfaction scores have never been higher. Professional team with deep technical expertise.',
        rating: 5,
      },
      {
        clientName: 'Amit Patel',
        company: 'FoodieHub',
        role: 'Managing Director',
        content:
          'Our restaurant app crossed 100K downloads in just 3 months! The OhmD team understood our vision perfectly and delivered beyond expectations. The real-time tracking and loyalty system have significantly improved customer retention.',
        rating: 5,
      },
      {
        clientName: 'Sneha Reddy',
        company: 'NexaFlow Technologies',
        role: 'Co-Founder',
        content:
          'From brand identity to website development, OhmD Solutions handled everything with creativity and precision. Our new branding has received incredible feedback, and the website generates 3x more leads than before.',
        rating: 4,
      },
      {
        clientName: 'Vikram Singh',
        company: 'LearnSphere Academy',
        role: 'Head of Marketing',
        content:
          'The digital marketing campaign by OhmD Solutions exceeded all our targets. Website traffic increased by 400%, and student enrollments grew by 180%. Their data-driven approach and transparent reporting made the entire process smooth.',
        rating: 5,
      },
    ]);
    console.log(`${testimonials.length} testimonials created.`);

    // ========== 6. Blog Posts (3) ==========
    const blogPosts = await BlogPost.create([
      {
        title: 'How AI is Transforming Small Businesses in 2026',
        excerpt:
          'Discover how artificial intelligence is leveling the playing field for small businesses. From automated customer support to predictive analytics, AI tools are more accessible than ever.',
        content: `# How AI is Transforming Small Businesses in 2026

Artificial Intelligence is no longer just for tech giants and Fortune 500 companies. In 2026, AI has become incredibly accessible, and small businesses across India are leveraging it to compete with larger enterprises.

## 1. AI-Powered Customer Support

Chatbots powered by large language models can now handle 80% of customer queries without human intervention. For small businesses, this means 24/7 customer support without the cost of a dedicated team.

**Key Benefits:**
- Reduced response time from hours to seconds
- Consistent quality across all interactions
- Cost savings of up to 60% on customer support

## 2. Predictive Analytics for Better Decisions

AI-driven analytics tools can now predict customer behavior, inventory needs, and market trends with remarkable accuracy. Small businesses can make data-driven decisions that were previously only available to companies with dedicated data science teams.

## 3. Personalized Marketing at Scale

AI enables small businesses to create personalized marketing campaigns that target the right audience with the right message. From email marketing to social media, AI tools automate and optimize every step.

## 4. Process Automation

Repetitive tasks like invoicing, scheduling, and data entry can now be fully automated using AI. This frees up valuable time for business owners to focus on growth and strategy.

## Getting Started

The best part? You don't need to be a tech expert to implement AI. Companies like OhmD Solutions specialize in building custom AI solutions tailored to your specific business needs and budget.

**Ready to transform your business with AI? [Contact us](/contact) for a free consultation.**`,
        coverImage: '',
        author: 'OhmD Solutions',
        tags: ['AI', 'Small Business', 'Technology', 'Automation'],
        category: 'Technology',
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: 'Top Website Design Trends to Watch in 2026',
        excerpt:
          'Stay ahead of the curve with these cutting-edge web design trends that are shaping the digital landscape in 2026. From 3D experiences to AI-driven personalization.',
        content: `# Top Website Design Trends to Watch in 2026

The web design landscape continues to evolve at a rapid pace. Here are the most impactful trends shaping how we build websites in 2026.

## 1. Immersive 3D Experiences

WebGL and WebGPU technologies have matured enough to deliver stunning 3D experiences directly in the browser. From interactive product showcases to virtual office tours, 3D is becoming mainstream.

## 2. AI-Driven Personalization

Websites now dynamically adjust their content, layout, and even color schemes based on individual user preferences and behavior patterns. This level of personalization drives engagement and conversion.

## 3. Micro-Interactions & Motion Design

Subtle animations and micro-interactions create a more engaging and intuitive user experience. From button hover effects to page transitions, motion design guides users through the interface.

## 4. Dark Mode by Default

With most operating systems and apps supporting dark mode, websites are now designing dark-first experiences that reduce eye strain and look incredibly modern.

## 5. Voice-First Navigation

Voice search and navigation are becoming standard features. Websites optimized for voice interaction provide a more accessible and convenient experience.

## 6. Sustainable Web Design

Performance-optimized websites that load faster and consume less energy are becoming a priority. Green hosting and efficient code practices reduce the carbon footprint of digital products.

## 7. Glassmorphism & Neomorphism

These design styles continue to evolve with frosted glass effects, soft shadows, and layered interfaces that create depth and visual hierarchy.

**Want a website that follows these trends? [Get in touch](/contact) with our design team today!**`,
        coverImage: '',
        author: 'OhmD Solutions',
        tags: ['Web Design', 'Trends', 'UI/UX', '2026'],
        category: 'Design',
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: 'Digital Marketing Strategies That Actually Work for Indian Startups',
        excerpt:
          'Learn proven digital marketing strategies specifically tailored for Indian startups. From SEO to social media, discover what works in the Indian market.',
        content: `# Digital Marketing Strategies That Actually Work for Indian Startups

The Indian startup ecosystem is booming, but standing out in a crowded market requires smart digital marketing. Here are strategies that deliver real results.

## 1. Regional SEO & Content

India's diversity means one-size-fits-all content doesn't work. Creating region-specific content in local languages can increase your reach by 300%. Focus on:
- Multi-language content strategy
- Local SEO optimization
- Regional social media presence

## 2. WhatsApp Marketing

With over 500 million users in India, WhatsApp is the most powerful marketing channel for Indian businesses. Use WhatsApp Business API for:
- Automated order confirmations
- Product catalogs
- Customer support
- Broadcast campaigns

## 3. Video Content on Instagram & YouTube

Short-form video content on Instagram Reels and YouTube Shorts consistently outperforms other content formats in India. Create:
- Behind-the-scenes content
- Customer testimonials
- Product demos
- Educational content

## 4. Influencer Partnerships

Micro-influencers (10K-100K followers) in specific niches deliver the best ROI for Indian startups. They offer authentic engagement at affordable prices.

## 5. Performance Marketing with Google & Meta

Data-driven performance marketing campaigns with proper tracking and optimization can deliver incredible results. Focus on:
- Retargeting campaigns
- Lookalike audiences
- A/B testing ad creatives
- Landing page optimization

## 6. Content Marketing & Thought Leadership

Building authority through blogs, webinars, and social media thought leadership builds long-term brand value. Consistent, quality content establishes trust.

## Take Action

The key to success is not trying everything at once. Pick 2-3 strategies, execute them consistently, and measure results. Scale what works.

**Need help with your digital marketing strategy? [Book a free consultation](/contact) with our marketing experts.**`,
        coverImage: '',
        author: 'OhmD Solutions',
        tags: ['Digital Marketing', 'Startups', 'SEO', 'India'],
        category: 'Marketing',
        isPublished: true,
        publishedAt: new Date(),
      },
    ]);
    console.log(`${blogPosts.length} blog posts created.`);

    console.log('\n✅ Database seeded successfully!');
    console.log('──────────────────────────────────');
    console.log(`  Admin: admin@ohmd.in / admin123`);
    console.log(`  Services: ${services.length}`);
    console.log(`  Products: ${products.length}`);
    console.log(`  Portfolio: ${portfolioItems.length}`);
    console.log(`  Testimonials: ${testimonials.length}`);
    console.log(`  Blog Posts: ${blogPosts.length}`);
    console.log('──────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Seed Error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

seedData();
