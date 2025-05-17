
export const softwareCategories = [
  "Flight Simulation", 
  "Driving Simulation", 
  "Medical Simulation", 
  "Industrial Training", 
  "Physics Engines",
  "AI Authoring Tools",
  "VR/AR Platforms",
  "3D Modeling & Animation Suites",
  "Scenario Generation Tools",
  "Data Analytics for Simulation"
];

export const softwareSkills = [ // Renamed from softwareFeatures for consistency, represents features/tags
  "Real-time Rendering", "Multi-user Support", "Haptic Feedback Compatibility", "Performance Analytics",
  "Customizable Scenarios", "Cross-Platform (Windows, Linux, Mac)", "VR Headset Support (Oculus, Vive, etc.)",
  "AR Overlay Capabilities", "Physics-Based Modeling", "AI Behavior Trees", "API for Integration", "Cloud Deployment"
];

export const sampleSoftwareData = [
  {
    id: 'sw1',
    name: 'AeroSim Pro X',
    description: 'Professional flight simulation software with a wide range of aircraft models and realistic weather systems. Ideal for pilot training and aerospace research.',
    category: 'Flight Simulation',
    price: 2999,
    licensing: 'Per Seat Annual Subscription',
    features: ['Real-time Rendering', 'Multi-user Support', 'VR Headset Support (Oculus, Vive, etc.)', 'Customizable Scenarios', 'Performance Analytics'],
    compatibility: [
      { system: 'Windows', details: 'Windows 10/11, DirectX 12, 16GB RAM, Nvidia RTX 2070+' },
      { system: 'VR Headsets', details: 'Oculus Rift S, HTC Vive Pro, Valve Index' }
    ],
    owner: { id: 'devCo1', name: 'Aviation Dynamics Ltd.', avatar: 'https://randomuser.me/api/portraits/lego/5.jpg' },
    postedDate: '2025-03-10T11:00:00Z',
    rating: 4.8,
    reviews: 15,
    userReviews: [
      { userName: 'PilotPete', rating: 5, date: '2025-04-01T00:00:00Z', comment: 'Incredibly realistic flight model!'},
      { userName: 'FlightSchool101', rating: 4, date: '2025-03-20T00:00:00Z', comment: 'Great for our student pilots, though a bit pricey.'}
    ]
  },
  {
    id: 'sw2',
    name: 'MediTrain VR Suite',
    description: 'A comprehensive VR platform for medical training, offering modules for surgical procedures, patient interaction, and emergency response.',
    category: 'Medical Simulation',
    price: 0, // Or null for "Contact for Price"
    licensing: 'Custom Enterprise Licensing',
    features: ['Haptic Feedback Compatibility', 'Performance Analytics', 'Customizable Scenarios', 'Multi-user Support', 'VR Headset Support (Oculus, Vive, etc.)'],
    compatibility: [
      { system: 'Windows', details: 'Windows 10 Pro, 32GB RAM, Nvidia RTX 3080+' },
      { system: 'Haptics', details: 'Supports SenseGlove, HaptX' }
    ],
    owner: { id: 'healthSimDevs', name: 'BioDigital Simulations', avatar: 'https://randomuser.me/api/portraits/lego/6.jpg' },
    postedDate: '2025-04-15T16:30:00Z',
    rating: 4.9,
    reviews: 22,
    userReviews: []
  }
];
