import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const GSTCalculator = () => {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [result, setResult] = useState<{
    baseAmount: number;
    gstAmount: number;
    totalAmount: number;
  } | null>(null);

  const calculateGST = (isInclusive: boolean) => {
    const amountValue = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (isNaN(amountValue) || isNaN(rate)) return;

    if (isInclusive) {
      const baseAmount = amountValue / (1 + rate / 100);
      const gstAmount = amountValue - baseAmount;
      setResult({
        baseAmount: Math.round(baseAmount * 100) / 100,
        gstAmount: Math.round(gstAmount * 100) / 100,
        totalAmount: amountValue
      });
    } else {
      const gstAmount = (amountValue * rate) / 100;
      const totalAmount = amountValue + gstAmount;
      setResult({
        baseAmount: amountValue,
        gstAmount: Math.round(gstAmount * 100) / 100,
        totalAmount: Math.round(totalAmount * 100) / 100
      });
    }
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

          <h1 className="text-4xl font-bold mb-4">GST Calculator</h1>
          <p className="text-muted-foreground mb-8">
            Calculate GST inclusive and exclusive amounts easily
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator */}
            <Card className="glass-card p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">GST Rate (%)</label>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {['5', '12', '18', '28'].map((rate) => (
                      <Button
                        key={rate}
                        variant={gstRate === rate ? "default" : "outline"}
                        onClick={() => setGstRate(rate)}
                        className={gstRate === rate ? "bg-gold text-primary hover:bg-gold-light" : ""}
                      >
                        {rate}%
                      </Button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    value={gstRate}
                    onChange={(e) => setGstRate(e.target.value)}
                    placeholder="Custom rate"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => calculateGST(false)}
                    className="bg-primary text-primary-foreground hover:bg-primary-light"
                  >
                    Add GST
                  </Button>
                  <Button
                    onClick={() => calculateGST(true)}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    Remove GST
                  </Button>
                </div>
              </div>
            </Card>

            {/* Result */}
            <Card className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Calculation Result</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-muted-foreground">Base Amount</span>
                    <span className="text-lg font-semibold">₹{result.baseAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-muted-foreground">GST Amount ({gstRate}%)</span>
                    <span className="text-lg font-semibold text-gold">₹{result.gstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-muted/30 rounded-lg px-4">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{result.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter amount and click calculate to see results</p>
                </div>
              )}
            </Card>
          </div>

          {/* Info */}
          <Card className="glass-card p-8 mt-8">
            <h3 className="text-xl font-bold mb-4">About GST Rates in India</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-gold">Common GST Rates:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 5% - Essential goods, transport services</li>
                  <li>• 12% - Processed food, computers</li>
                  <li>• 18% - Most goods and services (standard rate)</li>
                  <li>• 28% - Luxury items, automobiles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gold">GST Composition:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• CGST - Central GST (50% of total)</li>
                  <li>• SGST - State GST (50% of total)</li>
                  <li>• IGST - Integrated GST (interstate)</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GSTCalculator;
