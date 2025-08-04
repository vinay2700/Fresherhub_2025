import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JobDetailsModal from './JobDetailsModal';
import HREmailModal from './HREmailModal';
import JobFilters from './JobFilters';
import SearchBar from './SearchBar';
import { Job } from '../types/Job';
import { Briefcase, TrendingUp } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { usageLimitService } from '../services/usageLimitService';

interface JobBoardProps {
  searchParams?: { query?: string; location?: string };
  onNavigateToATS?: (jobDescription?: string) => void;
  onNavigateToCoverLetter?: (jobDescription?: string, jobTitle?: string, companyName?: string) => void;
}

const JobBoard: React.FC<JobBoardProps> = ({ searchParams, onNavigateToATS, onNavigateToCoverLetter }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams?.query || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams?.location || '');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showHREmailModal, setShowHREmailModal] = useState(false);
  const [hrEmailJob, setHREmailJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
    
    // Subscribe to real-time job updates
    const subscription = supabaseService.subscribeToJobs((updatedJobs) => {
      setJobs(updatedJobs);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };

  const handleViewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  const handleGetHREmail = (job: Job) => {
    setHREmailJob(job);
    setShowHREmailModal(true);
    setSelectedJob(null); // Close job details modal
  };

  const handleCloseHREmailModal = () => {
    setShowHREmailModal(false);
    setHREmailJob(null);
  };

  const handleAnalyzeResume = (job: Job) => {
    setSelectedJob(null); // Close modal
    if (onNavigateToATS) {
      onNavigateToATS(job.description);
    }
  };

  const handleWriteCoverLetter = (job: Job) => {
    setSelectedJob(null); // Close modal
    if (onNavigateToCoverLetter) {
      onNavigateToCoverLetter(job.description, job.title, job.company);
    }
  };
  }, []);

  // Set initial search parameters from homepage
  useEffect(() => {
    if (searchParams?.query) {
      setSearchQuery(searchParams.query);
    }
    if (searchParams?.location) {
      setSelectedLocation(searchParams.location);
    }
  }, [searchParams]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchQuery, selectedLocation, selectedExperience]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      // Get jobs from Supabase (centralized storage)
      const supabaseJobs = await supabaseService.getAllJobs();
      
      // Add some demo jobs if no jobs exist in database
      const demoJobs = supabaseJobs.length === 0 ? getDemoJobs() : [];
      
      setJobs([...supabaseJobs, ...demoJobs]);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs(getDemoJobs());
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedExperience) {
      filtered = filtered.filter(job =>
        job.experience.toLowerCase() === selectedExperience.toLowerCase()
      );
    }

    setFilteredJobs(filtered);
  };

  const getDemoJobs = (): Job[] => [
    {
      id: 'demo-1',
      title: 'Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'Bangalore, India',
      experience: 'Fresher',
      salary: '₹3-5 LPA',
      description: 'Join our dynamic team as a Frontend Developer! We are looking for passionate individuals who love creating beautiful, responsive web applications. You will work with cutting-edge technologies and collaborate with experienced developers to build amazing user experiences.',
      skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Tailwind CSS'],
      postedDate: '2024-01-15',
      source: 'LinkedIn',
      type: 'Full-time',
      remote: false,
      applyUrl: 'https://techcorp.com/careers/frontend-developer'
    },
    {
      id: 'demo-2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Hyderabad, India',
      experience: '0-1 years',
      salary: '₹4-6 LPA',
      description: 'Exciting opportunity to join our growing startup as a Full Stack Developer. Work with modern technologies, build scalable applications, and be part of a team that values innovation and creativity. Perfect for someone who wants to make a real impact.',
      skills: ['Node.js', 'React', 'MongoDB', 'Express', 'JavaScript', 'AWS'],
      postedDate: '2024-01-14',
      source: 'Indeed',
      type: 'Full-time',
      remote: true,
      applyUrl: 'https://startupxyz.com/jobs/fullstack-developer'
    },
    {
      id: 'demo-3',
      title: 'Software Engineer',
      company: 'MegaTech Solutions',
      location: 'Pune, India',
      experience: 'Fresher',
      salary: '₹3.5-5.5 LPA',
      description: 'Entry-level Software Engineer position with excellent growth opportunities. Work alongside experienced mentors, contribute to large-scale projects, and develop your skills in a supportive environment. We provide comprehensive training and career development programs.',
      skills: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Git', 'Docker'],
      postedDate: '2024-01-13',
      source: 'Naukri',
      type: 'Full-time',
      remote: false,
      applyUrl: 'https://megatech.com/careers/software-engineer-fresher'
    },
    {
      id: 'demo-4',
      title: 'Data Analyst',
      company: 'DataCorp Analytics',
      location: 'Hyderabad, India',
      experience: 'Fresher',
      salary: '₹3-4.5 LPA',
      description: 'Join our data analytics team as a fresher Data Analyst. Learn to work with large datasets, create insightful reports, and help drive business decisions through data-driven insights. Great opportunity for freshers interested in data science.',
      skills: ['Python', 'SQL', 'Excel', 'Tableau', 'Statistics', 'Data Visualization'],
      postedDate: '2024-01-12',
      source: 'LinkedIn',
      type: 'Full-time',
      remote: false,
      applyUrl: 'https://datacorp.com/careers/data-analyst'
    },
    {
      id: 'demo-5',
      title: 'UI/UX Designer',
      company: 'DesignStudio Pro',
      location: 'Mumbai, India',
      experience: '0-1 years',
      salary: '₹2.5-4 LPA',
      description: 'Creative UI/UX Designer position for freshers passionate about creating beautiful and intuitive user experiences. Work on diverse projects, learn from senior designers, and contribute to innovative design solutions.',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'User Research', 'Prototyping'],
      postedDate: '2024-01-11',
      source: 'Behance',
      type: 'Full-time',
      remote: true,
      applyUrl: 'https://designstudio.com/careers/ui-ux-designer'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <Briefcase className="h-8 w-8" />
            <TrendingUp className="h-6 w-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl">
            Discover thousands of fresher opportunities from top companies. Start your career journey with the perfect role.
          </p>
          <div className="flex items-center space-x-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{jobs.length}+ Active Jobs</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Updated in Real-time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <JobFilters
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
          />
        </aside>

        <main className="lg:w-3/4">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 bg-white rounded-2xl shadow-xl">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading amazing opportunities...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredJobs.length} Jobs Found
                  {(searchQuery || selectedLocation) && (
                    <span className="text-lg font-normal text-gray-600 ml-2">
                      {searchQuery && `for "${searchQuery}"`}
                      {searchQuery && selectedLocation && ' '}
                      {selectedLocation && `in ${selectedLocation}`}
                    </span>
                  )}
                </h2>
                <div className="text-sm text-gray-500">
                  Real-time updates from global database
                </div>
              </div>
              
              <div className="grid gap-6">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} onViewDetails={handleViewJobDetails} />
                ))}
              </div>
              
              {filteredJobs.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
                  <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery || selectedLocation 
                      ? `No jobs found ${searchQuery ? `for "${searchQuery}"` : ''} ${selectedLocation ? `in ${selectedLocation}` : ''}. Try adjusting your search criteria.`
                      : 'Try adjusting your search criteria or filters.'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedLocation('');
                      setSelectedExperience('');
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={handleCloseJobDetails}
          onGetHREmail={handleGetHREmail}
          onAnalyzeResume={handleAnalyzeResume}
          onWriteCoverLetter={handleWriteCoverLetter}
        />
      )}

      {/* HR Email Modal */}
      {showHREmailModal && hrEmailJob && (
        <HREmailModal
          job={hrEmailJob}
          onClose={handleCloseHREmailModal}
        />
      )}
    </div>
  );
};

export default JobBoard;