/**
 * AIAssistant.jsx — Full-page AI chatbot + voice assistant
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Mic, MicOff, Volume2, Sparkles, RotateCcw } from 'lucide-react';
import { getGeminiResponse, suggestions } from '../services/gemini';

const WELCOME = "Hello! I'm your MY Cafe AI Assistant ☕ I can help you with menu recommendations, table reservations, today's specials, and much more. How can I help you?";

/* ── Voice Assistant helpers ── */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const synth = window.speechSynthesis;

function speak(text) {
  if (!synth) return;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text.replace(/[☕🍵🍕🎁✨😊👑🌿🎓]/g, ''));
  utter.rate = 0.95;
  utter.pitch = 1.05;
  synth.speak(utter);
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([{ role: 'ai', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const recognitionRef = useRef(null);
  const messagesRef = useRef(messages);
  const bottomRef = useRef(null);

  // Sync ref with state for API calls
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Handle Speech Recognition Init
  useEffect(() => {
    if (!SpeechRecognition) return;
    
    const r = new SpeechRecognition();
    r.continuous = false;
    r.interimResults = false;
    r.lang = 'en-US'; // Using more universal default for better compatibility

    r.onstart = () => {
      setListening(true);
      setErrorMsg('');
    };

    r.onresult = e => {
      const transcript = e.results[0][0].transcript;
      if (transcript) {
        // Voice input -> Should reply with voice
        sendMsg(transcript, true);
      }
    };

    r.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      setListening(false);
      if (event.error === 'audio-capture') {
        setErrorMsg('Microphone not found or access denied.');
      } else if (event.error === 'not-allowed') {
        setErrorMsg('Please allow microphone access in your browser settings.');
      } else if (event.error === 'no-speech') {
        setErrorMsg('No speech detected. Please try again.');
      } else {
        setErrorMsg(`Mic error: ${event.error}`);
      }
    };

    r.onend = () => setListening(false);
    
    recognitionRef.current = r;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const sendMsg = async (text, shouldSpeak = false) => {
    const msg = text || input.trim();
    if (!msg) return;

    // Clear input immediately
    setInput('');
    setErrorMsg('');

    // Update messages using functional update to avoid stale closures
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setTyping(true);

    try {
      // Use the ref for history to ensure we have the absolute latest
      const reply = await getGeminiResponse(msg, messagesRef.current);
      
      setTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
      
      // Voice Assistant mode: only speak if input was voice
      if (shouldSpeak) {
        setSpeaking(true);
        speak(reply);
        const duration = (reply.split(' ').length * 150) + 1200;
        setTimeout(() => setSpeaking(false), Math.min(duration, 8000));
      }
    } catch (err) {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I encountered an error. Please try again." }]);
    }
  };

  const toggleListen = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    
    if (listening) {
      recognitionRef.current.stop();
    } else {
      // Prime speech synthesis on user gesture
      if (synth && synth.speaking) synth.cancel();
      const silent = new SpeechSynthesisUtterance('');
      silent.volume = 0;
      try { synth.speak(silent); } catch(e) {}

      try {
        setErrorMsg('');
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start recognition:", err);
        if (err.name === 'InvalidStateError') {
          // Already started, stop and restart
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current.start(), 200);
        } else {
          setErrorMsg('Failed to start microphone.');
        }
      }
    }
  };

  const clearChat = () => {
    synth?.cancel();
    setMessages([{ role: 'ai', text: WELCOME }]);
    setErrorMsg('');
  };

  return (
    <div className="page-wrapper pt-20 min-h-screen bg-[var(--bg-secondary)] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-dark py-12 text-center px-4 border-b border-[var(--border)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-warm mx-auto flex items-center justify-center mb-4 shadow-glow animate-float">
            <Bot size={28} className="text-white" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            MY Cafe AI Assistant
          </h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Powered by Gemini AI · Voice-enabled · Always available
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/50">Online & Ready</span>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 flex flex-col gap-4">
        {/* Voice feature banner / Errors */}
        <AnimatePresence mode="wait">
          {errorMsg ? (
            <motion.div key="error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/25">
              <MicOff size={18} className="text-red-500" />
              <p className="text-sm text-red-600 flex-1 font-medium">{errorMsg}</p>
              <button onClick={() => setErrorMsg('')} className="text-red-400 hover:text-red-600">✕</button>
            </motion.div>
          ) : SpeechRecognition ? (
            <motion.div key="banner" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-cafe-warm/10 border border-cafe-warm/25">
              <Mic size={18} className="text-cafe-warm" />
              <p className="text-sm text-[var(--text-secondary)] flex-1">
                <span className="font-semibold text-cafe-warm">Voice mode active.</span> Click the mic to speak your order or question.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Suggested prompts */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button key={s} onClick={() => sendMsg(s)}
                className="text-xs px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-cafe-warm hover:text-cafe-warm transition-all duration-200 font-medium">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 bg-[var(--bg-primary)] rounded-3xl border border-[var(--border)] flex flex-col overflow-hidden shadow-warm-lg" style={{ minHeight: '400px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 ${m.role === 'user' ? 'bg-cafe-warm' : 'bg-gradient-warm'
                  }`}>
                  {m.role === 'user' ? '👤' : <Bot size={14} />}
                </div>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                    ? 'bg-cafe-warm text-white rounded-tr-sm'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-tl-sm border border-[var(--border)]'
                  }`}>
                  {m.text}
                  {m.role === 'ai' && (
                    <button onClick={() => { setSpeaking(true); speak(m.text); setTimeout(() => setSpeaking(false), 4000); }}
                      className="ml-2 text-[var(--text-muted)] hover:text-cafe-warm transition-colors inline-flex align-middle">
                      <Volume2 size={12} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-warm flex items-center justify-center">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border)] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-2 h-2 rounded-full bg-cafe-warm animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="p-4 border-t border-[var(--border)] flex gap-3 items-center bg-[var(--bg-secondary)]">
            {/* Voice */}
            <motion.button
              onClick={toggleListen}
              whileTap={{ scale: 0.9 }}
              title={SpeechRecognition ? 'Voice input' : 'Voice not supported in this browser'}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 ${listening
                  ? 'bg-red-500 text-white animate-pulse-warm'
                  : SpeechRecognition
                    ? 'bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-muted)] hover:border-cafe-warm hover:text-cafe-warm'
                    : 'bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-muted)] opacity-40 cursor-not-allowed'
                }`}
            >
              {listening ? <MicOff size={16} /> : <Mic size={16} />}
            </motion.button>

            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder={listening ? '🎤 Listening...' : 'Ask me anything about MY Cafe...'}
              className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cafe-warm transition-colors text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />

            <motion.button
              onClick={() => sendMsg()}
              whileTap={{ scale: 0.9 }}
              disabled={!input.trim() && !typing}
              className="w-10 h-10 rounded-xl bg-cafe-warm text-white flex items-center justify-center disabled:opacity-40 hover:bg-cafe-brown transition-colors flex-shrink-0"
            >
              <Send size={16} />
            </motion.button>

            <motion.button onClick={clearChat} whileTap={{ scale: 0.9 }}
              title="Clear chat"
              className="w-10 h-10 rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-cafe-warm hover:border-cafe-warm transition-colors flex items-center justify-center flex-shrink-0">
              <RotateCcw size={15} />
            </motion.button>
          </div>
        </div>

        {/* Speaking indicator */}
        <AnimatePresence>
          {speaking && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[var(--bg-primary)] border border-cafe-warm/25 shadow-warm-sm">
              <div className="flex gap-1 items-center h-6">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="waveform-bar h-full" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <p className="text-xs text-[var(--text-secondary)]"><span className="font-semibold text-cafe-warm">AI is speaking</span> — tap the 🔊 icon on any message to replay</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          {[
            { icon: '☕', label: 'Menu Help', desc: 'Personalized recommendations' },
            { icon: '📅', label: 'Reservations', desc: 'Book a table instantly' },
            { icon: '🎁', label: 'Offers', desc: 'Today\'s deals & specials' },
            { icon: '🎤', label: 'Voice Mode', desc: 'Hands-free ordering' },
          ].map(f => (
            <div key={f.label} className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] text-center">
              <p className="text-2xl mb-1">{f.icon}</p>
              <p className="text-xs font-bold text-[var(--text-primary)]">{f.label}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}