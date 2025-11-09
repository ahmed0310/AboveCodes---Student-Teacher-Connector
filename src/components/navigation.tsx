import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navLinks = [
    { name: "Home", href: "#", page: "home" as Page },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Why Choose Us", href: "#why-choose" },
    { name: "Contact", href: "#", page: "contact" as Page }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 w-full">
      <style dangerouslySetInnerHTML={{__html: `
        /* CRITICAL: Override Tailwind's hidden class - highest specificity */
        nav .nav-desktop-links-container,
        nav .nav-desktop-links-container.hidden {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        nav .nav-desktop-cta-container,
        nav .nav-desktop-cta-container.hidden {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        @media screen and (min-width: 768px) {
          nav .nav-desktop-links-container,
          nav .nav-desktop-links-container.hidden {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
          nav .nav-desktop-cta-container,
          nav .nav-desktop-cta-container.hidden {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          nav .nav-mobile-button-container,
          nav .nav-mobile-button-container.hidden {
            display: none !important;
            visibility: hidden !important;
          }
        }
        @media screen and (max-width: 767px) {
          nav .nav-desktop-links-container,
          nav .nav-desktop-links-container.hidden {
            display: none !important;
            visibility: hidden !important;
          }
          nav .nav-desktop-cta-container,
          nav .nav-desktop-cta-container.hidden {
            display: none !important;
            visibility: hidden !important;
          }
          nav .nav-mobile-button-container {
            display: block !important;
            visibility: visible !important;
          }
        }
      `}} />
      <div className="container mx-auto px-4 w-full max-w-7xl">
        <div className="flex items-center justify-between h-16 w-full" style={{ position: 'relative' }}>
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ zIndex: 10 }}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900 font-clash font-semibold">AboveCodes</span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div 
            className="nav-desktop-links-container"
            style={{
              flex: '1',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              zIndex: 5
            }}
          >
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
                style={{
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#374151';
                }}
              >
                {link.name}
                <span 
                  style={{
                    position: 'absolute',
                    bottom: '-0.25rem',
                    left: 0,
                    width: 0,
                    height: '2px',
                    backgroundColor: '#2563eb',
                    transition: 'width 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.width = '100%';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.width = '0';
                  }}
                />
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div 
            className="nav-desktop-cta-container"
            style={{
              alignItems: 'center',
              flexShrink: 0,
              zIndex: 10
            }}
          >
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
            className="nav-mobile-button-container"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{
              display: isMobile ? 'block' : 'none',
              flexShrink: 0,
              zIndex: 10,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              visibility: isMobile ? 'visible' : 'hidden',
              opacity: isMobile ? 1 : 0
            }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && isMobile && (
          <motion.div 
            className="py-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
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
      </div>
    </nav>
  );
}
