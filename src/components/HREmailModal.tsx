import React, { useState } from 'react';
import { X, Mail, Copy, CheckCircle, Sparkles, Send } from 'lucide-react';
import { Job } from '../types/Job';
import { geminiService } from '../services/geminiService';


interface HREmailModalProps {
  job: Job;
  onClose: () => void;
}

const HREmailModal: React.FC<HREmailModalProps> = ({ job, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [generatingEmail, setGeneratingEmail] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateColdEmail = async () => {
    const { canUse, message } = usageLimitService.canUseAI();
    
    if (!canUse) {
      alert(message);
      return;
    }

    setGeneratingEmail(true);
    
    try {
      // Use the AI service to generate a cold email
      const emailData = {
        resumeText: '', // We don't have resume here, so AI will create generic but professional email
        jobDescription: job.description,
        candidateName: 'Your Name', // Placeholder
        jobTitle: job.title,
        companyName: job.company,
        generationType: 'email' as const
      };

      const result = await geminiService.generateCoverLetterAndEmail(emailData, customPrompt);
      setGeneratedEmail(result.coldEmail);
      
      // Track usage
      usageLimitService.useAI();
    } catch (error) {
      console.error('Error generating email:', error);
      alert('Failed to generate email. Please try again.');
    } finally {
      setGeneratingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Mail className="h-6 w-6 mr-2 text-blue-600" />
                HR Contact Information
              </h2>
              <p className="text-gray-600 mt-1">{job.title} at {job.company}</p>
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
        <div className="p-6 space-y-6">
          {/* HR Email Display */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              HR Email Address
            </h3>
            <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-blue-200">
              <span className="text-lg font-mono text-gray-900">{job.hrEmail}</span>
              <button
                onClick={() => copyToClipboard(job.hrEmail!)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Email Generator */}
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              AI Cold Email Generator
            </h3>
            <p className="text-purple-700 mb-4 text-sm">
              Generate a professional cold email to send to the HR for this specific job
            </p>

            {/* Custom Prompt */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-purple-700 mb-2">
                Custom Instructions (Optional)
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., Mention my 2 years of React experience, highlight my startup background, keep it under 150 words..."
                rows={3}
                className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-sm"
              />
            </div>

            <button
              onClick={generateColdEmail}
              disabled={generatingEmail}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {generatingEmail ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Generating Email...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Cold Email</span>
                </>
              )}
            </button>

            {/* Generated Email */}
            {generatedEmail && (
              <div className="mt-4 bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Generated Email</h4>
                  <button
                    onClick={() => copyToClipboard(generatedEmail)}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                    {generatedEmail}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.open(`mailto:${job.hrEmail}`, '_blank')}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Send className="h-4 w-4" />
              <span>Open Email Client</span>
            </button>
            <button
              onClick={() => copyToClipboard(job.hrEmail!)}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Copy className="h-4 w-4" />
              <span>Copy Email Address</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HREmailModal;