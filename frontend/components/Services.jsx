import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Heart, Brain, Eye, Bone, Baby } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Comprehensive heart care including diagnostics, treatment, and preventive care.",
      color: "text-red-500"
    },
    {
      icon: Brain,
      title: "Neurology",
      description: "Expert care for neurological conditions and brain health disorders.",
      color: "text-purple-500"
    },
    {
      icon: Bone,
      title: "Orthopedics",
      description: "Specialized treatment for bone, joint, and musculoskeletal conditions.",
      color: "text-blue-500"
    },
    {
      icon: Eye,
      title: "Ophthalmology",
      description: "Complete eye care services from routine exams to advanced surgery.",
      color: "text-green-500"
    },
    {
      icon: Baby,
      title: "Pediatrics",
      description: "Dedicated healthcare services for infants, children, and adolescents.",
      color: "text-pink-500"
    },
    {
      icon: Stethoscope,
      title: "General Medicine",
      description: "Primary care and preventive medicine for overall health and wellness.",
      color: "text-indigo-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Medical Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive healthcare services with state-of-the-art facilities and experienced medical professionals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;