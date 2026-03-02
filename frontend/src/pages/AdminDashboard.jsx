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
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/companies/${id}`);
      // Optimistic UI update: remove from state immediately
      setCompanies(companies.filter(c => c.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete company.");
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F8] p-4 md:p-10 bg-[radial-gradient(#fed7aa_1px,transparent_1px)] bg-size-[32px_32px]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-4xl p-6 md:p-8 shadow-sm border border-orange-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-orange-500 p-4 rounded-2xl text-white shadow-lg shadow-orange-200 shrink-0">
              <Landmark size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tighter">
                VENTURE<span className="text-orange-500">REGISTRY</span>
              </h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest italic">Live Database</p>
            </div>
          </div>
          <button 
            onClick={loadData} 
            className="w-full md:w-auto px-6 py-4 bg-white border border-orange-200 rounded-2xl hover:bg-orange-50 text-orange-500 transition-all flex justify-center items-center gap-2 font-bold shadow-sm"
          >
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="bg-white rounded-4xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-175">
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
                        <div className="size-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 shrink-0">
                          <Building size={18} />
                        </div>
                        <div className="truncate max-w-50">
                          <p className="font-bold text-slate-800 truncate">{c.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">ID: {c.id.substring(0,8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(c.actual_shareholder_count || 0, 3))].map((_, i) => (
                            <div key={i} className="size-7 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-orange-600 shrink-0">
                              <Users size={12} />
                            </div>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-slate-600 whitespace-nowrap">
                          {c.actual_shareholder_count || 0} Members
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {c.status_flag === 'completed' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <CheckCircle2 size={12} /> Registered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-amber-50 text-amber-600 border border-amber-100">
                          <Clock size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleDelete(c.id)} 
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {companies.length === 0 && !loading && (
            <div className="p-20 text-center text-slate-400 font-medium">
              No entities found in the registry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;