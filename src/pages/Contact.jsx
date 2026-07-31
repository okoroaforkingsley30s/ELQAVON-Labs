import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Globe2, Building2, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { appBackend } from '@/api/appBackend';
import { toast } from 'sonner';
import { BRAND } from '@/config/brand';

const INITIAL_FORM = {
  name: '',
  company: '',
  email: '',
  phone: '',
  budget: '',
  project_type: '',
  timeline: '',
  description: '',
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.description) {
      toast.error('Please fill in the required fields.');
      return;
    }

    setLoading(true);
    try {
      await appBackend.entities.ContactRequest.create(form);
      toast.success(`Thank you for contacting ${BRAND.displayName}. Your message has been received and our team will respond as soon as possible.`);
      setForm(INITIAL_FORM);
    } catch (error) {
      console.error('Contact request submission failed', error);
      toast.error('Your message could not be sent. Please try again or contact us by email.');
    } finally {
      setLoading(false);
    }
  };

  const update = (key, value) => setForm(previous => ({ ...previous, [key]: value }));

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: BRAND.email,
      href: `mailto:${BRAND.email}`,
    },
    {
      icon: Globe2,
      label: 'Website',
      value: BRAND.website.replace('https://', ''),
      href: BRAND.website,
    },
    {
      icon: Building2,
      label: 'Company',
      value: BRAND.company,
    },
    {
      icon: ClipboardCheck,
      label: 'Project Review',
      value: 'Requirements reviewed by our engineering team',
    },
  ];

  return (
    <div className="pt-20">
      <section className="page-hero relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 grid-pattern opacity-35" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="space-y-6 max-w-4xl">
            <span className="inline-block font-mono text-xs font-medium tracking-widest uppercase text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              Contact
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-secondary">
              Start a Project With {BRAND.displayName}
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-3xl">
              Tell us about the system, platform or digital challenge your organisation is working on. Our team will
              review your requirements and determine the most suitable next step.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <motion.aside {...fadeUp} className="lg:col-span-2">
              <div className="rounded-2xl bg-secondary text-secondary-foreground p-7 lg:p-9">
                <h2 className="font-heading font-bold text-xl text-white">Project Contact</h2>
                <p className="text-sm text-white/60 leading-relaxed mt-3">
                  Share enough context for us to understand the organisation, operational need and intended outcome.
                </p>
                <div className="space-y-5 mt-8">
                  {contactDetails.map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-medium text-white hover:text-accent transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-white">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 lg:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-xs font-mono tracking-wide uppercase text-muted-foreground">Name *</Label>
                    <Input id="contact-name" autoComplete="name" placeholder="Your name" value={form.name} onChange={event => update('name', event.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-company" className="text-xs font-mono tracking-wide uppercase text-muted-foreground">Organisation</Label>
                    <Input id="contact-company" autoComplete="organization" placeholder="Organisation name" value={form.company} onChange={event => update('company', event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-xs font-mono tracking-wide uppercase text-muted-foreground">Email *</Label>
                    <Input id="contact-email" type="email" autoComplete="email" placeholder="you@organisation.com" value={form.email} onChange={event => update('email', event.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone" className="text-xs font-mono tracking-wide uppercase text-muted-foreground">Phone</Label>
                    <Input id="contact-phone" type="tel" autoComplete="tel" placeholder="+234..." value={form.phone} onChange={event => update('phone', event.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-mono tracking-wide uppercase text-muted-foreground">Project Type</Label>
                    <Select value={form.project_type} onValueChange={value => update('project_type', value)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enterprise_software">Enterprise software</SelectItem>
                        <SelectItem value="erp_workflow">ERP and workflow automation</SelectItem>
                        <SelectItem value="fintech">Fintech infrastructure</SelectItem>
                        <SelectItem value="ai_automation">AI and intelligent automation</SelectItem>
                        <SelectItem value="cloud_integration">Cloud integration</SelectItem>
                        <SelectItem value="digital_transformation">Digital transformation</SelectItem>
                        <SelectItem value="custom_software">Custom software development</SelectItem>
                        <SelectItem value="consultation">Technical consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-mono tracking-wide uppercase text-muted-foreground">Budget Stage</Label>
                    <Select value={form.budget} onValueChange={value => update('budget', value)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="needs_estimate">Requesting an estimate</SelectItem>
                        <SelectItem value="budget_defined">Budget already defined</SelectItem>
                        <SelectItem value="discovery_first">Discovery required first</SelectItem>
                        <SelectItem value="discuss">Prefer to discuss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-mono tracking-wide uppercase text-muted-foreground">Timeline</Label>
                    <Select value={form.timeline} onValueChange={value => update('timeline', value)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning stage</SelectItem>
                        <SelectItem value="1_3_months">1–3 months</SelectItem>
                        <SelectItem value="3_6_months">3–6 months</SelectItem>
                        <SelectItem value="6_plus_months">6+ months</SelectItem>
                        <SelectItem value="discuss">To be discussed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-description" className="text-xs font-mono tracking-wide uppercase text-muted-foreground">Project Description *</Label>
                  <Textarea
                    id="contact-description"
                    placeholder="Describe the operational challenge, intended users, required outcomes and any existing systems..."
                    value={form.description}
                    onChange={event => update('description', event.target.value)}
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full font-semibold py-6 group">
                  {loading ? 'Sending...' : 'Send Project Brief'}
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
