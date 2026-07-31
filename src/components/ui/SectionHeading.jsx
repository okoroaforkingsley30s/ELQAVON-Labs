import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, description, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 lg:mb-16 ${center ? 'text-center' : ''}`}
    >
      {label && (
        <span className="inline-block font-mono text-xs font-medium tracking-widest uppercase text-primary mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
          {label}
        </span>
      )}
      <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed text-base lg:text-lg mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}