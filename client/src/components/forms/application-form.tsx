import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { insertApplicationSchema } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

// Extend the schema with validation rules
const applicationFormSchema = insertApplicationSchema.extend({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  country: z.string().min(1, "Please select your country"),
  courseId: z.number().int().positive("Please select a course"),
  motivation: z.string().min(10, "Please tell us why you want to join this course").max(500),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export function ApplicationForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  // Fetch courses for the dropdown
  const { data: courses = [], isLoading: isLoadingCourses } = useQuery<{id: number, name: string}[]>({
    queryKey: ["/api/courses"],
  });

  // Define the form
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      courseId: 0,
      motivation: "",
    },
  });

  // Handle form submission
  const mutation = useMutation({
    mutationFn: async (values: ApplicationFormValues) => {
      const res = await apiRequest("POST", "/api/applications", values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Application submitted successfully",
        description: "We will review your application and get back to you soon.",
      });
      form.reset();
      setSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Failed to submit application",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: ApplicationFormValues) {
    mutation.mutate(values);
  }

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <div className="bg-green-50 p-6 rounded-xl mb-6 border border-green-100 shadow-sm">
          <div className="h-16 w-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="h-10 w-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Application Received!</h3>
          <div className="bg-white rounded-lg p-4 border border-green-100 mb-4 max-w-md mx-auto">
            <p className="text-neutral-700 leading-relaxed">
              Thank you for applying to WOEC. We've received your application and will review it within 48 hours.
              You will receive an email notification once we've processed your application.
            </p>
            <div className="mt-4 text-left px-4 py-2 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-blue-800 font-medium">Next steps:</p>
              <ul className="list-disc text-sm text-blue-700 ml-4 mt-1">
                <li>Check your email for confirmation</li>
                <li>Prepare for a potential short interview</li>
                <li>Review our course materials (optional)</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              className="border-2 border-neutral-300 hover:bg-neutral-50"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Application
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => window.location.href = "#courses"}
            >
              Explore More Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="bg-blue-50 p-4 mb-6 rounded-lg border border-blue-100 flex items-start">
        <svg className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div className="ml-3">
          <h4 className="text-sm font-medium text-blue-800">Before you apply</h4>
          <p className="text-xs text-blue-700 mt-1">Make sure to fill in all required fields and provide accurate information. Applications are processed within 48 hours.</p>
        </div>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="p-4 border border-neutral-200 rounded-lg bg-white shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-royal mb-4 flex items-center">
            <svg className="mr-2 h-5 w-5 text-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <FormLabel className="text-neutral-800 font-medium">First name*</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500" 
                      placeholder="Enter your first name" 
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <FormLabel className="text-neutral-800 font-medium">Last name*</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500" 
                      placeholder="Enter your last name" 
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:col-span-4">
                  <FormLabel className="text-neutral-800 font-medium">Email address*</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field} 
                      className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500" 
                      placeholder="yourname@example.com" 
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <FormLabel className="text-neutral-800 font-medium">Country*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Mexico">Mexico</SelectItem>
                      <SelectItem value="Brazil">Brazil</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="Italy">Italy</SelectItem>
                      <SelectItem value="Japan">Japan</SelectItem>
                      <SelectItem value="China">China</SelectItem>
                      <SelectItem value="South Korea">South Korea</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="p-4 border border-neutral-200 rounded-lg bg-white shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-royal mb-4 flex items-center">
            <svg className="mr-2 h-5 w-5 text-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Course Selection
          </h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem className="sm:col-span-4">
                  <FormLabel className="text-neutral-800 font-medium">Course*</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    defaultValue={field.value ? field.value.toString() : undefined}
                    disabled={isLoadingCourses}
                  >
                    <FormControl>
                      <SelectTrigger className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500">
                        <SelectValue placeholder={isLoadingCourses ? "Loading courses..." : "Select a course"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses?.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem className="sm:col-span-6">
                  <FormLabel className="text-neutral-800 font-medium">
                    Why do you want to join this course?*
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={4} 
                      {...field} 
                      className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500" 
                      placeholder="Tell us a bit about yourself and your goals for taking this course"
                    />
                  </FormControl>
                  <p className="text-xs text-neutral-500 mt-1">
                    Please write 10-500 characters explaining your motivation for taking this course.
                  </p>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mb-6">
          <div className="flex items-center mb-4">
            <svg className="h-5 w-5 text-neutral-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-neutral-800">Important Information</span>
          </div>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-start">
              <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Our admissions team will review your application within 48 hours.
            </li>
            <li className="flex items-start">
              <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              You'll receive an email notification with next steps.
            </li>
            <li className="flex items-start">
              <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Your personal information is secure and will only be used for application processing.
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Button 
            type="submit" 
            size="lg"
            disabled={mutation.isPending}
            className="inline-flex justify-center py-3 px-6 border-2 border-royal shadow-lg text-base font-bold rounded-lg text-white bg-royal hover:bg-royal/90 transition-colors duration-300"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                Submit Application
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
