import mongoose from 'mongoose';

const saleItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, 'Unit price cannot be negative'],
  },
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative'],
  },
});

const saleSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: [true, 'Invoice number is required'],
      unique: true,
      trim: true,
    },
    items: [saleItemSchema],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      default: 'Cash',
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: false,
    },
    customerName: {
      type: String,
      default: 'Walk-in Customer',
    },
    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Sale = mongoose.model('Sale', saleSchema);
export default Sale;

