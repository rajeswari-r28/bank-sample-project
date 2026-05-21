import { useState } from 'react';
import { 
  CreditCard, ArrowUpRight, ArrowDownLeft, Shield, 
  Send, Landmark, RefreshCw, CheckCircle2, AlertTriangle, Download 
} from 'lucide-react';

interface DashboardProps {
  userAccount: any | null;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  amount: number;
  status: 'Completed' | 'Pending';
}

export default function Dashboard({ userAccount }: DashboardProps) {
  // Setup default account if onboarding wasn't done
  const account = userAccount || {
    fullName: 'John Doe',
    accountNo: '9820-2104-5892-1209',
    customerId: '592810',
    balance: 250000,
    ifsc: 'APEX0000210',
    branch: 'Mumbai Central Branch',
    accountType: 'Apex Prime Savings'
  };

  const [balance, setBalance] = useState<number>(account.balance);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'transfer' | 'bills'>('overview');

  // Transactions State
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TXN1029', date: 'May 20, 2026', description: 'Credited interest - FD MAT', type: 'credit', amount: 45000, status: 'Completed' },
    { id: 'TXN1028', date: 'May 18, 2026', description: 'Tata Power Electricity Bill', type: 'debit', amount: 2450, status: 'Completed' },
    { id: 'TXN1027', date: 'May 15, 2026', description: 'Transfer to Alice (Acc: ...3082)', type: 'debit', amount: 15000, status: 'Completed' },
    { id: 'TXN1026', date: 'May 12, 2026', description: 'Atm Cash Withdrawal', type: 'debit', amount: 10000, status: 'Completed' },
    { id: 'TXN1025', date: 'May 10, 2026', description: 'Salary Credit - Apex Corp', type: 'credit', amount: 120000, status: 'Completed' }
  ]);

  // Transfer Form State
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryAcc, setBeneficiaryAcc] = useState('');
  const [beneficiaryIfsc, setBeneficiaryIfsc] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferStep, setTransferStep] = useState<1 | 2 | 3>(1); // 1: Form, 2: OTP, 3: Success
  const [transferOtp, setTransferOtp] = useState('');
  const [mockTransferOtp, setMockTransferOtp] = useState<string>('');
  const [transferError, setTransferError] = useState('');

  // Bill Pay Form State
  const [billType, setBillType] = useState('Electricity');
  const [billProvider, setBillProvider] = useState('Tata Power');
  const [consumerNo, setConsumerNo] = useState('');
  const [billAmount, setBillAmount] = useState('1850');
  const [billStep, setBillStep] = useState<1 | 2>(1); // 1: Form, 2: Success
  const [billError, setBillError] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Fund Transfer Submissions
  const handleInitiateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(transferAmount);
    if (isNaN(amt) || amt <= 0) {
      setTransferError('Please enter a valid amount.');
      return;
    }
    if (amt > balance) {
      setTransferError('Insufficient account balance.');
      return;
    }
    if (!beneficiaryAcc || !beneficiaryName) {
      setTransferError('Please fill out all fields.');
      return;
    }

    setTransferError('');
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setMockTransferOtp(code);
    setTransferStep(2);
  };

  const handleVerifyTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (transferOtp === mockTransferOtp || transferOtp === '123456') {
      const amt = Number(transferAmount);
      setBalance((prev) => prev - amt);
      
      const newTxn: Transaction = {
        id: 'TXN' + Math.floor(1000 + Math.random() * 9000).toString(),
        date: 'Today, ' + new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: `Transfer to ${beneficiaryName} (Acc: ...${beneficiaryAcc.slice(-4)})`,
        type: 'debit',
        amount: amt,
        status: 'Completed'
      };

      setTransactions((prev) => [newTxn, ...prev]);
      setTransferStep(3);
    } else {
      setTransferError('Invalid OTP code. Please check SMS alert.');
    }
  };

  const resetTransfer = () => {
    setBeneficiaryName('');
    setBeneficiaryAcc('');
    setBeneficiaryIfsc('');
    setTransferAmount('');
    setTransferOtp('');
    setTransferStep(1);
    setTransferError('');
  };

  // Bill Pay Submission
  const handlePayBill = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(billAmount);
    if (!consumerNo) {
      setBillError('Please enter Consumer / Subscriber Number.');
      return;
    }
    if (amt > balance) {
      setBillError('Insufficient account balance to pay this bill.');
      return;
    }

    setBalance((prev) => prev - amt);
    const newTxn: Transaction = {
      id: 'TXN' + Math.floor(1000 + Math.random() * 9000).toString(),
      date: 'Today, ' + new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: `${billProvider} ${billType} Payment`,
      type: 'debit',
      amount: amt,
      status: 'Completed'
    };

    setTransactions((prev) => [newTxn, ...prev]);
    setBillStep(2);
    setBillError('');
  };

  const resetBill = () => {
    setConsumerNo('');
    setBillStep(1);
    setBillError('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24 text-left font-sans">
      
      {/* Dashboard Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-xs text-sky-400 font-mono tracking-wider uppercase font-semibold">Customer Dashboard</span>
          <h2 className="text-3xl font-bold font-heading text-white mt-1">Welcome, {account.fullName}</h2>
          <p className="text-xs text-slate-400">Secure simulated session | Branch: {account.branch}</p>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold ${
              activeSubTab === 'overview'
                ? 'bg-sky-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSubTab('transfer')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold ${
              activeSubTab === 'transfer'
                ? 'bg-sky-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Transfer Funds
          </button>
          <button
            onClick={() => setActiveSubTab('bills')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold ${
              activeSubTab === 'bills'
                ? 'bg-sky-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pay Bills
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Account info card & calculators/services */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Main Account Balance Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] tracking-wider uppercase font-bold text-sky-400">{account.accountType}</span>
                <span className="text-xs text-slate-500 block font-mono mt-1">{account.accountNo}</span>
              </div>
              <Landmark className="h-6 w-6 text-sky-400 opacity-60" />
            </div>

            <div className="space-y-1 mb-6">
              <span className="text-xs text-slate-400">Available Balance</span>
              <h3 className="text-3xl font-heading font-extrabold text-white text-glow-blue font-mono tracking-tight">
                {formatCurrency(balance)}
              </h3>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs">
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-bold block">IFSC Code</span>
                <span className="font-mono text-slate-300 font-bold">{account.ifsc}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-bold block">Customer ID</span>
                <span className="font-mono text-slate-300 font-bold">{account.customerId}</span>
              </div>
            </div>
          </div>

          {/* Simulated Credit Card Info */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent-gold">APEX ELITE SIGNATURE</span>
                <span className="text-xs text-slate-500 block font-mono mt-1">**** **** **** 4892</span>
              </div>
              <CreditCard className="h-5 w-5 text-accent-gold opacity-80" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-bold block">Minimum Due</span>
                <span className="text-slate-300 font-mono font-bold">₹0.00</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-bold block">Total Outstanding</span>
                <span className="text-rose-400 font-mono font-bold">₹2,840.50</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => {
                  setBillType('Credit Card');
                  setBillProvider('Apex Credit Cards');
                  setConsumerNo('4892');
                  setBillAmount('2840');
                  setActiveSubTab('bills');
                }}
                className="text-[10px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                Pay Outstanding Bill <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Quick Security Tip Card */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-xs flex gap-3 text-slate-400">
            <Shield className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-300 block mb-0.5">Secure Transaction Tips</span>
              Always verify payee names and check the URL for genuine SSL certificates before initiating fund transfers.
            </div>
          </div>

        </div>

        {/* Right Columns (lg:col-span-2): Active Panel Content */}
        <div className="lg:col-span-2">
          
          {activeSubTab === 'overview' && (
            <div className="space-y-6">
              {/* Analytics SVG Bar Chart */}
              <div className="glass-card rounded-3xl p-6 shadow-md border border-white/5">
                <h4 className="text-sm font-bold text-white mb-6 font-heading">Monthly Spending vs Savings</h4>
                
                {/* Visual SVG bar graphs */}
                <div className="h-48 flex items-end justify-between gap-6 px-4">
                  {[
                    { month: 'Jan', spend: 65, save: 85 },
                    { month: 'Feb', spend: 40, save: 90 },
                    { month: 'Mar', spend: 75, save: 70 },
                    { month: 'Apr', spend: 55, save: 100 },
                    { month: 'May', spend: 30, save: 110 }
                  ].map((data, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="w-full flex gap-1.5 h-full items-end justify-center">
                        {/* Spending Bar */}
                        <div 
                          className="w-3 md:w-5 bg-rose-500/70 hover:bg-rose-500 rounded-t-sm transition-all duration-300"
                          style={{ height: `${(data.spend / 120) * 100}%` }}
                          title={`Spending: ₹${data.spend}k`}
                        ></div>
                        {/* Savings Bar */}
                        <div 
                          className="w-3 md:w-5 bg-emerald-500/70 hover:bg-emerald-500 rounded-t-sm transition-all duration-300"
                          style={{ height: `${(data.save / 120) * 100}%` }}
                          title={`Savings: ₹${data.save}k`}
                        ></div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{data.month}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-6 justify-center text-[10px] font-semibold">
                  <div className="flex items-center gap-1.5 text-rose-400">
                    <span className="w-2.5 h-2.5 bg-rose-500 rounded-sm"></span>
                    Monthly Spendings
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></span>
                    Monthly Savings
                  </div>
                </div>
              </div>

              {/* Transactions Ledger */}
              <div className="glass-card rounded-3xl p-6 shadow-md border border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-bold text-white font-heading">Recent Transactions</h4>
                  <div className="flex items-center gap-2">
                    <a
                      href="/apexbank_statement.csv"
                      download
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg"
                    >
                      <Download className="h-3 w-3" /> Export CSV
                    </a>
                    <button className="text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-bold bg-sky-500/10 border border-sky-500/20 px-2.5 py-1.5 rounded-lg">
                      <RefreshCw className="h-3.5 w-3.5" /> Refresh
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider text-[9px] text-left">
                        <th className="pb-3 font-semibold">Txn ID</th>
                        <th className="pb-3 font-semibold">Date</th>
                        <th className="pb-3 font-semibold">Description</th>
                        <th className="pb-3 font-semibold">Type</th>
                        <th className="pb-3 font-semibold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {transactions.map((txn) => (
                        <tr key={txn.id} className="hover:bg-slate-900/20">
                          <td className="py-3.5 font-mono text-[10px] text-slate-500">{txn.id}</td>
                          <td className="py-3.5 text-slate-400">{txn.date}</td>
                          <td className="py-3.5 text-slate-200 font-medium">{txn.description}</td>
                          <td className="py-3.5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              txn.type === 'credit' 
                                ? 'bg-emerald-500/10 text-emerald-400' 
                                : 'bg-rose-500/10 text-rose-400'
                            }`}>
                              {txn.type === 'credit' ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                              {txn.type}
                            </span>
                          </td>
                          <td className={`py-3.5 text-right font-mono font-bold ${
                            txn.type === 'credit' ? 'text-emerald-400' : 'text-slate-300'
                          }`}>
                            {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeSubTab === 'transfer' && (
            <div className="glass-card rounded-3xl p-6 md:p-8 shadow-md border border-white/5">
              <div className="text-left mb-6">
                <h4 className="text-base font-bold text-white font-heading">Fund Transfer Simulation</h4>
                <p className="text-xs text-slate-400">Transfer money to any mock bank account securely</p>
              </div>

              {transferError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{transferError}</span>
                </div>
              )}

              {transferStep === 1 && (
                <form onSubmit={handleInitiateTransfer} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-medium">Beneficiary Full Name</label>
                      <input
                        type="text"
                        required
                        value={beneficiaryName}
                        onChange={(e) => setBeneficiaryName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none"
                        placeholder="Alice Smith"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-medium">Account Number</label>
                      <input
                        type="text"
                        required
                        value={beneficiaryAcc}
                        onChange={(e) => setBeneficiaryAcc(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none font-mono"
                        placeholder="Enter 12-16 digit account"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-medium">Bank IFSC Code</label>
                      <input
                        type="text"
                        required
                        value={beneficiaryIfsc}
                        onChange={(e) => setBeneficiaryIfsc(e.target.value.toUpperCase())}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none font-mono"
                        placeholder="SBIN0002840 / APEX0000210"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-medium">Transfer Amount (INR)</label>
                      <input
                        type="number"
                        required
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none font-mono font-bold"
                        placeholder="₹ Amount to transfer"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-lg shadow-sky-500/10 flex items-center gap-1.5"
                    >
                      <Send className="h-4 w-4" />
                      <span>Initiate Transfer</span>
                    </button>
                  </div>
                </form>
              )}

              {transferStep === 2 && (
                <form onSubmit={handleVerifyTransfer} className="space-y-6 max-w-sm mx-auto text-center py-4">
                  {mockTransferOtp && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex flex-col gap-1 text-left animate-bounce">
                      <span className="font-bold flex items-center gap-1">
                        🔑 SMS OTP Authorization:
                      </span>
                      <span>Your OTP to approve transfer of <strong className="text-white">{formatCurrency(Number(transferAmount))}</strong> to <strong className="text-white">{beneficiaryName}</strong> is <strong className="text-white text-sm font-mono tracking-wider">{mockTransferOtp}</strong>.</span>
                    </div>
                  )}

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs text-slate-400 font-medium block">Enter Security Key OTP</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={transferOtp}
                      onChange={(e) => setTransferOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none text-center font-mono tracking-widest text-lg"
                      placeholder="------"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTransferStep(1)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium hover:text-white transition-all text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs shadow-lg"
                    >
                      Confirm Transfer
                    </button>
                  </div>
                </form>
              )}

              {transferStep === 3 && (
                <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-heading text-lg font-bold text-white">Transfer Successful!</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatCurrency(Number(transferAmount))} has been transferred to {beneficiaryName}
                    </p>
                  </div>
                  <div className="max-w-xs mx-auto p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left text-[10px] space-y-1.5 font-mono text-slate-400">
                    <div><span className="text-slate-500">Beneficiary:</span> {beneficiaryName}</div>
                    <div><span className="text-slate-500">Account No:</span> ...{beneficiaryAcc.slice(-4)}</div>
                    <div><span className="text-slate-500">IFSC Code:</span> {beneficiaryIfsc}</div>
                    <div><span className="text-slate-500">Reference No:</span> APX{Math.floor(100000 + Math.random() * 900000)}</div>
                  </div>
                  <button
                    onClick={resetTransfer}
                    className="px-5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs"
                  >
                    Send Another Transfer
                  </button>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'bills' && (
            <div className="glass-card rounded-3xl p-6 md:p-8 shadow-md border border-white/5">
              <div className="text-left mb-6">
                <h4 className="text-base font-bold text-white font-heading">Utility Bill Payments</h4>
                <p className="text-xs text-slate-400">Settle your utility bills instantly via direct savings debit</p>
              </div>

              {billError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{billError}</span>
                </div>
              )}

              {billStep === 1 ? (
                <form onSubmit={handlePayBill} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-medium">Utility Category</label>
                      <select
                        value={billType}
                        onChange={(e) => {
                          setBillType(e.target.value);
                          if (e.target.value === 'Electricity') {
                            setBillProvider('Tata Power');
                            setBillAmount('1850');
                          } else if (e.target.value === 'Water') {
                            setBillProvider('MCGM Water Department');
                            setBillAmount('450');
                          } else if (e.target.value === 'Credit Card') {
                            setBillProvider('Apex Credit Cards');
                            setBillAmount('2840');
                          } else {
                            setBillProvider('Airtel Mobile Postpaid');
                            setBillAmount('799');
                          }
                        }}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-xs text-slate-300 outline-none"
                      >
                        <option>Electricity</option>
                        <option>Water</option>
                        <option>Mobile Recharge</option>
                        <option>Credit Card</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-medium">Utility Provider</label>
                      <input
                        type="text"
                        disabled
                        value={billProvider}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-400 rounded-xl px-4 py-2.5 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-medium">Consumer ID / Card Number</label>
                      <input
                        type="text"
                        required
                        value={consumerNo}
                        onChange={(e) => setConsumerNo(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none font-mono"
                        placeholder="Enter reference ID"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-medium">Bill Due Amount (INR)</label>
                      <input
                        type="text"
                        disabled
                        value={formatCurrency(Number(billAmount))}
                        className="w-full bg-slate-950 border border-slate-800 text-emerald-400 rounded-xl px-4 py-2.5 text-xs outline-none font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/10 flex items-center gap-1.5"
                    >
                      <span>Pay Bill Instantly</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-heading text-lg font-bold text-white">Bill Succeeded!</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatCurrency(Number(billAmount))} paid successfully to {billProvider}
                    </p>
                  </div>
                  <button
                    onClick={resetBill}
                    className="px-5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs"
                  >
                    Pay Another Bill
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
