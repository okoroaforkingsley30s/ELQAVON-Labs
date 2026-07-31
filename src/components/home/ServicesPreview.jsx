import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Landmark, Cloud, Brain, Workflow, Boxes, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const SERVICES = [
  { icon: Code2, title: 'Enterprise Software', desc: 'Secure, scalable platforms designed around organisational processes and user roles.' },
  { icon: Workflow, title: 'ERP & Business Systems', desc: 'Connected systems for workforce, finance, operations, inventory, service delivery and reporting.' },
  { icon: Landmark, title: 'Fintech Infrastructure', desc: 'Financial technology platforms engineered for secure institutional integration.' },
  { icon: Brain, title: 'Artificial Intelligence', desc: 'Intelligent assistants, automation workflows and decision-support systems.' },
  { icon: Cloud, title: 'Cloud & Integration', desc: 'Cloud platforms, APIs and databases that connect systems and improve information flow.' },
  { icon: Boxes, title: 'Digital Transformation', desc: 'Practical modernisation of manual and disconnected operations.' },
];

export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute -right-40 top-24 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What We Do"
          title="Engineered for Enterprise"
          description="Secure technology shaped around real operational requirements, measurable outcomes and long-term maintainability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="premium-card group h-full p-6 lg:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute right-6 top-5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/services" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-300">
            Explore All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
