import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Rocket, LayoutDashboard, NotebookTabs } from 'lucide-react';
import IncorporationFlow from './pages/IncorporationFlow';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FFF9F8]">
        {/* Navigation Header */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <Rocket className="text-white size-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-800">
                VENTURE<span className="text-orange-500">FLOW</span>
              </span>
            </Link>
            
            <div className="flex gap-6">
              <Link to="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500 transition">
                <NotebookTabs size={18} /> Register
              </Link>
              <Link to="/admin" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500 transition">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<IncorporationFlow />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}