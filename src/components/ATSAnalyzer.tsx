import React, { useState } from 'react';
import { Upload, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { analyzeResume } from '../services/geminiService';
import ATSReport from './ATSReport';
import { ResumeRebuilder } from './ResumeRebuilder';
import { UsageLimitBanner } from './UsageLimitBanner';
import { usageLimitService } from '../services/usageLimitService';

export const ATSAnalyzer: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRebuilder, setShowRebuilder] = useState(false);
  const [usageStatus, setUsageStatus] = useState(usageLimitService.getUsageStatus());

  React.useEffect(() => {
    const unsubscribe = usageLimitService.subscribe(() => {
      setUsageStatus(usageLimitService.getUsageStatus());
    });
    return unsubscribe;
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
      setError('');
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleAnalyze = async () => {
    if (!resume || !jobDescription.trim()) {
      setError('Please upload a resume and provide a job description');
      return;
    }

    if (!usageStatus.canUse) {
      setError('You have reached your usage limit. Please wait for the reset.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await analyzeResume(resume, jobDescription, customPrompt);
      setAnalysis(result);
      usageLimitService.incrementUsage();
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !usageStatus.canUse;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ATS Resume Analyzer</h1>
          <p className="text-gray-600">
            Get your resume analyzed by AI, receive compatibility scores, and get an optimized version built automatically.
          </p>
        </div>

        <UsageLimitBanner />

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                  disabled={isDisabled}
                />
                <label
                  htmlFor="resume-upload"
                  className={`cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {resume ? resume.name : 'Click to upload your resume'}
                  </p>
                </label>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className={`w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                  isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
                }`}
                disabled={isDisabled}
              />
            </div>
          </div>

          {/* Custom Analysis Prompt */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Analysis Prompt (Optional)
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., 'Focus on technical skills and certifications' or 'Emphasize leadership experience' (leave empty for default analysis)"
              className={`w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
              }`}
              disabled={isDisabled}
            />
            <p className="text-xs text-gray-500 mt-1">
              Customize how the AI analyzes your resume. If left empty, standard ATS analysis will be performed.
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading || isDisabled}
            className={`mt-6 w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              loading || isDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing Resume...
              </div>
            ) : (
              'Analyze Resume'
            )}
          </button>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            <ATSReport analysis={analysis} />
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Resume Rebuilder</h3>
                <button
                  onClick={() => setShowRebuilder(!showRebuilder)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  {showRebuilder ? 'Hide' : 'Show'} Rebuilder
                </button>
              </div>
              
              {showRebuilder && (
                <ResumeRebuilder 
                  originalResume={resume}
                  jobDescription={jobDescription}
                  analysisData={analysis}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};