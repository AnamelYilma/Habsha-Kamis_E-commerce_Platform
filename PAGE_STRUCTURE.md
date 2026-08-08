# PAGE STRUCTURE — Habsha Kamis

## Public Pages (customers)

| Page | Purpose | Key Content |
|------|---------|-------------|
| **Home / Landing** | First impression, trust, CTA | Hero (hero image + tagline), trust signals (years, happy customers), featured designs (3–6), CTA buttons → Gallery / Order |
| **Gallery** | Browse designs by category | Category tabs (family, couples, Muslim, Christian, men, women, kids), grid of design cards (image + name + price range + "Current Price" btn + "Order" btn), click image → modal/gallery view with multiple images |
| **Design Detail** (modal or page) | Full view of one design | Large image + swipe gallery, description, price range, "Current Price" (3 options), "Order" (3 options), share button |
| **Order Flow** (modal or page) | Submit order | 3 tabs: **Insert** (measurement form + phone), **In-person** (map + phone), **Send Clothes** (address + phone) → submits to Telegram bot |
| **Price Inquiry** (modal) | Ask current price | 3 options: Telegram bot (delayed), Open Telegram chat, Show phone number |
| **About / Story** | Trust, story | Shop story, founder photo, years in business, craftsmanship photos |
| **Contact / Location** | Visit or contact | Google Maps embed, phone, Telegram link, WhatsApp link, hours |
| **FAQ** | Reduce support | Common Q&A: pricing, timeline, measurements, shipping, alterations |
| **Privacy / Terms** | Legal | Simple privacy policy, terms of service |

---

## Admin Pages (Clerk-authenticated)

| Page | Purpose | Key Content |
|------|---------|-------------|
| **Admin Dashboard** | Overview | Stats cards (total orders, pending, in production, delivered), recent orders table, quick actions |
| **Designs Management** | CRUD designs | Grid/list of designs, "Add Design" modal (name, category, price range, description, multi-image upload to R2), edit/delete |
| **Orders Management** | Order pipeline | Table with filters (status, date), each row → expand to see customer info, measurements, design, notes, Telegram message ID, status dropdown (received → accepted → calling → in_production → ready → delivered → rejected) |
| **Customers** | View customers | List of customers with order history, measurements |
| **Settings** | Config | Telegram bot token, shop phone, address, Google Maps link, price display settings |

---

## Page Count Summary

| Type | Count |
|------|-------|
| Public pages | 7–8 |
| Admin pages | 4–5 |
| **Total** | **~12–13 pages** |

---

## Open Decisions

1. **Design Detail** — modal (overlay) or separate page? Modal keeps them on gallery; separate page is better for sharing links.
2. **Order Flow** — modal on gallery page or dedicated `/order/[designId]` page?
3. **Price Inquiry** — always a modal (triggered from "Current Price" button)?
4. **Admin** — separate `/admin` route group (Clerk-protected) or separate subdomain?
5. **Languages** — Amharic only, or Amharic + English? (Affects i18n setup)