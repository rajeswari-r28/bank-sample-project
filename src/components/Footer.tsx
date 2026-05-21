import { ShieldAlert, Landmark, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-tr from-sky-500 to-emerald-500 rounded-lg">
                <Landmark className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading text-lg font-bold text-white tracking-tight">
                APEX<span className="text-accent-gold ml-1">BANK</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              ApexBank is a simulated digital-first banking platform providing premium personal, corporate, and investment solutions. Experience secure modern financial products built on bleeding-edge tech.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                256-bit SSL
              </span>
              <span>•</span>
              <span>PCI-DSS Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 font-heading">Products</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Premium Savings Account</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Elite Credit Cards</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Fixed Deposits (7.8% p.a.)</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Instant Personal Loans</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Home & Auto Finance</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 font-heading">Support & Security</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Help Center / FAQs</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Report Unauthorized Transactions</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Block Debit/Credit Cards</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Security Checklist</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Grievance Redressal</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 font-heading">Corporate Office</h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-sky-400 shrink-0" />
                <span>Financial District, Tower B, Phase 2, Mumbai, MH - 400001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-sky-400 shrink-0" />
                <span>1800-420-APEX (2739) / 24x7 Helpline</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                <span>secure@apexbank.sim.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers and Warnings */}
        <div className="border-t border-slate-800/80 pt-8 space-y-4">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] leading-relaxed text-slate-500">
            <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-400 block mb-0.5">Disclaimer & Security Warning</span>
              ApexBank is a simulated demonstration project. All transactions, credits, debits, account balances, loans, and interest rates are mock calculations and do not involve actual currency or legally binding contracts. Do not input real credit card credentials, passwords, or personal banking keys. ApexBank will never ask for your PIN, OTP, or CVV via email, call, or SMS. Report any suspicious phishing activities immediately to our mock reporting email.
            </div>
          </div>

          {/* Copyright and Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-600">
            <div>
              © {new Date().getFullYear()} ApexBank Ltd. Simulated Project. All Rights Reserved. Inspired by TMB & ICICI structures.
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">ISO 27001 Certified</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">RBI Licensed Sim</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">DICGC Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
