-- ELQAVON portfolio CMS, partner directory, certificates and admin hardening.

alter table public.projects
  add column if not exists project_type text,
  add column if not exists industry text,
  add column if not exists services text[] default '{}',
  add column if not exists logo_url text,
  add column if not exists video_url text,
  add column if not exists project_url text,
  add column if not exists published boolean not null default true;

update public.projects set published = true where published is null;

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  description text,
  logo_url text,
  website_url text,
  active boolean not null default true,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  description text,
  credential_id text,
  credential_url text,
  image_url text,
  issued_on date,
  expires_on date,
  year integer,
  published boolean not null default true,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists partners_set_updated_at on public.partners;
create trigger partners_set_updated_at before update on public.partners
for each row execute procedure public.set_updated_at();

drop trigger if exists certificates_set_updated_at on public.certificates;
create trigger certificates_set_updated_at before update on public.certificates
for each row execute procedure public.set_updated_at();

create index if not exists projects_public_order_idx on public.projects (published, "order", created_at desc);
create index if not exists partners_public_order_idx on public.partners (active, "order", created_at desc);
create index if not exists certificates_public_order_idx on public.certificates (published, "order", created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- The first account created in a fresh local installation becomes the bootstrap
-- administrator. Every later account is a normal user until explicitly promoted.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role text;
begin
  select case
    when exists(select 1 from public.profiles where role = 'admin') then 'user'
    else 'admin'
  end into assigned_role;

  insert into public.profiles(id, email, role)
  values(new.id, new.email, assigned_role);
  return new;
end;
$$;

alter table public.partners enable row level security;
alter table public.certificates enable row level security;

drop policy if exists "public read projects" on public.projects;
create policy "public read published projects"
on public.projects for select
using (published or public.is_admin());

drop policy if exists "authenticated full access projects" on public.projects;
create policy "admin manage projects"
on public.projects for all to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Replace the original broad authenticated policies with administrator-only
-- management. Public submission/read policies remain in place where needed.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'services', 'blog_posts', 'team_members', 'testimonials', 'job_listings',
    'contact_requests', 'job_applications', 'newsletter_subscriptions'
  ] loop
    execute format('drop policy if exists "authenticated full access %1$s" on public.%1$I', table_name);
    execute format(
      'create policy "admin manage %1$s" on public.%1$I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
      table_name
    );
  end loop;
end
$$;

drop policy if exists "authenticated profiles" on public.profiles;
create policy "users read own profile"
on public.profiles for select to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "public read partners" on public.partners;
create policy "public read partners"
on public.partners for select
using (active or public.is_admin());

drop policy if exists "admin manage partners" on public.partners;
create policy "admin manage partners"
on public.partners for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read certificates" on public.certificates;
create policy "public read certificates"
on public.certificates for select
using (published or public.is_admin());

drop policy if exists "admin manage certificates" on public.certificates;
create policy "admin manage certificates"
on public.certificates for all to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets(id, name, public)
values('site-media', 'site-media', true)
on conflict(id) do update set public = true;

drop policy if exists "public read site media" on storage.objects;
create policy "public read site media"
on storage.objects for select
using (bucket_id = 'site-media');

drop policy if exists "admin upload site media" on storage.objects;
create policy "admin upload site media"
on storage.objects for insert to authenticated
with check (bucket_id = 'site-media' and public.is_admin());

drop policy if exists "admin update site media" on storage.objects;
create policy "admin update site media"
on storage.objects for update to authenticated
using (bucket_id = 'site-media' and public.is_admin())
with check (bucket_id = 'site-media' and public.is_admin());

drop policy if exists "admin delete site media" on storage.objects;
create policy "admin delete site media"
on storage.objects for delete to authenticated
using (bucket_id = 'site-media' and public.is_admin());

insert into public.projects (
  title, slug, client, description, category, project_type, status,
  featured, published, technologies, year, "order"
) values
  ('ArkOne', 'ark-one', 'Elqavon Technologies Limited', 'A connected enterprise platform created to coordinate people, workflows, service delivery and management visibility.', 'Enterprise Software', 'Enterprise Operations Platform', 'completed', true, true, array['React','Supabase','Workflow Automation'], 2026, 10),
  ('ArkPay', 'ark-pay', 'Elqavon Technologies Limited', 'A secure institutional self-service platform combining identity workflows, device coordination and controlled service delivery.', 'Banking & Fintech', 'Card & Identity Self-Service Platform', 'completed', true, true, array['React','Windows Services','Device Integration'], 2026, 20),
  ('Altura Bank', 'altura-bank', null, 'A completed digital project delivered for the financial-services sector, presented as part of Elqavon’s selected work.', 'Banking & Fintech', 'Digital Banking Experience', 'completed', true, true, '{}', 2026, 30),
  ('Agro Monument Bank', 'agro-monument-bank', null, 'A completed financial-services technology engagement delivered with a focus on clarity, reliability and digital access.', 'Banking & Fintech', 'Financial Services Solution', 'completed', true, true, '{}', 2026, 40),
  ('Addy Biotech Concept', 'addy-biotech-concept', null, 'A completed corporate digital project designed to communicate the organisation’s services through a clear modern experience.', 'Digital Experience', 'Corporate Digital Experience', 'completed', false, true, '{}', 2026, 50),
  ('Obech Logistics', 'obech-logistics', null, 'A completed logistics-sector project focused on a structured, accessible and professional customer experience.', 'Logistics Technology', 'Logistics Digital Solution', 'completed', false, true, '{}', 2026, 60),
  ('Velora', 'velora', null, 'A completed digital product engagement shaped around a distinctive identity and a streamlined user journey.', 'Digital Experience', 'Digital Product', 'completed', false, true, '{}', 2026, 70),
  ('OraChat', 'orachat', null, 'A communication-focused product designed to support direct, accessible and connected digital interaction.', 'Communication Platforms', 'Communication Platform', 'completed', true, true, '{}', 2026, 80),
  ('OraConnect', 'oraconnect', null, 'A connected digital solution developed to bring users, services and information into one coordinated experience.', 'Communication Platforms', 'Connectivity Platform', 'completed', false, true, '{}', 2026, 90),
  ('Active', 'active', null, 'A completed digital engagement included within Elqavon’s growing portfolio of designed and engineered experiences.', 'Digital Experience', 'Digital Product', 'completed', false, true, '{}', 2026, 100),
  ('NexMx', 'nexmx', null, 'A platform-engineering project delivered as part of Elqavon’s enterprise technology portfolio.', 'Enterprise Software', 'Platform Engineering', 'completed', false, true, '{}', 2026, 110),
  ('NexATM Solution', 'nexatm-solution', null, 'A self-service technology project focused on dependable institutional workflows and purpose-built customer interaction.', 'ATM & Self-Service', 'ATM Technology Solution', 'completed', true, true, '{}', 2026, 120)
on conflict do nothing;
