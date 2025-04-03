import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ApplicationList } from "@/components/admin/application-list";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import WoecLogo from "../assets/woec-logo.png";
import { AuthWrapper } from "@/components/auth-wrapper";
import { UserRole } from "@shared/schema";

export default function AdminPage() {
  // Get user data from wrapper component instead
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("applications");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Admin Portal Header */}
            <div className="px-4 py-5 sm:px-6 bg-primary-800 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium flex items-center gap-2">
                  <img src={WoecLogo} alt="WOEC Logo" className="h-5 w-auto filter brightness-0 invert" />
                  Admin Portal
                </h3>
                <div>
                  <span className="text-sm">Admin: {user?.firstName} {user?.lastName}</span>
                </div>
              </div>
            </div>

            {/* Admin Dashboard */}
            <div>
              <div className="border-b border-neutral-200">
                <nav className="flex -mb-px">
                  <div className="flex h-auto border-b border-neutral-200 w-full bg-transparent space-x-2">
                    <button
                      className={`whitespace-nowrap px-1 pb-4 pt-2 text-sm font-medium ${
                        activeTab === "applications"
                          ? "text-primary border-primary border-b-2"
                          : "text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                      }`}
                      onClick={() => setActiveTab("applications")}
                    >
                      Applications
                    </button>
                    <button
                      className={`whitespace-nowrap px-1 pb-4 pt-2 text-sm font-medium ${
                        activeTab === "students"
                          ? "text-primary border-primary border-b-2"
                          : "text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                      }`}
                      onClick={() => setActiveTab("students")}
                    >
                      Students
                    </button>
                    <button
                      className={`whitespace-nowrap px-1 pb-4 pt-2 text-sm font-medium ${
                        activeTab === "courses"
                          ? "text-primary border-primary border-b-2"
                          : "text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                      }`}
                      onClick={() => setActiveTab("courses")}
                    >
                      Courses
                    </button>
                    <button
                      className={`whitespace-nowrap px-1 pb-4 pt-2 text-sm font-medium ${
                        activeTab === "settings"
                          ? "text-primary border-primary border-b-2"
                          : "text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                      }`}
                      onClick={() => setActiveTab("settings")}
                    >
                      Settings
                    </button>
                  </div>
                </nav>
              </div>

              {/* Applications Tab */}
              {activeTab === "applications" && (
                <div className="px-4 py-5 sm:p-6">
                  <ApplicationList />
                </div>
              )}

              {/* Empty states for other tabs */}
              {activeTab === "students" && (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">Enrolled Students</h3>
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-neutral-900">No students to display</h3>
                    <p className="mt-1 text-sm text-neutral-500">Student management interface will appear here.</p>
                  </div>
                </div>
              )}
              
              {activeTab === "courses" && (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">Course Management</h3>
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
                    <h3 className="mt-2 text-sm font-medium text-neutral-900">No course management</h3>
                    <p className="mt-1 text-sm text-neutral-500">Course management interface will appear here.</p>
                  </div>
                </div>
              )}
              
              {activeTab === "settings" && (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">Admin Settings</h3>
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-neutral-900">No settings available</h3>
                    <p className="mt-1 text-sm text-neutral-500">Admin settings interface will appear here.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
