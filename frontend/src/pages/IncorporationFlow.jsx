import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyForm from '../components/CompanyForm';
import ShareholderForm from '../components/ShareholderForm';
import Loader from '../components/Loader';

const API_BASE = "http://localhost:5000/api";

const IncorporationFlow = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(localStorage.getItem('draft_id'));
  const [success, setSuccess] = useState(false);
  
  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem('company_data');
    return saved ? JSON.parse(saved) : { name: '', shareholder_count: 1, total_capital: 0 };
  });

  useEffect(() => {
    if (companyId) setStep(2);
  }, [companyId]);

  const handleStep1 = async (data) => {
      setLoading(true);
      try {
        const existingId = localStorage.getItem('draft_id');
        let response;

        if (existingId) {
          // UPDATE existing record
          response = await axios.put(`${API_BASE}/companies/${existingId}`, data);
        } else {
          // CREATE new record
          response = await axios.post(`${API_BASE}/companies`, data);
        }

        // Defensive check: Ensure we have an ID from either the response or existing storage
        const finalId = response.data.id || existingId;

        if (!finalId) throw new Error("No Company ID generated");

        setCompanyId(finalId);
        setCompanyData(data);
        localStorage.setItem('draft_id', finalId);
        localStorage.setItem('company_data', JSON.stringify(data));

        setStep(2);
      } catch (err) {
        console.error(err);
        alert("Error saving company data: " + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };

const handleStep2 = async (shareholders) => {
  setLoading(true);
  try {
    // 1. Get the ID directly from Storage to be 100% sure it's not null/undefined
    const activeId = companyId || localStorage.getItem('draft_id');

    if (!activeId) {
      alert("Session expired. Please restart from Step 1.");
      setStep(1);
      return;
    }

    // 2. Log it to your console to verify what is being sent
    console.log("Submitting to Company ID:", activeId);

    await axios.post(`${API_BASE}/companies/${activeId}/shareholders`, { 
      shareholders: shareholders 
    });

    setSuccess(true);
    localStorage.clear();
    // Auto-redirect after 3 seconds
    setTimeout(() => { window.location.href = "/admin"; }, 3000);
  } catch (err) {
    console.error("Submission Error:", err.response?.data);
    alert("Database Error: " + (err.response?.data?.error || "Check foreign key constraints"));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6 min-h-[calc(100-73px)] flex justify-center items-center bg-slate-50">
      {loading ? (
        <div className="bg-white p-20 rounded-3xl shadow-xl border border-gray-100">
          <Loader />
        </div>
      ) : (
        <>
        {success && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-xl">
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <CheckCircle size={18} />
              </div>
              <p className="font-bold text-sm tracking-tight">Venture successfully registered. Redirecting...</p>
            </div>
          </div>
        )}
          {step === 1 ? (
            <CompanyForm 
              onNext={handleStep1} 
              initialData={companyData} 
            />
          ) : (
            <ShareholderForm 
              onFinish={handleStep2} 
              count={parseInt(companyData.shareholder_count)} 
              onBack={() => setStep(1)} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default IncorporationFlow;