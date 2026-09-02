# PROJECT CONTEXT — Habsha Kamiss Tailoring Shop

## What This Is
Real business website for father's Ethiopian traditional dress (Habesha Kamiss) tailoring shop. Customers request custom dresses — not buy directly.

## Current Status
Folder is empty. Starting fresh. Only `.git` exists.

---

## CHOSEN STACK
- **Framework**: Next.js 15 to lates (16) (App Router)
- **Hosting**: Cloudflare Pages + Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (images)
- **Auth**: Clerk (admin login) (Clerk's normal code won't run there — you must add : to check the JWT token yourself)
- **Communication**: Telegram Bot API (orders + price requests)

## WHY CLOUDFLARE
Commercial use allowed. No credit card needed. Unlimited bandwidth. Always awake. Real company.

## DATABASE TABLES
1. **users** — customer name, phone, email, address
2. **orders** — tracking code, status, notes, user_id, telegram_message_id
3. **measurements** — stomach, shoulder, leg, hand widths
4. **designs** — gallery images (name, image_url, description, category, price_range)

## ORDER STATUSES
received → accepted → calling_customer → in_production → ready_for_delivery → delivered → rejected

---

## DESIGN REQUIREMENTS
- cUltra-clean, smart, easy-to-use interface
- Luxury aesthetic with gold style and add Ethiopian experse colo 
- Professional layout for showcasing to clients

## PAGES & FEATURES

### Gallery Page
- Categories: family, couples, Muslim, Christian, men, women, kids
- Click item → opens full image
- Scroll through multiple images per item

### Admin Page
- See stats — total orders, messages, designs, visitors
- Manage orders — view, update status, delete

- Manage gallery — add, edit, delete dress designs
- Read customer messages — mark as read/replied
- Edit shop info — phone, address, hours, images

### Pricing Display
- Next to each design image: shows price range (or "Unknown" if not set by admin)
- **"Current Price" button** next to price range → 3 options:
  1. Send request to Telegram bot (delayed response)
  2. Open Telegram chat (direct ask)
  3. Show phone number (direct call)

### "Order" Button (Next to Image)
- 3 options:
  1. **Insert**: Submit measurements (waist, shoulder, arm, height) + phone number → sends to Telegram bot
  2. **In-person**: Shows Google Maps location + phone number
  3. **Send Clothes**: Shows location + phone for sending own clothes to shop

### Communication
- No chat on website
- Telegram Bot handles all order submissions and price inquiries
- Users redirected to Telegram for real conversations

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
- Telegram Bot API for order/price communication

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
- Website chat widget (use Telegram instead)

---

# Habesha Dress E-Commerce: System & Order Flow

### 1. The Pricing System ("Current Price" Button)

Users click this button to find the exact price of a dress.
It gives the user three options to contact the shop.

* **Automated Bot Request:** Sends a hidden data request to the Telegram bot. The shop owner replies to the customer later.
* **Direct Chat:** Opens a live Telegram chat between the customer and the shop owner.
* **Direct Call:** Shows the business phone number so the customer can make a normal voice call.

*Takeaway: Customers ask for prices using automated bot alerts, direct Telegram chats, or phone calls.*

### 2. The Order System ("Buy" Button)

Users click this button to start a custom dress order.
They must choose one of three ways to provide their body sizes.

* **Insert Measurements (Digital):** A form collects waist, shoulder, arm, and height sizes. It also collects a phone number. This data is sent directly to the Telegram bot.
* **In-Person Visit (Physical):** The website displays a Google Map and a phone number. The customer travels to the shop to get measured by a tailor.
* **Send Clothes (Mail):** The website displays the shop's physical address. The customer mails an old dress to the shop for the tailor to copy.

*Takeaway: The checkout process gives three easy ways to collect accurate body measurements.*

### 3. The Telegram Bot Role (Admin Side)

The website does not use a complex database for orders.
The Telegram bot acts as a digital bridge.
It instantly delivers all price requests and body measurements to the admin's phone.
The admin reads the Telegram message, calls the customer, and starts the tailoring job.

*Takeaway: Your Telegram app acts as a real-time admin dashboard for all customer orders.*


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
