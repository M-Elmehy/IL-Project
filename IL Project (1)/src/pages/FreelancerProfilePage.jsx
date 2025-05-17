
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Mail, Star, DollarSign, Briefcase, Award, Clock, AlertCircle, MessageSquare, BookOpen, Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExperts } from '@/hooks/useExperts'; // Changed from useFreelancers

const ProfileHeader = ({ expert }) => ( // Renamed from freelancer
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <img  
            src={expert.avatar} 
            alt={expert.name} 
            className="w-full h-full object-cover"
           src="https://images.unsplash.com/photo-1697800132445-857f02ff51df" />
        </div>
      </div>
      <div className="md:w-3/4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{expert.name}</h1>
            <p className="text-lg text-gray-600">{expert.title}</p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center text-green-600 font-semibold">
            <DollarSign className="h-5 w-5 mr-1" />
            <span className="text-xl">${expert.hourlyRate}/hr</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
          <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" /><span>{expert.location}</span></div>
          <div className="flex items-center">
            <div className="flex mr-1">{[1,2,3,4,5].map(s => <Star key={s} className={`h-4 w-4 ${s <= Math.floor(expert.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}</div>
            <span>{expert.rating} ({expert.jobsCompleted} reviews)</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {expert.skills.map(skill => <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{skill}</span>)}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex items-center"><Mail className="mr-2 h-4 w-4" />Contact</Button>
          <Button variant="outline" className="flex items-center"><MessageSquare className="mr-2 h-4 w-4" />Invite to Project</Button>
        </div>
      </div>
    </div>
  </div>
);

const ProfileTabs = ({ expert }) => ( // Renamed from freelancer
  <Tabs defaultValue="overview" className="bg-white rounded-lg shadow-md">
    <TabsList className="w-full border-b p-0 rounded-t-lg">
      <TabsTrigger value="overview" className="flex-1 rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">Overview</TabsTrigger>
      <TabsTrigger value="portfolio" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Work History</TabsTrigger>
      <TabsTrigger value="skills" className="flex-1 rounded-none rounded-tr-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">Expertise & Education</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" className="p-6">
      <h2 className="text-xl font-semibold mb-4">About Me</h2>
      <p className="text-gray-700 whitespace-pre-line mb-6">{expert.description}</p>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-center mb-3"><Briefcase className="h-5 w-5 text-primary mr-2" /><h3 className="font-semibold">Projects Completed</h3></div>
          <p className="text-2xl font-bold">{expert.jobsCompleted}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-center mb-3"><DollarSign className="h-5 w-5 text-green-600 mr-2" /><h3 className="font-semibold">Total Earnings</h3></div>
          <p className="text-2xl font-bold">${expert.totalEarnings.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-center mb-3"><Award className="h-5 w-5 text-yellow-500 mr-2" /><h3 className="font-semibold">Success Rate</h3></div>
          <p className="text-2xl font-bold">98%</p>
        </div>
      </div>
      <Separator className="my-6" />
      <h2 className="text-xl font-semibold mb-4">Languages</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {expert.languages.map(lang => <span key={lang} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{lang}</span>)}
      </div>
    </TabsContent>
    <TabsContent value="portfolio" className="p-6">
      <h2 className="text-xl font-semibold mb-4">Work History & Portfolio</h2>
      {expert.workHistory.length === 0 ? (
        <div className="text-center py-10"><Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" /><h3 className="text-lg font-semibold mb-2">No work history yet</h3><p className="text-gray-600">This expert hasn't completed any projects on SimHub yet.</p></div>
      ) : (
        <div className="space-y-8">
          {expert.workHistory.map((work, index) => (
            <div key={index} className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">{work.title}</h3>
              <div className="flex items-center text-gray-600 mb-3"><Clock className="h-4 w-4 mr-2" /><span>Completed on {new Date(work.completedDate).toLocaleDateString()}</span></div>
              <p className="text-gray-700 mb-3">{work.description}</p>
              <div className="bg-gray-50 p-3 rounded-md"><h4 className="font-medium mb-1">Client Feedback:</h4><p className="text-gray-700 italic">{work.clientFeedback}</p></div>
            </div>
          ))}
        </div>
      )}
    </TabsContent>
    <TabsContent value="skills" className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center"><Brain className="mr-2 h-5 w-5 text-primary"/>Skills & Expertise</h2>
          <div className="space-y-4">
            {expert.skills.map(skill => (
              <div key={skill} className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center"><span className="font-medium">{skill}</span><div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={`h-4 w-4 ${s <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center"><BookOpen className="mr-2 h-5 w-5 text-primary"/>Education</h2>
          {expert.education.length === 0 ? <p className="text-gray-600">No education information provided.</p> : (
            <div className="space-y-4">
              {expert.education.map((edu, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-gray-600 text-sm">Graduated: {edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  </Tabs>
);

const ExpertProfilePage = () => { // Renamed from FreelancerProfilePage
  const { id } = useParams();
  const navigate = useNavigate();
  const { getExpertById } = useExperts(); // Changed from useFreelancers
  
  const expert = getExpertById(id); // Renamed from freelancer

  if (!expert) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Expert Not Found</h1>
        <p className="text-gray-600 mb-8">The expert profile you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/experts')}><ArrowLeft className="mr-2 h-4 w-4" />Back to Experts</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/experts" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />Back to Experts & Trainers
          </Link>
          <ProfileHeader expert={expert} />
          <ProfileTabs expert={expert} />
        </motion.div>
      </div>
    </div>
  );
};

export default ExpertProfilePage;
