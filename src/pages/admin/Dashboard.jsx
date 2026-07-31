import { useQuery } from '@tanstack/react-query';
import { appBackend } from '@/api/appBackend';
import { Award, Briefcase, FileText, FolderKanban, Handshake, MessageSquare, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } };

function StatCard({ icon: Icon, label, count, color, delay }) {
  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay }} className="glass rounded-xl p-5 hover:border-primary/20 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-mono tracking-wide uppercase">{label}</p>
          <p className="text-3xl font-heading font-bold mt-2">{count}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { data: projects = [] } = useQuery({ queryKey: ['admin-projects'], queryFn: () => appBackend.entities.Project.list() });
  const { data: contacts = [] } = useQuery({ queryKey: ['admin-contacts'], queryFn: () => appBackend.entities.ContactRequest.list() });
  const { data: posts = [] } = useQuery({ queryKey: ['admin-posts'], queryFn: () => appBackend.entities.BlogPost.list() });
  const { data: team = [] } = useQuery({ queryKey: ['admin-team'], queryFn: () => appBackend.entities.TeamMember.list() });
  const { data: services = [] } = useQuery({ queryKey: ['admin-services'], queryFn: () => appBackend.entities.Service.list() });
  const { data: testimonials = [] } = useQuery({ queryKey: ['admin-testimonials'], queryFn: () => appBackend.entities.Testimonial.list() });
  const { data: partners = [] } = useQuery({ queryKey: ['admin-partners'], queryFn: () => appBackend.entities.Partner.list() });
  const { data: certificates = [] } = useQuery({ queryKey: ['admin-certificates'], queryFn: () => appBackend.entities.Certificate.list() });

  const stats = [
    { icon: FolderKanban, label: 'Projects', count: projects.length, color: 'bg-primary/10 text-primary' },
    { icon: MessageSquare, label: 'Contact Requests', count: contacts.length, color: 'bg-emerald-500/10 text-emerald-400' },
    { icon: FileText, label: 'Blog Posts', count: posts.length, color: 'bg-amber-500/10 text-amber-400' },
    { icon: Users, label: 'Team Members', count: team.length, color: 'bg-secondary/10 text-secondary' },
    { icon: Briefcase, label: 'Services', count: services.length, color: 'bg-rose-500/10 text-rose-400' },
    { icon: Star, label: 'Testimonials', count: testimonials.length, color: 'bg-cyan-500/10 text-cyan-400' },
    { icon: Handshake, label: 'Partners', count: partners.length, color: 'bg-violet-500/10 text-violet-400' },
    { icon: Award, label: 'Certificates', count: certificates.length, color: 'bg-blue-500/10 text-blue-400' },
  ];

  const newContacts = contacts.filter(c => c.status === 'new');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading font-bold text-2xl">Welcome Back</h2>
        <p className="text-sm text-muted-foreground mt-1">Here's an overview of your {BRAND.displayName} website dashboard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.05} />
        ))}
      </div>

      {newContacts.length > 0 && (
        <div className="glass rounded-xl p-6 space-y-4">
          <h3 className="font-heading font-semibold">Recent Contact Requests</h3>
          <div className="space-y-2">
            {newContacts.slice(0, 5).map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email} · {c.project_type || 'General'}</p>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">NEW</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
