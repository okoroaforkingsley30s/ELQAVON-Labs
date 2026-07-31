import AdminCrudList from '@/components/admin/AdminCrudList';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'featured', label: 'Featured', render: (val) => val ? '★' : '—' },
  { key: 'order', label: 'Order' },
];

const formFields = [
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug' },
  { key: 'description', label: 'Short Description', type: 'textarea' },
  { key: 'long_description', label: 'Full Description', type: 'textarea' },
  { key: 'icon', label: 'Icon Name' },
  { key: 'category', label: 'Category', type: 'select', options: [
    { value: 'development', label: 'Development' }, { value: 'design', label: 'Design' },
    { value: 'cloud', label: 'Cloud' }, { value: 'ai', label: 'AI' },
    { value: 'consulting', label: 'Consulting' }, { value: 'data', label: 'Data' },
  ]},
  { key: 'featured', label: 'Featured', type: 'switch' },
  { key: 'order', label: 'Order', type: 'number' },
];

export default function AdminServices() {
  return <AdminCrudList entityName="Service" title="Services" columns={columns} formFields={formFields} queryKey="admin-services" />;
}