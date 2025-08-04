import React from 'react';
import { X, MapPin, Clock, DollarSign, Building, ExternalLink, Tag, Wifi, Mail, FileText, Brain, Sparkles } from 'lucide-react';
import { Job } from '../types/Job';

interface JobDetailsModalProps {
  job: Job;
  onClose: () => void;
  onGetHREmail: (job: Job) => void;
  onAnalyzeResume: (job: Job) => void;
  onWriteCoverLetter: (job: Job) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ 
  job, 
  onClose, 
  onGetHREmail, 
  onAnalyzeResume, 
  onWriteCoverLetter 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleApplyClick = () => {
    if (job.applyUrl) {
      window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('Application link not available. Please contact the company directly or visit their careers page.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                {job.remote && (
                  <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    <Wifi className="h-4 w-4" />
                    <span>Remote</span>
                  </div>
                )}
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full font-medium">
                  {job.type}
                </span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Building className="h-5 w-5 mr-2 text-blue-500" />
                <span className="font-semibold text-xl">{job.company}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Job Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-4">
              <MapPin className="h-5 w-5 mr-3 text-red-500" />
              <div>
                <div className="font-medium text-gray-900">Location</div>
                <div className="text-sm">{job.location}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-4">
              <Clock className="h-5 w-5 mr-3 text-blue-500" />
              <div>
                <div className="font-medium text-gray-900">Experience</div>
                <div className="text-sm">{job.experience}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-4">
              <DollarSign className="h-5 w-5 mr-3 text-green-500" />
              <div>
                <div className="font-medium text-gray-900">Salary</div>
                <div className="text-sm">{job.salary}</div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-full flex items-center border border-blue-100 hover:border-blue-300 transition-colors"
                >
                  <Tag className="h-4 w-4 mr-2 text-blue-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">
                {job.description}
              </pre>
            </div>
          </div>

          {/* AI Tools Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
              AI-Powered Job Application Tools
            </h3>
            <p className="text-gray-600 mb-6">
              Boost your application with our AI tools tailored for this specific job
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* HR Email Tool */}
              {job.hrEmail && (
                <button
                  onClick={() => onGetHREmail(job)}
                  className="flex flex-col items-center p-4 bg-white rounded-xl border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="p-3 bg-purple-100 rounded-xl mb-3 group-hover:bg-purple-200 transition-colors">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 mb-1">Get HR Email</div>
                    <div className="text-sm text-gray-600">Direct contact with recruiter</div>
                  </div>
                </button>
              )}

              {/* Resume Analyzer */}
              <button
                onClick={() => onAnalyzeResume(job)}
                className="flex flex-col items-center p-4 bg-white rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 bg-blue-100 rounded-xl mb-3 group-hover:bg-blue-200 transition-colors">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-1">Analyze & Rebuild Resume</div>
                  <div className="text-sm text-gray-600">Optimize for this job</div>
                </div>
              </button>

              {/* Cover Letter Writer */}
              <button
                onClick={() => onWriteCoverLetter(job)}
                className="flex flex-col items-center p-4 bg-white rounded-xl border border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 bg-green-100 rounded-xl mb-3 group-hover:bg-green-200 transition-colors">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-1">Write Cover Letter</div>
                  <div className="text-sm text-gray-600">AI-powered personalization</div>
                </div>
              </button>
            </div>
          </div>

          {/* Apply Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Posted {formatDate(job.postedDate)} • Source: {job.source}
            </div>
            <button 
              onClick={handleApplyClick}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="font-semibold">
                {job.applyUrl ? 'Apply Now' : 'Contact Company'}
              </span>
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;