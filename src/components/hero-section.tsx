import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Code, Sparkles, Zap, Heart, Star, Palette, Brain, Rocket, Trophy, Target } from "lucide-react";

type Page = "home" | "coding" | "math" | "abacus" | "uxui" | "contact";

interface HeroSectionProps {
  onNavigate?: (page: Page) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps = {}) {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center relative overflow-hidden">
      {/* Simple background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-16 h-16 text-blue-200 opacity-30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" />
            <text x="32" y="38" textAnchor="middle" className="text-sm font-bold fill-current">{'</>'}</text>
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-32 left-16 w-12 h-12 text-orange-300 opacity-40"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-full h-full fill-current" />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div 
                className="flex items-center gap-2 text-blue-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-blue-500 p-2 rounded-full">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold font-inter-tight">Welcome to AboveCodes</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight font-clash font-bold">
                Unlock Your Child's{" "}
                <span className="text-blue-600 relative">
                  Potential
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-orange-200 rounded-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>{" "}
                with Fun Learning
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl">
                We make learning coding, math, and abacus skills fun and engaging for kids aged 5-14. 
                Build confidence, creativity, and critical thinking through play-based learning.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => {
                  const programsSection = document.getElementById('programs');
                  programsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Explore Programs
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate && onNavigate("contact")}
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us
              </Button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-orange-400 rounded-full border-2 border-white"></div>
                </div>
                <span>500+ happy learners</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★★★★★</span>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1657664050038-1e6f957de1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbGVhcm5pbmclMjBjb2RpbmclMjBsYXB0b3BzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU3ODYyOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Kids learning coding with laptops"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
            </div>
            
            {/* Simple Floating Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code className="w-6 h-6" />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-green-500 text-white p-4 rounded-full shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="font-bold">123</span>
            </motion.div>
            
            <motion.div 
              className="absolute top-8 -left-6 bg-blue-500 text-white p-3 rounded-full shadow-lg"
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Palette className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}