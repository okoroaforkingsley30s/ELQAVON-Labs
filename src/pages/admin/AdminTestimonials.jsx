import AdminCrudList from '@/components/admin/AdminCrudList';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company' },
  { key: 'role', label: 'Role' },
  { key: 'rating', label: 'Rating', render: (val) => '★'.repeat(val || 5) },
  { key: 'featured', label: 'Featured', render: (val) => val ? '★' : '—' },
];

const formFields = [
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company' },
  { key: 'role', label: 'Role' },
  { key: 'content', label: 'Testimonial', type: 'textarea' },
  { key: 'image_url', label: 'Image URL' },
  { key: 'rating', label: 'Rating (1-5)', type: 'number' },
  { key: 'featured', label: 'Featured', type: 'switch' },
  { key: 'order', label: 'Order', type: 'number' },
];

export default function AdminTestimonials() {
  return <AdminCrudList entityName="Testimonial" title="Testimonials" columns={columns} formFields={formFields} queryKey="admin-testimonials" />;
}