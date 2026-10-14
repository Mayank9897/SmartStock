import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Sale from '../models/Sale.js';
import Customer from '../models/Customer.js';
import Supplier from '../models/Supplier.js';
import connectDB from '../config/db.js';

dotenv.config();

export const seedProducts = [
  {
    sku: 'TECH-9941',
    barcode: '8412890042',
    name: 'Logitech MX Master 3S',
    description: 'Graphite, Pale Gray • Precision Wireless Mouse',
    category: 'Electronics',
    costPrice: 4500,
    price: 8995,
    stockQuantity: 42,
    minimumStock: 15,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
  {
    sku: 'SKU-EL-8821',
    barcode: '1946440182',
    name: 'Anker Prime 20,000mAh Power Bank',
    description: '200W Output • Ultra Compact 3-Port',
    category: 'Electronics',
    costPrice: 5200,
    price: 10499,
    stockQuantity: 118,
    minimumStock: 25,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
  {
    sku: 'SKU-CH-409',
    barcode: '9841209144',
    name: 'Ergonomic High-Back Mesh Chair',
    description: 'Adjustable Lumbar Support • Charcoal Gray',
    category: 'Office Hardware',
    costPrice: 8500,
    price: 16999,
    stockQuantity: 3,
    minimumStock: 15,
    warehouse: 'Mumbai Hub',
    status: 'Low Stock',
  },
  {
    sku: 'SKU-SC-088',
    barcode: '4091823901',
    name: 'Wireless Laser Barcode Scanner',
    description: 'Handheld 2D QR Scanner + Desktop Stand',
    category: 'POS Hardware',
    costPrice: 3200,
    price: 6499,
    stockQuantity: 0,
    minimumStock: 10,
    warehouse: 'Mumbai Hub',
    status: 'Out of Stock',
  },
  {
    sku: 'SKU-PP-912',
    barcode: '3190820019',
    name: 'Thermal Receipt Paper 50-pack',
    description: '80mm x 50m High Density Thermal Rolls',
    category: 'Packaging',
    costPrice: 750,
    price: 1450,
    stockQuantity: 4,
    minimumStock: 25,
    warehouse: 'Mumbai Hub',
    status: 'Low Stock',
  },
  {
    sku: 'HUB-USBC-8P',
    barcode: '6129841029',
    name: 'Multiport 8-in-1 USB-C Hub',
    description: '4K HDMI, Gigabit LAN, 100W Power Delivery',
    category: 'Electronics',
    costPrice: 2200,
    price: 4999,
    stockQuantity: 64,
    minimumStock: 20,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
  {
    sku: 'PKG-BX-1212',
    barcode: '5541908210',
    name: 'Corrugated Shipping Boxes 12x12x4',
    description: 'Bundle of 50 • Recycled Kraft Brown',
    category: 'Packaging',
    costPrice: 65,
    price: 180,
    stockQuantity: 1450,
    minimumStock: 300,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
  {
    sku: 'DEL-U3223QE',
    barcode: '7721894031',
    name: 'Dell UltraSharp 32" 4K USB-C Hub Monitor',
    description: 'IPS Black Technology, 98% DCI-P3, HDR400',
    category: 'Electronics',
    costPrice: 52000,
    price: 74990,
    stockQuantity: 18,
    minimumStock: 5,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
  {
    sku: 'KEY-MECH-RGB',
    barcode: '6610928374',
    name: 'Keychron K2 Wireless Mechanical Keyboard',
    description: 'Hot-swappable Gateron G Pro Red switches',
    category: 'Electronics',
    costPrice: 3800,
    price: 6499,
    stockQuantity: 28,
    minimumStock: 10,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
  {
    sku: 'ZEB-ZD621',
    barcode: '5501928341',
    name: 'Zebra Direct Thermal Label Printer',
    description: '4-inch 203 DPI Desktop Barcode Printer',
    category: 'POS Hardware',
    costPrice: 17800,
    price: 24500,
    stockQuantity: 9,
    minimumStock: 4,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
];

export const seedCustomers = [
  {
    name: 'Apex Innovations Pvt Ltd',
    contact: 'Rajesh Sharma',
    phone: '+91 98201 44821',
    city: 'Mumbai',
    tier: 'Business Gold',
    balance: 145000,
  },
  {
    name: 'Meridian Retailers',
    contact: 'Anita Joshi',
    phone: '+91 98450 11920',
    city: 'Pune',
    tier: 'Enterprise Tier',
    balance: 48900,
  },
  {
    name: 'Urban Artisan Roastery',
    contact: 'Vikram Mehta',
    phone: '+91 99100 88219',
    city: 'Delhi',
    tier: 'Standard',
    balance: 12400,
  },
  {
    name: 'Dr. Marcus Vance Clinic',
    contact: 'Dr. Vance',
    phone: '+91 80234 55910',
    city: 'Bengaluru',
    tier: 'Standard',
    balance: 0,
  },
  {
    name: 'Skyline Supermart Retail',
    contact: 'Kiran Patel',
    phone: '+91 98790 33412',
    city: 'Ahmedabad',
    tier: 'Business Gold',
    balance: 87500,
  },
];

export const seedSuppliers = [
  {
    name: 'Logitech India Distribution Pvt Ltd',
    contact: 'Sanjay Deshmukh',
    phone: '+91 22 6120 9000',
    email: 'supply@logitech.in',
    category: 'Peripherals',
    leadTime: '3 Days',
  },
  {
    name: 'Anker Innovations Electronics India',
    contact: 'Pooja Agarwal',
    phone: '+91 80 4410 8820',
    email: 'orders@anker.in',
    category: 'Batteries & Charging',
    leadTime: '2 Days',
  },
  {
    name: 'Godrej Office Seating Systems',
    contact: 'Mahesh Kulkarni',
    phone: '+91 22 2518 8000',
    email: 'b2b@godrej.com',
    category: 'Office Hardware',
    leadTime: '7 Days',
  },
  {
    name: 'Zebra Enterprise Solutions India',
    contact: 'Naveen Rao',
    phone: '+91 80 6710 4000',
    email: 'channel@zebra.com',
    category: 'POS Hardware',
    leadTime: '4 Days',
  },
  {
    name: 'JK Paper & Packaging Mills',
    contact: 'Deepak Singhal',
    phone: '+91 124 4567 890',
    email: 'corrugation@jkpaper.com',
    category: 'Packaging',
    leadTime: '5 Days',
  },
];

export const seedInitialDataIfEmpty = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return; // Skip if Mongo not connected
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[Seed] Seeding initial users...');
      await User.create([
        {
          name: 'Rajesh Kumar (Administrator)',
          email: 'admin@smartstock.in',
          password: 'Admin@123',
          role: 'admin',
        },
        {
          name: 'Pooja Sharma (Sales Lead)',
          email: 'staff@smartstock.in',
          password: 'Staff@123',
          role: 'staff',
        },
      ]);
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('[Seed] Seeding initial product catalog...');
      const createdProducts = await Product.create(seedProducts);

      // Seed initial sales history if none exist
      const saleCount = await Sale.countDocuments();
      if (saleCount === 0 && createdProducts.length >= 2) {
        console.log('[Seed] Seeding sample sales transactions...');
        await Sale.create([
          {
            invoiceNumber: 'ORD-89412',
            customerName: 'Meridian Retailers (Pune)',
            items: [
              {
                product: createdProducts[0]._id,
                name: createdProducts[0].name,
                quantity: 2,
                unitPrice: createdProducts[0].price,
                subtotal: createdProducts[0].price * 2,
              },
            ],
            subtotal: 17990,
            discount: 899,
            tax: 3076,
            totalAmount: 20167,
            paymentMethod: 'UPI / Razorpay',
            saleDate: new Date(),
          },
          {
            invoiceNumber: 'ORD-89411',
            customerName: 'Summit Logistics (Mumbai)',
            items: [
              {
                product: createdProducts[7]?._id || createdProducts[1]._id,
                name: createdProducts[7]?.name || createdProducts[1].name,
                quantity: 1,
                unitPrice: createdProducts[7]?.price || createdProducts[1].price,
                subtotal: createdProducts[7]?.price || createdProducts[1].price,
              },
            ],
            subtotal: 74990,
            discount: 3749,
            tax: 12823,
            totalAmount: 84064,
            paymentMethod: 'NEFT Transfer',
            saleDate: new Date(Date.now() - 3600000 * 4),
          },
        ]);
      }
    }

    const customerCount = await Customer.countDocuments();
    if (customerCount === 0) {
      console.log('[Seed] Seeding customer accounts...');
      await Customer.create(seedCustomers);
    }

    const supplierCount = await Supplier.countDocuments();
    if (supplierCount === 0) {
      console.log('[Seed] Seeding suppliers...');
      await Supplier.create(seedSuppliers);
    }

    console.log('[Seed] Database initialization complete.');
  } catch (error) {
    console.error('[Seed Error]:', error.message);
  }
};

// Standalone runner: node src/services/seedService.js
if (process.argv[1] && process.argv[1].endsWith('seedService.js')) {
  (async () => {
    try {
      console.log('Connecting to database for explicit seeding...');
      await connectDB();
      // Force clear and repopulate
      await User.deleteMany();
      await Product.deleteMany();
      await Sale.deleteMany();
      await Customer.deleteMany();
      await Supplier.deleteMany();
      console.log('Collections cleared. Repopulating fresh Indian demo dataset...');
      await seedInitialDataIfEmpty();
      console.log('✓ Seeding finished successfully!');
      process.exit(0);
    } catch (err) {
      console.error('Seeding failed:', err);
      process.exit(1);
    }
  })();
}

export default seedInitialDataIfEmpty;

