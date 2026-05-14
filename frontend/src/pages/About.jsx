/**
 * About.jsx — Story, values, and team page
 */
import { motion } from 'framer-motion';
import { Heart, Leaf, Award, Users } from 'lucide-react';

const values = [
  { icon: Heart,  title: 'Brewed with Love',    desc: 'Every cup and dish is made with genuine care for our guests.' },
  { icon: Leaf,   title: 'Fresh & Sustainable', desc: 'We source local, seasonal ingredients and minimize waste.'    },
  { icon: Award,  title: 'Premium Quality',     desc: 'No shortcuts. Ever. Only the best makes it to your table.'    },
  { icon: Users,  title: 'Community First',     desc: 'We are a neighborhood cafe that grows with its community.'     },
];

const team = [
  { name:'Aryan Kapoor',  role:'Head Barista & Co-founder', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name:'Nisha Sharma',  role:'Executive Chef',            img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
  { name:'Rohan Mehta',   role:'Co-founder & Operations',  img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
];

export default function About() {
  return (
    <div className="page-wrapper pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-[var(--bg-secondary)]">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=70" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-cafe-warm">Our Story</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-3 mb-5">
              More Than a Cafe,<br />It's a Feeling
            </h1>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
              MY Cafe was born in 2019 from a simple dream — to create a space where great coffee meets great company.
              We fuse the warmth of Indian hospitality with the craftsmanship of modern cafe culture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
              alt="MY Cafe interior"
              className="rounded-3xl shadow-warm-xl w-full object-cover h-80 md:h-[450px]"
            />
          </motion.div>
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-5">Where Our Journey Began</h2>
            <p className="text-[var(--text-muted)] leading-relaxed mb-4">
              In 2019, Aryan Kapoor and Rohan Mehta opened a tiny 12-seat cafe in Bandra West, Mumbai, with a second-hand espresso machine and a lot of courage. They believed that great coffee could transform a mundane Tuesday into something magical.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed mb-6">
              Five years and 15,000 loyal customers later, MY Cafe has grown into a beloved neighborhood institution — but the mission remains exactly the same: brew every cup with love, serve every guest like family, and never compromise on quality.
            </p>
            <div className="flex gap-8">
              <div><p className="text-3xl font-bold text-cafe-warm font-poppins">5+</p><p className="text-sm text-[var(--text-muted)]">Years of Service</p></div>
              <div><p className="text-3xl font-bold text-cafe-warm font-poppins">15K+</p><p className="text-sm text-[var(--text-muted)]">Happy Guests</p></div>
              <div><p className="text-3xl font-bold text-cafe-warm font-poppins">50+</p><p className="text-sm text-[var(--text-muted)]">Menu Items</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] text-center mb-10">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.1 }}
                className="flex gap-5 p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] hover:border-cafe-warm/40 hover:shadow-warm transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-cafe-warm/10 flex items-center justify-center text-cafe-warm flex-shrink-0">
                  <v.icon size={22} />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-[var(--text-primary)] mb-1">{v.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-3">Meet the Team</h2>
          <p className="text-[var(--text-muted)] mb-10">The passionate people behind every great cup.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <motion.div key={m.name}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl mb-4">
                  <img src={m.img} alt={m.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </div>
                <h3 className="font-poppins font-bold text-[var(--text-primary)]">{m.name}</h3>
                <p className="text-sm text-cafe-warm">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
