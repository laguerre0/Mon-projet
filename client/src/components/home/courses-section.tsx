import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Users, ArrowUpRight, Star } from "lucide-react";

// Hardcoded courses data with enhanced information
const staticCourses = [
  {
    id: 1,
    name: "Beginner English",
    description: "Build a strong foundation in English grammar, vocabulary, and basic conversation skills for everyday situations.",
    duration: "12 weeks",
    sessionsPerWeek: 2,
    level: "Beginner",
    rating: 4.9,
    students: 520,
    backgroundColor: "bg-gradient-to-br from-royal/5 to-royal/10",
    borderColor: "border-royal/20",
    iconColor: "text-royal",
    levelColor: "bg-royal/10 text-royal"
  },
  {
    id: 2,
    name: "Intermediate English",
    description: "Enhance your English skills with advanced grammar concepts, fluent conversation practice, and complex vocabulary.",
    duration: "16 weeks",
    sessionsPerWeek: 2,
    level: "Intermediate",
    rating: 4.8,
    students: 435,
    backgroundColor: "bg-gradient-to-br from-royal/5 to-royal/10",
    borderColor: "border-royal/20",
    iconColor: "text-royal",
    levelColor: "bg-royal/10 text-royal"
  },
  {
    id: 3,
    name: "Business English",
    description: "Master professional English for the workplace, including formal presentations, business correspondence, and negotiation skills.",
    duration: "10 weeks",
    sessionsPerWeek: 3,
    level: "Advanced",
    rating: 4.9,
    students: 380,
    backgroundColor: "bg-gradient-to-br from-royal/5 to-royal/10",
    borderColor: "border-royal/20",
    iconColor: "text-royal",
    levelColor: "bg-royal/10 text-royal"
  }
];

export function CoursesSection() {
  return (
    <div id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-royal/10 border border-royal/20">
            <span className="text-sm font-semibold text-royal">Curriculum</span>
          </div>
          
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Programs for <span className="text-royal">All Levels</span>
          </h2>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-neutral-600">
            From beginners to advanced learners, we have the perfect course to help you achieve your language goals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {staticCourses.map((course) => (
            <Card 
              key={course.id} 
              className={`overflow-hidden border-2 ${course.borderColor} ${course.backgroundColor} hover:shadow-2xl transition-all duration-300 relative transform hover:-translate-y-1`}
            >
              <div className="absolute top-3 right-3 z-10">
                <Badge variant="outline" className={`${course.levelColor} border-0 font-semibold py-1.5 px-3 shadow-sm`}>
                  {course.level}
                </Badge>
              </div>
              
              {/* Add highlight bar at the top */}
              <div className={`h-2 w-full ${course.iconColor.replace('text', 'bg')}`}></div>
              
              <CardContent className="p-6 pt-10">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(course.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-neutral-300'}`} />
                  ))}
                  <span className="text-sm font-medium text-neutral-700 ml-3 bg-neutral-100 px-2 py-0.5 rounded-md">
                    {course.rating} ({course.students} students)
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 border-b pb-3 border-neutral-200">
                  {course.name}
                </h3>
                
                <p className="text-neutral-700 mb-6 text-base leading-relaxed">
                  {course.description}
                </p>
                
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 mb-4">
                  <h4 className="font-medium text-neutral-900 text-base mb-2">Course Details:</h4>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full ${course.iconColor.replace('text', 'bg')} flex items-center justify-center mr-3`}>
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-neutral-800 font-medium">{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full ${course.iconColor.replace('text', 'bg')} flex items-center justify-center mr-3`}>
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-neutral-800 font-medium">{course.sessionsPerWeek} sessions per week</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full ${course.iconColor.replace('text', 'bg')} flex items-center justify-center mr-3`}>
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-neutral-800 font-medium">Small groups (max 10 students)</span>
                  </div>
                </div>
                
                {/* Most popular tag for intermediate course */}
                {course.id === 2 && (
                  <div className="absolute -top-1 -left-2 z-10 bg-yellow-500 text-white text-xs font-bold px-4 py-1.5 rounded-br-lg shadow-md transform rotate-0 after:content-[''] after:absolute after:top-0 after:-left-2 after:w-2 after:h-2 after:bg-yellow-600">
                    MOST POPULAR
                  </div>
                )}
                
                {/* Limited spots for business course */}
                {course.id === 3 && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center mb-3">
                    <span className="mr-2">🔥</span> Only 5 spots remaining!
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="px-6 py-5 bg-white border-t-2 border-neutral-200 flex justify-between items-center">
                <Button 
                  variant="default" 
                  className={`${course.iconColor.replace('text', 'bg')} hover:brightness-110 text-white group shadow-lg font-bold py-2.5`}
                  asChild
                >
                  <a href="#admissions" className="flex items-center">
                    Apply Now
                    <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-2 border-royal/30 text-royal hover:bg-royal/5 hover:border-royal/50 font-medium"
                  asChild
                >
                  <a href="#admissions" className="flex items-center">
                    Course Syllabus
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-1 rounded-xl bg-neutral-100 backdrop-blur-sm">
            <Button 
              variant="ghost" 
              className="text-neutral-700 hover:text-royal hover:bg-white"
              asChild
            >
              <a href="#admissions">View All Courses</a>
            </Button>
            
            <Button 
              variant="default" 
              className="bg-white text-royal shadow-sm hover:bg-royal/5"
              asChild
            >
              <a href="#admissions" className="flex items-center">
                Request Syllabus
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
