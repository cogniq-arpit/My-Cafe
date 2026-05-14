/**
 * Toast.jsx — Global toast notification component
 * Renders in a fixed portal-style container (top-right).
 * Variants: success, error, info, warning
 */
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import useToastStore from '../store/useToastStore';

const ICONS = {
  success: <CheckCircle  size={17} className="text-green-500 flex-shrink-0"  />,
  error:   <XCircle      size={17} className="text-red-500 flex-shrink-0"    />,
  info:    <Info         size={17} className="text-blue-500 flex-shrink-0"   />,
  warning: <AlertTriangle size={17} className="text-yellow-500 flex-shrink-0" />,
};

const ACCENT = {
  success: 'border-green-400/40  bg-green-50  dark:bg-green-900/20',
  error:   'border-red-400/40    bg-red-50    dark:bg-red-900/20',
  info:    'border-blue-400/40   bg-blue-50   dark:bg-blue-900/20',
  warning: 'border-yellow-400/40 bg-yellow-50 dark:bg-yellow-900/20',
};

export default function Toast() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div
      className="fixed top-20 right-4 z-[200] flex flex-col gap-2 pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence initial={false}>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0,  scale: 1   }}
            exit={{    opacity: 0, x: 80, scale: 0.9  }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className={`
              pointer-events-auto
              flex items-start gap-3
              min-w-[260px] max-w-xs
              px-4 py-3 rounded-2xl
              border shadow-warm-lg
              bg-[var(--bg-primary)]
              ${ACCENT[t.type] || ACCENT.info}
            `}
            role="alert"
          >
            {ICONS[t.type] || ICONS.info}
            <p className="flex-1 text-sm text-[var(--text-primary)] leading-snug">
              {t.message}
            </p>
            <button
              onClick={() => dismiss(t.id)}
              className="ml-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0 -mt-0.5"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
