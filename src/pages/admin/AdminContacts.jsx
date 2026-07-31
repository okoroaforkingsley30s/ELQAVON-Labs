import AdminCrudList from '@/components/admin/AdminCrudList';
import { Badge } from '@/components/ui/badge';

const statusColors = {
  new: 'border-emerald-500/30 text-emerald-400',
  contacted: 'border-primary/30 text-primary',
  in_progress: 'border-amber-500/30 text-amber-400',
  closed: 'border-muted-foreground/30 text-muted-foreground',
};

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'company', label: 'Company' },
  { key: 'project_type', label: 'Type' },
  { key: 'status', label: 'Status', render: (val) => (
    <Badge variant="outline" className={statusColors[val] || ''}>{val || 'new'}</Badge>
  )},
];

const formFields = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'company', label: 'Company' },
  { key: 'phone', label: 'Phone' },
  { key: 'project_type', label: 'Project Type', type: 'select', options: [
    { value: 'enterprise_software', label: 'Enterprise Software' },
    { value: 'erp_workflow', label: 'ERP & Workflow Automation' },
    { value: 'fintech', label: 'Fintech Infrastructure' },
    { value: 'ai_automation', label: 'AI & Intelligent Automation' },
    { value: 'cloud_integration', label: 'Cloud Integration' },
    { value: 'digital_transformation', label: 'Digital Transformation' },
    { value: 'custom_software', label: 'Custom Software Development' },
    { value: 'consultation', label: 'Technical Consultation' },
  ]},
  { key: 'budget', label: 'Budget Stage', type: 'select', options: [
    { value: 'needs_estimate', label: 'Requesting an Estimate' },
    { value: 'budget_defined', label: 'Budget Defined' },
    { value: 'discovery_first', label: 'Discovery Required First' },
    { value: 'discuss', label: 'Prefer to Discuss' },
  ]},
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'status', label: 'Status', type: 'select', options: [
    { value: 'new', label: 'New' }, { value: 'contacted', label: 'Contacted' },
    { value: 'in_progress', label: 'In Progress' }, { value: 'closed', label: 'Closed' },
  ]},
];

export default function AdminContacts() {
  return <AdminCrudList entityName="ContactRequest" title="Contact Requests" columns={columns} formFields={formFields} queryKey="admin-contacts" />;
}
