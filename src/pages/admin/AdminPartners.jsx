import AdminCrudList from '@/components/admin/AdminCrudList';
import { Badge } from '@/components/ui/badge';

const columns = [
  { key: 'name', label: 'Partner' },
  { key: 'category', label: 'Category' },
  { key: 'website_url', label: 'Website' },
  {
    key: 'active',
    label: 'Status',
    render: value => (
      <Badge variant="outline" className={value !== false ? 'border-emerald-500/30 text-emerald-400' : 'text-muted-foreground'}>
        {value !== false ? 'Visible' : 'Hidden'}
      </Badge>
    ),
  },
];

const formFields = [
  { key: 'name', label: 'Partner Name', required: true },
  { key: 'category', label: 'Category', placeholder: 'Technology Partner' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'website_url', label: 'Website URL', type: 'url' },
  { key: 'logo_url', label: 'Partner Logo', type: 'file', accept: 'image/*', folder: 'partners' },
  { key: 'active', label: 'Visible on Website', type: 'switch' },
  { key: 'order', label: 'Display Order', type: 'number' },
];

export default function AdminPartners() {
  return (
    <AdminCrudList
      entityName="Partner"
      title="Partners"
      columns={columns}
      formFields={formFields}
      queryKey="admin-partners"
      defaultValues={{ active: true, order: 0 }}
    />
  );
}
