import express from 'express';
import Supplier from '../models/Supplier.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json({ count: suppliers.length, suppliers });
  } catch (err) {
    res.json({ count: 0, suppliers: [] });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
