export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: string;
  description: string;
  skills: string[];
  postedDate: string;
  source: string;
  type: string;
  remote: boolean;
  applyUrl?: string; // Optional application URL
  hrEmail?: string; // Optional HR email
}