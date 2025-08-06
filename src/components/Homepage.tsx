import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, FileText, Mail, Calculator, Briefcase, Users, Shield, CheckCircle, Zap, DollarSign, Target, Sparkles } from 'lucide-react';

interface HomepageProps {
  onNavigate: (tab: 'jobs' | 'ats' | 'cover' | 'salary', searchParams?: { query?: string; location?: string }) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleJobSearch = () => {
    // Navigate to jobs page with search parameters
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
          <div className="flex items-center h-16 space-x-8">
            {/* Logo and AI Tools - Left Side */}
            <div className="flex items-center space-x-3">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">FresherHub</span>
              
              {/* AI Tools Dropdown */}
              <div className="relative ml-8">
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
                      onClick={() => {
                        onNavigate('ats');
                        setShowAIToolsDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-900">ATS Analyser + Resume Builder</div>
                        <div className="text-sm text-gray-500">Scan & rebuild your resume with AI</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('cover');
                        setShowAIToolsDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <Sparkles className="h-5 w-5 text-indigo-600" />
                      <div>
                        <div className="font-medium text-gray-900">Cover Letter & Job Email Writer</div>
                        <div className="text-sm text-gray-500">AI-powered application materials</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('salary');
                        setShowAIToolsDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <Sparkles className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">Salary Checker</div>
                        <div className="text-sm text-gray-500">Check fresher salaries in India</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Links - Right Side */}
          <div className="hidden md:flex items-center space-x-8">
  <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
  <button
    onClick={() => onNavigate('jobs')}
    className="text-gray-700 hover:text-gray-900 font-medium"
  >
    Find Jobs
  </button>
</div>

            {/* Mobile Menu Button */}
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
            Find Entry-Level Jobs & Internships for Freshers in India
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            India's leading job portal for freshers with AI-powered resume tools. Find entry-level jobs, internships, and off-campus drives from top companies.
          </p>

          {/* Job Search Bar */}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🚀 Boost Your Job Hunt With Free AI Tools
            </h2>
            <p className="text-lg text-gray-600">
              Trusted by 10,000+ freshers. No login, no credit card — always free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ATS Scanner */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-purple-600 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Scan your resume for ATS — rebuild it instantly with AI
              </h3>
              <p className="text-gray-600 mb-6">
                Get your resume analyzed by AI, receive compatibility scores, and get an optimized version built automatically.
              </p>
              <button
                onClick={() => onNavigate('ats')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors text-center"
              >
                Try Free
              </button>
            </div>

            {/* Cover Letter Writer */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border border-indigo-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-indigo-600 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Write a cover letter — in seconds, personalized for your job
              </h3>
              <p className="text-gray-600 mb-6">
                Create personalized cover letters and professional cold emails instantly with AI-powered content generation.
              </p>
              <button
                onClick={() => onNavigate('cover')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors text-center"
              >
                Try Free
              </button>
            </div>

            {/* Salary Checker */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-green-600 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Check your fresher salary — see what you're worth
              </h3>
              <p className="text-gray-600 mb-6">
                Get accurate salary estimates powered by AI. Analyze market trends, location factors, and skill premiums.
              </p>
              <button
                onClick={() => onNavigate('salary')}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors text-center"
              >
                Try Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Briefcase className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">FresherHub</span>
              </div>
              <p className="text-gray-300 mb-4">
                India's leading job portal for freshers and entry-level professionals. 
                Find verified jobs, internships, and use our AI-powered resume tools to land your dream career.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Tools</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button 
                    onClick={() => onNavigate('ats')}
                    className="hover:text-white transition-colors text-left"
                  >
                    ATS Analyzer
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('cover')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Cover Letter Writer
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('salary')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Salary Calculator
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('jobs')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Job Search
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* About Section */}
          <section id="about" className="mt-16 pt-16 border-t border-gray-700">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">About FresherHub</h2>
              <div className="text-gray-300 space-y-4 text-left">
                <p>
                  FresherHub is India's premier job portal dedicated to helping fresh graduates and entry-level professionals launch their careers. We understand the unique challenges faced by freshers in today's competitive job market and have built a platform that bridges the gap between talent and opportunity.
                </p>
                <p>
                  Our comprehensive platform combines traditional job search functionality with cutting-edge AI-powered tools to give freshers every advantage in their job hunt. From ATS-optimized resume analysis to personalized cover letter generation, we provide the tools and resources needed to stand out in today's digital recruitment landscape.
                </p>
                <p>
                  Since our launch, we've helped thousands of freshers across India find meaningful employment opportunities with top companies. Our curated job listings focus specifically on entry-level positions, internships, and graduate programs, ensuring that every opportunity is relevant and accessible to new graduates.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">10,000+</div>
                    <div className="text-gray-400">Freshers Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">500+</div>
                    <div className="text-gray-400">Partner Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">95%</div>
                    <div className="text-gray-400">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mt-16 pt-16 border-t border-gray-700">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-gray-300">
                  <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
                  <p className="mb-4">
                    Have questions about our platform or need help with your job search? We're here to help! 
                    Reach out to us and our team will get back to you within 24 hours.
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> support@fresherhub.com</p>
                    <p><strong>Phone:</strong> +91 9876543210</p>
                    <p><strong>Address:</strong> Bangalore, Karnataka, India</p>
                  </div>
                </div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Contact *</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a reason</option>
                      <option value="job-search-help">Job Search Help</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Submit Message
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Privacy Policy Section */}
          <section id="privacy" className="mt-16 pt-16 border-t border-gray-700">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Privacy Policy</h2>
              <div className="text-gray-300 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Information We Collect</h3>
                  <p>
                    At FresherHub, we collect information you provide directly to us, such as when you create an account, 
                    upload your resume, use our AI tools, or contact us for support. This may include your name, email address, 
                    phone number, resume content, and job preferences.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>To provide and improve our job search and AI-powered resume services</li>
                    <li>To match you with relevant job opportunities</li>
                    <li>To communicate with you about our services and job opportunities</li>
                    <li>To analyze usage patterns and improve our platform</li>
                    <li>To ensure the security and integrity of our services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Data Security</h3>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction. Your resume data and personal 
                    information are encrypted and stored securely.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at privacy@fresherhub.com 
                    or through our contact form above.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Terms of Service Section */}
          <section id="terms" className="mt-16 pt-16 border-t border-gray-700">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Terms of Service</h2>
              <div className="text-gray-300 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Acceptance of Terms</h3>
                  <p>
                    By accessing and using FresherHub, you accept and agree to be bound by the terms and provision 
                    of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Use License</h3>
                  <p>
                    Permission is granted to temporarily use FresherHub for personal, non-commercial job search purposes. 
                    This includes using our AI-powered resume tools, browsing job listings, and applying to positions 
                    through our platform.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">User Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Provide accurate and truthful information in your profile and resume</li>
                    <li>Use our AI tools responsibly and not attempt to abuse or exploit them</li>
                    <li>Respect the intellectual property rights of others</li>
                    <li>Not use the platform for any illegal or unauthorized purpose</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">AI Tools Usage</h3>
                  <p>
                    Our AI-powered tools (ATS Analyzer, Resume Builder, Cover Letter Generator, Salary Calculator) 
                    are provided to assist in your job search. While we strive for accuracy, results should be 
                    reviewed and customized as needed. Usage limits may apply to ensure fair access for all users.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h3>
                  <p>
                    FresherHub shall not be liable for any indirect, incidental, special, consequential, or punitive 
                    damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Contact Information</h3>
                  <p>
                    Questions about the Terms of Service should be sent to us at legal@fresherhub.com.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </footer>

      <div className="md:hidden">
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {showMobileMenu ? (
            <X className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </button>
      </div>
    
    {/* Mobile Menu */}
    {showMobileMenu && (
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="py-4 space-y-2 px-4">
          <a href="#" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">Home</a>
          <button
            onClick={() => {
              onNavigate('jobs');
              setShowMobileMenu(false);
            }}
            className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            Find Jobs
          </button>
          
          {/* Mobile AI Tools */}
          <div className="space-y-2">
            <button
              onClick={() => setShowAIToolsDropdown(!showAIToolsDropdown)}
              className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              <span>AI Tools</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showAIToolsDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showAIToolsDropdown && (
              <div className="ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                <button
                  onClick={() => {
                    onNavigate('ats');
                    setShowMobileMenu(false);
                    setShowAIToolsDropdown(false);
                  }}
                  className="block w-full text-left py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  ATS Analyser + Resume Builder
                </button>
                <button
                  onClick={() => {
                    onNavigate('cover');
                    setShowMobileMenu(false);
                    setShowAIToolsDropdown(false);
                  }}
                  className="block w-full text-left py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Cover Letter & Job Email Writer
                </button>
                <button
                  onClick={() => {
                    onNavigate('salary');
                    setShowMobileMenu(false);
                    setShowAIToolsDropdown(false);
                  }}
                  className="block w-full text-left py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Salary Checker
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Homepage;