import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldAlert, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('password');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [mockOtpCode, setMockOtpCode] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  if (!isOpen) return null;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'demo' && password === 'password') {
      setError('');
      setIsSendingOtp(true);
      setTimeout(() => {
        setIsSendingOtp(false);
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setMockOtpCode(code);
        setStep(2);
      }, 1000);
    } else {
      setError('Invalid username or password. (Use demo / password)');
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === mockOtpCode || otp === '123456') {
      setError('');
      onLoginSuccess();
      onClose();
      // Reset
      setStep(1);
      setUsername('demo');
      setPassword('password');
      setOtp('');
      setMockOtpCode(null);
    } else {
      setError('Invalid OTP code. Check the simulated SMS alert.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        
        {/* Header decoration */}
        <div className="h-1.5 bg-gradient-to-r from-sky-500 via-emerald-500 to-accent-gold"></div>

        {/* Modal content */}
        <div className="p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl font-bold text-white">Online Banking Login</h3>
            <p className="text-xs text-slate-400 mt-1">Access your secure personal accounts dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs text-slate-400 font-medium">User ID / Username</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none"
                    placeholder="Enter User ID"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs text-slate-400 font-medium">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none"
                    placeholder="Enter Password"
                  />
                </div>
              </div>

              <div className="text-left py-1 text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-0.5">Demo Mode Credentials:</span>
                <span>Username: <strong className="text-white font-mono">demo</strong> | Password: <strong className="text-white font-mono">password</strong></span>
              </div>

              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSendingOtp ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Requesting OTP Security Key...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Proceed Securely</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleStep2Submit} className="space-y-5">
              {mockOtpCode && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex flex-col gap-1 text-left animate-bounce">
                  <span className="font-bold flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-accent-gold" />
                    Simulated SMS Notification:
                  </span>
                  <span>Your secure One-Time Password (OTP) is <strong className="text-white text-sm font-mono tracking-wider">{mockOtpCode}</strong>. Use this to authorize login.</span>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs text-slate-400 font-medium block">One-Time Password (OTP)</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none text-center font-mono tracking-widest text-lg"
                    placeholder="------"
                  />
                </div>
                <p className="text-[10px] text-slate-500">Sent to register mobile ending in +91 ***** 3280</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium hover:text-white transition-all text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="h-4 w-4" />
                  <span>Verify & Login</span>
                </button>
              </div>
            </form>
          )}

          {/* Secure disclaimer */}
          <div className="mt-8 border-t border-slate-900 pt-6 flex items-center justify-center gap-2 text-[10px] text-slate-500">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>ApexBank Virtual Safe Authentication Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
}
