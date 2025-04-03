import { ApplicationForm } from "@/components/forms/application-form";
import { ClipboardList, UserCheck, Laptop, CreditCard, CheckCircle2 } from "lucide-react";

export function AdmissionsSection() {
  return (
    <div id="admissions" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background decorative elements */}
        <div className="absolute top-32 -right-64 w-96 h-96 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        
        <div className="text-center relative mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-royal/10 border border-royal/20">
            <span className="text-sm font-semibold text-royal">Admissions Open</span>
          </div>
          
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Begin Your <span className="text-royal">English Journey</span>
          </h2>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-neutral-600">
            Apply today and take the first step towards English fluency with our expert-led courses.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Application Process */}
          <div className="relative">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-neutral-100">
              <div className="px-6 py-8">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <ClipboardList className="h-6 w-6 text-primary-700" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-neutral-900">
                      How It Works
                    </h3>
                    <p className="text-neutral-600">
                      Our simple 4-step application process
                    </p>
                  </div>
                </div>
                
                <div className="space-y-8 relative mt-10">
                  {/* Vertical Timeline Line */}
                  <div className="absolute top-0 left-7 bottom-0 w-0.5 bg-neutral-100"></div>
                  
                  {/* Step 1 */}
                  <div className="relative flex items-start">
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-full bg-royal/10 text-royal z-10">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm border border-royal/20">
                        <div className="font-bold text-xl text-royal">1</div>
                      </div>
                    </div>
                    <div className="ml-20">
                      <h4 className="text-lg font-semibold text-neutral-900 mb-1">Submit Your Application</h4>
                      <p className="text-neutral-600">
                        Fill out the online application form with your personal details and course preferences.
                      </p>
                      <div className="mt-4 flex items-center text-royal">
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">Takes only 5 minutes</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative flex items-start">
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-full bg-royal/10 text-royal z-10">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm border border-royal/20">
                        <div className="font-bold text-xl text-royal">2</div>
                      </div>
                    </div>
                    <div className="ml-20">
                      <h4 className="text-lg font-semibold text-neutral-900 mb-1">Application Review</h4>
                      <p className="text-neutral-600">
                        Our admissions team will review your application within 48 hours.
                      </p>
                      <div className="mt-4 flex items-center text-royal">
                        <UserCheck className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">Personalized evaluation process</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative flex items-start">
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-full bg-royal/10 text-royal z-10">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm border border-royal/20">
                        <div className="font-bold text-xl text-royal">3</div>
                      </div>
                    </div>
                    <div className="ml-20">
                      <h4 className="text-lg font-semibold text-neutral-900 mb-1">Receive Login Credentials</h4>
                      <p className="text-neutral-600">
                        If accepted, you'll receive login credentials for the Student Portal via email.
                      </p>
                      <div className="mt-4 flex items-center text-royal">
                        <Laptop className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">Immediate access to platform</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="relative flex items-start">
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-full bg-royal/10 text-royal z-10">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm border border-royal/20">
                        <div className="font-bold text-xl text-royal">4</div>
                      </div>
                    </div>
                    <div className="ml-20">
                      <h4 className="text-lg font-semibold text-neutral-900 mb-1">Complete Payment & Begin Learning</h4>
                      <p className="text-neutral-600">
                        Complete payment and gain immediate access to your course materials.
                      </p>
                      <div className="mt-4 flex items-center text-royal">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">Secure payment options available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Callout */}
            <div className="mt-8 bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl p-6 shadow-lg border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-bold text-primary-900 mb-2">Have Questions?</h4>
                  <p className="text-primary-700 mb-4">Contact our admissions team for any queries about the application process.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                      <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className="text-xs text-neutral-500 font-medium">Email Us</div>
                        <div className="text-sm font-bold text-primary-700">admissions@woec.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                      <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <div className="text-xs text-neutral-500 font-medium">Call Us</div>
                        <div className="text-sm font-bold text-primary-700">+1 (800) 555-1234</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href="#faq" 
                      className="inline-flex items-center justify-center px-4 py-2 bg-white text-primary-700 border border-primary-300 rounded-lg font-medium text-sm hover:bg-primary-50 transition-colors"
                    >
                      View Frequently Asked Questions
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div>
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-neutral-100">
              <div className="bg-gradient-to-r from-primary-600 to-blue-600 px-6 py-4 text-white">
                <h3 className="text-xl font-bold">Application Form</h3>
                <p className="text-primary-100 text-sm">Fill out the form below to apply</p>
              </div>
              <div className="p-6">
                <ApplicationForm />
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-20 bg-neutral-50 rounded-2xl p-8 shadow-lg border border-neutral-100">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-royal/10 text-royal mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-sm border border-royal/20">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">Fast Processing</h4>
              <p className="text-neutral-600">
                Applications are processed within 48 hours of submission.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-royal/10 text-royal mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-sm border border-royal/20">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">Secure Process</h4>
              <p className="text-neutral-600">
                Your personal information is always protected and encrypted.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-royal/10 text-royal mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-sm border border-royal/20">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">Paperless Process</h4>
              <p className="text-neutral-600">
                Our entire application process is digital - no physical documents needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
