import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import EMICalculator from './components/EMICalculator';
import FDCalculator from './components/FDCalculator';
import AccountOpeningWizard from './components/AccountOpeningWizard';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import { User, LogIn } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  
  // Custom account data generated from onboarding wizard
  const [userAccount, setUserAccount] = useState<any | null>(null);
  
  // Sub-tabs for calculators
  const [calcTab, setCalcTab] = useState<'emi' | 'fd'>('emi');

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  const handleOnboardSuccess = (accountData: any) => {
    setUserAccount(accountData);
    // User can login now or we auto-login
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white relative">
      
      {/* Navigation bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        onOpenLogin={() => setLoginModalOpen(true)} 
      />

      {/* Main Pages router */}
      <main className="flex-1 pb-16">
        
        {activeTab === 'home' && (
          <LandingPage 
            onOpenLogin={() => setLoginModalOpen(true)} 
            setActiveTab={setActiveTab} 
            isLoggedIn={isLoggedIn}
          />
        )}

        {activeTab === 'calculators' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24 text-center">
            <div className="max-w-2xl mx-auto mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-white">Financial Planning Tools</h2>
              <p className="text-xs text-slate-400 mt-2">Accurately project loans, interest yields, and compound growth returns</p>
              
              {/* Calculator Tab Switcher */}
              <div className="flex gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 max-w-xs mx-auto mt-6">
                <button
                  type="button"
                  onClick={() => setCalcTab('emi')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg ${
                    calcTab === 'emi' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EMI Loan Calculator
                </button>
                <button
                  type="button"
                  onClick={() => setCalcTab('fd')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg ${
                    calcTab === 'fd' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  FD Calculator
                </button>
              </div>
            </div>

            {/* Render Calculator */}
            {calcTab === 'emi' ? <EMICalculator /> : <FDCalculator />}
          </div>
        )}

        {activeTab === 'onboard' && (
          <AccountOpeningWizard 
            onSuccess={handleOnboardSuccess} 
            setActiveTab={setActiveTab} 
          />
        )}

        {activeTab === 'dashboard' && (
          isLoggedIn ? (
            <Dashboard 
              userAccount={userAccount} 
            />
          ) : (
            <div className="max-w-md mx-auto px-4 py-8 mt-32 text-center glass-card rounded-3xl p-8 border border-white/5 shadow-2xl space-y-6">
              <div className="mx-auto w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-400 border border-rose-500/20">
                <User className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold text-white">Login Required</h3>
                <p className="text-xs text-slate-400">Please authorize online banking to view savings dashboard features.</p>
              </div>
              
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] text-slate-400 text-left font-mono">
                <span className="text-sky-400 font-bold block mb-1">Demo Credentials:</span>
                <span>User: <strong className="text-white">demo</strong> | Pass: <strong className="text-white">password</strong></span>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-4 py-2 text-xs rounded-xl border border-slate-800 text-slate-300 font-semibold hover:text-white"
                >
                  Go Home
                </button>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="px-5 py-2 text-xs rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold flex items-center gap-1 shadow-lg"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Log In Securely</span>
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Floating Chatbot Assistant */}
      <Chatbot />

      {/* Footer */}
      <Footer />

      {/* Login modal simulation */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
    </div>
  );
}

export default App;
