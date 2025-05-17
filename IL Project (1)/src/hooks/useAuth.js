
import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('freelanceHubUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      // For now, we'll simulate registration with localStorage
      // In a real app, this would be a call to your backend API
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('freelanceHubUsers') || '[]');
      const userExists = existingUsers.some(u => u.email === userData.email);
      
      if (userExists) {
        toast({
          title: "Registration failed",
          description: "A user with this email already exists.",
          variant: "destructive",
        });
        return false;
      }
      
      // Create new user with ID
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      // Save to "database"
      existingUsers.push(newUser);
      localStorage.setItem('freelanceHubUsers', JSON.stringify(existingUsers));
      
      // Log user in
      setUser(newUser);
      localStorage.setItem('freelanceHubUser', JSON.stringify(newUser));
      
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

  // Login function
  const login = async (email, password) => {
    try {
      // For now, we'll simulate login with localStorage
      // In a real app, this would be a call to your backend API
      
      const existingUsers = JSON.parse(localStorage.getItem('freelanceHubUsers') || '[]');
      const user = existingUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        return false;
      }
      
      // Log user in
      setUser(user);
      localStorage.setItem('freelanceHubUser', JSON.stringify(user));
      
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

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('freelanceHubUser');
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

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
