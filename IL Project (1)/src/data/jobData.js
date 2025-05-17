
export const jobCategories = [
  "VR/AR Development", 
  "Simulation Software Development", 
  "Hardware Integration", 
  "Training Program Development", 
  "Research & Analysis",
  "3D Modeling & Animation",
  "Scenario Design",
  "System Administration (Simulation)",
  "Other Simulation Services"
];

export const jobSkills = [
  "Unity", "Unreal Engine", "C#", "C++", "Python", "VR SDKs (Oculus, SteamVR)", "AR SDKs (ARKit, ARCore)",
  "Physics Simulation", "AI for Simulations", "Data Visualization", "Haptic Feedback Integration",
  "Motion Capture", "Flight Simulation", "Driving Simulation", "Medical Simulation", "Industrial Training Simulation",
  "Blender", "Maya", "3ds Max", "CAD Software", "Instructional Design", "LMS Integration"
];

export const sampleJobsData = [
  {
    id: 'simjob1',
    title: 'VR Crane Operator Training Module',
    description: 'Seeking an expert VR developer to create a realistic crane operation training module. Must include physics-based interactions and performance tracking.',
    budget: 15000,
    duration: '3-4 months',
    skills: ['Unity', 'C#', 'VR SDKs (Oculus, SteamVR)', 'Physics Simulation', 'Instructional Design'],
    category: 'VR/AR Development',
    postedBy: { id: 'clientSim1', name: 'ConstructSim Solutions', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' },
    location: 'Remote',
    postedDate: '2025-04-20T10:00:00Z',
    proposals: 5,
    status: 'open',
    proposalsData: []
  },
  {
    id: 'simjob2',
    title: 'Hardware Rig Setup for Driving Simulator',
    description: 'Need a hardware expert to assemble and configure a multi-monitor driving simulator rig with force feedback wheel and pedals. On-site work required.',
    budget: 3000,
    duration: '1 week',
    skills: ['Hardware Integration', 'Driving Simulation', 'Force Feedback Systems', 'Cable Management'],
    category: 'Hardware Integration',
    postedBy: { id: 'clientSim2', name: 'Apex Racing Academy', avatar: 'https://randomuser.me/api/portraits/lego/2.jpg' },
    location: 'Austin, TX',
    postedDate: '2025-04-25T14:30:00Z',
    proposals: 2,
    status: 'open',
    proposalsData: []
  },
  {
    id: 'simjob3',
    title: 'Scenario Design for Emergency Response Training',
    description: 'Looking for a scenario designer to create 5 detailed emergency response scenarios for our existing simulation software. Experience in crisis management training preferred.',
    budget: 4500,
    duration: '6 weeks',
    skills: ['Scenario Design', 'Instructional Design', 'Crisis Management'],
    category: 'Training Program Development',
    postedBy: { id: 'clientSim3', name: 'SafeGuard Training Inc.', avatar: 'https://randomuser.me/api/portraits/lego/3.jpg' },
    location: 'Remote',
    postedDate: '2025-05-01T09:15:00Z',
    proposals: 8,
    status: 'open',
    proposalsData: []
  }
];
