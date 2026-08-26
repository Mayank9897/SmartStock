# 📦 SmartStock — AI-Powered Inventory & Sales Management System

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-3.7_Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT_&_Bcrypt-blue)](https://jwt.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> **SmartStock** is an enterprise-grade, full-stack inventory and sales intelligence platform. Engineered with a clean **Controller-Service-Model** backend architecture, concurrency-safe atomic inventory operations, role-based access control (RBAC), and real-time business intelligence powered by **Google Gemini AI**.

---

## 📑 Table of Contents

1. [System Overview & Value Proposition](#-system-overview--value-proposition)
2. [Core Features](#-core-features)
3. [System Architecture & Design Patterns](#-system-architecture--design-patterns)
4. [Concurrency-Safe Inventory Engine](#-concurrency-safe-inventory-engine)
5. [Data-Grounded AI Advisor](#-data-grounded-ai-advisor)
6. [Data Models & Schema Design](#-data-models--schema-design)
7. [REST API Documentation](#-rest-api-documentation)
8. [Security & Enterprise Best Practices](#-security--enterprise-best-practices)
9. [Project Directory Layout](#-project-directory-layout)
10. [Author & Portfolio Contact](#-author--portfolio-contact)

---

## 🎯 System Overview & Value Proposition

Modern retail operations and supply chains demand high-throughput reliability, real-time inventory precision, and proactive data analytics. **SmartStock** addresses traditional inventory challenges with three engineering solutions:

1. **Eliminating Race Conditions**: Employs single-document atomic update conditions (`$gte` + `$inc`) in MongoDB to prevent negative inventory during high-concurrency checkout bursts.
2. **Actionable AI Business Intelligence**: Injects live inventory and sales velocity data directly into **Google Gemini 3.7 Flash** to provide grounded, hallucination-free restocking and revenue optimization recommendations.
3. **Decoupled, Scalable Architecture**: Adheres strictly to the **Controller $\rightarrow$ Service $\rightarrow$ Model** design pattern, ensuring high testability, separation of concerns, and clean API boundaries.

---

## ✨ Core Features

- 🔐 **Authentication & RBAC**: Secure JWT-based authentication with `bcryptjs` password hashing and granular role enforcement (`Admin` vs. `Staff`).
- 📦 **Inventory & SKU Lifecycle**: Automated status state machine (`In Stock`, `Low Stock`, `Out of Stock`), search, filtering, and batch restocking.
- ⚡ **Concurrency-Safe Point of Sale**: Real-time sales checkout engine with atomic inventory deductions and invoice generation.
- 📊 **Executive Analytics Dashboard**: High-performance MongoDB aggregation pipelines for revenue KPIs, monthly sales trends, and category distribution.
- 🤖 **Data-Grounded Gemini AI Advisor**: Real-time DB context retrieval coupled with Gemini AI to generate automated purchasing advice and demand forecasts.
- 🛡️ **Fault-Tolerant AI Fallback**: Graceful degradation to a deterministic heuristic engine if AI rate limits or network issues occur.

---

## 🏗️ System Architecture & Design Patterns

SmartStock follows a clean, layered architectural pattern:

```
                  +-----------------------------------+
                  |      Client / Frontend Layer      |
                  | (React / Vue / Next.js / Mobile)  |
                  +-----------------+-----------------+
                                    | (JSON / HTTPS)
                                    v
                  +-----------------------------------+
                  |     Express Application Layer     |
                  |   [CORS -> JSON Parser -> Auth]   |
                  +-----------------+-----------------+
                                    |
                    +---------------+---------------+
                    |                               |
                    v                               v
        +-----------------------+       +-----------------------+
        |   Auth Controller     |       | Inventory Controller  |
        |   Product Controller  |       | Dashboard Controller  |
        |   Sale Controller     |       | AI Advisor Controller |
        +-----------+-----------+       +-----------+-----------+
                    |                               |
                    v                               v
        +-----------------------+       +-----------------------+
        |   Business Services   | <---> |   AI Context Engine   |
        |  (Validation & Logic) |       |   (backend/services)  |
        +-----------+-----------+       +-----------+-----------+
                    |                               |
                    |                       (Prompt + Live Metrics)
                    |                               v
                    |                   +-----------------------+
                    |                   |   Google Gemini API   |
                    |                   |  (@google/genai SDK)  |
                    |                   +-----------------------+
                    v
        +-----------------------------------+
        |       Mongoose Data Models        |
        |      (User, Product, Sale)        |
        +-----------------+-----------------+
                          |
                          v
        +-----------------------------------+
        |     MongoDB Database Engine       |
        |  (Atomic Operations & Aggregations|
        +-----------------------------------+
```

---

## 🛡️ Concurrency-Safe Inventory Engine

### The Challenge
In multi-user retail environments, standard `findOne` followed by `save()` creates a critical race condition window where simultaneous checkouts can lead to overselling and negative inventory.

### The Solution
SmartStock implements single-document conditional atomic decrements at the database engine level:

```javascript
// Atomic inventory deduction with pre-condition check
const updatedProduct = await Product.findOneAndUpdate(
  {
    _id: item.productId,
    stockQuantity: { $gte: item.quantity } // Evaluated atomically by MongoDB
  },
  {
    $inc: { stockQuantity: -item.quantity } // Immediate decrement
  },
  { new: true }
);

if (!updatedProduct) {
  throw new Error(`Insufficient stock or concurrent modification for item: ${item.name}`);
}
```

---

## 🤖 Data-Grounded AI Advisor

Rather than generic conversational LLMs, SmartStock uses **Retrieval-Augmented Context Injection**:

```
[MongoDB Database] 
       │ (Extract Low-Stock SKUs, 30-Day Sales Velocity, Revenue Metrics)
       ▼
[aiService.js] 
       │ (Construct Structured Business Context & Heuristic Directives)
       ▼
[Google Gemini 3.7 Flash Model]
       │ (Analyzes exact numerical facts & prioritizes operational actions)
       ▼
[Actionable Restocking & Demand Forecast Output]
```

### Resilience & Fallback Mode
If the Gemini API key is unset or external API rate limits are hit, the system automatically falls back to an internal rule-based analysis engine without throwing 500 errors to the client.

---

## 📊 Data Models & Schema Design

### User Model (`models/User.js`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | `String` | User full name |
| `email` | `String` | Unique login email (indexed) |
| `password` | `String` | Salted bcrypt password hash |
| `role` | `String` | Role-Based Access (`admin` \| `staff`) |
| `createdAt` | `Date` | Timestamp of account creation |

### Product Model (`models/Product.js`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | `String` | Product title / name |
| `sku` | `String` | Unique Stock Keeping Unit (indexed, uppercase) |
| `category` | `String` | Product categorization |
| `price` | `Number` | Retail selling price |
| `costPrice` | `Number` | Procurement cost price |
| `stockQuantity` | `Number` | Current available inventory count |
| `minimumStock` | `Number` | Safety stock alert threshold |
| `status` | `String` | Dynamic status (`In Stock` \| `Low Stock` \| `Out of Stock`) |
| `createdBy` | `ObjectId` | Reference to User who created the product |

### Sale Model (`models/Sale.js`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `invoiceNumber` | `String` | Unique generated invoice ID |
| `items` | `Array` | Line items (Product Ref, Quantity, Unit Price, Subtotal) |
| `totalAmount` | `Number` | Total calculated sale amount |
| `paymentMethod` | `String` | `Cash`, `Credit Card`, `Debit Card`, `UPI`, `Net Banking` |
| `soldBy` | `ObjectId` | Reference to Staff / User who processed the sale |
| `saleDate` | `Date` | Timestamp of transaction |

---

## 🔌 REST API Documentation

### 🔑 Authentication Endpoints (`/api/auth`)
- `POST /api/auth/register` — Register new user account (returns JWT token)
- `POST /api/auth/login` — Authenticate credentials & issue JWT
- `GET /api/auth/profile` — Get authenticated user session details

### 📦 Product & Catalog Endpoints (`/api/products`)
- `GET /api/products` — List products (with pagination, search, category filter)
- `GET /api/products/:id` — Get single product details
- `POST /api/products` — Create new product *(Admin only)*
- `PUT /api/products/:id` — Update product details *(Admin only)*
- `DELETE /api/products/:id` — Remove product *(Admin only)*

### 📋 Inventory Management Endpoints (`/api/inventory`)
- `GET /api/inventory/low-stock` — Retrieve all items below minimum threshold
- `POST /api/inventory/restock` — Batch restock quantities *(Admin only)*
- `GET /api/inventory/export` — Export inventory report *(Admin only)*

### 💳 Sales & Checkout Endpoints (`/api/sales`)
- `POST /api/sales` — Process new sale with atomic stock deduction
- `GET /api/sales` — Retrieve sales history with date range filtering
- `GET /api/sales/:invoiceNumber` — Fetch invoice and line items

### 📈 Analytics & Metrics Endpoints (`/api/dashboard`)
- `GET /api/dashboard/summary` — Aggregate revenue, total sales, and stock health KPIs
- `GET /api/dashboard/charts` — Monthly revenue trends & category distribution

### 🧠 AI Intelligence Endpoints (`/api/ai`)
- `GET /api/ai/recommendations` — Generate AI-grounded restocking & purchasing advice
- `POST /api/ai/query` — Natural language business Q&A based on live store data

---

## 🔒 Security & Enterprise Best Practices

- **Password Hashing**: Salted and hashed using `bcryptjs` (work factor 10).
- **Stateless Tokens**: Signed JWT tokens with configurable expiration (`7d`).
- **Granular RBAC**: Role-based access control protecting critical mutations.
- **Input Validation**: Strict schema enforcement preventing NoSQL injection.
- **CORS Protection**: Domain whitelisting for authorized frontends.
- **Environment Isolation**: Zero hardcoded secrets; fully driven by `.env`.

---

## 📂 Project Directory Layout

```
smartstock/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection lifecycle
│   ├── controllers/
│   │   ├── authController.js     # User registration & login handlers
│   │   ├── productController.js  # Product catalog management
│   │   ├── inventoryController.js# Low-stock alerts & restocking
│   │   ├── saleController.js     # Checkout processing & invoice generation
│   │   ├── dashboardController.js# Aggregated revenue & KPI statistics
│   │   └── aiController.js       # AI advisor endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT token validation & RBAC authorization
│   │   └── errorMiddleware.js    # Centralized HTTP error handler
│   ├── models/
│   │   ├── User.js               # User & Authentication Model
│   │   ├── Product.js            # Product & Stock Model
│   │   └── Sale.js               # Sales Invoice & Line Items Model
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   ├── productRoutes.js      # /api/products routes
│   │   ├── inventoryRoutes.js    # /api/inventory routes
│   │   ├── saleRoutes.js         # /api/sales routes
│   │   ├── dashboardRoutes.js    # /api/dashboard routes
│   │   └── aiRoutes.js           # /api/ai routes
│   ├── services/
│   │   └── aiService.js          # Google Gemini AI integration & prompt grounding
│   ├── utils/
│   │   ├── generateToken.js      # JWT signing utility
│   │   └── exportHelper.js       # Export helper utility
│   ├── .env.example              # Blueprint for environment variables
│   ├── package.json              # Backend dependencies & scripts
│   └── server.js                 # Express application entry point
├── frontend/                     # Client application placeholder
├── .gitignore                    # Git ignore file for secrets and dependencies
└── README.md                     # Portfolio presentation & technical documentation
```

---

## 👨‍💻 Author & Portfolio Contact

- **Developer**: [Mayank](https://github.com/Mayank9897)
- **Repository**: [https://github.com/Mayank9897/SmartStock](https://github.com/Mayank9897/SmartStock)
- **Project**: SmartStock — AI-Powered Inventory & Sales Management System

---

## 📄 License
This project is open-source and licensed under the [ISC License](LICENSE).
