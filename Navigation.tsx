import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/analytics", label: "Analytics" },
    { href: "/rise", label: "RISE" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200" data-testid="main-navigation">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold text-deep-green" data-testid="logo-link">
            Oria Dawn
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "nav-link font-medium text-gray-700 hover:text-deep-green",
                  isActive(href) && "active"
                )}
                data-testid={`nav-link-${label.toLowerCase()}`}
              >
                {label}
              </Link>
            ))}
          </div>
          
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2" data-testid="mobile-menu">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block py-2 font-medium text-gray-700 hover:text-deep-green"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-nav-link-${label.toLowerCase()}`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
