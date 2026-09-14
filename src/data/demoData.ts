export type Role = 'manager' | 'super-manager' | 'shareholder'

export type Product = {
  id: string
  name: string
  sku: string
  category: string
  stock: number
  minimumStock: number
  sellingPrice: number
  purchasePrice: number
}

export type Transaction = {
  id: string
  type: 'Sale' | 'Purchase' | 'Expense' | 'Stock Correction'
  title: string
  amount: number
  time: string
  detail: string
}

export type AppState = {
  balance: number
  sales: number
  expenses: number
  purchases: number
  products: Product[]
  transactions: Transaction[]
}

export const roleDetails: Record<Role, { name: string; email: string; label: string }> = {
  manager: { name: 'Arun Mehta', email: 'manager@demo.com', label: 'Manager' },
  'super-manager': { name: 'Priya Shah', email: 'admin@demo.com', label: 'Super Manager' },
  shareholder: { name: 'Rohan Kapoor', email: 'shareholder@demo.com', label: 'Shareholder' },
}

export const initialState: AppState = {
  balance: 48650,
  sales: 12840,
  expenses: 3420,
  purchases: 8200,
  products: [
    { id: 'rice', name: 'Rice 5kg', sku: 'RCE-005', category: 'Staples', stock: 28, minimumStock: 15, sellingPrice: 420, purchasePrice: 360 },
    { id: 'sugar', name: 'Sugar 1kg', sku: 'SGR-001', category: 'Staples', stock: 9, minimumStock: 12, sellingPrice: 58, purchasePrice: 48 },
    { id: 'oil', name: 'Sunflower Oil 1L', sku: 'OIL-001', category: 'Grocery', stock: 34, minimumStock: 10, sellingPrice: 148, purchasePrice: 126 },
    { id: 'flour', name: 'Wheat Flour 5kg', sku: 'WHT-005', category: 'Staples', stock: 6, minimumStock: 10, sellingPrice: 285, purchasePrice: 242 },
    { id: 'tea', name: 'Tea Powder 250g', sku: 'TEA-250', category: 'Beverages', stock: 22, minimumStock: 8, sellingPrice: 115, purchasePrice: 92 },
    { id: 'biscuits', name: 'Biscuits', sku: 'BSK-100', category: 'Snacks', stock: 0, minimumStock: 12, sellingPrice: 30, purchasePrice: 22 },
    { id: 'detergent', name: 'Detergent', sku: 'DTR-001', category: 'Home Care', stock: 18, minimumStock: 8, sellingPrice: 92, purchasePrice: 74 },
    { id: 'soap', name: 'Soap', sku: 'SOP-001', category: 'Personal Care', stock: 42, minimumStock: 15, sellingPrice: 38, purchasePrice: 29 },
  ],
  transactions: [
    { id: 't1', type: 'Sale', title: 'Counter sale', amount: 2450, time: '10:42 AM', detail: '12 items · UPI' },
    { id: 't2', type: 'Purchase', title: 'Shree Distributors', amount: 8200, time: '09:18 AM', detail: 'Grocery restock' },
    { id: 't3', type: 'Expense', title: 'Delivery fuel', amount: 780, time: '08:46 AM', detail: 'Transport' },
    { id: 't4', type: 'Sale', title: 'Counter sale', amount: 1380, time: 'Yesterday, 7:24 PM', detail: '7 items · Cash' },
  ],
}

export const formatINR = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

export const getProductStatus = (product: Product) => {
  if (product.stock === 0) return 'Out of stock'
  if (product.stock <= product.minimumStock) return 'Low stock'
  return 'Healthy'
}
