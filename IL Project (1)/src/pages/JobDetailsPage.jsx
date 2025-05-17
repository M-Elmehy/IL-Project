
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, MapPin, Clock, DollarSign, Calendar, Users, ArrowLeft, Send, AlertCircle, Star
} from 'lucide-react'; // Added Star
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useJobs } from '@/hooks/useJobs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { formatDate } from '@/lib/dateUtils';

const JobHeader = ({ job }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
      <div className="mt-2 md:mt-0 flex items-center text-green-600 font-semibold">
        <DollarSign className="h-5 w-5 mr-1" />
        <span className="text-xl">${job.budget}</span>
      </div>
    </div>

    <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
      <div className="flex items-center"><Briefcase className="h-4 w-4 mr-2" /><span>{job.category}</span></div>
      <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" /><span>{job.location}</span></div>
      <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /><span>Posted on {formatDate(job.postedDate, { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
      <div className="flex items-center"><Clock className="h-4 w-4 mr-2" /><span>{job.duration}</span></div>
      <div className="flex items-center"><Users className="h-4 w-4 mr-2" /><span>{job.proposals} proposals</span></div>
    </div>

    <div className="flex items-center mb-6">
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
        <img  
          src={job.postedBy.avatar} 
          alt={job.postedBy.name} 
          className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1697800132445-857f02ff51df" />
      </div>
      <div>
        <h3 className="font-semibold">{job.postedBy.name}</h3>
        <p className="text-sm text-gray-500">Client</p>
      </div>
    </div>
  </div>
);

const JobTabs = ({ job }) => (
  <Tabs defaultValue="description" className="bg-white rounded-lg shadow-md">
    <TabsList className="w-full border-b p-0 rounded-t-lg">
      <TabsTrigger value="description" className="flex-1 rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">Description</TabsTrigger>
      <TabsTrigger value="skills" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Skills Required</TabsTrigger>
      <TabsTrigger value="about" className="flex-1 rounded-none rounded-tr-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">About Client</TabsTrigger>
    </TabsList>
    
    <TabsContent value="description" className="p-6">
      <h2 className="text-xl font-semibold mb-4">Project Description</h2>
      <p className="text-gray-700 whitespace-pre-line mb-6">{job.description}</p>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Project Scope</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            <div className="flex justify-between"><span className="text-gray-600">Budget:</span><span className="font-medium">${job.budget}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Duration:</span><span className="font-medium">{job.duration}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Location:</span><span className="font-medium">{job.location}</span></div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Activity on this project</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            <div className="flex justify-between"><span className="text-gray-600">Proposals:</span><span className="font-medium">{job.proposals}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Last viewed by client:</span><span className="font-medium">Recently</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Invites sent:</span><span className="font-medium">5</span></div>
          </div>
        </div>
      </div>
    </TabsContent>
    
    <TabsContent value="skills" className="p-6">
      <h2 className="text-xl font-semibold mb-4">Skills Required</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {job.skills.map((skill) => (
          <span key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
        ))}
      </div>
      <Separator className="my-6" />
      <div>
        <h3 className="font-semibold mb-3">Experience Level</h3>
        <p className="text-gray-700 mb-6">This project requires an intermediate to expert level of experience with the listed skills.</p>
      </div>
    </TabsContent>
    
    <TabsContent value="about" className="p-6">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img  src={job.postedBy.avatar} alt={job.postedBy.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{job.postedBy.name}</h2>
          <p className="text-gray-600">Member since January 2023</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
          <h3 className="font-semibold mb-2">Client Information</h3>
          <div className="flex justify-between"><span className="text-gray-600">Location:</span><span>United States</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Projects Posted:</span><span>12</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Total Spent:</span><span>$15,000+</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Hire Rate:</span><span>85%</span></div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
          <h3 className="font-semibold mb-2">Client Ratings</h3>
          <div className="flex items-center">
            <div className="flex mr-2">{[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-yellow-400 fill-current"/>)}</div>
            <span className="font-medium">4.9/5</span>
          </div>
          <div className="flex justify-between"><span className="text-gray-600">Communication:</span><span>5.0/5</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Payment:</span><span>4.9/5</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Clarity:</span><span>4.8/5</span></div>
        </div>
      </div>
    </TabsContent>
  </Tabs>
);

const ProposalDialog = ({ isOpen, onOpenChange, onSubmit, proposal, setProposal }) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Submit a Proposal</DialogTitle>
        <DialogDescription>Provide details about your proposal for this project.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="bid" className="text-right">Your Bid ($)</Label>
          <Input id="bid" type="number" placeholder="Enter your bid" className="col-span-3" value={proposal.bid} onChange={(e) => setProposal({...proposal, bid: e.target.value})} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="deliveryTime" className="text-right">Delivery Time</Label>
          <Input id="deliveryTime" placeholder="e.g., 2 weeks" className="col-span-3" value={proposal.deliveryTime} onChange={(e) => setProposal({...proposal, deliveryTime: e.target.value})} />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="coverLetter" className="text-right pt-2">Cover Letter</Label>
          <textarea id="coverLetter" placeholder="Explain why you're the best fit..." className="col-span-3 flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={proposal.coverLetter} onChange={(e) => setProposal({...proposal, coverLetter: e.target.value})} />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button onClick={onSubmit}>Submit Proposal</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, submitProposal } = useJobs();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
  const [proposal, setProposal] = useState({ bid: '', coverLetter: '', deliveryTime: '' });

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/jobs')}><ArrowLeft className="mr-2 h-4 w-4" />Back to Projects</Button>
      </div>
    );
  }

  const handleProposalSubmit = () => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please log in or register.", variant: "destructive" });
      navigate('/login');
      return;
    }
    if (!proposal.bid || !proposal.coverLetter || !proposal.deliveryTime) {
      toast({ title: "Missing information", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    const success = submitProposal(job.id, { freelancerId: user.id, freelancerName: user.name || user.email.split('@')[0], bid: parseFloat(proposal.bid), coverLetter: proposal.coverLetter, deliveryTime: proposal.deliveryTime });
    if (success) {
      setIsProposalDialogOpen(false);
      setProposal({ bid: '', coverLetter: '', deliveryTime: '' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/jobs" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />Back to Projects
          </Link>
          <JobHeader job={job} />
          <Button className="w-full md:w-auto mb-6" onClick={() => setIsProposalDialogOpen(true)}>
            <Send className="mr-2 h-4 w-4" />Submit a Proposal
          </Button>
          <JobTabs job={job} />
        </motion.div>
      </div>
      <ProposalDialog isOpen={isProposalDialogOpen} onOpenChange={setIsProposalDialogOpen} onSubmit={handleProposalSubmit} proposal={proposal} setProposal={setProposal} />
    </div>
  );
};

export default JobDetailsPage;
