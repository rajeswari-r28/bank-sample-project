import { useState } from 'react';
import { Coins, TrendingUp, Calendar } from 'lucide-react';

export default function FDCalculator() {
  const [investAmount, setInvestAmount] = useState<number>(1000000); // 10 Lakhs
  const [interestRate, setInterestRate] = useState<number>(7.25); // 7.25%
  const [tenure, setTenure] = useState<number>(5); // 5 years
  const [compoundFrequency, setCompoundFrequency] = useState<number>(4); // Quarterly (4 times a year) default

  // FD Formula: A = P * (1 + r/n)^(n*t)
  const P = investAmount;
  const r = interestRate / 100;
  const n = compoundFrequency;
  const t = tenure;

  const maturityAmount = Math.round(
    P * Math.pow(1 + r / n, n * t)
  );

  const interestEarned = maturityAmount - P;

  const interestRatio = (interestEarned / maturityAmount) * 100;
  const principalRatio = 100 - interestRatio;

  // SVG calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const interestStrokeDashoffset = circumference - (interestRatio / 100) * circumference;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
          <Coins className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-white text-left">Fixed Deposit (FD) Calculator</h3>
          <p className="text-xs text-slate-400 text-left">Calculate the maturity value and wealth growth of your savings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sliders and Configurations */}
        <div className="space-y-6">
          {/* Investment Amount Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <span className="text-emerald-400 font-mono">₹</span>
                Invested Amount
              </label>
              <span className="text-emerald-400 font-bold font-mono bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                {formatCurrency(investAmount)}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={investAmount}
              onChange={(e) => setInvestAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹10,000</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-sky-400" />
                Interest Rate (p.a.)
              </label>
              <span className="text-sky-400 font-bold font-mono bg-sky-500/10 px-3 py-1 rounded-lg border border-sky-500/20">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="12"
              step="0.05"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>3%</span>
              <span>12%</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-400" />
                Tenure
              </label>
              <span className="text-amber-400 font-bold font-mono bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                {tenure} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 Year</span>
              <span>10 Years</span>
            </div>
          </div>

          {/* Compounding frequency */}
          <div className="space-y-2 text-left">
            <label className="text-xs text-slate-400 font-medium block">Compounding Frequency</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Monthly', val: 12 },
                { label: 'Quarterly', val: 4 },
                { label: 'Half-Yearly', val: 2 },
                { label: 'Yearly', val: 1 }
              ].map((freq) => (
                <button
                  key={freq.val}
                  type="button"
                  onClick={() => setCompoundFrequency(freq.val)}
                  className={`px-1 py-2 text-[10px] font-bold rounded-lg border transition-all duration-200 ${
                    compoundFrequency === freq.val
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-md'
                      : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 relative flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full space-y-4 text-left">
            <div>
              <span className="text-xs text-slate-400 block">Total Maturity Value</span>
              <span className="text-2xl md:text-3xl font-heading font-extrabold text-white text-glow-emerald tracking-tight font-mono">
                {formatCurrency(maturityAmount)}
              </span>
            </div>
            <div className="h-px bg-slate-800"></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Principal Investment</span>
                <span className="text-sm font-bold text-slate-200 font-mono">{formatCurrency(investAmount)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Interest Earned</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{formatCurrency(interestEarned)}</span>
              </div>
            </div>
            <div className="h-px bg-slate-800"></div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Compound growth yield</span>
              <span className="text-xs font-mono font-bold bg-slate-800 px-2 py-0.5 rounded text-sky-400">
                +{( (interestEarned / P) * 100 ).toFixed(1)}% total return
              </span>
            </div>
          </div>

          {/* SVG Pie Chart */}
          <div className="relative shrink-0 flex items-center justify-center w-40 h-40">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="14"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-emerald-500"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={0}
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-sky-500 transition-all duration-300"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={interestStrokeDashoffset}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-[9px] uppercase font-bold text-slate-500">Wealth Ratio</span>
              <span className="text-xs font-bold text-emerald-500 font-mono">{principalRatio.toFixed(0)}% P</span>
              <span className="text-xs font-bold text-sky-400 font-mono">{interestRatio.toFixed(0)}% I</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
