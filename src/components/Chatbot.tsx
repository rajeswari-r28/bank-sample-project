import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hello! I am Apexa, your Virtual Financial Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    { label: 'Check FD Rates', text: 'What are the current FD Interest Rates?' },
    { label: 'Block Card', text: 'I want to block my debit card immediately' },
    { label: 'Home Loan Eligibility', text: 'How do I apply for a Home Loan?' },
    { label: 'Is my money secure?', text: 'What security measures do you have?' }
  ];

  const botResponses: Record<string, string> = {
    'fd': "📊 Our Fixed Deposit (FD) rates are at an all-time high! \n• Apex Savings Account: 7.25% to 7.50% p.a.\n• Regular Fixed Deposits: up to 7.80% p.a.\n• Senior Citizens Deposits: up to 8.30% p.a.",
    'block': "🚨 Card Blocking Protocol activated. If you have lost your card, please call our 24x7 emergency helpline at 1800-420-2739 immediately. In your online portal, navigate to the Dashboard and toggle the lock under security settings.",
    'loan': "🏡 Home Loans starting at 8.25% p.a. and Car Loans at 8.75% p.a. interest. Try our EMI calculator on the main page to find the exact principal and interest breakdown. To apply, complete our online onboarding wizard.",
    'secure': "🛡️ ApexBank is fully secure! We utilize military-grade 256-bit SSL encryption, automated logout sessions, and Multi-Factor Authentications (OTP) for every transfer. We will never ask you for your PIN, OTP, or passwords."
  };

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    if (text.includes('fd') || text.includes('rate') || text.includes('interest')) {
      return botResponses.fd;
    }
    if (text.includes('block') || text.includes('lost') || text.includes('card')) {
      return botResponses.block;
    }
    if (text.includes('loan') || text.includes('home') || text.includes('car') || text.includes('emi')) {
      return botResponses.loan;
    }
    if (text.includes('secure') || text.includes('safe') || text.includes('security')) {
      return botResponses.secure;
    }
    return "I appreciate your query! As a simulated assistant, I can help you with FD Rates, blocking lost cards, home loans, and general security. Please type one of these topics or click a quick-reply chip below!";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      const botMsg: Message = {
        sender: 'bot',
        text: getBotResponse(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white shadow-xl shadow-sky-500/20 border border-white/10 flex items-center justify-center animate-bounce duration-1000"
          title="Apex Virtual Assistant"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
          </span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[480px] rounded-3xl glass-card border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-tr from-sky-500 to-emerald-500 rounded-lg text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-none">Apexa Assistant</span>
                <span className="text-[9px] text-emerald-400 flex items-center gap-1 mt-0.5 leading-none">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Online Support Sim
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    msg.sender === 'bot'
                      ? 'bg-gradient-to-tr from-sky-500 to-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-200'
                  }`}
                >
                  {msg.sender === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>

                {/* Bubble */}
                <div className="space-y-0.5 text-left">
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line border ${
                      msg.sender === 'bot'
                        ? 'bg-slate-900/60 text-slate-300 border-white/5 rounded-tl-none'
                        : 'bg-sky-500/10 text-sky-400 border-sky-500/20 rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[8px] text-slate-500 block px-1">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          <div className="px-4 py-2 border-t border-white/5 space-y-1.5 bg-slate-900/20 text-left">
            <span className="text-[9px] uppercase font-bold text-slate-500 block">Suggested Queries</span>
            <div className="flex flex-wrap gap-1">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(reply.text)}
                  className="px-2 py-1 text-[9px] font-medium rounded-md border border-slate-800 text-slate-400 bg-slate-900/50 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-3 bg-slate-950 border-t border-white/5 flex gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about loans, deposits, safety..."
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/10 flex items-center justify-center shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
