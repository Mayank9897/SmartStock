# 🎓 SmartStock — College Mini-Project Viva & Mentor Presentation Guide

> **Prepared for**: BCA Final Year / Mini-Project Evaluation & Technical Viva  
> **Student**: Mayank  
> **Project**: SmartStock — AI-Powered Enterprise Inventory & Sales Management Platform  
> **Tech Stack**: MongoDB, Express.js, React.js (Vite), Node.js (MERN) + Tailwind CSS + JWT  

---

## 📑 Table of Contents

1. [60-Second Elevator Pitch (What to Say First)](#1-60-second-elevator-pitch)
2. [10-Step Interactive Live Demo Script](#2-10-step-interactive-live-demo-script)
3. [System Architecture Explained for Viva](#3-system-architecture-explained-for-viva)
4. [Critical Technical Deep Dives (Examiner's Favorite Questions)](#4-critical-technical-deep-dives)
   - [A. Concurrency & Race Conditions (Atomic Stock Decrements)](#a-concurrency--race-conditions)
   - [B. Authentication, JWT & Password Hashing](#b-authentication-jwt--password-hashing)
   - [C. State Management & React Lifecycle](#c-state-management--react-lifecycle)
   - [D. Resilient Fault-Tolerance & Offline Fallback Architecture](#d-resilient-fault-tolerance)
   - [E. Indian Financial Localization & Currency Handling](#e-indian-financial-localization)
5. [65+ Viva Questions with High-Scoring Direct Answers](#5-65-viva-questions--direct-answers)
   - [Category 1: Project Overview & System Design (Q1 - Q12)](#category-1-project-overview--system-design)
   - [Category 2: Frontend & React.js Mechanics (Q13 - Q26)](#category-2-frontend--reactjs-mechanics)
   - [Category 3: Backend & Express.js Architecture (Q27 - Q40)](#category-3-backend--expressjs-architecture)
   - [Category 4: Database, MongoDB & Mongoose (Q41 - Q54)](#category-4-database-mongodb--mongoose)
   - [Category 5: Security, Performance & Interview Edge (Q55 - Q65)](#category-5-security-performance--interview-edge)
6. [Code Reference Cheat Sheet (Exact File Locations)](#6-code-reference-cheat-sheet)

---

## 1. 60-Second Elevator Pitch

> *"Good morning Sir/Ma'am. My project is **SmartStock**, an enterprise-grade Inventory and Point-of-Sale (POS) management platform built on the MERN stack.*
>
> *Traditional inventory software often suffers from two major engineering issues: first, **race conditions** when two cashiers sell the last unit of stock at the same moment, causing negative stock; and second, fragmented operational visibility with difficult-to-understand international metrics.*
>
> *In SmartStock, I solved the concurrency issue by implementing **database-level atomic conditional updates** using MongoDB's `$gte` and `$inc` operators. I built a dynamic React single-page application with real-time Recharts telemetry, complete Indian Rupee (`₹`) formatting, role-based access control, and a slide-out Quick Stock Adjustment drawer.*
>
> *The entire application is decoupled into a clean REST API backend and a responsive frontend, with built-in resilience so that it operates smoothly under any network or database condition."*

---

## 2. 10-Step Interactive Live Demo Script

Follow these steps chronologically when demonstrating the application to your examiner or college mentor:

| Step | Action on Screen | URL / Location | What to Explain to the Mentor |
| :---: | :--- | :--- | :--- |
| **1** | **Landing Page Hero & Telemetry** | `http://localhost:5000/` or `http://localhost:5173/` | Point out the clean B2B SaaS landing page, AI-generated hero graphic, responsive layout, feature grid, and the live *"Open Live Platform"* call-to-action button. |
| **2** | **Login Screen & One-Click Demo Credentials** | `/login` | Click the **"Administrator (Full Access)"** pill button. Explain: *"I built one-click demo pills to instantly populate the credentials for quick evaluation without manual typing."* Click the eye icon to demonstrate password visibility toggle. |
| **3** | **Authenticate as Admin** | Click **"Sign In to SmartStock"** | Point out the instant JWT generation, token storage in `localStorage`, and seamless redirect to the protected `/dashboard` route via `ProtectedRoute`. |
| **4** | **Executive Dashboard KPIs & Charts** | `/dashboard` | Show the 4 KPI cards: **Gross Revenue** (`₹1,28,450.00`), **Stock Asset Value**, **Active Invoices**, and **Safety Stock Index**. Show the Recharts Area Chart displaying 30-day sales trajectories. |
| **5** | **Product Catalog & Filters** | Click **"Products & Inventory"** in sidebar (`/products`) | Demonstrate the live search bar (type `"Logitech"` or `"Chair"`). Filter by category dropdown (`Electronics`, `Packaging`). Point out the dynamic status badges (`In Stock`, `Low Stock`, `Out of Stock`). |
| **6** | **Quick Stock Adjustment Drawer** | Click **"Adjust Stock"** on any item | The slide-out drawer appears on the right. Enter a new quantity (e.g., change `42` to `50`). Show the live delta badge (`+8 units`). Click **"Save Changes"**. Point out the instant UI update and server persistence. |
| **7** | **Add New Product Modal** | Click **"Add Product"** top button | Show the modal form with SKU, Barcode, Selling Price, Cost Price, and Minimum Safety Stock threshold. Cancel or save to show form validation. |
| **8** | **High-Speed POS & Barcode Checkout** | Click **"Sales / POS"** in sidebar (`/sales`) | 1. Click a product card to add to cart.<br>2. Use the `+` / `-` steppers.<br>3. Select customer **"Apex Innovations"** (shows automatic 5% loyalty discount).<br>4. Switch tender tabs: Cash, UPI / Razorpay, Cards.<br>5. Click **"Complete Checkout"**.<br>Show the green confirmation toast and instant receipt generation. |
| **9** | **Financial Analytics & Category Donut** | Click **"Analytics"** in sidebar (`/analytics`) | Show the Composed Chart (Gross Revenue vs. Net Margin), the Top 5 Bestsellers leaderboard, and the Category Inventory Valuation SVG Donut. |
| **10** | **Vendor & Customer Directories** | Click **"Customers"** & **"Suppliers"** | Show the Indian business directories (Mumbai, Pune, Bengaluru) with credit limits and vendor lead times. |

---

## 3. System Architecture Explained for Viva

```
  CLIENT TIER (Frontend)              APPLICATION TIER (Backend)            DATA TIER (Database)
+-------------------------+         +----------------------------+        +----------------------+
|  React 18 SPA (Vite)    |         |  Express REST API Server   |        |    MongoDB Atlas     |
|                         |  HTTP   |                            |  Mongoose                     |
|  - AppLayout & Sidebar  | ------> |  - Auth Routes & JWT       | -----> |  - Users Collection  |
|  - React Router DOM     | <------ |  - Product & Sale API      | <----- |  - Products Schema   |
|  - Recharts Visuals     |  JSON   |  - Concurrency Decrements  |        |  - Sales Invoices    |
|  - formatINR (₹ Intl)   |         |  - CORS & Error Middleware |        |  - Customers/Vendors |
+-------------------------+         +----------------------------+        +----------------------+
```

### Why MERN Stack?
1. **Full JavaScript/JSON End-to-End**: A single language (JavaScript) across frontend, backend, and database queries (BSON/JSON) reduces context switching and serialization overhead.
2. **Component Reusability in React**: UI elements (tables, modals, stat cards, metric pills) are decoupled into modular React functional components.
3. **Non-Blocking Asynchronous I/O in Node.js**: High concurrency handling for retail POS terminals without blocking execution threads.
4. **Flexible Document Storage in MongoDB**: Products have diverse attributes (SKU, barcode, dimensions, supplier refs) that map naturally to polymorphic JSON documents without rigid SQL schema migrations.

---

## 4. Critical Technical Deep Dives

### A. Concurrency & Race Conditions

**The Classic Bug (Read-Modify-Write):**
```javascript
// BAD PRACTICE: Prone to race conditions!
const product = await Product.findById(req.body.productId);
if (product.stockQuantity >= req.body.quantity) {
  // If another cashier buys right here, both succeed!
  product.stockQuantity -= req.body.quantity;
  await product.save(); // Results in negative inventory!
}
```

**SmartStock's Atomic Solution (`server/src/controllers/saleController.js`):**
```javascript
// ENTERPRISE BEST PRACTICE: Atomic conditional decrement
const updated = await Product.findOneAndUpdate(
  {
    _id: item.product,
    stockQuantity: { $gte: item.quantity }, // Condition evaluated inside MongoDB engine
  },
  {
    $inc: { stockQuantity: -item.quantity }, // Atomic subtraction
  },
  { new: true }
);

if (!updated) {
  throw new Error("Insufficient inventory or item modified concurrently!");
}
```

*Viva Answer Tip*: Explain that MongoDB executes operations on a single document **atomically**. By placing the condition `{ stockQuantity: { $gte: qty } }` directly inside the atomic query, no other thread or request can interleave between the check and the decrement.

---

### B. Authentication, JWT & Password Hashing

1. **Password Hashing with Bcryptjs**:
   - Passwords are never stored in plain text.
   - We use `bcryptjs.genSalt(10)` to generate cryptographic salt and hash passwords.
   - Salt prevents **Rainbow Table attacks** (precomputed hash lookups).
   - Bcrypt is an adaptive key derivation function with an adjustable work factor (salt rounds).

2. **JSON Web Token (JWT) Architecture**:
   - **Header**: Contains the algorithm (`HS256`) and token type (`JWT`).
   - **Payload**: Contains claims such as user `id` and `role` (`admin` or `staff`).
   - **Signature**: Formed by `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)`.
   - **Stateless Authentication**: The backend server does not need to store active session IDs in a session table; it validates the cryptographic signature on every incoming request via `req.headers.authorization`.

---

### C. State Management & React Lifecycle

- **`useAuth` Context Hook (`client/src/hooks/useAuth.jsx`)**: Global authentication state provided through React Context API. Stores current user info and JWT in browser `localStorage`.
- **`useState`**: Used for local component state such as search filters, cart line items, modal visibility, and stock drawer adjustments.
- **`useMemo`**: Used for computed values like POS subtotal, GST tax calculations, and discount percentages to avoid unnecessary recalculations during re-renders.
- **`useEffect`**: Triggers data fetching when components mount or filter query parameters change.

---

### D. Resilient Fault-Tolerance

- SmartStock inspects `mongoose.connection.readyState === 1`.
- If the local MongoDB service is running, it queries the live database and persists records.
- If MongoDB is stopped or offline during a demo, the controllers detect this immediately and serve pre-seeded in-memory data with zero buffering delay (0ms latency).
- This guarantees the examiner will **never see a crash or broken screen** during your demonstration.

---

### E. Indian Financial Localization

- All monetary calculations are stored as pure numeric floating-point numbers in the database (e.g. `8995`, `128450`).
- Formatting is done solely at the presentation layer using the browser standard:
  ```javascript
  export const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(Number(val) || 0);
  };
  ```
- This yields authentic Indian numbering formatting (`₹1,28,450.00` with comma separators for thousands, lakhs, and crores) rather than Western million/billion groupings.

---

## 5. 65+ Viva Questions & Direct Answers

### Category 1: Project Overview & System Design

#### Q1. What is the title and primary objective of your project?
**Ans:** The project is titled *"SmartStock — AI-Powered Inventory & Sales Management Platform"*. Its objective is to streamline retail and wholesale inventory tracking, eliminate overselling through concurrency-safe checkout, and provide real-time sales telemetry with Indian market localization.

#### Q2. Who are the primary end users of SmartStock?
**Ans:** 
1. **Store Administrators**: Manage product catalogs, adjust inventory, view financial metrics, and monitor dead stock.
2. **Sales & POS Staff**: Search products, scan barcodes, manage shopping carts, and process customer checkout invoices.

#### Q3. What is the difference between monolithic and decoupled architecture, and which does SmartStock use?
**Ans:** SmartStock uses a **decoupled (client-server) architecture**. The frontend (React Vite SPA) and backend (Node/Express REST API) are completely separated and communicate exclusively over HTTP using JSON payloads. This enables independent scaling, easier unit testing, and the ability to connect mobile apps to the same API.

#### Q4. What design pattern does your backend follow?
**Ans:** It follows the **Controller-Service-Model (CSM)** architecture:
- **Routes**: Define URL paths and apply middleware.
- **Controllers**: Handle HTTP request extraction, validation, and HTTP responses.
- **Services/Models**: Contain database interactions, schema constraints, and business logic.

#### Q5. What is Role-Based Access Control (RBAC) and how is it implemented?
**Ans:** RBAC restricts resource access based on a user's role. In SmartStock, we have `admin` and `staff` roles. The `adminOnly` middleware checks `req.user.role === 'admin'`. Only admins can create/delete products or alter core vendor records.

#### Q6. What happens if an unauthenticated user tries to open `/dashboard`?
**Ans:** The React Router `ProtectedRoute` component checks if `isAuthenticated` is true. If false or if the JWT token is missing, it immediately redirects the user to `/login`.

#### Q7. What are the key performance indicators (KPIs) tracked on the dashboard?
**Ans:** Gross Revenue, Stock Asset Valuation, Total Completed Sales/Invoices, Low-Stock Alert Count, and Out-of-Stock count.

#### Q8. Why did you choose Indian Rupee (INR) localization instead of US Dollars?
**Ans:** Most college academic projects use default USD templates. Localizing to INR (`₹`), Indian product catalogs, and cities (Mumbai, Pune, Bengaluru) reflects realistic business requirements for domestic retail chains.

#### Q9. How do you handle low-stock alerts?
**Ans:** Products have a `minimumStock` threshold property. Whenever `stockQuantity <= minimumStock`, the status dynamically transitions to `'Low Stock'`. If `stockQuantity === 0`, it transitions to `'Out of Stock'`.

#### Q10. What is "Dead Stock" and why does your analytics module track it?
**Ans:** Dead stock refers to inventory that has not sold over a prolonged period. Tracking it helps business managers identify trapped capital and offer promotional discounts to clear warehouse space.

#### Q11. How do you prevent negative stock values?
**Ans:** Through database-level atomic conditional updates (`{ stockQuantity: { $gte: qty } }`) and schema validation enforcing `min: 0`.

#### Q12. What are the major modules in SmartStock?
**Ans:** Authentication, Dashboard Analytics, Product & Inventory Management, Point of Sale (POS) Checkout, Vendor Network, and Customer Directory.

---

### Category 2: Frontend & React.js Mechanics

#### Q13. Why did you choose Vite instead of Create React App (CRA)?
**Ans:** CRA is deprecated. Vite uses native browser ES Modules (ESM) and an esbuild-powered development server. It provides near-instant server start (under 300ms) and lightning-fast Hot Module Replacement (HMR) compared to Webpack.

#### Q14. What are React functional components and why use them over class components?
**Ans:** Functional components are JavaScript functions that return JSX. They are lighter, eliminate boilerplate code, avoid `this` binding confusion, and leverage React Hooks.

#### Q15. Explain the purpose of `useState` hook.
**Ans:** `useState` allows functional components to maintain internal, reactive state. When the state updater function is called, React triggers a re-render of the component with the new data.

#### Q16. Explain the purpose of `useEffect` hook in your project.
**Ans:** `useEffect` performs side effects in functional components. We use it to fetch product lists and summary analytics from the Express API upon component mount.

#### Q17. What is the difference between `useEffect` with an empty dependency array `[]` vs no dependency array?
**Ans:** 
- `[]`: Runs only once after the initial render (equivalent to `componentDidMount`).
- No array: Runs after every single render of the component.

#### Q18. How is the React Context API used in SmartStock?
**Ans:** We use `AuthContext` to avoid "prop drilling". It exposes `user`, `login`, `logout`, and `token` to all child components anywhere in the component tree.

#### Q19. What is JSX?
**Ans:** JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows developers to write HTML-like structure directly inside JavaScript files. It compiles down to `React.createElement()` calls.

#### Q20. What is the Virtual DOM and how does React reconciliation work?
**Ans:** The Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes, React creates a new virtual DOM tree, diffs it against the previous one (reconciliation algorithm), and calculates the minimal batch updates required for the real DOM.

#### Q21. Why is Tailwind CSS preferred over writing custom CSS stylesheets?
**Ans:** Tailwind provides utility-first CSS classes directly in markup. It eliminates naming conflicts, reduces bundle size via PurgeCSS/tree-shaking, and makes design consistency easy through custom theme tokens.

#### Q22. How are charts rendered in your application?
**Ans:** Using **Recharts**, a composable React charting library built on top of SVG elements. We render an `AreaChart` for revenue trends, a `ComposedChart` for sales vs margin, and custom SVG paths for the Category Valuation Donut.

#### Q23. What is the role of `react-router-dom`?
**Ans:** It enables client-side routing in a Single Page Application (SPA). It dynamically renders different page components based on the URL path without causing full-page browser reloads.

#### Q24. How do you manage shopping cart state in the POS module?
**Ans:** In `client/src/pages/SalesPosPage.jsx`, cart items are stored in a `cart` array using `useState`. Adding an item checks if the product ID already exists: if yes, it increments `quantity`; if no, it appends a new line item.

#### Q25. What is the purpose of `useMemo` in your POS cart calculation?
**Ans:** It memoizes derived financial values (`subtotal`, `taxAmount`, `loyaltyDiscount`, `grandTotal`). It only recomputes these values when the `cart` or `selectedCustomer` changes, optimizing performance.

#### Q26. How do you handle client-side form validation?
**Ans:** Using HTML5 attributes (`required`, `min="0"`, `type="number"`) combined with React state validation before dispatching HTTP POST requests.

---

### Category 3: Backend & Express.js Architecture

#### Q27. What is Express.js?
**Ans:** Express.js is a minimal, fast, and flexible web framework for Node.js. It simplifies routing, HTTP request/response handling, and middleware integration.

#### Q28. What is Node.js and how does its non-blocking event loop work?
**Ans:** Node.js is an open-source, cross-platform JavaScript runtime environment built on Chrome's V8 engine. It uses a single-threaded, event-driven architecture with non-blocking I/O. Asynchronous tasks (like DB queries) are offloaded to system threads (libuv), allowing Node to handle thousands of concurrent requests without blocking.

#### Q29. What is Middleware in Express?
**Ans:** Middleware functions have access to the Request object (`req`), Response object (`res`), and the `next` middleware function. They can execute code, modify `req`/`res`, end the request, or call `next()`.

#### Q30. Which middleware are used in your application?
**Ans:**
1. `cors()`: Enables Cross-Origin Resource Sharing.
2. `express.json()`: Parses incoming JSON request bodies.
3. `protect`: Custom JWT authentication middleware.
4. `adminOnly`: Custom authorization middleware.
5. `notFound` & `errorHandler`: Centralized error catching middleware.

#### Q31. What is CORS and why is it necessary?
**Ans:** Cross-Origin Resource Sharing (CORS) is a browser security mechanism that restricts web pages from making HTTP requests to a different domain/port than the one that served the web page. In development, the React frontend runs on port `5173` while Express runs on port `5000`. CORS middleware allows communication between them.

#### Q32. Explain the difference between `PUT` and `PATCH`.
**Ans:** `PUT` replaces the entire existing resource with the request payload, whereas `PATCH` applies partial modifications to the resource.

#### Q33. What HTTP status codes are used in your API responses?
**Ans:**
- `200 OK`: Successful retrieval or update.
- `201 Created`: Successful creation of a new product, sale, or user.
- `400 Bad Request`: Missing fields or invalid client input.
- `401 Unauthorized`: Missing or invalid JWT token.
- `403 Forbidden`: Authenticated user lacks administrator privileges.
- `404 Not Found`: Requested SKU or ID does not exist.
- `500 Internal Server Error`: Unexpected server or database failure.

#### Q34. How does your authentication middleware verify tokens?
**Ans:** It reads the `Authorization` header, extracts the Bearer token, and verifies it using `jwt.verify(token, secret)`. If valid, it decodes user details and attaches them to `req.user`.

#### Q35. What is the purpose of `dotenv`?
**Ans:** It loads environment variables from a `.env` file into `process.env`. This prevents sensitive data (database URIs, JWT secrets, port numbers) from being hardcoded into the source code.

#### Q36. What is the difference between `npm install` and `npm install --save-dev`?
**Ans:** Regular dependencies (`dependencies`) are required for the application to run in production (e.g. `express`, `mongoose`), whereas `devDependencies` are only required during development (e.g. `nodemon`, `vite`, `tailwindcss`).

#### Q37. What is `nodemon`?
**Ans:** `nodemon` is a developer tool that monitors changes in source files and automatically restarts the Node server, eliminating the need to manually restart the server after every edit.

#### Q38. How does `server/src/routes/saleRoutes.js` route requests?
**Ans:** It mounts `POST /` to `createSale` and `GET /` to `getSales`, protected by the `protect` JWT middleware.

#### Q39. How do you handle errors centrally in Express?
**Ans:** We define an error middleware with 4 arguments: `(err, req, res, next)`. Any error thrown in routes or controllers is forwarded to this handler via `next(error)`, ensuring structured JSON error responses rather than server crashes.

#### Q40. What is REST?
**Ans:** Representational State Transfer. It is an architectural style for networked applications using standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`), stateless interactions, and resource-based URL endpoints.

---

### Category 4: Database, MongoDB & Mongoose

#### Q41. What type of database is MongoDB?
**Ans:** MongoDB is a NoSQL, document-oriented database. It stores data in flexible, JSON-like BSON (Binary JSON) documents organized into collections, rather than tables with fixed schemas.

#### Q42. What is Mongoose?
**Ans:** Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides schema definitions, data validation, middleware hooks, and an intuitive API for interacting with MongoDB.

#### Q43. What is the primary key in a MongoDB collection?
**Ans:** The `_id` field. MongoDB automatically assigns a unique 12-byte `ObjectId` (containing timestamp, machine ID, process ID, and increment counter) to every document if one is not provided.

#### Q44. What are the key models in SmartStock?
**Ans:**
1. `User`: Credentials, email, and role (`admin` or `staff`).
2. `Product`: SKU, barcode, name, pricing, stock levels, and status.
3. `Sale`: Invoice number, items array, taxes, total, and payment method.
4. `Customer`: Account names, credit balances, and loyalty tiers.
5. `Supplier`: Vendor details, lead times, and categories.

#### Q45. Explain the `$inc` operator in MongoDB.
**Ans:** `$inc` is a field update operator that increments or decrements a numeric field by a specified value. For inventory deduction, we pass a negative number: `{ $inc: { stockQuantity: -qty } }`.

#### Q46. What is the difference between embedding and referencing in MongoDB?
**Ans:**
- **Embedding**: Subdocuments are stored directly inside the parent document (e.g., line items inside a `Sale` invoice). Good for 1-to-few relationships and atomic reads.
- **Referencing**: Documents store the `ObjectId` of another document (e.g., `soldBy` referencing `User`). Good for 1-to-many relationships and avoiding data duplication.

#### Q47. What are Mongoose pre-save hooks?
**Ans:** Middleware functions executed before saving a document. For example, in `User.js`, a `pre('save')` hook intercepts password changes and hashes the password with `bcryptjs` before writing to disk.

#### Q48. What is an Index in MongoDB and where is it used in your project?
**Ans:** An index is a special data structure (B-tree) that stores a small portion of the collection's data set in an easy-to-traverse form. In SmartStock, we index `sku` and `barcode` with `unique: true` to guarantee instant lookups and prevent duplicate product records.

#### Q49. What is MongoDB Aggregation Framework?
**Ans:** A pipeline processing framework that transforms and summarizes document collections through multi-stage operations (e.g. `$match`, `$group`, `$sort`, `$project`). We use it to compute total sales revenue and category breakdowns.

#### Q50. What does `new: true` mean in `findOneAndUpdate`?
**Ans:** By default, `findOneAndUpdate` returns the original document before the update was applied. Setting `{ new: true }` instructs Mongoose to return the modified document after the update.

#### Q51. How does Mongoose schema validation work?
**Ans:** Schemas enforce required fields, data types, min/max numbers, regex patterns, and enum constraints (e.g., `status: { enum: ['In Stock', 'Low Stock', 'Out of Stock'] }`). If an invalid payload is submitted, Mongoose rejects the write before sending it to MongoDB.

#### Q52. Why did you use `timestamps: true` on schemas?
**Ans:** It automatically adds and manages `createdAt` and `updatedAt` Date properties for every document.

#### Q53. How do you handle database disconnection gracefully?
**Ans:** In `db.js`, we set `serverSelectionTimeoutMS: 3000`. If MongoDB is not reachable within 3 seconds, it catches the error and activates our resilient in-memory fallback cache so the app remains fully functional.

#### Q54. What is the difference between SQL and NoSQL?
**Ans:**
- **SQL**: Relational, tabular rows/columns, rigid predefined schemas, vertical scaling, ACID-compliant transactions across multiple tables.
- **NoSQL**: Non-relational, flexible document/key-value structures, horizontal scaling, optimized for high read/write throughput and polymorphic data.

---

### Category 5: Security, Performance & Interview Edge

#### Q55. How do you prevent SQL / NoSQL Injection?
**Ans:** 
1. Using Mongoose schema typecasting and validation.
2. Sanitizing input strings and avoiding direct concatenation of user inputs into query objects.
3. Requiring explicit JSON bodies rather than raw string queries.

#### Q56. Why is storing passwords with standard MD5 or SHA-256 unsafe?
**Ans:** MD5 and SHA-256 are fast general-purpose hashing algorithms. Attackers using modern GPUs can compute billions of hashes per second to crack passwords via Rainbow Tables. `bcrypt` is intentionally computationally intensive (key-stretching) and uses unique salts, making brute-force cracking mathematically infeasible.

#### Q57. What are Salt Rounds in Bcrypt?
**Ans:** The cost factor / work factor. Salt rounds determine how many hashing iterations are performed ($2^{\text{rounds}}$). In SmartStock, we use 10 rounds, which balances robust security with sub-second response times.

#### Q58. Where should JWT tokens be stored on the client side?
**Ans:** In standard web applications, either in `localStorage` or `httpOnly` secure cookies. `localStorage` is convenient for Single Page Applications, whereas `httpOnly` cookies provide additional protection against Cross-Site Scripting (XSS).

#### Q59. What is XSS and how is your app protected?
**Ans:** Cross-Site Scripting (XSS) occurs when malicious JavaScript is injected into a web page. React automatically escapes strings before rendering them to the DOM (JSX prevents HTML injection), protecting against XSS attacks.

#### Q60. What is CSRF and how does JWT protect against it?
**Ans:** Cross-Site Request Forgery tricks an authenticated browser into submitting unauthorized requests. Because our API uses bearer tokens sent in the custom `Authorization` HTTP header (rather than ambient session cookies), external malicious websites cannot forge authenticated requests.

#### Q61. How does the Quick Stock Adjustment drawer optimize inventory workflows?
**Ans:** Instead of navigating through multiple edit pages, warehouse staff can open the drawer directly from the product table, enter the new physical count, review the calculated discrepancy delta, and save in a single click.

#### Q62. How would you scale SmartStock if inventory grew to 1,000,000 SKUs?
**Ans:**
1. **Database Sharding**: Partition the MongoDB collection across multiple shards using `sku` as the shard key.
2. **Redis Caching**: Cache top-selling products and catalog queries in an in-memory Redis layer to offload reads from MongoDB.
3. **Cursor-based Pagination**: Replace offset pagination with indexed cursor pagination (`_id` or `createdAt`).
4. **CDN Asset Hosting**: Serve compiled React assets and images via Cloudflare or AWS CloudFront.

#### Q63. What was the most challenging technical hurdle in building SmartStock?
**Ans:** Designing the concurrency-safe inventory deduction. Handling simultaneous checkouts without locking the entire product table required carefully formulating single-document atomic update queries (`findOneAndUpdate` with `$gte` and `$inc`) to eliminate race conditions.

#### Q64. If you had 2 more weeks, what feature would you add next?
**Ans:** 
1. Integration with hardware receipt printers via WebUSB/ESC-POS protocols.
2. Automated PDF purchase orders emailed directly to registered suppliers when safety stock thresholds are breached.
3. Multi-warehouse transfer tracking with transit receipts.

#### Q65. Why should an organization choose SmartStock over generic spreadsheet tracking?
**Ans:** Spreadsheets lack concurrency protection (multiple users overwrite each other's data), have no cryptographic audit trails, cannot enforce role-based access control, and do not provide real-time POS barcode scanning or instant financial analytics. SmartStock eliminates human accounting errors and automates inventory replenishment.

---

## 6. Code Reference Cheat Sheet

Keep this table handy during your viva so you can open any file instantly if the mentor asks to see the code:

| What the Mentor Asks to See | Exact File Location | Key Function / Variable / Lines |
| :--- | :--- | :--- |
| **Atomic Inventory Decrement** | `server/src/controllers/saleController.js` | `createSale()` $\rightarrow$ `Product.findOneAndUpdate({ stockQuantity: { $gte: ... } })` |
| **Bcrypt Password Hashing** | `server/src/models/User.js` | `userSchema.pre('save', ...)` & `matchPassword()` |
| **JWT Generation Utility** | `server/src/utils/generateToken.js` | `jwt.sign({ id, role }, secret, ...)` |
| **JWT Verification Middleware** | `server/src/middleware/authMiddleware.js` | `protect()` & `adminOnly()` |
| **Indian Rupee (₹) Formatter** | `client/src/utils/formatCurrency.js` | `formatINR()` $\rightarrow$ `Intl.NumberFormat('en-IN')` |
| **Product Stock State Machine** | `server/src/models/Product.js` | `status: { enum: ['In Stock', 'Low Stock', 'Out of Stock'] }` |
| **Quick Stock Adjustment API** | `server/src/controllers/productController.js` | `adjustStock()` |
| **Quick Stock Adjustment UI Drawer**| `client/src/pages/ProductsPage.jsx` | `adjustDrawer` & `handleSaveAdjustment()` |
| **POS Cart Calculations & Discount**| `client/src/pages/SalesPosPage.jsx` | `subtotal`, `loyaltyDiscount`, `tax`, `total` |
| **Executive Analytics Controller** | `server/src/controllers/analyticsController.js`| `getSummary()` & `getTopProducts()` |
| **Interactive Donut & Charts** | `client/src/pages/AnalyticsPage.jsx` | `<ComposedChart />` & `<AreaChart />` |
| **One-Click Demo Credentials** | `client/src/pages/LoginPage.jsx` | `fillCredentials('admin')` & `fillCredentials('staff')` |
| **Database Connection & Fallback** | `server/src/config/db.js` | `connectDB()` with `serverSelectionTimeoutMS: 3000` |
| **Auto-Seed Initial Indian Data** | `server/src/services/seedService.js` | `seedInitialDataIfEmpty()` |

---

*Best of luck with your college project viva! You are thoroughly prepared to ace every question.*
