import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND } from '@/config/brand';
import { COMPANY } from '@/config/company';

const SLIDES = [
  {
    image: '/assets/media/elqavon-hero.webp',
    label: 'ELQAVON / Technology Engineering',
    title: BRAND.tagline,
    description: COMPANY.businessDescription,
    primary: { label: 'Explore Our Solutions', path: '/services' },
    secondary: { label: 'Start a Project', path: '/contact' },
  },
  {
    image: '/assets/media/elqavon-systems.webp',
    label: 'Enterprise Systems / Connected Operations',
    title: 'Turn complex operations into connected systems.',
    description:
      'We engineer secure enterprise platforms, ERP systems and digital workflows around the way organisations actually operate.',
    primary: { label: 'Discover Our Services', path: '/services' },
    secondary: { label: 'Explore ArkOne', path: '/portfolio' },
  },
  {
    image: '/assets/media/elqavon-innovation.webp',
    label: 'Fintech / AI / Digital Infrastructure',
    title: 'Build secure infrastructure for the future.',
    description:
      'From applied AI to fintech and connected digital services, Elqavon brings disciplined engineering to ambitious institutional technology.',
    primary: { label: 'View Our Products', path: '/portfolio' },
    secondary: { label: 'Talk to Engineering', path: '/contact' },
  },
];

const ROTATION_MS = 7000;

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [playing, setPlaying] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const selectSlide = useCallback(index => {
    setActiveSlide((index + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setPlaying(false);
      return undefined;
    }

    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % SLIDES.length);
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [playing, shouldReduceMotion]);

  const slide = SLIDES[activeSlide];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="ELQAVON featured capabilities"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#020817] text-white"
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={slide.image}
            src={slide.image}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: shouldReduceMotion ? 0.01 : 0.9 },
              scale: { duration: shouldReduceMotion ? 0.01 : 7.5, ease: 'linear' },
            }}
            className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.98)_0%,rgba(7,20,38,0.88)_44%,rgba(7,20,38,0.34)_78%,rgba(2,8,23,0.32)_100%)]" />
        <div className="absolute inset-0 premium-grid opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020817] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-36 sm:px-6 lg:px-8 lg:pb-32 lg:pt-44">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-7"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200 sm:text-xs">
                  {slide.label}
                </span>
              </div>

              <h1 className="max-w-4xl font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.35rem]">
                {slide.title}
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg lg:text-xl">
                {slide.description}
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link to={slide.primary.path}>
                  <Button
                    size="lg"
                    className="group h-14 w-full rounded-full bg-white px-7 text-base font-semibold text-secondary hover:bg-white/90 sm:w-auto"
                  >
                    {slide.primary.label}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to={slide.secondary.path}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 w-full rounded-full border-white/25 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur-md hover:bg-white/12 hover:text-white sm:w-auto"
                  >
                    {slide.secondary.label}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2" role="group" aria-label="Select featured slide">
            {SLIDES.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => selectSlide(index)}
                aria-label={`Show slide ${index + 1}: ${item.title}`}
                aria-current={activeSlide === index}
                className={`relative h-1 overflow-hidden rounded-full transition-all duration-500 ${
                  activeSlide === index ? 'w-16 bg-white/25' : 'w-6 bg-white/20 hover:bg-white/40'
                }`}
              >
                {activeSlide === index && (
                  <motion.span
                    key={`${activeSlide}-${playing}`}
                    className="absolute inset-y-0 left-0 bg-accent"
                    initial={{ width: playing ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: playing ? ROTATION_MS / 1000 : 0, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => selectSlide(activeSlide - 1)}
              aria-label="Previous slide"
              className="hero-control"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPlaying(current => !current)}
              aria-label={playing ? 'Pause automatic slides' : 'Play automatic slides'}
              className="hero-control"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-px" />}
            </button>
            <button
              type="button"
              onClick={() => selectSlide(activeSlide + 1)}
              aria-label="Next slide"
              className="hero-control"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <a
        href="#engineering-principles"
        aria-label="Scroll to engineering principles"
        className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-white/45 transition hover:text-white md:flex"
      >
        Explore
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
