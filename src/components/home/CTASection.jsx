import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND } from '@/config/brand';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-border/30 bg-gradient-to-br from-[#f5f8ff] via-white to-[#eefcff] py-24 lg:py-32">
      <div className="absolute inset-0 premium-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-3xl mx-auto px-4 text-center space-y-8"
      >
        <span className="premium-eyebrow mx-auto border-primary/15 bg-primary/5 text-primary">Start the conversation</span>
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-[-0.04em] text-secondary">
          Build What Comes Next
        </h2>
        <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
          Partner with {BRAND.displayName} to design secure, intelligent technology for your organisation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-base glow-cyan group">
              Start a Project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/services">
            <Button size="lg" variant="outline" className="border-border/50 hover:bg-muted/50 px-8 py-6 text-base">
              Explore Services
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
