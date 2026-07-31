import AdminCrudList from '@/components/admin/AdminCrudList';
import { Badge } from '@/components/ui/badge';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'client', label: 'Client' },
  { key: 'category', label: 'Category' },
  { key: 'published', label: 'Public', render: (val) => (
    <Badge variant="outline" className={val !== false ? 'border-emerald-500/30 text-emerald-400' : 'text-muted-foreground'}>{val !== false ? 'Published' : 'Draft'}</Badge>
  )},
  { key: 'featured', label: 'Featured', render: (val) => val ? '★' : '—' },
];

const formFields = [
  { key: 'title', label: 'Project Title', required: true },
  { key: 'slug', label: 'Slug', placeholder: 'project-name' },
  { key: 'client', label: 'Client' },
  { key: 'project_type', label: 'Project Type', placeholder: 'Enterprise Operations Platform' },
  { key: 'industry', label: 'Industry' },
  { key: 'description', label: 'Short Description', type: 'textarea' },
  { key: 'long_description', label: 'Full Description', type: 'textarea' },
  { key: 'category', label: 'Category', type: 'select', options: [
    { value: 'Enterprise Software', label: 'Enterprise Software' },
    { value: 'Banking & Fintech', label: 'Banking & Fintech' },
    { value: 'Digital Experience', label: 'Digital Experience' },
    { value: 'Logistics Technology', label: 'Logistics Technology' },
    { value: 'Communication Platforms', label: 'Communication Platforms' },
    { value: 'ATM & Self-Service', label: 'ATM & Self-Service' },
  ]},
  { key: 'status', label: 'Status', type: 'select', options: [
    { value: 'completed', label: 'Completed' }, { value: 'live', label: 'Live' },
    { value: 'in_progress', label: 'In Progress' }, { value: 'upcoming', label: 'Upcoming' },
  ]},
  { key: 'image_url', label: 'Project Cover', type: 'file', accept: 'image/*', folder: 'projects' },
  { key: 'logo_url', label: 'Project Logo', type: 'file', accept: 'image/*', folder: 'project-logos' },
  { key: 'video_url', label: 'Project Video or GIF', type: 'file', accept: 'video/mp4,video/webm,image/gif', folder: 'project-motion', buttonLabel: 'Upload MP4, WebM or GIF' },
  { key: 'project_url', label: 'Project Website', type: 'url' },
  { key: 'technologies', label: 'Technologies', type: 'array', placeholder: 'React, Supabase, Automation' },
  { key: 'services', label: 'Services Delivered', type: 'array', placeholder: 'Product Design, Development, Deployment' },
  { key: 'challenges', label: 'Challenges', type: 'textarea' },
  { key: 'solutions', label: 'Solutions', type: 'textarea' },
  { key: 'results', label: 'Results', type: 'textarea' },
  { key: 'year', label: 'Year', type: 'number' },
  { key: 'featured', label: 'Featured', type: 'switch' },
  { key: 'published', label: 'Published on Website', type: 'switch' },
  { key: 'order', label: 'Order', type: 'number' },
];

export default function AdminProjects() {
  return (
    <AdminCrudList
      entityName="Project"
      title="Projects"
      columns={columns}
      formFields={formFields}
      queryKey="admin-projects"
      defaultValues={{ status: 'completed', published: true, featured: false, order: 0 }}
    />
  );
}
