/**
 * Contact.jsx — Contact form, map, hours, and social links
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, Globe, Link2, Rss } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sending, setSending] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast({ message: 'Please fill in all required fields.', type: 'error' });
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setForm({ name:'', email:'', subject:'', message:'' });
    addToast({ message: "Message sent! We'll get back to you within 24 hours ☕", type: 'success', duration: 5000 });
  };

  const INFO = [
    { icon: MapPin, label: 'Address',  value: '42, Cafe Lane, Bandra West, Mumbai – 400 050' },
    { icon: Phone,  label: 'Phone',    value: '+91 98765 43210'  },
    { icon: Mail,   label: 'Email',    value: 'hello@mycafe.in'  },
    { icon: Clock,  label: 'Hours',    value: 'Mon–Fri: 8AM–10PM\nSat–Sun: 9AM–11PM' },
  ];

  return (
    <div className="page-wrapper pt-20">
      {/* Header */}
      <div className="bg-gradient-warm py-16 text-center px-4">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">Get in Touch</h1>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Questions, reservations, or just want to say hi — we'd love to hear from you.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-12">
        {/* Form */}
        <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
          <h2 className="font-poppins font-bold text-2xl text-[var(--text-primary)] mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">Name *</label>
                <input id="contact-name" name="name" value={form.name} onChange={handleChange}
                  placeholder="Your name" className="input-field" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">Email *</label>
                <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" className="input-field" required />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">Subject</label>
              <input id="contact-subject" name="subject" value={form.subject} onChange={handleChange}
                placeholder="Table reservation, feedback..." className="input-field" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">Message *</label>
              <textarea id="contact-message" name="message" value={form.message} onChange={handleChange}
                rows={5} placeholder="Write your message here..."
                className="input-field resize-none" required />
            </div>
            <button type="submit" id="contact-submit" disabled={sending}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-warm text-white font-semibold shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60">
              {sending ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>
          </form>
        </motion.div>

        {/* Info & Map */}
        <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="space-y-8">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-[var(--text-primary)] mb-6">Find Us</h2>
            {INFO.map(item => (
              <div key={item.label} className="flex gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-cafe-warm/10 flex items-center justify-center text-cafe-warm flex-shrink-0">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] mb-0.5">{item.label}</p>
                  <p className="text-sm text-[var(--text-secondary)] whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-secondary)] h-52 flex items-center justify-center text-[var(--text-muted)]">
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-2 text-cafe-warm" />
              <p className="text-sm font-medium">Google Maps</p>
              <p className="text-xs">42, Cafe Lane, Bandra West</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] mb-3">Follow Us</p>
            <div className="flex gap-3">
              {[{ Icon: Globe, label:'Instagram' }, { Icon: Link2, label:'Twitter' }, { Icon: Rss, label:'Facebook' }].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:bg-cafe-warm hover:text-white hover:border-cafe-warm transition-all duration-200">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
