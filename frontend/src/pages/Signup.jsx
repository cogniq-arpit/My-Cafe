/**
 * Signup.jsx — Premium registration page
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useToastStore from '../store/useToastStore';
import Logo from '../components/Logo';

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[0,1,2,3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i < score ? colors[score-1] : 'bg-[var(--border)]'} transition-all`} />
        ))}
      </div>
      <p className={`text-xs ${score <= 1 ? 'text-red-400' : score <= 2 ? 'text-yellow-400' : 'text-green-500'}`}>
        {labels[score - 1] || 'Too short'}
      </p>
    </div>
  );
}

export default function Signup() {
  const [form,    setForm]    = useState({ name:'', email:'', password:'', confirm:'' });
  const [showPw,  setShowPw]  = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const toast = useToastStore();
  const navigate = useNavigate();

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { 
      toast.warning('All fields are required.'); 
      return; 
    }
    if (form.password !== form.confirm) { 
      toast.error('Passwords do not match.'); 
      return; 
    }
    if (form.password.length < 6) { 
      toast.warning('Password must be at least 6 characters.'); 
      return; 
    }
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      toast.success('Account created! Welcome to the family ☕');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const FIELDS = [
    { id:'signup-name',     name:'name',     label:'Full Name', type:'text',     icon:User, placeholder:'Your full name'    },
    { id:'signup-email',    name:'email',    label:'Email',     type:'email',    icon:Mail, placeholder:'you@example.com'   },
    { id:'signup-password', name:'password', label:'Password',  type:'password', icon:Lock, placeholder:'Create a password' },
    { id:'signup-confirm',  name:'confirm',  label:'Confirm Password', type:'password', icon:Lock, placeholder:'Repeat password' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] px-4 py-20">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <div className="bg-[var(--bg-primary)] rounded-3xl shadow-warm-xl p-8 border border-[var(--border)]">
            <div className="flex justify-center mb-6"><Logo size="md" /></div>
            <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] text-center mb-1">Create an account</h1>
            <p className="text-[var(--text-muted)] text-sm text-center mb-7">Join the MY Cafe family today ☕</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {FIELDS.map(f => (
                <div key={f.name}>
                  <label className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-1.5 block">{f.label}</label>
                  <div className="relative">
                    <f.icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      id={f.id}
                      name={f.name}
                      type={f.name.includes('password') || f.name === 'confirm' ? (showPw ? 'text' : 'password') : f.type}
                      value={form[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="input-field pl-10 pr-10"
                      required
                    />
                    {(f.name === 'password' || f.name === 'confirm') && (
                      <button type="button" onClick={() => setShowPw(v => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-cafe-warm transition-colors">
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    )}
                  </div>
                  {f.name === 'password' && <PasswordStrength password={form.password} />}
                </div>
              ))}

              {/* Perks list */}
              <div className="bg-cafe-warm/5 rounded-xl p-4 border border-cafe-warm/20 space-y-2">
                {['Access your order history', 'Save favorite items', 'Exclusive member offers'].map(perk => (
                  <div key={perk} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <CheckCircle size={13} className="text-green-500 flex-shrink-0" /> {perk}
                  </div>
                ))}
              </div>

              <button type="submit" id="signup-submit" disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-warm text-white font-semibold shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2">
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
                  : 'Create Account'
                }
              </button>
            </form>

            <p className="text-center text-sm text-[var(--text-muted)] mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-cafe-warm font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
