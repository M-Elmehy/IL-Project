
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Briefcase, Users, ArrowRight, CheckCircle, Star, Cpu, MonitorPlay } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HeroSection = () => (
  <section className="hero-pattern py-20 md:py-32">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your Hub for Simulation Excellence
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Connect with simulation experts, find specialized software & hardware, or discover challenging projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/jobs">
              <Button size="lg" className="w-full sm:w-auto">
                Find Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/experts">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Hire Experts <Users className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <img  alt="Advanced simulation environment" className="w-full h-auto rounded-lg" src="https://images.unsplash.com/photo-1464172061858-5d76c6455f5f" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const SearchSection = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Find Your Simulation Solution</h2>
          <p className="text-gray-600">Search for projects, experts, software, or hardware.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search for simulation projects, experts, software, hardware..." 
              className="pl-10 pr-4 py-6 w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
            />
          </div>
          <Button size="lg" className="md:w-auto">
            Search
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="sm" className="rounded-full">VR/AR Development</Button>
          <Button variant="outline" size="sm" className="rounded-full">Simulation Software</Button>
          <Button variant="outline" size="sm" className="rounded-full">Hardware Rigs</Button>
          <Button variant="outline" size="sm" className="rounded-full">Training Experts</Button>
          <Button variant="outline" size="sm" className="rounded-full">Research Projects</Button>
        </div>
      </motion.div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description, bgColor, iconColor }) => (
  <motion.div 
    className="bg-white p-8 rounded-xl shadow-md card-hover"
    variants={fadeIn}
  >
    <div className={`w-14 h-14 ${bgColor} rounded-full flex items-center justify-center mb-6`}>
      {React.cloneElement(icon, { className: `h-7 w-7 ${iconColor}` })}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const FeaturesSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Why Choose SimHub</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Your premier platform for simulation projects, talent, and resources.</p>
      </motion.div>
      
      <motion.div 
        className="grid md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <FeatureCard 
          icon={<Users />} 
          title="Specialized Experts" 
          description="Connect with trainers, software experts, and hardware owners in the simulation field."
          bgColor="bg-blue-100"
          iconColor="text-primary"
        />
        <FeatureCard 
          icon={<MonitorPlay />} 
          title="Simulation Software" 
          description="Discover and offer specialized software for various simulation applications."
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <FeatureCard 
          icon={<Cpu />} 
          title="Hardware Resources" 
          description="Find or list hardware setups for training, simulation, and research purposes."
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </motion.div>
    </div>
  </section>
);

const CategoryCard = ({ name, icon, color }) => (
   <motion.div 
    className={`p-6 rounded-xl ${color} card-hover cursor-pointer`}
    variants={fadeIn}
  >
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="font-semibold">{name}</h3>
  </motion.div>
);

const CategoriesSection = () => {
  const categories = [
    { name: 'Simulation Training', icon: '🎓', color: 'bg-blue-50 text-blue-600' },
    { name: 'VR/AR Solutions', icon: '🕶️', color: 'bg-purple-50 text-purple-600' },
    { name: 'Software Development', icon: '💻', color: 'bg-green-50 text-green-600' },
    { name: 'Hardware Rigs', icon: '⚙️', color: 'bg-yellow-50 text-yellow-600' },
    { name: 'Research Projects', icon: '🔬', color: 'bg-red-50 text-red-600' },
    { name: 'System Integration', icon: '🔗', color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Expert Consultation', icon: '💡', color: 'bg-teal-50 text-teal-600' },
    { name: 'Custom Simulations', icon: '🕹️', color: 'bg-pink-50 text-pink-600' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Explore Simulation Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Find opportunities and resources across specialized simulation domains.</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ imgSrc, name, role, text }) => (
  <motion.div 
    className="bg-white p-8 rounded-xl shadow-md"
    variants={fadeIn}
  >
    <div className="flex items-center mb-4">
      <div className="mr-4">
        <img  alt={name} className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
      </div>
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <div className="flex mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-gray-700">{text}</p>
  </motion.div>
);

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Dr. Eva Rostova", role: "Simulation Researcher", text: "SimHub connected me with a hardware owner who had the exact rig I needed for my experiment. Saved me months of setup time!", imgSrc: "Female researcher in a lab coat" },
    { name: "Marcus Chen", role: "VR Training Expert", text: "I've found incredible projects on SimHub, helping companies implement cutting-edge VR training solutions. The platform is a game-changer.", imgSrc: "Male VR expert with headset" },
    { name: "SimTech Solutions", role: "Software Provider", text: "Listing our simulation software on SimHub expanded our reach significantly. We're now connecting with a global audience of professionals.", imgSrc: "Modern office building with company logo" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Success in Simulation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Hear from professionals who thrive with SimHub.</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20 gradient-bg text-white">
    <div className="container mx-auto px-4">
      <motion.div 
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Dive In?</h2>
        <p className="text-xl mb-8">Join the SimHub community and elevate your simulation endeavors.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Join SimHub Now
            </Button>
          </Link>
          <Link to="/jobs">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
              Browse Projects
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <SearchSection />
      <FeaturesSection />
      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
