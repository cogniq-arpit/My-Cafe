/**
 * Dashboard.jsx — User profile dashboard (protected route)
 */
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Sparkles, MapPin, Calendar, Star, LogOut } from 'lucide-react';
import useAuthStore  from '../store/useAuthStore';
import useCartStore  from '../store/useCartStore';
import { menuItems } from '../data/menuData';
import { Link, useNavigate } from 'react-router-dom';

const RECENT_ORDERS = [
  { id:'ord1', date:'12 May 2026', items:'Cappuccino × 2, Tiramisu × 1', total:589, status:'Delivered' },
  { id:'ord2', date:'08 May 2026', items:'Paneer Tikka Pizza, Mango Lassi', total:479, status:'Delivered' },
  { id:'ord3', date:'01 May 2026', items:"Student Special, Cold Brew", total:358, status:'Delivered' },
];

const SAVED_ADDRESSES = [
  { id:1, label:'Home',   address:'42, Shivaji Nagar, Pune – 411005' },
  { id:2, label:'Office', address:'Level 3, Cyber Park, Bandra Kurla Complex, Mumbai' },
];

const RESERVATIONS = [
  { id:1, date:'15 May 2026', time:'7:30 PM', guests:2, status:'Confirmed' },
  { id:2, date:'22 May 2026', time:'1:00 PM', guests:4, status:'Pending'   },
];

const favoriteIds = [3, 11, 20, 33];
const favorites   = menuItems.filter(i => favoriteIds.includes(i.id));
const aiRecs      = menuItems.filter(i => i.popular && !favoriteIds.includes(i.id)).slice(0, 3);

const statusColor = { Delivered:'bg-green-100 text-green-600 dark:bg-green-900/30', Confirmed:'bg-blue-100 text-blue-600 dark:bg-blue-900/30', Pending:'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' };

export default function Dashboard() {
  const { user, logout }   = useAuthStore();
  const cartItems          = useCartStore(s => s.items);
  const addItem            = useCartStore(s => s.addItem);
  const navigate           = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="page-wrapper pt-20 pb-16 bg-[var(--bg-secondary)] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Welcome Banner */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          className="bg-gradient-warm rounded-3xl p-7 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-warm-lg">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="text-center sm:text-left flex-1">
            <p className="text-white/80 text-sm mb-1">Welcome back,</p>
            <h1 className="font-display text-2xl font-bold text-white">{user?.name} 👋</h1>
            <p className="text-white/70 text-sm mt-1">{user?.email}</p>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm hover:bg-white/25 transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left column — Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Recent Orders */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
              className="bg-[var(--bg-primary)] rounded-3xl p-6 border border-[var(--border)]">
              <h2 className="font-poppins font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                <ShoppingBag size={18} className="text-cafe-warm" /> Recent Orders
              </h2>
              <div className="space-y-3">
                {RECENT_ORDERS.map(o => (
                  <div key={o.id} className="flex items-start justify-between p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                    <div>
                      <p className="text-xs text-[var(--text-muted)] mb-0.5">{o.date}</p>
                      <p className="text-sm text-[var(--text-primary)] font-medium">{o.items}</p>
                      <p className="text-sm text-cafe-warm font-bold mt-1">₹{o.total}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[o.status]}`}>{o.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Favorites */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
              className="bg-[var(--bg-primary)] rounded-3xl p-6 border border-[var(--border)]">
              <h2 className="font-poppins font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                <Heart size={18} className="text-red-400" /> My Favorites
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {favorites.map(item => (
                  <div key={item.id} className="flex gap-3 p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{item.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={11} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-[var(--text-muted)]">{item.rating}</span>
                      </div>
                      <p className="text-sm font-bold text-cafe-warm mt-1">₹{item.price}</p>
                    </div>
                    <button onClick={() => addItem(item)}
                      className="text-xs px-2 py-1 rounded-lg bg-cafe-warm/10 text-cafe-warm hover:bg-cafe-warm hover:text-white transition-all self-end">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              className="bg-[var(--bg-primary)] rounded-3xl p-6 border border-[var(--border)]">
              <h2 className="font-poppins font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                <Sparkles size={16} className="text-cafe-warm" /> AI Picks for You
              </h2>
              <p className="text-xs text-[var(--text-muted)] mb-4">Based on your taste profile</p>
              <div className="space-y-3">
                {aiRecs.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img src={item.image} alt={item.name} className="w-11 h-11 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{item.name}</p>
                      <p className="text-xs text-cafe-warm font-bold">₹{item.price}</p>
                    </div>
                    <button onClick={() => addItem(item)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-cafe-brown text-white hover:bg-cafe-warm transition-colors flex-shrink-0">
                      Add
                    </button>
                  </div>
                ))}
              </div>
              <Link to="/ai-assistant" className="block text-center text-xs text-cafe-warm mt-4 hover:underline">
                Ask AI for more →
              </Link>
            </motion.div>

            {/* Saved Addresses */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }}
              className="bg-[var(--bg-primary)] rounded-3xl p-6 border border-[var(--border)]">
              <h2 className="font-poppins font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-cafe-warm" /> Saved Addresses
              </h2>
              <div className="space-y-3">
                {SAVED_ADDRESSES.map(a => (
                  <div key={a.id} className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                    <p className="text-xs font-bold text-cafe-warm mb-0.5">{a.label}</p>
                    <p className="text-xs text-[var(--text-muted)]">{a.address}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reservations */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
              className="bg-[var(--bg-primary)] rounded-3xl p-6 border border-[var(--border)]">
              <h2 className="font-poppins font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-cafe-warm" /> Reservations
              </h2>
              <div className="space-y-3">
                {RESERVATIONS.map(r => (
                  <div key={r.id} className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-primary)]">{r.date} · {r.time}</p>
                      <p className="text-xs text-[var(--text-muted)]">{r.guests} guests</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor[r.status]}`}>{r.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
