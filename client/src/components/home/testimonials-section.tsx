import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialProps {
  content: string;
  author: string;
  country: string;
  rating: number;
  course?: string;
  accent?: string;
}

function Testimonial({ content, author, country, rating, course, accent = "primary" }: TestimonialProps) {
  const accentColors = {
    primary: {
      cardBg: "bg-gradient-to-br from-royal-50/70 to-royal-50/90",
      dotBg: "bg-royal-100",
      dotText: "text-royal",
      iconBg: "bg-royal-100/50",
      iconText: "text-royal",
      starColor: "fill-royal text-royal",
      borderColor: "border-royal-200",
      highlightColor: "bg-royal"
    },
    blue: {
      cardBg: "bg-gradient-to-br from-royal-light/10 to-royal-light/20",
      dotBg: "bg-royal-light/30",
      dotText: "text-royal-dark",
      iconBg: "bg-royal-light/20",
      iconText: "text-royal-light",
      starColor: "fill-royal-light text-royal-light",
      borderColor: "border-royal-light/30",
      highlightColor: "bg-royal-light"
    },
    indigo: {
      cardBg: "bg-gradient-to-br from-royal-dark/10 to-royal-dark/20",
      dotBg: "bg-royal-dark/20",
      dotText: "text-royal-dark",
      iconBg: "bg-royal-dark/10",
      iconText: "text-royal-dark",
      starColor: "fill-royal-dark text-royal-dark",
      borderColor: "border-royal-dark/20",
      highlightColor: "bg-royal-dark"
    },
    yellow: {
      cardBg: "bg-gradient-to-br from-accent-yellow/10 to-accent-yellow/20",
      dotBg: "bg-accent-yellow/30",
      dotText: "text-accent-yellow/90",
      iconBg: "bg-accent-yellow/20",
      iconText: "text-accent-yellow",
      starColor: "fill-accent-yellow text-accent-yellow",
      borderColor: "border-accent-yellow/30",
      highlightColor: "bg-accent-yellow"
    },
    green: {
      cardBg: "bg-gradient-to-br from-accent-green/10 to-accent-green/20",
      dotBg: "bg-accent-green/30",
      dotText: "text-accent-green/90",
      iconBg: "bg-accent-green/20",
      iconText: "text-accent-green",
      starColor: "fill-accent-green text-accent-green", 
      borderColor: "border-accent-green/30",
      highlightColor: "bg-accent-green"
    }
  };
  
  const colors = accentColors[accent as keyof typeof accentColors];
  
  return (
    <Card className={`overflow-hidden border-2 ${colors.borderColor} ${colors.cardBg} rounded-xl backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      {/* Decorative highlight bar */}
      <div className={`h-1.5 w-full ${colors.highlightColor}`}></div>
      
      <CardContent className="p-8 relative">
        <div className="absolute -top-2 -right-2 w-14 h-14 flex items-center justify-center rounded-full border-2 border-neutral-50 bg-white shadow-md">
          <Quote className={`w-6 h-6 ${colors.iconText}`} />
        </div>
        
        <div className="flex items-center mb-5">
          <div className="flex">
            {[...Array(5)].map((_, i) => {
              if (i < Math.floor(rating)) {
                // Full stars
                return (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${colors.starColor}`}
                    fill="currentColor"
                  />
                );
              } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                // Half star for 4.5 rating - using a completely different approach for better half-star display
                return (
                  <div key={i} className="relative flex items-center justify-center">
                    {/* Empty star as background */}
                    <Star className="h-5 w-5 text-neutral-300" fill="none" />
                    
                    {/* Left half of the star filled */}
                    <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}>
                      <Star className={`h-5 w-5 ${colors.starColor}`} fill="currentColor" />
                    </div>
                  </div>
                );
              } else {
                // Empty stars
                return (
                  <Star
                    key={i}
                    className="h-5 w-5 text-neutral-300"
                    fill="none"
                  />
                );
              }
            })}
          </div>
          <span className="text-sm font-bold text-neutral-700 ml-3 bg-white px-2 py-1 rounded-md shadow-sm border border-neutral-200">
            {rating.toFixed(1)}
          </span>
        </div>
        
        {/* Add quotation marks for visual appeal */}
        <div className="relative">
          <div className="absolute -top-3 -left-2 text-6xl opacity-15 font-serif text-neutral-400">"</div>
          <p className="text-neutral-800 mb-6 leading-relaxed font-medium relative z-10 pl-4">{content}</p>
          <div className="absolute -bottom-6 -right-2 text-6xl opacity-15 font-serif text-neutral-400">"</div>
        </div>
        
        <div className="flex items-center justify-between mt-10 pt-4 border-t border-neutral-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`h-14 w-14 rounded-full ${colors.dotBg} flex items-center justify-center border-2 border-white shadow-md`}>
                <span className={`${colors.dotText} font-bold text-lg`}>{author.charAt(0)}</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-base font-bold text-neutral-900">{author}</p>
              <p className="text-sm text-neutral-600">{country}</p>
            </div>
          </div>
          
          {course && (
            <div className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white shadow-sm border border-neutral-200 flex items-center">
              <div className={`w-2 h-2 rounded-full ${colors.highlightColor} mr-2`}></div>
              {course}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      content: "The courses at WOEC helped me improve my English skills significantly. The teachers are professional and supportive. I was able to practice speaking every day in small group sessions which really boosted my confidence.",
      author: "Miguel Santos",
      country: "Brazil",
      rating: 5,
      course: "Intermediate English",
      accent: "primary"
    },
    {
      content: "The Business English course was exactly what I needed for my career. I now feel confident in professional settings. The course focused on practical skills like email writing and presentations that I use daily at work.",
      author: "Sophia Kim",
      country: "South Korea",
      rating: 4.5,
      course: "Business English",
      accent: "indigo"
    },
    {
      content: "I started as a beginner and progressed to intermediate in just 3 months. The online platform is easy to use and the lessons are engaging. The native-speaking teachers made learning enjoyable and effective.",
      author: "Marco Rossi",
      country: "Italy",
      rating: 5,
      course: "Beginner English",
      accent: "blue"
    },
    {
      content: "WOEC's flexible schedule allowed me to learn English while maintaining my full-time job. The personalized feedback from instructors helped me improve my weak areas and build on my strengths.",
      author: "Chen Wei",
      country: "China",
      rating: 4.5,
      course: "Intermediate English",
      accent: "primary"
    },
    {
      content: "After completing the Advanced English course, I was able to pass my IELTS exam with a score of 7.5. The test preparation strategies were incredibly helpful and the practice tests were similar to the real exam.",
      author: "Aisha Patel",
      country: "India",
      rating: 5,
      course: "Advanced English",
      accent: "blue"
    }
  ];

  return (
    <div className="bg-neutral-50 py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-royal-light/20 border border-royal-light/30">
            <span className="text-sm font-semibold text-royal">Student Success</span>
          </div>
          
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            What Our <span className="text-royal">Students Say</span>
          </h2>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-neutral-600">
            Hear from learners who have transformed their English with our expert-guided courses.
          </p>
        </div>
        
        {/* Mobile view: Carousel */}
        <div className="md:hidden overflow-hidden">
          <Carousel className="w-full max-w-full">
            <CarouselContent className="max-w-full">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="max-w-full">
                  <div className="px-1">
                    <Testimonial
                      content={testimonial.content}
                      author={testimonial.author}
                      country={testimonial.country}
                      rating={testimonial.rating}
                      course={testimonial.course}
                      accent={testimonial.accent}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0 ml-2" />
            </div>
          </Carousel>
        </div>
        
        {/* Desktop view: Carousel */}
        <div className="hidden md:block overflow-hidden">
          <Carousel className="w-full max-w-full">
            <CarouselContent className="max-w-full">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 max-w-full">
                  <div className="p-1">
                    <Testimonial
                      content={testimonial.content}
                      author={testimonial.author}
                      country={testimonial.country}
                      rating={testimonial.rating}
                      course={testimonial.course}
                      accent={testimonial.accent}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0 ml-2" />
            </div>
          </Carousel>
        </div>
        
        {/* Statistics with context */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200">
          <div className="px-8 py-5 bg-royal-light/10 border-b border-royal-light/20">
            <h3 className="text-lg font-bold text-royal">Why Students Choose WOEC</h3>
            <p className="text-sm text-royal-light">Independently verified statistics based on surveys and assessments from 2023-2024</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="p-8 text-center border-r border-b md:border-b-0 border-neutral-100 hover:bg-neutral-50 transition-colors">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-royal-light/20 text-royal mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-sm border border-royal-light/30">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-royal mb-1">98%</div>
              <div className="text-neutral-700 font-medium mb-1">Student Satisfaction</div>
              <div className="text-xs text-neutral-500">Based on exit surveys</div>
            </div>
            
            <div className="p-8 text-center border-b md:border-b-0 md:border-r border-neutral-100 hover:bg-neutral-50 transition-colors">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-royal-light/20 text-royal mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-sm border border-royal-light/30">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-royal mb-1">80+</div>
              <div className="text-neutral-700 font-medium mb-1">Countries Represented</div>
              <div className="text-xs text-neutral-500">Global learning community</div>
            </div>
            
            <div className="p-8 text-center border-r border-neutral-100 hover:bg-neutral-50 transition-colors">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-royal-light/20 text-royal mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-sm border border-royal-light/30">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-royal mb-1">8.5/10</div>
              <div className="text-neutral-700 font-medium mb-1">Average Improvement</div>
              <div className="text-xs text-neutral-500">Based on entry vs. exit assessments</div>
            </div>
            
            <div className="p-8 text-center hover:bg-neutral-50 transition-colors">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-royal-light/20 text-royal mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-sm border border-royal-light/30">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-royal mb-1">10k+</div>
              <div className="text-neutral-700 font-medium mb-1">Students Enrolled</div>
              <div className="text-xs text-neutral-500">Since launching in 2018</div>
            </div>
          </div>
          
          {/* Added Trust badges */}
          <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-neutral-200">
              <svg className="h-5 w-5 text-accent-yellow mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-bold text-neutral-700">Verified Reviews</span>
            </div>
            <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-neutral-200">
              <svg className="h-5 w-5 text-royal mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-bold text-neutral-700">Secure Payments</span>
            </div>
            <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-neutral-200">
              <svg className="h-5 w-5 text-royal-light mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-bold text-neutral-700">Quality Guarantee</span>
            </div>
            <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-neutral-200">
              <svg className="h-5 w-5 text-royal-dark mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-xs font-bold text-neutral-700">Native-speaking Teachers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
