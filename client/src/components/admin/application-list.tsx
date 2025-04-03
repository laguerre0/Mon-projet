import { useQuery, useMutation } from "@tanstack/react-query";
import { Application, ApplicationStatus, Course } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { emailTemplates } from "@/lib/email-service";

export function ApplicationList() {
  const { toast } = useToast();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [emailPreviewType, setEmailPreviewType] = useState<"accept" | "reject">("accept");
  const [emailPreviewData, setEmailPreviewData] = useState<{
    firstName: string;
    username?: string;
    password?: string;
    reason?: string;
  }>({ firstName: "" });
  
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Fetch applications
  const { 
    data: applications, 
    isLoading, 
    error, 
    refetch 
  } = useQuery<Application[]>({
    queryKey: ["/api/admin/applications"],
  });

  // Fetch courses to display course names
  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  // Handle application status updates
  const updateStatusMutation = useMutation({
    mutationFn: async ({ 
      id, 
      status, 
      reason 
    }: { 
      id: number; 
      status: string; 
      reason?: string 
    }) => {
      const res = await apiRequest("PUT", `/api/admin/applications/${id}/status`, { status, reason });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/applications"] });
      toast({
        title: "Application updated",
        description: "The application status has been updated successfully.",
      });
      setIsRejectDialogOpen(false);
      setRejectionReason("");
      setSelectedApplication(null);
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update application status",
        variant: "destructive",
      });
    },
  });

  // Get course name by ID
  const getCourseName = (courseId: number) => {
    const course = courses?.find(c => c.id === courseId);
    return course?.name || "Unknown Course";
  };

  // Format status for display
  const formatStatus = (status: string) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return <span className="text-yellow-600">Pending</span>;
      case ApplicationStatus.APPROVED:
        return <span className="text-green-600">Accepted</span>;
      case ApplicationStatus.REJECTED:
        return <span className="text-red-600">Rejected</span>;
      default:
        return <span>{status}</span>;
    }
  };

  // Handle accept application
  const handleAccept = (application: Application) => {
    // Show email preview
    setEmailPreviewType("accept");
    setEmailPreviewData({
      firstName: application.firstName,
      username: `${application.firstName.toLowerCase()}.${application.lastName.toLowerCase()}.1234`, // Example username format
      password: "********", // Password will be generated on the server
    });
    setIsPreviewDialogOpen(true);
    setSelectedApplication(application);
  };

  // Handle reject application
  const handleReject = (application: Application) => {
    setSelectedApplication(application);
    setIsRejectDialogOpen(true);
  };

  // Handle final confirmation after preview
  const handleConfirmAction = () => {
    if (!selectedApplication) return;

    if (emailPreviewType === "accept") {
      updateStatusMutation.mutate({
        id: selectedApplication.id,
        status: ApplicationStatus.APPROVED,
      });
    } else {
      updateStatusMutation.mutate({
        id: selectedApplication.id,
        status: ApplicationStatus.REJECTED,
        reason: rejectionReason,
      });
    }
    
    setIsPreviewDialogOpen(false);
  };

  // Show rejection dialog
  const handleRejectDialogConfirm = () => {
    if (!selectedApplication) return;
    
    // Show email preview before final confirmation
    setEmailPreviewType("reject");
    setEmailPreviewData({
      firstName: selectedApplication.firstName,
      reason: rejectionReason,
    });
    setIsPreviewDialogOpen(true);
    setIsRejectDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading applications: {(error as Error).message}</p>
        <Button 
          onClick={() => refetch()} 
          variant="outline" 
          className="mt-4"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h3 className="text-lg leading-6 font-medium text-neutral-900">Student Applications</h3>
          <p className="mt-1 text-sm text-neutral-500">Review and process incoming student applications.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button 
            onClick={() => refetch()} 
            disabled={isLoading} 
            className="inline-flex items-center justify-center rounded-md"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Applications List */}
      <div className="mt-4 flex flex-col">
        <div className="max-w-full overflow-hidden">
          <div className="w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {applications && applications.length > 0 ? (
                <table className="w-full divide-y divide-neutral-300">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">
                        Course
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 bg-white">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-900 sm:pl-6">
                          {application.firstName} {application.lastName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">
                          {application.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">
                          {getCourseName(application.courseId)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {formatStatus(application.status)}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {application.status === ApplicationStatus.PENDING ? (
                            <>
                              <Button
                                variant="link"
                                className="text-primary-600 hover:text-primary-900 mr-2"
                                onClick={() => handleAccept(application)}
                                disabled={updateStatusMutation.isPending}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="link"
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleReject(application)}
                                disabled={updateStatusMutation.isPending}
                              >
                                Reject
                              </Button>
                            </>
                          ) : application.status === ApplicationStatus.APPROVED ? (
                            <span className="text-neutral-400">Credentials sent</span>
                          ) : (
                            <span className="text-neutral-400">Notification sent</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 bg-white">
                  <p className="text-neutral-500">No applications found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Reason Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejection Reason</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this application. This will be included in the email to the applicant.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="rejection-reason">Reason</Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="We have reached our capacity for this enrollment period."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRejectDialogConfirm} disabled={!rejectionReason}>
              Preview Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {emailPreviewType === "accept" ? "Acceptance Email Preview" : "Rejection Email Preview"}
            </DialogTitle>
            <DialogDescription>
              This is a preview of the email that will be sent to the applicant.
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded p-4 bg-white">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: emailPreviewType === "accept" 
                  ? emailTemplates.welcome(emailPreviewData) 
                  : emailTemplates.rejection(emailPreviewData) 
              }} 
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAction}>
              Confirm and Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
