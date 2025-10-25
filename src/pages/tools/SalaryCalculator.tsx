import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SalaryCalculator = () => {
  const [basic, setBasic] = useState("");
  const [hra, setHra] = useState("");
  const [otherAllowances, setOtherAllowances] = useState("");
  const [result, setResult] = useState<{
    grossSalary: number;
    pf: number;
    professionalTax: number;
    incomeTax: number;
    totalDeductions: number;
    takeHome: number;
  } | null>(null);

  const calculateSalary = () => {
    const basicSalary = parseFloat(basic) || 0;
    const hraAmount = parseFloat(hra) || 0;
    const allowances = parseFloat(otherAllowances) || 0;

    const grossSalary = basicSalary + hraAmount + allowances;
    
    // PF: 12% of basic (both employee and employer contribution)
    const pf = basicSalary * 0.12;
    
    // Professional Tax (approximate)
    const professionalTax = grossSalary > 25000 ? 200 : 0;
    
    // Simplified Income Tax (very rough estimate)
    const annualGross = grossSalary * 12;
    let incomeTax = 0;
    if (annualGross > 1000000) {
      incomeTax = (annualGross * 0.2) / 12;
    } else if (annualGross > 500000) {
      incomeTax = (annualGross * 0.1) / 12;
    }

    const totalDeductions = pf + professionalTax + incomeTax;
    const takeHome = grossSalary - totalDeductions;

    setResult({
      grossSalary: Math.round(grossSalary * 100) / 100,
      pf: Math.round(pf * 100) / 100,
      professionalTax: Math.round(professionalTax * 100) / 100,
      incomeTax: Math.round(incomeTax * 100) / 100,
      totalDeductions: Math.round(totalDeductions * 100) / 100,
      takeHome: Math.round(takeHome * 100) / 100
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="pt-32 pb-20 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/tools" className="inline-flex items-center text-primary hover:text-gold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>

          <h1 className="text-4xl font-bold mb-4">Take-Home Salary Calculator</h1>
          <p className="text-muted-foreground mb-8">
            Calculate your in-hand salary after all deductions
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator */}
            <Card className="glass-card p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Basic Salary (₹/month)</label>
                  <Input
                    type="number"
                    value={basic}
                    onChange={(e) => setBasic(e.target.value)}
                    placeholder="e.g., 40000"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">HRA (₹/month)</label>
                  <Input
                    type="number"
                    value={hra}
                    onChange={(e) => setHra(e.target.value)}
                    placeholder="e.g., 20000"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Other Allowances (₹/month)</label>
                  <Input
                    type="number"
                    value={otherAllowances}
                    onChange={(e) => setOtherAllowances(e.target.value)}
                    placeholder="e.g., 10000"
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Special allowances, transport, medical, etc.
                  </p>
                </div>

                <Button
                  onClick={calculateSalary}
                  className="w-full bg-gold text-primary hover:bg-gold-light"
                  size="lg"
                >
                  Calculate Take-Home
                </Button>
              </div>
            </Card>

            {/* Result */}
            <Card className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Salary Breakdown</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="bg-gradient-primary rounded-xl p-6 text-center mb-6">
                    <p className="text-primary-foreground/70 text-sm mb-2">Monthly Take-Home</p>
                    <p className="text-4xl font-bold text-gold">₹{result.takeHome.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Gross Salary</span>
                      <span className="font-semibold">₹{result.grossSalary.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="text-sm font-semibold text-destructive mb-2">Deductions:</div>
                    
                    <div className="flex justify-between items-center py-2 pl-4 text-sm">
                      <span className="text-muted-foreground">PF (12%)</span>
                      <span className="text-destructive">-₹{result.pf.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 pl-4 text-sm">
                      <span className="text-muted-foreground">Professional Tax</span>
                      <span className="text-destructive">-₹{result.professionalTax.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 pl-4 text-sm border-b">
                      <span className="text-muted-foreground">Income Tax (Est.)</span>
                      <span className="text-destructive">-₹{result.incomeTax.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 font-semibold">
                      <span>Total Deductions</span>
                      <span className="text-destructive">₹{result.totalDeductions.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                    <p>* This is an estimate. Actual deductions may vary based on your tax regime, investments, and company policies.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter salary details to see breakdown</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SalaryCalculator;
