/** Footer.jsx — Rich footer with links, hours, and social icons */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Link2, Rss, Play, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Logo from './Logo';

const SOCIAL = [
  { icon: Globe, label: 'Instagram', href: '#', color: 'hover:text-pink-400'   },
  { icon: Link2, label: 'Twitter',   href: '#', color: 'hover:text-sky-400'    },
  { icon: Rss,   label: 'Facebook',  href: '#', color: 'hover:text-blue-400'   },
  { icon: Play,  label: 'YouTube',   href: '#', color: 'hover:text-red-400'    },
];

const QUICK_LINKS = [
  { to: '/',            label: 'Home'         },
  { to: '/menu',        label: 'Our Menu'     },
  { to: '/about',       label: 'About Us'     },
  { to: '/gallery',     label: 'Gallery'      },
  { to: '/contact',     label: 'Contact'      },
  { to: '/ai-assistant',label: 'AI Assistant' },
];

const HOURS = [
  { day: 'Monday – Friday', time: '8:00 AM – 10:00 PM' },
  { day: 'Saturday',        time: '9:00 AM – 11:00 PM' },
  { day: 'Sunday',          time: '9:00 AM – 11:00 PM' },
  { day: 'Public Holidays', time: '10:00 AM – 9:00 PM' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">
              A premium cafe experience brewed with love. We blend the finest Indian flavors with international cafe culture.
            </p>
            <div className="flex gap-3 mt-5">
              {SOCIAL.map(({ icon: Icon, label, href, color }) => (
                <motion.a key={label} href={href} aria-label={label} whileHover={{ y: -3 }}
                  className={`w-9 h-9 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] transition-colors duration-200 ${color}`}>
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-sm text-[var(--text-primary)] uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-[var(--text-muted)] hover:text-cafe-warm transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-poppins font-semibold text-sm text-[var(--text-primary)] uppercase tracking-wider mb-5">
              <Clock size={14} className="inline mr-2 text-cafe-warm" />
              Opening Hours
            </h3>
            <ul className="space-y-3">
              {HOURS.map(h => (
                <li key={h.day} className="text-sm text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--text-secondary)]">{h.day}</span>
                  <br />{h.time}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-sm text-[var(--text-primary)] uppercase tracking-wider mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                <MapPin size={16} className="mt-0.5 text-cafe-warm flex-shrink-0" />
                <span>42, Cafe Lane, Bandra West,<br />Mumbai – 400 050, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <Phone size={16} className="text-cafe-warm flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-cafe-warm transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <Mail size={16} className="text-cafe-warm flex-shrink-0" />
                <a href="mailto:hello@mycafe.in" className="hover:text-cafe-warm transition-colors">hello@mycafe.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} MY Cafe. Made with ☕ & ❤️ in India.
          </p>
          <div className="flex gap-5 text-xs text-[var(--text-muted)]">
            <Link to="#" className="hover:text-cafe-warm transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-cafe-warm transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-cafe-warm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
