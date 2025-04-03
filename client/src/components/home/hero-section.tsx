import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, CheckCircle, ArrowRight, Award } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-royal-dark to-royal text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-24 sm:py-28 md:py-32 lg:py-36 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 mb-6 border border-white/20">
              <GraduationCap className="h-5 w-5 mr-2 text-white" />
              <span className="text-sm font-medium text-white">Upgrade Your English Skills</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-tight text-white">
              Welcome to <span className="text-white bg-royal-light px-2 py-1 rounded-lg">WOEC</span>
              <span className="block text-white mt-2">English Course</span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-white leading-relaxed max-w-2xl font-medium">
              Unlock your potential with quality English education tailored to your needs. Join thousands of students already improving their English with WOEC.
            </p>
            
            <div className="mt-10 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-accent-yellow hover:bg-accent-yellow/90 text-text-primary font-bold rounded-lg group transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-accent-yellow/80"
                asChild
              >
                <a href="#admissions" className="flex items-center justify-center text-base">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white bg-white/20 hover:bg-white/40 text-white font-bold rounded-lg transition-all duration-300 shadow-md"
                asChild
              >
                <a href="#courses" className="flex items-center justify-center text-base">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Courses
                </a>
              </Button>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center bg-white/10 p-3 rounded-lg">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-royal-light flex items-center justify-center mr-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-sm">
                    <CheckCircle className="h-4 w-4 text-royal" />
                  </div>
                </div>
                <span className="text-base text-white font-medium">Native-speaking teachers</span>
              </div>
              <div className="flex items-center bg-white/10 p-3 rounded-lg">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-royal-light flex items-center justify-center mr-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-sm">
                    <CheckCircle className="h-4 w-4 text-royal" />
                  </div>
                </div>
                <span className="text-base text-white font-medium">Flexible learning schedule</span>
              </div>
              <div className="flex items-center bg-white/10 p-3 rounded-lg">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-royal-light flex items-center justify-center mr-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-sm">
                    <CheckCircle className="h-4 w-4 text-royal" />
                  </div>
                </div>
                <span className="text-base text-white font-medium">Interactive online classes</span>
              </div>
              <div className="flex items-center bg-white/10 p-3 rounded-lg">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-royal-light flex items-center justify-center mr-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-sm">
                    <CheckCircle className="h-4 w-4 text-royal" />
                  </div>
                </div>
                <span className="text-base text-white font-medium">Progress tracking</span>
              </div>
            </div>
            
            {/* Add an award badge for recognition - addressing USP issue */}
            <div className="mt-8">
              <div className="inline-flex items-center bg-accent-yellow/20 px-4 py-2 rounded-full border border-accent-yellow/30">
                <Award className="h-5 w-5 text-accent-yellow mr-2" />
                <span className="text-white font-medium text-sm">Rated #1 Online English School 2024</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-blue-300 rounded-2xl blur-xl opacity-70 animate-pulse"></div>
            <div className="relative rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-8 shadow-2xl overflow-hidden">
              <div className="rounded-xl overflow-hidden">
                <svg className="w-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#0055a4" d="M30,40 L370,40 C385.5,40 398,52.5 398,68 L398,232 C398,247.5 385.5,260 370,260 L30,260 C14.5,260 2,247.5 2,232 L2,68 C2,52.5 14.5,40 30,40 Z" />
                  <path fill="#ffffff" opacity="0.1" d="M20,20 L380,20 C396.5,20 410,33.5 410,50 L410,250 C410,266.5 396.5,280 380,280 L20,280 C3.5,280 -10,266.5 -10,250 L-10,50 C-10,33.5 3.5,20 20,20 Z" />
                  <circle cx="200" cy="140" r="80" fill="#ffffff" opacity="0.1" />
                  <circle cx="200" cy="140" r="40" fill="#ffffff" opacity="0.3" />
                  <path fill="#ffffff" opacity="0.4" d="M170,90 L230,90 C236.5,90 242,95.5 242,102 L242,178 C242,184.5 236.5,190 230,190 L170,190 C163.5,190 158,184.5 158,178 L158,102 C158,95.5 163.5,90 170,90 Z" />
                </svg>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-400 rounded-full mr-3"></div>
                  <div className="h-3 w-32 bg-white/30 rounded-full"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-blue-400 rounded-full mr-3"></div>
                  <div className="h-3 w-40 bg-white/30 rounded-full"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-yellow-400 rounded-full mr-3"></div>
                  <div className="h-3 w-28 bg-white/30 rounded-full"></div>
                </div>
              </div>
              
              {/* Added trust badge */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30 text-white text-xs font-bold">
                Trusted by 10,000+ students
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-royal/0 to-white overflow-hidden">
        <svg className="absolute bottom-0 w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="white" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
}
