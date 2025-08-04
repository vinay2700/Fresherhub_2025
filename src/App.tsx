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

  const handleNavigateToATS = (jobDescription?: string) => {
    setActiveTab('ats');
    // Store job description in sessionStorage for ATS component to use
    if (jobDescription) {
      sessionStorage.setItem('jobDescriptionForATS', jobDescription);
    }
  };

  const handleNavigateToCoverLetter = (jobDescription?: string, jobTitle?: string, companyName?: string) => {
    setActiveTab('cover');
    // Store job details in sessionStorage for Cover Letter component to use
    if (jobDescription) {
      sessionStorage.setItem('jobDescriptionForCover', jobDescription);
    }
    if (jobTitle) {
      sessionStorage.setItem('jobTitleForCover', jobTitle);
    }
    if (companyName) {
      sessionStorage.setItem('companyNameForCover', companyName);
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
        {activeTab === 'jobs' && (
          <JobBoard 
            searchParams={searchParams} 
            onNavigateToATS={handleNavigateToATS}
            onNavigateToCoverLetter={handleNavigateToCoverLetter}
          />
        )}
        {activeTab === 'ats' && <ATSAnalyzer />}
        {activeTab === 'cover' && <CoverLetterGenerator />}
        {activeTab === 'salary' && <SalaryCalculator />}
        {activeTab === 'admin' && <AdminPanel />}
      </main>
      
      {activeTab !== 'home' && <Footer />}
    </div>
  );
}

export default App;