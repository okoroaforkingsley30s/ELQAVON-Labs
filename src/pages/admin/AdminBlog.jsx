import AdminCrudList from '@/components/admin/AdminCrudList';
import { Badge } from '@/components/ui/badge';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'author', label: 'Author' },
  { key: 'published', label: 'Status', render: (val) => (
    <Badge variant="outline" className={val ? 'border-emerald-500/30 text-emerald-400' : 'text-muted-foreground'}>{val ? 'Published' : 'Draft'}</Badge>
  )},
];

const formFields = [
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug' },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { key: 'content', label: 'Content', type: 'textarea' },
  { key: 'category', label: 'Category', type: 'select', options: [
    { value: 'technology', label: 'Technology' }, { value: 'erp', label: 'ERP' },
    { value: 'ai', label: 'AI' }, { value: 'software_engineering', label: 'Software Engineering' },
    { value: 'business_automation', label: 'Business Automation' }, { value: 'cloud', label: 'Cloud' },
    { value: 'cybersecurity', label: 'Cybersecurity' }, { value: 'mobile', label: 'Mobile' },
    { value: 'web', label: 'Web' },
  ]},
  { key: 'author', label: 'Author' },
  { key: 'image_url', label: 'Image URL' },
  { key: 'read_time', label: 'Read Time (min)', type: 'number' },
  { key: 'published', label: 'Published', type: 'switch' },
];

export default function AdminBlog() {
  return <AdminCrudList entityName="BlogPost" title="Blog Posts" columns={columns} formFields={formFields} queryKey="admin-posts" />;
}