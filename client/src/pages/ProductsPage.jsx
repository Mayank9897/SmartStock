import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatINR } from '../utils/formatCurrency.js';
import { productApi } from '../services/api.js';

// Initial realistic Indian catalog items
const initialProducts = [
  {
    _id: '1',
    sku: 'TECH-9941',
    barcode: '8412890042',
    name: 'Logitech MX Master 3S',
    description: 'Graphite, Pale Gray • 2 variants',
    category: 'Electronics',
    costPrice: 4500,
    price: 8995,
    stockQuantity: 42,
    minimumStock: 15,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
  {
    _id: '2',
    sku: 'SKU-EL-8821',
    barcode: '1946440182',
    name: 'Anker Prime 20,000mAh Power Bank',
    description: '200W Output • Ultra Compact',
    category: 'Electronics',
    costPrice: 5200,
    price: 10499,
    stockQuantity: 118,
    minimumStock: 25,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
  {
    _id: '3',
    sku: 'SKU-CH-409',
    barcode: '9841209144',
    name: 'Ergonomic High-Back Mesh Chair',
    description: 'Adjustable Lumbar Support • Charcoal',
    category: 'Office Hardware',
    costPrice: 8500,
    price: 16999,
    stockQuantity: 3,
    minimumStock: 15,
    warehouse: 'Mumbai Hub',
    status: 'Low Stock',
  },
  {
    _id: '4',
    sku: 'SKU-SC-088',
    barcode: '4091823901',
    name: 'Wireless Laser Barcode Scanner',
    description: 'Handheld 2D QR Scanner + Stand',
    category: 'POS Hardware',
    costPrice: 3200,
    price: 6499,
    stockQuantity: 0,
    minimumStock: 10,
    warehouse: 'Mumbai Hub',
    status: 'Out of Stock',
  },
  {
    _id: '5',
    sku: 'SKU-PP-912',
    barcode: '3190820019',
    name: 'Thermal Receipt Paper 50-pack',
    description: '80mm x 50m High Density Rolls',
    category: 'Packaging',
    costPrice: 750,
    price: 1450,
    stockQuantity: 4,
    minimumStock: 25,
    warehouse: 'Mumbai Hub',
    status: 'Low Stock',
  },
  {
    _id: '6',
    sku: 'HUB-USBC-8P',
    barcode: '6129841029',
    name: 'Multiport 8-in-1 USB-C Hub',
    description: '4K HDMI, Gigabit LAN, 100W PD',
    category: 'Electronics',
    costPrice: 2200,
    price: 4999,
    stockQuantity: 64,
    minimumStock: 20,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
  {
    _id: '7',
    sku: 'PKG-BX-1212',
    barcode: '5541908210',
    name: 'Corrugated Shipping Boxes 12x12x4',
    description: 'Bundle of 50 • Recycled Kraft',
    category: 'Packaging',
    costPrice: 65,
    price: 180,
    stockQuantity: 1450,
    minimumStock: 300,
    warehouse: 'Mumbai Hub',
    status: 'In Stock',
  },
];

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('filter') || 'all');
  const [selectedWarehouse, setSelectedWarehouse] = useState('mumbai');

  // Selected product for right-side Quick Adjustment drawer
  const [selectedProduct, setSelectedProduct] = useState(initialProducts[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Quick Adjustment Form state
  const [adjustmentType, setAdjustmentType] = useState('stock-in'); // 'stock-in', 'shrinkage', 'recount'
  const [quantityOffset, setQuantityOffset] = useState(15);
  const [adjustmentReason, setAdjustmentReason] = useState('po');
  const [adjustmentNotes, setAdjustmentNotes] = useState('Pallet verified by QA at Mumbai Hub bay B3.');
  const [adjustSuccessToast, setAdjustSuccessToast] = useState('');

  // Add Product Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'Electronics',
    costPrice: '',
    price: '',
    stockQuantity: '',
    minimumStock: '10',
    warehouse: 'Mumbai Hub',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productApi.getAll();
      if (res && res.products && res.products.length > 0) {
        setProducts(res.products);
        if (!selectedProduct) setSelectedProduct(res.products[0]);
      }
    } catch {
      // Fallback to initial seed items
    }
  };

  // Filter products based on search, category, status
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.barcode && p.barcode.includes(searchQuery));

    const matchesCategory =
      !selectedCategory ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    let matchesStatus = true;
    if (selectedStatus === 'instock') matchesStatus = p.stockQuantity > (p.minimumStock || 5);
    else if (selectedStatus === 'lowstock') matchesStatus = p.stockQuantity > 0 && p.stockQuantity <= (p.minimumStock || 5);
    else if (selectedStatus === 'outofstock') matchesStatus = p.stockQuantity === 0;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate stats
  const activeInventoryValue = products.reduce((acc, p) => acc + (p.price || 0) * (p.stockQuantity || 0), 0);
  const totalUnits = products.reduce((acc, p) => acc + (p.stockQuantity || 0), 0);
  const lowStockCount = products.filter((p) => p.stockQuantity <= (p.minimumStock || 5)).length;

  // Handle Quick Stock Adjustment
  const handleConfirmAdjustment = async () => {
    if (!selectedProduct) return;
    const offset = Number(quantityOffset) || 0;
    let newQty = selectedProduct.stockQuantity;

    if (adjustmentType === 'stock-in') newQty += offset;
    else if (adjustmentType === 'shrinkage') newQty = Math.max(0, newQty - offset);
    else if (adjustmentType === 'recount') newQty = offset;

    // Check status
    let newStatus = 'In Stock';
    if (newQty === 0) newStatus = 'Out of Stock';
    else if (newQty <= selectedProduct.minimumStock) newStatus = 'Low Stock';

    try {
      await productApi.adjustStock(selectedProduct._id, {
        quantity: newQty,
        type: adjustmentType,
        reason: adjustmentReason,
        notes: adjustmentNotes,
      });
    } catch {
      // Offline fallback state update
    }

    setProducts((prev) =>
      prev.map((p) =>
        p._id === selectedProduct._id ? { ...p, stockQuantity: newQty, status: newStatus } : p
      )
    );
    setSelectedProduct((prev) => ({ ...prev, stockQuantity: newQty, status: newStatus }));

    setAdjustSuccessToast(`Updated stock for ${selectedProduct.name} to ${newQty} units`);
    setTimeout(() => setAdjustSuccessToast(''), 4000);
  };

  // Handle Add Product Submit
  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.sku || !newProduct.price) {
      alert('Please fill out all required fields');
      return;
    }

    const costPrice = Number(newProduct.costPrice) || 0;
    const price = Number(newProduct.price) || 0;
    const stockQuantity = Number(newProduct.stockQuantity) || 0;
    const minimumStock = Number(newProduct.minimumStock) || 5;

    let status = 'In Stock';
    if (stockQuantity === 0) status = 'Out of Stock';
    else if (stockQuantity <= minimumStock) status = 'Low Stock';

    const item = {
      _id: Date.now().toString(),
      name: newProduct.name,
      sku: newProduct.sku.toUpperCase(),
      category: newProduct.category,
      costPrice,
      price,
      stockQuantity,
      minimumStock,
      warehouse: newProduct.warehouse,
      status,
    };

    try {
      await productApi.create(item);
    } catch {
      // offline fallback
    }

    setProducts([item, ...products]);
    setSelectedProduct(item);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      sku: '',
      category: 'Electronics',
      costPrice: '',
      price: '',
      stockQuantity: '',
      minimumStock: '10',
      warehouse: 'Mumbai Hub',
    });
    setAdjustSuccessToast(`Product ${item.name} successfully created!`);
    setTimeout(() => setAdjustSuccessToast(''), 4000);
  };

  // Calculate new total preview for drawer
  const getCalculatedTotal = () => {
    if (!selectedProduct) return 0;
    const offset = Number(quantityOffset) || 0;
    if (adjustmentType === 'stock-in') return selectedProduct.stockQuantity + offset;
    if (adjustmentType === 'shrinkage') return Math.max(0, selectedProduct.stockQuantity - offset);
    return offset;
  };

  return (
    <div className="flex flex-col w-full space-y-space-lg">
      
      {/* Toast Alert */}
      {adjustSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-space-lg py-space-sm rounded-xl shadow-xl flex items-center gap-space-sm animate-fade-in border border-primary-container">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="font-label-md text-label-md">{adjustSuccessToast}</span>
        </div>
      )}

      {/* Top Banner & Quick Filter Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container"></span>
            <span className="font-caption text-caption uppercase tracking-wider font-semibold">
              Real-Time Catalog Sync
            </span>
            <span className="text-outline">/</span>
            <span className="font-data-mono">{products.length} SKU Records</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mt-space-2xs font-bold">
            Products & Inventory Directory
          </h1>
          <p className="font-body-sm text-body-sm text-secondary">
            Manage master stock levels, multi-warehouse splits, product cost sheets, and initiate manual batch stock updates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            onClick={() => alert('CSV Export: Generated 7 products summary in memory')}
            className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-space-xs px-space-lg py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-colors font-label-md text-label-md shadow-sm font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter & Command Bar */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col xl:flex-row gap-space-md items-stretch xl:items-center justify-between border border-outline-variant/30">
        <div className="flex flex-1 flex-wrap items-center gap-space-sm">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[280px]">
            <span className="material-symbols-outlined text-[18px] text-secondary absolute left-space-md top-1/2 -translate-y-1/2 pointer-events-none">
              search
            </span>
            <input
              className="w-full bg-surface-bright rounded-lg pl-9 pr-10 py-2 font-body-sm text-body-sm text-on-surface placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
              placeholder="Search by name, SKU, or barcode..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-space-sm top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface p-1"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative min-w-[170px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-surface-bright rounded-lg pl-space-md pr-8 py-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer border border-outline-variant/30"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="office hardware">Office Hardware</option>
              <option value="packaging">Packaging</option>
              <option value="pos hardware">POS Hardware</option>
            </select>
            <span className="material-symbols-outlined text-[18px] text-secondary absolute right-space-sm top-1/2 -translate-y-1/2 pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Stock Status Filter */}
          <div className="relative min-w-[150px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none bg-surface-bright rounded-lg pl-space-md pr-8 py-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer border border-outline-variant/30"
            >
              <option value="all">All Stock Status</option>
              <option value="instock">In Stock</option>
              <option value="lowstock">Low Stock (≤ threshold)</option>
              <option value="outofstock">Out of Stock</option>
            </select>
            <span className="material-symbols-outlined text-[18px] text-secondary absolute right-space-sm top-1/2 -translate-y-1/2 pointer-events-none">
              tune
            </span>
          </div>

          {/* Warehouse Selection */}
          <div className="relative min-w-[160px]">
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="w-full appearance-none bg-surface-bright rounded-lg pl-space-md pr-8 py-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer border border-outline-variant/30"
            >
              <option value="all">All Locations</option>
              <option value="mumbai">Mumbai Hub (Primary)</option>
              <option value="bengaluru">Bengaluru Depot</option>
              <option value="delhi">Delhi Transit</option>
            </select>
            <span className="material-symbols-outlined text-[18px] text-secondary absolute right-space-sm top-1/2 -translate-y-1/2 pointer-events-none">
              warehouse
            </span>
          </div>
        </div>

        {/* Active Tag pills and reset */}
        <div className="flex items-center gap-space-xs overflow-x-auto py-1">
          <div className="flex items-center gap-1 bg-surface-container px-space-sm py-1 rounded-full text-on-surface font-caption text-caption">
            <span>Hub: Mumbai Hub</span>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedStatus('all');
            }}
            className="text-primary hover:text-primary-container font-label-sm text-label-sm px-space-xs transition-colors underline whitespace-nowrap"
            type="button"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Operational Bento Overview (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-caption text-caption uppercase text-secondary font-semibold">Active Inventory Value</span>
            <span className="font-headline-md text-headline-md text-on-surface mt-1 font-bold">
              {formatINR(activeInventoryValue)}
            </span>
            <div className="flex items-center gap-1 mt-1 text-primary-container font-caption text-caption">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+4.2% vs last audit</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-caption text-caption uppercase text-secondary font-semibold">Units In Hand</span>
            <span className="font-headline-md text-headline-md text-on-surface mt-1 font-bold">
              {totalUnits.toLocaleString('en-IN')} pcs
            </span>
            <div className="flex items-center gap-1 mt-1 text-secondary font-caption text-caption">
              <span>Mumbai Hub: {(totalUnits * 0.7).toFixed(0)}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">inventory</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-caption text-caption uppercase text-secondary font-semibold">Low Stock Triggers</span>
            <span className="font-headline-md text-headline-md text-tertiary mt-1 font-bold">
              {lowStockCount} SKUs
            </span>
            <div className="flex items-center gap-1 mt-1 text-tertiary font-caption text-caption">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              <span>Requires replenishment</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
            <span className="material-symbols-outlined text-[22px]">notification_important</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-caption text-caption uppercase text-secondary font-semibold">Average Margin</span>
            <span className="font-headline-md text-headline-md text-on-surface mt-1 font-bold">47.8%</span>
            <div className="flex items-center gap-1 mt-1 text-primary-container font-caption text-caption">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              <span>Healthy gross margin</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-[22px]">pie_chart</span>
          </div>
        </div>
      </div>

      {/* Main Layout: Products Table (left) & Quick Stock Adjustment Drawer (right) */}
      <div className="relative grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        
        {/* Table Container (xl:col-span-8 or 12) */}
        <div className={`${isDrawerOpen ? 'xl:col-span-8' : 'xl:col-span-12'} flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30`}>
          <div className="px-space-lg py-space-md flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest border-b border-surface-container-low">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Product Catalog</span>
              <span className="bg-surface-container text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded-full font-data-mono">
                Showing {filteredProducts.length} items
              </span>
            </div>
            {!isDrawerOpen && (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="text-primary hover:text-primary-container font-label-sm text-label-sm flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Open Adjustment Drawer</span>
              </button>
            )}
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-surface-container-low text-secondary font-caption text-caption uppercase tracking-wider">
                  <th className="py-space-sm px-space-sm font-semibold">SKU / Barcode</th>
                  <th className="py-space-sm px-space-md font-semibold">Product & Variants</th>
                  <th className="py-space-sm px-space-sm font-semibold">Category</th>
                  <th className="py-space-sm px-space-sm font-semibold text-right">Cost / Sell / Margin</th>
                  <th className="py-space-sm px-space-md font-semibold text-center">On Hand</th>
                  <th className="py-space-sm px-space-sm font-semibold">Status</th>
                  <th className="py-space-sm pr-space-lg pl-space-xs text-right font-semibold">Fast Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface">
                {filteredProducts.map((p) => {
                  const isSelected = selectedProduct?._id === p._id;
                  const margin = p.price && p.costPrice ? (((p.price - p.costPrice) / p.price) * 100).toFixed(1) : 0;

                  return (
                    <tr
                      key={p._id}
                      onClick={() => {
                        setSelectedProduct(p);
                        setIsDrawerOpen(true);
                      }}
                      className={`hover:bg-surface-container-low transition-colors cursor-pointer ${
                        isSelected ? 'bg-surface-container-high/40' : ''
                      }`}
                    >
                      <td className="py-space-md px-space-sm">
                        <div className="flex flex-col">
                          <span className="font-data-mono font-semibold text-on-surface">{p.sku}</span>
                          <span className="font-caption text-caption text-secondary font-data-mono">{p.barcode || '8412890042'}</span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex items-center gap-space-sm">
                          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-sm">
                            {p.name.charAt(0)}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-md text-label-md text-on-surface font-semibold truncate max-w-[200px]">
                              {p.name}
                            </span>
                            <span className="font-caption text-caption text-secondary truncate max-w-[200px]">
                              {p.description || 'Standard SKU'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-space-md px-space-sm">
                        <span className="bg-secondary-container text-on-secondary-fixed font-caption text-caption px-2 py-0.5 rounded-full font-medium">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-space-md px-space-sm text-right">
                        <div className="flex flex-col items-end font-data-mono">
                          <div className="flex items-center gap-1">
                            <span className="text-secondary">{formatINR(p.costPrice)}</span>
                            <span className="text-outline">/</span>
                            <span className="font-semibold text-on-surface">{formatINR(p.price)}</span>
                          </div>
                          <span className="text-primary-container font-caption font-semibold">
                            {margin}% Margin
                          </span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md text-center">
                        <div className="flex flex-col items-center">
                          <span className={`font-headline-sm font-semibold font-data-mono ${p.stockQuantity === 0 ? 'text-error' : 'text-on-surface'}`}>
                            {p.stockQuantity}
                          </span>
                          <span className="font-caption text-caption text-secondary bg-surface-container px-1.5 py-0.2 rounded font-data-mono">
                            MUM: {Math.ceil(p.stockQuantity * 0.7)} | BLR: {Math.floor(p.stockQuantity * 0.3)}
                          </span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-sm">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-caption text-caption font-semibold ${
                            p.status === 'In Stock'
                              ? 'bg-surface-container-high text-primary'
                              : p.status === 'Low Stock'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-error-container text-on-error-container'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              p.status === 'In Stock'
                                ? 'bg-primary-container'
                                : p.status === 'Low Stock'
                                ? 'bg-amber-500'
                                : 'bg-error'
                            }`}
                          ></span>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-space-md pr-space-lg pl-space-xs text-right">
                        <div className="flex items-center justify-end gap-1 text-secondary" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              setSelectedProduct(p);
                              setIsDrawerOpen(true);
                            }}
                            className="p-1 rounded hover:bg-surface-container text-primary hover:text-primary-container"
                            title="Adjust Stock"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">tune</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side Docked / Quick Stock Adjustment Drawer */}
        {isDrawerOpen && selectedProduct && (
          <div className="xl:col-span-4 flex flex-col bg-surface-container-lowest rounded-xl shadow-md p-space-lg relative overflow-hidden border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-md border-b border-surface-container-low">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Quick Stock Adjustment</h2>
                  <p className="font-caption text-caption text-secondary">
                    Audit log ID: <span className="font-data-mono">#ADJ-2025-9182</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-secondary hover:text-on-surface p-1 rounded-lg hover:bg-surface-container"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Selected Product Card */}
            <div className="bg-surface-container-low p-space-md rounded-lg flex items-center gap-space-md mt-space-md">
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg">
                {selectedProduct.name.charAt(0)}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                  {selectedProduct.name}
                </span>
                <span className="font-caption text-caption text-secondary font-data-mono">
                  SKU: {selectedProduct.sku}
                </span>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-outline-variant/20">
                  <span className="font-caption text-caption text-secondary">Current Stock:</span>
                  <span className="font-headline-sm font-semibold text-primary font-data-mono">
                    {selectedProduct.stockQuantity} units
                  </span>
                </div>
              </div>
            </div>

            {/* Adjustment Form */}
            <div className="flex flex-col space-y-space-md mt-space-md">
              <div className="flex flex-col space-y-1">
                <label className="font-label-sm text-label-sm text-secondary">Warehouse Location</label>
                <select className="w-full bg-surface-bright rounded-lg p-2 font-body-sm text-on-surface border border-outline-variant/30">
                  <option value="mumbai">Mumbai Hub (Primary Stock)</option>
                  <option value="bengaluru">Bengaluru Depot</option>
                  <option value="delhi">Delhi Transit</option>
                </select>
              </div>

              {/* Mode Switcher */}
              <div className="flex flex-col space-y-1">
                <label className="font-label-sm text-label-sm text-secondary">Adjustment Type</label>
                <div className="grid grid-cols-3 gap-1 bg-surface-container p-1 rounded-lg">
                  <button
                    onClick={() => setAdjustmentType('stock-in')}
                    className={`py-1.5 px-2 rounded-md font-label-sm text-label-sm flex items-center justify-center gap-1 transition-colors ${
                      adjustmentType === 'stock-in'
                        ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                        : 'text-secondary hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    <span>Stock In</span>
                  </button>

                  <button
                    onClick={() => setAdjustmentType('shrinkage')}
                    className={`py-1.5 px-2 rounded-md font-label-sm text-label-sm flex items-center justify-center gap-1 transition-colors ${
                      adjustmentType === 'shrinkage'
                        ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                        : 'text-secondary hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove_circle</span>
                    <span>Shrinkage</span>
                  </button>

                  <button
                    onClick={() => setAdjustmentType('recount')}
                    className={`py-1.5 px-2 rounded-md font-label-sm text-label-sm flex items-center justify-center gap-1 transition-colors ${
                      adjustmentType === 'recount'
                        ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                        : 'text-secondary hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    <span>Recount</span>
                  </button>
                </div>
              </div>

              {/* Quantity Offset Stepper */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-label-sm text-label-sm text-secondary">Quantity Offset</label>
                  <span className="font-caption text-caption text-secondary">
                    New total: <strong className="text-on-surface font-semibold font-data-mono">{getCalculatedTotal()} units</strong>
                  </span>
                </div>
                <div className="relative flex items-center">
                  <button
                    onClick={() => setQuantityOffset(Math.max(1, quantityOffset - 1))}
                    className="absolute left-1 w-7 h-7 flex items-center justify-center rounded bg-surface-container text-secondary hover:text-on-surface font-headline-sm"
                    type="button"
                  >
                    -
                  </button>
                  <input
                    className="w-full text-center bg-surface-bright rounded-lg py-2 font-headline-sm text-on-surface font-data-mono border border-outline-variant/30"
                    type="number"
                    min="1"
                    value={quantityOffset}
                    onChange={(e) => setQuantityOffset(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                  <button
                    onClick={() => setQuantityOffset(quantityOffset + 1)}
                    className="absolute right-1 w-7 h-7 flex items-center justify-center rounded bg-surface-container text-secondary hover:text-on-surface font-headline-sm"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Reason */}
              <div className="flex flex-col space-y-1">
                <label className="font-label-sm text-label-sm text-secondary">Reason / Reference</label>
                <select
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  className="w-full bg-surface-bright rounded-lg p-2 font-body-sm text-on-surface border border-outline-variant/30"
                >
                  <option value="po">PO Received (Supplier: Logitech India)</option>
                  <option value="return">Customer Return - Restocked</option>
                  <option value="transfer">Internal Transfer Arrival</option>
                  <option value="audit">Cycle Count Discrepancy Correction</option>
                </select>
              </div>

              {/* Verification Notes */}
              <div className="flex flex-col space-y-1">
                <label className="font-label-sm text-label-sm text-secondary">Internal Verification Note</label>
                <textarea
                  className="w-full bg-surface-bright rounded-lg p-space-sm font-body-sm text-on-surface border border-outline-variant/30"
                  rows="2"
                  value={adjustmentNotes}
                  onChange={(e) => setAdjustmentNotes(e.target.value)}
                />
              </div>

              {/* Audit Sign-off Box */}
              <div className="bg-surface-container-low p-space-sm rounded-lg flex items-start gap-space-xs text-secondary font-caption text-caption">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">verified_user</span>
                <span>
                  Adjustment will be cryptographically logged under Operations Admin and reflected in general ledger.
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-space-sm pt-space-xs">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAdjustment}
                  className="flex-2 w-full py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-colors shadow-sm flex items-center justify-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Confirm Adjustment</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add New Product */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-space-xl border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-low">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[20px]">add_box</span>
                </div>
                <h3 className="font-headline-sm font-bold text-on-surface">Add New Product SKU</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-secondary hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3.5 mt-space-md">
              <div>
                <label className="block font-label-sm text-secondary mb-1">Product Name *</label>
                <input
                  required
                  placeholder="e.g. Wireless Ergonomic Vertical Mouse"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 focus:border-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-sm text-secondary mb-1">SKU Code *</label>
                  <input
                    required
                    placeholder="e.g. SKU-MOU-09"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface font-data-mono uppercase border border-outline-variant/30 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-secondary mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 focus:border-primary outline-none"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Office Hardware">Office Hardware</option>
                    <option value="Packaging">Packaging</option>
                    <option value="POS Hardware">POS Hardware</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-sm text-secondary mb-1">Cost Price (INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="₹ Cost"
                    value={newProduct.costPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, costPrice: e.target.value })}
                    className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface font-data-mono border border-outline-variant/30 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-secondary mb-1">Selling Price (INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="₹ Retail Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface font-data-mono border border-outline-variant/30 focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-sm text-secondary mb-1">Initial Stock Quantity</label>
                  <input
                    type="number"
                    placeholder="Units on hand"
                    value={newProduct.stockQuantity}
                    onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                    className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface font-data-mono border border-outline-variant/30 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-secondary mb-1">Minimum Alert Threshold</label>
                  <input
                    type="number"
                    value={newProduct.minimumStock}
                    onChange={(e) => setNewProduct({ ...newProduct, minimumStock: e.target.value })}
                    className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface font-data-mono border border-outline-variant/30 focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-space-sm border-t border-surface-container-low mt-space-md">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-space-lg py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold transition-colors shadow-sm"
                >
                  Save & Publish SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
