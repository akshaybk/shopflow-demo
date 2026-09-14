import { useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { formatINR } from './data/demoData'
import type { AppState } from './data/demoData'

type CloseProps = { onClose: () => void }

export function ExpenseModal({ onClose, onSave }: CloseProps & { onSave: (amount: number, category: string) => void }) {
  const [category, setCategory] = useState('Electricity')
  const [amount, setAmount] = useState('')
  return <ModalFrame eyebrow="New transaction" title="Record an expense" onClose={onClose}><label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}>{['Electricity', 'Transport', 'Salary', 'Maintenance', 'Miscellaneous'].map((item) => <option key={item}>{item}</option>)}</select></label><label>Amount<input inputMode="numeric" value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9]/g, ''))} placeholder="₹ 0" /></label><label>Description<input placeholder="What was this expense for?" /></label><button className="primary-button" disabled={!amount || Number(amount) <= 0} onClick={() => onSave(Number(amount), category)}>Save expense <ArrowUpRight size={16} /></button></ModalFrame>
}

export function PurchaseModal({ products, onClose, onSave }: CloseProps & { products: AppState['products']; onSave: (amount: number, productId: string, quantity: number, supplier: string) => void }) {
  const [productId, setProductId] = useState(products[0].id)
  const [quantity, setQuantity] = useState(1)
  const [supplier, setSupplier] = useState('Shree Distributors')
  const product = products.find((item) => item.id === productId) ?? products[0]
  const total = product.purchasePrice * quantity
  return <ModalFrame eyebrow="New transaction" title="Record a purchase" onClose={onClose}><label>Supplier<input value={supplier} onChange={(event) => setSupplier(event.target.value)} /></label><label>Product<select value={productId} onChange={(event) => setProductId(event.target.value)}>{products.map((item) => <option key={item.id} value={item.id}>{item.name} · {formatINR(item.purchasePrice)}</option>)}</select></label><label>Quantity<div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button><strong>{quantity}</strong><button onClick={() => setQuantity(quantity + 1)}>+</button></div></label><div className="sale-total"><span>Total purchase</span><strong>{formatINR(total)}</strong></div><button className="primary-button" onClick={() => onSave(total, product.id, quantity, supplier)}>Save purchase <ArrowUpRight size={16} /></button></ModalFrame>
}

export function CorrectionModal({ product, onClose, onSave }: CloseProps & { product: AppState['products'][number]; onSave: (newStock: number, reason: string) => void }) {
  const [newStock, setNewStock] = useState(String(product.stock))
  const [reason, setReason] = useState('Counting correction')
  const difference = Number(newStock || 0) - product.stock
  return <ModalFrame eyebrow="Inventory control" title={`Correct ${product.name}`} onClose={onClose}><div className="correction-current"><span>Current stock</span><strong>{product.stock} units</strong></div><label>New stock<input inputMode="numeric" value={newStock} onChange={(event) => setNewStock(event.target.value.replace(/[^0-9]/g, ''))} /></label><div className="correction-difference"><span>Difference</span><strong className={difference >= 0 ? 'income' : 'negative'}>{difference >= 0 ? '+' : ''}{difference} units</strong></div><label>Reason<select value={reason} onChange={(event) => setReason(event.target.value)}>{['Damaged', 'Missing', 'Counting correction', 'Expired', 'Other'].map((item) => <option key={item}>{item}</option>)}</select></label><button className="primary-button" disabled={newStock === '' || !reason} onClick={() => onSave(Number(newStock), reason)}>Confirm correction <ArrowUpRight size={16} /></button></ModalFrame>
}

export function ProductDetailModal({ product, onClose, onCorrect }: CloseProps & { product: AppState['products'][number]; onCorrect: () => void }) {
  const movements = [{ label: 'Purchased', value: '+20', tone: 'income' }, { label: 'Sold', value: '-3', tone: 'negative' }, { label: 'Correction', value: '+5', tone: 'income' }, { label: 'Sold', value: '-2', tone: 'negative' }]
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal product-detail-modal" onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><span className="eyebrow">Product details</span><h2>{product.name}</h2><p className="modal-subtitle">{product.sku} · {product.category}</p></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></div><div className="product-detail-stats"><div><span>Current stock</span><strong>{product.stock} units</strong></div><div><span>Inventory value</span><strong>{formatINR(product.stock * product.purchasePrice)}</strong></div><div><span>Status</span><strong className={product.stock <= product.minimumStock ? 'negative' : 'income'}>{product.stock === 0 ? 'Out of stock' : product.stock <= product.minimumStock ? 'Low stock' : 'Healthy'}</strong></div></div><div className="detail-prices"><span>Purchase price <strong>{formatINR(product.purchasePrice)}</strong></span><span>Selling price <strong>{formatINR(product.sellingPrice)}</strong></span><span>Minimum stock <strong>{product.minimumStock} units</strong></span></div><div className="movement-heading"><strong>Stock movement</strong><small>Recent product activity</small></div><div className="movement-list">{movements.map((movement, index) => <div className="movement-row" key={`${movement.label}-${index}`}><span className="movement-mark" /><span>{movement.value} {movement.label}</span><time>{index + 1}d ago</time></div>)}</div><button className="primary-button" onClick={onCorrect}>Correct stock <ArrowUpRight size={16} /></button></div></div>
}

function ModalFrame({ eyebrow, title, onClose, children }: CloseProps & { eyebrow: string; title: string; children: React.ReactNode }) { return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></div>{children}</div></div> }
