/**
 * Navbar.jsx — Sticky glassmorphism navbar with mobile drawer
 */
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Sun, Moon, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import useThemeStore from '../store/useThemeStore';
import useCartStore  from '../store/useCartStore';
import useAuthStore  from '../store/useAuthStore';

const NAV_LINKS = [
  { to: '/',            label: 'Home'      },
  { to: '/menu',        label: 'Menu'      },
  { to: '/about',       label: 'About'     },
  { to: '/gallery',     label: 'Gallery'   },
  { to: '/contact',     label: 'Contact'   },
  { to: '/ai-assistant',label: 'AI ✨'     },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isDark, toggle } = useThemeStore();
  const navigate = useNavigate();

  const items          = useCartStore(s => s.items);
  const { user, isAuthenticated, logout } = useAuthStore();

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); setUserMenuOpen(false); navigate('/'); };

  const activeClass = 'text-cafe-warm font-semibold';
  const linkClass   = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 hover:text-cafe-warm ${isActive ? activeClass : 'text-[var(--text-secondary)]'}`;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-warm py-3' : 'bg-transparent py-5'
        }`}
        style={{ background: scrolled ? 'var(--nav-bg)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
            <Logo size="md" white={!scrolled && !isDark} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full hover:bg-cafe-brown/10 transition-colors text-[var(--text-secondary)] hover:text-cafe-warm"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Cart */}
            <button onClick={() => useCartStore.getState().openCart()} className="relative p-2 rounded-full hover:bg-cafe-brown/10 transition-colors text-[var(--text-secondary)] hover:text-cafe-warm">
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-cafe-warm text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cafe-brown/10 hover:bg-cafe-brown/20 transition-colors text-sm font-medium text-[var(--text-primary)]"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-warm flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="max-w-[80px] truncate">{user?.name}</span>
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 glass rounded-2xl shadow-warm-lg py-2 border border-[var(--border)]"
                    >
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-cafe-brown/10 transition-colors text-[var(--text-primary)]">
                        <User size={15} /> My Dashboard
                      </Link>
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500">
                        <LogOut size={15} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login"
                  className="text-sm font-medium px-4 py-2 rounded-full text-[var(--text-secondary)] hover:text-cafe-warm transition-colors">
                  Login
                </Link>
                <Link to="/signup"
                  className="text-sm font-semibold px-4 py-2 rounded-full bg-gradient-warm text-white shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all duration-200">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden p-2 rounded-full hover:bg-cafe-brown/10 transition-colors text-[var(--text-primary)]"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-50 glass-dark flex flex-col pt-20 pb-8 px-6 lg:hidden shadow-warm-xl"
            >
              <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-5 p-2 text-white/70 hover:text-white">
                <X size={22} />
              </button>
              <nav className="flex flex-col gap-2 mt-4">
                {NAV_LINKS.map(l => (
                  <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive ? 'bg-cafe-warm text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }>
                    {l.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-white text-sm font-medium">
                      <User size={16} /> My Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/20 text-red-300 text-sm font-medium">
                      <LogOut size={16} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-xl bg-white/10 text-white text-sm font-medium text-center">Login</Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-xl bg-gradient-warm text-white text-sm font-semibold text-center">Sign Up Free</Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
