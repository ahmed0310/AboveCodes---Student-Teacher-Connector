import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Code, Calculator, Grid3x3, Palette, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type Page = "home" | "coding" | "math" | "abacus" | "uxui";

interface AboutSectionProps {
  onNavigate?: (page: Page) => void;
}

export function AboutSection({ onNavigate }: AboutSectionProps) {
  const pillars = [
    {
      icon: Code,
      title: "Coding",
      description: "Games & Logic",
      details: "Learn programming through interactive games, puzzles, and creative projects that make coding fun and accessible.",
      color: "blue",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      page: "coding" as Page
    },
    {
      icon: Calculator,
      title: "Math",
      description: "Mental Puzzles",
      details: "Develop mathematical thinking through engaging puzzles, brain teasers, and problem-solving challenges.",
      color: "green",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      page: "math" as Page
    },
    {
      icon: Grid3x3,
      title: "Abacus",
      description: "Speed & Focus",
      details: "Build concentration and rapid calculation skills through traditional abacus methods enhanced with modern teaching.",
      color: "orange",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      page: "abacus" as Page
    },
    {
      icon: Palette,
      title: "UX/UI Design",
      description: "Creative Design",
      details: "Design beautiful digital experiences while learning user-centered thinking and professional design tools.",
      color: "pink",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      page: "uxui" as Page
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 font-clash font-semibold">
            We Make Learning Fun and{" "}
            <span className="text-blue-600">Future-Ready</span> for Kids 5–14
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our comprehensive approach combines three essential learning pillars to give your child 
            the skills they need to thrive in the digital age while having fun every step of the way.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="p-8 h-full border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 rounded-3xl">
                <div className="text-center space-y-6">
                  <motion.div 
                    className={`w-20 h-20 ${pillar.bgColor} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <pillar.icon className={`w-10 h-10 ${pillar.iconColor}`} />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl text-gray-900 font-inter-tight font-semibold">{pillar.title}</h3>
                    <p className={`text-sm font-medium ${pillar.iconColor} uppercase tracking-wide`}>
                      {pillar.description}
                    </p>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {pillar.details}
                  </p>
                  
                  {onNavigate && (
                    <Button
                      onClick={() => onNavigate(pillar.page)}
                      className={`w-full ${
                        pillar.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 
                        pillar.color === 'green' ? 'bg-green-600 hover:bg-green-700' : 
                        pillar.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                        'bg-pink-600 hover:bg-pink-700'
                      } text-white rounded-full mt-4`}
                    >
                      Explore Program
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                  
                  <motion.div 
                    className="flex justify-center space-x-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 ${pillar.bgColor} rounded-full`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          delay: i * 0.2 
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}