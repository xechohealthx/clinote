import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Michael Rodriguez",
      role: "Psychiatrist",
      practice: "Mindful Psychiatry Associates",
      image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      content: "Clinote has transformed my psychiatric practice. I save 3 hours daily on documentation and can focus more on patient care. The AI captures mental health terminology perfectly and generates comprehensive SOAP notes.",
      specialty: "Psychiatry"
    },
    {
      name: "Amanda Chen, PMHNP",
      role: "Psychiatric Nurse Practitioner",
      practice: "Serenity Mental Health Clinic",
      image: "https://images.pexels.com/photos/5207274/pexels-photo-5207274.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      content: "As a PMHNP, I need to document complex mental health assessments. Clinote captures every detail of therapy sessions and generates accurate ICD-10 codes for mental health conditions. It's been incredible.",
      specialty: "Psychiatric NP"
    },
    {
      name: "David Thompson, PA-C",
      role: "Psychiatric Physician Assistant",
      practice: "Community Mental Health Partners",
      image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      content: "Working in mental health requires my full attention to patients. Clinote allows me to maintain therapeutic presence while ensuring comprehensive documentation. The SOAP notes are detailed and accurate.",
      specialty: "Psychiatric PA"
    },
    {
      name: "Lisa Martinez, LPC",
      role: "Licensed Professional Counselor",
      practice: "Healing Hearts Therapy",
      image: "https://images.pexels.com/photos/5215025/pexels-photo-5215025.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      content: "Therapy sessions require deep listening and presence. Clinote captures our conversations perfectly and generates professional therapy notes that are ready for my EMR. It's transformed my practice.",
      specialty: "Counseling"
    },
    {
      name: "Sarah Williams, LCSW",
      role: "Licensed Clinical Social Worker",
      practice: "Compassionate Care Services",
      image: "https://images.pexels.com/photos/5215026/pexels-photo-5215026.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      content: "As an LCSW, I work with diverse populations and complex cases. Clinote understands mental health terminology and generates comprehensive progress notes that capture the therapeutic process beautifully.",
      specialty: "Clinical Social Work"
    },
    {
      name: "Jessica Rodriguez, LAC",
      role: "Licensed Associate Counselor",
      practice: "New Beginnings Counseling",
      image: "https://images.pexels.com/photos/5215027/pexels-photo-5215027.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      content: "As an LAC working toward full licensure, I need to document everything thoroughly for supervision. Clinote captures our sessions perfectly and generates detailed notes that help me track client progress and meet supervision requirements.",
      specialty: "Associate Counseling"
    }
  ];

  const useCases = [
    {
      title: "Therapists & Counselors",
      description: "Perfect for LPCs, LCSWs, psychologists, and marriage & family therapists managing individual and group therapy sessions.",
      benefits: ["Individual therapy sessions", "Group therapy documentation", "Progress note management"]
    },
    {
      title: "Psychiatric Medication Management",
      description: "Ideal for psychiatrists, PMHNPs, and psychiatric PAs who need detailed documentation for medication management and psychiatric evaluations.",
      benefits: ["Medication management notes", "Psychiatric assessments", "Treatment planning"]
    },
    {
      title: "Small & Group Practices",
      description: "Streamline documentation for small private practices and group mental health clinics with multiple providers.",
      benefits: ["Multi-provider support", "Consistent documentation", "Practice management"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Mental Health Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how mental health professionals across different specialties are transforming 
            their documentation workflow with Clinote.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-blue-600">{testimonial.practice}</p>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-300 opacity-50" />
                    <p className="text-gray-700 italic pl-6">{testimonial.content}</p>
                  </div>
                  
                  <div className="mt-3 inline-block bg-white px-3 py-1 rounded-full text-xs font-medium text-blue-600">
                    {testimonial.specialty}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Perfect for Every Mental Health Practice
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <h4 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h4>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-6">Join Thousands of Satisfied Mental Health Professionals</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">5,000+</div>
              <div className="text-blue-100">Active Providers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500K+</div>
              <div className="text-blue-100">Notes Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2.5hr</div>
              <div className="text-blue-100">Daily Time Saved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;