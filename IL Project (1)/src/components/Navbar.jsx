
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, Briefcase, LogOut, Cpu, MonitorPlay } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const navLinkClasses = "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition duration-300";
  const mobileNavLinkClasses = "block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-primary"
              >
                SimHub
              </motion.div>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/jobs" className={navLinkClasses}>
                Find Projects
              </Link>
              <Link to="/experts" className={navLinkClasses}>
                Find Experts
              </Link>
              <Link to="/software" className={navLinkClasses}>
                Software
              </Link>
              <Link to="/hardware" className={navLinkClasses}>
                Hardware
              </Link>
              {user && (
                <Link to="/post-job" className={navLinkClasses}>
                  Post Project
                </Link>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User size={18} />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden"
        >
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/jobs" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
              Find Projects
            </Link>
            <Link to="/experts" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
              Find Experts
            </Link>
            <Link to="/software" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
              Software
            </Link>
            <Link to="/hardware" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
              Hardware
            </Link>
            {user && (
              <Link to="/post-job" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
                Post Project
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="space-y-1">
                <Link to="/dashboard" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link to="/login" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
