# 📦 SmartStock — AI-Powered Inventory & Sales Management System

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-3.7_Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT_&_Bcrypt-blue)](https://jwt.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> **Flagship Portfolio Project** engineered for **TCS Ignite / Fresher Software Developer** profiles. Designed with enterprise-grade modularity, clean **Controller-Service-Model** layering, concurrency-safe inventory atomic operations, and dynamic contextual LLM integration via **Google Gemini**.

---

## 📑 Table of Contents

1. [Executive Summary & Problem Statement](#-executive-summary--problem-statement)
2. [Key Highlights & Architectural Pillars](#-key-highlights--architectural-pillars)
3. [System Architecture](#-system-architecture)
4. [Concurrency & Atomic Stock Management](#-concurrency--atomic-stock-management)
5. [Data-Grounded AI Advisor Architecture](#-data-grounded-ai-advisor-architecture)
6. [Data Schemas & Domain Models](#-data-schemas--domain-models)
7. [RESTful API Specification](#-restful-api-specification)
8. [Security & Production Best Practices](#-security--production-best-practices)
9. [Project Directory Layout](#-project-directory-layout)
10. [Getting Started & Installation](#-getting-started--installation)
11. [TCS Ignite Technical Interview Guide](#-tcs-ignite-technical-interview-guide)

---

## 🎯 Executive Summary & Problem Statement

Traditional retail and small-to-medium enterprise (SME) inventory systems suffer from three critical bottlenecks:
1. **Inventory Race Conditions**: Multiple cashier terminals or concurrent online checkouts lead to overselling when stock levels are checked and updated in non-atomic operations.
2. **Disconnected Business Intelligence**: Store managers struggle to translate raw stock and sales numbers into actionable purchasing decisions and restocking schedules.
3. **Monolithic or Tightly-Coupled Code**: Novice projects often put database queries directly into route handlers, making code untestable and difficult to maintain.

**SmartStock** solves these challenges by providing:
- A clean, decoupled **REST API** following the **Controller-Service-Model** design pattern.
- **Atomic MongoDB update mechanisms** ensuring negative inventory is mathematically impossible even under heavy multi-terminal concurrency.
- A **Data-Grounded AI Inventory Advisor** using the official `@google/genai` SDK that dynamically digests real-time sales trends and stock deficits to generate prioritized, natural-language operational recommendations.

---

## 🌟 Key Highlights & Architectural Pillars

| Pillar | Implementation | Technical Advantage |
| :--- | :--- | :--- |
| **Clean Architecture** | Controller $\rightarrow$ Service $\rightarrow$ Model | Strict separation of concerns; high testability and maintainability. |
| **Concurrency Safety** | MongoDB Atomic Condition Queries (`$gte` + `$inc`) | Zero race conditions without expensive distributed table locking. |
| **Authentication & RBAC** | Stateless JWT + `bcryptjs` (salt rounds = 10) | Secure endpoint protection with granular Admin and Staff role boundaries. |
| **Intelligent Analytics** | MongoDB Aggregation Pipelines (`$facet`, `$group`) | Low-latency calculations for revenue trends and category allocations. |
| **AI Advisor Engine** | Dynamic context injection into Gemini 3.7 Flash | Eliminates LLM hallucinations by grounding insights in live DB metrics. |
| **Resilience & Fallback** | Try-catch safety net with deterministic fallback | Zero-downtime AI advisory endpoint even if external AI API is unavailable. |

---

## 🏗️ System Architecture

SmartStock adheres to an enterprise three-tier REST architecture:

```
                  +-----------------------------------+
                  |      Client / Frontend Layer      |
                  | (React / Vue / Next.js / Postman) |
                  +-----------------+-----------------+
                                    | (JSON / HTTPS)
                                    v
                  +-----------------------------------+
                  |     Express Application Layer     |
                  |  [CORS -> BodyParser -> Auth JWT] |
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
                    |                       (Prompt + Live Data)
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
        |  (Atomic Operations & Aggregation)|
        +-----------------------------------+
```

### Request Lifecycle
1. **Client Request**: Initiates HTTPS REST request with optional Bearer JWT token.
2. **Middleware Pipeline**:
   - `cors`: Handles cross-origin whitelisting.
   - `express.json()`: Parses incoming JSON payload.
   - `authMiddleware`: Decodes JWT, validates signature against secret, and verifies role permissions (`admin` / `staff`).
3. **Controller**: Handles HTTP-level concerns (request parameters, query sanitization, and sending formatted HTTP responses).
4. **Service**: Encapsulates core business algorithms (e.g., prompt crafting for AI, computing invoice totals, executing atomic updates).
5. **Model Layer**: Interacts with MongoDB via Mongoose schema validators and pre-save hooks.

---

## 🛡️ Concurrency & Atomic Stock Management

### The Critical Problem: Race Conditions in Inventory
In a high-throughput multi-cashier environment, a naive check-then-save pattern fails:

```javascript
// ❌ NAIVE APPROACH — HIGH RISK OF RACE CONDITION / NEGATIVE STOCK
const product = await Product.findById(productId);
if (product.stockQuantity >= requestedQuantity) {
  // If another thread updates stockQuantity here, both checks pass!
  product.stockQuantity -= requestedQuantity;
  await product.save();
}
```

### The SmartStock Solution: Atomic MongoDB Condition Query
SmartStock leverages MongoDB's single-document atomicity:

```javascript
// ✅ SMARTSTOCK CONCURRENCY-SAFE ATOMIC UPDATE
const updatedProduct = await Product.findOneAndUpdate(
  {
    _id: item.productId,
    stockQuantity: { $gte: item.quantity } // Pre-condition check in DB engine
  },
  {
    $inc: { stockQuantity: -item.quantity } // Atomic decrement
  },
  { new: true }
);

if (!updatedProduct) {
  throw new Error(`Insufficient stock or concurrent modification for item: ${item.name}`);
}

// Automatically recalculate product status
if (updatedProduct.stockQuantity === 0) {
  updatedProduct.status = 'Out of Stock';
} else if (updatedProduct.stockQuantity <= updatedProduct.minimumStock) {
  updatedProduct.status = 'Low Stock';
} else {
  updatedProduct.status = 'In Stock';
}
await updatedProduct.save();
```

---

## 🤖 Data-Grounded AI Advisor Architecture

Instead of generic chatbot responses, SmartStock uses **Retrieval-Augmented Context Injection**:

```
[MongoDB Database] 
       │ (Fetch Low-Stock SKUs, 30-Day Sales Velocity, Revenue Trends)
       ▼
[aiService.js] 
       │ (Format Structured JSON Payload + Business Guidelines)
       ▼
[Gemini 3.7 Flash Model]
       │ (Reasoning over exact numbers & generating prioritized bullet points)
       ▼
[Actionable Advisor Output to Store Manager]
```

### AI Resilience & Fallback Engine
If the network is interrupted or `GEMINI_API_KEY` is not supplied, `aiService.js` catches the error and executes a rule-based deterministic fallback analyzer:
- Flags any product where `stockQuantity <= minimumStock`.
- Calculates estimated replenishment budget based on `(minimumStock * 2 - stockQuantity) * costPrice`.
- Returns an uninterrupted advisory payload with `isFallback: true` metadata.

---

## 📊 Data Schemas & Domain Models

### 1. User Schema (`models/User.js`)
```javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 }, // Bcrypt hash
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
  createdAt: { type: Date, default: Date.now }
}
```

### 2. Product Schema (`models/Product.js`)
```javascript
{
  name: { type: String, required: true, trim: true },
  sku: { type: String, required: true, unique: true, uppercase: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  costPrice: { type: Number, required: true, min: 0 },
  stockQuantity: { type: Number, required: true, min: 0, default: 0 },
  minimumStock: { type: Number, required: true, min: 0, default: 5 },
  status: { 
    type: String, 
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### 3. Sale Schema (`models/Sale.js`)
```javascript
{
  invoiceNumber: { type: String, required: true, unique: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      unitPrice: { type: Number, required: true, min: 0 },
      subtotal: { type: Number, required: true, min: 0 }
    }
  ],
  totalAmount: { type: Number, required: true, min: 0 },
  paymentMethod: { 
    type: String, 
    enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'],
    default: 'Cash'
  },
  soldBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  saleDate: { type: Date, default: Date.now }
}
```

---

## 🔌 RESTful API Specification

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public (or Admin) | Registers new user; returns JWT & user profile |
| `POST` | `/login` | Public | Authenticates credentials; returns JWT |
| `GET` | `/profile` | Private (Staff/Admin) | Fetches current authenticated user details |

### Product Management Routes (`/api/products`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Private (Staff/Admin) | Get products (with search, category filter, pagination) |
| `GET` | `/:id` | Private (Staff/Admin) | Get single product by ID or SKU |
| `POST` | `/` | Private (Admin only) | Create new product |
| `PUT` | `/:id` | Private (Admin only) | Update existing product details |
| `DELETE`| `/:id` | Private (Admin only) | Soft/hard delete product |

### Inventory & Stock Routes (`/api/inventory`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/low-stock` | Private (Staff/Admin) | Retrieve items where `stockQuantity <= minimumStock` |
| `POST` | `/restock` | Private (Admin only) | Batch restock quantities with cost tracking |
| `GET` | `/export` | Private (Admin only) | Export inventory metrics to CSV/JSON format |

### Sales Routes (`/api/sales`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Private (Staff/Admin) | Process a new sale with concurrency-safe stock decrement |
| `GET` | `/` | Private (Staff/Admin) | Get sales history with date range filtering |
| `GET` | `/:invoiceNumber`| Private (Staff/Admin) | Get complete invoice and receipt details |

### Analytics & Dashboard Routes (`/api/dashboard`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/summary` | Private (Staff/Admin) | Key KPI metrics (Revenue, Total Orders, Stock Value) |
| `GET` | `/charts` | Private (Staff/Admin) | Aggregated monthly sales trends & category breakdown |

### AI Advisory Routes (`/api/ai`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/recommendations`| Private (Admin only) | Generates grounded stock advisory via Gemini 3.7 Flash |
| `POST`| `/query` | Private (Staff/Admin) | Natural language Q&A regarding live store performance |

---

## 🔒 Security & Production Best Practices

1. **Password Encryption**: Passwords salted and hashed with `bcryptjs` (work factor 10) before persisting to disk.
2. **Stateless JWT Security**: Tokens contain expiration limits (`7d`), signed with secret keys, verified on every protected transaction.
3. **Role-Based Access Control (RBAC)**: Fine-grained middleware checks ensure `staff` cannot execute destructive operations (product deletion, price modifications, batch stock overwrites).
4. **Data Sanitization & Injection Prevention**: Mongoose strict schema enforcement protects against NoSQL injection payloads.
5. **CORS Isolation**: Whitelisted client domains prevent unauthorized cross-origin browser requests.

---

## 📂 Project Directory Layout

```
smartstock/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection lifecycle & error handlers
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, profile handling
│   │   ├── productController.js  # Product catalog CRUD & query filtering
│   │   ├── inventoryController.js# Low-stock alerts & batch restocking
│   │   ├── saleController.js     # Checkout processing & invoice generation
│   │   ├── dashboardController.js# Aggregated revenue & inventory KPI statistics
│   │   └── aiController.js       # AI advisor endpoints & custom prompt requests
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT token validation & RBAC authorization
│   │   └── errorMiddleware.js    # Centralized HTTP error handler & formatting
│   ├── models/
│   │   ├── User.js               # User & Authentication Mongoose Model
│   │   ├── Product.js            # Product & Stock status Mongoose Model
│   │   └── Sale.js               # Sales Invoice & Line Items Mongoose Model
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
│   │   └── exportHelper.js       # Data transformation & CSV export helper
│   ├── .env.example              # Blueprint for environment variables
│   ├── package.json              # Backend dependencies & run scripts
│   └── server.js                 # Express application initialization & middleware setup
├── frontend/                     # Client application placeholder
├── .gitignore                    # Git ignore file for secrets and node_modules
└── README.md                     # Comprehensive system documentation
```

---

## 🚀 Getting Started & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance on `mongodb://localhost:27017` or MongoDB Atlas URI)
- [Google AI Studio API Key](https://aistudio.google.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/smartstock.git
cd smartstock
```

### 2. Configure Backend Environment
```bash
cd backend
cp .env.example .env
```
Edit `.env` with your actual settings:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/smartstock
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:3000
```

### 3. Install Dependencies & Run
```bash
npm install
npm run dev
```
The server will boot on `http://localhost:5000`.

---

## 💡 TCS Ignite Technical Interview Guide

When presenting SmartStock in a technical interview (TCS Ignite / Developer assessment), use these structured explanations:

### 1. "How do you handle race conditions during high-volume sales checkouts?"
> *"In multi-terminal retail setups, traditional check-then-update logic (`findById` followed by `save()`) introduces a race condition window where two concurrent requests read the same quantity and both deduct it, driving inventory negative. In SmartStock, I solved this by leveraging MongoDB's single-document atomic operations with `findOneAndUpdate({ _id, stockQuantity: { $gte: requestedQty } }, { $inc: { stockQuantity: -requestedQty } })`. The database evaluates the precondition and applies the decrement in a single atomic operation at the storage engine level."*

### 2. "Why did you implement the Controller-Service-Model design pattern?"
> *"To maintain high cohesion and low coupling. Controllers are strictly responsible for parsing HTTP requests, handling status codes, and returning responses. Services contain reusable domain business logic (such as prompt assembly for the LLM and invoice calculation), and Models define schema validation and persistence. This makes the code modular, readable, and readily testable."*

### 3. "How did you prevent hallucinations in your AI Inventory Advisor?"
> *"Instead of asking the LLM open-ended questions about general inventory strategies, SmartStock grounds the prompt in live database context. The `aiService` first queries MongoDB for exact metrics—such as items whose stock is below minimum threshold and 30-day sales volume. It formats this into a structured JSON payload within a system prompt that directs the Gemini model to act strictly as a retail data analyst on the provided facts."*

### 4. "How is authentication and authorization managed across user roles?"
> *"SmartStock uses stateless JSON Web Tokens. When a user logs in, their password is verified using bcrypt's comparison algorithm. Upon success, a signed JWT containing their `id` and `role` (`admin` or `staff`) is returned. Protected routes pass through `authMiddleware`, which verifies the token signature and enforces RBAC so that sensitive mutations like restocking or deleting products are restricted to Administrators."*

---

## 📄 License
This project is open-source and licensed under the [ISC License](LICENSE).

