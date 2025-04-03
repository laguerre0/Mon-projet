import { Button } from "@/components/ui/button";
import { Globe, BookOpen, Clock, Award, Users, ArrowUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <div id="story" className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -top-24 -right-20 w-72 h-72 bg-royal/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-royal/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          
          {/* Main content */}
          <div className="relative lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="lg:col-span-1">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-royal/10 border border-royal/20">
                <span className="text-sm font-semibold text-royal">Our Story</span>
              </div>
              
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl mb-8">
                Transforming <span className="text-royal">English Education</span> Since 2018
              </h2>
              
              <div className="prose prose-lg text-neutral-600 mb-8">
                <p>
                  Founded in 2018, WOEC has been dedicated to providing quality English education online. Our team of experienced teachers are committed to helping students from all around the world achieve their language learning goals.
                </p>
                <p>
                  We believe in a communicative approach to language learning, with small class sizes and personalized attention to ensure rapid progress. Our methodology focuses on practical, real-world language use rather than just theoretical knowledge.
                </p>
                <p>
                  At WOEC, we combine traditional teaching methods with innovative technology to create an engaging and effective learning environment. Our courses are designed to develop all language skills: speaking, listening, reading, and writing.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col">
                  <div className="text-4xl font-bold text-royal">10,000+</div>
                  <div className="text-neutral-600">Students Globally</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-4xl font-bold text-royal">50+</div>
                  <div className="text-neutral-600">Qualified Tutors</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-4xl font-bold text-royal">95%</div>
                  <div className="text-neutral-600">Success Rate</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-4xl font-bold text-royal">100+</div>
                  <div className="text-neutral-600">Countries Reached</div>
                </div>
              </div>
              
              <Button 
                className="bg-white border border-royal/30 text-royal hover:bg-royal/5 shadow-sm group"
                asChild
              >
                <a href="#admissions" className="flex items-center">
                  Join Our Community
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Button>
            </div>
            
            <div className="mt-12 lg:mt-0 lg:col-span-1">
              <div className="relative">
                {/* Quote card */}
                <div className="absolute -top-6 -left-6 z-10 bg-white rounded-2xl shadow-xl p-6 w-3/4 border border-royal/10">
                  <svg className="h-12 w-12 text-royal/30 mb-4 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-lg font-medium text-neutral-800 italic mb-4">
                    "Our mission is to make quality English education accessible to everyone, regardless of location. We believe language is the key to opening doors of opportunity."
                  </p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-royal/10 flex items-center justify-center">
                      <span className="text-royal font-bold">SJ</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-semibold text-neutral-900">Sarah Johnson</div>
                      <div className="text-sm text-royal">Founder, WOEC</div>
                    </div>
                  </div>
                </div>
                
                {/* Main image */}
                <div className="relative ml-12 aspect-video rounded-2xl shadow-2xl overflow-hidden border-8 border-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-royal to-blue-600 opacity-90"></div>
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                      <defs>
                        <pattern id="grid-about" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid-about)" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col text-white p-8">
                    <div className="bg-white/10 rounded-full p-4 backdrop-blur-sm border border-white/20 mb-4">
                      <BookOpen className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Our Methodology</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-md">
                      <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-full mr-3">
                          <Clock className="h-4 w-4" />
                        </div>
                        <span className="text-sm">Self-paced Learning</span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-full mr-3">
                          <Globe className="h-4 w-4" />
                        </div>
                        <span className="text-sm">Cultural Exchange</span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-full mr-3">
                          <Users className="h-4 w-4" />
                        </div>
                        <span className="text-sm">Small Groups</span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-full mr-3">
                          <Award className="h-4 w-4" />
                        </div>
                        <span className="text-sm">Certified Teachers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animation added to global styles */}
    </div>
  );
}
