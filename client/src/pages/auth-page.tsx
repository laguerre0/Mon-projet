import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Loader2, User, Lock, BookOpen, MessageSquare, BarChart4, Coffee } from "lucide-react";
import { useLocation } from "wouter";
import WoecLogo from "../assets/woec-logo.png";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { UserRole } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Define login schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Create login mutation directly here to avoid auth context issues
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      
      // Redirect based on user role
      if (user.role === UserRole.ADMIN) {
        setLocation("/admin");
      } else {
        setLocation("/student");
      }
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.firstName}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Define submit handler
  const handleLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-neutral-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Left column - Form */}
            <div className="w-full max-w-md">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                    <img src={WoecLogo} alt="WOEC Logo" className="h-8 w-auto" />
                    WOEC Portal
                  </CardTitle>
                  <CardDescription className="text-center">
                    Login to access the Admin or Student dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mt-4">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                Username
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    placeholder="Enter your username" 
                                    className="pl-8 focus:pl-8" 
                                    {...field} 
                                  />
                                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center">
                                <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                                Password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    className="pl-8 focus:pl-8" 
                                    {...field} 
                                  />
                                  <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Role selection info */}
                        <div className="mt-6 bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm">
                          <p className="text-blue-800 font-medium mb-1">User Role Information:</p>
                          <p className="text-blue-700 text-xs mb-2">
                            Your credentials will automatically direct you to the appropriate dashboard based on your account type.
                          </p>
                          <div className="flex justify-between text-xs">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-blue-600 mr-1"></div>
                              <span>Administrator</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-green-600 mr-1"></div>
                              <span>Student</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full mt-6 font-medium text-base py-6" 
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Logging in...
                            </>
                          ) : (
                            <>
                              <User className="mr-2 h-5 w-5" />
                              Sign In to Your Account
                            </>
                          )}
                        </Button>
                        <div className="mt-4 text-center">
                          <a href="#" className="text-sm text-primary hover:underline">
                            Forgot your password?
                          </a>
                        </div>
                      </form>
                    </Form>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking login, you agree to our{" "}
                    <a href="#" className="underline underline-offset-4 hover:text-primary">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline underline-offset-4 hover:text-primary">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </CardFooter>
              </Card>
            </div>

            {/* Right column - Hero section */}
            <div className="w-full max-w-md">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg border border-blue-400">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <img src={WoecLogo} alt="WOEC Logo" className="h-8 w-auto filter brightness-0 invert" />
                  Welcome to WOEC
                </h2>
                <p className="mb-6">
                  <strong>For Administrators:</strong> Manage courses, applications, and user accounts.<br/><br/>
                  <strong>For Students:</strong> Access your courses, learning materials, and connect with teachers and peers.
                </p>
                <div className="space-y-5 mt-8">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 p-2 rounded-full shadow-md">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div className="pt-1">
                      <span className="font-medium">Access all your course materials in one place</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 p-2 rounded-full shadow-md">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div className="pt-1">
                      <span className="font-medium">Participate in interactive online classes</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 p-2 rounded-full shadow-md">
                      <Coffee className="h-5 w-5 text-white" />
                    </div>
                    <div className="pt-1">
                      <span className="font-medium">Learn at your own pace with flexible schedules</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 p-2 rounded-full shadow-md">
                      <BarChart4 className="h-5 w-5 text-white" />
                    </div>
                    <div className="pt-1">
                      <span className="font-medium">Track your progress and achievements</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
