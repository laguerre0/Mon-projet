import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { EnhancedStudentDashboard } from "@/components/student/enhanced-dashboard";

export default function StandaloneStudentPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

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
          setLocation("/auth");
          return;
        }
        
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
        setLocation("/auth");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
  }, [setLocation]);

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/logout");
      setUser(null);
      setLocation("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    setLocation("/auth");
    return null;
  }

  return <EnhancedStudentDashboard user={user} />;
}