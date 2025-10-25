import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calculator, TrendingUp, Shield, Building, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: FileText,
      title: "Tax Planning & Filing",
      description: "Comprehensive tax services including ITR filing, tax optimization strategies, advance tax planning, and representation before tax authorities.",
      features: ["Income Tax Returns", "Tax Optimization", "TDS Compliance", "Tax Assessments"]
    },
    {
      icon: Calculator,
      title: "GST Compliance",
      description: "End-to-end GST services from registration to filing, reconciliation, and advisory for seamless compliance.",
      features: ["GST Registration", "Monthly/Quarterly Filing", "Input Tax Credit", "GST Audit"]
    },
    {
      icon: Shield,
      title: "Audit & Assurance",
      description: "Independent audit services ensuring accuracy, compliance, and reliability of financial statements.",
      features: ["Statutory Audit", "Internal Audit", "Tax Audit", "Stock Audit"]
    },
    {
      icon: Building,
      title: "Company Formation",
      description: "Complete assistance in company registration, compliance, and regulatory filings.",
      features: ["Company Registration", "LLP Formation", "ROC Filings", "Annual Compliance"]
    },
    {
      icon: Briefcase,
      title: "Business Advisory",
      description: "Strategic financial guidance to help businesses grow, optimize operations, and maximize profitability.",
      features: ["Financial Planning", "Business Valuation", "Due Diligence", "CFO Services"]
    },
    {
      icon: TrendingUp,
      title: "Startup Services",
      description: "Specialized services for startups including incorporation, funding support, and compliance management.",
      features: ["Startup India Registration", "Funding Assistance", "Pitch Deck Preparation", "Compliance Management"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="pt-32 pb-20 flex-1">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Our <span className="text-gold">Services</span></h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive financial services tailored to meet your unique business needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="glass-card glass-card-hover p-8 flex flex-col">
                <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="glass-card p-12 text-center bg-gradient-primary">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Every business is unique. Let's discuss how we can tailor our services to meet your specific requirements.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="gold">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
