import { useAuth } from "@/hooks/use-auth-new";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";
import { UserRole } from "@shared/schema";

interface ProtectedRouteProps {
  path: string;
  component: () => React.JSX.Element;
  requiredRole?: string;
}

export function ProtectedRoute({
  path,
  component: Component,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, isLoading, isAdmin } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Route>
    );
  }

  // Redirect to auth page if not authenticated
  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  // Check for role-based access
  if (requiredRole && user.role !== requiredRole) {
    if (requiredRole === UserRole.ADMIN && !isAdmin) {
      // If admin access required but user is not admin, redirect to student page
      return (
        <Route path={path}>
          <Redirect to="/student" />
        </Route>
      );
    } else if (requiredRole === UserRole.STUDENT && isAdmin) {
      // If student access required but user is admin, redirect to admin page
      return (
        <Route path={path}>
          <Redirect to="/admin" />
        </Route>
      );
    }
  }

  // Render the protected component if authenticated and authorized
  return <Route path={path} component={Component} />;
}
