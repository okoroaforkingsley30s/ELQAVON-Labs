import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://127.0.0.1:55321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.warn('VITE_SUPABASE_ANON_KEY is not set. Run Install-Elqavon-Local-Supabase.ps1.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey || 'missing-local-anon-key', {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

const entityTables = {
  BlogPost: 'blog_posts', ContactRequest: 'contact_requests', JobApplication: 'job_applications',
  Certificate: 'certificates', JobListing: 'job_listings', NewsletterSubscription: 'newsletter_subscriptions',
  Partner: 'partners', Project: 'projects', Service: 'services', TeamMember: 'team_members',
  Testimonial: 'testimonials', User: 'profiles',
};

const normalizeError = (error) => {
  if (!error) return null;
  const wrapped = new Error(error.message || 'Supabase request failed');
  wrapped.code = error.code;
  wrapped.details = error.details;
  return wrapped;
};

const entityApi = (entityName) => {
  const table = entityTables[entityName];
  if (!table) throw new Error(`Unknown entity: ${entityName}`);
  return {
    async list(sort = '-created_date', limit = 100) {
      const descending = String(sort).startsWith('-');
      const requested = String(sort).replace(/^-/, '');
      const column = requested === 'created_date' ? 'created_at' : requested;
      const { data, error } = await supabase.from(table).select('*').order(column, { ascending: !descending }).limit(limit);
      if (error) throw normalizeError(error);
      return data || [];
    },
    async create(values) {
      const { data, error } = await supabase.from(table).insert(values).select().single();
      if (error) throw normalizeError(error);
      return data;
    },
    async update(id, values) {
      const { data, error } = await supabase.from(table).update(values).eq('id', id).select().single();
      if (error) throw normalizeError(error);
      return data;
    },
    async delete(id) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw normalizeError(error);
      return { id };
    },
  };
};

const entities = new Proxy({}, { get: (_, name) => entityApi(name) });

export const appBackend = {
  entities,
  auth: {
    async me() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) throw normalizeError(error || { message: 'Not authenticated' });
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      return { ...user, ...(profile || {}), role: profile?.role || user.user_metadata?.role || 'user' };
    },
    async loginViaEmailPassword(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw normalizeError(error);
      return data;
    },
    async register({ email, password }) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw normalizeError(error);
      return data;
    },
    async verifyOtp({ email, otpCode }) {
      const { data, error } = await supabase.auth.verifyOtp({ email, token: otpCode, type: 'email' });
      if (error) throw normalizeError(error);
      return data.session || data;
    },
    async resendOtp(email) {
      const { data, error } = await supabase.auth.resend({ type: 'signup', email });
      if (error) throw normalizeError(error);
      return data;
    },
    async resetPasswordRequest(email) {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw normalizeError(error);
      return data;
    },
    async resetPassword({ newPassword }) {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw normalizeError(error);
      return data;
    },
    async loginWithProvider(provider, redirectPath = '/') {
      const { data, error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${window.location.origin}${redirectPath}` } });
      if (error) throw normalizeError(error);
      return data;
    },
    async logout(redirect = false) {
      const { error } = await supabase.auth.signOut();
      if (error) throw normalizeError(error);
      if (redirect) window.location.assign('/login');
    },
    redirectToLogin() { window.location.assign('/login'); },
  },
  integrations: {
    Core: {
      async UploadFile({ file }) {
        const extension = file.name?.split('.').pop() || 'bin';
        const objectPath = `${crypto.randomUUID()}.${extension}`;
        const { error } = await supabase.storage.from('resumes').upload(objectPath, file, { upsert: false });
        if (error) throw normalizeError(error);
        const { data } = supabase.storage.from('resumes').getPublicUrl(objectPath);
        return { file_url: data.publicUrl };
      },
      async UploadSiteMedia({ file, folder = 'cms' }) {
        const extension = file.name?.split('.').pop()?.toLowerCase() || 'bin';
        const safeFolder = String(folder).replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
        const objectPath = `${safeFolder}/${crypto.randomUUID()}.${extension}`;
        const { error } = await supabase.storage.from('site-media').upload(objectPath, file, {
          cacheControl: '3600',
          upsert: false,
        });
        if (error) throw normalizeError(error);
        const { data } = supabase.storage.from('site-media').getPublicUrl(objectPath);
        return { file_url: data.publicUrl, path: objectPath };
      },
    },
  },
};
