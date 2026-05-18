# API Route Structure

Habsha Kamiss backend routes are registered in `internal/server/server.go` using Go 1.22+ `http.ServeMux` method patterns. All JSON API routes live under `/api/v1`.

**Default base URL:** `http://localhost:8080` (set `PORT` in the environment)

---

## Overview

```text
Request
  └── securityHeaders
        └── cors
              └── requestLogger
                    └── ServeMux (routes)
```

| Layer | Purpose |
| --- | --- |
| `securityHeaders` | Standard security response headers |
| `cors` | CORS for configured origins; handles `OPTIONS` preflight |
| `requestLogger` | Structured request logging |
| `withAdmin` | Admin-only routes; validates `X-Admin-Key` |

**Allowed methods (CORS):** `GET`, `POST`, `PATCH`, `OPTIONS`  
**Allowed headers:** `Content-Type`, `X-Admin-Key`

---

## Route map

### Health

| Method | Path | Auth | Handler | Description |
| --- | --- | --- | --- | --- |
| `GET` | `/health` | None | `health` | Service health check |

**Response `200`:**

```json
{
  "status": "ok",
  "service": "habsha-kamiss-backend",
  "time": "2026-05-16T12:00:00Z"
}
```

---

### Public API (`/api/v1`)

| Method | Path | Auth | Handler | Description |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/designs` | None | `listDesigns` | List active gallery designs |
| `POST` | `/api/v1/orders` | None | `createOrder` | Create a customer order |
| `GET` | `/api/v1/orders/track/{trackingCode}` | None | `getTrackedOrder` | Track order by tracking code |
| `POST` | `/api/v1/uploads/design` | None | `uploadDesign` | Upload a custom design image |

#### `GET /api/v1/designs`

Returns active designs, newest first.

**Response `200`:**

```json
{
  "items": [ /* Design[] */ ]
}
```

#### `POST /api/v1/orders`

**Body (JSON):**

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `customer.full_name` | string | Yes | |
| `customer.phone_number` | string | Yes | Min length 7 |
| `customer.address` | string | Yes | |
| `customer.email` | string | No | Validated if present |
| `measurement.unit` | string | No | `cm` (default) or `inch` |
| `measurement.stomach_width` | number | Yes | `0 < value ≤ 400` |
| `measurement.shoulder_width` | number | Yes | Same bounds |
| `measurement.front_leg_to_shoulder_length` | number | Yes | Same bounds |
| `measurement.hand_width` | number | Yes | Same bounds |
| `measurement.leg_width` | number | Yes | Same bounds |
| `measurement.additional_notes` | string | No | Max 1000 chars |
| `selected_design_id` | number | One of design fields | Gallery design ID |
| `custom_design_url` | string | One of design fields | `/uploads/...` or `http(s)` URL |
| `notes` | string | No | Max 1000 chars |

**Response `201`:** Full `Order` object (includes `customer`, `measurement`, `selected_design` when applicable).

**Errors:** `400` validation / invalid design; `500` server error.

#### `GET /api/v1/orders/track/{trackingCode}`

Public tracking view (no customer PII beyond what is in the order payload).

**Path param:** `trackingCode` — order tracking code.

**Response `200`:** `publicOrderResponse` (id, tracking_code, status, design fields, measurement, timestamps).

**Errors:** `404` not found.

#### `POST /api/v1/uploads/design`

**Content-Type:** `multipart/form-data`  
**Field:** `file` — image (`.jpg`, `.jpeg`, `.png`, `.webp`); max size from `MAX_UPLOAD_SIZE_MB` (default 10 MB).

**Response `201`:**

```json
{
  "file_name": "a1b2c3d4.png",
  "url": "/uploads/designs/a1b2c3d4.png"
}
```

Use `url` as `custom_design_url` when creating an order.

---

### Static files

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/uploads/*` | None | Serves files from `UPLOAD_DIR` (default `uploads/`) |

Uploaded designs are stored under `uploads/designs/`.

---

### Admin API (`/api/v1/admin`)

All admin routes require header:

```http
X-Admin-Key: <ADMIN_API_KEY>
```

If `ADMIN_API_KEY` is not set in the environment, admin routes return `401` (admin access disabled).

| Method | Path | Handler | Description |
| --- | --- | --- | --- |
| `GET` | `/api/v1/admin/orders` | `listAdminOrders` | List orders (newest first) |
| `GET` | `/api/v1/admin/orders/{id}` | `getAdminOrder` | Get one order by ID |
| `PATCH` | `/api/v1/admin/orders/{id}/status` | `updateAdminOrderStatus` | Update order status |
| `GET` | `/api/v1/admin/dashboard/summary` | `getAdminDashboardSummary` | Order counts summary |

#### `GET /api/v1/admin/orders`

**Query parameters:**

| Param | Default | Max | Description |
| --- | --- | --- | --- |
| `limit` | `25` | `100` | Page size |
| `status` | — | — | Filter by order status (see below) |

**Response `200`:**

```json
{
  "items": [ /* Order[] with customer, measurement, selected_design */ ]
}
```

#### `GET /api/v1/admin/orders/{id}`

**Path param:** `id` — numeric order ID.

**Response `200`:** Full `Order` object.  
**Errors:** `404` not found.

#### `PATCH /api/v1/admin/orders/{id}/status`

**Body (JSON):**

```json
{
  "status": "in_production",
  "admin_notes": "Optional internal note (max 2000 chars)"
}
```

**Response `200`:** Updated `Order` object.

#### `GET /api/v1/admin/dashboard/summary`

**Response `200`:**

```json
{
  "total_orders": 42,
  "recent_orders": 5,
  "by_status": {
    "received": 10,
    "accepted": 8,
    "calling_customer": 2,
    "in_production": 12,
    "ready_for_delivery": 4,
    "delivered": 5,
    "rejected": 1
  }
}
```

`recent_orders` = orders created in the last 7 days.

---

## Order statuses

Used in filters, updates, and responses:

| Value | Meaning |
| --- | --- |
| `received` | New order (default on create) |
| `accepted` | Accepted by shop |
| `calling_customer` | Contacting customer |
| `in_production` | Being made |
| `ready_for_delivery` | Ready to deliver |
| `delivered` | Completed |
| `rejected` | Rejected |

---

## Error responses

Errors are JSON with at least a `message` field.

**Validation (`400`):**

```json
{
  "message": "validation failed",
  "fields": {
    "customer.phone_number": "phone number is required"
  }
}
```

**Unauthorized admin (`401`):**

```json
{
  "message": "admin access denied"
}
```

---

## Source reference

Routes are defined in:

```35:66:backend/internal/server/server.go
func (s *Server) Routes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", s.health)
	mux.HandleFunc("GET /api/v1/designs", s.listDesigns)
	mux.HandleFunc("POST /api/v1/orders", s.createOrder)
	mux.HandleFunc("GET /api/v1/orders/track/{trackingCode}", s.getTrackedOrder)
	mux.HandleFunc("POST /api/v1/uploads/design", s.uploadDesign)
	// ... uploads static + admin routes
}
```

---

## Frontend routes

The `client/` app does not define client-side routes yet (no React Router). All documented routes are backend HTTP endpoints.
