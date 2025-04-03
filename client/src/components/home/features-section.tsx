import { Laptop, FileText, CheckCircle, Globe, UserCheck, Clock, Award, Users, Lightbulb } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function Feature({ icon, title, description, gradient }: FeatureProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
      <div className={`p-6 ${gradient}`}>
        <div className="bg-white/20 w-16 h-16 flex items-center justify-center rounded-2xl backdrop-blur-sm border border-white/20 mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-neutral-900 mb-3">{title}</h3>
        <p className="text-neutral-600">
          {description}
        </p>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-white" />,
      title: "Expert Tutors",
      description: "Learn from professional, native-speaking teachers with years of experience who bring practical knowledge to every lesson.",
      gradient: "bg-gradient-to-r from-royal to-royal-light"
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "Flexible Learning",
      description: "Study at your own pace with online courses that fit your schedule, whether you're a busy professional or a full-time student.",
      gradient: "bg-gradient-to-r from-royal to-royal-light"
    },
    {
      icon: <UserCheck className="h-8 w-8 text-white" />,
      title: "Tailored Courses",
      description: "From beginners to advanced learners, we offer personalized courses based on your current level for efficient advancement.",
      gradient: "bg-gradient-to-r from-royal to-royal-light"
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Global Community",
      description: "Join students from around the world in an interactive, supportive learning environment and practice with diverse backgrounds.",
      gradient: "bg-gradient-to-r from-royal to-royal-light"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-white" />,
      title: "Interactive Learning",
      description: "Engage with interactive lessons, quizzes, and assignments that keep you motivated and ensure continuous progress.",
      gradient: "bg-gradient-to-r from-royal to-royal-light"
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      title: "Progress Tracking",
      description: "Track your learning progress and see your improvement with our user-friendly dashboard. Stay motivated with goals and milestones.",
      gradient: "bg-gradient-to-r from-royal to-royal-light"
    }
  ];

  return (
    <div id="about" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-royal/10 border border-royal/20">
            <span className="text-sm font-semibold text-royal">Why Choose WOEC</span>
          </div>
          
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Quality Education for <span className="text-royal">Everyone</span>
          </h2>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-neutral-600">
            Our courses are designed by experts to help you achieve fluency efficiently and confidently.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#courses" 
            className="inline-flex items-center justify-center px-6 py-3 border border-royal text-base font-medium rounded-md text-royal bg-white hover:bg-royal/5 transition-colors duration-300 shadow-sm"
          >
            Explore Our Courses
            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
