import { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { appBackend } from '@/api/appBackend';
import { toast } from 'sonner';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!email) return;
    setLoading(true);
    await appBackend.entities.NewsletterSubscription.create({ email, active: true });
    toast.success('Subscribed successfully!');
    setEmail('');
    setLoading(false);
  }, [email]);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="Subscribe to newsletter"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="bg-muted/50 border-border/50 text-sm"
      />
      <Button type="submit" size="icon" disabled={loading} className="bg-primary hover:bg-primary/90 shrink-0">
        <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
}