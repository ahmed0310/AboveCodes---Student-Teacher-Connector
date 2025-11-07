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
  Eye,
  Handshake,
  TrendingUp,
  Focus
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PricingTiers } from "./pricing-tiers";
import React from "react";

interface AbacusProgramPageProps {
  onNavigate?: (page: "contact") => void;
}

export function AbacusProgramPage({ onNavigate }: AbacusProgramPageProps) {
  const levels = [
    {
      title: "Level 1: Beginner (Ages 5-7)",
      duration: "3 months",
      color: "bg-green-500",
      lightColor: "bg-green-100",
      textColor: "text-green-600",
      topics: [
        "Abacus basics & bead manipulation",
        "Number recognition 1-100",
        "Simple addition & subtraction",
        "Finger movement techniques",
        "Visualization fundamentals",
        "Speed & accuracy building"
      ]
    },
    {
      title: "Level 2: Intermediate (Ages 8-10)",
      duration: "3 months",
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
      textColor: "text-blue-600",
      topics: [
        "Mental arithmetic mastery",
        "Multi-digit calculations",
        "Multiplication & division on abacus",
        "Advanced visualization techniques",
        "Speed calculation drills",
        "Competition preparation basics"
      ]
    },
    {
      title: "Level 3: Advanced (Ages 11-14)",
      duration: "3 months",
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
      textColor: "text-purple-600",
      topics: [
        "Complex mental calculations",
        "Decimal & fraction computations",
        "Lightning-fast mental math",
        "Competition-level techniques",
        "Advanced problem solving",
        "Teaching & mentoring skills"
      ]
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Enhanced Concentration",
      description: "Develop laser-sharp focus and attention span through regular practice",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Eye,
      title: "Visual Memory",
      description: "Strengthen photographic memory and visualization abilities",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Zap,
      title: "Lightning Calculations",
      description: "Perform complex calculations faster than a calculator",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: TrendingUp,
      title: "Academic Boost",
      description: "Improve overall academic performance and test scores",
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Physical Abacus",
      description: "Learn bead manipulation and techniques",
      icon: Calculator
    },
    {
      step: "02",
      title: "Visualization",
      description: "Mental image of the abacus",
      icon: Eye
    },
    {
      step: "03",
      title: "Mental Math",
      description: "Calculate without physical abacus",
      icon: Brain
    },
    {
      step: "04",
      title: "Speed Mastery",
      description: "Lightning-fast calculations",
      icon: Zap
    }
  ];

  const mentalBenefits = [
    {
      title: "Improved Concentration",
      description: "Students develop the ability to focus deeply for extended periods",
      icon: Focus,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Enhanced Creativity",
      description: "Right-brain activation leads to better creative thinking and problem-solving",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Confidence Building",
      description: "Quick mental calculations boost self-esteem in academic settings",
      icon: Trophy,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Memory Enhancement",
      description: "Regular practice significantly improves both short and long-term memory",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const outcomes = [
    "Calculate 10-digit numbers mentally in seconds",
    "Develop photographic memory abilities",
    "Improve concentration and focus by 200%",
    "Excel in school mathematics",
    "Boost overall academic performance",
    "Compete in national abacus championships"
  ];

  const faqs = [
    {
      question: "What is abacus and how does it help my child?",
      answer: "Abacus is an ancient calculation tool that helps children visualize numbers and perform mental arithmetic. It activates both sides of the brain, improving concentration, memory, visualization skills, and calculation speed. Students learn to picture the abacus in their mind and perform calculations mentally."
    },
    {
      question: "At what age should my child start learning abacus?",
      answer: "The ideal age to start is between 5-7 years old when the brain is most receptive to visualization and pattern recognition. However, we have successful students starting as late as 12 years old. The key is consistent practice regardless of starting age."
    },
    {
      question: "Do students need to buy an abacus?",
      answer: "Yes, each student needs their own abacus for practice. We provide a high-quality abacus as part of the enrollment kit. We also recommend workbooks and practice materials, which are included in the program fee."
    },
    {
      question: "How much practice is needed outside of class?",
      answer: "We recommend 15-20 minutes of daily practice for best results. Consistency is more important than duration. We provide structured homework and practice exercises that make daily practice engaging and effective."
    },
    {
      question: "Can abacus conflict with school math methods?",
      answer: "Not at all! Abacus complements school math by strengthening mental calculation abilities. Students become faster and more accurate in all types of math. Many teachers report that abacus students show improved performance in regular math classes."
    },
    {
      question: "Are there competitions for abacus students?",
      answer: "Yes! We prepare students for regional, national, and international abacus competitions. Competition participation is optional but highly encouraged as it motivates students and provides goals to work toward."
    }
  ];

  const achievements = [
    { value: "50+", label: "National Champions" },
    { value: "10x", label: "Calculation Speed" },
    { value: "200%", label: "Focus Improvement" },
    { value: "8K+", label: "Students Trained" }
  ];

  const skillsImproved = [
    "Mental calculation speed",
    "Concentration & focus",
    "Photographic memory",
    "Visual-spatial intelligence",
    "Left-right brain coordination",
    "Listening skills",
    "Self-confidence",
    "Academic performance"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white overflow-hidden">
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
                Ancient Wisdom, Modern Results
              </Badge>
              <h1 className="text-4xl md:text-6xl mb-6 font-clash">
                Abacus Training
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Unlock your child's mental superpowers with abacus! Watch them calculate faster than a calculator 
                while developing concentration, memory, and visualization skills that last a lifetime.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span>2 Classes/Week</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-5 h-5" />
                  <span>Small Batches (Max 8)</span>
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
                  alt="Kids learning abacus"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Brain className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl text-gray-900 font-clash">10x</div>
                    <div className="text-sm text-gray-600">Faster Calculations</div>
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
                <div className="text-3xl md:text-4xl text-green-600 mb-2 font-clash">{stat.value}</div>
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
              The Power of <span className="text-green-600">Abacus</span>
            </h2>
            <p className="text-lg text-gray-600">
              More than just fast calculations—abacus training transforms how children think and learn.
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
              Progressive <span className="text-green-600">Learning Path</span>
            </h2>
            <p className="text-lg text-gray-600">
              From basic bead manipulation to lightning-fast mental calculations in three structured levels.
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
                              {level.topics.length} Learning Modules
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
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 font-clash">
              The Abacus <span className="text-green-600">Journey</span>
            </h2>
            <p className="text-lg text-gray-600">
              A proven progression from physical tool to pure mental calculation mastery.
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
                  <div className="text-6xl font-clash text-green-100 mb-4">{item.step}</div>
                  <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-900 font-inter-tight">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
                
                {index < methodology.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-green-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mental Benefits */}
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
              Whole Brain <span className="text-green-600">Development</span>
            </h2>
            <p className="text-lg text-gray-600">
              Abacus activates both left and right hemispheres for complete cognitive growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {mentalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-0 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`${benefit.bgColor} p-3 rounded-2xl flex-shrink-0`}>
                      <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl mb-2 text-gray-900 font-inter-tight">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Improved */}
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
                  Skills That <span className="text-green-600">Transform</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Regular abacus practice leads to measurable improvements across multiple cognitive areas.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {skillsImproved.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{skill}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-green-50 rounded-2xl border-2 border-green-200">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg mb-2 text-gray-900 font-inter-tight">Proven Results</h4>
                      <p className="text-gray-600">
                        Research shows abacus students score 15-20% higher in math tests and show 
                        significantly improved concentration in all subjects.
                      </p>
                    </div>
                  </div>
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
                    alt="Students practicing abacus"
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
        <PricingTiers programName="Abacus" programColor="green" />
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
              Frequently Asked <span className="text-green-600">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our abacus training program.
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
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl mb-6 font-clash">
              Unlock Your Child's Mental Superpowers
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of students who can calculate faster than a calculator while developing 
              extraordinary concentration and memory skills.
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
              Free abacus kit included • 30-day money-back guarantee • Expert instructors
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
