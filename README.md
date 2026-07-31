# ELQAVON Corporate Website

The official corporate website for Elqavon Technologies Limited.

ELQAVON develops secure enterprise software, intelligent business systems,
fintech infrastructure, AI-enabled solutions and integrated digital platforms.

## Current stack

- React
- Vite
- Supabase
- Local Docker
- TailwindCSS
- Shadcn UI

## First local installation (CMD)

Open CMD in the project root and run:

```cmd
powershell -NoProfile -ExecutionPolicy Bypass -File ".\Install-Elqavon-Local-Supabase.ps1" -ProjectPath "%CD%"
```

Then start the website:

```cmd
npm run dev
```

On later runs, you can double-click `Start-Elqavon-Local.cmd`.

## Local services

Run the following command to display the local API, Studio, database and
Mailpit addresses:

```cmd
npx supabase status
```

The installer writes the local API URL and anonymous key to `.env.local`
automatically.

## Authentication

Create a local account at `/register`, then open `/admin`. Local development
users receive the admin role by default. Replace this permissive local policy
before internet deployment.

## Database

The local schema is stored in
`supabase/migrations/202607290001_initial_schema.sql`.

To rebuild local data:

```cmd
npm run db:reset
```

To stop local services:

```cmd
npm run supabase:stop
```

## Brand configuration

Shared company names, messaging, contact details, product names and official
colours are maintained in:

```text
src/config/brand.js
```

Import `BRAND` from that file instead of hardcoding shared public branding in
components or pages.

## Premium visual assets

Official logo variants are stored in `public/assets/brand`. The source logo is
preserved, with optimized full-mark, symbol, favicon and social-sharing
variants for the website.

The homepage motion system uses optimized WebP slides together with WebM and
MP4 video formats. An animated GIF is retained as a compatibility fallback.
These files are stored in `public/assets/media`.

The hero slider and motion video include manual pause controls and respect the
visitor's reduced-motion preference.
