import AdminCrudList from '@/components/admin/AdminCrudList';
import { Badge } from '@/components/ui/badge';

const columns = [
  { key: 'title', label: 'Certificate' },
  { key: 'issuer', label: 'Issuer' },
  { key: 'year', label: 'Year' },
  {
    key: 'published',
    label: 'Status',
    render: value => (
      <Badge variant="outline" className={value !== false ? 'border-emerald-500/30 text-emerald-400' : 'text-muted-foreground'}>
        {value !== false ? 'Published' : 'Draft'}
      </Badge>
    ),
  },
];

const formFields = [
  { key: 'title', label: 'Certificate Title', required: true },
  { key: 'issuer', label: 'Issuing Organisation' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'credential_id', label: 'Credential ID' },
  { key: 'credential_url', label: 'Verification URL', type: 'url' },
  { key: 'image_url', label: 'Certificate Image', type: 'file', accept: 'image/*,.pdf', folder: 'certificates' },
  { key: 'issued_on', label: 'Issue Date', type: 'date' },
  { key: 'expires_on', label: 'Expiry Date', type: 'date' },
  { key: 'year', label: 'Year', type: 'number' },
  { key: 'published', label: 'Published on Website', type: 'switch' },
  { key: 'order', label: 'Display Order', type: 'number' },
];

export default function AdminCertificates() {
  return (
    <AdminCrudList
      entityName="Certificate"
      title="Certificates"
      columns={columns}
      formFields={formFields}
      queryKey="admin-certificates"
      defaultValues={{ published: true, order: 0 }}
    />
  );
}
