import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calculator, TrendingUp, PiggyBank, FileText, CreditCard, Percent } from "lucide-react";
import { Link } from "react-router-dom";

const Tools = () => {
  const tools = [
    {
      icon: Percent,
      title: "GST Calculator",
      description: "Calculate GST amount, inclusive and exclusive prices instantly",
      path: "/tools/gst-calculator",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: CreditCard,
      title: "EMI Calculator",
      description: "Calculate your loan EMI, total interest, and repayment schedule",
      path: "/tools/emi-calculator",
      color: "from-green-500 to-green-600"
    },
    {
      icon: PiggyBank,
      title: "Take-Home Salary Calculator",
      description: "Calculate your in-hand salary after all deductions",
      path: "/tools/salary-calculator",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Advance Tax Calculator",
      description: "Estimate your advance tax liability and payment schedule",
      path: "/tools/advance-tax-calculator",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Calculator,
      title: "Investment Goal Planner",
      description: "Plan your SIP investments to achieve financial goals",
      path: "/tools/investment-planner",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: FileText,
      title: "Document Checklist Generator",
      description: "Get customized document lists for ITR, GST, and loans",
      path: "/tools/document-checklist",
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="pt-32 pb-20 flex-1">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Financial <span className="text-gold">Tools & Calculators</span></h1>
            <p className="text-xl text-muted-foreground">
              Free, easy-to-use calculators to help you make informed financial decisions
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Link key={index} to={tool.path}>
                <Card className="glass-card glass-card-hover p-8 h-full cursor-pointer group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-gold transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {tool.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          {/* Info Section */}
          <Card className="glass-card mt-16 p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Custom Financial Analysis?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              While our calculators provide quick estimates, every financial situation is unique. 
              Contact our experts for personalized advice tailored to your specific needs.
            </p>
            <Link to="/contact">
              <button className="px-8 py-3 bg-gold text-primary rounded-lg font-semibold hover:bg-gold-light transition-colors shadow-gold">
                Consult Our Experts
              </button>
            </Link>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tools;
