import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of Emma (8 years old)",
      image: "https://images.unsplash.com/photo-1545074439-5b5078c5f149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwYXJlbnQlMjBjaGlsZCUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NTc4NjI5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote: "Emma went from struggling with math to actually asking for extra practice! The abacus program has improved her concentration so much.",
      rating: 5,
      highlight: "Improved concentration"
    },
    {
      name: "Michael Chen",
      role: "Father of Alex (12 years old)",
      image: "https://images.unsplash.com/photo-1753705745770-6ceefc22ed33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwaGFwcHklMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3ODYyOTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote: "Alex built his first game in Python! The instructors make coding so accessible and fun. He's already planning his next project.",
      rating: 5,
      highlight: "Built first game"
    },
    {
      name: "Lisa Martinez",
      role: "Mother of twins (6 years old)",
      image: "https://images.unsplash.com/photo-1545074439-5b5078c5f149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwYXJlbnQlMjBjaGlsZCUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NTc4NjI5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote: "Both kids love their weekly classes! The visual coding activities are perfect for their age. They're learning without even realizing it.",
      rating: 5,
      highlight: "Learning through play"
    }
  ];

  const beforeAfter = [
    {
      title: "Before AboveCodes",
      items: ["Struggled with math concepts", "Low confidence in problem-solving", "Difficulty concentrating"],
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "After AboveCodes",
      items: ["Excited about learning", "Building real projects", "Improved focus and grades"],
      color: "text-green-600",
      bgColor: "bg-green-50"
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
            Success Stories from{" "}
            <span className="text-blue-600">Happy Families</span>
          </h2>
          <p className="text-lg text-gray-600">
            See how AboveCodes has transformed learning for children and brought peace of mind to parents.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="p-6 h-full border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                    <p className="text-gray-700 leading-relaxed pl-6">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <ImageWithFallback 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 font-inter-tight">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-sm text-blue-600 font-medium">
                      ✨ {testimonial.highlight}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Before/After Comparison */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl text-gray-900 mb-4 font-inter-tight font-semibold">
              The AboveCodes Transformation
            </h3>
            <p className="text-gray-600">See the remarkable changes in our students</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {beforeAfter.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className={`p-6 ${section.bgColor} border-2 border-gray-100 rounded-2xl`}>
                  <h4 className={`text-xl mb-4 font-inter-tight font-semibold ${section.color}`}>{section.title}</h4>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <motion.li 
                        key={itemIndex}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + itemIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-red-400' : 'bg-green-400'}`}></div>
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}