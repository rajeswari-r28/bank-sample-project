import { useState } from 'react';
import { Landmark, Percent, Calendar } from 'lucide-react';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // 50 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenure, setTenure] = useState<number>(20); // 20 years

  // EMI Formula: [P x R x (1+R)^N]/[((1+R)^N)-1]
  const P = loanAmount;
  const r = (interestRate / 12) / 100;
  const n = tenure * 12;

  const monthlyEMI = Math.round(
    (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  ) || 0;

  const totalAmountPayable = monthlyEMI * n;
  const totalInterestPayable = totalAmountPayable - P;

  const interestRatio = (totalInterestPayable / totalAmountPayable) * 100 || 0;
  const principalRatio = 100 - interestRatio;

  // SVG Donut Calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const interestStrokeDashoffset = circumference - (interestRatio / 100) * circumference;

  // Format helper (INR style Indian numbering)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl">
          <Landmark className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-white text-left">EMI Loan Calculator</h3>
          <p className="text-xs text-slate-400 text-left">Plan your Home, Car, or Personal Loan repayments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sliders Control Panel */}
        <div className="space-y-6">
          {/* Loan Amount Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <span className="text-sky-400 font-mono">₹</span>
                Loan Amount
              </label>
              <span className="text-sky-400 font-bold font-mono bg-sky-500/10 px-3 py-1 rounded-lg border border-sky-500/20">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              min="100000"
              max="20000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹1 Lakh</span>
              <span>₹2 Crores</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Percent className="h-4 w-4 text-emerald-400" />
                Interest Rate (p.a.)
              </label>
              <span className="text-emerald-400 font-bold font-mono bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>5%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-400" />
                Loan Tenure
              </label>
              <span className="text-amber-400 font-bold font-mono bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                {tenure} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 relative flex flex-col md:flex-row items-center gap-6">
          {/* Metrics Column */}
          <div className="flex-1 w-full space-y-4 text-left">
            <div>
              <span className="text-xs text-slate-400 block">Monthly Loan EMI</span>
              <span className="text-2xl md:text-3xl font-heading font-extrabold text-white text-glow-blue tracking-tight font-mono">
                {formatCurrency(monthlyEMI)}
              </span>
            </div>
            <div className="h-px bg-slate-800"></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Principal Loan</span>
                <span className="text-sm font-bold text-slate-200 font-mono">{formatCurrency(loanAmount)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Interest</span>
                <span className="text-sm font-bold text-sky-400 font-mono">{formatCurrency(totalInterestPayable)}</span>
              </div>
            </div>
            <div className="h-px bg-slate-800"></div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Amount Payable</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">{formatCurrency(totalAmountPayable)}</span>
            </div>
          </div>

          {/* SVG Pie Chart */}
          <div className="relative shrink-0 flex items-center justify-center w-40 h-40">
            <svg className="w-36 h-36 transform -rotate-90">
              {/* Principal Circle (Base) */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="14"
                fill="transparent"
              />
              {/* Principal Segment */}
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
              {/* Interest Segment overlay */}
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
              <span className="text-[9px] uppercase font-bold text-slate-500">Breakdown</span>
              <span className="text-xs font-bold text-emerald-500 font-mono">{principalRatio.toFixed(0)}% P</span>
              <span className="text-xs font-bold text-sky-400 font-mono">{interestRatio.toFixed(0)}% I</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
