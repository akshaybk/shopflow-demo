import { Check, CircleAlert, FileText, ShoppingCart, X } from 'lucide-react'

export type NotificationItem = { id: string; category: string; title: string; copy: string; time: string; unread: boolean }

export const seedNotifications: NotificationItem[] = [
  { id: 'low-stock', category: 'Low Stock', title: 'Rice 5kg is below minimum stock.', copy: 'Only 9 units remaining at Main Street Shop.', time: '12 min ago', unread: true },
  { id: 'purchase', category: 'Purchase', title: 'Purchase of ₹8,200 recorded.', copy: 'Shree Distributors · Grocery restock', time: '54 min ago', unread: true },
  { id: 'report', category: 'Report', title: 'Monthly report is ready.', copy: 'June performance is ready to review.', time: 'Yesterday', unread: false },
]

export function NotificationsPanel({ items, onRead, onClose, onReadAll }: { items: NotificationItem[]; onRead: (id: string) => void; onClose: () => void; onReadAll: () => void }) {
  return <div className="notification-panel"><div className="notification-header"><div><strong>Notifications</strong><small>{items.filter((item) => item.unread).length} unread updates</small></div><button className="icon-button" aria-label="Close notifications" onClick={onClose}><X size={17} /></button></div><div className="notification-list">{items.map((item) => <button className={item.unread ? 'notification-item unread' : 'notification-item'} key={item.id} onClick={() => onRead(item.id)}><span className={`notification-icon ${item.category.toLowerCase().replace(' ', '-')}`}>{item.category === 'Low Stock' ? <CircleAlert size={16} /> : item.category === 'Purchase' ? <ShoppingCart size={16} /> : <FileText size={16} />}</span><span className="notification-copy"><strong>{item.title}</strong><small>{item.copy}</small><time>{item.time}</time></span>{item.unread && <i />}</button>)}</div><button className="mark-read" onClick={onReadAll}><Check size={14} /> Mark all as read</button></div>
}
