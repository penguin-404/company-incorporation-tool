import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LayoutGrid, Calendar, Users, Trash2 } from 'lucide-react';

const CompanyList = ({ refreshTrigger }) => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/companies");
      // Filter out 'drafts' if you only want to see completed ones, 
      // or show all if you want an admin view.
      setCompanies(res.data);
    } catch (err) {
      console.error("Failed to fetch");
    }
  };

  const deleteCompany = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/companies/${id}`);
      fetchCompanies(); // Refresh list
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => { fetchCompanies(); }, [refreshTrigger]);

  return (
    <div className="mt-12 w-full max-w-5xl">
      <div className="flex items-center gap-2 mb-6">
        <LayoutGrid className="size-6 text-indigo-600" />
        <h2 className="text-xl font-black uppercase tracking-tight text-gray-800">Admin Records</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group relative">
            <button 
              onClick={() => deleteCompany(company.id)}
              className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="size-4" />
            </button>
            <h3 className="font-bold text-lg text-gray-900 truncate pr-6">{company.name}</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <Users className="size-4" /> {company.shareholder_count} Shareholders
              </div>
              <div className="flex items-center text-sm text-gray-500 gap-2 font-mono text-[10px]">
                ID: {company.id.substring(0,8)}...
              </div>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${
                company.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {company.status || 'Pending'}
              </span>
              <span className="text-indigo-600 font-bold text-sm">${company.total_capital}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;