import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { appBackend } from '@/api/appBackend';
import { Badge } from '@/components/ui/badge';
import { FALLBACK_PROJECTS } from '@/data/portfolio';

const getProjects = async () => {
  try {
    return await appBackend.entities.Project.list('order', 100);
  } catch {
    return [];
  }
};

export default function PortfolioPreview() {
  const { data: storedProjects = [] } = useQuery({
    queryKey: ['public-projects'],
    queryFn: getProjects,
  });

  const projects = useMemo(() => {
    const published = storedProjects.filter(project => project.published !== false);
    const source = published.length > 0 ? published : FALLBACK_PROJECTS;
    const featured = source.filter(project => project.featured);
    return (featured.length >= 6 ? featured : source).slice(0, 6);
  }, [storedProjects]);

  return (
    <section className="relative overflow-hidden border-t border-white/8 bg-[#020817] py-24 text-white lg:py-32">
      <div className="premium-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <span className="premium-eyebrow border-cyan-300/20 bg-cyan-300/8 text-cyan-200">Selected Work</span>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Technology delivered across industries.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/58">
            From enterprise operations and financial technology to communication, logistics and digital experiences.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id || project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.06, 0.24), duration: 0.5 }}
              className="group overflow-hidden rounded-2xl border border-white/8 bg-white/[0.035]"
            >
              <Link to="/portfolio" className="block h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image_url || (index % 2 === 0 ? '/assets/media/elqavon-systems.webp' : '/assets/media/elqavon-innovation.webp')}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-[#071426]/35 to-transparent" />
                  <Badge className="absolute left-5 top-5 border border-white/12 bg-[#071426]/70 text-[10px] text-white backdrop-blur-xl">
                    {project.category}
                  </Badge>
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-300/70">
                      {project.project_type || 'Delivered project'}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-bold">{project.title}</h3>
                  </div>
                  <p className="line-clamp-3 text-sm leading-relaxed text-white/52">{project.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-all group-hover:gap-3">
                    View portfolio <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            Explore all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

