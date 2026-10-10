[README.md](https://github.com/user-attachments/files/33280789/README.md)
# AI-Powered E-Commerce Backend

A modular e-commerce REST API built with **Node.js, Express.js, and PostgreSQL**. It brings together authentication, product discovery, order processing, Stripe payments, reviews, image management, and admin analytics.

**Live Demo:** https://ecommerce-l7lf.onrender.com  
**Source Code:** https://github.com/vishal-kumar-888/Ecommerce

## 🎯 Problem It Solves

E-commerce systems need several connected workflows—secure user access, product discovery, orders, payments, reviews, and administration. This project brings these operations into one backend API, using PostgreSQL for relational data and external services for payments, images, email, and AI-assisted product discovery.

## ✨ Key Features

- **Authentication:** Registration, login, JWT authentication with HTTP-only cookies, protected routes, profile management, and password recovery with expiring reset tokens.
- **Product catalog:** Product CRUD, Cloudinary image management, search, category/price/rating/availability filters, and pagination.
- **Orders and payments:** Stock validation, order items, shipping information, order status management, and Stripe Payment Intents.
- **Purchase-verified reviews:** Review workflows verify the user's purchase and payment status; product ratings are aggregated.
- **Admin analytics:** Revenue and sales summaries, order and user statistics, top-selling products, and low-stock products.
- **AI-assisted product discovery:** SQL keyword filtering narrows candidate products before they reach the recommendation layer.
- **Error handling:** Reusable asynchronous error handling and centralized error middleware.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, JavaScript (ES Modules)
- **Database:** PostgreSQL, SQL
- **Authentication:** JWT, bcrypt, HTTP-only cookies, SHA-256 reset-token hashing
- **Integrations:** Stripe, Cloudinary, Nodemailer, AI recommendation service
- **Tools & Deployment:** Git, GitHub, Postman, Nodemon, Render

> Keep the listed language and features aligned with the current source code. If the project has been migrated to TypeScript, update the stack accordingly.

## 🏗️ Architecture

```text
Client → Routes → Middleware → Controllers → PostgreSQL
                                  │
                                  ├── Stripe (payments)
                                  ├── Cloudinary (images)
                                  ├── Nodemailer (email)
                                  └── AI recommendation service
```

The codebase separates routes, controllers, middleware, database access, and reusable utilities to keep backend responsibilities organized.

## 🗄️ Database & Engineering Highlights

The PostgreSQL data model covers **users, products, orders, order items, payments, shipping information, and reviews**. Database operations use relational queries and features such as `JOIN`, `GROUP BY`, aggregates, `ILIKE`, parameterized queries, and `LIMIT`/`OFFSET` pagination.

The project demonstrates:

- REST API design and modular backend architecture
- Relational schema design and SQL query composition
- Authentication, authorization, and password recovery
- Dynamic filtering and pagination
- Order/payment workflows and third-party integrations
- Admin analytics and centralized error handling

## ⚙️ Run Locally

### Prerequisites

- Node.js and npm
- PostgreSQL
- Credentials for the integrations you want to use locally (Stripe, Cloudinary, email, and AI service)

### Setup

```bash
git clone https://github.com/vishal-kumar-888/Ecommerce.git
cd Ecommerce
npm install
```

Configure the environment variables required by the application, then run the scripts defined in `package.json`. For example, use `npm run dev` for development or `npm start` if those scripts are configured.

> Check the repository's actual folder structure and `package.json` before running these commands. If the app is inside a `backend/` directory, change into that directory first.

## 🔐 Security

Security-related implementations include bcrypt password hashing, JWT authentication, HTTP-only cookies, protected routes, role-based admin access, expiring password-reset tokens, parameterized SQL queries, and purchase/payment checks for reviews.

Never commit real credentials or API keys. Configure local secrets in the expected environment file and production secrets in Render's environment settings.

## 📡 API Testing

Use **Postman** to test the API. Add a link to an exported Postman collection or OpenAPI/Swagger documentation here when available.

The deployed URL is a backend API and may not display a webpage at `/`. Test a working API route or a configured health-check endpoint instead.

## 🔮 Possible Improvements

Automated tests, Swagger/OpenAPI documentation, Docker-based development, database migrations, CI/CD, rate limiting, and production monitoring/logging.

## 👨‍💻 Author

**Vishal Kumar** — Backend Developer

- [GitHub](https://github.com/vishal-kumar-888)
- [LinkedIn](https://linkedin.com/in/vishal-kumar-089865384)
