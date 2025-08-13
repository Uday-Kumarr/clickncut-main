
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Find user by email
    const matchedUser = registeredUsers.find((u: any) => u.email === email && u.password === password);
    
    if (matchedUser) {
      const loggedInUser = { id: matchedUser.id, name: matchedUser.name, email: matchedUser.email };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${matchedUser.name}!`,
        variant: "default",
      });
      
      setIsLoading(false);
      return true;
    }
    
    // Fallback to demo account if no registered user matches
    if (email === "user@example.com" && password === "password") {
      const demoUser = { id: "demo1", name: "Demo User", email };
      setUser(demoUser);
      localStorage.setItem("user", JSON.stringify(demoUser));
      
      toast({
        title: "Login successful",
        description: "Welcome back, Demo User!",
        variant: "default",
      });
      
      setIsLoading(false);
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive",
    });
    
    setIsLoading(false);
    return false;
  };
  
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get registered users from localStorage or initialize empty array
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Check if email already exists
    const emailExists = registeredUsers.some((user: any) => user.email === email);
    if (emailExists) {
      toast({
        title: "Registration failed",
        description: "This email is already registered. Please use a different email.",
        variant: "destructive",
      });
      
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `user${Date.now()}`,
      name,
      email,
      password // In a real app, this would be hashed
    };
    
    // Add to registered users
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    
    // Log in the user
    const loggedInUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    
    toast({
      title: "Registration successful",
      description: `Welcome to Click N Cut, ${name}!`,
      variant: "default",
    });
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      variant: "default",
    });
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
