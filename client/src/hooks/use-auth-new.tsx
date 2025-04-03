import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { User as SelectUser, InsertUser, UserRole } from "@shared/schema";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<SelectUser, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<SelectUser, Error, InsertUser>;
  isAdmin: boolean;
  isStudent: boolean;
};

type LoginData = Pick<InsertUser, "username" | "password">;

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const [user, setUser] = useState<SelectUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // Fetch current user on component mount
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user", {
          credentials: "include"
        });
        
        if (response.status === 401) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (userData: SelectUser) => {
      setUser(userData);
      
      // Redirect based on user role
      if (userData.role === UserRole.ADMIN) {
        setLocation("/admin");
      } else {
        setLocation("/student");
      }
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.firstName}!`,
      });
    },
    onError: (err: Error) => {
      setError(err);
      toast({
        title: "Login failed",
        description: err.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: InsertUser) => {
      const res = await apiRequest("POST", "/api/register", userData);
      return await res.json();
    },
    onSuccess: (userData: SelectUser) => {
      setUser(userData);
      setLocation("/student");
      toast({
        title: "Registration successful",
        description: `Welcome to WOEC, ${userData.firstName}!`,
      });
    },
    onError: (err: Error) => {
      setError(err);
      toast({
        title: "Registration failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      setUser(null);
      setLocation("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    },
    onError: (err: Error) => {
      setError(err);
      toast({
        title: "Logout failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const isAdmin = user?.role === UserRole.ADMIN;
  const isStudent = user?.role === UserRole.STUDENT;
    
  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    loginMutation,
    logoutMutation,
    registerMutation,
    isAdmin: isAdmin || false,
    isStudent: isStudent || false,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("Auth context not available. Make sure you're using AuthProvider.");
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}