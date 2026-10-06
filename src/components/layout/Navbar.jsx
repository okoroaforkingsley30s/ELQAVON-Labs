import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND } from '@/config/brand';
import { NAVIGATION } from '@/config/navigation';
import BrandLogo from '@/components/BrandLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const transparent = location.pathname === '/' && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-expo ${
        transparent
          ? 'border-white/10 bg-[#020817]/35 text-white backdrop-blur-xl'
          : 'border-secondary/10 bg-white/90 text-foreground shadow-[0_12px_40px_rgba(7,20,38,0.08)] backdrop-blur-2xl'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between lg:h-20">
          <Link
            to="/"
            aria-label={`${BRAND.name} home`}
            className={`flex items-center rounded-xl transition ${
              transparent ? 'bg-white/95 px-3 py-2 shadow-lg shadow-black/10' : ''
            }`}
          >
            <BrandLogo eager className="h-auto w-[142px] sm:w-[160px]" />
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {NAVIGATION.map(link => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition ${
                    active
                      ? transparent
                        ? 'text-white'
                        : 'text-primary'
                      : transparent
                        ? 'text-white/68 hover:bg-white/8 hover:text-white'
                        : 'text-muted-foreground hover:bg-secondary/5 hover:text-secondary'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full ${transparent ? 'bg-accent' : 'bg-primary'}`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Link to="/contact">
              <Button className="group h-10 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90">
                Start a Project
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(current => !current)}
            className={`rounded-lg p-2 transition lg:hidden ${
              transparent ? 'text-white hover:bg-white/10' : 'text-secondary hover:bg-secondary/5'
            }`}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            id="mobile-navigation"
            className="overflow-hidden border-t border-secondary/10 bg-white text-foreground shadow-2xl lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {NAVIGATION.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="space-y-2 pt-3">
                <Link to="/contact">
                  <Button className="w-full rounded-xl bg-primary font-semibold text-white">
                    Start a Project
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
