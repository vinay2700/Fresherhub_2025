import React, { useState, useEffect } from 'react';
import { Search, FileText, Briefcase, Mail, Calculator, ChevronDown, User } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'jobs' | 'ats' | 'cover' | 'salary' | 'admin';
  setActiveTab: (tab: HeaderProps['activeTab']) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, isAdmin, setIsAdmin }) => {
  const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    if (adminLoggedIn) setIsAdmin(true);

    const handleAdminNavigation = () => {
      setIsAdmin(true);
      setActiveTab('admin');
    };

    window.addEventListener('navigateToAdmin', handleAdminNavigation);
    return () => window.removeEventListener('navigateToAdmin', handleAdminNavigation);
  }, [setIsAdmin, setActiveTab]);

  const handleNavigation = (tab: HeaderProps['activeTab']) => {
    setActiveTab(tab);
    setShowAIToolsDropdown(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('admin_logged_in');
    setActiveTab('home');
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-6 py-4 overflow-x-auto">
          {/* FresherHub Logo */}
          <button 
            onClick={() => handleNavigation('home')} 
            className="flex items-center space-x-2 text-blue-600 font-bold text-xl"
          >
            <Briefcase className="w-6 h-6" />
            <span>FresherHub</span>
          </button>

          {/* Home */}
          <button
            onClick={() => handleNavigation('home')}
            className={`text-sm font-medium hover:underline ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-700'}`}
          >
            Home
          </button>

          {/* Find Jobs */}
          <button
            onClick={() => handleNavigation('jobs')}
            className={`text-sm font-medium hover:underline ${activeTab === 'jobs' ? 'text-blue-600' : 'text-gray-700'}`}
          >
            Find Jobs
          </button>

          {/* AI Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAIToolsDropdown(!showAIToolsDropdown)}
              className={`text-sm font-medium flex items-center gap-1 hover:underline ${['ats', 'cover', 'salary'].includes(activeTab) ? 'text-blue-600' : 'text-gray-700'}`}
            >
              AI Tools
              <ChevronDown className="w-4 h-4" />
            </button>
            {showAIToolsDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border rounded shadow z-50">
                <button
                  onClick={() => handleNavigation('ats')}
                  className="flex items-center w-full px-4 py-3 hover:bg-gray-100 text-left"
                >
                  <FileText className="w-4 h-4 mr-2 text-purple-600" />
                  ATS Analyser + Resume Builder
                </button>
                <button
                  onClick={() => handleNavigation('cover')}
                  className="flex items-center w-full px-4 py-3 hover:bg-gray-100 text-left"
                >
                  <Mail className="w-4 h-4 mr-2 text-indigo-600" />
                  Cover Letter & Job Email Writer
                </button>
                <button
                  onClick={() => handleNavigation('salary')}
                  className="flex items-center w-full px-4 py-3 hover:bg-gray-100 text-left"
                >
                  <Calculator className="w-4 h-4 mr-2 text-green-600" />
                  Salary Checker
                </button>
              </div>
            )}
          </div>

          {/* Admin Tab (Optional) */}
          {isAdmin && (
            <>
              <button
                onClick={() => handleNavigation('admin')}
                className={`text-sm font-medium hover:underline ${activeTab === 'admin' ? 'text-red-600' : 'text-gray-700'}`}
              >
                Admin
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-red-600 hover:underline"
              >
                <User className="w-4 h-4 mr-1" /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

