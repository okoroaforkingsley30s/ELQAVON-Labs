import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Briefcase, Upload, FileText, X } from 'lucide-react';
import { appBackend } from '@/api/appBackend';
import { toast } from 'sonner';
import { BRAND } from '@/config/brand';

export default function JobApplicationModal({ job, open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', cover_letter: '', portfolio_url: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);

    let resume_url = '';
    if (resumeFile) {
      setUploading(true);
      const { file_url } = await appBackend.integrations.Core.UploadFile({ file: resumeFile });
      resume_url = file_url;
      setUploading(false);
    }

    await appBackend.entities.JobApplication.create({
      job_id: job.id || job.title,
      job_title: job.title,
      name: form.name,
      email: form.email,
      phone: form.phone,
      cover_letter: form.cover_letter,
      portfolio_url: form.portfolio_url,
      resume_url,
      status: 'new',
    });
    toast.success(`Thank you for your interest in ${BRAND.displayName}. Your details have been received.`);
    setForm({ name: '', email: '', phone: '', cover_letter: '', portfolio_url: '' });
    setResumeFile(null);
    setLoading(false);
    onClose();
  };

  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-border/50 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg">Register interest in {job.title}</DialogTitle>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.dept}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
            {job.remote && <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0">Remote</Badge>}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">Full Name *</Label>
              <Input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Jane Smith" className="bg-muted/30 border-border/50" required />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">Email *</Label>
              <Input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="jane@example.com" className="bg-muted/30 border-border/50" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">Phone</Label>
              <Input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+234..." className="bg-muted/30 border-border/50" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">Portfolio / LinkedIn</Label>
              <Input value={form.portfolio_url} onChange={e => update('portfolio_url', e.target.value)} placeholder="https://..." className="bg-muted/30 border-border/50" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono">Resume / CV</Label>
            {resumeFile ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-sm">
                <FileText className="w-4 h-4 text-primary shrink-0" />
                <span className="truncate text-foreground flex-1">{resumeFile.name}</span>
                <button type="button" onClick={() => setResumeFile(null)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-dashed border-border/50 hover:border-primary/40 cursor-pointer transition-colors text-sm text-muted-foreground">
                <Upload className="w-4 h-4 shrink-0" />
                <span>Click to upload PDF, DOC, or DOCX</span>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="hidden" />
              </label>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono">Cover Letter</Label>
            <Textarea
              value={form.cover_letter}
              onChange={e => update('cover_letter', e.target.value)}
              placeholder="Tell us why you'd be a great fit for this role..."
              className="bg-muted/30 border-border/50 min-h-[120px]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
              {uploading ? 'Uploading CV...' : loading ? 'Submitting...' : 'Submit Interest'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
