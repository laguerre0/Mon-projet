import React, { ReactNode } from 'react';
import { useAuth } from "@/hooks/use-auth-new";
import { Loader2 } from "lucide-react";
import { Redirect } from "wouter";
import { UserRole } from "@shared/schema";

interface AuthWrapperProps {
  children: ReactNode;
  requiredRole?: string;
}

export function AuthWrapper({ children, requiredRole }: AuthWrapperProps) {
  try {
    const { user, isLoading, isAdmin } = useAuth();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!user) {
      return <Redirect to="/auth" />;
    }

    if (requiredRole && user.role !== requiredRole) {
      if (requiredRole === UserRole.ADMIN && !isAdmin) {
        return <Redirect to="/student" />;
      } else if (requiredRole === UserRole.STUDENT && isAdmin) {
        return <Redirect to="/admin" />;
      }
    }

    return <>{children}</>;
  } catch (error) {
    console.error("Error in AuthWrapper:", error);
    return <Redirect to="/auth" />;
  }
}