import React, { useState } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import JobBoard from './components/JobBoard';
import ATSAnalyzer from './components/ATSAnalyzer';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import SalaryCalculator from './components/SalaryCalculator';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'jobs' | 'ats' | 'cover' | 'salary' | 'admin'>('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchParams, setSearchParams] = useState<{ query?: string; location?: string }>({});

  const handleNavigate = (tab: 'home' | 'jobs' | 'ats' | 'cover' | 'salary', params?: { query?: string; location?: string }) => {
    setActiveTab(tab);
    if (params) {
      setSearchParams(params);
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {activeTab !== 'home' && (
        <Header 
          activeTab={activeTab as 'jobs' | 'ats' | 'cover' | 'salary' | 'admin'} 
          setActiveTab={setActiveTab} 
          isAdmin={isAdmin} 
          setIsAdmin={setIsAdmin} 
        />
      )}
      
      <main className={activeTab === 'home' ? '' : 'container mx-auto px-4 py-8'}>
        {activeTab === 'home' && <Homepage onNavigate={handleNavigate} />}
        {activeTab === 'jobs' && <JobBoard searchParams={searchParams} />}
        {activeTab === 'ats' && <ATSAnalyzer />}
        {activeTab === 'cover' && <CoverLetterGenerator />}
        {activeTab === 'salary' && <SalaryCalculator />}
        {activeTab === 'admin' && <AdminPanel />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;