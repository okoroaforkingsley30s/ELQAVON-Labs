import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Workflow, Landmark, Brain, Cloud, RefreshCw, Boxes, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND } from '@/config/brand';

const SERVICES = [
  {
    icon: Code2,
    title: 'Enterprise Software Development',
    description:
      'Secure, scalable software platforms designed around real organisational processes, user roles and operational requirements.',
    focus: ['Web platforms', 'Desktop systems', 'Mobile applications', 'Backend services'],
  },
  {
    icon: Workflow,
    title: 'ERP and Business Systems',
    description:
      'Integrated systems for workforce management, finance, operations, inventory, procurement, customer management, service delivery and reporting.',
    focus: ['Department workflows', 'Access control', 'Operational reporting', 'Process accountability'],
  },
  {
    icon: Landmark,
    title: 'Fintech Infrastructure',
    description:
      'Payment, card-service and financial technology platforms designed for secure institutional integration and controlled operational environments.',
    focus: ['Institution connectivity', 'Card services', 'Identity workflows', 'Controlled operations'],
  },
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description:
      'AI-enabled tools, intelligent assistants, automation workflows and decision-support systems that improve productivity and service delivery.',
    focus: ['Intelligent assistants', 'Workflow automation', 'Decision support', 'Applied AI'],
  },
  {
    icon: Cloud,
    title: 'Cloud and Systems Integration',
    description:
      'Cloud platforms, APIs, databases and third-party integrations that connect systems and improve information flow.',
    focus: ['Cloud platforms', 'API integration', 'Database engineering', 'Connected services'],
  },
  {
    icon: RefreshCw,
    title: 'Digital Transformation',
    description:
      'Structured modernisation of manual and disconnected business processes into measurable, secure and maintainable digital operations.',
    focus: ['Process discovery', 'Workflow redesign', 'Data visibility', 'Operational adoption'],
  },
  {
    icon: Boxes,
    title: 'Custom Product Engineering',
    description:
      'End-to-end development of digital products from discovery and architecture through implementation, testing, deployment and continuous improvement.',
    focus: ['Product discovery', 'Architecture', 'Implementation', 'Continuous improvement'],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export default function Services() {
  return (
    <div className="pt-20">
      <section className="page-hero relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 grid-pattern opacity-35" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="space-y-6 max-w-4xl">
            <span className="inline-block font-mono text-xs font-medium tracking-widest uppercase text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              Services
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-secondary">
              Engineering Services for Modern Organisations
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-3xl">
              {BRAND.displayName} combines software engineering, operational understanding and integrated technology
              delivery to solve complex institutional and business challenges.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((service, index) => (
              <motion.article
                key={service.title}
                {...fadeUp}
                transition={{ delay: index * 0.06, ...fadeUp.transition }}
                className={`glass rounded-2xl p-7 lg:p-9 ${
                  index === SERVICES.length - 1 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-heading font-bold text-xl text-secondary mt-1">{service.title}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.focus.map(item => (
                        <span key={item} className="px-3 py-1 text-xs rounded-lg bg-muted text-muted-foreground">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-secondary text-secondary-foreground">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
            Need a System Designed Around Your Operations?
          </h2>
          <p className="text-white/70 mt-4 leading-relaxed">
            Tell us what your organisation needs to improve, integrate or build. We will review the requirements and
            recommend the most suitable next step.
          </p>
          <Link to="/contact" className="inline-block mt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-9 py-6 group">
              Start a Project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
