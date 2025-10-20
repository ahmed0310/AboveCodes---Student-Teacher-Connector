import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Blocks, Puzzle, Code2, Trophy, Brain, Settings, Palette } from "lucide-react";

type Page = "home" | "coding" | "math" | "abacus" | "uxui";

interface ProgramsSectionProps {
  onNavigate?: (page: Page) => void;
}

export function ProgramsSection({ onNavigate }: ProgramsSectionProps) {
  const [activeTab, setActiveTab] = useState("5-7");

  const ageGroups = [
    {
      id: "5-7",
      title: "Ages 5-7",
      subtitle: "Foundation Builders",
      description: "Fun abacus basics and visual coding games",
      icon: Blocks,
      color: "bg-green-500",
      lightColor: "bg-green-100",
      textColor: "text-green-600",
      tabColor: "bg-green-500",
      features: [
        "Interactive abacus learning",
        "Visual block coding",
        "Number recognition games",
        "Pattern matching activities",
        "Story-based learning"
      ],
      image: "https://images.unsplash.com/photo-1603354351226-d82bd4a635a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHByb2dyYW1taW5nJTIwcm9ib3RzJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1Nzg2Mjk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "8-10",
      title: "Ages 8-10",
      subtitle: "Creative Explorers",
      description: "Creative math puzzles & block coding",
      icon: Puzzle,
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
      textColor: "text-blue-600",
      tabColor: "bg-blue-500",
      features: [
        "Scratch-style programming",
        "Mathematical puzzles",
        "Logic building games",
        "Creative projects",
        "Team challenges"
      ],
      image: "https://images.unsplash.com/photo-1657664050038-1e6f957de1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbGVhcm5pbmclMjBjb2RpbmclMjBsYXB0b3BzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU3ODYyOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "11-14",
      title: "Ages 11-14",
      subtitle: "Future Coders",
      description: "Real Python coding & competitive math prep",
      icon: Settings,
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
      textColor: "text-purple-600",
      tabColor: "bg-purple-500",
      features: [
        "Python programming",
        "Advanced mathematics",
        "Competition preparation",
        "Real-world projects",
        "Portfolio building"
      ],
      image: "https://images.unsplash.com/photo-1603354351226-d82bd4a635a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHByb2dyYW1taW5nJTIwcm9ib3RzJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1Nzg2Mjk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "ux-ui",
      title: "UX/UI Design",
      subtitle: "Creative Designers",
      description: "Learn design thinking & create beautiful digital experiences",
      icon: Palette,
      color: "bg-orange-500",
      lightColor: "bg-orange-100",
      textColor: "text-orange-600",
      tabColor: "bg-orange-500",
      features: [
        "Design thinking principles",
        "User research basics",
        "Wireframing & prototyping",
        "Color theory & typography",
        "Digital design tools",
        "Portfolio projects"
      ],
      image: "https://images.unsplash.com/photo-1714859100446-ed641aeea95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwZGVzaWduJTIwY3JlYXRpdmUlMjBhcnQlMjBkaWdpdGFsfGVufDF8fHx8MTc1Nzg2NjY1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 font-clash font-semibold">
            Programs Tailored by{" "}
            <span className="text-blue-600">Age Group</span>
          </h2>
          <p className="text-lg text-gray-600">
            Our curriculum is carefully designed to match your child's developmental stage and learning capabilities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Custom Tab Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto">
            {ageGroups.map((group, index) => (
              <motion.button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`flex-1 p-6 rounded-3xl transition-all duration-300 text-left ${
                  activeTab === group.id
                    ? `${group.tabColor} text-white shadow-lg`
                    : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${
                    activeTab === group.id 
                      ? 'bg-white/20' 
                      : group.lightColor
                  }`}>
                    <group.icon className={`w-6 h-6 ${
                      activeTab === group.id 
                        ? 'text-white' 
                        : group.textColor
                    }`} />
                  </div>
                  <div>
                    <div className={`text-lg font-semibold font-inter-tight ${
                      activeTab === group.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {group.title}
                    </div>
                    <div className={`text-sm ${
                      activeTab === group.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {group.subtitle}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          {ageGroups.map((group) => (
            activeTab === group.id && (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden rounded-3xl shadow-xl border-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 ${group.lightColor} rounded-2xl`}>
                            <group.icon className={`w-8 h-8 ${group.textColor}`} />
                          </div>
                          <div>
                            <h3 className="text-2xl text-gray-900 font-semibold font-inter-tight">{group.title}</h3>
                            <p className={`${group.textColor} font-medium`}>{group.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="text-xl text-gray-700 leading-relaxed">
                          {group.description}
                        </p>
                        
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 font-inter-tight">What they'll learn:</h4>
                          <ul className="space-y-3">
                            {group.features.map((feature, featureIndex) => (
                              <motion.li 
                                key={featureIndex}
                                className="flex items-center gap-3 text-gray-600"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: featureIndex * 0.1 }}
                              >
                                <div className={`w-2 h-2 ${group.color} rounded-full`}></div>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex gap-4 pt-4">
                          <Button 
                            onClick={() => {
                              const programsSection = document.getElementById('programs');
                              programsSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`${group.color} hover:opacity-90 text-white rounded-full px-8 py-3 font-semibold`}
                          >
                            View All Programs
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <img
                        src={group.image}
                        alt={`${group.title} learning environment`}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-10`}></div>
                      
                      {/* Floating badges */}
                      <motion.div 
                        className="absolute top-6 right-6 bg-white rounded-full p-3 shadow-lg"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Trophy className="w-6 h-6 text-yellow-500" />
                      </motion.div>
                      
                      <motion.div 
                        className="absolute bottom-6 left-6 bg-white rounded-full p-3 shadow-lg"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        <Brain className="w-6 h-6 text-purple-500" />
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          ))}
        </motion.div>
      </div>
    </section>
  );
}