import { motion } from 'framer-motion';
import { DraftingCompass, RefreshCw, SearchCheck } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const APPROACH = [
  {
    icon: SearchCheck,
    step: '01',
    title: 'Understand the operation',
    content:
      'We study the people, controls, information and outcomes behind the requirement before recommending technology.',
  },
  {
    icon: DraftingCompass,
    step: '02',
    title: 'Engineer the system',
    content:
      'Architecture, experience, security and integrations are designed as one maintainable product—not disconnected features.',
  },
  {
    icon: RefreshCw,
    step: '03',
    title: 'Improve with evidence',
    content:
      'Delivery is validated against real operational needs, then strengthened through testing, feedback and responsible iteration.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative border-t border-border/50 py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Engineering Approach"
          title="A Disciplined Path From Problem to Platform"
          description="Clear discovery, coherent engineering and deliberate improvement guide how Elqavon approaches complex technology work."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {APPROACH.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="premium-card flex flex-col p-6 lg:p-8"
            >
              <div className="mb-8 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground/50">{item.step}</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-secondary">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.content}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
