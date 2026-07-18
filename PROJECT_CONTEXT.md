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
1. **users** — customer info
2. **orders** — tracking code, status, notes
3. **measurements** — body measurements
4. **designs** — gallery images

## ORDER STATUSES
received → accepted → calling_customer → in_production → ready_for_delivery → delivered → rejected

## CONSTRAINTS
$0/month, no credit card, commercial use required, must be reliable.
