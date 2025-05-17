
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              SimHub
            </motion.div>
            <p className="text-gray-300 text-sm">
              Your marketplace for simulation software, hardware, experts, and projects.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Experts & Trainers</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-gray-300 hover:text-white transition-colors">Find Projects</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors">Create Profile</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Clients & Researchers</h3>
            <ul className="space-y-2">
              <li><Link to="/experts" className="text-gray-300 hover:text-white transition-colors">Find Experts</Link></li>
              <li><Link to="/software" className="text-gray-300 hover:text-white transition-colors">Browse Software</Link></li>
              <li><Link to="/hardware" className="text-gray-300 hover:text-white transition-colors">Browse Hardware</Link></li>
              <li><Link to="/post-job" className="text-gray-300 hover:text-white transition-colors">Post a Project</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/offer-software" className="text-gray-300 hover:text-white transition-colors">Offer Software</Link></li>
              <li><Link to="/offer-hardware" className="text-gray-300 hover:text-white transition-colors">Offer Hardware</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Help & Support</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SimHub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
