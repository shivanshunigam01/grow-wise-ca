import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EMICalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100; // Monthly interest rate
    const n = parseFloat(tenure);

    if (isNaN(P) || isNaN(r) || isNaN(n)) return;

    // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setResult({
      emi: Math.round(emi * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100
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

          <h1 className="text-4xl font-bold mb-4">EMI Calculator</h1>
          <p className="text-muted-foreground mb-8">
            Calculate your loan EMI, total interest, and repayment amount
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator */}
            <Card className="glass-card p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Loan Amount (₹)</label>
                  <Input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="e.g., 1000000"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interest Rate (% per annum)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="e.g., 8.5"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Loan Tenure (months)</label>
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="e.g., 60"
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    For years: multiply by 12 (e.g., 5 years = 60 months)
                  </p>
                </div>

                <Button
                  onClick={calculateEMI}
                  className="w-full bg-gold text-primary hover:bg-gold-light"
                  size="lg"
                >
                  Calculate EMI
                </Button>
              </div>
            </Card>

            {/* Result */}
            <Card className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">EMI Breakdown</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="bg-gradient-primary rounded-xl p-6 text-center mb-6">
                    <p className="text-primary-foreground/70 text-sm mb-2">Monthly EMI</p>
                    <p className="text-4xl font-bold text-gold">₹{result.emi.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="text-lg font-semibold">₹{parseFloat(principal).toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="text-lg font-semibold text-orange-500">₹{result.totalInterest.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 bg-muted/30 rounded-lg px-4">
                    <span className="font-semibold">Total Amount Payable</span>
                    <span className="text-2xl font-bold text-primary">₹{result.totalAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Principal</span>
                      <span className="font-semibold">{((parseFloat(principal) / result.totalAmount) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Interest</span>
                      <span className="font-semibold">{((result.totalInterest / result.totalAmount) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter loan details and click calculate to see EMI breakdown</p>
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

export default EMICalculator;
