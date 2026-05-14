/**
 * Menu.jsx — Full menu page with search, filter, and sort
 */
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { menuItems, CATEGORIES } from '../data/menuData';
import MenuCard from '../components/MenuCard';
import { SkeletonCard } from '../components/ui/SkeletonLoader';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';

const SORT_OPTIONS = [
  { value: 'default',     label: 'Default'         },
  { value: 'price-asc',   label: 'Price: Low–High' },
  { value: 'price-desc',  label: 'Price: High–Low' },
  { value: 'rating-desc', label: 'Top Rated'        },
];

export default function Menu() {
  const [category,  setCategory]  = useState('all');
  const [search,    setSearch]    = useState('');
  const [sort,      setSort]      = useState('default');
  const [vegOnly,   setVegOnly]   = useState(false);
  const [loading,   setLoading]   = useState(true);
  const [sortOpen,  setSortOpen]  = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  // Simulate initial loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let items = [...menuItems];
    if (category !== 'all') items = items.filter(i => i.category === category);
    if (vegOnly)            items = items.filter(i => i.isVeg);
    if (search.trim())      items = items.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === 'price-asc')   items.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc')  items.sort((a,b) => b.price - a.price);
    if (sort === 'rating-desc') items.sort((a,b) => b.rating - a.rating);
    return items;
  }, [category, search, sort, vegOnly]);

  const handleAdd = (item) => {
    addToast({ message: `${item.name} added to cart! 🛒`, type: 'success' });
  };

  const currentLabel = SORT_OPTIONS.find(o => o.value === sort)?.label;

  return (
    <div className="page-wrapper pt-20">
      {/* Header */}
      <div className="bg-gradient-warm py-16 px-4 text-center">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">Our Menu</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            Discover Our Flavors
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            From artisanal coffee to authentic Indian street food — all under one roof.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Search + Sort + Filter row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              id="menu-search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search dishes, drinks..."
              className="input-field pl-11"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-cafe-warm">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Veg toggle */}
          <button
            onClick={() => setVegOnly(v => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
              vegOnly ? 'bg-green-500 text-white border-green-500' : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-green-500 hover:text-green-500'
            }`}
          >
            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${vegOnly ? 'border-white' : 'border-green-500'}`}>
              <div className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-white' : 'bg-green-500'}`} />
            </div>
            Veg Only
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(o => !o)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:border-cafe-warm transition-colors min-w-[160px] justify-between"
            >
              <span className="flex items-center gap-2"><SlidersHorizontal size={14} /> {currentLabel}</span>
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity:0, y:-8, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-8, scale:0.97 }}
                  className="absolute right-0 top-full mt-2 w-48 glass rounded-2xl shadow-warm-lg border border-[var(--border)] py-2 z-10"
                >
                  {SORT_OPTIONS.map(o => (
                    <button key={o.value} onClick={() => { setSort(o.value); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sort === o.value ? 'text-cafe-warm font-semibold' : 'text-[var(--text-secondary)] hover:bg-cafe-warm/10'
                      }`}>
                      {o.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                category === cat.id
                  ? 'bg-cafe-brown text-white shadow-warm-sm'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-cafe-brown/10 hover:text-cafe-brown border border-[var(--border)]'
              }`}>
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-[var(--text-muted)] mb-6">
          {loading ? 'Loading...' : `${filtered.length} item${filtered.length !== 1 ? 's' : ''} found`}
          {(search || category !== 'all') && !loading && (
            <button onClick={() => { setSearch(''); setCategory('all'); setVegOnly(false); }}
              className="ml-3 text-cafe-warm hover:underline text-xs">Clear filters</button>
          )}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({length: 8}).map((_,i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍽️</p>
            <h3 className="font-poppins font-bold text-lg text-[var(--text-primary)] mb-2">No items found</h3>
            <p className="text-[var(--text-muted)] text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filtered.map(item => (
                <motion.div key={item.id} layout
                  initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }}
                  transition={{ duration:0.25 }}
                >
                  <MenuCard item={item} onAdd={handleAdd} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
