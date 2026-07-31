import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  ShieldCheck,
  Lightbulb,
  Workflow,
  Handshake,
  Globe2,
  Wrench,
  Building2,
  Brain,
  Landmark,
  Cloud,
  Database,
  ArrowRight,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { BRAND } from '@/config/brand';

const VALUES = [
  {
    icon: Wrench,
    title: 'Engineering Excellence',
    description:
      'We approach every product as an engineering responsibility, with attention to security, reliability, scalability and long-term maintainability.',
  },
  {
    icon: Lightbulb,
    title: 'Intelligent Innovation',
    description:
      'We apply emerging technology where it creates measurable operational or customer value, not simply because it is new.',
  },
  {
    icon: ShieldCheck,
    title: 'Security by Design',
    description:
      'Security, privacy and responsible access control are considered throughout the design and development process.',
  },
  {
    icon: Workflow,
    title: 'Operational Understanding',
    description:
      'We study how organisations actually work before designing the systems that support them.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnership',
    description:
      'We build solutions and relationships intended to grow with our clients, their teams and their operating environments.',
  },
  {
    icon: Globe2,
    title: 'African Capability, Global Standard',
    description:
      'We build from Africa with the ambition, engineering discipline and quality expected in global markets.',
  },
];

const TECHNOLOGY_AREAS = [
  { icon: Building2, title: 'Enterprise Software', description: 'Secure platforms designed around organisational processes, controls and roles.' },
  { icon: Brain, title: 'Artificial Intelligence', description: 'Practical intelligent tools for productivity, automation and decision support.' },
  { icon: Workflow, title: 'ERP Systems', description: 'Integrated workflows that connect departments and improve operational visibility.' },
  { icon: Landmark, title: 'Fintech Infrastructure', description: 'Controlled financial technology systems designed for institutional integration.' },
  { icon: Cloud, title: 'Cloud Engineering', description: 'Cloud platforms, APIs and integrations engineered for reliability and scale.' },
  { icon: Database, title: 'Digital Transformation', description: 'Structured modernisation supported by connected data and maintainable systems.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export default function About() {
  return (
    <div className="pt-20">
      <section className="page-hero relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 grid-pattern opacity-35" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-4xl space-y-7">
            <span className="inline-block font-mono text-xs font-medium tracking-widest uppercase text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              About {BRAND.name}
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-secondary">
              Engineering Intelligent Systems for the Future
            </h1>
            <div className="max-w-3xl space-y-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
              <p>
                {BRAND.displayName} is a technology engineering company that designs and develops secure software,
                intelligent business systems and integrated digital infrastructure for organisations preparing for the future.
              </p>
              <p>
                We combine software engineering, operational understanding and digital innovation to solve complex business
                problems. Our work spans enterprise platforms, ERP systems, fintech infrastructure, artificial intelligence,
                cloud solutions and digital transformation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.article {...fadeUp} className="rounded-2xl p-8 lg:p-10 border border-white/10 bg-white/5">
              <Target className="w-7 h-7 text-accent mb-5" />
              <h2 className="font-heading font-bold text-2xl text-white">Our Mission</h2>
              <p className="text-white/70 leading-relaxed mt-4">{BRAND.mission}</p>
            </motion.article>
            <motion.article
              {...fadeUp}
              transition={{ delay: 0.1, ...fadeUp.transition }}
              className="rounded-2xl p-8 lg:p-10 border border-white/10 bg-white/5"
            >
              <Eye className="w-7 h-7 text-accent mb-5" />
              <h2 className="font-heading font-bold text-2xl text-white">Our Vision</h2>
              <p className="text-white/70 leading-relaxed mt-4">{BRAND.vision}</p>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Position"
            title="Technology Built Around Real Operations"
            description="Elqavon works across the systems, infrastructure and intelligent tools organisations need to improve service delivery and prepare for growth."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TECHNOLOGY_AREAS.map((area, index) => (
              <motion.article
                key={area.title}
                {...fadeUp}
                transition={{ delay: index * 0.07, ...fadeUp.transition }}
                className="glass rounded-2xl p-6 lg:p-8"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <area.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{area.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Core Values"
            title="How We Engineer"
            description="Principles that shape our technical decisions, delivery standards and client relationships."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((value, index) => (
              <motion.article
                key={value.title}
                {...fadeUp}
                transition={{ delay: index * 0.07, ...fadeUp.transition }}
                className="glass rounded-2xl p-6 lg:p-8"
              >
                <value.icon className="w-6 h-6 text-accent mb-5" />
                <h3 className="font-heading font-bold text-lg">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{value.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label={BRAND.division}
            title="Products Designed for Institutional Operations"
            description="Our product engineering work includes connected enterprise operations and controlled self-service platforms."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="rounded-2xl bg-secondary text-white p-8 lg:p-10">
              <h3 className="font-heading font-bold text-2xl">{BRAND.products.arkOne}</h3>
              <p className="text-white/70 leading-relaxed mt-4">
                An integrated enterprise operations platform designed to connect departments, standardise workflows,
                improve accountability and give management real-time operational visibility.
              </p>
            </article>
            <article className="rounded-2xl border border-primary/15 bg-primary/5 p-8 lg:p-10">
              <h3 className="font-heading font-bold text-2xl text-secondary">{BRAND.products.arkPay}</h3>
              <p className="text-muted-foreground leading-relaxed mt-4">
                A secure self-service card and identity platform designed to support controlled institutional service
                delivery through integrated software, devices and institution-specific connectivity.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28 border-t border-border/50">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-secondary">Build What Comes Next</h2>
          <p className="text-muted-foreground mt-4">
            Partner with {BRAND.displayName} to design secure, intelligent technology for your organisation.
          </p>
          <Link to="/contact" className="inline-block mt-8">
            <Button size="lg" className="px-9 py-6 font-semibold group">
              Start a Project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
