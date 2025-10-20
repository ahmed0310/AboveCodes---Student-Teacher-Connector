import { Button } from "./ui/button";
import { motion } from "motion/react";
import { ArrowRight, Users, Calendar, GraduationCap, Trophy, Sparkles, Heart, Star } from "lucide-react";

type Page = "home" | "coding" | "math" | "abacus" | "uxui" | "contact";

interface CTASectionProps {
  onNavigate?: (page: Page) => void;
}

export function CTASection({ onNavigate }: CTASectionProps = {}) {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Hand-drawn style background decorations */}
      <div className="absolute inset-0">
        {/* Playful doodle elements */}
        <motion.div 
          className="absolute top-12 left-12 w-16 h-16"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full border-4 border-blue-400 rounded-full border-dashed opacity-60"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-16 right-16 w-20 h-20"
          animate={{ y: [0, -10, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-full h-full text-orange-400 fill-orange-200" />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 right-1/4 w-12 h-12"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-full h-full text-pink-400 fill-pink-200" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-14 h-14"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-full h-full text-purple-400 fill-purple-200" />
        </motion.div>
        
        {/* Hand-drawn squiggly lines */}
        <svg className="absolute top-20 left-1/3 w-32 h-16 opacity-30" viewBox="0 0 100 50">
          <path d="M10,25 Q30,5 50,25 T90,25" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="5,5" />
        </svg>
        
        <svg className="absolute bottom-20 right-1/3 w-40 h-20 opacity-30" viewBox="0 0 120 60">
          <path d="M10,30 Q40,10 70,30 T110,30" stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="8,4" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-4 rounded-full shadow-lg border-4 border-white transform rotate-12">
              <Users className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <h2 className="md:text-5xl mb-6 text-gray-800 leading-tight font-clash font-bold text-[48px]">
            Join{" "}
            <motion.span 
              className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              500+ Young Learners
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-3 bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 opacity-60 rounded-full transform -rotate-1"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
              />
            </motion.span>{" "}
            Already Coding and Calculating with{" "}
            <span className="text-blue-600 relative">
              AboveCodes!
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-2 bg-orange-300 opacity-40 rounded-full transform rotate-1"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 0.6 }}
              />
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Give your child the gift of future-ready skills. Start their learning journey today 
            with our expert instructors and proven curriculum that makes learning 
            <span className="text-orange-500 font-semibold"> fun and exciting!</span>
          </p>
          
          {/* Feature highlights - hand-drawn style */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Calendar, text: "Flexible Schedule", color: "from-blue-400 to-blue-600", rotation: "-rotate-3" },
              { icon: GraduationCap, text: "Expert Instructors", color: "from-green-400 to-green-600", rotation: "rotate-2" },
              { icon: Trophy, text: "Proven Results", color: "from-orange-400 to-orange-600", rotation: "-rotate-1" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`flex flex-col items-center gap-3 p-4 bg-white rounded-2xl shadow-lg border-3 border-gray-200 ${item.rotation} hover:rotate-0 transition-all duration-300`}
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: parseInt(item.rotation.match(/-?\d+/)?.[0] || "0") }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className={`bg-gradient-to-br ${item.color} p-3 rounded-full shadow-md`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-inter-tight font-semibold text-gray-700 text-center">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="transform rotate-1"
            >
              <Button 
                size="lg"
                onClick={() => onNavigate && onNavigate("contact")}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-5 rounded-full shadow-2xl text-lg font-inter-tight font-bold group border-4 border-white relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }} 
              whileTap={{ scale: 0.95 }}
              className="transform -rotate-1"
            >
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const programsSection = document.getElementById('programs');
                  programsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-4 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-12 py-5 rounded-full shadow-2xl text-lg font-inter-tight font-bold bg-white/90 backdrop-blur-sm relative overflow-hidden group"
              >
                <span className="relative z-10">View Programs</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Trust indicators - playful style */}
          <motion.div 
            className="mt-16 pt-8 border-t-4 border-dashed border-gray-300 flex flex-wrap justify-center items-center gap-8 text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-lg border-2 border-green-200"
              whileHover={{ rotate: -2, scale: 1.05 }}
            >
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="w-7 h-7 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full border-2 border-white shadow-sm"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-700">500+ happy families</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-lg border-2 border-yellow-200"
              whileHover={{ rotate: 2, scale: 1.05 }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.span 
                    key={i} 
                    className="text-yellow-400 text-xl drop-shadow-sm"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              <span className="font-semibold text-gray-700">4.9/5 average rating</span>
            </motion.div>
            
            <motion.div 
              className="bg-white p-3 rounded-2xl shadow-lg border-2 border-blue-200 font-semibold text-gray-700"
              whileHover={{ rotate: -1, scale: 1.05 }}
            >
              💳 Flexible payment options available
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}