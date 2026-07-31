import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Award,
  Briefcase,
  FileText,
  FolderKanban,
  Handshake,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Star,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { BRAND } from '@/config/brand';
import BrandLogo from '@/components/BrandLogo';

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
  { icon: Handshake, label: 'Partners', path: '/admin/partners' },
  { icon: Award, label: 'Certificates', path: '/admin/certificates' },
  { icon: Briefcase, label: 'Services', path: '/admin/services' },
  { icon: FileText, label: 'Blog Posts', path: '/admin/blog' },
  { icon: Users, label: 'Team', path: '/admin/team' },
  { icon: MessageSquare, label: 'Contacts', path: '/admin/contacts' },
  { icon: Star, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: Settings, label: 'Careers', path: '/admin/careers' },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark min-h-screen bg-[#020817] text-foreground flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 glass-strong border-r border-border/30 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-5 border-b border-border/30">
            <Link to="/admin" aria-label={`${BRAND.name} admin home`} className="flex items-center gap-2">
              <BrandLogo compact className="h-8 w-8 object-contain" />
              <span className="font-heading font-bold text-sm">{BRAND.displayName} Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {SIDEBAR_ITEMS.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-border/30">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Back to Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="h-16 glass-strong border-b border-border/30 flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-semibold text-sm truncate">
            {SIDEBAR_ITEMS.find(i => i.path === location.pathname)?.label || 'Admin'}
          </h1>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
