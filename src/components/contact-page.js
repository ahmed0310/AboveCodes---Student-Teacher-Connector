import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Users, Clock, Star, MessageCircle, Calendar, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { motion } from 'motion/react';
export function ContactPage() {
    const [formData, setFormData] = useState({
        parentName: '',
        email: '',
        phone: '',
        childName: '',
        childAge: '',
        program: '',
        package: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const validateForm = () => {
        const newErrors = {};
        if (!formData.parentName.trim()) {
            newErrors.parentName = 'Parent name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };
    const handleSubmit = async (e) => {
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
        }
        catch (error) {
            console.error('Form submission error:', error);
        }
        finally {
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
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16", children: _jsx("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: _jsxs(motion.div, { className: "bg-white p-12 rounded-3xl shadow-xl", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 }, children: [_jsx(motion.div, { className: "flex justify-center mb-6", initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.5, delay: 0.2 }, children: _jsx("div", { className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center", children: _jsx(Star, { className: "h-10 w-10 text-green-600" }) }) }), _jsx("h2", { className: "text-3xl font-clash mb-4 text-gray-900", children: "Thank You!" }), _jsx("p", { className: "text-lg text-gray-600 mb-8", children: "We've received your inquiry and will contact you within 24 hours to discuss how AboveCodes can help your child excel in their learning journey." }), _jsx("div", { className: "flex gap-4 justify-center", children: _jsx(Button, { onClick: () => setIsSubmitted(false), className: "bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8", children: "Send Another Message" }) })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { className: "text-center mb-16", initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-clash mb-6 text-gray-900", children: ["Get in ", _jsx("span", { className: "text-blue-600", children: "Touch" })] }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Ready to unlock your child's potential? Our education specialists are here to answer your questions and guide you through the perfect learning path." })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-6 mb-16", children: contactReasons.map((reason, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, children: _jsxs(Card, { className: "p-6 text-center border-0 rounded-2xl hover:shadow-lg transition-shadow", children: [_jsx("div", { className: `${reason.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`, children: _jsx(reason.icon, { className: `w-7 h-7 ${reason.color}` }) }), _jsx("h3", { className: "text-lg font-inter-tight mb-2 text-gray-900", children: reason.title }), _jsx("p", { className: "text-sm text-gray-600", children: reason.description })] }) }, index))) }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-12", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(motion.div, { className: "bg-white p-8 lg:p-10 rounded-3xl shadow-xl", initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 }, children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx("div", { className: "bg-blue-100 p-3 rounded-2xl", children: _jsx(Send, { className: "h-6 w-6 text-blue-600" }) }), _jsx("h2", { className: "text-2xl font-clash text-gray-900", children: "Send us a message" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "parentName", children: "Parent/Guardian Name *" }), _jsx(Input, { id: "parentName", value: formData.parentName, onChange: (e) => handleInputChange('parentName', e.target.value), className: "mt-2", placeholder: "Your full name" }), errors.parentName && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.parentName }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "email", children: "Email Address *" }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: (e) => handleInputChange('email', e.target.value), className: "mt-2", placeholder: "your.email@example.com" }), errors.email && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.email }))] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "phone", children: "Phone Number *" }), _jsx(Input, { id: "phone", type: "tel", value: formData.phone, onChange: (e) => handleInputChange('phone', e.target.value), className: "mt-2", placeholder: "+1 (555) 123-4567" }), errors.phone && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.phone }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "childName", children: "Child's Name *" }), _jsx(Input, { id: "childName", value: formData.childName, onChange: (e) => handleInputChange('childName', e.target.value), className: "mt-2", placeholder: "Your child's name" }), errors.childName && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.childName }))] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "childAge", children: "Child's Age *" }), _jsxs(Select, { value: formData.childAge, onValueChange: (value) => handleInputChange('childAge', value), children: [_jsx(SelectTrigger, { className: "mt-2", children: _jsx(SelectValue, { placeholder: "Select age group" }) }), _jsx(SelectContent, { children: ageGroups.map((age) => (_jsx(SelectItem, { value: age.value, children: age.label }, age.value))) })] }), errors.childAge && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.childAge }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "program", children: "Program Interest *" }), _jsxs(Select, { value: formData.program, onValueChange: (value) => handleInputChange('program', value), children: [_jsx(SelectTrigger, { className: "mt-2", children: _jsx(SelectValue, { placeholder: "Select program" }) }), _jsx(SelectContent, { children: programs.map((program) => (_jsx(SelectItem, { value: program.value, children: program.label }, program.value))) })] }), errors.program && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.program }))] })] }), _jsx("div", { className: "grid md:grid-cols-1 gap-6", children: _jsxs("div", { children: [_jsx(Label, { htmlFor: "package", children: "Preferred Package" }), _jsxs(Select, { value: formData.package, onValueChange: (value) => handleInputChange('package', value), children: [_jsx(SelectTrigger, { className: "mt-2", children: _jsx(SelectValue, { placeholder: "Select package (optional)" }) }), _jsx(SelectContent, { children: packages.map((pkg) => (_jsx(SelectItem, { value: pkg.value, children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: pkg.label }), _jsx("span", { className: "text-xs text-gray-500", children: pkg.description })] }) }, pkg.value))) })] }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Optional: Select your preferred pricing tier or choose \"Not sure yet\"" })] }) }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "message", children: "Additional Message" }), _jsx(Textarea, { id: "message", value: formData.message, onChange: (e) => handleInputChange('message', e.target.value), className: "mt-2 min-h-32", placeholder: "Tell us more about your child's interests, learning goals, or any specific questions you have..." })] }), _jsx(Button, { type: "submit", disabled: isSubmitting, className: "w-full text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" }), "Sending Message..."] })) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "h-5 w-5 mr-2" }), "Send Message"] })) })] })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(motion.div, { className: "bg-white p-8 rounded-2xl shadow-lg", initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.2 }, children: [_jsx("h3", { className: "text-xl font-clash mb-6 text-gray-900", children: "Contact Information" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "bg-blue-100 p-3 rounded-xl flex-shrink-0", children: _jsx(Phone, { className: "h-5 w-5 text-blue-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-900 mb-1", children: "Call Us" }), _jsx("p", { className: "text-gray-600", children: "+1 (555) 123-ABOVE" }), _jsx("p", { className: "text-sm text-gray-500", children: "Mon-Fri, 9AM-6PM" })] })] }), _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "bg-purple-100 p-3 rounded-xl flex-shrink-0", children: _jsx(Mail, { className: "h-5 w-5 text-purple-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-900 mb-1", children: "Email Us" }), _jsx("p", { className: "text-gray-600", children: "hello@abovecodes.com" }), _jsx("p", { className: "text-sm text-gray-500", children: "24/7 support" })] })] }), _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "bg-orange-100 p-3 rounded-xl flex-shrink-0", children: _jsx(MapPin, { className: "h-5 w-5 text-orange-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-900 mb-1", children: "Visit Us" }), _jsxs("p", { className: "text-gray-600", children: ["123 Learning Lane", _jsx("br", {}), "Education City, EC 12345"] })] })] })] })] }), _jsxs(motion.div, { className: "bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-2xl shadow-lg text-white", initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.3 }, children: [_jsx("h3", { className: "text-xl font-clash mb-4", children: "Office Hours" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Clock, { className: "h-5 w-5 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Monday - Friday" }), _jsx("p", { className: "text-blue-100", children: "9:00 AM - 6:00 PM" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Clock, { className: "h-5 w-5 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Saturday" }), _jsx("p", { className: "text-blue-100", children: "10:00 AM - 4:00 PM" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Users, { className: "h-5 w-5 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Free Consultation" }), _jsx("p", { className: "text-blue-100", children: "By appointment" })] })] })] })] })] })] })] }) }));
}
