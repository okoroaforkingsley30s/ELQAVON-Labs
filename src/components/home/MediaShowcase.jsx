import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Pause, Play, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CAPABILITIES = [
  { icon: Workflow, label: 'Connected operations' },
  { icon: ShieldCheck, label: 'Security-led delivery' },
  { icon: Sparkles, label: 'Applied intelligence' },
];

export default function MediaShowcase() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [shouldReduceMotion]);

  const togglePlayback = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#030b18] py-24 text-white lg:py-32">
      <div className="absolute inset-0 premium-grid opacity-25" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-7"
        >
          <span className="premium-eyebrow border-white/15 bg-white/5 text-cyan-300">
            Technology in motion
          </span>
          <div className="space-y-5">
            <h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              One engineering partner. Connected digital capability.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/65 lg:text-lg">
              We bring software, intelligent automation, integration and operational understanding together to build
              technology that works as one dependable system.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {CAPABILITIES.map(item => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white/75"
              >
                <item.icon className="h-3.5 w-3.5 text-accent" />
                {item.label}
              </span>
            ))}
          </div>

          <Link to="/about" className="inline-flex">
            <Button className="group h-12 rounded-full bg-white px-6 text-secondary hover:bg-white/90">
              How we engineer
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-primary/20 blur-[90px]" />
          <div className="media-frame group relative aspect-video overflow-hidden rounded-[1.75rem] border border-white/15 bg-secondary shadow-2xl shadow-black/35">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster="/assets/media/elqavon-hero.webp"
              autoPlay={!shouldReduceMotion}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Abstract ELQAVON technology motion visual"
            >
              <source src="/assets/media/elqavon-motion.webm" type="video/webm" />
              <source src="/assets/media/elqavon-motion.mp4" type="video/mp4" />
              <img src="/assets/media/elqavon-motion.gif" alt="Abstract ELQAVON technology animation" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020817]/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
              ELQAVON / Motion 01
            </div>
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={playing ? 'Pause motion video' : 'Play motion video'}
              className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-px" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
