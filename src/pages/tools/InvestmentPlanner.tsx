import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const InvestmentPlanner = () => {
  const [goal, setGoal] = useState("");
  const [tenure, setTenure] = useState("");
  const [rate, setRate] = useState("12");
  const [result, setResult] = useState<{
    monthlySIP: number;
    totalInvestment: number;
    expectedReturns: number;
  } | null>(null);

  const calculateSIP = () => {
    const goalAmount = parseFloat(goal);
    const years = parseFloat(tenure);
    const annualRate = parseFloat(rate) / 100;

    if (isNaN(goalAmount) || isNaN(years) || isNaN(annualRate)) return;

    const months = years * 12;
    const monthlyRate = annualRate / 12;

    // SIP formula: FV = P × [((1 + r)^n - 1) / r] × (1 + r)
    // Rearranged to find P: P = FV / [((1 + r)^n - 1) / r × (1 + r)]
    const monthlySIP = goalAmount / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    const totalInvestment = monthlySIP * months;
    const expectedReturns = goalAmount - totalInvestment;

    setResult({
      monthlySIP: Math.round(monthlySIP),
      totalInvestment: Math.round(totalInvestment),
      expectedReturns: Math.round(expectedReturns)
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

          <h1 className="text-4xl font-bold mb-4">Investment Goal Planner</h1>
          <p className="text-muted-foreground mb-8">
            Calculate monthly SIP needed to achieve your financial goals
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator */}
            <Card className="glass-card p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Target Goal Amount (₹)</label>
                  <Input
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., 5000000"
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your financial goal (e.g., retirement, education)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Time Period (years)</label>
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="e.g., 20"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Expected Annual Return (%)</label>
                  <Input
                    type="number"
                    step="0.5"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="e.g., 12"
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Typical equity returns: 10-15% per annum
                  </p>
                </div>

                <Button
                  onClick={calculateSIP}
                  className="w-full bg-gold text-primary hover:bg-gold-light"
                  size="lg"
                >
                  Calculate Required SIP
                </Button>
              </div>
            </Card>

            {/* Result */}
            <Card className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Investment Plan</h3>
              {result ? (
                <div className="space-y-6">
                  <div className="bg-gradient-primary rounded-xl p-6 text-center">
                    <p className="text-primary-foreground/70 text-sm mb-2">Required Monthly SIP</p>
                    <p className="text-4xl font-bold text-gold">₹{result.monthlySIP.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Target Amount</span>
                      <span className="font-semibold">₹{parseFloat(goal).toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Total Investment</span>
                      <span className="font-semibold text-primary">₹{result.totalInvestment.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 bg-muted/30 rounded-lg px-4">
                      <span className="font-semibold">Expected Returns</span>
                      <span className="text-2xl font-bold text-green-600">₹{result.expectedReturns.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-3 text-sm">Investment Breakdown:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Your Investment</span>
                        <span className="font-medium">{((result.totalInvestment / parseFloat(goal)) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Returns</span>
                        <span className="font-medium text-green-600">{((result.expectedReturns / parseFloat(goal)) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-xs">
                    <p className="text-blue-800 dark:text-blue-300">
                      💡 Pro Tip: Start early and increase SIP by 10% annually to reach goals faster!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter your goal details to calculate required SIP</p>
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

export default InvestmentPlanner;
