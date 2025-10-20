import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Users, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
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

export function ContactSection() {
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
    // Clear error when user starts typing
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
    
    // Simulate API call
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

  if (isSubmitted) {
    return (
      <section className={styles.contactContainer}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`${styles.successMessage} p-12 rounded-2xl`}>
            <div className="flex justify-center mb-4">
              <Star className="h-16 w-16" />
            </div>
            <h2 className="font-clash mb-6">Thank You!</h2>
            <p className="text-lg mb-8">
              We've received your inquiry and will contact you within 24 hours to discuss how AboveCodes can help {formData.childName} excel in their learning journey.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-white text-green-600 hover:bg-gray-50"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={styles.contactContainer}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-clash text-4xl lg:text-5xl mb-6 text-gray-900">
            Start Your Child's
            <span className="text-blue-600"> Learning Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to unlock your child's potential? Get in touch with our education specialists for a personalized consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`${styles.formCard} rounded-3xl`}>
              <div className="flex items-center gap-4 mb-10">
                <Send className={`h-8 w-8 ${styles.decorativeIcon}`} />
                <h3 className="font-clash text-2xl text-gray-900">Send us a message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className={styles.inputGroup}>
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      className={styles.inputField}
                      placeholder="Your full name"
                    />
                    {errors.parentName && (
                      <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={styles.inputField}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className={styles.inputGroup}>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={styles.inputField}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <Label htmlFor="childName">Child's Name *</Label>
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) => handleInputChange('childName', e.target.value)}
                      className={styles.inputField}
                      placeholder="Your child's name"
                    />
                    {errors.childName && (
                      <p className="text-red-500 text-sm mt-1">{errors.childName}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className={styles.inputGroup}>
                    <Label htmlFor="childAge">Child's Age *</Label>
                    <Select value={formData.childAge} onValueChange={(value) => handleInputChange('childAge', value)}>
                      <SelectTrigger className={styles.selectField}>
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

                  <div className={styles.inputGroup}>
                    <Label htmlFor="program">Program Interest *</Label>
                    <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                      <SelectTrigger className={styles.selectField}>
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

                <div className={styles.inputGroup}>
                  <Label htmlFor="package">Preferred Package</Label>
                  <Select value={formData.package} onValueChange={(value) => handleInputChange('package', value)}>
                    <SelectTrigger className={styles.selectField}>
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

                <div className={styles.inputGroup}>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={styles.textareaField}
                    placeholder="Tell us more about your child's interests, learning goals, or any specific questions you have..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full text-lg ${styles.submitButton}`}
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
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className={`${styles.contactInfo} rounded-2xl`}>
              <h3 className="font-clash text-xl mb-8 text-gray-900">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className={`flex items-center gap-4 ${styles.contactInfoItem}`}>
                  <div className={styles.contactInfoIcon}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Call Us</p>
                    <p className="text-gray-600">+1 (555) 123-ABOVE</p>
                  </div>
                </div>

                <div className={`flex items-center gap-4 ${styles.contactInfoItem}`}>
                  <div className={styles.contactInfoIcon}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Us</p>
                    <p className="text-gray-600">hello@abovecodes.com</p>
                  </div>
                </div>

                <div className={`flex items-center gap-4 ${styles.contactInfoItem}`}>
                  <div className={styles.contactInfoIcon}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Visit Us</p>
                    <p className="text-gray-600">123 Learning Lane<br />Education City, EC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.contactInfo} rounded-2xl`}>
              <h3 className="font-clash text-xl mb-6 text-gray-900">Office Hours</h3>
              
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Monday - Friday</p>
                    <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Saturday</p>
                    <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Free Consultation</p>
                    <p className="text-gray-600">Available by appointment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}