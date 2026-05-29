import { useState } from 'react';
import {
  ShieldCheck, ArrowRight, ShieldAlert, BadgePercent, Coins,
  CreditCard, Sparkles, AlertTriangle, FileText, Download
} from 'lucide-react';

interface LandingPageProps {
  onOpenLogin: () => void;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
}

export default function LandingPage({ onOpenLogin, setActiveTab, isLoggedIn }: LandingPageProps) {
  // Scam Protection Simulator State
  const [scanUrl, setScanUrl] = useState('http://apexbank-kyc-verify-alert.org');
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const isGenuine = scanUrl.trim() === 'https://apexbank.com' || scanUrl.trim() === 'https://apexbank.com/login';
      setScanResult({
        scanned: true,
        genuine: isGenuine,
        msg: isGenuine
          ? '🟢 SAFE PORTAL: This matches our genuine secure login host. Always verify this before typing credentials.'
          : '🔴 PHISHING ALERT: This is a fraudulent website simulation! ApexBank NEVER hosts login pages on .org, .net, or non-SSL HTTP links.'
      });
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    if (action === 'loans' || action === 'rates') {
      setActiveTab('calculators');
    } else if (action === 'open') {
      setActiveTab('onboard');
    } else {
      // Balance, transfer, bills require dashboard
      if (isLoggedIn) {
        setActiveTab('dashboard');
      } else {
        onOpenLogin();
      }
    }
  };

  return (
    <div className="text-left font-sans mt-20">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-accent-gold" />
              <span>Simulated Personal Banking Experiencesss</span>
              <span>Test changes</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              The New Standard of <br />
              <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Secure Digital Banking
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Experience the visual elegance of modern financial management. Simulate real-time dashboard analytics, secure multi-factor money transfers, and interest growth calculators in our sandbox environment.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleQuickAction('open')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-sm shadow-xl shadow-sky-500/20 flex items-center gap-1.5"
              >
                <span>Open Instant Account</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onOpenLogin}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-800 hover:border-slate-700"
              >
                Log In to NetBanking
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-900 max-w-md">
              <div>
                <span className="text-2xl font-bold text-white font-heading">7.8%</span>
                <span className="text-[10px] text-slate-500 block uppercase font-semibold mt-0.5">FD Yield Rate</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white font-heading">Zero</span>
                <span className="text-[10px] text-slate-500 block uppercase font-semibold mt-0.5">Account Fees</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white font-heading">256-bit</span>
                <span className="text-[10px] text-slate-500 block uppercase font-semibold mt-0.5">MFA Encryption</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visuals (Dashboard mockup) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-sm rounded-3xl p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 border border-white/10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-[9px] font-bold text-sky-400 bg-sky-500/15 px-2 py-0.5 rounded uppercase">APEX PRIME SAVINGS</span>
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>

              {/* Account summary mock */}
              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-[9px] uppercase text-slate-500 font-bold">Total Balance</span>
                  <div className="text-3xl font-bold text-white font-mono mt-1">₹7,25,480.00</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 font-medium">Tata Power Utility</span>
                    <span className="text-rose-400 font-mono font-bold">-₹2,450.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 font-medium">Salary Credit</span>
                    <span className="text-emerald-400 font-mono font-bold">+₹1,20,000.00</span>
                  </div>
                </div>
              </div>

              {/* Graphic line chart preview */}
              <div className="space-y-2 text-left">
                <span className="text-[9px] text-slate-500 uppercase font-bold">Weekly Performance</span>
                <div className="h-16 flex items-end gap-2 px-1">
                  <div className="h-8 flex-1 bg-sky-500/20 border-t-2 border-sky-500 rounded-t-sm"></div>
                  <div className="h-12 flex-1 bg-sky-500/20 border-t-2 border-sky-500 rounded-t-sm"></div>
                  <div className="h-10 flex-1 bg-sky-500/20 border-t-2 border-sky-500 rounded-t-sm"></div>
                  <div className="h-16 flex-1 bg-gradient-to-t from-emerald-500/25 to-emerald-500/50 border-t-2 border-emerald-400 rounded-t-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Grid */}
      <section className="bg-slate-950 border-y border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { label: 'Check Balance', icon: Coins, action: 'balance' },
              { label: 'Quick Transfer', icon: ArrowRight, action: 'transfer' },
              { label: 'Pay Bills', icon: CreditCard, action: 'bills' },
              { label: 'Apply Loan', icon: BadgePercent, action: 'loans' },
              { label: 'Fixed Deposit', icon: Coins, action: 'rates' },
              { label: 'Open Account', icon: ShieldCheck, action: 'open' }
            ].map((srv, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(srv.action)}
                className="glass-card hover:bg-slate-900/60 p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-3 group text-center"
              >
                <div className="p-2.5 bg-slate-900 rounded-xl text-sky-400 group-hover:text-emerald-400 transition-colors">
                  <srv.icon className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-300 group-hover:text-white">{srv.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Rates Tables */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl font-bold text-white">Interest Rates & Currency Rates</h2>
          <p className="text-xs text-slate-400 mt-2">Leading industry yields. Earn high interest from day one.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fixed Deposit Rates */}
          <div className="glass-card rounded-3xl p-6 border border-white/5">
            <h3 className="text-sm font-bold text-white mb-4 font-heading">Fixed Deposits (FD) Rates (p.a.)</h3>
            <div className="space-y-3 text-xs">
              {[
                { tenure: '7 days to 45 days', rate: '4.50%', senior: '5.00%' },
                { tenure: '180 days to 289 days', rate: '6.25%', senior: '6.75%' },
                { tenure: '1 Year to 2 Years', rate: '7.25%', senior: '7.75%' },
                { tenure: '3 Years to 5 Years', rate: '7.50%', senior: '8.00%' },
                { tenure: '5 Years & Above (Tax Saver)', rate: '7.80%', senior: '8.30%' }
              ].map((rate, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-900 last:border-0">
                  <span className="text-slate-400">{rate.tenure}</span>
                  <div className="flex gap-4 font-mono font-bold">
                    <span className="text-sky-400">{rate.rate}</span>
                    <span className="text-emerald-400" title="Senior Citizens">{rate.senior}*</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-slate-500 mt-4">*Special senior citizen bonus rates of +0.50% included</p>
          </div>

          {/* Forex Exchange Rates */}
          <div className="glass-card rounded-3xl p-6 border border-white/5">
            <h3 className="text-sm font-bold text-white mb-4 font-heading">Foreign Exchange Rates (Forex)</h3>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-900 text-slate-500 font-semibold">
                  <th className="pb-2">Currency Pair</th>
                  <th className="pb-2">Buy Rate (INR)</th>
                  <th className="pb-2 text-right">Sell Rate (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {[
                  { pair: 'USD / INR (US Dollar)', buy: '83.15', sell: '83.75' },
                  { pair: 'EUR / INR (Euro)', buy: '90.20', sell: '90.95' },
                  { pair: 'GBP / INR (British Pound)', buy: '105.40', sell: '106.30' },
                  { pair: 'AED / INR (UAE Dirham)', buy: '22.60', sell: '22.85' },
                  { pair: 'SGD / INR (Singapore Dollar)', buy: '61.75', sell: '62.20' }
                ].map((forex, idx) => (
                  <tr key={idx} className="text-slate-300">
                    <td className="py-2.5">{forex.pair}</td>
                    <td className="py-2.5 font-mono text-emerald-400">{forex.buy}</td>
                    <td className="py-2.5 font-mono text-sky-400 text-right">{forex.sell}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Document Downloads Center */}
      <section className="bg-slate-900/10 border-t border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl font-bold text-white flex items-center justify-center gap-2">
              <FileText className="h-7 w-7 text-sky-400" />
              Apex Download Center
            </h2>
            <p className="text-xs text-slate-400 mt-2">Access mock files and resources relating to terms, forms, and statements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Terms and Conditions PDF */}
            <div className="glass-card rounded-2xl p-5 border border-white/5 flex items-start gap-4 hover:border-sky-500/25 transition-all">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
                <FileText className="h-6 w-6" />
              </div>
              <div className="space-y-2 flex-1 text-left">
                <h4 className="text-xs font-bold text-white">Terms & Conditions Policy</h4>
                <p className="text-[10px] text-slate-400 leading-normal">Outlines secure banking usage guidelines, privacy, and dispute policies.</p>
                <a
                  href="/banking_terms_and_rules.pdf"
                  download
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 hover:text-sky-300"
                >
                  <Download className="h-3 w-3" /> Download PDF File
                </a>
              </div>
            </div>

            {/* Loan Application DOCX */}
            <div className="glass-card rounded-2xl p-5 border border-white/5 flex items-start gap-4 hover:border-sky-500/25 transition-all">
              <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl">
                <FileText className="h-6 w-6" />
              </div>
              <div className="space-y-2 flex-1 text-left">
                <h4 className="text-xs font-bold text-white">Loan Application Form</h4>
                <p className="text-[10px] text-slate-400 leading-normal">Simulated Word doc form details requested details, income declaration, and signatures.</p>
                <a
                  href="/loan_application_form.docx"
                  download
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 hover:text-sky-300"
                >
                  <Download className="h-3 w-3" /> Download DOCX File
                </a>
              </div>
            </div>

            {/* Statement CSV */}
            <div className="glass-card rounded-2xl p-5 border border-white/5 flex items-start gap-4 hover:border-sky-500/25 transition-all">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <FileText className="h-6 w-6" />
              </div>
              <div className="space-y-2 flex-1 text-left">
                <h4 className="text-xs font-bold text-white">Sample Account Statement</h4>
                <p className="text-[10px] text-slate-400 leading-normal">A detailed ledger list of recent transactions formatted for spreadsheet analytics.</p>
                <a
                  href="/apexbank_statement.csv"
                  download
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 hover:text-sky-300"
                >
                  <Download className="h-3 w-3" /> Download CSV File
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scam Protection & Security Hub */}
      <section id="security-hub" className="bg-slate-900/30 border-t border-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Security left explanation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl inline-flex items-center gap-1.5">
                <ShieldAlert className="h-5 w-5" />
                <span className="text-xs font-bold uppercase">Apex Safe Banking Program</span>
              </div>

              <h2 className="font-heading text-3xl font-bold text-white">Protect Yourself From Online Phishing scams</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fraudulent callers and malicious links impersonate bank managers to harvest OTPs, PINs, and passwords. Remember: ApexBank or other reputable financial institutions will <strong>NEVER</strong> ask for your secure security codes or login passkeys.
              </p>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex gap-2">
                  <span className="text-rose-500 font-bold shrink-0">❌</span>
                  <span>Do not open SMS links requesting KYC upgrades or PAN linkages (e.g. `http://apex-kyc-alert.net`).</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>Always check the browser bar for `https://apexbank.com`. Look for SSL protection.</span>
                </div>
              </div>
            </div>

            {/* URL Checker Tool simulation */}
            <div className="lg:col-span-6">
              <div className="glass-card rounded-3xl p-6 border border-white/5 relative overflow-hidden">
                <h3 className="text-sm font-bold text-white mb-4 font-heading flex items-center gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                  URL Verification Simulator
                </h3>
                <p className="text-xs text-slate-400 mb-6">Type or select a website link to check its safety level</p>

                <form onSubmit={handleScanUrl} className="space-y-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] text-slate-500 font-bold uppercase">Target Website URL</label>
                    <input
                      type="text"
                      required
                      value={scanUrl}
                      onChange={(e) => setScanUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                    />
                  </div>

                  {/* Preset quick URL buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setScanUrl('https://apexbank.com')}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-850 hover:bg-slate-900 text-[10px] text-slate-400 font-mono"
                    >
                      Genuine Host
                    </button>
                    <button
                      type="button"
                      onClick={() => setScanUrl('http://apexbank-verify-alert.net/login')}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-855 hover:bg-slate-900 text-[10px] text-slate-400 font-mono"
                    >
                      Phishing Alert
                    </button>
                    <button
                      type="button"
                      onClick={() => setScanUrl('http://update-kyc-apexbank.in')}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-855 hover:bg-slate-900 text-[10px] text-slate-400 font-mono"
                    >
                      PAN/KYC scam link
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md"
                  >
                    {isScanning ? 'Scanning Security Keys...' : 'Verify safety status'}
                  </button>
                </form>

                {/* Scan Results Output */}
                {scanResult && (
                  <div className={`mt-5 p-4 rounded-2xl border text-xs text-left leading-relaxed font-medium animate-in slide-in-from-top-2 duration-200 ${scanResult.genuine
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}>
                    {scanResult.msg}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
