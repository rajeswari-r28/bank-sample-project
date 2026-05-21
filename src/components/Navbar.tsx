import { useState } from 'react';
import { Shield, ChevronDown, Menu, X, Landmark, User, LogOut, Calculator } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export default function Navbar({ activeTab, setActiveTab, isLoggedIn, onLogout, onOpenLogin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = {
    personal: {
      label: 'Personal',
      items: ['Savings Accounts', 'Salary Accounts', 'Fixed Deposits', 'Recurring Deposits']
    },
    loans: {
      label: 'Loans',
      items: ['Home Loan', 'Car Loan', 'Personal Loan', 'Education Loan']
    },
    invest: {
      label: 'Invest & Insure',
      items: ['Mutual Funds', 'Life Insurance', 'General Insurance', 'National Pension Scheme']
    }
  };

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('home')}>
            <div className="p-2 bg-gradient-to-tr from-sky-500 to-emerald-500 rounded-xl shadow-lg shadow-sky-500/20">
              <Landmark className="h-6 width-6 text-white" />
            </div>
            <div>
              <span className="font-heading text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">
                APEX
              </span>
              <span className="font-heading text-xl font-bold tracking-tight text-accent-gold ml-1">
                BANK
              </span>
              <div className="text-[9px] text-sky-400 font-mono tracking-widest leading-none">TOMORROW'S BANKING TODAY</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleNav('home')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'home'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Home
            </button>

            {/* Dropdown menus */}
            {Object.entries(menuItems).map(([key, menu]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40">
                  {menu.label}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === key && (
                  <div className="absolute left-0 mt-0 w-56 rounded-xl glass-card p-2 shadow-xl shadow-black/40 ring-1 ring-white/10 animate-in fade-in slide-in-from-top-2 duration-250">
                    <div className="py-1">
                      {menu.items.map((item, idx) => (
                        <a
                          key={idx}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNav('home');
                          }}
                          className="block px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-sky-500/10 hover:text-sky-400 rounded-lg transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => handleNav('calculators')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'calculators'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Calculator className="h-4 w-4" />
              Calculators
            </button>

            <a
              href="#security-hub"
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
                setTimeout(() => {
                  document.getElementById('security-hub')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40"
            >
              <Shield className="h-4 w-4 text-emerald-400" />
              Safe Banking
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNav('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === 'dashboard'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800/80 text-white border border-slate-700/50 hover:bg-slate-700'
                  }`}
                >
                  <User className="h-4 w-4" />
                  My Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg border border-transparent hover:border-rose-500/20 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNav('onboard')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:text-sky-400 hover:bg-white/5 transition-all"
                >
                  Open Account
                </button>
                <button
                  onClick={onOpenLogin}
                  className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-medium text-sm text-white shadow-lg shadow-sky-500/20"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 group-hover:from-sky-400 group-hover:to-sky-500 transition-all duration-300"></span>
                  <span className="relative flex items-center gap-1.5">
                    Online Banking
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden glass-nav border-t border-white/5 px-2 pt-2 pb-4 space-y-1 sm:px-3 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left block px-3 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'home' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('calculators')}
            className={`w-full text-left block px-3 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'calculators' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            Calculators
          </button>
          <button
            onClick={() => {
              handleNav('home');
              setTimeout(() => {
                document.getElementById('security-hub')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-full text-left block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white"
          >
            Safe Banking
          </button>
          
          <div className="border-t border-white/5 my-2 pt-2">
            {isLoggedIn ? (
              <div className="space-y-1">
                <button
                  onClick={() => handleNav('dashboard')}
                  className="w-full text-left block px-3 py-2.5 rounded-lg text-base font-medium text-emerald-400 bg-emerald-500/10"
                >
                  My Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="w-full text-left block px-3 py-2.5 rounded-lg text-base font-medium text-rose-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2 px-3">
                <button
                  onClick={() => handleNav('onboard')}
                  className="w-full py-2 text-center rounded-lg text-slate-300 font-medium hover:text-white"
                >
                  Open Savings Account
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 text-center rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-medium shadow-lg"
                >
                  Online Banking Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
