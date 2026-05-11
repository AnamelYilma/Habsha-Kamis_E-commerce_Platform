# Habsha Kamiss Shopping Platform

## Project Overview

**Project Name:** Habsha Kamiss Shopping Platform  
**Purpose:** Custom Ethiopian Traditional Dress (Habsha Kamiss) Tailoring & Shopping Platform  
**Status:** Real Project (Developed for Father's Business)  
**Client:** Custom Tailoring Business

---

## Vision

Create an online platform where customers can order custom-made Ethiopian/Harari traditional dresses (Kamiss). The platform allows customers to provide their unique measurements and design preferences, enabling a tailored shopping experience for traditional attire.

---

## Technology Stack

### Frontend
- **Framework:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite

### Backend
- **Language:** Go (Golang)
- **ORM:** GORM (Go ORM Library)
- **Database:** PostgreSQL

---

## Core Business Model

### Order Process

1. **Customer Uploads Design**
   - Customer can either:
     - Upload their own custom image
     - Select from gallery of pre-designed Kamiss styles
   
2. **Customer Provides Measurements**
   - Stomach width
   - Shoulder width
   - Front leg to shoulder length
   - Hand width
   - Leg width
   - Additional width/size details as needed

3. **Customer Provides Contact Information**
   - Phone number
   - Full name
   - Address/Delivery location
   - Email (if applicable)

4. **Admin Review & Manual Contact**
   - Admin dashboard to view incoming orders
   - Admin manually reviews customer request
   - Admin calls customer to:
     - Confirm measurements
     - Discuss design details
     - Finalize pricing and timeline
   - **Note:** Calling is done manually by admin using their phone, not automated

5. **Order Status Notifications**
   - System notifies customer of order status:
     - ✅ Order Received
     - ✅ Order Accepted
     - ✅ Currently Being Called (by admin)
     - ✅ In Production
     - ✅ Ready for Delivery
     - ✅ Delivered

---

## Key Features

### Customer Features
- Upload custom image or select from gallery
- Input detailed body measurements
- Provide contact information
- Real-time order status tracking
- Receive notifications (via SMS/email or in-app)
- View order history

### Admin Features
- Dashboard to view all orders
- Customer contact information display
- Order details with measurements
- Mark order status as accepted/rejected
- Track production progress
- View customer images and specifications
- Generate order reports

### System Features
- Image upload and storage
- Measurement validation
- Order tracking system
- Status notification system
- PostgreSQL database for reliability
- Secure authentication for admin

---

## Database Entities (Preliminary)

### Users
- User ID
- Name
- Email
- Phone Number
- Address
- Registration Date

### Orders
- Order ID
- User ID
- Order Date
- Status (Received, Accepted, In Progress, Ready, Delivered)
- Design Image URL
- Measurements (JSON or separate fields)
- Notes
- Admin Notes
- Last Updated

### Measurements
- Order ID
- Stomach Width
- Shoulder Width
- Front Leg to Shoulder Length
- Hand Width
- Leg Width
- Additional Notes

### Design Gallery (Optional)
- Design ID
- Design Name
- Image URL
- Description
- Category

---

## Project Workflow

### Phase 1: Planning & Setup
- ✅ Project structure finalization
- Define detailed requirements
- Create database schema
- Setup development environment

### Phase 2: Backend Development (Go)
- User authentication
- Order management system
- Measurement storage
- Admin dashboard API
- Image handling API
- Database models with GORM

### Phase 3: Frontend Development (React + TypeScript + Tailwind)
- Customer order page
- Image upload component
- Measurement input form
- Order tracking page
- Admin dashboard
- Responsive design

### Phase 4: Integration
- Connect frontend to backend API
- Test all workflows
- Optimize performance

### Phase 5: Deployment & Launch
- Deploy backend (Go service)
- Deploy frontend (React app)
- Setup PostgreSQL database
- Configure hosting

---

## Important Notes

⚠️ **Manual Process Emphasis:**
- Calling customers is done **manually by admin** using phone
- System provides **notification support** only (status updates)
- Admin makes final decisions on orders
- No automated calling system required

---

## Success Metrics

- Order processing time < 24 hours
- Customer satisfaction with custom fit
- Zero measurement errors (validation system)
- Scalability for growing customer base
- Reliable order tracking

---

## Next Steps

1. Finalize detailed requirements with stakeholders
2. Create database schema design document
3. Setup repository structure
4. Begin backend API development
5. Setup frontend project structure
6. Create mockups/wireframes for UI

---

**Last Updated:** May 11, 2026  
**Status:** In Planning Phase  
**Owner:** Custom Tailoring Business (Father's Project)
