# AI-Powered E-Commerce Backend

A backend REST API for an e-commerce platform built with **Node.js, Express.js, and PostgreSQL**. The system provides authentication, product management, search and filtering, orders, payments, reviews, image management, admin analytics, and AI-assisted product discovery.

The project is structured around controllers, routes, middleware, database access, and reusable utility modules to keep backend responsibilities separated and maintainable.

---

## 🚀 Features

### Authentication & User Management

* User registration and login
* JWT-based authentication
* HTTP-only authentication cookies
* Password hashing using `bcrypt`
* Protected routes using authentication middleware
* Get authenticated user profile
* Update user profile
* Update password
* Forgot-password flow
* Secure password-reset tokens with expiration
* Email-based password recovery
* Profile avatar upload and management

---

### 🛍️ Product Management

* Create, update, delete, and retrieve products
* Product image upload using Cloudinary
* Product image deletion from Cloudinary
* Product search
* Category filtering
* Price-range filtering
* Rating filtering
* Stock/availability filtering
* Pagination
* New-product listing
* Top-rated product listing
* Product reviews and ratings

---

### ⭐ Review System

The review system includes a purchase-verification flow.

Users can only review products that they have actually purchased and whose payment has been completed.

The backend verifies the relationship between:

```text
User
  ↓
Order
  ↓
Order Item
  ↓
Product
  ↓
Payment
```

The system also supports:

* Creating reviews
* Updating existing reviews
* Deleting reviews
* Calculating average product ratings
* Returning reviews with reviewer information

---

### 🛒 Order Management

* Create orders
* Validate product availability
* Calculate order totals
* Store order items
* Store shipping information
* Retrieve individual orders
* Retrieve a user's orders
* Admin access to all orders
* Update order status
* Delete orders

The order workflow connects products, buyers, order items, shipping information, and payments through PostgreSQL relationships.

---

### 💳 Stripe Payments

Integrated **Stripe Payment Intents** into the order workflow.

```text
Create Order
     ↓
Validate Products & Stock
     ↓
Calculate Total
     ↓
Create Order
     ↓
Create Payment Intent
     ↓
Return Client Secret
```

The backend returns the Stripe client secret required by the frontend to complete the payment flow.

---

### ☁️ Cloudinary Integration

Cloudinary is used for image storage and management.

Supported operations include:

* Product image upload
* User avatar upload
* Image metadata storage
* Image deletion when resources are removed

---

### 🔎 Product Search & Filtering

The product API supports multiple query parameters:

```text
availability
price
category
ratings
search
page
```

Example:

```text
GET /api/products?category=electronics&price=100-1000&ratings=4&page=1
```

The backend dynamically builds SQL filtering conditions and uses parameterized queries for user-provided values.

---

### 🤖 AI-Assisted Product Discovery

The project includes an AI-assisted product discovery workflow.

Instead of sending the entire product catalog directly to the AI layer, the backend first performs basic SQL filtering based on the user's prompt.

```text
User Prompt
     ↓
Remove Stop Words
     ↓
Extract Search Keywords
     ↓
PostgreSQL ILIKE Filtering
     ↓
Candidate Products
     ↓
AI Recommendation Layer
     ↓
Filtered Products
```

This two-step approach reduces the number of products passed to the AI recommendation layer.

---

### 📊 Admin Dashboard

The admin API provides backend analytics including:

* Total revenue
* Total users
* Order-status statistics
* Today's revenue
* Yesterday's revenue
* Monthly sales
* Top-selling products
* Low-stock products
* Revenue growth
* New users this month
* Current-month sales

These statistics are calculated using PostgreSQL aggregation and relational queries.

---

## 🏗️ Backend Architecture

The project follows a modular backend structure:

```text
Client
  │
  ▼
Routes
  │
  ▼
Controllers
  │
  ├── Authentication
  ├── Products
  ├── Orders
  └── Admin
  │
  ▼
Middleware
  │
  ├── Authentication
  ├── Async Error Handling
  └── Error Handling
  │
  ▼
Database Layer
  │
  ▼
PostgreSQL
```

External services are integrated through utility modules:

```text
                 ┌── PostgreSQL
                 │
API ── Controllers ── Stripe
                 │
                 ├── Cloudinary
                 │
                 ├── Email Service
                 │
                 └── AI Recommendation
```

---

## 📁 Project Structure

```text
backend/
│
├── app.js
├── server.js
│
├── config/
│   └── config.env
│
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── orderController.js
│   └── productController.js
│
├── database/
│   └── db.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── catchAsyncError.js
│   └── errorMiddleware.js
│
├── models/
│   ├── orderItemsTable.js
│   ├── ordersTable.js
│   ├── paymentsTable.js
│   ├── productReviewsTable.js
│   ├── productTable.js
│   ├── shippinginfoTable.js
│   └── userTable.js
│
├── router/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
│
└── utils/
    ├── createTables.js
    ├── generateForgotPasswordEmailTemplate.js
    ├── generatePaymentIntent.js
    ├── generateResetPasswordToken.js
    ├── getAIRecommendation.js
    ├── jwtToken.js
    └── sendEmail.js
```

---

## 🗄️ Database Design

The application uses **PostgreSQL** as its relational database.

Core entities include:

```text
Users
 │
 ├── Orders
 │      │
 │      ├── Order Items ─── Products
 │      │
 │      ├── Shipping Information
 │      │
 │      └── Payments
 │
 └── Reviews ───────────── Products
```

The backend uses PostgreSQL features including:

* `JOIN`
* `LEFT JOIN`
* `GROUP BY`
* `COUNT`
* `AVG`
* `SUM`
* `COALESCE`
* `json_agg`
* `json_build_object`
* `ILIKE`
* Parameterized queries
* Pagination with `LIMIT` and `OFFSET`

---

## 🔐 Security

Security-related implementations include:

* Password hashing with `bcrypt`
* JWT authentication
* HTTP-only cookies
* Protected API routes
* Parameterized SQL queries
* Expiring password-reset tokens
* SHA-256 hashing for reset tokens
* Purchase verification before product reviews
* Role-based administrative access

User-provided SQL values are passed through PostgreSQL query parameters rather than directly interpolated into SQL conditions.

---

## 🧩 Error Handling

The backend uses centralized asynchronous error handling.

Controllers are wrapped using:

```javascript
catchAsyncErrors(...)
```

Application errors are passed to a centralized error middleware:

```text
Controller
    ↓
catchAsyncErrors
    ↓
ErrorHandler
    ↓
Central Error Middleware
    ↓
HTTP Response
```

This avoids repeating `try/catch` logic across controllers.

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* JavaScript (ES Modules)

### Database

* PostgreSQL
* SQL

### Authentication & Security

* JWT
* bcrypt
* HTTP-only cookies
* SHA-256

### Payments

* Stripe

### Storage

* Cloudinary

### Communication

* Nodemailer

### AI

* AI-assisted product recommendation

### Development

* Nodemon
* Git
* GitHub
* Postman

---

## ⚙️ Environment Variables

Create a configuration file containing the required environment variables for:

```text
PORT
DATABASE_URL / PostgreSQL configuration
JWT_SECRET
JWT_EXPIRE
COOKIE_EXPIRE
CLOUDINARY credentials
STRIPE credentials
EMAIL credentials
AI API credentials
```

> Use the exact variable names defined in your project's configuration before deployment.

---

## ▶️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure your environment variables.

Start the development server:

```bash
npm run dev
```

Start the server normally:

```bash
npm start
```

---

## 🔄 Main Backend Workflows

### Authentication

```text
Register
   ↓
Validate Input
   ↓
Hash Password
   ↓
Store User
   ↓
Generate JWT
   ↓
HTTP-only Cookie
```

### Product Creation

```text
Request
   ↓
Authentication
   ↓
Validate Product
   ↓
Upload Images → Cloudinary
   ↓
Store Product → PostgreSQL
   ↓
Return Product
```

### Order Creation

```text
Request
   ↓
Validate User
   ↓
Validate Products
   ↓
Check Stock
   ↓
Calculate Total
   ↓
Create Order
   ↓
Create Order Items
   ↓
Store Shipping Information
   ↓
Create Stripe Payment Intent
   ↓
Return Client Secret
```

### Product Review

```text
Review Request
      ↓
Authenticated User
      ↓
Check Purchased Product
      ↓
Check Payment Status
      ↓
Create / Update Review
      ↓
Calculate Average Rating
      ↓
Update Product Rating
```

---

## 📌 What This Project Demonstrates

This project demonstrates practical backend engineering concepts including:

* REST API development
* Modular Express.js architecture
* PostgreSQL relational database design
* Complex SQL queries
* Authentication and authorization
* Secure password handling
* Password recovery
* Pagination and dynamic filtering
* Order processing
* Payment integration
* Cloud file storage
* Centralized error handling
* Admin analytics
* External service integration
* AI-assisted product discovery

---

## 🎯 Backend Engineering Focus

The primary focus of this project is backend development rather than frontend UI.

The project emphasizes:

```text
API Design
    +
Database Design
    +
Authentication
    +
Business Logic
    +
External Integrations
    +
Error Handling
    +
Data Validation
```

---

## 📄 API Documentation

API endpoints can be tested using **Postman**.

Add your API documentation or Postman collection here:

```text
[Postman Collection / API Documentation]
```

---

## 👨‍💻 Author

**Vishal Kumar**

Backend Developer focused on:

* Node.js
* TypeScript
* REST APIs
* PostgreSQL
* MongoDB
* Redis
* Backend Architecture

---

## ⭐ Future Improvements

Potential improvements include:

* Automated API tests
* Docker-based development environment
* CI/CD pipeline
* Database migrations
* Redis caching
* Rate limiting
* Request validation using a dedicated validation library
* API versioning
* Production monitoring and logging
* Swagger/OpenAPI documentation

---

## 📜 License

This project is intended for learning and portfolio purposes.
