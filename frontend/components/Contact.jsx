import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "123 Medical Center Drive\nHealthcare City, HC 12345"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "(555) 123-4567\nEmergency: (555) 911-2468"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@medicalcenter.com\nsupport@medicalcenter.com"
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Fri: 8AM-8PM\nWeekends: 9AM-5PM"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to take the next step in your healthcare journey? Contact us today to schedule an appointment or learn more about our services.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl border-0 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" className="border-gray-200 focus:border-blue-500" />
                <Input placeholder="Last Name" className="border-gray-200 focus:border-blue-500" />
              </div>
              <Input placeholder="Email Address" type="email" className="border-gray-200 focus:border-blue-500" />
              <Input placeholder="Phone Number" type="tel" className="border-gray-200 focus:border-blue-500" />
              <Textarea 
                placeholder="How can we help you?" 
                rows={4} 
                className="border-gray-200 focus:border-blue-500 resize-none"
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full text-lg">
                Send Message
              </Button>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {/* Emergency Notice */}
            <Card className="border-l-4 border-l-red-500 bg-red-50 border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-red-900 mb-2">Emergency?</h3>
                <p className="text-red-700 mb-3">
                  For life-threatening emergencies, call 911 immediately or visit your nearest emergency room.
                </p>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  Emergency Contact
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;