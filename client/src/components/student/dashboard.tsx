import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data - in a real application, this would come from API calls
  const upcomingClasses = [
    {
      id: 1,
      title: "Intermediate English - Speaking Practice",
      teacher: "Emily Parker",
      time: "Today, 3:00 PM",
      joinUrl: "#",
    },
    {
      id: 2,
      title: "Intermediate English - Grammar Review",
      teacher: "Michael Johnson",
      time: "Tomorrow, 10:00 AM",
      detailsUrl: "#",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Writing Exercise: Describing your hometown",
      course: "Intermediate English",
      dueDate: "Sep 15, 2023",
      status: "pending",
      url: "#",
    },
    {
      id: 2,
      title: "Grammar Quiz: Past Perfect Tense",
      course: "Intermediate English",
      status: "completed",
      score: "85%",
    },
  ];

  return (
    <>
      <div className="border-b border-neutral-200">
        <nav className="flex -mb-px">
          <div className="flex h-auto border-b border-neutral-200 w-full bg-transparent space-x-2">
            <button
              className={`whitespace-nowrap px-1 pb-4 pt-2 text-sm font-medium ${
                activeTab === "dashboard"
                  ? "text-primary border-primary border-b-2"
                  : "text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`whitespace-nowrap px-1 pb-4 pt-2 text-sm font-medium ${
                activeTab === "courses"
                  ? "text-primary border-primary border-b-2"
                  : "text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
              onClick={() => setActiveTab("courses")}
            >
              My Courses
            </button>
            <button
              className={`whitespace-nowrap px-1 pb-4 pt-2 text-sm font-medium ${
                activeTab === "materials"
                  ? "text-primary border-primary border-b-2"
                  : "text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
              onClick={() => setActiveTab("materials")}
            >
              Materials
            </button>
            <button
              className={`whitespace-nowrap px-1 pb-4 pt-2 text-sm font-medium ${
                activeTab === "profile"
                  ? "text-primary border-primary border-b-2"
                  : "text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
          </div>
        </nav>
      </div>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">Welcome to your dashboard</h3>
          
          {/* Upcoming Classes */}
          <Card className="bg-neutral-50 rounded-lg mb-6">
            <CardContent className="p-4">
              <h4 className="text-base font-medium text-neutral-900 mb-3">Upcoming Classes</h4>
              <ul className="divide-y divide-neutral-200">
                {upcomingClasses.map((cls) => (
                  <li key={cls.id} className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{cls.title}</p>
                        <p className="text-sm text-neutral-500">Teacher: {cls.teacher}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-neutral-900">{cls.time}</p>
                        {cls.joinUrl ? (
                          <Button variant="link" className="p-0 h-auto text-sm text-primary hover:text-primary/90" asChild>
                            <a href={cls.joinUrl}>Join Meeting</a>
                          </Button>
                        ) : (
                          <Button variant="link" className="p-0 h-auto text-sm text-primary hover:text-primary/90" asChild>
                            <a href={cls.detailsUrl}>View Details</a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
                {upcomingClasses.length === 0 && (
                  <li className="py-3 text-center text-neutral-500">
                    No upcoming classes scheduled.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
          
          {/* Recent Assignments */}
          <Card className="bg-neutral-50 rounded-lg">
            <CardContent className="p-4">
              <h4 className="text-base font-medium text-neutral-900 mb-3">Recent Assignments</h4>
              <ul className="divide-y divide-neutral-200">
                {assignments.map((assignment) => (
                  <li key={assignment.id} className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{assignment.title}</p>
                        <p className="text-sm text-neutral-500">{assignment.course}</p>
                      </div>
                      <div className="text-right">
                        {assignment.status === "pending" ? (
                          <>
                            <p className="text-sm text-red-600">Due: {assignment.dueDate}</p>
                            <Button variant="link" className="p-0 h-auto text-sm text-primary hover:text-primary/90" asChild>
                              <a href={assignment.url}>Complete</a>
                            </Button>
                          </>
                        ) : (
                          <>
                            <p className="text-sm text-green-600">Completed</p>
                            <p className="text-sm text-neutral-500">Score: {assignment.score}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
                {assignments.length === 0 && (
                  <li className="py-3 text-center text-neutral-500">
                    No assignments due.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty states for other tabs */}
      {activeTab === "courses" && (
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">My Courses</h3>
          <div className="bg-neutral-50 p-12 rounded-lg text-center">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-900">No courses enrolled</h3>
            <p className="mt-1 text-sm text-neutral-500">Your enrolled courses will appear here.</p>
          </div>
        </div>
      )}
      
      {activeTab === "materials" && (
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">Course Materials</h3>
          <div className="bg-neutral-50 p-12 rounded-lg text-center">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-900">No materials available</h3>
            <p className="mt-1 text-sm text-neutral-500">Your course materials will appear here.</p>
          </div>
        </div>
      )}
      
      {activeTab === "profile" && (
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">Profile Settings</h3>
          <div className="bg-neutral-50 p-12 rounded-lg text-center">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-900">Profile settings</h3>
            <p className="mt-1 text-sm text-neutral-500">Your profile settings will appear here.</p>
          </div>
        </div>
      )}
    </>
  );
}
