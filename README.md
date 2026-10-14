# 📦 SmartStock — AI-Powered Enterprise Inventory & Sales Management Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8.x-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT_&_Bcrypt-blue)](https://jwt.io/)
[![Currency](https://img.shields.io/badge/Currency-INR_(₹)-green)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **SmartStock** is a full-stack, enterprise-grade inventory intelligence and point-of-sale (POS) platform designed for modern retail and wholesale commerce. Built on the **MERN** stack (MongoDB, Express, React, Node.js), it integrates concurrency-safe stock updates, role-based access control, real-time analytics visualization, and complete Indian commercial market localization.

---

## 📑 Table of Contents

1. [System Overview & Architecture](#-system-overview--architecture)
2. [Key Application Modules](#-key-application-modules)
3. [Concurrency-Safe Inventory Engine](#-concurrency-safe-inventory-engine)
4. [Indian Market Localization](#-indian-market-localization)
5. [UI / UX Design System](#-ui--ux-design-system)
6. [Data Models & Schema Specifications](#-data-models--schema-specifications)
7. [RESTful API Endpoints](#-restful-api-endpoints)
8. [Project Structure](#-project-structure)
9. [Author & Portfolio Contact](#-author--portfolio-contact)

---

## 🎯 System Overview & Architecture

SmartStock solves critical inventory management challenges: preventing overselling during checkout bursts, maintaining accurate valuation across warehouses, and providing actionable executive insights through real-time telemetry.

```
                              ┌──────────────────────────────────────────────┐
                              │             React 18 SPA (Vite)              │
                              │  Tailwind CSS • Recharts • Context Hooks     │
                              └──────────────────────┬───────────────────────┘
                                                     │ HTTPS / JSON API
                                                     ▼
                              ┌──────────────────────────────────────────────┐
                              │          Express REST API Gateway            │
                              │     CORS • Auth Middleware • Error Handler   │
                              └──────────┬────────────────────────┬──────────┘
                                         │                        │
                      ┌──────────────────┴──────┐      ┌──────────┴─────────────────┐
                      │  Authentication Engine  │      │  Inventory & Sales Engine  │
                      │  JWT + Bcrypt Hashing   │      │  Atomic Decrement Logic    │
                      └──────────────────┬──────┘      └──────────┬─────────────────┘
                                         │                        │
                                         ▼                        ▼
                              ┌──────────────────────────────────────────────┐
                              │               MongoDB Atlas                  │
                              │       Atomic Engine & Aggregations           │
                              └──────────────────────────────────────────────┘
```

---

## ✨ Key Application Modules

### 1. 📊 Executive Dashboard
- **Real-Time KPIs**: Live gross revenue, inventory asset valuation, active order counts, and safety stock health indices.
- **Visual Trajectory**: Dynamic Recharts area chart illustrating 30-day sales trajectories.
- **Stock Alert Feed**: Priority indicators warning of low-stock and out-of-stock items needing procurement attention.

### 2. 📦 Product Catalog & Stock Operations
- **Full SKU Management**: Search, category filtering, multi-warehouse classification, and supplier association.
- **Stock Health State Machine**: Dynamic state evaluation (`In Stock` $\rightarrow$ `Low Stock` $\rightarrow$ `Out of Stock`) based on minimum threshold rules.
- **Quick Stock Adjustment Drawer**: Live slide-out drawer providing instant stock delta calculations and audit recording.

### 3. ⚡ High-Throughput Sales & POS Register
- **Fast Product Lookup**: Barcode search and category-filtered grid cards for rapid terminal scanning.
- **Dynamic Cart Engine**: Line-item quantity steppers, subtotal computation, automated GST tax calculation, and loyalty tier discounts.
- **Multi-Tender Payment Processing**: Support for UPI / Razorpay, Credit/Debit Cards, Net Banking, and Cash with instant invoice generation.

### 4. 📈 Analytics & Financial Valuation
- **Sales vs. Margin Composed Analysis**: Overlaying gross sales volume against net operational margin.
- **Category Inventory Distribution**: Interactive SVG donut chart detailing stock valuation across departments.
- **Top 5 Bestselling Products**: Leaderboard ranking products by units sold, total revenue, and profit margins.
- **Dead Stock Analysis**: Highlighting stagnant capital and slow-moving SKUs.

### 5. 👥 Vendor & Customer Directories
- **Customer CRM**: Tracking business accounts, cities, credit balances, and loyalty tiers.
- **Vendor Network**: Managing supplier contact details, lead times, and procurement routing.

---

## 🛡️ Concurrency-Safe Inventory Engine

### The Race Condition Problem
In high-throughput multi-terminal environments, traditional read-then-write patterns (`find` followed by `save`) create a race condition where two simultaneous checkouts for the last available item result in inventory corruption and negative stock.

### The Solution: Atomic Pre-Condition Decrements
SmartStock prevents overselling using single-document atomic update queries at the database engine level:

```javascript
// Concurrency-safe atomic deduction
const updatedProduct = await Product.findOneAndUpdate(
  {
    _id: item.product,
    stockQuantity: { $gte: item.quantity }, // Pre-condition verified atomically
  },
  {
    $inc: { stockQuantity: -item.quantity }, // Atomic decrement
  },
  { new: true }
);

if (!updatedProduct) {
  throw new Error(`Insufficient stock for item: ${item.name}`);
}
```

---

## 🇮🇳 Indian Market Localization

- **Standard Currency (INR ₹)**: Standardized across all views using `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.
- **Indian Numbering Format**: Correct Lakh and Crore formatting (e.g., `₹1,28,450.00`).
- **Indian Commercial Context**: Products, enterprise accounts (Mumbai, Pune, Bengaluru, Delhi, Ahmedabad), and domestic logistics suppliers.
- **Payment Methods**: Seamless handling of UPI (Google Pay, PhonePe, Paytm), Razorpay, NEFT/RTGS, and Cards.

---

## 🎨 UI / UX Design System

The visual design system is built to provide enterprise clarity and data density:

| Token | Value | Semantic Use |
| :--- | :--- | :--- |
| **Primary Emerald** | `#006C49` | Key brand actions, primary buttons, active navigation |
| **Secondary Mint** | `#10B981` | Positive financial growth, "In Stock" indicators |
| **Alert Amber** | `#F59E0B` | Safety stock threshold warnings, "Low Stock" badge |
| **Critical Coral** | `#EF4444` | Stockout alerts, critical inventory shortages |
| **Surface Dark** | `#0F172A` | High-contrast data sidebars and navigation framing |
| **Typography** | `Inter`, `sans-serif` | Clean, highly legible data density |
| **Monospace** | `JetBrains Mono` | Financial figures, SKUs, barcodes, and invoice IDs |

---

## 📊 Data Models & Schema Specifications

### `User` Schema
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hashed
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
  timestamps: true
}
```

### `Product` Schema
```javascript
{
  sku: { type: String, required: true, unique: true, uppercase: true },
  barcode: { type: String, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  costPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true, default: 0 },
  minimumStock: { type: Number, default: 5 },
  warehouse: { type: String, default: 'Mumbai Hub' },
  status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock'] },
  timestamps: true
}
```

### `Sale` Schema
```javascript
{
  invoiceNumber: { type: String, required: true, unique: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      unitPrice: Number,
      subtotal: Number
    }
  ],
  subtotal: Number,
  discount: Number,
  tax: Number,
  totalAmount: Number,
  paymentMethod: { type: String, enum: ['Cash', 'Credit Card', 'UPI / Razorpay', 'NEFT Transfer'] },
  customerName: String,
  soldBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  saleDate: { type: Date, default: Date.now }
}
```

---

## 🔌 RESTful API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user credentials & return JWT | Public |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user session profile | Protected |

### Products & Inventory (`/api/products`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Query products with category & status filters | Public / Protected |
| `GET` | `/api/products/:id` | Fetch single product record by ID or SKU | Protected |
| `POST` | `/api/products` | Create product in catalog | Protected (Admin) |
| `PUT` | `/api/products/:id` | Update product information | Protected (Admin) |
| `DELETE` | `/api/products/:id` | Remove product from catalog | Protected (Admin) |
| `POST` | `/api/products/:id/adjust-stock` | Quick inventory adjustment drawer | Protected |

### Point of Sale & Checkout (`/api/sales`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/sales` | Create sale with atomic stock deduction | Protected |
| `GET` | `/api/sales` | Retrieve recent sales invoices | Protected |
| `GET` | `/api/sales/:invoiceNumber`| Fetch invoice details and line items | Protected |

### Analytics & Reports (`/api/analytics`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/analytics/summary` | Dashboard summary KPIs, sales, & alerts | Protected |
| `GET` | `/api/analytics/top-products`| Top 5 bestseller velocity rankings | Protected |

---

## 📂 Project Structure

```
SmartStock/
├── client/                      # React 18 Frontend Application
│   ├── src/
│   │   ├── assets/              # AI-generated hero graphics & icons
│   │   ├── components/layout/   # Navigation Sidebar, App Header, App Layout
│   │   ├── hooks/               # useAuth Context Hook
│   │   ├── pages/               # Dashboard, Products, Sales/POS, Analytics, etc.
│   │   ├── services/            # Axios / Fetch API client configuration
│   │   ├── utils/               # Indian Currency Formatter (formatINR)
│   │   ├── App.jsx              # Client Route Hierarchy
│   │   └── main.jsx             # React DOM Root
│   ├── tailwind.config.js       # Color, spacing & typography design tokens
│   ├── vite.config.js           # Vite development server & reverse proxy
│   └── package.json
├── server/                      # Node.js & Express REST Backend
│   ├── src/
│   │   ├── config/              # MongoDB connection & timeout configuration
│   │   ├── controllers/         # Auth, Product, Sale, Analytics controllers
│   │   ├── middleware/          # JWT protect & centralized error middleware
│   │   ├── models/              # Mongoose schemas (User, Product, Sale, etc.)
│   │   ├── routes/              # Express API routers
│   │   ├── services/            # Seed service & business logic
│   │   ├── utils/               # JWT token generation
│   │   ├── app.js               # Express application middleware mounting
│   │   └── server.js            # HTTP Server bootstrap & startup telemetry
│   ├── .env.example             # Documented environment blueprint
│   └── package.json
├── package.json                 # Monorepo root dev script runner
└── README.md                    # Platform documentation
```

---

## 👨‍💻 Author & Portfolio Contact

- **Developer**: [Mayank](https://github.com/Mayank9897)
- **Repository**: [https://github.com/Mayank9897/SmartStock](https://github.com/Mayank9897/SmartStock)
- **Project**: SmartStock — AI-Powered Inventory & Sales Management Platform

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
