
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { motion } from 'framer-motion';
import { 
  Briefcase, User, Settings, FileText, MessageSquare, Bell, DollarSign, Clock, CheckCircle, AlertCircle, Search, Users, Plus, MonitorPlay, Cpu
} from 'lucide-react'; // Added MonitorPlay, Cpu
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useJobs } from '@/hooks/useJobs';
// Import hooks for software and hardware if needed for dashboard counts/lists
// import { useSoftware } from '@/hooks/useSoftware';
// import { useHardware } from '@/hooks/useHardware';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs } = useJobs();
  // const { softwareList } = useSoftware(); // Example if you want to show software count
  // const { hardwareList } = useHardware(); // Example if you want to show hardware count
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    navigate('/login');
    return null;
  }

  const userJobs = jobs.filter(job => job.postedBy.id === user.id);
  
  const receivedProposals = userJobs.flatMap(job => 
    job.proposalsData ? job.proposalsData.map(proposal => ({
      ...proposal,
      jobId: job.id,
      jobTitle: job.title
    })) : []
  );

  const submittedProposals = jobs.flatMap(job => {
    if (!job.proposalsData) return [];
    return job.proposalsData
      .filter(proposal => proposal.freelancerId === user.id)
      .map(proposal => ({
        ...proposal,
        jobId: job.id,
        jobTitle: job.title
      }));
  });

  // Example counts for software/hardware - replace with actual logic if needed
  const userSoftwareCount = 0; // softwareList.filter(sw => sw.owner.id === user.id).length;
  const userHardwareCount = 0; // hardwareList.filter(hw => hw.owner.id === user.id).length;


  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src={user.avatar || "https://randomuser.me/api/portraits/men/1.jpg"} alt={user.name} />
                    <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name || user.email.split('@')[0]}</h2>
                  <p className="text-gray-600">{user.title || "Simulation Professional"}</p>
                </div>
                
                <Separator className="my-4" />
                
                <nav className="space-y-1">
                  {[
                    { name: 'Overview', icon: User, tab: 'overview' },
                    { name: 'My Projects', icon: Briefcase, tab: 'projects' },
                    { name: 'Proposals', icon: FileText, tab: 'proposals' },
                    { name: 'My Software', icon: MonitorPlay, tab: 'my-software' },
                    { name: 'My Hardware', icon: Cpu, tab: 'my-hardware' },
                    { name: 'Messages', icon: MessageSquare, tab: 'messages' },
                    { name: 'Settings', icon: Settings, tab: 'settings' },
                  ].map(item => (
                    <button 
                      key={item.tab}
                      className={`w-full flex items-center p-3 rounded-md text-sm ${activeTab === item.tab ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                      onClick={() => setActiveTab(item.tab)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-6 text-white">
                <h3 className="font-semibold mb-2">Need help?</h3>
                <p className="text-sm mb-4">Our support team is here to assist you with any questions.</p>
                <Button variant="secondary" size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
            
            <div className="md:w-3/4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="overview" className="mt-0">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {[
                        { title: 'Active Projects', count: userJobs.length, icon: Briefcase, color: 'blue' },
                        { title: 'Received Proposals', count: receivedProposals.length, icon: FileText, color: 'green' },
                        { title: 'Listed Software', count: userSoftwareCount, icon: MonitorPlay, color: 'purple' },
                        { title: 'Listed Hardware', count: userHardwareCount, icon: Cpu, color: 'yellow' },
                        { title: 'Unread Messages', count: 0, icon: MessageSquare, color: 'red' },
                      ].map(item => (
                        <div key={item.title} className={`bg-${item.color}-50 p-4 rounded-lg`}>
                          <div className="flex items-center">
                            <div className={`bg-${item.color}-100 p-3 rounded-full mr-4`}>
                              <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">{item.title}</p>
                              <h3 className="text-2xl font-bold">{item.count}</h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <h3 className="font-semibold mb-3">Recent Activity</h3>
                    {/* Recent Activity Content (Simplified) */}
                    <div className="text-center py-8">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold mb-1">No recent activity</h3>
                        <p className="text-gray-600 mb-4">You don't have any recent activity yet.</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Post New Project', desc: 'Find experts for your simulation needs', icon: Briefcase, color: 'blue', path: '/post-job' },
                        { title: 'Find Projects', desc: 'Browse available project opportunities', icon: Search, color: 'green', path: '/jobs' },
                        { title: 'Offer Software', desc: 'List your simulation software', icon: MonitorPlay, color: 'purple', path: '/offer-software' },
                        { title: 'Offer Hardware', desc: 'List your simulation hardware', icon: Cpu, color: 'yellow', path: '/offer-hardware' },
                      ].map(action => (
                         <Button key={action.title} variant="outline" className="h-auto py-4 justify-start" onClick={() => navigate(action.path)}>
                          <div className="flex items-center">
                            <div className={`bg-${action.color}-100 p-2 rounded-full mr-3`}><action.icon className={`h-5 w-5 text-${action.color}-600`} /></div>
                            <div className="text-left"><p className="font-medium">{action.title}</p><p className="text-xs text-gray-600">{action.desc}</p></div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="projects" className="mt-0">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">My Projects</h2>
                      <Button onClick={() => navigate('/post-job')}><Plus className="h-4 w-4 mr-2" />Post New Project</Button>
                    </div>
                    {userJobs.length === 0 ? (
                      <div className="text-center py-10">
                        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold mb-1">No projects posted yet</h3>
                        <p className="text-gray-600 mb-4">Create your first project listing to find experts.</p>
                        <Button onClick={() => navigate('/post-job')}>Post a Project</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userJobs.map((job) => (
                          <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                <div className="flex items-center text-gray-600 mt-1"><Clock className="h-4 w-4 mr-1" /><span className="text-sm">Posted on {new Date(job.postedDate).toLocaleDateString()}</span></div>
                              </div>
                              <div className="flex items-center text-green-600 font-semibold"><DollarSign className="h-4 w-4 mr-1" /><span>${job.budget}</span></div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {job.skills.slice(0,3).map(skill => <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{skill}</span>)}
                              {job.skills.length > 3 && <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">+{job.skills.length - 3} more</span>}
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <div className="flex items-center"><FileText className="h-4 w-4 mr-1 text-gray-500" /><span className="text-sm text-gray-600">{job.proposals} {job.proposals === 1 ? 'proposal' : 'proposals'}</span></div>
                              <div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => navigate(`/jobs/${job.id}`)}>View</Button><Button size="sm">Manage</Button></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="proposals" className="mt-0">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <Tabs defaultValue="received">
                      <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">Proposals</h2><TabsList><TabsTrigger value="received">Received</TabsTrigger><TabsTrigger value="sent">Sent</TabsTrigger></TabsList></div>
                      <TabsContent value="received" className="mt-0">{/* Placeholder for received proposals */}</TabsContent>
                      <TabsContent value="sent" className="mt-0">{/* Placeholder for sent proposals */}</TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>

                <TabsContent value="my-software" className="mt-0">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">My Software Listings</h2><Button onClick={() => navigate('/offer-software')}><Plus className="h-4 w-4 mr-2" />Offer New Software</Button></div>
                    <div className="text-center py-10"><MonitorPlay className="h-12 w-12 text-gray-400 mx-auto mb-3" /><h3 className="text-lg font-semibold mb-1">No software listed</h3><p className="text-gray-600">Offer your simulation software to the community.</p></div>
                  </div>
                </TabsContent>

                <TabsContent value="my-hardware" className="mt-0">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">My Hardware Listings</h2><Button onClick={() => navigate('/offer-hardware')}><Plus className="h-4 w-4 mr-2" />Offer New Hardware</Button></div>
                    <div className="text-center py-10"><Cpu className="h-12 w-12 text-gray-400 mx-auto mb-3" /><h3 className="text-lg font-semibold mb-1">No hardware listed</h3><p className="text-gray-600">Offer your simulation hardware for rent or sale.</p></div>
                  </div>
                </TabsContent>
                
                <TabsContent value="messages" className="mt-0">{/* Placeholder for Messages */}</TabsContent>
                <TabsContent value="settings" className="mt-0">{/* Placeholder for Settings */}</TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
