import { motion } from "framer-motion";

export default function CapabilityCard({
  icon: Icon,
  title,
  description,
  services = [],
  index = 0,
  className = "",
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
      }}
      className={`glass rounded-2xl p-7 lg:p-9 ${className}`.trim()}
    >
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          {Icon && <Icon className="w-6 h-6 text-primary" />}
        </div>

        <div className="space-y-4">
          <div>
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h2 className="font-heading font-bold text-xl text-secondary mt-1">
              {title}
            </h2>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {services.map(item => (
              <span
                key={item}
                className="px-3 py-1 text-xs rounded-lg bg-muted text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
