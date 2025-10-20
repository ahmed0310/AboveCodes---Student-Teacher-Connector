import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Star, UserCheck, Globe, Trophy } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function WhyChooseSection() {
  const features = [
    {
      icon: Star,
      title: "Fun & Engaging Lessons",
      description: "Interactive games and activities that make learning feel like play, keeping kids excited and motivated.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      hoverColor: "hover:bg-yellow-50"
    },
    {
      icon: UserCheck,
      title: "Experienced Instructors",
      description: "Certified teachers who understand child development and create supportive learning environments.",
      color: "text-green-600",
      bgColor: "bg-green-100",
      hoverColor: "hover:bg-green-50"
    },
    {
      icon: Globe,
      title: "Online & Flexible",
      description: "Learn from anywhere with flexible scheduling that fits your family's busy lifestyle.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-50"
    },
    {
      icon: Trophy,
      title: "Confidence & Skills",
      description: "Build lasting confidence through achievement badges, certificates, and real skill development.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      hoverColor: "hover:bg-purple-50"
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
            Why Parents Choose{" "}
            <span className="text-blue-600">AboveCodes</span>
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of families who trust us to provide quality education that prepares kids for the future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className={`p-6 h-full border-2 border-gray-100 ${feature.hoverColor} hover:border-gray-200 hover:shadow-xl transition-all duration-300 rounded-2xl text-center`}>
                <div className="space-y-4">
                  <motion.div 
                    className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </motion.div>
                  
                  <h3 className="text-xl text-gray-900 font-inter-tight font-semibold">{feature.title}</h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <motion.div 
                    className="flex justify-center space-x-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1.5 h-1.5 ${feature.bgColor} rounded-full`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          delay: i * 0.3 
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Image Banner */}
        <motion.div
          className="mt-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwdGVhbXdvcmslMjBsZWFybmluZ3xlbnwxfHx8fDE3NjAyNTkzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Kids learning together in a group"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl md:text-3xl mb-2 font-clash">Join 10,000+ Happy Students Worldwide</h3>
              <p className="text-lg text-gray-200">Experience learning that makes a difference in your child's life</p>
            </div>
          </div>
        </motion.div>
        
        {/* Stats Section */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { number: "500+", label: "Happy Students" },
            { number: "50+", label: "Expert Teachers" },
            { number: "95%", label: "Parent Satisfaction" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl text-blue-600 mb-2 font-clash font-bold">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}