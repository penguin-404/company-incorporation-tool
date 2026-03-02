import React, { useState } from 'react';
import { User, Globe2, ChevronLeft, CheckCircle2, UserPlus } from 'lucide-react';

const ShareholderForm = ({ onFinish, count, onBack }) => {
  const [shareholders, setShareholders] = useState(
    Array.from({ length: count || 1 }, () => ({ first_name: '', last_name: '', nationality: '' }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...shareholders];
    updated[index][field] = value;
    setShareholders(updated);
  };

  return (
    <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-white flex flex-col md:flex-row animate-in slide-in-from-right-10 duration-500">
      
      {/* Sidebar */}
      <div className="md:w-1/3 bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between">
        <div>
          <span className="text-orange-400 font-bold tracking-widest text-xs uppercase px-3 py-1 border border-orange-400/30 rounded-full">Step 2 of 2</span>
          <h2 className="text-4xl font-black mt-6 leading-tight">Identify the Owners.</h2>
          <p className="mt-4 text-slate-400">Please provide official identification details for all founding members.</p>
        </div>
        
        <div className="hidden md:block">
          <div className="flex items-center gap-3 text-emerald-400 font-bold mb-4">
            <CheckCircle2 size={20} /> Company profile secured
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <form onSubmit={(e) => { e.preventDefault(); onFinish(shareholders); }} className="md:w-2/3 p-8 md:p-12 flex flex-col">
        <div className="flex-1 overflow-y-auto max-h-[55vh] pr-4 custom-scrollbar space-y-6">
          {shareholders.map((s, i) => (
            <div key={i} className="p-8 bg-slate-50/50 border border-slate-100 rounded-4xl relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-600 font-black text-sm border border-slate-100">
                  {i + 1}
                </div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Founding Shareholder</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">First Name</label>
                  <input required className="w-full px-5 py-4 rounded-xl border-2 border-transparent focus:border-orange-500 outline-none transition-all" 
                    onChange={(e) => handleChange(i, 'first_name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Last Name</label>
                  <input required className="w-full px-5 py-4 rounded-xl border-2 border-transparent focus:border-orange-500 outline-none transition-all" 
                    onChange={(e) => handleChange(i, 'last_name', e.target.value)} />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Nationality</label>
                  <div className="relative">
                    <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 size-5" />
                    <input required className="w-full pl-12 pr-5 py-4 rounded-xl border-2 border-transparent focus:border-orange-500 outline-none transition-all" 
                      onChange={(e) => handleChange(i, 'nationality', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-6 border-t border-slate-100 pt-8">
          <button type="button" onClick={onBack} className="flex items-center justify-center gap-2 text-slate-400 font-bold hover:text-orange-600 transition-all py-2">
            <ChevronLeft size={20} /> Change Company Details
          </button>
          <button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-3xl shadow-xl shadow-orange-100 transition-all flex items-center justify-center gap-3">
            Finalize Incorporation <UserPlus size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShareholderForm;