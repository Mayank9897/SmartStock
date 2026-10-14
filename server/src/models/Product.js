import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    barcode: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      default: 'Electronics',
    },
    description: {
      type: String,
      trim: true,
    },
    costPrice: {
      type: Number,
      required: [true, 'Cost price is required'],
      min: [0, 'Cost price cannot be negative'],
    },
    price: {
      type: Number,
      required: [true, 'Selling price is required'],
      min: [0, 'Selling price cannot be negative'],
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: [0, 'Stock quantity cannot be negative'],
      default: 0,
    },
    minimumStock: {
      type: Number,
      required: true,
      min: [0, 'Minimum stock threshold cannot be negative'],
      default: 5,
    },
    warehouse: {
      type: String,
      default: 'Mumbai Hub',
    },
    status: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to automatically evaluate inventory health state
productSchema.pre('save', function (next) {
  if (this.stockQuantity === 0) {
    this.status = 'Out of Stock';
  } else if (this.stockQuantity <= this.minimumStock) {
    this.status = 'Low Stock';
  } else {
    this.status = 'In Stock';
  }
  next();
});

export const Product = mongoose.model('Product', productSchema);
export default Product;

