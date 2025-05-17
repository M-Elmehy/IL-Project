
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('simHubUser'); // Changed key
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('simHubUsers') || '[]'); // Changed key
      const userExists = existingUsers.some(u => u.email === userData.email);
      
      if (userExists) {
        toast({
          title: "Registration failed",
          description: "A user with this email already exists.",
          variant: "destructive",
        });
        return false;
      }
      
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        // Default avatar and title for new users
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`,
        title: "Simulation Enthusiast" 
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('simHubUsers', JSON.stringify(existingUsers)); // Changed key
      
      setUser(newUser);
      localStorage.setItem('simHubUser', JSON.stringify(newUser)); // Changed key
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('simHubUsers') || '[]'); // Changed key
      const userToLogin = existingUsers.find(u => u.email === email && u.password === password); // Renamed variable
      
      if (!userToLogin) {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        return false;
      }
      
      setUser(userToLogin);
      localStorage.setItem('simHubUser', JSON.stringify(userToLogin)); // Changed key
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simHubUser'); // Changed key
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
