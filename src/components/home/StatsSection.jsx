import { motion } from 'framer-motion';
import { ShieldCheck, Workflow, Blocks, Wrench } from 'lucide-react';

const PRINCIPLES = [
  { icon: ShieldCheck, title: 'Secure by Design', description: 'Security, privacy and responsible access are considered from the beginning.' },
  { icon: Workflow, title: 'Operationally Grounded', description: 'Systems are designed around how organisations and their teams actually work.' },
  { icon: Blocks, title: 'Integrated Delivery', description: 'Software, data, infrastructure and connected services are engineered as one system.' },
  { icon: Wrench, title: 'Built to Evolve', description: 'Maintainability and long-term improvement are part of every product decision.' },
];

export default function StatsSection() {
  return (
    <section id="engineering-principles" className="relative overflow-hidden bg-[#020817] py-16 text-secondary-foreground lg:py-20">
      <div className="absolute inset-0 premium-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.045] p-6 transition duration-500 hover:-translate-y-1 hover:border-accent/30 hover:bg-white/[0.07]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                <principle.icon className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-heading font-bold text-base text-white">{principle.title}</h2>
              <p className="text-sm text-white/65 leading-relaxed mt-2">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
