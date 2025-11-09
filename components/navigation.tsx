import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Menu, X, Code } from "lucide-react";
import React from "react";

type Page = "home" | "coding" | "math" | "abacus" | "uxui" | "contact";

interface NavigationProps {
  onNavigate?: (page: Page) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#", page: "home" as Page },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Why Choose Us", href: "#why-choose" },
    { name: "Contact", href: "#", page: "contact" as Page }
  ];

  return (
    <>
      <style>{`
        .desktop-nav {
          display: none !important;
        }
        .desktop-cta {
          display: none !important;
        }
        .mobile-menu-btn {
          display: block !important;
        }
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 w-full max-w-7xl">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-gray-900 font-clash font-semibold">AboveCodes</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="desktop-nav flex flex-1 items-center justify-center gap-4 lg:gap-6 xl:gap-8 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.page ? "#" : link.href}
                  onClick={(e) => {
                    if (link.page && onNavigate) {
                      e.preventDefault();
                      onNavigate(link.page);
                    }
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group cursor-pointer whitespace-nowrap font-medium text-sm lg:text-base py-2"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="desktop-cta items-center flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button 
                  onClick={() => onNavigate && onNavigate("contact")}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn flex-shrink-0"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            className="py-4 border-t border-gray-200"
            style={{ display: 'block' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <style>{`
              @media (min-width: 768px) {
                .mobile-nav-dropdown {
                  display: none !important;
                }
              }
            `}</style>
            <div className="flex flex-col space-y-4 mobile-nav-dropdown">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.page ? "#" : link.href}
                  onClick={(e) => {
                    if (link.page && onNavigate) {
                      e.preventDefault();
                      onNavigate(link.page);
                    }
                    setIsOpen(false);
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate && onNavigate("contact");
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}