import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  Code2, 
  Blocks, 
  Cpu, 
  Trophy, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle2,
  Star,
  ArrowRight,
  Laptop,
  Brain,
  Target,
  Zap
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PricingTiers } from "./pricing-tiers";
import codingKidsImage from "figma:asset/300a53e98355fbe0357cb9d38cc40126c1b26d4f.png";
import React from "react";

interface CodingProgramPageProps {
  onNavigate?: (page: "contact") => void;
}

export function CodingProgramPage({ onNavigate }: CodingProgramPageProps) {
  const levels = [
    {
      title: "Level 1: Visual Programming (Ages 5-7)",
      duration: "3 months",
      color: "bg-green-500",
      lightColor: "bg-green-100",
      textColor: "text-green-600",
      topics: [
        "Introduction to Scratch Jr",
        "Block-based coding fundamentals",
        "Creating animations and stories",
        "Basic game development",
        "Problem-solving with code",
        "Creative project showcase"
      ]
    },
    {
      title: "Level 2: Block Programming (Ages 8-10)",
      duration: "3 months",
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
      textColor: "text-blue-600",
      topics: [
        "Advanced Scratch programming",
        "Game development fundamentals",
        "Introduction to algorithms",
        "Variables and loops",
        "Interactive storytelling",
        "Team project collaboration"
      ]
    },
    {
      title: "Level 3: Text-Based Coding (Ages 11-14)",
      duration: "3 months",
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
      textColor: "text-purple-600",
      topics: [
        "Python programming basics",
        "Data structures and algorithms",
        "Web development with HTML/CSS",
        "JavaScript fundamentals",
        "Real-world application building",
        "Portfolio project development"
      ]
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Computational Thinking",
      description: "Develop logical reasoning and problem-solving skills that apply beyond coding",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Target,
      title: "Future-Ready Skills",
      description: "Build a foundation in technology that prepares kids for tomorrow's careers",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Zap,
      title: "Creative Expression",
      description: "Turn ideas into reality by building games, apps, and interactive projects",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Trophy,
      title: "Confidence Building",
      description: "Watch your child's confidence soar as they complete projects and solve challenges",
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Learn",
      description: "Interactive lessons with hands-on coding exercises",
      icon: BookOpen
    },
    {
      step: "02",
      title: "Practice",
      description: "Guided challenges to reinforce concepts",
      icon: Laptop
    },
    {
      step: "03",
      title: "Create",
      description: "Build real projects to showcase skills",
      icon: Code2
    },
    {
      step: "04",
      title: "Share",
      description: "Present projects and receive feedback",
      icon: Users
    }
  ];

  const tools = [
    { name: "Scratch", description: "Visual programming for beginners" },
    { name: "Python", description: "Industry-standard programming language" },
    { name: "Replit", description: "Online coding environment" },
    { name: "GitHub", description: "Version control & portfolio" }
  ];

  const outcomes = [
    "Build 15+ complete coding projects",
    "Develop problem-solving mindset",
    "Create a personal coding portfolio",
    "Understand programming fundamentals",
    "Gain confidence in technology",
    "Prepare for advanced CS courses"
  ];

  const faqs = [
    {
      question: "Does my child need prior coding experience?",
      answer: "Not at all! Our coding program is designed for complete beginners. We start with visual programming concepts that even 5-year-olds can grasp, then progressively build up to text-based coding."
    },
    {
      question: "What equipment does my child need?",
      answer: "A computer or laptop with internet connection is all that's needed. Our platform works on Windows, Mac, and even Chromebooks. We'll provide all software and learning materials."
    },
    {
      question: "How are classes structured?",
      answer: "Classes are 60 minutes long with a mix of instructor-led lessons, hands-on coding exercises, and creative project time. Small class sizes (max 6 students) ensure personalized attention."
    },
    {
      question: "What if my child gets stuck or needs help?",
      answer: "Our instructors are available during class for immediate help. Students also have access to our online community and help desk for questions between sessions."
    },
    {
      question: "Can my child skip levels if they already know some coding?",
      answer: "Yes! We offer a free assessment to evaluate your child's current skills and place them in the appropriate level. We want every student to be challenged but not overwhelmed."
    },
    {
      question: "What happens after completing all levels?",
      answer: "Graduates can advance to our specialized tracks in App Development, Game Design, or AI & Machine Learning. We also offer competitive programming preparation for olympiads."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-1">
                Most Popular Program
              </Badge>
              <h1 className="text-4xl md:text-6xl mb-6 font-clash">
                Coding for Kids
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Transform your child into a confident creator with our comprehensive coding curriculum. 
                From visual programming to real-world applications, we make coding fun and accessible for all ages.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span>Flexible Schedule</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-5 h-5" />
                  <span>Small Classes (Max 6)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Trophy className="w-5 h-5" />
                  <span>Certificate on Completion</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => {
                    const pricingSection = document.querySelector('.pricing-section');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8"
                >
                  View Pricing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 border-2 border-white text-[rgb(0,0,0)] hover:bg-white/10"
                  onClick={() => onNavigate?.("contact")}
                >
                  Enroll Now
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={codingKidsImage}
                  alt="Kids learning coding and robotics together"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent bg-[rgba(0,0,0,0)]"></div>
              </div>
              
              {/* Floating Stats */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Code2 className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl text-gray-900 font-clash">5,000+</div>
                    <div className="text-sm text-gray-600">Projects Built</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 font-clash">
              Why Learn <span className="text-blue-600">Coding?</span>
            </h2>
            <p className="text-lg text-gray-600">
              Coding is more than just writing programs—it's a way of thinking that empowers kids to solve problems creatively.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-0 rounded-2xl">
                  <div className={`${benefit.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
                    <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-900 font-inter-tight">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Levels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 font-clash">
              Complete Coding <span className="text-blue-600">Curriculum</span>
            </h2>
            <p className="text-lg text-gray-600">
              Our structured program takes students from visual programming to professional coding languages.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {levels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`${level.color} p-1`}>
                    <div className="bg-white p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl mb-2 text-gray-900 font-inter-tight">{level.title}</h3>
                          <div className="flex items-center gap-4 text-gray-600">
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {level.duration}
                            </span>
                            <Badge className={`${level.lightColor} ${level.textColor} border-0`}>
                              {level.topics.length} Topics
                            </Badge>
                          </div>
                        </div>
                        <Button className={`${level.color} text-white rounded-full mt-4 md:mt-0`}>
                          Enroll Now
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        {level.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-5 h-5 ${level.textColor} flex-shrink-0 mt-0.5`} />
                            <span className="text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Methodology */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 font-clash">
              Our <span className="text-blue-600">Learning Method</span>
            </h2>
            <p className="text-lg text-gray-600">
              A proven 4-step process that keeps students engaged and ensures lasting understanding.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {methodology.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center border-0 rounded-2xl bg-white shadow-lg h-full">
                  <div className="text-6xl font-clash text-blue-100 mb-4">{item.step}</div>
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-900 font-inter-tight">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
                
                {index < methodology.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-blue-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Platforms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 font-clash">
              Industry-Standard <span className="text-blue-600">Tools</span>
            </h2>
            <p className="text-lg text-gray-600">
              Learn with the same platforms and languages used by professional developers worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center border-2 border-gray-100 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Cpu className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-900 font-inter-tight">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 font-clash">
                  What Your Child Will <span className="text-blue-600">Achieve</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  By the end of our coding program, students will have developed both technical skills and creative confidence.
                </p>
                
                <div className="space-y-4">
                  {outcomes.map((outcome, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                        <Star className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-lg text-gray-700">{outcome}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1600108471333-d66086db92a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpcnR1YWwlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzYwMjUzODIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Student learning online"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <div className="pricing-section">
        <PricingTiers programName="Coding" programColor="blue" />
      </div>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 font-clash">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our coding program.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem value={`item-${index}`} className="border-0 bg-white rounded-2xl shadow-md px-6">
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="text-lg text-gray-900 font-inter-tight pr-4">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl mb-6 font-clash">
              Ready to Start Your Child's Coding Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of students who are already building amazing projects and developing skills for the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => {
                  const pricingSection = document.querySelector('.pricing-section');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-10"
              >
                View Pricing & Enroll
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-blue-200">
              30-day money-back guarantee • Flexible scheduling • Expert instructors
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
