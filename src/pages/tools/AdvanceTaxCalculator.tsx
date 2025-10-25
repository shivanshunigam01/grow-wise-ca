import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdvanceTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [result, setResult] = useState<{
    taxableIncome: number;
    totalTax: number;
    installments: { date: string; percentage: number; amount: number }[];
  } | null>(null);

  const calculateTax = () => {
    const totalIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    const taxableIncome = Math.max(0, totalIncome - totalDeductions - 250000); // New regime basic exemption

    let tax = 0;
    
    // New Tax Regime Slabs (FY 2024-25)
    if (taxableIncome > 1500000) {
      tax += (taxableIncome - 1500000) * 0.30;
      tax += 250000 * 0.20;
      tax += 500000 * 0.15;
      tax += 300000 * 0.10;
      tax += 300000 * 0.05;
    } else if (taxableIncome > 1250000) {
      tax += (taxableIncome - 1250000) * 0.20;
      tax += 500000 * 0.15;
      tax += 300000 * 0.10;
      tax += 300000 * 0.05;
    } else if (taxableIncome > 750000) {
      tax += (taxableIncome - 750000) * 0.15;
      tax += 300000 * 0.10;
      tax += 300000 * 0.05;
    } else if (taxableIncome > 450000) {
      tax += (taxableIncome - 450000) * 0.10;
      tax += 300000 * 0.05;
    } else if (taxableIncome > 150000) {
      tax += (taxableIncome - 150000) * 0.05;
    }

    // Add 4% cess
    const totalTax = tax * 1.04;

    const installments = [
      { date: "15th June", percentage: 15, amount: totalTax * 0.15 },
      { date: "15th September", percentage: 45, amount: totalTax * 0.45 },
      { date: "15th December", percentage: 75, amount: totalTax * 0.75 },
      { date: "15th March", percentage: 100, amount: totalTax }
    ];

    setResult({
      taxableIncome: Math.round(taxableIncome),
      totalTax: Math.round(totalTax),
      installments
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

          <h1 className="text-4xl font-bold mb-4">Advance Tax Calculator</h1>
          <p className="text-muted-foreground mb-8">
            Calculate your advance tax liability and payment schedule
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator */}
            <Card className="glass-card p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Estimated Annual Income (₹)</label>
                  <Input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="e.g., 1500000"
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Include all sources: salary, business, investments, etc.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Deductions Under Chapter VI-A (₹)</label>
                  <Input
                    type="number"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                    placeholder="e.g., 150000"
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    80C, 80D, NPS, home loan interest, etc.
                  </p>
                </div>

                <Button
                  onClick={calculateTax}
                  className="w-full bg-gold text-primary hover:bg-gold-light"
                  size="lg"
                >
                  Calculate Advance Tax
                </Button>

                <div className="p-4 bg-muted/30 rounded-lg text-xs text-muted-foreground">
                  <p className="font-semibold mb-2">Note:</p>
                  <ul className="space-y-1">
                    <li>• Calculation based on New Tax Regime (FY 2024-25)</li>
                    <li>• Includes 4% Health & Education Cess</li>
                    <li>• This is an estimate only</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Result */}
            <Card className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Tax Calculation</h3>
              {result ? (
                <div className="space-y-6">
                  <div className="space-y-3 pb-6 border-b">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Income</span>
                      <span className="font-semibold">₹{parseFloat(income).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Deductions</span>
                      <span className="font-semibold text-green-600">-₹{parseFloat(deductions || "0").toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Taxable Income</span>
                      <span className="font-bold">₹{result.taxableIncome.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-primary rounded-xl p-6 text-center">
                    <p className="text-primary-foreground/70 text-sm mb-2">Total Tax Liability</p>
                    <p className="text-4xl font-bold text-gold">₹{result.totalTax.toLocaleString('en-IN')}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Advance Tax Installments:</h4>
                    <div className="space-y-3">
                      {result.installments.map((inst, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{inst.date}</p>
                            <p className="text-xs text-muted-foreground">{inst.percentage}% cumulative</p>
                          </div>
                          <p className="font-bold text-primary">₹{Math.round(inst.amount).toLocaleString('en-IN')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter your income details to calculate advance tax</p>
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

export default AdvanceTaxCalculator;
