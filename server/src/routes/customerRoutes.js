import express from 'express';
import Customer from '../models/Customer.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json({ count: customers.length, customers });
  } catch (err) {
    res.json({ count: 0, customers: [] });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
