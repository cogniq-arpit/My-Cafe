/**
 * ChatBot.jsx — Floating AI chatbot widget for MY Cafe
 */
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { getGeminiResponse, suggestions } from '../services/gemini';

const WELCOME = "Hello! Welcome to MY Cafe ☕ I'm your official AI assistant. Ask me about our menu, reservations, special offers, or anything else!";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, typing]);

  const send = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setTyping(true);

    try {
      // Pass the message history
      const reply = await getGeminiResponse(userMsg, messages);
      setMessages([...newMessages, { role: 'ai', text: reply }]);
    } catch (err) {
      console.error("ChatBot error:", err);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-[90] w-14 h-14 rounded-full bg-gradient-warm shadow-glow flex items-center justify-center text-white animate-pulse-warm"
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} /></motion.span>
            : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={22} /></motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-6 z-[90] w-80 sm:w-96 glass rounded-3xl shadow-warm-xl border border-[var(--border)] flex flex-col overflow-hidden"
            style={{ maxHeight: '70vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-warm px-4 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm font-poppins">MY Cafe AI</p>
                <p className="text-white/70 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online</p>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[var(--bg-primary)]">
              {messages.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs
                    ${m.role === 'user' ? 'bg-cafe-warm' : 'bg-cafe-brown'}`}>
                    {m.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                  </div>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
                    ${m.role === 'user'
                      ? 'bg-cafe-warm text-white rounded-tr-sm'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-tl-sm'
                    }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full bg-cafe-brown flex items-center justify-center">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-[var(--bg-secondary)] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                    {[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 bg-cafe-warm rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 bg-[var(--bg-primary)] border-t border-[var(--border)] flex gap-2 overflow-x-auto no-scrollbar">
                {suggestions.slice(0, 3).map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-cafe-brown/10 text-cafe-brown dark:text-cafe-warm hover:bg-cafe-brown hover:text-white transition-all duration-200 font-medium">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 bg-[var(--bg-secondary)] border-t border-[var(--border)] flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask me anything..."
                className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm outline-none focus:border-cafe-warm transition-colors text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
              />
              <motion.button
                onClick={() => send()}
                whileTap={{ scale: 0.9 }}
                disabled={!input.trim() && !typing}
                className="w-9 h-9 rounded-xl bg-cafe-warm text-white flex items-center justify-center disabled:opacity-40 hover:bg-cafe-brown transition-colors flex-shrink-0"
              >
                <Send size={15} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}