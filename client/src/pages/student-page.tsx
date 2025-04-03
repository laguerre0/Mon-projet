import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StudentDashboard } from "@/components/student/dashboard";
import { useAuth } from "@/hooks/use-auth-new";
import WoecLogo from "../assets/woec-logo.png";

export default function StudentPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Portal Header */}
            <div className="px-4 py-5 sm:px-6 bg-primary-700 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium flex items-center gap-2">
                  <img src={WoecLogo} alt="WOEC Logo" className="h-5 w-auto filter brightness-0 invert" />
                  Student Portal
                </h3>
                <div>
                  <span className="text-sm">Welcome, {user?.firstName} {user?.lastName}</span>
                </div>
              </div>
            </div>

            <StudentDashboard />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
