import React, { useState } from 'react';
import { User, ShieldCheck, CreditCard, ChevronRight, CheckCircle2, CloudUpload, ArrowLeft } from 'lucide-react';

interface AccountOpeningWizardProps {
  onSuccess: (accountData: any) => void;
  setActiveTab: (tab: string) => void;
}

export default function AccountOpeningWizard({ onSuccess, setActiveTab }: AccountOpeningWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    idType: 'Aadhar Card',
    idNumber: '',
    accountType: 'Apex Prime Savings',
    initialDeposit: '10000',
  });

  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAccount, setCreatedAccount] = useState<any | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
    }
  };

  const nextStep = () => {
    setStep((prev) => (prev + 1) as any);
  };

  const prevStep = () => {
    setStep((prev) => (prev - 1) as any);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedAccNo = '9820' + Math.floor(100000000000 + Math.random() * 900000000000).toString();
      const generatedCustId = Math.floor(100000 + Math.random() * 900000).toString();
      
      const newAccount = {
        ...formData,
        accountNo: generatedAccNo.replace(/(\d{4})/g, '$1-').slice(0, 19),
        customerId: generatedCustId,
        balance: Number(formData.initialDeposit) || 10000,
        ifsc: 'APEX0000210',
        branch: 'Mumbai Central Branch'
      };
      
      setCreatedAccount(newAccount);
      onSuccess(newAccount);
      setStep(4);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-24">
      {/* Progress Stepper */}
      <div className="mb-10 max-w-xl mx-auto">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span className={step >= 1 ? 'text-sky-400' : ''}>Personal Details</span>
          <span className={step >= 2 ? 'text-sky-400' : ''}>KYC Identification</span>
          <span className={step >= 3 ? 'text-sky-400' : ''}>Product Choice</span>
          <span className={step >= 4 ? 'text-emerald-400' : ''}>Success</span>
        </div>
        <div className="relative mt-2 h-1 bg-slate-800 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl relative border border-white/5 overflow-hidden">
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
            <div className="text-left mb-6">
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <User className="h-5 w-5 text-sky-400" />
                Personal Information
              </h3>
              <p className="text-xs text-slate-400">Provide details as printed on official IDs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-xs text-slate-400 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs text-slate-400 font-medium">Date of Birth</label>
                <input
                  type="date"
                  required
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs text-slate-400 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs text-slate-400 font-medium">Mobile Number</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm shadow-lg shadow-sky-500/20"
              >
                Next Step
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
            <div className="text-left mb-6">
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-sky-400" />
                KYC Verification (Simulated)
              </h3>
              <p className="text-xs text-slate-400">Upload mock identity papers to authorize online setup</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-xs text-slate-400 font-medium">Identity Document Type</label>
                <select
                  name="idType"
                  value={formData.idType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-sm text-slate-300 outline-none"
                >
                  <option>Aadhar Card</option>
                  <option>PAN Card</option>
                  <option>Passport</option>
                  <option>Voter Card</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs text-slate-400 font-medium">Document ID Number</label>
                <input
                  type="text"
                  required
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                  placeholder="Enter Document number"
                />
              </div>
            </div>

            {/* Simulated file upload */}
            <div className="border border-dashed border-slate-800 bg-slate-900/30 rounded-2xl p-6 text-center">
              <input
                type="file"
                id="kyc-file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileUpload}
              />
              <label htmlFor="kyc-file" className="cursor-pointer flex flex-col items-center gap-2">
                <div className="p-3 bg-slate-800 rounded-full text-sky-400 mb-2">
                  <CloudUpload className="h-6 w-6" />
                </div>
                {uploadedFile ? (
                  <div>
                    <span className="text-xs text-emerald-400 font-bold block">{uploadedFile}</span>
                    <span className="text-[10px] text-slate-500 mt-1 block">Click to replace file</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs text-slate-300 font-medium block">Upload Identity Proof Document</span>
                    <span className="text-[10px] text-slate-500 mt-1 block">Support PNG, JPG, PDF up to 5MB</span>
                  </div>
                )}
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 text-sm font-semibold hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm shadow-lg"
              >
                Next Step
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left mb-6">
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-sky-400" />
                Select Account Type
              </h3>
              <p className="text-xs text-slate-400">Select product matching your personal wealth objectives</p>
            </div>

            {/* Options card grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {[
                {
                  name: 'Apex Prime Savings',
                  desc: 'High Yield Savings Account',
                  rate: '7.5% p.a.',
                  min: '₹10,000 Initial'
                },
                {
                  name: 'Apex Corporate Salary',
                  desc: 'Zero balance salary account',
                  rate: '6.0% p.a.',
                  min: '₹0 Minimum Balance'
                },
                {
                  name: 'Apex Wealth Builder',
                  desc: 'Savings + Investment portfolio',
                  rate: '7.8% p.a.',
                  min: '₹50,000 Initial'
                }
              ].map((accountOpt) => (
                <div
                  key={accountOpt.name}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      accountType: accountOpt.name,
                      initialDeposit: accountOpt.name === 'Apex Corporate Salary' ? '0' : '10000'
                    }));
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    formData.accountType === accountOpt.name
                      ? 'bg-sky-500/10 border-sky-500 text-white'
                      : 'border-slate-800 bg-slate-900/30 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <h4 className="text-xs font-bold font-heading">{accountOpt.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 mb-3">{accountOpt.desc}</p>
                  <div className="flex justify-between items-center text-[10px] font-semibold">
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{accountOpt.rate}</span>
                    <span className="text-slate-400">{accountOpt.min}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-left max-w-xs">
              <label className="text-xs text-slate-400 font-medium">Initial Opening Deposit (INR)</label>
              <input
                type="number"
                name="initialDeposit"
                value={formData.initialDeposit}
                onChange={handleInputChange}
                className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
                placeholder="10000"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 text-sm font-semibold hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 w-44"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <>
                    <span>Create My Account</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {step === 4 && createdAccount && (
          <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-white">Congratulations!</h3>
              <p className="text-xs text-slate-400 mt-1">Your ApexBank Instant Account has been successfully opened</p>
            </div>

            {/* Virtual Debit Card / Details Grid */}
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 border border-white/10 text-left relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] tracking-wider uppercase font-bold text-sky-400">{createdAccount.accountType}</span>
                <span className="text-xs font-bold text-accent-gold font-mono">APEX DEBIT</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[9px] uppercase text-slate-500 font-bold block">Account Number</span>
                  <span className="text-base font-bold font-mono tracking-wider text-slate-200">{createdAccount.accountNo}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] uppercase text-slate-500 font-bold block">Account Holder</span>
                    <span className="text-xs font-semibold text-slate-300">{createdAccount.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-500 font-bold block">IFSC Code</span>
                    <span className="text-xs font-mono font-bold text-slate-300">{createdAccount.ifsc}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase text-slate-500 font-bold block">Opening Balance</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(createdAccount.balance)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-500 font-bold block">Customer ID</span>
                    <span className="text-xs font-mono font-bold text-slate-300">{createdAccount.customerId}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 max-w-sm mx-auto">
              Please use Username: <strong className="text-white font-mono">demo</strong> and Password: <strong className="text-white font-mono">password</strong> to log in and simulate managing this account.
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setActiveTab('home')}
                className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 text-sm font-semibold hover:text-white"
              >
                Go to Home
              </button>
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/20"
              >
                Go to Online Banking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
