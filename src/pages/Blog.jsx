import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BRAND } from '@/config/brand';

const CATEGORIES = ['All', 'Technology', 'ERP Systems', 'AI', 'Software Engineering', 'Business Automation', 'Cloud', 'Cybersecurity', 'Mobile', 'Web'];

const POSTS = [
  {
    title: 'The Future of Enterprise ERP Systems',
    excerpt: 'How connected ERP platforms and intelligent automation can improve operational visibility, accountability and service delivery.',
    category: 'ERP Systems',
    author: BRAND.displayName,
    readTime: 8,
    date: 'Jan 15, 2025',
  },
  {
    title: 'Building Scalable Microservices Architecture',
    excerpt: 'A practical look at designing maintainable services around clear boundaries, resilient communication and operational requirements.',
    category: 'Software Engineering',
    author: BRAND.displayName,
    readTime: 12,
    date: 'Jan 8, 2025',
  },
  {
    title: 'Generative AI in Business: Beyond the Hype',
    excerpt: 'Practical applications of generative AI in enterprise workflows, from document processing to predictive analytics.',
    category: 'AI',
    author: BRAND.displayName,
    readTime: 10,
    date: 'Dec 28, 2024',
  },
  {
    title: 'Cloud-Native Security: A Zero Trust Approach',
    excerpt: 'Implementing comprehensive security frameworks in cloud infrastructure without compromising developer velocity.',
    category: 'Cybersecurity',
    author: BRAND.displayName,
    readTime: 7,
    date: 'Dec 20, 2024',
  },
  {
    title: 'React Native vs Flutter: Enterprise Perspective',
    excerpt: 'Comparing cross-platform mobile frameworks through the lens of enterprise requirements, maintenance, and scalability.',
    category: 'Mobile',
    author: BRAND.displayName,
    readTime: 9,
    date: 'Dec 12, 2024',
  },
  {
    title: 'Automating Business Processes with AI Agents',
    excerpt: 'How intelligent automation can reduce repetitive work while preserving oversight, accountability and responsible access.',
    category: 'Business Automation',
    author: BRAND.displayName,
    readTime: 6,
    date: 'Dec 5, 2024',
  },
];

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } };

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? POSTS : POSTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-20">
      <section className="page-hero relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp} className="space-y-6 max-w-3xl mx-auto">
            <span className="inline-block font-mono text-xs font-medium tracking-widest uppercase text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5">Blog</span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter">
              Insights From <span className="gradient-text">{BRAND.displayName}</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg">
              Perspectives on enterprise software, fintech infrastructure, artificial intelligence, digital operations
              and the technologies shaping what comes next.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <motion.div {...fadeUp} className="mb-12 flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post, i) => (
              <motion.article
                key={post.title}
                {...fadeUp}
                transition={{ delay: i * 0.08, ...fadeUp.transition }}
                className="group glass rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-500 cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 grid-pattern opacity-20" />
                  <Tag className="w-10 h-10 text-primary/30 relative z-10" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-primary border-primary/20 text-[10px]">{post.category}</Badge>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min read</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
