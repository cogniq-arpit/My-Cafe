/** Toast.jsx — Global toast notification system */
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ICONS = {
  success: <CheckCircle size={18} className="text-green-400" />,
  error:   <AlertCircle size={18} className="text-red-400"   />,
  info:    <Info        size={18} className="text-blue-400"  />,
};

const BG = {
  success: 'border-green-500/30 bg-green-950/80',
  error:   'border-red-500/30   bg-red-950/80',
  info:    'border-blue-500/30  bg-blue-950/80',
};

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0,  scale: 1   }}
            exit={{    opacity: 0, x: 50, scale: 0.9 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-warm-lg ${BG[t.type] || BG.info}`}
          >
            {ICONS[t.type] || ICONS.info}
            <span className="text-sm font-medium text-white flex-1">{t.message}</span>
            <button onClick={() => removeToast(t.id)} className="text-white/50 hover:text-white transition-colors ml-1">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
