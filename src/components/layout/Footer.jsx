import { Link } from 'react-router-dom';
import { Mail, MapPin, Globe2 } from 'lucide-react';
import NewsletterForm from './NewsletterForm';
import { BRAND } from '@/config/brand';
import { COMPANY } from '@/config/company';
import BrandLogo from '@/components/BrandLogo';

const FOOTER_LINKS = {
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],
  Services: [
    { label: 'Enterprise Software', path: '/services' },
    { label: 'ERP & Business Systems', path: '/services' },
    { label: 'Fintech Infrastructure', path: '/services' },
    { label: 'Artificial Intelligence', path: '/services' },
  ],
  Solutions: [
    { label: 'Cloud Integration', path: '/services' },
    { label: 'Digital Transformation', path: '/services' },
    { label: 'Custom Product Engineering', path: '/services' },
    { label: 'Our Products', path: '/portfolio' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#020817] text-secondary-foreground">
      <div className="absolute inset-0 premium-grid opacity-20" />
      <BrandLogo compact className="pointer-events-none absolute -bottom-24 -right-20 w-80 opacity-[0.035] sm:w-[28rem]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Link
              to="/"
              aria-label={`${BRAND.name} home`}
              className="inline-flex rounded-xl bg-white px-3.5 py-2.5 shadow-xl shadow-black/15"
            >
              <BrandLogo className="h-auto w-40" />
            </Link>
            <p className="text-white/70 text-sm max-w-sm leading-relaxed">
              {COMPANY.businessDescription}
            </p>
            <NewsletterForm />
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">{COMPANY.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-accent" />
                <a href={COMPANY.website} className="hover:text-white transition-colors">{COMPANY.website.replace('https://', '')}</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Engineering from Africa for forward-looking organisations</span>
              </div>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-heading font-semibold text-sm mb-4 text-white">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/65 hover:text-accent transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/60">
            © 2026 {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-white/60">{BRAND.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
