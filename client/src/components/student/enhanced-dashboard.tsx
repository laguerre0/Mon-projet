import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Calendar, 
  Clock, 
  Bell, 
  MessageSquare, 
  User, 
  Settings, 
  Download, 
  CheckCircle2, 
  PlusCircle,
  BookMarked,
  GraduationCap,
  BarChart3,
  Activity,
  FileInput,
  HelpCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function EnhancedStudentDashboard({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(45);
  const [, setLocation] = useLocation();
  
  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/logout");
      setLocation("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  // Mock data - in a real application, this would come from API calls
  const upcomingClasses = [
    {
      id: 1,
      title: "Intermediate English - Speaking Practice",
      teacher: "Emily Parker",
      time: "Today, 3:00 PM",
      joinUrl: "#",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Intermediate English - Grammar Review",
      teacher: "Michael Johnson",
      time: "Tomorrow, 10:00 AM",
      detailsUrl: "#",
      color: "bg-violet-500"
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

  const courses = [
    {
      id: 1,
      title: "Beginner English",
      progress: 100,
      instructor: "James Wilson",
      lessons: 12,
      color: "bg-blue-600",
      completed: true,
      icon: "🇬🇧"
    },
    {
      id: 2,
      title: "Intermediate English",
      progress: 65,
      instructor: "Emily Parker",
      lessons: 24,
      color: "bg-purple-600",
      completed: false,
      icon: "📚"
    },
    {
      id: 3,
      title: "Business English",
      progress: 30,
      instructor: "Michael Johnson",
      lessons: 18,
      color: "bg-emerald-600",
      completed: false,
      icon: "💼"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Assignment Due Tomorrow",
      message: "Don't forget to submit your essay",
      time: "1 hour ago",
      type: "warning"
    },
    {
      id: 2,
      title: "New Course Material Added",
      message: "New vocabulary resources added to Intermediate English",
      time: "2 hours ago",
      type: "info"
    },
    {
      id: 3,
      title: "Upcoming Live Session",
      message: "Join the conversation practice tomorrow at 2 PM",
      time: "Yesterday",
      type: "info"
    }
  ];

  // Increase progress for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get today's date
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white fixed h-screen">
        <div className="p-4 flex items-center">
          <GraduationCap className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">WOEC Portal</h1>
        </div>
        <div className="mt-8 px-3 space-y-1.5">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === "dashboard" 
                ? "bg-white text-blue-600" 
                : "text-white hover:bg-blue-700/50"
            }`}
          >
            <BarChart3 className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === "courses" 
                ? "bg-white text-blue-600" 
                : "text-white hover:bg-blue-700/50"
            }`}
          >
            <BookOpen className="h-5 w-5 mr-3" />
            <span>My Courses</span>
          </button>
          <button
            onClick={() => setActiveTab("assignments")}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === "assignments" 
                ? "bg-white text-blue-600" 
                : "text-white hover:bg-blue-700/50"
            }`}
          >
            <FileInput className="h-5 w-5 mr-3" />
            <span>Assignments</span>
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === "messages" 
                ? "bg-white text-blue-600" 
                : "text-white hover:bg-blue-700/50"
            }`}
          >
            <MessageSquare className="h-5 w-5 mr-3" />
            <span>Messages</span>
            <div className="ml-auto bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</div>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === "profile" 
                ? "bg-white text-blue-600" 
                : "text-white hover:bg-blue-700/50"
            }`}
          >
            <User className="h-5 w-5 mr-3" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab("help")}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === "help" 
                ? "bg-white text-blue-600" 
                : "text-white hover:bg-blue-700/50"
            }`}
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            <span>Help Center</span>
          </button>
        </div>
        
        <div className="mt-auto p-4">
          <div className="bg-blue-800 rounded-lg p-3">
            <div className="flex items-center mb-3">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="/avatar.png" alt={user?.firstName || "Student"} />
                <AvatarFallback>{user?.firstName?.charAt(0) || "S"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                <div className="text-xs text-blue-200">Student ID: {user?.id || "001"}</div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full text-white border-white hover:bg-blue-700"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-0 lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <GraduationCap className="h-6 w-6 mr-2" />
            <h1 className="font-bold">WOEC Portal</h1>
          </div>
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user?.firstName || "Student"}!</h2>
                  <p className="text-gray-500">{formattedDate}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                    <span className="ml-2 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">{notifications.length}</span>
                  </Button>
                </div>
              </div>

              {/* Progress overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-blue-100 mb-1">Your Progress</p>
                        <h3 className="text-3xl font-bold mb-1">45%</h3>
                        <p className="text-sm text-blue-100">Overall completion</p>
                      </div>
                      <div className="bg-blue-400/30 p-3 rounded-full">
                        <Activity className="h-6 w-6" />
                      </div>
                    </div>
                    <Progress value={progress} className="mt-4 bg-blue-400/50" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 mb-1">Courses Enrolled</p>
                        <h3 className="text-3xl font-bold mb-1">{courses.length}</h3>
                        <p className="text-sm text-gray-500">1 completed</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                        <BookMarked className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 mb-1">Due This Week</p>
                        <h3 className="text-3xl font-bold mb-1">3</h3>
                        <p className="text-sm text-gray-500">1 assignment, 2 tests</p>
                      </div>
                      <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                        <Calendar className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming classes */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {upcomingClasses.map((cls) => (
                  <Card key={cls.id} className="overflow-hidden border-none shadow-md">
                    <div className={`h-2 ${cls.color}`}></div>
                    <CardContent className="pt-4">
                      <div className="flex items-start">
                        <div className={`${cls.color} bg-opacity-20 p-3 rounded-full mr-4`}>
                          <Video className={`h-6 w-6 ${cls.color} text-opacity-100`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{cls.title}</h4>
                          <p className="text-sm text-gray-500">Teacher: {cls.teacher}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{cls.time}</span>
                          </div>
                        </div>
                        {cls.joinUrl ? (
                          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                            Join Now
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Course progress */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">Course Progress</h3>
              <div className="space-y-4 mb-8">
                {courses.map((course) => (
                  <Card key={course.id} className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{course.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{course.title}</h4>
                            <div className="flex items-center">
                              {course.completed ? (
                                <div className="flex items-center text-green-600 text-sm">
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Completed
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500">{course.progress}% complete</span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Instructor: {course.instructor} • {course.lessons} lessons</p>
                        </div>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Notifications */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Notifications</h3>
              <Card className="mb-6 border-none shadow-md">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-full mr-3 ${
                            notification.type === 'warning' 
                              ? 'bg-amber-100 text-amber-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {notification.type === 'warning' ? (
                              <Bell className="h-5 w-5" />
                            ) : (
                              <FileText className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{notification.title}</h5>
                            <p className="text-sm text-gray-500">{notification.message}</p>
                            <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                  <p className="text-gray-500">Manage and access all your courses</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      All Courses
                    </Button>
                    <Button variant="outline">
                      In Progress
                    </Button>
                    <Button variant="outline">
                      Completed
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                    <div className={`h-2 ${course.color}`}></div>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{course.icon}</span>
                        {course.completed ? (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Completed</span>
                        ) : (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">In Progress</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">Instructor: {course.instructor}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                        <div>
                          <BookOpen className="h-4 w-4 inline mr-1" /> {course.lessons} lessons
                        </div>
                        <div>
                          {course.progress}% complete
                        </div>
                      </div>
                      <Progress value={course.progress} className="h-2 mb-4" />
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
                        {course.completed ? "View Certificate" : "Continue Learning"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                {/* Add new course card */}
                <Card className="border-dashed border-2 border-gray-200 flex items-center justify-center p-5 bg-transparent h-full">
                  <div className="text-center">
                    <div className="mx-auto bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-3">
                      <PlusCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium mb-1">Browse Courses</h3>
                    <p className="text-gray-500 text-sm mb-3">Discover new courses to enhance your skills</p>
                    <Button variant="outline" className="mt-2">
                      Explore Catalog
                    </Button>
                  </div>
                </Card>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Recommended Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-xl mb-2">🎯</div>
                    <h4 className="font-medium mb-1">Advanced English Conversation</h4>
                    <p className="text-sm text-gray-500 mb-3">Perfect your speaking skills with native speakers</p>
                    <Button variant="outline" size="sm" className="w-full">View Course</Button>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-xl mb-2">✍️</div>
                    <h4 className="font-medium mb-1">Business Writing Skills</h4>
                    <p className="text-sm text-gray-500 mb-3">Learn professional email and report writing</p>
                    <Button variant="outline" size="sm" className="w-full">View Course</Button>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-xl mb-2">🗣️</div>
                    <h4 className="font-medium mb-1">Public Speaking in English</h4>
                    <p className="text-sm text-gray-500 mb-3">Build confidence for presentations and speeches</p>
                    <Button variant="outline" size="sm" className="w-full">View Course</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === "assignments" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Assignments & Exams</h2>
                  <p className="text-gray-500">Manage your assignments, tests, and submissions</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      All
                    </Button>
                    <Button variant="outline">
                      Pending
                    </Button>
                    <Button variant="outline">
                      Completed
                    </Button>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Due Soon</h3>
              <Card className="mb-6 border-none shadow-md">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {assignments.filter(a => a.status === 'pending').map((assignment) => (
                      <div key={assignment.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-3 rounded-full mr-4 text-amber-600">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{assignment.title}</h4>
                                <p className="text-sm text-gray-500">{assignment.course}</p>
                              </div>
                              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Due: {assignment.dueDate}</span>
                            </div>
                            <div className="mt-3 flex">
                              <Button className="mr-2 bg-blue-600 hover:bg-blue-700" size="sm">
                                Submit Assignment
                              </Button>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Completed Assignments</h3>
              <Card className="mb-6 border-none shadow-md">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {assignments.filter(a => a.status === 'completed').map((assignment) => (
                      <div key={assignment.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className="bg-green-100 p-3 rounded-full mr-4 text-green-600">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{assignment.title}</h4>
                                <p className="text-sm text-gray-500">{assignment.course}</p>
                              </div>
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Score: {assignment.score}</span>
                            </div>
                            <div className="mt-3">
                              <Button variant="outline" size="sm">
                                View Feedback
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Exams</h3>
              <Card className="mb-6 border-none shadow-md">
                <CardContent className="p-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Intermediate English - Mid-term Exam</h4>
                        <p className="text-sm text-gray-600">Scheduled for September 20, 2023 | 10:00 AM - 12:00 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center my-6 text-gray-500">
                    <div className="mb-2">📝</div>
                    <p>No other exams scheduled at this time</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
                  <p className="text-gray-500">Communicate with instructors and administration</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Messages menu */}
                <Card className="border-none shadow-md md:col-span-1">
                  <CardContent className="p-0">
                    <div className="p-3 bg-gray-50 border-b">
                      <h3 className="font-medium">Message Folders</h3>
                    </div>
                    <div className="divide-y">
                      <button className="w-full text-left p-3 bg-blue-50 border-l-4 border-blue-600">
                        <div className="flex items-center">
                          <div className="mr-3 text-blue-600">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <span className="font-medium">Inbox</span>
                          </div>
                          <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</div>
                        </div>
                      </button>
                      <button className="w-full text-left p-3 hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="mr-3 text-gray-500">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <div>
                            <span>Sent Messages</span>
                          </div>
                        </div>
                      </button>
                      <button className="w-full text-left p-3 hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="mr-3 text-gray-500">
                            <Bell className="h-5 w-5" />
                          </div>
                          <div>
                            <span>Announcements</span>
                          </div>
                          <div className="ml-auto bg-gray-200 text-gray-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">2</div>
                        </div>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Message contents */}
                <Card className="border-none shadow-md md:col-span-2">
                  <CardContent className="p-0">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Recent Messages</h3>
                    </div>
                    <div className="divide-y">
                      <div className="p-4 bg-blue-50 hover:bg-blue-100 cursor-pointer">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src="/teacher1.png" />
                            <AvatarFallback>EP</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Emily Parker</span>
                              <span className="text-xs text-gray-500">10:23 AM</span>
                            </div>
                            <p className="text-sm">Feedback on your recent speaking assignment - Great work on your presentation! I've provided some detailed feedback...</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src="/admin.png" />
                            <AvatarFallback>AD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Admin Office</span>
                              <span className="text-xs text-gray-500">Yesterday</span>
                            </div>
                            <p className="text-sm">Course registration confirmation - Your enrollment in "Business English" has been confirmed...</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src="/teacher2.png" />
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Michael Johnson</span>
                              <span className="text-xs text-gray-500">Aug 30</span>
                            </div>
                            <p className="text-sm">Grammar quiz preparation - Here are some resources to help you prepare for Friday's quiz...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card className="border-none shadow-md text-center p-6">
                    <div className="mb-4">
                      <Avatar className="h-24 w-24 mx-auto">
                        <AvatarImage src="/avatar.png" alt={user?.firstName || "Student"} />
                        <AvatarFallback className="text-2xl">{user?.firstName?.charAt(0) || "S"}</AvatarFallback>
                      </Avatar>
                    </div>
                    <h3 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h3>
                    <p className="text-gray-500 mb-4">Student ID: {user?.id || "001"}</p>
                    
                    <div className="flex justify-center space-x-3 mb-6">
                      <Button variant="outline" size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <div className="flex items-center">
                        <div className="w-8 text-gray-500">📚</div>
                        <span>Intermediate Level Student</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 text-gray-500">🗓️</div>
                        <span>Joined: January 2023</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 text-gray-500">🌐</div>
                        <span>Time Zone: GMT+1</span>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card className="border-none shadow-md mb-6">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={user?.firstName || ""}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={user?.lastName || ""}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value="student@example.com"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input 
                            type="tel" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Add your phone number"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 mt-2">
                          Update Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4">Account Settings</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Change Password</h4>
                            <p className="text-sm text-gray-500">Update your password regularly for better security</p>
                          </div>
                          <Button variant="outline">
                            Change
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-gray-500">Receive emails about your courses, assignments and messages</p>
                          </div>
                          <div className="flex h-6 items-center">
                            <input id="notifications" type="checkbox" className="h-4 w-4 rounded border-gray-300" checked />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          </div>
                          <Button variant="outline">
                            Enable
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Help Center Tab */}
          {activeTab === "help" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Help Center</h2>
                  <p className="text-gray-500">Find answers and get support</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-blue-600">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Getting Started Guides</h3>
                    <p className="text-gray-500 mb-4">Learn how to navigate and use all features of the student portal</p>
                    <Button variant="outline" className="w-full">
                      View Guides
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-purple-600">
                      <Video className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Video Tutorials</h3>
                    <p className="text-gray-500 mb-4">Watch step-by-step tutorials for common tasks and features</p>
                    <Button variant="outline" className="w-full">
                      Watch Videos
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-amber-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">FAQs</h3>
                    <p className="text-gray-500 mb-4">Find answers to frequently asked questions about courses and the portal</p>
                    <Button variant="outline" className="w-full">
                      View FAQs
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Help Articles</h3>
              <Card className="border-none shadow-md mb-8">
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50">
                      <h4 className="font-medium mb-1">How to submit assignments</h4>
                      <p className="text-sm text-gray-500">Learn about the different ways to submit your work and get feedback</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50">
                      <h4 className="font-medium mb-1">Joining live classes</h4>
                      <p className="text-sm text-gray-500">Instructions for accessing and participating in virtual classroom sessions</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50">
                      <h4 className="font-medium mb-1">Tracking your course progress</h4>
                      <p className="text-sm text-gray-500">How to view and understand your progress through course materials</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50">
                      <h4 className="font-medium mb-1">Technical requirements for video calls</h4>
                      <p className="text-sm text-gray-500">System requirements and best practices for smooth video sessions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Support</h3>
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md" 
                        placeholder="Enter subject"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-md" 
                        placeholder="Describe your issue or question"
                        rows={5}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (optional)</label>
                      <input 
                        type="file" 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-500"
                      />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 mt-2">
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}