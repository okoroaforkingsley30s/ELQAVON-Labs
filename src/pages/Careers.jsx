import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ShieldCheck, Lightbulb, Users, Workflow, BookOpen, Wrench, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/ui/SectionHeading';
import JobApplicationModal from '@/components/careers/JobApplicationModal';
import { BRAND } from '@/config/brand';

const CULTURE = [
  { icon: Wrench, title: 'Engineering Discipline', description: 'We value reliable thinking, careful implementation and technology that can be maintained.' },
  { icon: Lightbulb, title: 'Curiosity With Purpose', description: 'We explore new ideas where they can improve products, operations or customer outcomes.' },
  { icon: ShieldCheck, title: 'Responsible Delivery', description: 'Security, privacy and accountability are part of how we approach every system.' },
  { icon: Workflow, title: 'Operational Thinking', description: 'We learn the process behind the problem before proposing a technical solution.' },
  { icon: Users, title: 'Cross-Functional Work', description: 'Engineering, product and operational perspectives come together throughout delivery.' },
  { icon: BookOpen, title: 'Continuous Growth', description: 'We encourage deliberate learning, practical feedback and increasing responsibility.' },
];

const TALENT_AREAS = [
  { title: 'Full-Stack Software Engineering', dept: 'Engineering', type: 'Expression of Interest', location: 'Flexible', remote: true },
  { title: 'Artificial Intelligence Engineering', dept: 'Engineering', type: 'Expression of Interest', location: 'Flexible', remote: true },
  { title: 'Product and Experience Design', dept: 'Product', type: 'Expression of Interest', location: 'Flexible', remote: true },
  { title: 'Cloud and DevOps Engineering', dept: 'Engineering', type: 'Expression of Interest', location: 'Flexible', remote: true },
  { title: 'Product Management', dept: 'Product', type: 'Expression of Interest', location: 'Flexible', remote: true },
  { title: 'Graduate Software Engineering', dept: 'Engineering', type: 'Talent Pipeline', location: 'Flexible', remote: true },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="pt-20">
      <section className="page-hero relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 grid-pattern opacity-35" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="space-y-6 max-w-4xl">
            <span className="inline-block font-mono text-xs font-medium tracking-widest uppercase text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              Careers
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-secondary">
              Build What Comes Next With Us
            </h1>
            <div className="max-w-3xl space-y-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
              <p>
                At {BRAND.displayName}, we are building secure software, enterprise platforms, fintech infrastructure
                and intelligent systems for organisations across Africa and beyond.
              </p>
              <p>
                We are interested in people who combine curiosity with discipline, understand the importance of
                reliable engineering and want their work to solve meaningful operational problems.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12 lg:mb-16 text-center">
            <span className="inline-block font-mono text-xs font-medium tracking-widest uppercase text-accent mb-4 px-3 py-1 rounded-full border border-accent/30 bg-accent/10">
              Our Culture
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-white">
              Working at {BRAND.displayName}
            </h2>
            <p className="mt-4 text-white/65 max-w-2xl leading-relaxed text-base lg:text-lg mx-auto">
              An engineering-led environment shaped by responsibility, thoughtful problem-solving and practical collaboration.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CULTURE.map((item, index) => (
              <motion.article
                key={item.title}
                {...fadeUp}
                transition={{ delay: index * 0.07, ...fadeUp.transition }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <item.icon className="w-6 h-6 text-accent mb-4" />
                <h2 className="font-heading font-bold text-white">{item.title}</h2>
                <p className="text-sm text-white/65 leading-relaxed mt-2">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Talent Areas"
            title="Register Your Interest"
            description="These are capability areas we periodically recruit for. Submission records your interest and does not guarantee that a role is currently open."
          />
          <div className="max-w-4xl mx-auto space-y-3">
            {TALENT_AREAS.map((job, index) => (
              <motion.button
                type="button"
                key={job.title}
                {...fadeUp}
                transition={{ delay: index * 0.06, ...fadeUp.transition }}
                onClick={() => setSelectedJob(job)}
                className="w-full text-left glass rounded-xl p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/25 transition-all duration-300 group"
              >
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.dept}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    {job.remote && <Badge variant="outline" className="border-accent/40 text-accent text-[10px] px-2 py-0">Flexible</Badge>}
                  </div>
                </div>
                <span className="flex items-center gap-2 text-sm font-semibold text-primary shrink-0">
                  Submit Interest
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <JobApplicationModal
        job={selectedJob}
        open={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
      />

      <section className="py-24 border-t border-border/50">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading font-extrabold text-3xl text-secondary">Have a Different Capability?</h2>
          <p className="text-muted-foreground mt-4">
            Contact {BRAND.company} and tell us how your experience could contribute to the systems we are building.
          </p>
          <Link to="/contact" className="inline-block mt-7">
            <Button size="lg" className="px-9 py-6 font-semibold">Get in Touch</Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
