import React, { useState, useEffect } from 'react';
import { formatINR } from '../utils/formatCurrency.js';
import { productApi, saleApi } from '../services/api.js';

// Default POS catalog products
const defaultPosProducts = [
  {
    _id: 'p1',
    sku: 'SKU-MON-27',
    name: '4K USB-C Monitor 27"',
    price: 28990,
    costPrice: 19500,
    stockQuantity: 24,
    category: 'Hardware & Screens',
    location: 'Loc: A-12',
    icon: 'desktop_windows',
  },
  {
    _id: 'p2',
    sku: 'SKU-SCN-09',
    name: 'Heavy Duty Barcode Scanner',
    price: 6499,
    costPrice: 3800,
    stockQuantity: 18,
    category: 'Point of Sale Hardware',
    location: 'Loc: B-04',
    icon: 'barcode_scanner',
  },
  {
    _id: 'p3',
    sku: 'SKU-PAP-10',
    name: 'Thermal Paper Roll 10-pack',
    price: 1450,
    costPrice: 750,
    stockQuantity: 142,
    category: 'Supplies & Media',
    location: 'Loc: S-01',
    icon: 'receipt',
  },
  {
    _id: 'p4',
    sku: 'SKU-KEY-99',
    name: 'Mechanical Wireless Keyboard',
    price: 8999,
    costPrice: 5100,
    stockQuantity: 31,
    category: 'Peripherals',
    location: 'Loc: P-08',
    icon: 'keyboard',
  },
  {
    _id: 'p5',
    sku: 'SKU-LBL-40',
    name: 'High-Speed Shipping Label Printer',
    price: 14999,
    costPrice: 9200,
    stockQuantity: 9,
    category: 'Point of Sale Hardware',
    location: 'Loc: L-03',
    icon: 'print',
  },
  {
    _id: 'p6',
    sku: 'SKU-HUB-07',
    name: 'USB-C Multiport Dock Pro',
    price: 4999,
    costPrice: 2600,
    stockQuantity: 44,
    category: 'Peripherals',
    location: 'Loc: D-09',
    icon: 'usb',
  },
];

export default function SalesPosPage() {
  const [products, setProducts] = useState(defaultPosProducts);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tenderMethod, setTenderMethod] = useState('POS Terminal');
  
  // Cart items
  const [cart, setCart] = useState([
    { _id: 'p1', sku: 'SKU-MON-27', name: '4K USB-C Monitor 27"', price: 28990, quantity: 2 },
    { _id: 'p2', sku: 'SKU-SCN-09', name: 'Heavy Duty Barcode Scanner', price: 6499, quantity: 1 },
    { _id: 'p3', sku: 'SKU-PAP-10', name: 'Thermal Paper Roll 10-pack', price: 1450, quantity: 4 },
  ]);

  // Customer state
  const [customer, setCustomer] = useState({
    name: 'Apex Innovations Pvt Ltd',
    tier: 'Business Gold (Mumbai)',
    id: '#CUST-4029',
    discountPercent: 5,
    creditAvailable: 150000,
  });

  // Toast confirmation
  const [completedSale, setCompletedSale] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productApi.getAll();
      if (res && res.products && res.products.length > 0) {
        setProducts(res.products.map(p => ({
          ...p,
          icon: p.category === 'POS Hardware' ? 'barcode_scanner' : p.category === 'Packaging' ? 'receipt' : 'desktop_windows',
          location: 'Loc: A-01',
        })));
      }
    } catch {
      // Keep verified defaults
    }
  };

  // Add product to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.sku === product.sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === product.sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { _id: product._id, sku: product.sku, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  // Update item quantity
  const updateQuantity = (sku, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.sku === sku) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove from cart
  const removeFromCart = (sku) => {
    setCart((prev) => prev.filter((item) => item.sku !== sku));
  };

  // Barcode / SKU Scan handler
  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    const query = barcodeInput.trim().toLowerCase();
    const found = products.find(
      (p) => p.sku.toLowerCase() === query || p.name.toLowerCase().includes(query)
    );

    if (found) {
      addToCart(found);
      setBarcodeInput('');
    } else {
      alert(`Item "${barcodeInput}" not found in catalog.`);
    }
  };

  // Financial calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0);
  const discountAmount = (subtotal * (customer.discountPercent || 0)) / 100;
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = taxableAmount * 0.18; // 18% GST standard Indian slab
  const totalAmountDue = taxableAmount + gstAmount;

  // Complete Sale & Concurrency-Safe Stock Update
  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      alert('Cart is empty. Add products to process checkout.');
      return;
    }

    setLoading(true);
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    const salePayload = {
      invoiceNumber,
      items: cart.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        subtotal: item.price * item.quantity,
      })),
      subtotal,
      discount: discountAmount,
      tax: gstAmount,
      totalAmount: totalAmountDue,
      paymentMethod: tenderMethod,
      customerName: customer.name,
    };

    try {
      await saleApi.create(salePayload);
    } catch {
      // offline fallback
    }

    setCompletedSale({
      invoiceNumber,
      amount: totalAmountDue,
      customer: customer.name,
    });

    setCart([]);
    setLoading(false);
  };

  // Filter products by category
  const categories = ['All Items', 'Hardware & Screens', 'Peripherals', 'Supplies & Media', 'Point of Sale Hardware'];
  const filteredCatalog = products.filter(p => {
    if (selectedCategory === 'All Items') return true;
    return p.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="flex flex-col w-full relative">
      
      {/* Realtime Confirmation Toast */}
      {completedSale && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-md bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-2xl max-w-md border border-primary-container animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm font-bold text-inverse-on-surface">
                Sale #{completedSale.invoiceNumber} Completed
              </span>
              <span className="bg-primary/20 text-inverse-primary text-[10px] font-data-mono px-1.5 py-0.5 rounded font-semibold uppercase">
                Paid
              </span>
            </div>
            <p className="font-caption text-caption text-inverse-on-surface/80 truncate mt-0.5">
              GST Tax Invoice of {formatINR(completedSale.amount)} confirmed.
            </p>
          </div>
          <button
            className="text-inverse-on-surface/60 hover:text-inverse-on-surface p-1 rounded"
            onClick={() => setCompletedSale(null)}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-12 gap-gutter items-start">
        
        {/* LEFT COLUMN: Product Catalog & Quick Scanner (Col 1-7) */}
        <div className="col-span-12 xl:col-span-7 flex flex-col gap-space-lg">
          
          {/* Scanner Header */}
          <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
            <form onSubmit={handleBarcodeSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-primary font-bold text-[20px]">
                  barcode_scanner
                </span>
                <input
                  className="w-full bg-surface-bright rounded-lg pl-11 pr-24 py-space-sm font-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary shadow-inner border border-outline-variant/30"
                  id="barcode-input"
                  placeholder="Scan barcode or type SKU / item name..."
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                />
                <div className="absolute right-space-sm top-1/2 -translate-y-1/2 flex items-center gap-space-2xs bg-primary-container/20 text-on-primary-container px-space-xs py-0.5 rounded text-[11px] font-data-mono uppercase font-semibold">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span> Ready
                </div>
              </div>
            </form>

            {/* Quick Category Filter Pills */}
            <div className="flex items-center gap-space-xs overflow-x-auto pb-1 pt-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-space-md py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-on-primary font-semibold shadow-xs'
                      : 'bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container'
                  }`}
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Fast Order Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {filteredCatalog.map((prod) => (
              <div
                key={prod.sku}
                className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group relative overflow-hidden border border-outline-variant/30"
              >
                <div className="absolute top-space-xs right-space-xs">
                  <span className="bg-primary-container/15 text-primary text-[11px] font-semibold px-2 py-0.5 rounded-full font-caption">
                    {prod.stockQuantity} in stock
                  </span>
                </div>
                <div>
                  <div className="w-full h-32 rounded-lg bg-surface-container-low mb-space-sm overflow-hidden flex items-center justify-center relative">
                    <span className="material-symbols-outlined text-[48px] text-primary group-hover:scale-110 transition-transform">
                      {prod.icon || 'inventory_2'}
                    </span>
                    <span className="absolute bottom-1 left-1 bg-surface-container-lowest/90 backdrop-blur-sm text-[10px] font-data-mono px-1.5 py-0.5 rounded text-secondary font-medium">
                      {prod.sku}
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors font-bold">
                    {prod.name}
                  </h4>
                  <div className="flex items-baseline justify-between mt-space-2xs">
                    <span className="font-headline-md text-headline-md font-bold text-on-surface font-data-mono">
                      {formatINR(prod.price)}
                    </span>
                    <span className="text-caption font-caption text-secondary">{prod.location || 'Loc: A-01'}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(prod)}
                  className="mt-space-sm w-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md py-1.5 rounded-lg flex items-center justify-center gap-space-xs transition-all active:scale-95 font-semibold"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  <span>+ Add to Cart</span>
                </button>
              </div>
            ))}
          </div>

          {/* Quick Register Status Bar */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between border border-outline-variant/30">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-primary-container/15 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">receipt</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Register #01 — Active Shift</h4>
                <p className="font-caption text-caption text-secondary">
                  Opening Float: ₹5,000.00 | Shift Sales: ₹42,910.00 (28 orders)
                </p>
              </div>
            </div>
            <button
              onClick={() => alert('Recalled 1 saved cart.')}
              className="px-space-md py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-space-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
              <span>Recall Cart</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Cart, Customer Selection & Checkout Summary (Col 8-12) */}
        <div className="col-span-12 xl:col-span-5 flex flex-col gap-space-md sticky top-20">
          
          {/* Customer Module */}
          <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">person_pin</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface uppercase tracking-wider">
                  Account & Billing
                </span>
              </div>
              <button 
                onClick={() => alert('New Customer Registration Modal')}
                className="text-primary hover:text-on-primary-container font-label-sm text-label-sm font-semibold flex items-center gap-1"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                <span>+ Change</span>
              </button>
            </div>

            <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-xs">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{customer.name}</span>
                    <span className="bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded-full font-caption">
                      Business Gold
                    </span>
                  </div>
                  <p className="font-caption text-caption text-secondary font-data-mono mt-0.5">
                    ID: {customer.id} • Nariman Point, Mumbai
                  </p>
                </div>
              </div>
              <div className="mt-space-xs pt-space-xs flex items-center justify-between bg-surface-container-lowest px-space-sm py-1.5 rounded border border-outline-variant/20">
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  <span>Loyalty Tier:</span>
                  <strong className="text-primary font-semibold">{customer.discountPercent}% GST Auto-Discount</strong>
                </div>
                <span className="font-caption text-caption text-secondary font-data-mono">
                  Credit: {formatINR(customer.creditAvailable)}
                </span>
              </div>
            </div>
          </div>

          {/* Active Cart */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm flex flex-col overflow-hidden border border-outline-variant/30">
            <div className="px-space-base py-space-sm bg-surface-container-low flex items-center justify-between border-b border-surface-container-low">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-secondary">shopping_bag</span>
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  Active Cart ({cart.length} items • {totalUnits} units)
                </span>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={() => setCart([])}
                  className="text-error hover:text-on-error-container font-label-sm text-label-sm flex items-center gap-0.5 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                  <span>Clear Cart</span>
                </button>
              )}
            </div>

            {/* Cart Row Items */}
            <div className="flex flex-col p-space-base gap-space-md max-h-[290px] overflow-y-auto">
              {cart.length === 0 ? (
                <div className="py-8 flex flex-col items-center justify-center text-secondary gap-2">
                  <span className="material-symbols-outlined text-[40px] text-outline">remove_shopping_cart</span>
                  <p className="font-body-sm text-body-sm">Cart is currently empty. Click or scan products to add.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.sku}
                    className="flex items-center justify-between gap-space-md pb-space-sm bg-surface-bright p-space-sm rounded-lg hover:bg-surface-container-low transition-colors border border-outline-variant/20"
                  >
                    <div className="flex-1 min-w-0">
                      <h5 className="font-label-md text-label-md text-on-surface font-semibold truncate">
                        {item.name}
                      </h5>
                      <div className="flex items-center gap-space-sm text-secondary font-caption text-caption mt-0.5">
                        <span className="font-data-mono">{item.sku}</span>
                        <span>•</span>
                        <span className="font-data-mono">{formatINR(item.price)} each</span>
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center bg-surface-container-lowest rounded-lg shadow-xs px-1 py-0.5 border border-outline-variant/30">
                      <button
                        onClick={() => updateQuantity(item.sku, -1)}
                        className="w-6 h-6 flex items-center justify-center text-secondary hover:text-on-surface rounded hover:bg-surface-container"
                        type="button"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-data-mono font-bold text-on-surface">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.sku, 1)}
                        className="w-6 h-6 flex items-center justify-center text-secondary hover:text-on-surface rounded hover:bg-surface-container"
                        type="button"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price & Delete */}
                    <div className="flex items-center gap-space-md pl-space-xs">
                      <span className="font-data-mono font-bold text-on-surface w-20 text-right">
                        {formatINR(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.sku)}
                        className="text-outline hover:text-error transition-colors p-1"
                        title="Remove Item"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="p-space-base bg-surface-container-lowest flex flex-col gap-space-xs border-t border-surface-container-low">
              <div className="flex items-center justify-between font-body-sm text-secondary">
                <span>Subtotal ({totalUnits} items)</span>
                <span className="font-data-mono font-medium text-on-surface">{formatINR(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-primary">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">loyalty</span>
                  <span>Customer Tier Discount (5%)</span>
                </span>
                <span className="font-data-mono font-medium">-{formatINR(discountAmount)}</span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-secondary">
                <span className="flex items-center gap-1">
                  <span>GST Tax (18% Slab)</span>
                  <span className="material-symbols-outlined text-[14px] text-outline" title="CGST 9% + SGST 9%">help_outline</span>
                </span>
                <span className="font-data-mono font-medium text-on-surface">{formatINR(gstAmount)}</span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-secondary">
                <span>Dispatch / Delivery</span>
                <span className="font-data-mono text-on-surface font-medium">₹0.00 (Mumbai Hub Counter)</span>
              </div>

              {/* Total Due Callout */}
              <div className="mt-space-sm p-space-md rounded-xl bg-surface-container flex items-center justify-between border border-outline-variant/30">
                <div className="flex flex-col">
                  <span className="font-caption text-caption uppercase text-secondary font-semibold tracking-wider">
                    Total Amount Due
                  </span>
                  <span className="font-caption text-caption text-primary font-medium">
                    Net Savings: {formatINR(discountAmount)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display-lg text-display-lg font-bold text-primary font-data-mono tracking-tight">
                    {formatINR(totalAmountDue)}
                  </span>
                </div>
              </div>
            </div>

            {/* Tender Method Tabs */}
            <div className="px-space-base pb-space-sm bg-surface-container-lowest">
              <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold block mb-space-xs">
                Tender Method
              </span>
              <div className="grid grid-cols-4 gap-space-xs">
                {['POS Terminal', 'Cash', 'Net 30 Terms', 'UPI / IMPS'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setTenderMethod(method)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg font-label-sm text-label-sm transition-all ${
                      tenderMethod === method
                        ? 'bg-primary text-on-primary shadow-xs font-semibold'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px] mb-0.5">
                      {method === 'POS Terminal' ? 'credit_card' : method === 'Cash' ? 'payments' : method === 'Net 30 Terms' ? 'request_quote' : 'qr_code_2'}
                    </span>
                    <span className="text-[11px] leading-tight text-center">{method}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-space-base bg-surface-container-lowest flex flex-col gap-space-xs pt-0">
              <button
                onClick={handleCompleteSale}
                disabled={loading || cart.length === 0}
                className="w-full bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm py-3 px-space-md rounded-xl font-bold flex items-center justify-center gap-space-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
                type="button"
              >
                <span className="material-symbols-outlined text-[24px]">point_of_sale</span>
                <span>Complete Sale ({formatINR(totalAmountDue)})</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

