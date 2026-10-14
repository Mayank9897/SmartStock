import express from 'express';
import { getSummary, getTopProducts } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', getSummary);
router.get('/top-products', getTopProducts);

export default router;
