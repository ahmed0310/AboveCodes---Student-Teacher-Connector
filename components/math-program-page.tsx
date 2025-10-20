import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  Calculator, 
  Brain, 
  Trophy, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle2,
  Star,
  ArrowRight,
  Target,
  Zap,
  Award,
  Puzzle,
  TrendingUp
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PricingTiers } from "./pricing-tiers";

interface MathProgramPageProps {
  onNavigate?: (page: "contact") => void;
}

export function MathProgramPage({ onNavigate }: MathProgramPageProps) {
  const levels = [
    {
      title: "Level 1: Foundation Math (Ages 5-7)",
      duration: "3 months",
      color: "bg-green-500",
      lightColor: "bg-green-100",
      textColor: "text-green-600",
      topics: [
        "Number sense & counting",
        "Basic addition & subtraction",
        "Pattern recognition",
        "Shape geometry basics",
        "Measurement fundamentals",
        "Math through play & games"
      ]
    },
    {
      title: "Level 2: Core Math Skills (Ages 8-10)",
      duration: "3 months",
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
      textColor: "text-blue-600",
      topics: [
        "Multiplication & division mastery",
        "Fractions & decimals",
        "Problem-solving strategies",
        "Introduction to algebra",
        "Geometry & spatial reasoning",
        "Word problems & applications"
      ]
    },
    {
      title: "Level 3: Advanced Math (Ages 11-14)",
      duration: "3 months",
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
      textColor: "text-purple-600",
      topics: [
        "Pre-algebra & algebra",
        "Advanced geometry & trigonometry",
        "Mathematical reasoning & proofs",
        "Competition math strategies",
        "Real-world applications",
        "Olympiad preparation"
      ]
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Critical Thinking",
      description: "Develop analytical skills and logical reasoning that apply to all areas of life",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Target,
      title: "Problem Solving",
      description: "Learn to break down complex problems into manageable steps",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Trophy,
      title: "Competition Ready",
      description: "Prepare for math olympiads and academic competitions with confidence",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: TrendingUp,
      title: "Academic Excellence",
      description: "Build a strong foundation that leads to success in school and beyond",
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Conceptual Understanding",
      description: "Visual models and real-world examples",
      icon: BookOpen
    },
    {
      step: "02",
      title: "Guided Practice",
      description: "Step-by-step problem solving",
      icon: Calculator
    },
    {
      step: "03",
      title: "Independent Application",
      description: "Challenge problems and exercises",
      icon: Puzzle
    },
    {
      step: "04",
      title: "Mastery Assessment",
      description: "Regular feedback and progress tracking",
      icon: Award
    }
  ];

  const features = [
    {
      title: "Singapore Math Method",
      description: "World-renowned curriculum emphasizing deep understanding over memorization",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Mental Math Techniques",
      description: "Develop lightning-fast calculation skills and number sense",
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Visual Learning Tools",
      description: "Interactive manipulatives and diagrams for better comprehension",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Competition Preparation",
      description: "Training for AMC, MATHCOUNTS, and other prestigious competitions",
      icon: Trophy,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const outcomes = [
    "Master fundamental to advanced math concepts",
    "Develop strong mental math abilities",
    "Build confidence in problem-solving",
    "Excel in school mathematics",
    "Prepare for competitive exams",
    "Develop a love for mathematical thinking"
  ];

  const faqs = [
    {
      question: "How is this different from school math?",
      answer: "Our program goes beyond school curriculum by emphasizing conceptual understanding, mental math techniques, and problem-solving strategies. We use the Singapore Math method and incorporate competition-level challenges to develop deeper mathematical thinking."
    },
    {
      question: "My child struggles with math. Can they catch up?",
      answer: "Absolutely! We assess each student's level and create a personalized learning path. Our small class sizes allow instructors to provide individual attention and address knowledge gaps effectively."
    },
    {
      question: "What if my child is already strong in math?",
      answer: "We offer advanced tracks and competition preparation for gifted students. Our curriculum is flexible and can be accelerated to keep advanced learners challenged and engaged."
    },
    {
      question: "How do you make math fun for kids?",
      answer: "We use games, puzzles, real-world applications, and interactive activities to make math engaging. Students work on projects that show how math applies to everyday life, from cooking to video games."
    },
    {
      question: "Do you prepare students for math competitions?",
      answer: "Yes! Our advanced levels include dedicated competition preparation for AMC, MATHCOUNTS, Math Kangaroo, and other olympiads. We provide practice problems, strategies, and mock competitions."
    },
    {
      question: "How do you track student progress?",
      answer: "We use regular assessments, practice tests, and progress reports. Parents receive detailed feedback on their child's strengths, areas for improvement, and overall development."
    }
  ];

  const achievements = [
    { value: "98%", label: "Students Improve Grades" },
    { value: "250+", label: "Competition Winners" },
    { value: "4.9/5", label: "Parent Satisfaction" },
    { value: "15K+", label: "Problems Solved" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-1">
                Build Strong Foundations
              </Badge>
              <h1 className="text-4xl md:text-6xl mb-6 font-clash">
                Mathematics Mastery
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Transform your child from math-anxious to math-confident with our comprehensive program. 
                We make mathematics intuitive, engaging, and actually fun!
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span>2-3 Classes/Week</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-5 h-5" />
                  <span>Small Groups (Max 6)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Trophy className="w-5 h-5" />
                  <span>Competition Training</span>
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
                  src="https://images.unsplash.com/photo-1718306201865-cae4a08311fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwbWF0aGVtYXRpY3MlMjBhYmFjdXN8ZW58MXx8fHwxNzYwMjUzODIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Kids learning mathematics"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Calculator className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl text-gray-900 font-clash">98%</div>
                    <div className="text-sm text-gray-600">Grade Improvement</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Banner */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl text-blue-600 mb-2 font-clash">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
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
              Why Choose Our <span className="text-blue-600">Math Program?</span>
            </h2>
            <p className="text-lg text-gray-600">
              We go beyond rote memorization to build true mathematical understanding and confidence.
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
              Comprehensive Math <span className="text-blue-600">Curriculum</span>
            </h2>
            <p className="text-lg text-gray-600">
              Progressive learning path designed to build mastery from foundation to advanced concepts.
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
                              {level.topics.length} Core Topics
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
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 font-clash">
              Our Proven <span className="text-blue-600">Teaching Method</span>
            </h2>
            <p className="text-lg text-gray-600">
              A structured approach that ensures deep understanding and long-term retention.
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
                  <div className="text-6xl font-clash text-purple-100 mb-4">{item.step}</div>
                  <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-900 font-inter-tight">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
                
                {index < methodology.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-purple-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Features */}
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
              What Makes Us <span className="text-blue-600">Special</span>
            </h2>
            <p className="text-lg text-gray-600">
              Unique features that set our math program apart from traditional tutoring.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-0 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`${feature.bgColor} p-3 rounded-2xl flex-shrink-0`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl mb-2 text-gray-900 font-inter-tight">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
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
                  Student <span className="text-blue-600">Success Stories</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our students consistently achieve remarkable results in school and competitions.
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
                      <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                        <Star className="w-5 h-5 text-purple-600" />
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
                    src="https://images.unsplash.com/photo-1722912010170-704c382ca530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc3R1ZHlpbmclMjB0b2dldGhlciUyMGdyb3VwfGVufDF8fHx8MTc2MDI1MzgyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Students learning together"
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
        <PricingTiers programName="Math" programColor="purple" />
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
              Everything parents want to know about our mathematics program.
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
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl mb-6 font-clash">
              Start Building Math Confidence Today
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join hundreds of students who have transformed their relationship with mathematics.
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
              Free skill assessment • No credit card required • Satisfaction guaranteed
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
