import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import CompanyForm from '../components/CompanyForm';
import ShareholderForm from '../components/ShareholderForm';
import Loader from '../components/Loader';

const API_BASE = "http://localhost:5000/api";

const IncorporationFlow = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(localStorage.getItem('draft_id'));
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };
  
  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem('company_data');
    return saved ? JSON.parse(saved) : { name: '', shareholder_count: 1, total_capital: 0 };
  });

  useEffect(() => {
    // If we have a draft, skip to step 2 automatically
    if (companyId) setStep(2);
  }, [companyId]);

  const handleStep1 = async (data) => {
    setLoading(true);
    try {
      const existingId = localStorage.getItem('draft_id');
      let response;

      if (existingId) {
        response = await axios.put(`${API_BASE}/companies/${existingId}`, data);
      } else {
        // CREATE: Only happens the very first time
        response = await axios.post(`${API_BASE}/companies`, data);
      }

      const finalId = response.data.id;
      setCompanyId(finalId);
      localStorage.setItem('draft_id', finalId);
      localStorage.setItem('company_data', JSON.stringify(data));
      setStep(2);
      showToast("Profile updated!");
    } catch (err) {
      showToast("Error saving data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = async (shareholders) => {
    setLoading(true);
    try {
      const activeId = companyId || localStorage.getItem('draft_id');
      await axios.post(`${API_BASE}/companies/${activeId}/shareholders`, { shareholders });
      
      showToast("Registration successful!", "success");
      setSuccess(true);
      
      // Clear EVERYTHING related to this draft
      localStorage.removeItem('draft_id');
      localStorage.removeItem('company_data');
      
      setTimeout(() => { window.location.href = "/admin"; }, 2500);
    } catch (err) {
      showToast("Finalization failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 min-h-[calc(100vh-73px)] flex justify-center items-center bg-[#FFF9F8] relative">
      {loading ? (
        <div className="bg-white p-12 md:p-20 rounded-[2.5rem] shadow-xl border border-orange-50 text-center">
          <Loader />
          <p className="mt-4 text-orange-500 font-bold animate-pulse">Processing...</p>
        </div>
      ) : (
        <div className="w-full max-w-5xl">
          {step === 1 ? (
            <CompanyForm onNext={handleStep1} initialData={companyData} />
          ) : (
            <ShareholderForm 
              onFinish={handleStep2} 
              count={parseInt(companyData.shareholder_count)} 
              onBack={() => {
                // Clear the ID so user can go back and edit Step 1
                setStep(1);
              }} 
            />
          )}
        </div>
      )}

      {/* Success Modal Overlay */}
      {success && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-orange-500/20 backdrop-blur-md">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center border border-orange-100 animate-in zoom-in duration-300">
            <div className="bg-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-800">Registration Complete!</h2>
            <p className="text-slate-500 mt-2 font-medium">Taking you to the dashboard...</p>
          </div>
        </div>
      )}

      {/*Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-200 animate-in slide-in-from-bottom-5">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
            toast.type === 'error' ? 'bg-red-500 text-white border-red-400' : 'bg-slate-900 text-white border-white/10'
          }`}>
            <div className={toast.type === 'error' ? 'bg-red-600 p-1.5 rounded-lg' : 'bg-orange-500 p-1.5 rounded-lg'}>
              {toast.type === 'error' ? <XCircle size={18} /> : <CheckCircle size={18} />}
            </div>
            <p className="font-bold text-sm tracking-tight">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncorporationFlow;