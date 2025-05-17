
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { jobCategories, jobSkills, sampleJobsData } from '@/data/jobData';

const JOBS_STORAGE_KEY = 'simHubJobs';

const initializeJobs = () => {
  const storedJobs = localStorage.getItem(JOBS_STORAGE_KEY);
  if (storedJobs) {
    return JSON.parse(storedJobs);
  }
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(sampleJobsData));
  return sampleJobsData;
};

export const useJobs = () => {
  const [jobs, setJobs] = useState(initializeJobs);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(false);
  }, []);

  const updateLocalStorage = (updatedJobs) => {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updatedJobs));
  };

  const getJobById = (id) => {
    return jobs.find(job => job.id === id);
  };

  const addJob = (jobData) => {
    try {
      const newJob = {
        ...jobData,
        id: Date.now().toString(),
        postedDate: new Date().toISOString(),
        proposals: 0,
        status: 'open',
        proposalsData: []
      };
      
      const updatedJobs = [...jobs, newJob];
      setJobs(updatedJobs);
      updateLocalStorage(updatedJobs);
      
      toast({
        title: "Project posted successfully",
        description: "Your project has been posted and is now visible.",
      });
      
      return newJob;
    } catch (error) {
      toast({
        title: "Error posting project",
        description: error.message || "An error occurred while posting the project.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateJob = (id, updatedData) => {
    try {
      const updatedJobs = jobs.map(job => 
        job.id === id ? { ...job, ...updatedData } : job
      );
      
      setJobs(updatedJobs);
      updateLocalStorage(updatedJobs);
      
      toast({
        title: "Project updated successfully",
        description: "Your project posting has been updated.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error updating project",
        description: error.message || "An error occurred while updating the project.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteJob = (id) => {
    try {
      const updatedJobs = jobs.filter(job => job.id !== id);
      
      setJobs(updatedJobs);
      updateLocalStorage(updatedJobs);
      
      toast({
        title: "Project deleted successfully",
        description: "Your project posting has been removed.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error deleting project",
        description: error.message || "An error occurred while deleting the project.",
        variant: "destructive",
      });
      return false;
    }
  };

  const submitProposal = (jobId, proposalData) => {
    try {
      const job = jobs.find(j => j.id === jobId);
      
      if (!job) {
        toast({
          title: "Error submitting proposal",
          description: "Project not found.",
          variant: "destructive",
        });
        return false;
      }
      
      if (!job.proposalsData) {
        job.proposalsData = [];
      }
      
      const newProposal = {
        id: Date.now().toString(),
        ...proposalData,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      
      job.proposalsData.push(newProposal);
      job.proposals = job.proposalsData.length;
      
      const updatedJobs = jobs.map(j => j.id === jobId ? job : j);
      setJobs(updatedJobs);
      updateLocalStorage(updatedJobs);
      
      toast({
        title: "Proposal submitted successfully",
        description: "Your proposal has been sent to the client.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error submitting proposal",
        description: error.message || "An error occurred while submitting your proposal.",
        variant: "destructive",
      });
      return false;
    }
  };

  const filterJobs = (filters) => {
    let filteredJobs = [...jobs];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) || 
        job.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category && filters.category !== 'All') {
      filteredJobs = filteredJobs.filter(job => job.category === filters.category);
    }
    
    if (filters.minBudget) {
      filteredJobs = filteredJobs.filter(job => job.budget >= parseFloat(filters.minBudget));
    }
    
    if (filters.maxBudget) {
      filteredJobs = filteredJobs.filter(job => job.budget <= parseFloat(filters.maxBudget));
    }
    
    if (filters.skills && filters.skills.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filters.skills.every(skill => job.skills.includes(skill))
      );
    }
    
    return filteredJobs;
  };

  return {
    jobs,
    loading,
    getJobById,
    addJob,
    updateJob,
    deleteJob,
    submitProposal,
    filterJobs,
    jobCategories,
    jobSkills
  };
};
