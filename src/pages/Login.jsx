/**
 * Login.jsx — Premium authentication login page
 */
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Globe } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import Logo from '../components/Logo';

export default function Login() {
  const [form,    setForm]    = useState({ email:'', password:'', remember: false });
  const [showPw,  setShowPw]  = useState(false);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      await login({ email: form.email, password: form.password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] px-4 py-20">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          {/* Card */}
          <div className="bg-[var(--bg-primary)] rounded-3xl shadow-warm-xl p-8 border border-[var(--border)]">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Logo size="md" />
            </div>
            <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] text-center mb-1">Welcome back</h1>
            <p className="text-[var(--text-muted)] text-sm text-center mb-7">Sign in to your MY Cafe account</p>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input id="login-email" name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com" className="input-field pl-10" required />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input id="login-password" name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handleChange}
                    placeholder="Enter your password" className="input-field pl-10 pr-10" required />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-cafe-warm transition-colors">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input id="login-remember" name="remember" type="checkbox" checked={form.remember} onChange={handleChange}
                    className="rounded accent-cafe-warm" />
                  <span className="text-xs text-[var(--text-muted)]">Remember me</span>
                </label>
                <Link to="#" className="text-xs text-cafe-warm hover:underline">Forgot password?</Link>
              </div>

              <button type="submit" id="login-submit" disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-warm text-white font-semibold shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2">
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                  : 'Sign In'
                }
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-xs text-[var(--text-muted)]">or continue with</span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            {/* Social logins (UI only) */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:border-cafe-warm hover:text-cafe-warm transition-all duration-200">
                <Globe size={16} /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:border-cafe-warm hover:text-cafe-warm transition-all duration-200">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
            </div>

            <p className="text-center text-sm text-[var(--text-muted)] mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cafe-warm font-semibold hover:underline">Create one free</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
