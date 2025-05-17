
export const hardwareCategories = [
  "Flight Simulator Rigs", 
  "Driving Simulator Cockpits", 
  "VR Motion Platforms", 
  "Haptic Feedback Systems", 
  "Motion Capture Systems",
  "Large-Scale Display Solutions",
  "Custom Control Panels",
  "Eye Tracking Hardware",
  "Biometric Sensors for Simulation"
];

export const hardwareFeatures = [ // Represents features/tags for hardware
  "Full Motion (6DOF, 3DOF)", "Direct Drive Wheel Support", "Triple Monitor Mount", "VR Ready",
  "Tactile Transducers", "Buttkicker Integration", "Modular Design", "Industrial Grade Components",
  "Plug-and-Play Setup", "Wireless Connectivity", "High Refresh Rate Displays", "Force Feedback Joysticks/Yokes"
];

export const sampleHardwareData = [
  {
    id: 'hw1',
    name: 'ProSim 6DOF Motion Platform',
    description: 'A professional-grade 6 Degrees of Freedom motion platform suitable for advanced flight and driving simulations. Includes software development kit for integration.',
    category: 'VR Motion Platforms',
    price: 15000, // Assuming this is purchase price, or rental could be different
    rentalTerms: 'Monthly Rental or Purchase',
    condition: 'Used - Like New',
    location: 'Los Angeles, CA',
    features: ['Full Motion (6DOF)', 'VR Ready', 'Industrial Grade Components', 'Modular Design'],
    specifications: [
      { name: 'Payload Capacity', value: '250kg' },
      { name: 'Actuator Stroke', value: '150mm' },
      { name: 'Connectivity', value: 'USB 3.0, Ethernet' }
    ],
    owner: { id: 'hwOwner1', name: 'SimGear Rentals', avatar: 'https://randomuser.me/api/portraits/lego/7.jpg' },
    postedDate: '2025-02-20T09:00:00Z',
    rating: 4.7,
    reviews: 8,
    availability: 'Available for immediate rental/purchase',
    userReviews: []
  },
  {
    id: 'hw2',
    name: 'Advanced Haptic Feedback Gloves (Pair)',
    description: 'Experience realistic touch and interaction in VR simulations with these advanced haptic gloves. Per-finger force feedback and vibrotactile sensations.',
    category: 'Haptic Feedback Systems',
    price: 250,
    rentalTerms: 'Weekly Rental',
    condition: 'New',
    location: 'Remote Shipping Available',
    features: ['Per-Finger Force Feedback', 'Vibrotactile Sensations', 'Wireless Connectivity', 'VR Ready'],
    specifications: [
      { name: 'Battery Life', value: '4 hours' },
      { name: 'Tracking Compatibility', value: 'SteamVR, Oculus Link' },
      { name: 'SDKs', value: 'Unity, Unreal Engine' }
    ],
    owner: { id: 'hwOwner2', name: 'TactileTech Innovations', avatar: 'https://randomuser.me/api/portraits/lego/8.jpg' },
    postedDate: '2025-04-01T13:45:00Z',
    rating: 4.9,
    reviews: 12,
    availability: 'Limited stock, inquire for dates',
    userReviews: []
  }
];
