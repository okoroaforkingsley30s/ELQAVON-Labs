create extension if not exists pgcrypto;

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text, role text not null default 'admin' check (role in ('admin','user')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,email,role) values(new.id,new.email,coalesce(new.raw_user_meta_data->>'role','admin')); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create table public.projects (id uuid primary key default gen_random_uuid(), title text not null, slug text, client text, description text, long_description text, category text, status text default 'completed', featured boolean default false, image_url text, screenshots text[] default '{}', technologies text[] default '{}', challenges text, solutions text, results text, modules text[] default '{}', year integer, "order" integer default 0, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.services (id uuid primary key default gen_random_uuid(), title text not null, slug text, description text, long_description text, icon text, category text default 'development', featured boolean default false, "order" integer default 0, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.blog_posts (id uuid primary key default gen_random_uuid(), title text not null, slug text, excerpt text, content text, category text default 'technology', image_url text, author text, published boolean default false, tags text[] default '{}', read_time numeric, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.team_members (id uuid primary key default gen_random_uuid(), name text not null, role text not null, bio text, image_url text, linkedin text, twitter text, is_leadership boolean default false, "order" integer default 0, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.testimonials (id uuid primary key default gen_random_uuid(), name text not null, company text, role text, content text not null, image_url text, rating numeric default 5 check (rating between 1 and 5), featured boolean default false, "order" integer default 0, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.job_listings (id uuid primary key default gen_random_uuid(), title text not null, department text default 'engineering', type text default 'full_time', location text, remote boolean default false, description text, requirements text, benefits text, salary_range text, active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.contact_requests (id uuid primary key default gen_random_uuid(), name text not null, company text, email text not null, phone text, budget text, project_type text default 'web', timeline text default '1_3_months', description text, status text default 'new', created_at timestamptz default now(), updated_at timestamptz default now());
create table public.job_applications (id uuid primary key default gen_random_uuid(), job_id text, job_title text, name text not null, email text not null, phone text, resume_url text, cover_letter text, portfolio_url text, status text default 'new', created_at timestamptz default now(), updated_at timestamptz default now());
create table public.newsletter_subscriptions (id uuid primary key default gen_random_uuid(), email text not null unique, active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());

create unique index projects_slug_key on public.projects(slug) where slug is not null;
create unique index services_slug_key on public.services(slug) where slug is not null;
create unique index blog_posts_slug_key on public.blog_posts(slug) where slug is not null;

DO $$ declare t text; begin foreach t in array array['profiles','projects','services','blog_posts','team_members','testimonials','job_listings','contact_requests','job_applications','newsletter_subscriptions'] loop execute format('alter table public.%I enable row level security',t); end loop; end $$;

create policy "public read projects" on public.projects for select using (true);
create policy "public read services" on public.services for select using (true);
create policy "public read published posts" on public.blog_posts for select using (published or auth.role()='authenticated');
create policy "public read team" on public.team_members for select using (true);
create policy "public read testimonials" on public.testimonials for select using (true);
create policy "public read active jobs" on public.job_listings for select using (active or auth.role()='authenticated');
create policy "public submit contact" on public.contact_requests for insert with check (true);
create policy "public submit application" on public.job_applications for insert with check (true);
create policy "public subscribe" on public.newsletter_subscriptions for insert with check (true);
create policy "authenticated profiles" on public.profiles for select to authenticated using (true);

DO $$ declare t text; begin foreach t in array array['projects','services','blog_posts','team_members','testimonials','job_listings','contact_requests','job_applications','newsletter_subscriptions'] loop
 execute format('create policy "authenticated full access %1$s" on public.%1$I for all to authenticated using (true) with check (true)',t);
end loop; end $$;

insert into storage.buckets(id,name,public) values('resumes','resumes',true) on conflict(id) do update set public=true;
create policy "public upload resumes" on storage.objects for insert with check (bucket_id='resumes');
create policy "public read resumes" on storage.objects for select using (bucket_id='resumes');
create policy "authenticated manage resumes" on storage.objects for all to authenticated using (bucket_id='resumes') with check (bucket_id='resumes');
