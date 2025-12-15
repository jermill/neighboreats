# CLI Commands Reference

Quick reference for common development commands.

## Supabase Commands

### Initial Setup
```bash
# Install Supabase CLI globally
npm install -g supabase

# Link to your remote project
supabase link --project-ref icntzxgwrnidzpxdplbm

# Start local Supabase (requires Docker)
supabase start
```

### Daily Development
```bash
# Check status of local services
supabase status

# Stop local services
supabase stop

# View local Studio
# Open http://127.0.0.1:54323 in browser
```

### Database Management
```bash
# Create a new migration
supabase migration new migration_name

# Push migrations to remote database
supabase db push

# Pull schema from remote to local
supabase db pull

# Reset local database
supabase db reset

# Create migration from schema changes
supabase db diff -f migration_name
```

### Type Generation
```bash
# Generate TypeScript types from database
supabase gen types typescript --linked > src/types/database.ts

# Or for local database
supabase gen types typescript --local > src/types/database.ts
```

### Remote Project
```bash
# List all projects
supabase projects list

# View project details
supabase projects info

# View database connection string
supabase db remote --linked
```

## Stripe Commands

### Setup
```bash
# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login
```

### Local Webhook Testing
```bash
# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/payments/webhook

# This outputs a webhook secret - add it to .env.local as STRIPE_WEBHOOK_SECRET
```

### Testing & Debugging
```bash
# View API logs in real-time
stripe logs tail

# Trigger test webhook events
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed

# Test a payment
stripe payment_intents create --amount=2000 --currency=usd

# View recent events
stripe events list
```

### Connect Testing
```bash
# View Connect accounts
stripe accounts list

# Get account details
stripe accounts retrieve acct_xxx
```

## Next.js Commands

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix auto-fixable linting issues
npm run lint -- --fix

# Type check (if configured)
npx tsc --noEmit
```

### Clean Build
```bash
# Remove build artifacts
rm -rf .next

# Remove node modules and reinstall
rm -rf node_modules
npm install

# Full clean rebuild
rm -rf .next node_modules
npm install
npm run build
```

## Git Commands

### Daily Workflow
```bash
# Check status
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main
```

### Branching
```bash
# Create and switch to new branch
git checkout -b feature/branch-name

# Switch branches
git checkout main

# List branches
git branch

# Delete branch
git branch -d feature/branch-name
```

### Viewing History
```bash
# View commit history
git log --oneline

# View file changes
git diff

# View staged changes
git diff --staged
```

## Docker Commands

### Supabase-Related
```bash
# Check if Docker is running
docker ps

# View Supabase containers
docker ps | grep supabase

# Stop all Supabase containers
supabase stop

# Remove all containers (clean slate)
docker-compose -f supabase/docker-compose.yml down -v
```

### Cleanup
```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove everything unused
docker system prune -a
```

## Environment Setup

### Create Environment File
```bash
# Copy example to create .env.local
cp env.example .env.local

# Edit with your favorite editor
nano .env.local
# or
code .env.local
```

### Verify Environment
```bash
# Check if environment variables are loaded
# Add to package.json scripts:
# "env:check": "node -e 'console.log(process.env)'"

npm run env:check
```

## Package Management

### Dependencies
```bash
# Install a new dependency
npm install package-name

# Install as dev dependency
npm install -D package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated

# Remove unused packages
npm prune
```

### Version Management
```bash
# Check Node version
node -v

# Check npm version
npm -v

# Use specific Node version (with nvm)
nvm use 18
```

## Testing Commands

### Run Tests
```bash
# Run all tests (when configured)
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Manual Testing
```bash
# Test API endpoint with curl
curl http://localhost:3000/api/orders

# Test with authentication
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/api/orders

# POST request
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"chefId":"123","items":[],"fulfillmentType":"pickup"}'
```

## Deployment Commands

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link to existing site
netlify link

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod

# View deployment logs
netlify logs
```

### Build & Preview Locally
```bash
# Build
npm run build

# Preview production build locally
npm start
```

## Troubleshooting Commands

### Reset Everything
```bash
# Stop all services
supabase stop

# Clean Next.js
rm -rf .next

# Clean node_modules
rm -rf node_modules
npm install

# Restart Supabase
supabase start

# Restart Next.js
npm run dev
```

### Check Logs
```bash
# Supabase logs
supabase logs

# Next.js dev server shows logs in terminal
# Check browser console for frontend errors
```

### Database Issues
```bash
# Check if database is running
supabase status

# View database schema
supabase db dump --schema public

# Backup database
supabase db dump > backup.sql

# Restore database
supabase db reset --db-url "postgresql://..."
```

## Quick Start Workflow

```bash
# Morning startup
supabase start                    # Start Supabase
stripe listen --forward-to localhost:3000/api/payments/webhook  # Terminal 2
npm run dev                       # Terminal 3

# Make changes, test, commit
git add .
git commit -m "Description"
git push origin main

# End of day
supabase stop                     # Stop Supabase
# Ctrl+C to stop Stripe CLI
# Ctrl+C to stop Next.js dev server
```

## Useful Aliases (Optional)

Add to your `~/.zshrc` or `~/.bashrc`:

```bash
alias sbs='supabase start'
alias sbst='supabase stop'
alias sbsta='supabase status'
alias dev='npm run dev'
alias build='npm run build'
```

Then reload:
```bash
source ~/.zshrc  # or source ~/.bashrc
```
