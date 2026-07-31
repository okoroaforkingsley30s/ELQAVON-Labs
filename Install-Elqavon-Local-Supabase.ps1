param([string]$ProjectPath = (Get-Location).Path)
$ErrorActionPreference='Stop'
function Step($m){Write-Host "`n==> $m" -ForegroundColor Cyan}
$ProjectPath=(Resolve-Path -LiteralPath $ProjectPath).Path
Set-Location -LiteralPath $ProjectPath
if(-not (Test-Path package.json)){throw "package.json not found in $ProjectPath"}
Step 'Checking Docker Desktop'
docker version | Out-Null
Step 'Installing Node dependencies'
npm install
Step 'Preparing Supabase CLI'
if(-not (Test-Path 'supabase\config.toml')){npx supabase init}
Step 'Starting local Supabase (first start downloads Docker images)'
$status = npx supabase start 2>&1 | Out-String
Write-Host $status
Step 'Reading local API credentials'
$statusJson = npx supabase status -o json | Out-String | ConvertFrom-Json
$url = $statusJson.API_URL
$anon = $statusJson.ANON_KEY
if(-not $url -or -not $anon){throw 'Could not read API_URL/ANON_KEY from Supabase status.'}
@("VITE_SUPABASE_URL=$url","VITE_SUPABASE_ANON_KEY=$anon") | Set-Content -LiteralPath '.env.local' -Encoding UTF8
Step 'Resetting database and applying migration'
npx supabase db reset
Write-Host "`nLOCAL SUPABASE INSTALLATION COMPLETE" -ForegroundColor Green
Write-Host "ELQAVON WEBSITE LOCAL ENVIRONMENT READY" -ForegroundColor Green
Write-Host "Run: npm run dev" -ForegroundColor Yellow
Write-Host "Studio: $($statusJson.STUDIO_URL)" -ForegroundColor Yellow
