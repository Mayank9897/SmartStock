import express from 'express';
import { createSale, getSales, getSaleByInvoice } from '../controllers/saleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createSale)
  .get(protect, getSales);

router.get('/:invoiceNumber', protect, getSaleByInvoice);

export default router;
