import mongoose from 'mongoose';
import Product from '../models/Product.js';

// Pre-seeded Indian Inventory Dataset
let memoryProducts = [
  {
    _id: '66e1f0000000000000000101',
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
    _id: '66e1f0000000000000000102',
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
    _id: '66e1f0000000000000000103',
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
    _id: '66e1f0000000000000000104',
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
    _id: '66e1f0000000000000000105',
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
    _id: '66e1f0000000000000000106',
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
    _id: '66e1f0000000000000000107',
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
    _id: '66e1f0000000000000000108',
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
    _id: '66e1f0000000000000000109',
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
    _id: '66e1f0000000000000000110',
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

/**
 * Helper to filter memory products
 */
const filterMemory = (search, category, status) => {
  let list = [...memoryProducts];
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(s) || 
      p.sku.toLowerCase().includes(s) || 
      p.barcode.includes(s)
    );
  }
  if (category && category !== 'All Categories') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (status === 'instock') {
    list = list.filter(p => p.stockQuantity > p.minimumStock);
  } else if (status === 'lowstock') {
    list = list.filter(p => p.stockQuantity > 0 && p.stockQuantity <= p.minimumStock);
  } else if (status === 'outofstock') {
    list = list.filter(p => p.stockQuantity === 0);
  }
  return list;
};

/**
 * @desc    Get all products with filtering & search
 * @route   GET /api/products
 * @access  Private / Public
 */
export const getProducts = async (req, res) => {
  const { search, category, status } = req.query;

  if (mongoose.connection.readyState === 1) {
    try {
      let query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { sku: { $regex: search, $options: 'i' } },
          { barcode: { $regex: search, $options: 'i' } },
        ];
      }
      if (category && category !== 'All Categories') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
      if (status === 'instock') {
        query.stockQuantity = { $gt: 5 };
      } else if (status === 'lowstock') {
        query.stockQuantity = { $gt: 0, $lte: 15 };
      } else if (status === 'outofstock') {
        query.stockQuantity = 0;
      }

      const products = await Product.find(query).sort({ createdAt: -1 });
      if (products && products.length > 0) {
        return res.json({ count: products.length, products });
      }
    } catch (error) {
      console.warn('[Product Controller] DB query failed, using memory:', error.message);
    }
  }

  // Memory products fallback
  const filtered = filterMemory(search, category, status);
  res.json({ count: filtered.length, products: filtered });
};

/**
 * @desc    Get single product by ID or SKU
 * @route   GET /api/products/:id
 * @access  Private
 */
export const getProductById = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const product = await Product.findById(req.params.id);
      if (product) return res.json(product);
    } catch (error) {
      // ignore
    }
  }

  const fallback = memoryProducts.find(p => p._id === req.params.id || p.sku === req.params.id);
  if (fallback) return res.json(fallback);
  res.status(404).json({ message: 'Product not found' });
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private
 */
export const createProduct = async (req, res) => {
  const { name, sku, category, costPrice, price, stockQuantity, minimumStock, warehouse, barcode, description } = req.body;

  let status = 'In Stock';
  const qty = Number(stockQuantity) || 0;
  const min = Number(minimumStock) || 5;
  if (qty === 0) status = 'Out of Stock';
  else if (qty <= min) status = 'Low Stock';

  const newDoc = {
    name,
    sku: (sku || `SKU-${Date.now().toString().slice(-4)}`).toUpperCase(),
    barcode: barcode || Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    category: category || 'Electronics',
    description: description || '',
    costPrice: Number(costPrice) || 0,
    price: Number(price) || 0,
    stockQuantity: qty,
    minimumStock: min,
    warehouse: warehouse || 'Mumbai Hub',
    status,
  };

  if (mongoose.connection.readyState === 1) {
    try {
      const existing = await Product.findOne({ sku: newDoc.sku });
      if (existing) {
        return res.status(400).json({ message: 'Product with this SKU already exists' });
      }
      const product = new Product(newDoc);
      const saved = await product.save();
      memoryProducts.unshift(saved);
      return res.status(201).json(saved);
    } catch (error) {
      console.warn('[Create Product] DB error, using fallback:', error.message);
    }
  }

  const memoryItem = {
    _id: `mem-${Date.now()}`,
    ...newDoc,
    createdAt: new Date(),
  };
  memoryProducts.unshift(memoryItem);
  res.status(201).json(memoryItem);
};

/**
 * @desc    Update product details
 * @route   PUT /api/products/:id
 * @access  Private
 */
export const updateProduct = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        Object.assign(product, req.body);
        const updated = await product.save();
        return res.json(updated);
      }
    } catch (error) {
      // ignore
    }
  }

  const memIdx = memoryProducts.findIndex(p => p._id === req.params.id);
  if (memIdx !== -1) {
    memoryProducts[memIdx] = { ...memoryProducts[memIdx], ...req.body };
    return res.json(memoryProducts[memIdx]);
  }

  res.status(404).json({ message: 'Product not found' });
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private
 */
export const deleteProduct = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      await Product.findByIdAndDelete(req.params.id);
    } catch (error) {
      // ignore
    }
  }
  memoryProducts = memoryProducts.filter(p => p._id !== req.params.id);
  res.json({ message: 'Product removed from catalog' });
};

/**
 * @desc    Adjust inventory stock level
 * @route   POST /api/products/:id/adjust-stock
 * @access  Private
 */
export const adjustStock = async (req, res) => {
  const { quantity } = req.body;
  const newQty = Math.max(0, Number(quantity) || 0);

  if (mongoose.connection.readyState === 1) {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        product.stockQuantity = newQty;
        if (newQty === 0) product.status = 'Out of Stock';
        else if (newQty <= product.minimumStock) product.status = 'Low Stock';
        else product.status = 'In Stock';
        await product.save();
        return res.json({ message: 'Stock successfully updated in MongoDB', product });
      }
    } catch (error) {
      // fallback
    }
  }

  const memItem = memoryProducts.find(p => p._id === req.params.id);
  if (memItem) {
    memItem.stockQuantity = newQty;
    memItem.status = newQty === 0 ? 'Out of Stock' : newQty <= (memItem.minimumStock || 5) ? 'Low Stock' : 'In Stock';
    return res.json({ message: 'Stock updated in session memory', product: memItem });
  }

  res.status(404).json({ message: 'Product not found' });
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
};
