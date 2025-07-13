import { Button } from "../components/ui/button";
import { Award, Users, Clock, Shield } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Award-Winning Care",
      description: "Recognized for excellence in patient care and medical innovation."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Board-certified physicians with years of specialized experience."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock emergency services and patient support."
    },
    {
      icon: Shield,
      title: "Advanced Technology",
      description: "State-of-the-art medical equipment and treatment methods."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Committed to Your
                <span className="text-blue-600 block">Health & Wellness</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                With over two decades of excellence in healthcare, we've built our reputation on compassionate care, medical expertise, and innovative treatments. Our mission is to provide every patient with personalized, comprehensive healthcare that exceeds expectations.
              </p>
              <p className="text-gray-600">
                From routine check-ups to complex procedures, our multidisciplinary team works together to ensure you receive the best possible care in a comfortable, supportive environment.
              </p>
            </div>
            
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg">
              Learn More About Us
            </Button>
          </div>
          
          {/* Right Content - Features Grid */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-blue-50 transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;