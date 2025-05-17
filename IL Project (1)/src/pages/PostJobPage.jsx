
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Clock, MapPin, Plus, X, CheckCircle, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJobs } from '@/hooks/useJobs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

const FormField = ({ id, label, children, error }) => (
  <div>
    <Label htmlFor={id} className="text-base font-medium">{label}</Label>
    <div className="mt-1">{children}</div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const SkillsInput = ({ skills, setSkills, error }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  return (
    <div>
      <Label className="text-base font-medium">Required Skills / Expertise</Label>
      <div className="mt-1">
        <div className="flex">
          <Input
            placeholder="Add a skill (e.g., VR Development, Simulation Software)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className={error ? "border-red-500" : ""}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); }}}
          />
          <Button type="button" onClick={addSkill} className="ml-2"><Plus className="h-4 w-4" /></Button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill) => (
            <div key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              {skill}
              <button type="button" onClick={() => removeSkill(skill)} className="ml-1 text-blue-700 hover:text-blue-900"><X className="h-3 w-3" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TipsSection = () => (
  <div className="mt-8 bg-blue-50 rounded-lg p-6">
    <h2 className="text-lg font-semibold mb-4 flex items-center text-blue-800">
      <CheckCircle className="mr-2 h-5 w-5" />Tips for a Great Project Posting
    </h2>
    <ul className="space-y-2 text-blue-700">
      {[
        "Be specific about your requirements and expectations.",
        "Provide a clear and detailed project description.",
        "Set a realistic budget based on the scope of work.",
        "List all the skills and expertise required for the project.",
        "Include any relevant deadlines or milestones."
      ].map((tip, i) => (
        <li key={i} className="flex items-start"><span className="mr-2">•</span><span>{tip}</span></li>
      ))}
    </ul>
  </div>
);

const PostJobPage = () => {
  const navigate = useNavigate();
  const { addJob, jobCategories } = useJobs();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [jobData, setJobData] = useState({
    title: '', description: '', category: '', budget: '', duration: '', location: 'Remote', skills: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    navigate('/login');
    toast({ title: "Authentication required", description: "Please log in to post a project.", variant: "destructive" });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSelectChange = (name, value) => {
    setJobData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!jobData.title.trim()) newErrors.title = "Title is required";
    if (!jobData.description.trim()) newErrors.description = "Description is required";
    if (!jobData.category) newErrors.category = "Category is required";
    if (!jobData.budget) newErrors.budget = "Budget is required";
    else if (isNaN(jobData.budget) || Number(jobData.budget) <= 0) newErrors.budget = "Budget must be a positive number";
    if (!jobData.duration.trim()) newErrors.duration = "Duration is required";
    if (jobData.skills.length === 0) newErrors.skills = "At least one skill/expertise is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const completeJobData = { ...jobData, budget: Number(jobData.budget), postedBy: { id: user.id, name: user.name || user.email.split('@')[0], avatar: user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg' }};
    const newJob = await addJob(completeJobData);
    setIsSubmitting(false);
    if (newJob) navigate(`/jobs/${newJob.id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Post a New Project</h1>
            <p className="text-gray-600">Find the perfect expert for your simulation project</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <FormField id="title" label="Project Title" error={errors.title}>
                  <Input id="title" name="title" placeholder="e.g., VR Training Module for Crane Operators" value={jobData.title} onChange={handleChange} className={errors.title ? "border-red-500" : ""} />
                </FormField>
                <FormField id="description" label="Project Description" error={errors.description}>
                  <textarea id="description" name="description" rows={6} placeholder="Describe your project, requirements, and expectations..." value={jobData.description} onChange={handleChange} className={`w-full rounded-md border ${errors.description ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm`} />
                </FormField>
                <FormField id="category" label="Category" error={errors.category}>
                  <Select value={jobData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent>{jobCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                  </Select>
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField id="budget" label="Budget ($)" error={errors.budget}>
                    <div className="relative"><DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="budget" name="budget" type="number" placeholder="e.g., 5000" value={jobData.budget} onChange={handleChange} className={`pl-10 ${errors.budget ? "border-red-500" : ""}`} /></div>
                  </FormField>
                  <FormField id="duration" label="Duration" error={errors.duration}>
                    <div className="relative"><Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="duration" name="duration" placeholder="e.g., 2 months, 3-6 weeks" value={jobData.duration} onChange={handleChange} className={`pl-10 ${errors.duration ? "border-red-500" : ""}`} /></div>
                  </FormField>
                </div>
                <FormField id="location" label="Location">
                  <div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Select value={jobData.location} onValueChange={(value) => handleSelectChange('location', value)}>
                      <SelectTrigger className="pl-10"><SelectValue placeholder="Select location" /></SelectTrigger>
                      <SelectContent><SelectItem value="Remote">Remote</SelectItem><SelectItem value="On-site">On-site</SelectItem><SelectItem value="Hybrid">Hybrid</SelectItem></SelectContent>
                    </Select>
                  </div>
                </FormField>
                <SkillsInput skills={jobData.skills} setSkills={(newSkills) => setJobData(prev => ({...prev, skills: newSkills}))} error={errors.skills} />
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <><div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>Posting Project...</> : <><Briefcase className="mr-2 h-4 w-4" />Post Project</>}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <TipsSection />
        </motion.div>
      </div>
    </div>
  );
};

export default PostJobPage;
