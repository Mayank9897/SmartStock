import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Supplier name is required'],
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      default: 'General Hardware',
    },
    leadTime: {
      type: String,
      default: '3 Days',
    },
  },
  {
    timestamps: true,
  }
);

export const Supplier = mongoose.model('Supplier', supplierSchema);
export default Supplier;

