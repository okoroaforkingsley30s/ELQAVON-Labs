import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appBackend } from '@/api/appBackend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Search, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCrudList({ entityName, title, columns, formFields, queryKey, defaultValues = {} }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState('');
  const [uploadingField, setUploadingField] = useState('');
  const qc = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => appBackend.entities[entityName].list('-created_date', 100),
  });

  const createMutation = useMutation({
    mutationFn: (data) => appBackend.entities[entityName].create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: [queryKey] }); toast.success('Created'); closeDialog(); },
    onError: error => toast.error(error.message || 'Could not create this item'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => appBackend.entities[entityName].update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: [queryKey] }); toast.success('Updated'); closeDialog(); },
    onError: error => toast.error(error.message || 'Could not update this item'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => appBackend.entities[entityName].delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: [queryKey] }); toast.success('Deleted'); },
    onError: error => toast.error(error.message || 'Could not delete this item'),
  });

  const closeDialog = () => { setDialogOpen(false); setEditItem(null); setForm(defaultValues); };

  const openCreate = () => {
    setForm({ ...defaultValues });
    setEditItem(null);
    setDialogOpen(true);
  };

  const openEdit = (item) => {
    setForm({ ...item });
    setEditItem(item);
    setDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      updateMutation.mutate({ id: editItem.id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const filtered = items.filter(item => {
    if (!search) return true;
    const s = search.toLowerCase();
    return columns.some(col => String(item[col.key] || '').toLowerCase().includes(s));
  });

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const uploadFile = async (field, file) => {
    if (!file) return;
    setUploadingField(field.key);
    try {
      const uploaded = await appBackend.integrations.Core.UploadSiteMedia({
        file,
        folder: field.folder || entityName.toLowerCase(),
      });
      updateField(field.key, uploaded.file_url);
      toast.success('File uploaded');
    } catch (error) {
      toast.error(error.message || 'File upload failed');
    } finally {
      setUploadingField('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-heading font-bold text-xl">{title}</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-muted/30 border-border/50 w-full sm:w-56" />
          </div>
          <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">No items found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                {columns.map(col => (
                  <th key={col.key} className="text-left py-3 px-4 text-xs font-mono tracking-wide uppercase text-muted-foreground">{col.label}</th>
                ))}
                <th className="text-right py-3 px-4 text-xs font-mono tracking-wide uppercase text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="py-3 px-4">
                      {col.render ? col.render(item[col.key], item) : (
                        <span className="truncate max-w-[200px] block">{String(item[col.key] ?? '')}</span>
                      )}
                    </td>
                  ))}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(item.id); }} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-strong border-border/50 max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editItem ? 'Edit' : 'Create'} {title.replace(/s$/, '')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map(field => (
              <div key={field.key} className="space-y-1.5">
                <Label className="text-xs font-mono">{field.label}</Label>
                {field.type === 'textarea' ? (
                  <Textarea value={form[field.key] || ''} onChange={e => updateField(field.key, e.target.value)} className="bg-muted/30 border-border/50 min-h-[80px]" />
                ) : field.type === 'array' ? (
                  <Input
                    value={Array.isArray(form[field.key]) ? form[field.key].join(', ') : form[field.key] || ''}
                    onChange={e => updateField(field.key, e.target.value.split(',').map(value => value.trim()).filter(Boolean))}
                    placeholder={field.placeholder || 'Separate values with commas'}
                    className="bg-muted/30 border-border/50"
                  />
                ) : field.type === 'select' ? (
                  <Select value={form[field.key] || ''} onValueChange={v => updateField(field.key, v)}>
                    <SelectTrigger className="bg-muted/30 border-border/50"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {field.options.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                ) : field.type === 'switch' ? (
                  <Switch checked={!!form[field.key]} onCheckedChange={v => updateField(field.key, v)} />
                ) : field.type === 'file' ? (
                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 bg-muted/20 px-4 py-5 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground">
                      <UploadCloud className="h-4 w-4" />
                      {uploadingField === field.key ? 'Uploading…' : field.buttonLabel || 'Choose file'}
                      <input
                        type="file"
                        accept={field.accept || 'image/*'}
                        className="sr-only"
                        disabled={uploadingField === field.key}
                        onChange={event => uploadFile(field, event.target.files?.[0])}
                      />
                    </label>
                    {form[field.key] && (
                      <Input value={form[field.key]} readOnly className="bg-muted/30 border-border/50 text-xs" />
                    )}
                  </div>
                ) : (
                  <Input
                    type={field.type || 'text'}
                    value={form[field.key] || ''}
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={e => updateField(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                    className="bg-muted/30 border-border/50"
                  />
                )}
              </div>
            ))}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button
                type="submit"
                disabled={!!uploadingField || createMutation.isPending || updateMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {uploadingField ? 'Uploading…' : editItem ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
