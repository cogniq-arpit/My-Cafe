/**
 * MenuCard.jsx — Premium cafe menu item card
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Check, ShoppingCart } from 'lucide-react';
import useCartStore from '../store/useCartStore';

export default function MenuCard({ item, onAdd }) {
  const [added,    setAdded]    = useState(false);
  const [imgError, setImgError] = useState(false);
  const addItem = useCartStore(s => s.addItem);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    onAdd && onAdd(item);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="bg-[var(--bg-secondary)] rounded-2xl overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80' : item.image}
          alt={item.name}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {/* Veg/Non-Veg badge */}
        <div className={`absolute top-3 left-3 w-5 h-5 rounded-sm border-2 flex items-center justify-center ${item.isVeg ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 right-3 bg-cafe-warm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {item.badge}
          </div>
        )}
        {/* Popular tag */}
        {item.popular && !item.badge && (
          <div className="absolute top-3 right-3 bg-cafe-brown text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Popular
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-poppins font-semibold text-sm text-[var(--text-primary)] line-clamp-1">{item.name}</h3>
          {/* Rating */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">{item.rating}</span>
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)] line-clamp-2 flex-1 mb-3">{item.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-cafe-warm font-poppins">₹{item.price}</span>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-cafe-brown text-white hover:bg-cafe-warm active:scale-95'
            }`}
          >
            {added ? (
              <><Check size={13} /> Added!</>
            ) : (
              <><Plus size={13} /> Add to Cart</>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
