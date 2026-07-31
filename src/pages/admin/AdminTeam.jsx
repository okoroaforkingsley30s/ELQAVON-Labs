import AdminCrudList from '@/components/admin/AdminCrudList';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'is_leadership', label: 'Leadership', render: (val) => val ? '★' : '—' },
  { key: 'order', label: 'Order' },
];

const formFields = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'bio', label: 'Bio', type: 'textarea' },
  { key: 'image_url', label: 'Image URL' },
  { key: 'linkedin', label: 'LinkedIn URL' },
  { key: 'twitter', label: 'Twitter URL' },
  { key: 'is_leadership', label: 'Leadership Team', type: 'switch' },
  { key: 'order', label: 'Order', type: 'number' },
];

export default function AdminTeam() {
  return <AdminCrudList entityName="TeamMember" title="Team Members" columns={columns} formFields={formFields} queryKey="admin-team" />;
}