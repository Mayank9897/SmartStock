import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import seedInitialDataIfEmpty from './services/seedService.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to Database
  try {
    const conn = await connectDB();
    if (conn) {
      // Auto-seed if collections are empty
      await seedInitialDataIfEmpty();
    }
  } catch (err) {
    console.warn('[Startup] Database connection error:', err.message);
  }

  // Start HTTP Listener
  app.listen(PORT, () => {
    console.log(`
======================================================
  SmartStock — Backend REST API Server Online
======================================================
  Port:        http://localhost:${PORT}
  Environment: ${process.env.NODE_ENV || 'development'}
  Currency:    INR (₹) Standard
  API Health:  http://localhost:${PORT}/api/health
  Products:    http://localhost:${PORT}/api/products
  Analytics:   http://localhost:${PORT}/api/analytics/summary

  Demo Credentials:
    Admin: admin@smartstock.in / Admin@123
    Staff: staff@smartstock.in / Staff@123
======================================================
    `);
  });
};

startServer();
