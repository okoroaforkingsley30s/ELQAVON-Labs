import AdminCrudList from '@/components/admin/AdminCrudList';
import { Badge } from '@/components/ui/badge';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'department', label: 'Department' },
  { key: 'type', label: 'Type' },
  { key: 'location', label: 'Location' },
  { key: 'active', label: 'Active', render: (val) => (
    <Badge variant="outline" className={val ? 'border-emerald-500/30 text-emerald-400' : 'text-muted-foreground'}>{val ? 'Active' : 'Inactive'}</Badge>
  )},
];

const formFields = [
  { key: 'title', label: 'Job Title' },
  { key: 'department', label: 'Department', type: 'select', options: [
    { value: 'engineering', label: 'Engineering' }, { value: 'design', label: 'Design' },
    { value: 'product', label: 'Product' }, { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }, { value: 'operations', label: 'Operations' },
    { value: 'hr', label: 'HR' },
  ]},
  { key: 'type', label: 'Employment Type', type: 'select', options: [
    { value: 'full_time', label: 'Full Time' }, { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' }, { value: 'internship', label: 'Internship' },
    { value: 'graduate', label: 'Graduate Program' },
  ]},
  { key: 'location', label: 'Location' },
  { key: 'remote', label: 'Remote', type: 'switch' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'requirements', label: 'Requirements', type: 'textarea' },
  { key: 'benefits', label: 'Benefits', type: 'textarea' },
  { key: 'salary_range', label: 'Salary Range' },
  { key: 'active', label: 'Active', type: 'switch' },
];

export default function AdminCareers() {
  return <AdminCrudList entityName="JobListing" title="Job Listings" columns={columns} formFields={formFields} queryKey="admin-careers" />;
}