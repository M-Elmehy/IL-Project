
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { softwareCategories, softwareSkills, sampleSoftwareData } from '@/data/softwareData';

const SOFTWARE_STORAGE_KEY = 'simHubSoftware';

const initializeSoftware = () => {
  const storedSoftware = localStorage.getItem(SOFTWARE_STORAGE_KEY);
  if (storedSoftware) {
    return JSON.parse(storedSoftware);
  }
  localStorage.setItem(SOFTWARE_STORAGE_KEY, JSON.stringify(sampleSoftwareData));
  return sampleSoftwareData;
};

export const useSoftware = () => {
  const [softwareList, setSoftwareList] = useState(initializeSoftware);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(false);
  }, []);

  const updateLocalStorage = (updatedSoftwareList) => {
    localStorage.setItem(SOFTWARE_STORAGE_KEY, JSON.stringify(updatedSoftwareList));
  };

  const getSoftwareById = (id) => {
    return softwareList.find(sw => sw.id === id);
  };

  const addSoftware = (softwareData) => {
    try {
      const newSoftware = {
        ...softwareData,
        id: Date.now().toString(),
        postedDate: new Date().toISOString(),
        rating: 0,
        reviews: 0,
      };
      
      const updatedSoftwareList = [...softwareList, newSoftware];
      setSoftwareList(updatedSoftwareList);
      updateLocalStorage(updatedSoftwareList);
      
      toast({
        title: "Software offered successfully",
        description: "Your software has been listed.",
      });
      
      return newSoftware;
    } catch (error) {
      toast({
        title: "Error offering software",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
      return null;
    }
  };
  
  const filterSoftware = (filters) => {
    let filteredSoftware = [...softwareList];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredSoftware = filteredSoftware.filter(sw => 
        sw.name.toLowerCase().includes(searchTerm) || 
        sw.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category && filters.category !== 'All') {
      filteredSoftware = filteredSoftware.filter(sw => sw.category === filters.category);
    }
    
    if (filters.minPrice) {
      filteredSoftware = filteredSoftware.filter(sw => sw.price >= parseFloat(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      filteredSoftware = filteredSoftware.filter(sw => sw.price <= parseFloat(filters.maxPrice));
    }
    
    if (filters.features && filters.features.length > 0) {
      filteredSoftware = filteredSoftware.filter(sw => 
        filters.features.every(feature => sw.features.includes(feature))
      );
    }
    
    return filteredSoftware;
  };


  return {
    softwareList,
    loading,
    getSoftwareById,
    addSoftware,
    filterSoftware,
    softwareCategories,
    softwareSkills
  };
};
