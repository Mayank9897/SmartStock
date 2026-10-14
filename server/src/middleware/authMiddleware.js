import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'smartstock_secret_key_bca_2025');

      // Try finding user in database if MongoDB is connected
      if (mongoose.connection.readyState === 1) {
        try {
          const user = await User.findById(decoded.id).select('-password');
          if (user) {
            req.user = user;
            return next();
          }
        } catch (dbErr) {
          // fallback to memory token decoding below
        }
      }

      // Fast fallback for seeded admin/staff tokens or offline viva mode
      req.user = {
        _id: decoded.id,
        name: decoded.role === 'admin' ? 'Rajesh Kumar (Administrator)' : 'Pooja Sharma (Sales Lead)',
        email: decoded.role === 'admin' ? 'admin@smartstock.in' : 'staff@smartstock.in',
        role: decoded.role || 'staff',
      };
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed verification' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Administrator privileges required' });
  }
};

export default { protect, adminOnly };

