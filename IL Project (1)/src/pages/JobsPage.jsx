
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, DollarSign, MapPin, Briefcase, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJobs } from '@/hooks/useJobs';
import { formatDate } from '@/lib/dateUtils';

const JobCard = ({ job }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <Link to={`/jobs/${job.id}`} className="text-xl font-semibold text-primary hover:underline">
            {job.title}
          </Link>
          <div className="flex items-center text-gray-500 mt-1 space-x-4">
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1" />
              <span className="text-sm">{job.category}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{job.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{formatDate(job.postedDate)}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-green-600 font-semibold">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>${job.budget}</span>
          </div>
          <span className="text-sm text-gray-500">{job.duration}</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <p className="text-gray-600 mb-4 line-clamp-2">
        {job.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill) => (
          <span 
            key={skill} 
            className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img  
              src={job.postedBy.avatar} 
              alt={job.postedBy.name} 
              className="w-full h-full object-cover"
             src="https://images.unsplash.com/photo-1697800132445-857f02ff51df" />
          </div>
          <span className="text-sm text-gray-600">{job.postedBy.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{job.proposals} proposals</span>
          <Link to={`/jobs/${job.id}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

const JobFilters = ({ filters, setFilters, categories, allSkills, clearFilters, showFilters, setShowFilters, searchTerm, setSearchTerm }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-6">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input 
          type="text" 
          placeholder="Search for projects..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className="h-4 w-4" />
        Filters
        <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </Button>
    </div>

    {showFilters && (
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 pt-4 border-t"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="mb-2 block">Category</Label>
            <Select 
              value={filters.category} 
              onValueChange={(value) => setFilters(prev => ({...prev, category: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block">Budget Range</Label>
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                placeholder="Min" 
                value={filters.minBudget}
                onChange={(e) => setFilters(prev => ({...prev, minBudget: e.target.value}))}
              />
              <span>-</span>
              <Input 
                type="number" 
                placeholder="Max" 
                value={filters.maxBudget}
                onChange={(e) => setFilters(prev => ({...prev, maxBudget: e.target.value}))}
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Skills</Label>
            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
              {allSkills.slice(0, 10).map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`skill-${skill}`} 
                    checked={filters.skills.includes(skill)}
                    onCheckedChange={() => {
                       setFilters(prev => {
                        const updatedSkills = prev.skills.includes(skill)
                          ? prev.skills.filter(s => s !== skill)
                          : [...prev.skills, skill];
                        return { ...prev, skills: updatedSkills };
                      });
                    }}
                  />
                  <Label htmlFor={`skill-${skill}`} className="text-sm">{skill}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={clearFilters} className="flex items-center">
            <X className="mr-1 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      </motion.div>
    )}
  </div>
);

const JobsPage = () => {
  const { jobs, loading, filterJobs, jobCategories, jobSkills } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    minBudget: '',
    maxBudget: '',
    skills: []
  });

  useEffect(() => {
    const currentFilters = { search: searchTerm, ...filters };
    const results = filterJobs(currentFilters);
    setFilteredJobs(results);
  }, [searchTerm, filters, jobs, filterJobs]);

  const clearFilters = () => {
    setFilters({
      category: 'All',
      minBudget: '',
      maxBudget: '',
      skills: []
    });
    setSearchTerm('');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Find Projects</h1>
          <p className="text-gray-600">Browse through specialized simulation project opportunities</p>
        </motion.div>

        <JobFilters 
          filters={filters}
          setFilters={setFilters}
          categories={['All', ...jobCategories]}
          allSkills={jobSkills}
          clearFilters={clearFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'project' : 'projects'} found
          </p>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="budget-high">Budget: High to Low</SelectItem>
              <SelectItem value="budget-low">Budget: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading projects...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search filters or check back later.</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
