/**
 * CartDrawer.jsx — Sliding shopping cart sidebar
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { ToastContainer } from './ui/Toast';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();
  const [toasts, setToasts] = useState([]);
  
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    addToast('Order placed successfully! ☕');
    setTimeout(() => {
      clearCart();
      closeCart();
    }, 2000);
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={id => setToasts(t => t.filter(x => x.id !== id))} />
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--bg-primary)] z-[101] shadow-2xl flex flex-col border-l border-[var(--border)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cafe-warm/10 flex items-center justify-center text-cafe-warm">
                    <ShoppingBag size={20} />
                  </div>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">Your Cart</h2>
                  <span className="bg-cafe-warm text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>
                <button 
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                    <ShoppingBag size={48} className="mb-4 text-[var(--text-muted)]" />
                    <p className="text-lg font-semibold text-[var(--text-primary)]">Your cart is empty</p>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Looks like you haven't added anything yet.</p>
                    <button 
                      onClick={closeCart}
                      className="mt-6 px-6 py-2 rounded-full bg-cafe-brown/10 text-cafe-brown font-medium hover:bg-cafe-brown hover:text-white transition-colors"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  items.map(item => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex gap-4 p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] group"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 flex flex-col py-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-sm text-[var(--text-primary)]">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--text-muted)] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-cafe-warm font-semibold text-sm mt-1">₹{item.price}</p>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)] p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-cafe-brown/10 text-[var(--text-secondary)] transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-semibold w-4 text-center text-[var(--text-primary)]">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-cafe-brown/10 text-[var(--text-secondary)] transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-[var(--text-primary)]">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
                  <div className="flex justify-between text-[var(--text-secondary)] mb-2 text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)] mb-4 text-sm">
                    <span>Taxes & Fees</span>
                    <span>₹{Math.round(totalPrice * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-primary)] font-bold text-lg mb-6">
                    <span>Total</span>
                    <span>₹{totalPrice + Math.round(totalPrice * 0.05)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 rounded-xl bg-gradient-warm text-white font-bold text-sm shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
