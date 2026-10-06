import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CAPABILITIES } from '@/config/capabilities';
import CapabilityCard from '@/components/capabilities/CapabilityCard';
import WhyElqavon from '@/components/capabilities/WhyElqavon';

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
              Enterprise Capabilities
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-secondary">
              Enterprise Technology Capabilities
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-3xl">
  ELQAVON delivers enterprise software engineering, technology consulting,
  cloud infrastructure, artificial intelligence, cybersecurity, systems
  integration and digital transformation services that help organizations
  modernize, automate and scale with confidence.
</p>
          </motion.div>
        </div>
      </section>

      <WhyElqavon />

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
  <span className="inline-block font-mono text-xs font-medium tracking-widest uppercase text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
    Our Capabilities
  </span>

  <h2 className="mt-6 font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-secondary">
    Technology Capabilities Built for Enterprise
  </h2>

  <p className="mt-5 text-muted-foreground leading-relaxed text-base lg:text-lg">
    From enterprise software engineering and technology consulting to cloud,
    artificial intelligence, cybersecurity and systems integration, our
    multidisciplinary capabilities help organizations modernize, innovate and
    scale with confidence.
  </p>
</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CAPABILITIES.map((capability, index) => (
              <CapabilityCard
                key={capability.id}
                icon={capability.icon}
                title={capability.title}
                description={capability.description}
                services={capability.services.slice(0, 4)}
                index={index}
                className={index === CAPABILITIES.length - 1 ? 'md:col-span-2' : ''}
              />
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
