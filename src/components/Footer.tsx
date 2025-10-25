import { Link } from "react-router-dom";
import { Calculator, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold">CA Associates</div>
                <div className="text-xs text-gold">Chartered Accountants</div>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Your trusted partner for comprehensive financial services and compliance solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Tools & Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-gold">Our Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Tax Planning & Filing</li>
              <li>GST Compliance</li>
              <li>Audit & Assurance</li>
              <li>Business Advisory</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-gold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Business District, Mumbai, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@caassociates.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-light/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} CA Associates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
