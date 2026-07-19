# PROJECT CONTEXT — Habsha Kamiss Tailoring Shop

## What This Is
Real business website for father's Ethiopian traditional dress (Kamiss) tailoring shop. Actual customers, actual orders.

## Current Status
Folder is empty. Starting fresh. Only `.git` exists.

---

## CHOSEN STACK
- **Framework**: Next.js 15 (App Router)
- **Hosting**: Cloudflare Pages + Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (images)
- **Auth**: Clerk (admin login)

## WHY CLOUDFLARE
Commercial use allowed. No credit card needed. Unlimited bandwidth. Always awake. Real company.

## DATABASE TABLES
1. **users** — customer name, phone, email, address
2. **orders** — tracking code, status, notes, user_id
3. **measurements** — stomach, shoulder, leg, hand widths
4. **designs** — gallery images (name, image_url, description)

## ORDER STATUSES
received → accepted → calling_customer → in_production → ready_for_delivery → delivered → rejected

---

## CODING RULES (Follow These)

### ✅ DO USE
- Next.js App Router (not Pages Router)
- Server Actions for forms
- Drizzle ORM (for D1/SQLite)
- Cloudflare R2 SDK (for uploads)
- Clerk (`@clerk/nextjs`) for auth
- `NEXT_PUBLIC_` env var prefix for client-side config
- Route handlers in `app/api/.../route.ts`

### ❌ DON'T USE
- PostgreSQL/MySQL drivers (D1 is SQLite)
- GORM, Prisma with PostgreSQL, Sequelize
- `fs.writeFileSync` or any file system write (Cloudflare is read-only)
- Express.js, Fastify, or custom servers
- Background jobs on free tier (very limited)
- WebSocket servers (not supported)
- Long-running processes (50ms CPU limit on free)
- Node.js-only packages (`os`, `child_process`, `cluster`)
- Custom server in `next.config.js`
- `process.env` or Node APIs in middleware
- Local image imports (use R2 URLs)

---

## DEPLOYMENT SETUP (One-Time)
- Install: `@opennextjs/cloudflare`, `wrangler`
- Config files: `wrangler.toml`, `open-next.config.ts`
- Set env vars in Cloudflare dashboard (not `.env.local`)
- Deploy command: `wrangler deploy`

## FREE LIMITS (You Won't Hit These)
- Workers: 100K requests/day, unlimited bandwidth
- D1: 5GB storage, 5M reads/day, 100K writes/day
- R2: 10GB storage, 1M writes/month, 10M reads/month, zero egress fees

## FUTURE
When shop makes money → buy $5/month VPS → migrate here. No code rewrite needed.

## CONSTRAINTS
$0/month, no credit card, commercial use required, must be reliable.
