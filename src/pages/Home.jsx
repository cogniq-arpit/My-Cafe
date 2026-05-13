/**
 * Home.jsx — Full landing page for MY Cafe
 */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Star, Sparkles, Clock, MapPin, Wifi, Coffee } from 'lucide-react';
import { featuredItems, specialOffers } from '../data/menuData';
import { testimonials, stats } from '../data/testimonials';
import MenuCard from '../components/MenuCard';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';

/* ── Framer Motion variants ─────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ── Section Label ─────────────────────────── */
function SectionLabel({ text }) {
  return (
    <div className="flex items-center justify-center mb-4">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cafe-warm px-4 py-1.5 rounded-full bg-cafe-warm/10 border border-cafe-warm/20">
        <Sparkles size={11} /> {text}
      </span>
    </div>
  );
}

/* ── Counter animation ─────────────────────── */
function CountUp({ to, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(to.replace(/\D/g, ''), 10);
    let start = 0;
    const step = () => {
      start += Math.ceil(num / 40);
      if (start >= num) { setVal(num); return; }
      setVal(start);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{to.replace(/[\d]+/, val)}{suffix}</span>;
}

/* ════════════════════════════════════════════ */
export default function Home() {
  const { toasts, addToast, removeToast } = useToast();

  const handleAddToCart = (item) => {
    addToast({ message: `${item.name} added to cart! 🛒`, type: 'success' });
  };

  return (
    <div className="page-wrapper">
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&q=85"
            alt="MY Cafe ambiance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Floating coffee elements */}
        <motion.div animate={{ y: [0,-15,0] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
          className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-cafe-warm/20 blur-xl hidden lg:block" />
        <motion.div animate={{ y: [0,15,0] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut', delay:2 }}
          className="absolute bottom-1/3 right-10 w-32 h-32 rounded-full bg-cafe-brown/30 blur-2xl hidden lg:block" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cafe-warm px-4 py-2 rounded-full bg-cafe-warm/15 border border-cafe-warm/30 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cafe-warm animate-pulse" /> Now Open · Mumbai's Finest
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.4 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-5"
          >
            Brewed with <span className="text-gradient-warm italic">Love,</span>
            <br />Served with <span className="text-gradient-gold">Soul</span>
          </motion.h1>

          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8, delay:0.6 }}
            className="text-white/80 text-lg sm:text-xl max-w-xl mx-auto mb-8 font-light"
          >
            Experience the finest Indian cafe culture — artisanal coffee, authentic flavors, and a warm embrace in every cup.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/menu" id="hero-explore-menu"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-cafe-warm text-white font-semibold text-sm shadow-glow hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300">
              Explore Menu <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" id="hero-reserve-table"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-sm hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
              Reserve a Table
            </Link>
          </motion.div>

          {/* Mini stats bar */}
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:1 }}
            className="flex items-center justify-center gap-6 sm:gap-10 mt-14 pt-8 border-t border-white/20"
          >
            {stats.slice(0,3).map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white font-poppins">{s.value}</p>
                <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0,8,0] }} transition={{ duration:2, repeat:Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ── FEATURED DISHES ───────────────────── */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            <motion.div variants={fadeUp}>
              <SectionLabel text="Fan Favorites" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] text-center mb-3">
                Most Loved Items
              </h2>
              <p className="text-[var(--text-muted)] text-center max-w-md mx-auto mb-10">
                Handpicked by our guests — dishes and brews that keep everyone coming back.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map(item => (
                <motion.div key={item.id} variants={fadeUp}>
                  <MenuCard item={item} onAdd={handleAddToCart} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-cafe-brown text-cafe-brown dark:text-cafe-warm dark:border-cafe-warm font-semibold text-sm hover:bg-cafe-brown hover:text-white dark:hover:bg-cafe-warm transition-all duration-200">
                View Full Menu <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SPECIAL OFFERS ──────────────────── */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="Limited Time" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] text-center mb-3">
            Special Offers
          </h2>
          <p className="text-[var(--text-muted)] text-center max-w-md mx-auto mb-10">
            Save more, enjoy more. Exclusive deals crafted just for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialOffers.map((offer, i) => (
              <motion.div key={offer.id}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
                whileHover={{ y:-5 }}
                className="relative overflow-hidden rounded-3xl p-7 bg-gradient-warm shadow-warm-lg"
              >
                <div className="text-4xl mb-4">{offer.icon}</div>
                <div className="inline-block bg-white/20 text-white text-xs font-black tracking-widest px-3 py-1 rounded-full mb-3">
                  {offer.discount}
                </div>
                <h3 className="font-poppins font-bold text-xl text-white mb-2">{offer.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">{offer.description}</p>
                <span className="text-xs text-white/60">{offer.validUntil}</span>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ───────────────────── */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="Our Promise" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] text-center mb-3">
            Why MY Cafe?
          </h2>
          <p className="text-[var(--text-muted)] text-center max-w-md mx-auto mb-12">
            We don't just serve food and drinks — we create experiences worth remembering.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Coffee,  title:'Premium Roasts',    desc:'Single-origin beans sourced from the finest estates across India and beyond.'  },
              { icon: Clock,   title:'Always Fresh',      desc:'Every dish is prepared fresh on order. No pre-made shortcuts, ever.'             },
              { icon: MapPin,  title:'Cozy Ambiance',     desc:'A warm, Instagram-worthy space designed for work, dates, and everything between.' },
              { icon: Wifi,    title:'Fast Free WiFi',    desc:'Enjoy complimentary high-speed internet throughout your entire visit.'           },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
                className="p-7 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-cafe-warm/40 hover:shadow-warm transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-cafe-warm/10 flex items-center justify-center mb-5 group-hover:bg-cafe-warm group-hover:text-white text-cafe-warm transition-all duration-300">
                  <f.icon size={22} />
                </div>
                <h3 className="font-poppins font-bold text-base text-[var(--text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────── */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="What They Say" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] text-center mb-3">
            Our Happy Guests
          </h2>
          <p className="text-[var(--text-muted)] text-center max-w-md mx-auto mb-12">
            Real words from real people who love MY Cafe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.id}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
                className="p-6 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border)] hover:shadow-warm transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({length: t.rating}).map((_,j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-cafe-warm/30" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.location} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAND ──────────────────────── */}
      <section className="py-16 bg-gradient-warm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-4xl font-bold text-white font-poppins mb-1">
                  <CountUp to={s.value} />
                </p>
                <p className="text-white/70 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI ASSISTANT PROMO ──────────────── */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <div className="w-20 h-20 rounded-3xl bg-gradient-warm mx-auto flex items-center justify-center mb-6 shadow-glow animate-float">
              <Sparkles size={32} className="text-white" />
            </div>
            <SectionLabel text="Powered by AI" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-4 mb-4">
              Meet Your AI Cafe Assistant
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto mb-8">
              Get personalized food recommendations, check today's specials, reserve a table, and much more — all with a simple chat or voice command.
            </p>
            <Link to="/ai-assistant" id="ai-promo-cta"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-warm text-white font-semibold shadow-glow hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300">
              <Sparkles size={18} /> Try AI Assistant
            </Link>
          </motion.div>
        </div>
      </section>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
