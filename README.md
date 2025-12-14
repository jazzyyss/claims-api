# 🏦 Insurance Claims Management API
**Enterprise-Style Backend System | Node.js • TypeScript • PostgreSQL**

This project focuses on backend architecture, domain modeling, authentication, authorization,
and transactional data integrity following enterprise-grade best practices.

---

## 📌 Project Overview

The Insurance Claims Management API handles the complete lifecycle of insurance claims, including:
- Secure user authentication and role-based access control
- Customer and policy management
- Claim submission, review, and approval workflows
- Status tracking with full audit history
- Scalable and maintainable backend architecture

This project is designed to demonstrate real-world backend engineering skills beyond simple CRUD operations.

---

## 🚀 Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Password hashing using bcrypt
- Role-Based Access Control (RBAC)
- Roles supported:
  - **ADMIN**
  - **ADJUSTER**
  - **CUSTOMER**

### 👥 Users
- Secure login
- Role-based permissions
- Account activation/deactivation

### 🧑 Customers
- Customer profiles
- Linked user accounts
- Pagination support

### 📄 Policies
- Policies linked to customers
- Coverage amount, premium, and validity
- Admin-only creation and updates

### 📝 Claims
- Claim submission and validation
- Transaction-safe creation
- Assignment to adjusters
- Controlled status transitions

#### Claim Status Workflow
```
SUBMITTED → IN_REVIEW → APPROVED → PAID → CLOSED
SUBMITTED → REJECTED → CLOSED
```

### 📜 Claim Status History
- Complete audit trail for all status changes
- Records old status, new status, user, timestamp, and notes

### 📎 Attachments (Optional)
- Claim attachment metadata
- Cloud-ready file URL storage

---

## 🧱 Architecture & Design

The application follows a clean modular architecture:
- **Routes** – API endpoints
- **Controllers** – Request/response handling
- **Services** – Business logic
- **Middleware** – Auth, RBAC, error handling
- **Utils** – Shared helpers (JWT, password hashing)

### Folder Structure
```
claims-api/
  src/
    config/
    middleware/
    modules/
      auth/
      users/
      customers/
      policies/
      claims/
      attachments/
    utils/
    app.ts
    server.ts
  .env
  tsconfig.json
