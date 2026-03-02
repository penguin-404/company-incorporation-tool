import React, { useState } from 'react';
import { Building2, Users, BadgeDollarSign, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

const CompanyForm = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState(initialData || { name: '', shareholder_count: 1, total_capital: 1000 });

  return (
    <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-white flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">
      
      {/* Sidebar - Branding & Progress */}
      <div className="md:w-2/5 bg-orange-600 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-lg rounded-2xl mb-8">
            <ShieldCheck className="text-white size-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-4">Start your venture.</h1>
          <p className="text-orange-100 text-lg leading-relaxed">Let's gather the basic details for your new legal entity.</p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold">1</div>
            <span className="font-bold">Company Profile</span>
          </div>
          <div className="flex items-center gap-4 opacity-50">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold">2</div>
            <span className="font-medium">Shareholders</span>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={(e) => { e.preventDefault(); onNext(formData); }} className="md:w-3/5 p-8 md:p-16 bg-white">
        <div className="mb-10">
          <span className="text-orange-600 font-bold tracking-widest text-xs uppercase bg-orange-50 px-3 py-1 rounded-full">Step 1 of 2</span>
          <h2 className="text-3xl font-bold text-slate-800 mt-4">Corporate Identity</h2>
        </div>

        <div className="space-y-8">
          <div className="group">
            <label className="block text-sm font-bold text-slate-700 mb-3 group-focus-within:text-orange-600 transition-colors">Proposed Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 size-6 group-focus-within:text-orange-500 transition-colors" />
              <input 
                required className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-lg font-medium text-slate-800"
                placeholder="Acme Holdings LLC"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Shareholder Count</label>
              <div className="relative">
                <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 size-6" />
                <input 
                  type="number" min="1" required
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-lg font-medium"
                  value={formData.shareholder_count}
                  onChange={(e) => setFormData({...formData, shareholder_count: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Initial Capital ($)</label>
              <div className="relative">
                <BadgeDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 size-6" />
                <input 
                  type="number" min="1" required
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-lg font-medium"
                  value={formData.total_capital}
                  onChange={(e) => setFormData({...formData, total_capital: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="mt-12 w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-3xl shadow-xl shadow-orange-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] group">
          Configure Shareholders
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;