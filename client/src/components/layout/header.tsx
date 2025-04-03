import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth-new";
import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X, BookOpen, Users, GraduationCap, School, LogOut, LayoutDashboard } from "lucide-react";
import WoecLogo from "../../assets/woec-logo.png";

export function Header() {
  // Try to use auth, but provide fallbacks if not available
  let user = null;
  let isAdmin = false;
  let isStudent = false;
  let logoutMutation = { mutate: () => {}, isPending: false };
  
  try {
    const auth = useAuth();
    user = auth.user;
    isAdmin = auth.isAdmin;
    isStudent = auth.isStudent;
    logoutMutation = auth.logoutMutation;
  } catch (e) {
    // Silently handle the error if AuthProvider is not available
    console.log("Auth not available in header");
  }
  
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string) => location === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  // Close menu when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (!menuRef.current?.contains(e.target as Node) && 
        !menuButtonRef.current?.contains(e.target as Node) && 
        mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  
  // Add event listener for clicking outside the menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white shadow sticky top-0 z-50 border-b border-blue-900/10">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        {/* Desktop Navigation Board - All in one line as per Citroën requirements */}
        <div className="hidden sm:flex items-center justify-between h-16 whitespace-nowrap">
          {/* Logo and brand name section - kept together as required */}
          <div className="flex-shrink-0 flex items-center mr-6">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src={WoecLogo} 
                  alt="WOEC Logo" 
                  className="h-10 w-auto"
                />
                <span className="ml-2 text-xl font-semibold text-primary">WOEC</span>
              </div>
            </Link>
          </div>

          {/* Main navigation tabs - all on same line with consistent spacing */}
          <div className="flex flex-1 justify-center">
            <nav className="flex items-center space-x-4 md:space-x-6 lg:space-x-10">
              <Link href="/">
                <div className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer
                  ${isActive("/") 
                    ? "border-b-2 border-primary text-primary" 
                    : "text-gray-600 hover:text-primary hover:border-b-2 hover:border-primary/50"
                  }`}
                >
                  Home
                </div>
              </Link>
              
              <a 
                href="/#courses" 
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200
                  text-gray-600 hover:text-primary hover:border-b-2 hover:border-primary/50`}
              >
                <BookOpen className="h-4 w-4 mr-1.5" />
                Courses
              </a>
              
              <a 
                href="/#about" 
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200
                  text-gray-600 hover:text-primary hover:border-b-2 hover:border-primary/50`}
              >
                <Users className="h-4 w-4 mr-1.5" />
                About Us
              </a>
              
              <a 
                href="/#admissions" 
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200
                  text-gray-600 hover:text-primary hover:border-b-2 hover:border-primary/50`}
              >
                <GraduationCap className="h-4 w-4 mr-1.5" />
                Admissions
              </a>
            </nav>
          </div>

          {/* Student Portal / User Actions */}
          <div className="flex items-center ml-6">
            {!user ? (
              <Button 
                variant="default" 
                className="bg-primary hover:bg-primary/90 flex items-center" 
                asChild
                size="sm"
              >
                <Link href="/auth">
                  <School className="h-4 w-4 mr-1.5 flex-shrink-0" />
                  <span className="whitespace-nowrap md:inline hidden">WOEC Portal</span>
                  <span className="md:hidden inline">Portal</span>
                </Link>
              </Button>
            ) : isAdmin ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="default" 
                  className="bg-primary hover:bg-primary/90 flex items-center" 
                  asChild
                  size="sm"
                >
                  <Link href="/admin">
                    <LayoutDashboard className="h-4 w-4 mr-1.5 flex-shrink-0" />
                    <span className="whitespace-nowrap md:inline hidden">Admin Dashboard</span>
                    <span className="md:hidden inline">Admin</span>
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  size="sm"
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="default" 
                  className="bg-primary hover:bg-primary/90 flex items-center" 
                  asChild
                  size="sm"
                >
                  <Link href="/student">
                    <BookOpen className="h-4 w-4 mr-1.5 flex-shrink-0" />
                    <span className="whitespace-nowrap md:inline hidden">Student Dashboard</span>
                    <span className="md:hidden inline">Dashboard</span>
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  size="sm"
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Hamburger menu as required */}
        <div className="flex sm:hidden items-center justify-between h-16">
          {/* Logo and brand name section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src={WoecLogo} 
                  alt="WOEC Logo" 
                  className="h-9 w-auto"
                />
                <span className="ml-2 text-xl font-semibold text-primary">WOEC</span>
              </div>
            </Link>
          </div>

          {/* Mobile menu button - proper touch area size */}
          <Button 
            ref={menuButtonRef}
            variant="ghost" 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu - smooth slide down animation */}
      {mobileMenuOpen && (
        <div 
          ref={menuRef}
          className="sm:hidden bg-white overflow-hidden shadow-lg transition-all duration-300 ease-in-out max-h-screen"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className={`block px-3 py-3 rounded-md text-base font-medium ${
                isActive("/") 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-600 hover:bg-primary/5 hover:text-primary"
              }`}>
                <div className="flex items-center">
                  <img 
                    src={WoecLogo}
                    alt="WOEC Logo" 
                    className="w-5 h-5 mr-3"
                  />
                  Home
                </div>
              </div>
            </Link>
            
            <a 
              href="/#courses" 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:bg-primary/5 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-3" />
                Courses
              </div>
            </a>
            
            <a 
              href="/#about" 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:bg-primary/5 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3" />
                About Us
              </div>
            </a>
            
            <a 
              href="/#admissions" 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:bg-primary/5 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-3" />
                Admissions
              </div>
            </a>
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4 py-3">
              {!user ? (
                <Button 
                  className="w-full h-12 bg-primary hover:bg-primary/90 flex items-center justify-center gap-2" 
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/auth">
                    <School className="h-5 w-5" />
                    <span>WOEC Portal</span>
                  </Link>
                </Button>
              ) : isAdmin ? (
                <div className="flex flex-col w-full gap-3">
                  <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 flex items-center justify-center gap-2" 
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/admin">
                      <LayoutDashboard className="h-5 w-5" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 flex items-center justify-center gap-2" 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col w-full gap-3">
                  <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 flex items-center justify-center gap-2" 
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/student">
                      <BookOpen className="h-5 w-5" />
                      <span>Student Dashboard</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 flex items-center justify-center gap-2" 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
