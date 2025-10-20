import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, Star, Zap, Crown } from "lucide-react";

interface PricingTiersProps {
  programName: string;
  programColor?: string;
}

export function PricingTiers({ programName, programColor = "blue" }: PricingTiersProps) {
  const colorClasses = {
    blue: {
      gradient: "from-blue-600 to-purple-600",
      accent: "text-blue-600",
      bg: "bg-blue-600",
      bgLight: "bg-blue-100",
      border: "border-blue-300",
      hover: "hover:border-blue-500"
    },
    purple: {
      gradient: "from-purple-600 to-blue-600",
      accent: "text-purple-600",
      bg: "bg-purple-600",
      bgLight: "bg-purple-100",
      border: "border-purple-300",
      hover: "hover:border-purple-500"
    },
    green: {
      gradient: "from-green-600 to-blue-600",
      accent: "text-green-600",
      bg: "bg-green-600",
      bgLight: "bg-green-100",
      border: "border-green-300",
      hover: "hover:border-green-500"
    },
    orange: {
      gradient: "from-orange-500 via-pink-500 to-purple-600",
      accent: "text-orange-600",
      bg: "bg-orange-600",
      bgLight: "bg-orange-100",
      border: "border-orange-300",
      hover: "hover:border-orange-500"
    }
  };

  const colors = colorClasses[programColor as keyof typeof colorClasses] || colorClasses.blue;

  const tiers = [
    {
      name: "Basic",
      icon: Star,
      description: "Perfect for getting started",
      popular: false,
      features: [
        "2 classes per week (45 min each)",
        "Access to learning materials",
        "Monthly progress reports",
        "Email support",
        "Community forum access",
        "Certificate upon completion"
      ],
      buttonText: "Choose Basic",
      color: "border-gray-300",
      hoverColor: "hover:border-gray-400",
      bgColor: "bg-gray-50"
    },
    {
      name: "Standard",
      icon: Zap,
      description: "Most popular choice for serious learners",
      popular: true,
      features: [
        "3 classes per week (60 min each)",
        "Premium learning materials",
        "Bi-weekly progress reports",
        "Priority email & chat support",
        "1-on-1 monthly mentor sessions",
        "Access to premium resources",
        "Competition preparation",
        "Certificate upon completion"
      ],
      buttonText: "Choose Standard",
      color: colors.border,
      hoverColor: colors.hover,
      bgColor: colors.bgLight
    },
    {
      name: "Advanced",
      icon: Crown,
      description: "Comprehensive program with personal coaching",
      popular: false,
      features: [
        "4 classes per week (60 min each)",
        "Premium + exclusive materials",
        "Weekly detailed progress reports",
        "24/7 priority support",
        "2 x 1-on-1 mentor sessions/month",
        "Personalized learning path",
        "Competition training & coaching",
        "Advanced project opportunities",
        "Free workshop access",
        "Certificate + portfolio review"
      ],
      buttonText: "Choose Advanced",
      color: "border-amber-300",
      hoverColor: "hover:border-amber-500",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 font-clash">
            Choose Your <span className={colors.accent}>Learning Plan</span>
          </h2>
          <p className="text-lg text-gray-600">
            Compare our program tiers and choose the perfect fit for your child's {programName} journey. Pricing will be discussed during consultation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className={`${colors.bg} text-white px-4 py-1 rounded-full`}>
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card 
                className={`
                  p-8 h-full flex flex-col border-2 ${tier.color} ${tier.hoverColor}
                  ${tier.popular ? 'shadow-2xl scale-105' : 'shadow-lg'}
                  rounded-3xl transition-all duration-300 hover:shadow-2xl
                  ${tier.popular ? tier.bgColor : 'bg-white'}
                `}
              >
                {/* Icon & Name */}
                <div className="text-center mb-8">
                  <div className={`${tier.popular ? colors.bg : 'bg-gray-200'} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <tier.icon className={`w-8 h-8 ${tier.popular ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <h3 className="text-2xl font-clash mb-2 text-gray-900">{tier.name}</h3>
                  <p className="text-sm text-gray-600">{tier.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${tier.popular ? colors.accent : 'text-gray-600'} flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`
                    w-full rounded-full py-6 text-lg
                    ${tier.popular 
                      ? `${colors.bg} hover:opacity-90 text-white` 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }
                  `}
                >
                  {tier.buttonText}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0 rounded-2xl">
            <h3 className="text-xl font-inter-tight mb-4 text-gray-900">💡 Need Help Choosing?</h3>
            <p className="text-gray-700 mb-4">
              Not sure which tier is right for your child? Our education specialists will help you select the perfect program tier based on your child's needs, learning goals, and schedule preferences.
            </p>
            <p className="text-sm text-gray-600">
              <a href="#" className={`${colors.accent} underline font-medium`}>Schedule a free consultation</a> to discuss pricing and enrollment options.
            </p>
          </Card>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600">
            <strong className="text-gray-900">Flexible Payment Options Available</strong> • 
            Monthly, quarterly, and annual payment plans. Special discounts for multiple programs or siblings.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
