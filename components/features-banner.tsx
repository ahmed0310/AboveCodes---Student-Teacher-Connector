import React from "react";
import { motion } from "motion/react";
import { Calendar, GraduationCap, Trophy } from "lucide-react";

export function FeaturesBanner() {
  const features = [
    { 
      icon: Calendar, 
      text: "Flexible Schedule",
      color: "text-orange-400"
    },
    { 
      icon: GraduationCap, 
      text: "Expert Instructors",
      color: "text-orange-400"
    },
    { 
      icon: Trophy, 
      text: "Proven Results",
      color: "text-orange-400"
    }
  ];

  return (
    <section className="bg-blue-600 py-4">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.text}
              className="flex items-center gap-3 text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-orange-500/20 p-2 rounded-lg">
                <feature.icon className={`w-6 h-6 ${feature.color} fill-current`} />
              </div>
              <span className="font-inter-tight font-medium text-lg">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}