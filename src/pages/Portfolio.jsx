import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  ShieldCheck,
} from 'lucide-react';
import { appBackend } from '@/api/appBackend';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BRAND } from '@/config/brand';
import { FALLBACK_PROJECTS, PORTFOLIO_CATEGORIES, normalizeProject } from '@/data/portfolio';

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const fetchPublicRecords = async entityName => {
  try {
    return await appBackend.entities[entityName].list('order', 100);
  } catch {
    return [];
  }
};

function ProjectCard({ project, index }) {
  const image = project.image_url || '/assets/media/elqavon-innovation.webp';
  const video = project.video_url || '';
  const isVideo = /\.(mp4|webm)(?:$|[?#])/i.test(video);
  const tags = project.technologies?.slice(0, 3) || [];

  return (
    <motion.article
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: Math.min(index * 0.04, 0.2) }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#071426] shadow-[0_30px_80px_rgba(2,8,23,0.18)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1c33]">
        {video ? (
          isVideo ? (
            <video
              src={video}
              poster={image}
              className="h-full w-full object-cover opacity-72 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={video}
              alt=""
              className="h-full w-full object-cover opacity-72 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
              loading="lazy"
            />
          )
        ) : (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-68 transition duration-700 group-hover:scale-105 group-hover:opacity-82"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-[#071426]/20 to-transparent" />
        <div className="absolute left-5 top-5 flex gap-2">
          <Badge className="border border-white/15 bg-[#071426]/70 text-white backdrop-blur-xl">
            {project.category || 'Technology'}
          </Badge>
          {project.featured && (
            <Badge className="border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 backdrop-blur-xl">
              Featured
            </Badge>
          )}
        </div>
        {project.logo_url && (
          <div className="absolute right-5 top-5 rounded-xl border border-white/15 bg-white/92 p-2.5 shadow-xl">
            <img src={project.logo_url} alt={`${project.title} logo`} className="h-7 max-w-24 object-contain" loading="lazy" />
          </div>
        )}
      </div>

      <div className="space-y-5 p-6 lg:p-7">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/75">
            {project.project_type || 'Delivered Project'}
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-white">{project.title}</h2>
          {project.client && project.client !== project.title && (
            <p className="mt-1 text-xs text-white/42">{project.client}</p>
          )}
        </div>
        <p className="min-h-[72px] text-sm leading-relaxed text-white/62">{project.description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/52">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-white/8 pt-4 text-xs text-white/45">
          <span>{project.year || 'Completed'}</span>
          {project.project_url ? (
            <a
              href={project.project_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-300 transition hover:text-cyan-200"
            >
              View project <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-cyan-300">
              Delivered <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: storedProjects = [] } = useQuery({
    queryKey: ['public-projects'],
    queryFn: () => fetchPublicRecords('Project'),
  });
  const { data: partners = [] } = useQuery({
    queryKey: ['public-partners'],
    queryFn: () => fetchPublicRecords('Partner'),
  });
  const { data: certificates = [] } = useQuery({
    queryKey: ['public-certificates'],
    queryFn: () => fetchPublicRecords('Certificate'),
  });

  const projects = useMemo(() => {
    const published = storedProjects.filter(project => project.published !== false);
    return (published.length > 0 ? published : FALLBACK_PROJECTS).map(normalizeProject);
  }, [storedProjects]);

  const categories = useMemo(() => {
    const available = new Set(projects.map(project => project.category).filter(Boolean));
    return PORTFOLIO_CATEGORIES.filter(category => category === 'All' || available.has(category));
  }, [projects]);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="bg-[#020817] pt-20 text-white">
      <section className="relative overflow-hidden border-b border-white/8 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,.97),rgba(7,20,38,.83),rgba(7,20,38,.44)),url('/assets/media/elqavon-systems.webp')] bg-cover bg-center" />
        <div className="premium-grid absolute inset-0 opacity-55" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-4xl space-y-6">
            <span className="premium-eyebrow border-cyan-300/25 bg-cyan-300/8 text-cyan-200">Selected Work</span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-7xl">
              More Than Products.
              <span className="block bg-gradient-to-r from-[#6f83ff] to-[#35d9ef] bg-clip-text text-transparent">
                A Growing Record of Delivery.
              </span>
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-white/65 lg:text-lg">
              Explore platforms and client engagements delivered across enterprise software, banking, communication,
              logistics and self-service technology.
            </p>
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="font-heading text-3xl font-bold">{projects.length}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/42">Portfolio records</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold">{Math.max(categories.length - 1, 1)}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/42">Technology sectors</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap gap-2" role="list" aria-label="Portfolio filters">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                  activeCategory === category
                    ? 'border-cyan-300/45 bg-cyan-300/12 text-cyan-100'
                    : 'border-white/10 bg-white/[0.025] text-white/52 hover:border-white/20 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id || project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {partners.length > 0 && (
        <section className="border-y border-white/8 bg-[#071426] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-10 max-w-2xl">
              <span className="premium-eyebrow border-white/10 bg-white/[0.035] text-white/55">Partners</span>
              <h2 className="mt-5 font-heading text-3xl font-bold sm:text-4xl">Trusted relationships that strengthen delivery.</h2>
            </motion.div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {partners.filter(partner => partner.active !== false).map(partner => (
                <a
                  key={partner.id}
                  href={partner.website_url || undefined}
                  target={partner.website_url ? '_blank' : undefined}
                  rel={partner.website_url ? 'noreferrer' : undefined}
                  className="flex min-h-32 flex-col items-center justify-center gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-5 text-center transition hover:border-cyan-300/25"
                >
                  {partner.logo_url ? (
                    <img src={partner.logo_url} alt={`${partner.name} logo`} className="max-h-12 max-w-[150px] object-contain" loading="lazy" />
                  ) : (
                    <Building2 className="h-7 w-7 text-cyan-300" />
                  )}
                  <span className="text-sm font-semibold text-white/78">{partner.name}</span>
                  {partner.website_url && <ExternalLink className="h-3.5 w-3.5 text-white/35" />}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {certificates.length > 0 && (
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-10 max-w-2xl">
              <span className="premium-eyebrow border-white/10 bg-white/[0.035] text-white/55">Credentials</span>
              <h2 className="mt-5 font-heading text-3xl font-bold sm:text-4xl">Certificates and professional recognition.</h2>
            </motion.div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {certificates.filter(certificate => certificate.published !== false).map(certificate => (
                <article key={certificate.id} className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
                  {certificate.image_url && !/\.pdf(?:$|[?#])/i.test(certificate.image_url) && (
                    <a href={certificate.image_url} target="_blank" rel="noreferrer" className="mb-5 block overflow-hidden rounded-xl border border-white/8">
                      <img
                        src={certificate.image_url}
                        alt={`${certificate.title} certificate`}
                        className="aspect-[16/10] w-full object-cover"
                        loading="lazy"
                      />
                    </a>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-cyan-300/10 p-3 text-cyan-300">
                      {certificate.image_url ? <ImageIcon className="h-5 w-5" /> : <Award className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold">{certificate.title}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/38">
                        {certificate.issuer || 'Professional credential'}
                        {certificate.year ? ` · ${certificate.year}` : ''}
                      </p>
                      {certificate.description && <p className="mt-4 text-sm leading-relaxed text-white/55">{certificate.description}</p>}
                      {certificate.credential_url && (
                        <a
                          href={certificate.credential_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300"
                        >
                          View credential <ShieldCheck className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {!certificate.credential_url && certificate.image_url && (
                        <a
                          href={certificate.image_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300"
                        >
                          View certificate <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-white/8 bg-[#071426] py-24 lg:py-28">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">Build the Next Project With {BRAND.displayName}</h2>
          <p className="mt-4 text-white/55">
            Tell us what you are building and let us define the right engineering approach for your organisation.
          </p>
          <Link to="/contact" className="mt-8 inline-block">
            <Button size="lg" className="group bg-primary px-9 py-6 font-semibold text-white">
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
