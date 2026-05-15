# ☕ MY Cafe — Premium AI-Powered Culinary Experience

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E.svg)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Enabled-4285F4.svg)](https://deepmind.google/technologies/gemini/)

> **"Where Tradition Meets Intelligence"** — A state-of-the-art, fully responsive cafe platform featuring real-time AI assistance, voice interaction, and a robust cloud-synced backend.

---

## ✨ Key Features

### 🤖 Intelligent AI Ecosystem
- **AI Chatbot**: A floating assistant powered by **Google Gemini API** for menu recommendations, reservation help, and general inquiries.
- **Voice Assistant**: Hands-free interaction using the **Web Speech API** combined with Gemini for spoken responses and real-time waveform visualization.
- **Intent Recognition**: Context-aware conversations that understand cafe-specific queries (orders, hours, dietary info).

### 🔐 Secure Cloud Backend (Supabase)
- **Real-time Authentication**: Secure Login/Signup powered by Supabase Auth.
- **Persistent Storage**: All user data, orders, and reservations are synced to a live PostgreSQL database.
- **User Dashboard**: personalized experience with order history and profile management.

### 🛒 Premium E-Commerce Experience
- **Dynamic Menu**: Over 45+ meticulously curated items across 11 categories with search, filter, and sort capabilities.
- **Smart Shopping Cart**: Persistent cart system using Zustand with local storage fallback.
- **Reservation System**: Real-time table booking with cloud validation.

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Sleek, transparent UI elements for a premium feel.
- **Framer Motion Animations**: Smooth transitions and micro-interactions.
- **Dark/Light Mode**: Fully themeable interface with system-level persistence.
- **Responsive Excellence**: Optimized for Mobile, Tablet, and Desktop.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Google Gemini API Key
- A Supabase Project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cafe-website/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Launch the Experience**
   ```bash
   npm run dev
   ```
   → Open [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS |
| **Animations** | Framer Motion |
| **State Management** | Zustand (Persisted) |
| **AI Engine** | Google Gemini SDK |
| **Backend/DB** | Supabase (PostgreSQL + Auth) |
| **Icons** | Lucide React |

---

## 📁 Project Architecture (Frontend)

```text
src/
├── components/          # Reusable UI components
│   ├── ui/              # Atomized UI elements (Toast, Button, etc.)
│   ├── ChatBot.jsx      # Gemini-powered floating assistant
│   └── Navbar.jsx       # Glassmorphism navigation
├── pages/               # Main application views
│   ├── Home.jsx         # Dynamic landing page
│   ├── Menu.jsx         # Interactive menu with filters
│   ├── AIAssistant.jsx  # Full-page Voice & Chat assistant
│   └── Dashboard.jsx    # Protected user management
├── store/               # Zustand state logic (Auth, Cart, Theme)
├── services/            # API & SDK integrations (Supabase, Gemini)
└── hooks/               # Custom React hooks for global utilities
```

---

## 📝 Database Schema (Supabase)

The application interacts with the following tables:
- `orders`: Stores customer orders and order status.
- `reservations`: Manages table bookings.
- `addresses`: User-specific delivery locations.
- `profiles`: Extended user metadata.

---

## 📱 Responsiveness

| Device | Range | Support |
| :--- | :--- | :--- |
| Mobile | < 640px | ✅ Optimized |
| Tablet | 640px - 1024px | ✅ Optimized |
| Desktop | > 1024px | ✅ High Fidelity |

---

## 🏗️ Roadmap

- [x] Gemini AI Integration
- [x] Supabase Auth & DB
- [x] Voice Assistant Implementation
- [ ] Razorpay Payment Integration
- [ ] Admin Dashboard for Order Management
- [ ] PWA (Progressive Web App) support

---

*Built with ☕, ❤️, and 🤖 by the MY Cafe Team*
