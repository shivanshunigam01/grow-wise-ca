import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Award, Users, Target, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Target, value: "98%", label: "Success Rate" },
    { icon: TrendingUp, value: "₹500Cr+", label: "Savings Generated" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="pt-32 pb-20 flex-1">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">About <span className="text-gold">CA Associates</span></h1>
            <p className="text-xl text-muted-foreground">
              Your trusted partner in financial excellence and compliance solutions since 2009
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card p-6 text-center">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="glass-card glass-card-hover p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide comprehensive, reliable, and innovative financial solutions that empower businesses and individuals to achieve their financial goals while maintaining the highest standards of integrity and professionalism.
              </p>
            </Card>

            <Card className="glass-card glass-card-hover p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be India's most trusted and preferred CA firm, recognized for excellence in service delivery, innovation in financial solutions, and commitment to client success through cutting-edge technology and personalized attention.
              </p>
            </Card>
          </div>

          {/* Why Choose Us */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Expert Team",
                  description: "Our team comprises qualified Chartered Accountants with extensive experience across various industries and domains."
                },
                {
                  title: "Personalized Service",
                  description: "We understand that every client is unique. Our solutions are tailored to meet your specific needs and goals."
                },
                {
                  title: "Technology-Driven",
                  description: "We leverage cutting-edge technology to deliver efficient, accurate, and timely services."
                },
                {
                  title: "Comprehensive Solutions",
                  description: "From tax planning to audit and advisory, we offer end-to-end financial services under one roof."
                }
              ].map((item, index) => (
                <Card key={index} className="glass-card p-6 hover:shadow-medium transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
