import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Building, Users, RefreshCcw, Landmark, CheckCircle2, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/companies");
      setCompanies(res.data);
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/companies/${id}`);
      setCompanies(companies.filter(c => c.id !== id));
    } catch (err) { alert("Failed to delete"); }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F8] p-4 md:p-10 bg-[radial-gradient(#fed7aa_1px,transparent_1px)] bg-size-[32px_32px]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section*/}
        <div className="bg-white rounded-3xl md:rounded-4xl p-5 md:p-8 shadow-sm border border-orange-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-orange-500 p-3 md:p-4 rounded-xl md:rounded-2xl text-white shadow-lg shadow-orange-200 shrink-0">
              <Landmark size={24} className="md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter uppercase">
                Venture<span className="text-orange-500">Registry</span>
              </h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">Live Database</p>
            </div>
          </div>
          <button 
            onClick={loadData} 
            className="w-full md:w-auto px-6 py-3.5 bg-white border border-orange-200 rounded-xl md:rounded-2xl hover:bg-orange-50 text-orange-500 transition-all flex justify-center items-center gap-2 font-bold shadow-sm"
          >
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Mobile View:*/}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {companies.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-3xl border border-orange-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600 border border-orange-100">
                    <Building size={18} />
                  </div>
                  <p className="font-black text-slate-800 truncate max-w-45">{c.name}</p>
                </div>
                <button onClick={() => handleDelete(c.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Users size={14} className="text-orange-400" />
                  {c.actual_shareholder_count || 0} Members
                </div>
                {c.status_flag === 'completed' ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">Registered</span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">Draft</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block bg-white rounded-4xl shadow-sm border border-orange-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-orange-50/30 border-b border-orange-100">
                  <th className="px-8 py-5 text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Company Details</th>
                  <th className="px-8 py-5 text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Stakeholders</th>
                  <th className="px-8 py-5 text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50">
                {companies.map((c) => (
                  <tr key={c.id} className="hover:bg-orange-50/10 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
                          <Building size={18} />
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-slate-800">{c.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono italic">ID: {c.id.substring(0,8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-600">
                      {c.actual_shareholder_count || 0} Members
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                        c.status_flag === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {c.status_flag === 'completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {c.status_flag === 'completed' ? 'Registered' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button onClick={() => handleDelete(c.id)} className="p-2 text-slate-300 hover:text-red-500 transition-all">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;