import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Tools & Calculators", path: "/tools" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#001233]/95 backdrop-blur-md border-b border-yellow-500/20 shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {" "}
          {/* Increased height */}
          {/* 🟡 Logo Section */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="CSA Logo"
              className="h-16 w-auto object-contain pt-1" // 🔥 Balanced height & slight downward shift
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/90 hover:text-yellow-400 transition-colors font-semibold tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            <Button
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-400 text-[#001233] font-semibold rounded-full px-5 py-2"
            >
              <Phone className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-yellow-500/20">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-white/90 hover:text-yellow-400 transition-colors font-medium py-2"
              >
                {link.name}
              </Link>
            ))}
            <Button
              size="sm"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-[#001233] font-semibold rounded-full"
            >
              <Phone className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
