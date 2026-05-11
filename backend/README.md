# Habsha Kamiss Backend MVP

This folder contains the first Go backend MVP for the Habsha Kamiss shopping platform. It is intentionally small but already usable for local frontend integration.

## What is included

- `POST /api/v1/orders` to create a customer order
- `GET /api/v1/orders/track/{trackingCode}` to track order status
- `POST /api/v1/uploads/design` for local design image upload
- `GET /api/v1/designs` to list gallery items
- `GET /api/v1/admin/orders` to review incoming orders
- `GET /api/v1/admin/orders/{id}` to inspect one order
- `PATCH /api/v1/admin/orders/{id}/status` to update progress
- `GET /api/v1/admin/dashboard/summary` for basic counts
- PostgreSQL + GORM setup with automatic schema creation for MVP

## MVP assumptions

- Admin authentication is a simple `X-Admin-Key` header from `ADMIN_API_KEY`
- Customer uploads are stored on local disk in `uploads/`
- Notifications are not wired yet; status data is ready for that next step
- Database schema uses `AutoMigrate` for now; production should move to explicit SQL migrations later

## Environment

Copy `.env.example` values into your shell or local env file loader of choice.

Required:

- `DATABASE_URL`

Optional:

- `PORT` default `8080`
- `UPLOAD_DIR` default `uploads`
- `MAX_UPLOAD_SIZE_MB` default `10`
- `CORS_ALLOWED_ORIGINS` default `http://localhost:5173`
- `ADMIN_API_KEY` default empty, which disables admin-key enforcement for local setup

## Run locally

```powershell
$env:DATABASE_URL="postgres://postgres:postgres@localhost:5432/habsha_kamiss?sslmode=disable"
$env:ADMIN_API_KEY="change-me"
go run ./cmd/api
```

The API starts on `http://localhost:8080` by default.

## Example requests

Create an order:

```http
POST /api/v1/orders
Content-Type: application/json

{
  "customer": {
    "full_name": "Sara Ali",
    "email": "sara@example.com",
    "phone_number": "+251911000000",
    "address": "Addis Ababa"
  },
  "measurement": {
    "unit": "cm",
    "stomach_width": 82,
    "shoulder_width": 39,
    "front_leg_to_shoulder_length": 132,
    "hand_width": 19,
    "leg_width": 24,
    "additional_notes": "Prefer slightly loose fit"
  },
  "custom_design_url": "/uploads/designs/example.png",
  "notes": "Need it before holiday season"
}
```

Update order status:

```http
PATCH /api/v1/admin/orders/1/status
X-Admin-Key: change-me
Content-Type: application/json

{
  "status": "in_production",
  "admin_notes": "Fabric confirmed with customer by phone."
}
```
