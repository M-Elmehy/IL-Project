
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { expertSkills, sampleExpertsData } from '@/data/expertData';

const EXPERTS_STORAGE_KEY = 'simHubExperts';

const initializeExperts = () => {
  const storedExperts = localStorage.getItem(EXPERTS_STORAGE_KEY);
  if (storedExperts) {
    return JSON.parse(storedExperts);
  }
  localStorage.setItem(EXPERTS_STORAGE_KEY, JSON.stringify(sampleExpertsData));
  return sampleExpertsData;
};

export const useExperts = () => {
  const [experts, setExperts] = useState(initializeExperts);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(false);
  }, []);

  const updateLocalStorage = (updatedExperts) => {
    localStorage.setItem(EXPERTS_STORAGE_KEY, JSON.stringify(updatedExperts));
  };

  const getExpertById = (id) => {
    return experts.find(expert => expert.id === id);
  };

  const addExpert = (expertData) => {
    try {
      const newExpert = {
        ...expertData,
        id: Date.now().toString(),
        rating: 0,
        totalEarnings: 0,
        jobsCompleted: 0,
        workHistory: []
      };
      
      const updatedExperts = [...experts, newExpert];
      setExperts(updatedExperts);
      updateLocalStorage(updatedExperts);
      
      toast({
        title: "Profile created successfully",
        description: "Your expert profile has been created.",
      });
      
      return newExpert;
    } catch (error) {
      toast({
        title: "Error creating profile",
        description: error.message || "An error occurred while creating your profile.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateExpert = (id, updatedData) => {
    try {
      const updatedExperts = experts.map(expert => 
        expert.id === id ? { ...expert, ...updatedData } : expert
      );
      
      setExperts(updatedExperts);
      updateLocalStorage(updatedExperts);
      
      toast({
        title: "Profile updated successfully",
        description: "Your profile has been updated.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: error.message || "An error occurred while updating your profile.",
        variant: "destructive",
      });
      return false;
    }
  };

  const filterExperts = (filters) => {
    let filteredExperts = [...experts];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredExperts = filteredExperts.filter(expert => 
        expert.name.toLowerCase().includes(searchTerm) || 
        expert.title.toLowerCase().includes(searchTerm) ||
        expert.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.skills && filters.skills.length > 0) {
      filteredExperts = filteredExperts.filter(expert => 
        filters.skills.every(skill => expert.skills.includes(skill))
      );
    }
    
    if (filters.minRate) {
      filteredExperts = filteredExperts.filter(expert => 
        expert.hourlyRate >= parseFloat(filters.minRate)
      );
    }
    
    if (filters.maxRate) {
      filteredExperts = filteredExperts.filter(expert => 
        expert.hourlyRate <= parseFloat(filters.maxRate)
      );
    }
    
    if (filters.minRating) {
      filteredExperts = filteredExperts.filter(expert => 
        expert.rating >= parseFloat(filters.minRating)
      );
    }
    
    return filteredExperts;
  };

  return {
    experts,
    loading,
    getExpertById,
    addExpert,
    updateExpert,
    filterExperts,
    expertSkills
  };
};
