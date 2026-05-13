# MY Cafe — Premium Indian Cafe Website Frontend

> **"Brewed with Love"** — A production-ready, fully responsive cafe website built with React + Vite + Tailwind CSS + Framer Motion.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → Open http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Tech Stack

| Technology       | Purpose                        |
|-----------------|-------------------------------|
| React 18 + Vite | Core framework & build tool    |
| Tailwind CSS v3 | Utility-first styling          |
| Framer Motion   | Animations & transitions       |
| React Router v6 | Client-side routing            |
| Zustand         | Global state management        |
| Lucide React    | Icon library                   |
| Web Speech API  | Voice input/output (browser)   |
| Google Fonts    | Poppins, Inter, Playfair Display|

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Primitive components (Toast, Skeleton)
│   ├── Navbar.jsx       # Sticky glassmorphism navbar
│   ├── Footer.jsx       # Rich footer
│   ├── Logo.jsx         # SVG brand logo
│   ├── MenuCard.jsx     # Menu item card with add-to-cart
│   ├── ChatBot.jsx      # Floating AI chatbot widget
│   └── ProtectedRoute.jsx
│
├── pages/               # All 9 application pages
│   ├── Home.jsx         # Landing page with 7 sections
│   ├── Menu.jsx         # Full menu with search/filter/sort
│   ├── About.jsx        # Brand story, values, team
│   ├── Gallery.jsx      # Masonry photo gallery + lightbox
│   ├── Contact.jsx      # Contact form + map placeholder
│   ├── Login.jsx        # Auth login with validation
│   ├── Signup.jsx       # Registration with strength meter
│   ├── Dashboard.jsx    # Protected user dashboard
│   └── AIAssistant.jsx  # Full-page AI chat + voice
│
├── layouts/
│   └── MainLayout.jsx   # Navbar + Footer + ChatBot wrapper
│
├── store/               # Zustand global state
│   ├── useCartStore.js  # Cart state (persisted)
│   ├── useAuthStore.js  # Auth state
│   └── useThemeStore.js # Dark/light mode (persisted)
│
├── data/                # Static mock data
│   ├── menuData.js      # 45 menu items, 11 categories
│   ├── testimonials.js  # Customer reviews & stats
│   └── galleryData.js   # Gallery image collection
│
├── services/            # Mock backend services
│   ├── mockAuth.js      # localStorage-based auth
│   └── mockAI.js        # Pattern-matched AI responses
│
├── hooks/
│   └── useToast.js      # Custom toast notification hook
│
└── App.jsx              # Root router configuration
```

---

## 📄 Pages

| Page           | Route           | Description                              |
|---------------|-----------------|------------------------------------------|
| Home           | `/`             | Hero, featured dishes, offers, reviews  |
| Menu           | `/menu`         | 45 items, search, filter, sort          |
| About          | `/about`        | Story, values, team                     |
| Gallery        | `/gallery`      | Masonry grid with lightbox              |
| Contact        | `/contact`      | Form, hours, map placeholder            |
| Login          | `/login`        | Mock auth login                         |
| Signup         | `/signup`       | Registration with password strength     |
| Dashboard      | `/dashboard`    | Protected — redirects if not logged in  |
| AI Assistant   | `/ai-assistant` | Full-page chat + voice assistant        |

---

## 🎨 Design System

### Brand Colors
```
cafe-brown:  #6F4E37  (primary)
cafe-warm:   #FF8C42  (accent)
cafe-cream:  #F5F0E8  (light bg)
cafe-beige:  #E8DCC8  (secondary bg)
cafe-dark:   #1A1512  (dark bg)
cafe-gold:   #C9A84C  (gold accent)
```

### Typography
- **Headings**: Playfair Display (serif)
- **UI/Body**: Poppins
- **Default**: Inter

---

## 🤖 AI Features

### Chatbot (floating widget — bottom left)
- Click the orange chat bubble icon
- Supports 9 intent categories: coffee, food, tea, orders, reservations, hours, specials, veg, greetings
- Typing animation + quick suggested prompts

### Voice Assistant (AI Assistant page)
- Uses browser Web Speech API (Chrome/Edge recommended)
- Click microphone → speak your question → hear a spoken response
- Text-to-speech output with waveform animation

---

## 🔐 Authentication

Uses **mock frontend-only auth** via localStorage:

1. Go to `/signup` → create an account
2. You'll be redirected to `/dashboard` automatically
3. `/dashboard` is a protected route — redirects to `/login` if unauthenticated
4. Logout from the user menu in the navbar

> **No backend required.** Credentials are stored in localStorage.

---

## 🌙 Dark / Light Mode

Click the **sun/moon icon** in the navbar to toggle themes. Preference is persisted to localStorage.

---

## 🛒 Cart System

- Click **"Add to Cart"** on any menu item
- Cart badge updates in the navbar
- Cart state persisted to localStorage via Zustand persist middleware

---

## 📱 Responsive Breakpoints

| Breakpoint | Width      |
|-----------|------------|
| Mobile     | < 640px    |
| Tablet     | 640–1024px |
| Desktop    | > 1024px   |

---

## 🏗️ Future Enhancements

- [ ] Real backend API integration (FastAPI / Node.js)
- [ ] Real payment gateway (Razorpay)
- [ ] Real AI via OpenAI / Gemini API
- [ ] Push notifications for order updates
- [ ] PWA offline support

---

*Built with ☕ and ❤️ for MY Cafe*
