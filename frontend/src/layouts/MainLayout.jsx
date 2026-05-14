/**
 * MainLayout.jsx — Wraps pages with Navbar, Footer, ChatBot
 */
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar  from '../components/Navbar';
import Footer  from '../components/Footer';
import ChatBot from '../components/ChatBot';
import CartDrawer from '../components/CartDrawer';
import useThemeStore from '../store/useThemeStore';

export default function MainLayout() {
  const { init } = useThemeStore();
  const { pathname } = useLocation();

  // Initialize theme class on mount
  useEffect(() => { init(); }, []);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);

  // Auth pages don't render footer/chatbot
  const isAuth = ['/login', '/signup'].includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {!isAuth && <Footer />}
      {!isAuth && <ChatBot />}
      <CartDrawer />
    </div>
  );
}
