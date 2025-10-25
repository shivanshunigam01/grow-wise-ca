import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft, Check, Download } from "lucide-react";
import { Link } from "react-router-dom";

const DocumentChecklist = () => {
  const [selectedPurpose, setSelectedPurpose] = useState("");

  const purposes = {
    "ITR Filing": [
      "PAN Card",
      "Aadhaar Card",
      "Form 16 (for salaried)",
      "Form 26AS",
      "Bank Account Statements",
      "Interest Certificates",
      "Capital Gains Statements",
      "Investment Proofs (80C, 80D)",
      "Home Loan Interest Certificate",
      "Rent Receipts (HRA claim)",
      "Previous Year ITR (if applicable)"
    ],
    "GST Registration": [
      "PAN Card of Business",
      "Aadhaar Card of Proprietor/Directors",
      "Proof of Business Registration",
      "Business Address Proof",
      "Bank Account Statement/Cancelled Cheque",
      "Digital Signature Certificate",
      "Photographs",
      "Board Resolution (for companies)",
      "Authorization Letter"
    ],
    "Home Loan": [
      "Identity Proof (PAN, Aadhaar)",
      "Address Proof",
      "Salary Slips (last 3 months)",
      "Form 16/ITR (last 2 years)",
      "Bank Statements (last 6 months)",
      "Employment Letter",
      "Property Documents",
      "Sale Agreement",
      "Property Tax Receipts",
      "Approved Building Plan",
      "NOC from Society/Builder"
    ],
    "Company Incorporation": [
      "DIN for Directors",
      "Digital Signature Certificate",
      "PAN & Aadhaar of Directors",
      "Address Proof of Directors",
      "Address Proof of Office",
      "Rent Agreement/NOC",
      "Memorandum of Association",
      "Articles of Association",
      "Declaration of Directors",
      "Specimen Signatures"
    ]
  };

  const downloadChecklist = () => {
    if (!selectedPurpose) return;
    
    const docs = purposes[selectedPurpose as keyof typeof purposes];
    const content = `Document Checklist for ${selectedPurpose}\n\n${docs.map((doc, i) => `${i + 1}. ${doc}`).join('\n')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPurpose.replace(/\s+/g, '_')}_Checklist.txt`;
    a.click();
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

          <h1 className="text-4xl font-bold mb-4">Document Checklist Generator</h1>
          <p className="text-muted-foreground mb-8">
            Get a customized list of documents needed for various purposes
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Purpose Selection */}
            <Card className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Select Purpose</h3>
              <div className="space-y-3">
                {Object.keys(purposes).map((purpose) => (
                  <button
                    key={purpose}
                    onClick={() => setSelectedPurpose(purpose)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedPurpose === purpose
                        ? 'bg-gradient-primary text-primary-foreground shadow-medium'
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{purpose}</span>
                      {selectedPurpose === purpose && (
                        <Check className="w-5 h-5 text-gold" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Checklist Display */}
            <Card className="glass-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Required Documents</h3>
                {selectedPurpose && (
                  <Button
                    onClick={downloadChecklist}
                    size="sm"
                    className="bg-gold text-primary hover:bg-gold-light"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>

              {selectedPurpose ? (
                <div className="space-y-3">
                  {purposes[selectedPurpose as keyof typeof purposes].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      💡 Keep digital copies of all documents for quick access. Original documents may be required for verification.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Select a purpose from the left to view the document checklist</p>
                </div>
              )}
            </Card>
          </div>

          {/* Additional Info */}
          {selectedPurpose && (
            <Card className="glass-card p-6 mt-8 bg-gradient-primary">
              <div className="text-center text-primary-foreground">
                <h3 className="font-bold mb-2">Need Help with {selectedPurpose}?</h3>
                <p className="text-primary-foreground/90 mb-4 text-sm">
                  Our expert CAs can guide you through the entire process
                </p>
                <Link to="/contact">
                  <Button className="bg-gold text-primary hover:bg-gold-light">
                    Contact Our Experts
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DocumentChecklist;
