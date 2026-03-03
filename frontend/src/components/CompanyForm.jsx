import React, { useState } from 'react';
import { Building2, Users, BadgeDollarSign, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

const CompanyForm = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState(initialData || { name: '', shareholder_count: 1, total_capital: 1000 });

  return (
    <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-white flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">

      {/* Sidebar*/}
      <div className="w-full md:w-2/5 bg-orange-600 p-6 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 md:w-64 h-48 md:h-64 bg-orange-500 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 mb-6 md:mb-0">
          <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-lg rounded-xl md:rounded-2xl">
            <ShieldCheck className="text-white size-6 md:size-8" />
          </div>
          <div className="md:mt-8">
            <h1 className="text-xl md:text-4xl font-black tracking-tight">Venture Setup.</h1>
            <p className="hidden md:block text-orange-100 text-lg leading-relaxed mt-4">Gather details for your new legal entity.</p>
          </div>
        </div>

        <div className="relative z-10 flex md:flex-col gap-4 md:gap-6 mt-2 md:mt-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-xs md:text-base">1</div>
            <span className="font-bold text-xs md:text-base">Company</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 opacity-50">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-xs md:text-base">2</div>
            <span className="font-medium text-xs md:text-base">Shareholders</span>
          </div>
        </div>
      </div>

      {/* Main Form*/}
      <form onSubmit={(e) => { e.preventDefault(); onNext(formData); }} className="w-full md:w-3/5 p-6 md:p-16 bg-white">
        <div className="mb-6 md:mb-10">
          <span className="text-orange-600 font-bold tracking-widest text-[10px] uppercase bg-orange-50 px-3 py-1 rounded-full">Step 1 of 2</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-4 tracking-tight">Corporate Identity</h2>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="group">
            <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2 md:mb-3">Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-slate-300 size-5 md:size-6 transition-colors" />
              <input 
                required className="w-full pl-12 md:pl-14 pr-6 py-4 md:py-5 bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-base md:text-lg font-medium"
                placeholder="Acme Holdings LLC"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-2">
              <label className="block text-xs md:text-sm font-bold text-slate-700">Shareholders</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 size-5" />
                <input 
                  type="number" min="1" required
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-2xl outline-none focus:border-orange-500 transition-all text-base"
                  value={formData.shareholder_count}
                  onChange={(e) => setFormData({...formData, shareholder_count: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs md:text-sm font-bold text-slate-700">Initial Capital ($)</label>
              <div className="relative">
                <BadgeDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 size-5" />
                <input 
                  type="number" min="1" required
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-2xl outline-none focus:border-orange-500 transition-all text-base"
                  value={formData.total_capital}
                  onChange={(e) => setFormData({...formData, total_capital: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="mt-8 md:mt-12 w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 md:py-5 rounded-2xl md:rounded-3xl shadow-xl shadow-orange-100 transition-all flex items-center justify-center gap-3 group">
          Configure Shareholders
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;