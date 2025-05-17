
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { hardwareCategories, hardwareFeatures, sampleHardwareData } from '@/data/hardwareData';

const HARDWARE_STORAGE_KEY = 'simHubHardware';

const initializeHardware = () => {
  const storedHardware = localStorage.getItem(HARDWARE_STORAGE_KEY);
  if (storedHardware) {
    return JSON.parse(storedHardware);
  }
  localStorage.setItem(HARDWARE_STORAGE_KEY, JSON.stringify(sampleHardwareData));
  return sampleHardwareData;
};

export const useHardware = () => {
  const [hardwareList, setHardwareList] = useState(initializeHardware);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(false);
  }, []);

  const updateLocalStorage = (updatedHardwareList) => {
    localStorage.setItem(HARDWARE_STORAGE_KEY, JSON.stringify(updatedHardwareList));
  };

  const getHardwareById = (id) => {
    return hardwareList.find(hw => hw.id === id);
  };

  const addHardware = (hardwareData) => {
    try {
      const newHardware = {
        ...hardwareData,
        id: Date.now().toString(),
        postedDate: new Date().toISOString(),
        rating: 0,
        reviews: 0,
      };
      
      const updatedHardwareList = [...hardwareList, newHardware];
      setHardwareList(updatedHardwareList);
      updateLocalStorage(updatedHardwareList);
      
      toast({
        title: "Hardware offered successfully",
        description: "Your hardware has been listed.",
      });
      
      return newHardware;
    } catch (error) {
      toast({
        title: "Error offering hardware",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
      return null;
    }
  };

  const filterHardware = (filters) => {
    let filteredHardware = [...hardwareList];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredHardware = filteredHardware.filter(hw => 
        hw.name.toLowerCase().includes(searchTerm) || 
        hw.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category && filters.category !== 'All') {
      filteredHardware = filteredHardware.filter(hw => hw.category === filters.category);
    }
    
    if (filters.minPrice) {
      filteredHardware = filteredHardware.filter(hw => hw.price >= parseFloat(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      filteredHardware = filteredHardware.filter(hw => hw.price <= parseFloat(filters.maxPrice));
    }
    
    if (filters.features && filters.features.length > 0) {
      filteredHardware = filteredHardware.filter(hw => 
        filters.features.every(feature => hw.features.includes(feature))
      );
    }
    
    return filteredHardware;
  };

  return {
    hardwareList,
    loading,
    getHardwareById,
    addHardware,
    filterHardware,
    hardwareCategories,
    hardwareFeatures
  };
};
