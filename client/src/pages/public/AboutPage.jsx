import { Sparkles, CheckCircle, Cpu, Target, Eye } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import AnimatedCounter from '../../components/ui/AnimatedCounter';
import ScrollReveal from '../../components/ui/ScrollReveal';
import Card from '../../components/ui/Card';
import { COMPANY_STATS } from '../../utils/constants';

const CORE_VALUES = [
  {
    icon: Cpu,
    title: 'Innovation-First Solutions',
    desc: 'We integrate cutting-edge AI nodes, language models, and web tools to solve operations problems.',
  },
  {
    icon: Target,
    title: 'Customer-Centric Architecture',
    desc: 'Every layout, feature pipeline, and database schema is optimized to deliver seamless visitor conversion.',
  },
];

const TECH_CATEGORIES = [
  {
    name: 'Frontend Technologies',
    techs: ['React', 'Vite', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux'],
  },
  {
    name: 'Backend & Frameworks',
    techs: ['Node.js', 'Express.js', 'Python', 'Django', 'FastAPI'],
  },
  {
    name: 'Databases & Deployments',
    techs: ['MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Vercel'],
  },
  {
    name: 'AI & Automation',
    techs: ['OpenAI API', 'LangChain', 'TensorFlow', 'n8n', 'Zapier'],
  }
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-dark bg-grid-pattern relative min-h-screen text-left">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-radial-gradient opacity-15 pointer-events-none" />

      {/* Hero Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Our Agency
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl text-white leading-tight">
              About OhmD Solutions
            </h1>
            <p className="text-text-body mt-4 text-base md:text-xl leading-relaxed">
              We engineer state-of-the-art web systems, custom software platforms, and AI automation workflows to scale modern businesses.
            </p>
          </ScrollReveal>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white">
                Who We Are & What We Do
              </h2>
              <p className="text-sm md:text-base text-text-body leading-relaxed">
                OhmD Solutions was established to bridge the gap between complex software engineering and high-performing digital presences. We believe that modern companies shouldn\'t have to deal with fragmented services — which is why we offer a cohesive umbrella covering **Web Design, Custom SaaS Development, AI Agents, and Digital Branding**.
              </p>
              <p className="text-sm md:text-base text-text-body leading-relaxed">
                Whether you are a startup looking to deploy a high-speed landing page, or an enterprise looking to automate customer queries using custom-trained chatbots, we possess the execution skill to deliver solutions on time.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-4">
                {COMPANY_STATS.map((stat, i) => (
                  <Card key={i} className="p-8 text-center border-white/[0.06] bg-white/[0.01]">
                    <div className="font-heading font-black text-4xl md:text-5xl text-primary flex items-center justify-center">
                      <AnimatedCounter from={0} to={stat.value} />
                      <span>{stat.suffix}</span>
                    </div>
                    <div className="text-xs md:text-sm text-text-muted mt-2 font-medium">
                      {stat.label}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <ScrollReveal>
            <Card className="p-8 md:p-10 border-white/[0.06] h-full flex flex-col items-start text-left bg-gradient-to-br from-primary/5 to-transparent">
              <div className="p-3 bg-primary/10 text-primary rounded-xl mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-2xl text-white mb-4">Our Core Mission</h3>
              <p className="text-sm text-text-body leading-relaxed">
                To equip growing businesses with AI-powered, scalable digital platforms that simplify complex operations, automate routine human labor, and drive recurring online revenues.
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal>
            <Card className="p-8 md:p-10 border-white/[0.06] h-full flex flex-col items-start text-left bg-gradient-to-br from-electric/5 to-transparent">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-2xl text-white mb-4">Our Future Vision</h3>
              <p className="text-sm text-text-body leading-relaxed">
                To become the premier global digital transformation agency known for seamlessly bridging raw software engineering with visual elegance and intelligent autonomous automations.
              </p>
            </Card>
          </ScrollReveal>
        </div>

        {/* Tech Stack Grid */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <SectionHeading
              title="Our Technology Arsenal"
              subtitle="The modern, reliable stack we use to engineer high-performance systems"
              alignment="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_CATEGORIES.map((cat, i) => (
              <Card key={i} className="p-6 border-white/[0.06] text-left">
                <h4 className="font-heading font-extrabold text-white text-base md:text-lg mb-4 border-b border-white/[0.06] pb-3">
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-white/[0.03] border border-white/[0.06] text-text-body text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
