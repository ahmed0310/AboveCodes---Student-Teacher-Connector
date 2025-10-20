import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Users, Clock, Star, MessageCircle, Calendar, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import styles from './contact-section.module.css';

interface FormData {
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: string;
  program: string;
  package: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    program: '',
    package: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.childName.trim()) {
      newErrors.childName = 'Child name is required';
    }

    if (!formData.childAge) {
      newErrors.childAge = 'Please select child age';
    }

    if (!formData.program) {
      newErrors.program = 'Please select a program';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        parentName: '',
        email: '',
        phone: '',
        childName: '',
        childAge: '',
        program: '',
        package: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ageGroups = [
    { value: '5-6', label: '5-6 years' },
    { value: '7-8', label: '7-8 years' },
    { value: '9-10', label: '9-10 years' },
    { value: '11-12', label: '11-12 years' },
    { value: '13-14', label: '13-14 years' }
  ];

  const programs = [
    { value: 'coding', label: 'Coding Fundamentals' },
    { value: 'math', label: 'Math Excellence' },
    { value: 'abacus', label: 'Abacus Mastery' },
    { value: 'uxui', label: 'UX/UI Design' },
    { value: 'combo', label: 'Combined Program' },
    { value: 'consultation', label: 'General Inquiry' }
  ];

  const packages = [
    { value: 'basic', label: 'Basic Plan', description: '2 classes/week • 45 min sessions' },
    { value: 'standard', label: 'Standard Plan (Most Popular)', description: '3 classes/week • 60 min sessions' },
    { value: 'advanced', label: 'Advanced Plan', description: '4 classes/week • 60 min sessions' },
    { value: 'undecided', label: 'Not sure yet', description: 'Help me choose the right plan' }
  ];

  const contactReasons = [
    {
      icon: MessageCircle,
      title: "General Inquiry",
      description: "Have questions about our programs? We're here to help!",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Calendar,
      title: "Schedule a Demo",
      description: "Book a free demo class to experience our teaching style",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "We typically respond within 24 hours on business days",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-white p-12 rounded-3xl shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="h-10 w-10 text-green-600" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-clash mb-4 text-gray-900">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-8">
              We've received your inquiry and will contact you within 24 hours to discuss how AboveCodes can help your child excel in their learning journey.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
              >
                Send Another Message
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-clash mb-6 text-gray-900">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to unlock your child's potential? Our education specialists are here to answer your questions and guide you through the perfect learning path.
          </p>
        </motion.div>

        {/* Contact Reasons */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactReasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center border-0 rounded-2xl hover:shadow-lg transition-shadow">
                <div className={`${reason.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <reason.icon className={`w-7 h-7 ${reason.color}`} />
                </div>
                <h3 className="text-lg font-inter-tight mb-2 text-gray-900">{reason.title}</h3>
                <p className="text-sm text-gray-600">{reason.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-clash text-gray-900">Send us a message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      className="mt-2"
                      placeholder="Your full name"
                    />
                    {errors.parentName && (
                      <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2"
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="childName">Child's Name *</Label>
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) => handleInputChange('childName', e.target.value)}
                      className="mt-2"
                      placeholder="Your child's name"
                    />
                    {errors.childName && (
                      <p className="text-red-500 text-sm mt-1">{errors.childName}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="childAge">Child's Age *</Label>
                    <Select value={formData.childAge} onValueChange={(value) => handleInputChange('childAge', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageGroups.map((age) => (
                          <SelectItem key={age.value} value={age.value}>
                            {age.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.childAge && (
                      <p className="text-red-500 text-sm mt-1">{errors.childAge}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="program">Program Interest *</Label>
                    <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program.value} value={program.value}>
                            {program.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.program && (
                      <p className="text-red-500 text-sm mt-1">{errors.program}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="package">Preferred Package</Label>
                    <Select value={formData.package} onValueChange={(value) => handleInputChange('package', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select package (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.value} value={pkg.value}>
                            <div className="flex flex-col">
                              <span className="font-semibold">{pkg.label}</span>
                              <span className="text-xs text-gray-500">{pkg.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      Optional: Select your preferred pricing tier or choose "Not sure yet"
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-2 min-h-32"
                    placeholder="Tell us more about your child's interests, learning goals, or any specific questions you have..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-clash mb-6 text-gray-900">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Call Us</p>
                    <p className="text-gray-600">+1 (555) 123-ABOVE</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-xl flex-shrink-0">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email Us</p>
                    <p className="text-gray-600">hello@abovecodes.com</p>
                    <p className="text-sm text-gray-500">24/7 support</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl flex-shrink-0">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Visit Us</p>
                    <p className="text-gray-600">123 Learning Lane<br />Education City, EC 12345</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-2xl shadow-lg text-white"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-clash mb-4">Office Hours</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Monday - Friday</p>
                    <p className="text-blue-100">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Saturday</p>
                    <p className="text-blue-100">10:00 AM - 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Free Consultation</p>
                    <p className="text-blue-100">By appointment</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
