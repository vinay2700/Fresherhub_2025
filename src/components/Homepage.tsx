import React, { useState } from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
  FileText,
  Mail,
  Calculator,
  Briefcase,
  Users,
  Shield,
  CheckCircle
} from 'lucide-react';

interface HomepageProps {
  onNavigate: (tab: 'jobs' | 'ats' | 'cover' | 'salary', searchParams?: { query?: string; location?: string }) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);

  const handleJobSearch = () => {
    onNavigate('jobs', {
      query: jobQuery.trim(),
      location: locationQuery.trim()
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJobSearch();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side: Logo + Nav */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">FresherHub</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
                <button onClick={() => onNavigate('jobs')} className="text-gray-700 hover:text-gray-900 font-medium">Find Jobs</button>
                <div className="relative">
                  <button
                    onClick={() => setShowAIToolsDropdown(!showAIToolsDropdown)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    <span>AI Tools</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {showAIToolsDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => { onNavigate('ats'); setShowAIToolsDropdown(false); }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <FileText className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium text-gray-900">ATS Analyser + Resume Builder</div>
                          <div className="text-sm text-gray-500">Scan & rebuild your resume with AI</div>
                        </div>
                      </button>
                      <button
                        onClick={() => { onNavigate('cover'); setShowAIToolsDropdown(false); }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <Mail className="h-5 w-5 text-indigo-600" />
                        <div>
                          <div className="font-medium text-gray-900">Cover Letter & Job Email Writer</div>
                          <div className="text-sm text-gray-500">AI-powered application materials</div>
                        </div>
                      </button>
                      <button
                        onClick={() => { onNavigate('salary'); setShowAIToolsDropdown(false); }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <Calculator className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium text-gray-900">Salary Checker</div>
                          <div className="text-sm text-gray-500">Check fresher salaries in India</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* (Optional) Mobile menu */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest Entry-Level Jobs & Internships for Freshers in India
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover verified fresher jobs, off-campus drives, and paid internships.
          </p>
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Job title, keywords, or company"
                className="w-full pl-10 pr-4 py-3 text-lg border-0 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Location"
                className="w-full pl-10 pr-4 py-3 text-lg border-0 focus:outline-none focus:ring-0"
              />
            </div>
            <button
              onClick={handleJobSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors whitespace-nowrap"
            >
              Find Jobs
            </button>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 Boost Your Job Hunt With Free AI Tools</h2>
            <p className="text-lg text-gray-600">Trusted by 10,000+ freshers. No login, no credit card — always free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-6 w-6 text-white" />,
                title: 'Scan your resume for ATS — rebuild it instantly with AI',
                description: 'Get your resume analyzed by AI, receive compatibility scores, and get an optimized version built automatically.',
                color: 'purple',
                onClick: () => onNavigate('ats')
              },
              {
                icon: <Mail className="h-6 w-6 text-white" />,
                title: 'Write a cover letter — in seconds, personalized for your job',
                description: 'Create personalized cover letters and professional cold emails instantly with AI-powered content generation.',
                color: 'indigo',
                onClick: () => onNavigate('cover')
              },
              {
                icon: <Calculator className="h-6 w-6 text-white" />,
                title: "Check your fresher salary — see what you're worth",
                description: 'Get accurate salary estimates powered by AI. Analyze market trends, location factors, and skill premiums.',
                color: 'green',
                onClick: () => onNavigate('salary')
              }
            ].map(({ icon, title, description, color, onClick }, idx) => (
              <div key={idx} className={`flex flex-col justify-between h-full bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-2xl p-8 border border-${color}-200 hover:shadow-lg transition-all duration-300`}>
                <div>
                  <div className={`p-3 bg-${color}-600 rounded-xl w-fit mb-4`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
                <button
                  onClick={onClick}
                  className={`mt-6 w-full bg-${color}-600 hover:bg-${color}-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors`}
                >
                  Launch Tool
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">100% Free</span>
          </div>
          <p className="text-lg text-gray-700">
            No signup, no login, no credit card. Just like professional sites — but for freshers.
          </p>
          <div className="flex items-center justify-center space-x-8 mt-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>10,000+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Always Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;

