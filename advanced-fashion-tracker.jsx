import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, BarChart3, AlertCircle, Package, DollarSign, TrendingUp, Download, Eye, EyeOff, Home, Settings, LogOut, Filter, Search, Clock, MapPin, Users, ShoppingBag, Zap } from 'lucide-react';

export default function FashionInventoryTracker() {
  const [view, setView] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [filterLocation, setFilterLocation] = useState('all');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [expandedProduct, setExpandedProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Tops',
    size: 'M',
    color: '',
    quantity: 0,
    price: 0,
    cost: 0,
    minStock: 5,
    location: 'Main Store',
    supplier: '',
    dateAdded: new Date().toISOString().split('T')[0],
    lastRestocked: new Date().toISOString().split('T')[0],
    description: '',
  });

  const locations = ['Main Store', 'Warehouse', 'Branch A', 'Branch B', 'Online'];
  const categories = ['all', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Footwear', 'Intimates'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const suppliers = ['Fashion Wholesale Co', 'Global Textiles Ltd', 'Premium Brands Inc', 'Eco Fashion Group', 'Direct Import Co'];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await window.storage.get('fashion-products-advanced');
        if (result && result.value) {
          setProducts(JSON.parse(result.value));
        } else {
          setProducts(getDemoData());
        }
      } catch (e) {
        setProducts(getDemoData());
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      window.storage.set('fashion-products-advanced', JSON.stringify(products));
    }
  }, [products]);

  const getDemoData = () => [
    { id: 1, name: 'Premium Cotton T-Shirt', sku: 'TSH001', category: 'Tops', size: 'M', color: 'Black', quantity: 145, price: 24.99, cost: 8.50, minStock: 20, location: 'Main Store', supplier: 'Fashion Wholesale Co', dateAdded: '2024-01-15', lastRestocked: '2024-04-10', description: '100% organic cotton' },
    { id: 2, name: 'Classic Denim Jeans', sku: 'JNS001', category: 'Bottoms', size: 'L', color: 'Dark Blue', quantity: 78, price: 59.99, cost: 20.00, minStock: 15, location: 'Main Store', supplier: 'Global Textiles Ltd', dateAdded: '2024-01-20', lastRestocked: '2024-04-08', description: 'Skinny fit, stretch denim' },
    { id: 3, name: 'Leather Jacket', sku: 'JCK001', category: 'Outerwear', size: 'M', color: 'Brown', quantity: 12, price: 149.99, cost: 60.00, minStock: 5, location: 'Warehouse', supplier: 'Premium Brands Inc', dateAdded: '2024-02-01', lastRestocked: '2024-03-20', description: 'Genuine leather, Italian made' },
    { id: 4, name: 'Summer Floral Dress', sku: 'DRS001', category: 'Dresses', size: 'S', color: 'Red', quantity: 23, price: 45.99, cost: 15.00, minStock: 10, location: 'Main Store', supplier: 'Eco Fashion Group', dateAdded: '2024-02-10', lastRestocked: '2024-04-05', description: 'Lightweight, perfect for summer' },
    { id: 5, name: 'Merino Wool Sweater', sku: 'SWE001', category: 'Tops', size: 'L', color: 'Gray', quantity: 8, price: 65.99, cost: 25.00, minStock: 10, location: 'Main Store', supplier: 'Premium Brands Inc', dateAdded: '2024-02-15', lastRestocked: '2024-03-15', description: 'Fine merino wool, warm & breathable' },
    { id: 6, name: 'Athletic Sports Bra', sku: 'BRA001', category: 'Intimates', size: 'M', color: 'Black', quantity: 92, price: 34.99, cost: 12.00, minStock: 15, location: 'Main Store', supplier: 'Fashion Wholesale Co', dateAdded: '2024-03-01', lastRestocked: '2024-04-12', description: 'High support, moisture-wicking' },
    { id: 7, name: 'Designer Sneakers', sku: 'SNK001', category: 'Footwear', size: 'M', color: 'White', quantity: 34, price: 89.99, cost: 35.00, minStock: 8, location: 'Main Store', supplier: 'Direct Import Co', dateAdded: '2024-03-10', lastRestocked: '2024-04-06', description: 'Lightweight, comfortable, trendy' },
    { id: 8, name: 'Silk Scarf', sku: 'ACC001', category: 'Accessories', size: 'One Size', color: 'Multicolor', quantity: 156, price: 18.99, cost: 6.00, minStock: 20, location: 'Branch A', supplier: 'Global Textiles Ltd', dateAdded: '2024-03-15', lastRestocked: '2024-04-09', description: '100% pure silk, Italian printed' },
    { id: 9, name: 'Winter Wool Coat', sku: 'COT001', category: 'Outerwear', size: 'XL', color: 'Navy', quantity: 5, price: 189.99, cost: 75.00, minStock: 3, location: 'Warehouse', supplier: 'Premium Brands Inc', dateAdded: '2024-01-05', lastRestocked: '2024-02-01', description: 'Double-breasted, wool blend' },
    { id: 10, name: 'Linen Cargo Pants', sku: 'PNT001', category: 'Bottoms', size: 'M', color: 'Khaki', quantity: 42, price: 54.99, cost: 18.00, minStock: 12, location: 'Branch B', supplier: 'Eco Fashion Group', dateAdded: '2024-02-20', lastRestocked: '2024-04-03', description: 'Eco-friendly, breathable' },
  ];

  const handleAddProduct = () => {
    if (!formData.name || !formData.category || !formData.sku) {
      alert('Please fill in: Name, SKU, and Category');
      return;
    }

    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
      setEditingId(null);
    } else {
      const newProduct = { ...formData, id: Date.now() };
      setProducts([...products, newProduct]);
    }

    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setFormData({
      name: '', sku: '', category: 'Tops', size: 'M', color: '', quantity: 0, price: 0, cost: 0,
      minStock: 5, location: 'Main Store', supplier: '', dateAdded: new Date().toISOString().split('T')[0],
      lastRestocked: new Date().toISOString().split('T')[0], description: '',
    });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product? This action cannot be undone.')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setProducts(products.map(p => p.id === id ? { ...p, quantity: Math.max(0, newQuantity), lastRestocked: new Date().toISOString().split('T')[0] } : p));
  };

  // Advanced filtering
  let filtered = products;
  if (filterCategory !== 'all') filtered = filtered.filter(p => p.category === filterCategory);
  if (filterLocation !== 'all') filtered = filtered.filter(p => p.location === filterLocation);
  if (searchTerm) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()) || p.color.toLowerCase().includes(searchTerm.toLowerCase()));
  if (priceRange.min || priceRange.max) filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
  if (dateRange.start) filtered = filtered.filter(p => p.dateAdded >= dateRange.start);
  if (dateRange.end) filtered = filtered.filter(p => p.dateAdded <= dateRange.end);

  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'quantity': return b.quantity - a.quantity;
      case 'price': return b.price - a.price;
      case 'profit': return (b.quantity * (b.price - b.cost)) - (a.quantity * (a.price - a.cost));
      case 'lowStock': return a.quantity - b.quantity;
      default: return 0;
    }
  });

  // Analytics calculations
  const stats = {
    totalProducts: products.length,
    totalItems: products.reduce((sum, p) => sum + p.quantity, 0),
    totalValue: products.reduce((sum, p) => sum + p.quantity * p.price, 0),
    totalCost: products.reduce((sum, p) => sum + p.quantity * p.cost, 0),
    totalProfit: products.reduce((sum, p) => sum + p.quantity * (p.price - p.cost), 0),
    profitMargin: 0,
    lowStockCount: products.filter(p => p.quantity <= p.minStock).length,
    outOfStock: products.filter(p => p.quantity === 0).length,
    avgPrice: products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0,
    categoryCount: [...new Set(products.map(p => p.category))].length,
  };
  stats.profitMargin = stats.totalValue > 0 ? ((stats.totalProfit / stats.totalValue) * 100).toFixed(1) : 0;

  const categoryBreakdown = categories.filter(c => c !== 'all').map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length,
    value: products.filter(p => p.category === cat).reduce((sum, p) => sum + p.quantity * p.price, 0),
  }));

  const locationBreakdown = locations.map(loc => ({
    name: loc,
    count: products.filter(p => p.location === loc).length,
    value: products.filter(p => p.location === loc).reduce((sum, p) => sum + p.quantity, 0),
  }));

  const exportData = () => {
    const csvContent = [
      ['SKU', 'Name', 'Category', 'Size', 'Color', 'Quantity', 'Price', 'Cost', 'Profit Per Unit', 'Total Profit', 'Location', 'Min Stock', 'Last Restocked'],
      ...filtered.map(p => [
        p.sku, p.name, p.category, p.size, p.color, p.quantity, p.price.toFixed(2), p.cost.toFixed(2),
        (p.price - p.cost).toFixed(2), (p.quantity * (p.price - p.cost)).toFixed(2), p.location, p.minStock, p.lastRestocked
      ])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div style={{ background: 'var(--color-background-tertiary)', minHeight: '100vh', display: 'flex', fontFamily: 'var(--font-sans)' }}>
      {/* Sidebar Navigation */}
      <div style={{ width: '220px', background: 'var(--color-background-primary)', borderRight: '0.5px solid var(--color-border-tertiary)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0, color: 'var(--color-text-primary)' }}>📦 Fashion Store</h2>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>Inventory Manager</p>
        </div>

        {[
          { id: 'dashboard', label: 'Dashboard', icon: '📊' },
          { id: 'inventory', label: 'Inventory', icon: '📦' },
          { id: 'analytics', label: 'Analytics', icon: '📈' },
          { id: 'settings', label: 'Settings', icon: '⚙️' },
        ].map(item => (
          <button key={item.id} onClick={() => { setView(item.id); setShowForm(false); }} style={{ padding: '10px 12px', background: view === item.id ? 'var(--color-background-secondary)' : 'transparent', border: 'none', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', textAlign: 'left', fontSize: '14px', color: view === item.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: view === item.id ? '500' : '400', transition: 'all 0.2s' }}>
            {item.icon} {item.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '0.5px solid var(--color-border-tertiary)' }}>
          <button onClick={() => { resetForm(); setShowForm(false); setEditingId(null); setProducts(getDemoData()); }} style={{ width: '100%', padding: '8px 12px', background: 'transparent', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            ↻ Reset Data
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        {view === 'dashboard' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 8px', color: 'var(--color-text-primary)' }}>Dashboard</h1>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>Real-time inventory overview and key metrics</p>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {[
                { label: 'Total Products', value: stats.totalProducts, icon: '📦', color: 'info' },
                { label: 'Total Items', value: stats.totalItems, icon: '📊', color: 'success' },
                { label: 'Inventory Value', value: `$${stats.totalValue.toFixed(0)}`, icon: '💰', color: 'info' },
                { label: 'Total Profit', value: `$${stats.totalProfit.toFixed(0)}`, icon: '📈', color: 'success' },
                { label: 'Profit Margin', value: `${stats.profitMargin}%`, icon: '📊', color: 'info' },
                { label: 'Low Stock', value: stats.lowStockCount, icon: '⚠️', color: stats.lowStockCount > 0 ? 'danger' : 'success' },
              ].map((item, idx) => (
                <div key={idx} style={{ background: 'var(--color-background-primary)', border: `0.5px solid ${item.color === 'danger' ? 'var(--color-border-danger)' : 'var(--color-border-tertiary)'}`, borderRadius: 'var(--border-radius-lg)', padding: '16px', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', margin: '0 0 8px' }}>{item.icon}</p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 6px' }}>{item.label}</p>
                  <p style={{ fontSize: '22px', fontWeight: '500', margin: 0, color: item.color === 'danger' ? 'var(--color-text-danger)' : 'var(--color-text-primary)' }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Category & Location Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
              <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 16px', color: 'var(--color-text-primary)' }}>Category Breakdown</h3>
                {categoryBreakdown.map((cat, idx) => (
                  <div key={idx} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: idx < categoryBreakdown.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>{cat.name}</span>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>{cat.count} items</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--color-background-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'var(--color-background-info)', width: `${(cat.count / Math.max(...categoryBreakdown.map(c => c.count))) * 100}%` }} />
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>${cat.value.toFixed(0)}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 16px', color: 'var(--color-text-primary)' }}>Location Distribution</h3>
                {locationBreakdown.map((loc, idx) => (
                  <div key={idx} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: idx < locationBreakdown.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>{loc.name}</span>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>{loc.value} units</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--color-background-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'var(--color-background-success)', width: `${(loc.value / Math.max(...locationBreakdown.map(l => l.value))) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 16px', color: 'var(--color-text-primary)' }}>Recent Activity</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                <button onClick={() => setView('inventory')} style={{ padding: '12px', background: 'transparent', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                  📊 View Inventory
                </button>
                <button onClick={() => { setView('inventory'); setShowForm(true); resetForm(); }} style={{ padding: '12px', background: 'transparent', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                  ➕ Add Product
                </button>
                <button onClick={() => setView('analytics')} style={{ padding: '12px', background: 'transparent', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                  📈 Analytics
                </button>
                <button onClick={exportData} style={{ padding: '12px', background: 'transparent', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                  📥 Export Data
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'inventory' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 8px', color: 'var(--color-text-primary)' }}>Inventory Management</h1>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>Showing {filtered.length} of {products.length} products</p>
              </div>
              <button onClick={() => { setShowForm(!showForm); resetForm(); setEditingId(null); }} style={{ padding: '10px 16px', background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                ➕ Add Product
              </button>
            </div>

            {/* Filters */}
            <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                <input type="text" placeholder="Search by name/SKU/color..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '8px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px' }} />
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ padding: '8px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px' }}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
                </select>
                <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} style={{ padding: '8px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px' }}>
                  <option value="all">All Locations</option>
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px' }}>
                  <option value="name">Sort: Name</option>
                  <option value="quantity">Sort: Quantity</option>
                  <option value="price">Sort: Price</option>
                  <option value="profit">Sort: Profit</option>
                  <option value="lowStock">Sort: Low Stock</option>
                </select>
                <button onClick={() => setShowAdvanced(!showAdvanced)} style={{ padding: '8px 12px', background: showAdvanced ? 'var(--color-background-secondary)' : 'transparent', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                  🔍 Advanced
                </button>
                <button onClick={exportData} style={{ padding: '8px 12px', background: 'transparent', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                  📥 Export
                </button>
              </div>

              {showAdvanced && (
                <div style={{ paddingTop: '12px', borderTop: '0.5px solid var(--color-border-tertiary)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>Min Price: ${priceRange.min}</label>
                      <input type="range" min="0" max="500" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })} style={{ width: '100%' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>Max Price: ${priceRange.max}</label>
                      <input type="range" min="0" max="1000" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })} style={{ width: '100%' }} />
                    </div>
                    <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} style={{ padding: '8px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px' }} />
                    <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} style={{ padding: '8px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '20px', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 16px', color: 'var(--color-text-primary)' }}>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  {[
                    { label: 'Product Name *', key: 'name' },
                    { label: 'SKU *', key: 'sku' },
                    { label: 'Color', key: 'color' },
                    { label: 'Quantity', key: 'quantity', type: 'number' },
                    { label: 'Price $', key: 'price', type: 'number', step: '0.01' },
                    { label: 'Cost $', key: 'cost', type: 'number', step: '0.01' },
                    { label: 'Min Stock', key: 'minStock', type: 'number' },
                  ].map(field => (
                    <input key={field.key} type={field.type || 'text'} placeholder={field.label} step={field.step} value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: field.type === 'number' ? (isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)) : e.target.value })} style={{ padding: '8px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px' }} />
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  {[
                    { label: 'Category', key: 'category', options: categories.filter(c => c !== 'all') },
                    { label: 'Size', key: 'size', options: sizes },
                    { label: 'Location', key: 'location', options: locations },
                    { label: 'Supplier', key: 'supplier', options: suppliers },
                  ].map(field => (
                    <select key={field.key} value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} style={{ padding: '8px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px' }}>
                      {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ))}
                </div>
                <textarea placeholder="Description (optional)" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px', marginBottom: '12px', minHeight: '60px', fontFamily: 'var(--font-sans)' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={handleAddProduct} style={{ flex: 1, padding: '10px 16px', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                    {editingId ? '✓ Update' : '✓ Add Product'}
                  </button>
                  <button onClick={() => { setShowForm(false); setEditingId(null); resetForm(); }} style={{ flex: 1, padding: '10px 16px', background: 'transparent', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px' }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
              {filtered.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-background-secondary)', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
                      {['SKU', 'Product', 'Category', 'Color/Size', 'Location', 'Qty', 'Price', 'Cost', 'Profit/Unit', 'Total Value', 'Margin', 'Status', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '500', color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p, idx) => {
                      const profit = p.price - p.cost;
                      const margin = ((profit / p.price) * 100).toFixed(0);
                      const isLow = p.quantity <= p.minStock;
                      const isOut = p.quantity === 0;
                      return (
                        <tr key={p.id} style={{ background: isOut ? 'rgba(224, 75, 74, 0.05)' : isLow ? 'rgba(255, 193, 7, 0.05)' : idx % 2 === 0 ? 'transparent' : 'var(--color-background-secondary)', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
                          <td style={{ padding: '10px 12px', color: 'var(--color-text-secondary)', fontSize: '12px', fontWeight: '500' }}>{p.sku}</td>
                          <td style={{ padding: '10px 12px', color: 'var(--color-text-primary)', fontWeight: '500', cursor: 'pointer' }} onClick={() => setExpandedProduct(expandedProduct === p.id ? null : p.id)}>{p.name}</td>
                          <td style={{ padding: '10px 12px', color: 'var(--color-text-secondary)' }}>{p.category}</td>
                          <td style={{ padding: '10px 12px', color: 'var(--color-text-secondary)', fontSize: '12px' }}>{p.color}/{p.size}</td>
                          <td style={{ padding: '10px 12px', color: 'var(--color-text-secondary)', fontSize: '12px' }}>{p.location}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <input type="number" value={p.quantity} onChange={(e) => handleUpdateQuantity(p.id, parseInt(e.target.value) || 0)} style={{ width: '50px', padding: '4px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: '4px', textAlign: 'center', fontSize: '12px' }} />
                          </td>
                          <td style={{ padding: '10px 12px', color: 'var(--color-text-primary)', fontWeight: '500' }}>${p.price.toFixed(2)}</td>
                          <td style={{ padding: '10px 12px', color: 'var(--color-text-secondary)', fontSize: '12px' }}>${p.cost.toFixed(2)}</td>
                          <td style={{ padding: '10px 12px', color: profit > 0 ? 'var(--color-text-success)' : 'var(--color-text-danger)', fontWeight: '500' }}>${profit.toFixed(2)}</td>
                          <td style={{ padding: '10px 12px', color: 'var(--color-text-primary)', fontWeight: '500' }}>${(p.quantity * p.price).toFixed(0)}</td>
                          <td style={{ padding: '10px 12px', color: 'var(--color-text-success)', fontWeight: '500' }}>{margin}%</td>
                          <td style={{ padding: '10px 12px', fontSize: '12px', fontWeight: '500' }}>
                            <span style={{ background: isOut ? 'rgba(224, 75, 74, 0.2)' : isLow ? 'rgba(255, 193, 7, 0.2)' : 'rgba(76, 175, 80, 0.2)', color: isOut ? 'var(--color-text-danger)' : isLow ? '#f57c00' : 'var(--color-text-success)', padding: '2px 8px', borderRadius: '4px' }}>
                              {isOut ? 'Out' : isLow ? 'Low' : 'OK'}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', display: 'flex', gap: '8px' }}>
                            <button onClick={() => handleEdit(p)} title="Edit" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--color-text-secondary)', fontSize: '16px' }}>
                              ✏️
                            </button>
                            <button onClick={() => handleDelete(p.id)} title="Delete" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--color-text-secondary)', fontSize: '16px' }}>
                              🗑️
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                  <p style={{ fontSize: '16px', margin: 0 }}>📭 No products found</p>
                  <p style={{ fontSize: '14px', margin: '8px 0 0' }}>Try adjusting your filters or add a new product</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'analytics' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 24px', color: 'var(--color-text-primary)' }}>📊 Analytics & Reports</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '20px' }}>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 12px', textTransform: 'uppercase', fontWeight: '500', letterSpacing: '0.5px' }}>Total Inventory Value</p>
                <p style={{ fontSize: '32px', fontWeight: '500', margin: '0 0 8px', color: 'var(--color-text-primary)' }}>${stats.totalValue.toFixed(0)}</p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Based on {stats.totalItems} units</p>
              </div>

              <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '20px' }}>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 12px', textTransform: 'uppercase', fontWeight: '500', letterSpacing: '0.5px' }}>Total Profit Potential</p>
                <p style={{ fontSize: '32px', fontWeight: '500', margin: '0 0 8px', color: 'var(--color-text-success)' }}>${stats.totalProfit.toFixed(0)}</p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Avg margin: {stats.profitMargin}%</p>
              </div>

              <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '20px' }}>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 12px', textTransform: 'uppercase', fontWeight: '500', letterSpacing: '0.5px' }}>Stock Health</p>
                <p style={{ fontSize: '32px', fontWeight: '500', margin: '0 0 8px', color: 'var(--color-text-primary)' }}>{Math.round(((stats.totalProducts - stats.lowStockCount) / stats.totalProducts) * 100)}%</p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>{stats.lowStockCount} items low, {stats.outOfStock} out</p>
              </div>

              <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '20px' }}>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 12px', textTransform: 'uppercase', fontWeight: '500', letterSpacing: '0.5px' }}>Avg Product Price</p>
                <p style={{ fontSize: '32px', fontWeight: '500', margin: '0 0 8px', color: 'var(--color-text-primary)' }}>${stats.avgPrice.toFixed(2)}</p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Across {stats.totalProducts} products</p>
              </div>
            </div>

            <div style={{ marginTop: '24px', background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 16px', color: 'var(--color-text-primary)' }}>Top 5 Products by Revenue</h3>
              {products.sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price)).slice(0, 5).map((p, idx) => (
                <div key={idx} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: idx < 4 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>{idx + 1}. {p.name}</span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>${(p.quantity * p.price).toFixed(0)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    <span>{p.quantity} units @ ${p.price}/each</span>
                    <span>{((p.quantity * (p.price - p.cost)) / (p.quantity * p.price) * 100).toFixed(0)}% margin</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'settings' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 24px', color: 'var(--color-text-primary)' }}>⚙️ Settings</h1>
            
            <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '20px', maxWidth: '500px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 16px', color: 'var(--color-text-primary)' }}>Store Information</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Store Name</label>
                <input type="text" placeholder="My Fashion Store" defaultValue="My Fashion Store" style={{ width: '100%', padding: '10px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Currency</label>
                <select style={{ width: '100%', padding: '10px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px' }}>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>INR (₹)</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Low Stock Threshold</label>
                <input type="number" placeholder="5" defaultValue="5" style={{ width: '100%', padding: '10px 12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ borderTop: '0.5px solid var(--color-border-tertiary)', paddingTop: '20px', marginTop: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 16px', color: 'var(--color-text-primary)' }}>Data Management</h3>
                <button onClick={exportData} style={{ width: '100%', padding: '10px 16px', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>
                  📥 Export All Data (CSV)
                </button>
                <button onClick={() => { if (window.confirm('This will clear all data and restore demo. Continue?')) { setProducts(getDemoData()); } }} style={{ width: '100%', padding: '10px 16px', background: 'transparent', border: '0.5px solid var(--color-border-danger)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-danger)' }}>
                  ⚠️ Reset to Demo Data
                </button>
              </div>

              <div style={{ borderTop: '0.5px solid var(--color-border-tertiary)', paddingTop: '20px', marginTop: '20px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                <p style={{ margin: 0, marginBottom: '8px' }}>✓ All data is stored locally in your browser</p>
                <p style={{ margin: 0, marginBottom: '8px' }}>✓ No data is sent to external servers</p>
                <p style={{ margin: 0 }}>Version 1.0 • Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}