
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, DollarSign, ChevronDown, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExperts } from '@/hooks/useExperts';

const ExpertCard = ({ expert }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img  
            src={expert.avatar}
            alt={expert.name}
            className="w-full h-full object-cover"
           src="https://images.unsplash.com/photo-1634896941598-b6b500a502a7" />
        </div>
        <div>
          <Link to={`/experts/${expert.id}`} className="text-lg font-semibold text-primary hover:underline">
            {expert.name}
          </Link>
          <p className="text-gray-600">{expert.title}</p>
          <div className="flex items-center mt-1">
            <div className="flex mr-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= Math.floor(expert.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{expert.rating}</span>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <p className="text-gray-600 mb-4 line-clamp-2">
        {expert.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {expert.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
        {expert.skills.length > 3 && (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            +{expert.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-green-600 font-semibold">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>${expert.hourlyRate}/hr</span>
        </div>
        <Link to={`/experts/${expert.id}`}>
          <Button>View Profile</Button>
        </Link>
      </div>
    </div>
  </motion.div>
);

const ExpertFilters = ({ filters, setFilters, allSkills, clearFilters, showFilters, setShowFilters }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-6">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for experts, trainers, or owners..."
          className="pl-10"
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
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
            <Label className="mb-2 block">Hourly Rate Range ($)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minRate}
                onChange={(e) => setFilters(prev => ({ ...prev, minRate: e.target.value }))}
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxRate}
                onChange={(e) => setFilters(prev => ({ ...prev, maxRate: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Minimum Rating</Label>
            <Select
              value={filters.minRating}
              onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any rating</SelectItem>
                <SelectItem value="4.5">4.5 & up</SelectItem>
                <SelectItem value="4">4.0 & up</SelectItem>
                <SelectItem value="3.5">3.5 & up</SelectItem>
                <SelectItem value="3">3.0 & up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block">Skills / Expertise</Label>
            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
              {allSkills.slice(0, 10).map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-expert-${skill}`}
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
                  <Label htmlFor={`skill-expert-${skill}`} className="text-sm">{skill}</Label>
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


const ExpertsPage = () => {
  const { experts, loading, filterExperts: applyFiltersHook, expertSkills } = useExperts();
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    skills: [],
    minRate: '',
    maxRate: '',
    minRating: ''
  });

  useEffect(() => {
    const results = applyFiltersHook(filters);
    setFilteredExperts(results);
  }, [filters, experts, applyFiltersHook]);

  const clearFilters = () => {
    setFilters({
      search: '',
      skills: [],
      minRate: '',
      maxRate: '',
      minRating: ''
    });
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
          <h1 className="text-3xl font-bold mb-2">Find Experts & Trainers</h1>
          <p className="text-gray-600">Browse our community of simulation software trainers, experts, and hardware owners.</p>
        </motion.div>

        <ExpertFilters
          filters={filters}
          setFilters={setFilters}
          allSkills={expertSkills}
          clearFilters={clearFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredExperts.length} {filteredExperts.length === 1 ? 'expert' : 'experts'} found
          </p>
          <Select defaultValue="rating">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
              <SelectItem value="rate-high">Rate: High to Low</SelectItem>
              <SelectItem value="rate-low">Rate: Low to High</SelectItem>
              <SelectItem value="jobs">Projects Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading experts...</p>
          </div>
        ) : filteredExperts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No experts found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search filters or check back later.</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExpertsPage;
