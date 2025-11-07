import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Users, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import styles from './contact-section.module.css';
export function ContactSection() {
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
        // Clear error when user starts typing
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
    if (isSubmitted) {
        return (_jsx("section", { className: styles.contactContainer, children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: _jsxs("div", { className: `${styles.successMessage} p-12 rounded-2xl`, children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx(Star, { className: "h-16 w-16" }) }), _jsx("h2", { className: "font-clash mb-6", children: "Thank You!" }), _jsxs("p", { className: "text-lg mb-8", children: ["We've received your inquiry and will contact you within 24 hours to discuss how AboveCodes can help ", formData.childName, " excel in their learning journey."] }), _jsx(Button, { onClick: () => setIsSubmitted(false), className: "bg-white text-green-600 hover:bg-gray-50", children: "Send Another Message" })] }) }) }));
    }
    return (_jsx("section", { id: "contact", className: styles.contactContainer, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-20", children: [_jsxs("h2", { className: "font-clash text-4xl lg:text-5xl mb-6 text-gray-900", children: ["Start Your Child's", _jsx("span", { className: "text-blue-600", children: " Learning Journey" })] }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Ready to unlock your child's potential? Get in touch with our education specialists for a personalized consultation." })] }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-16", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs("div", { className: `${styles.formCard} rounded-3xl`, children: [_jsxs("div", { className: "flex items-center gap-4 mb-10", children: [_jsx(Send, { className: `h-8 w-8 ${styles.decorativeIcon}` }), _jsx("h3", { className: "font-clash text-2xl text-gray-900", children: "Send us a message" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [_jsxs("div", { className: styles.inputGroup, children: [_jsx(Label, { htmlFor: "parentName", children: "Parent/Guardian Name *" }), _jsx(Input, { id: "parentName", value: formData.parentName, onChange: (e) => handleInputChange('parentName', e.target.value), className: styles.inputField, placeholder: "Your full name" }), errors.parentName && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.parentName }))] }), _jsxs("div", { className: styles.inputGroup, children: [_jsx(Label, { htmlFor: "email", children: "Email Address *" }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: (e) => handleInputChange('email', e.target.value), className: styles.inputField, placeholder: "your.email@example.com" }), errors.email && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.email }))] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [_jsxs("div", { className: styles.inputGroup, children: [_jsx(Label, { htmlFor: "phone", children: "Phone Number *" }), _jsx(Input, { id: "phone", type: "tel", value: formData.phone, onChange: (e) => handleInputChange('phone', e.target.value), className: styles.inputField, placeholder: "+1 (555) 123-4567" }), errors.phone && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.phone }))] }), _jsxs("div", { className: styles.inputGroup, children: [_jsx(Label, { htmlFor: "childName", children: "Child's Name *" }), _jsx(Input, { id: "childName", value: formData.childName, onChange: (e) => handleInputChange('childName', e.target.value), className: styles.inputField, placeholder: "Your child's name" }), errors.childName && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.childName }))] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [_jsxs("div", { className: styles.inputGroup, children: [_jsx(Label, { htmlFor: "childAge", children: "Child's Age *" }), _jsxs(Select, { value: formData.childAge, onValueChange: (value) => handleInputChange('childAge', value), children: [_jsx(SelectTrigger, { className: styles.selectField, children: _jsx(SelectValue, { placeholder: "Select age group" }) }), _jsx(SelectContent, { children: ageGroups.map((age) => (_jsx(SelectItem, { value: age.value, children: age.label }, age.value))) })] }), errors.childAge && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.childAge }))] }), _jsxs("div", { className: styles.inputGroup, children: [_jsx(Label, { htmlFor: "program", children: "Program Interest *" }), _jsxs(Select, { value: formData.program, onValueChange: (value) => handleInputChange('program', value), children: [_jsx(SelectTrigger, { className: styles.selectField, children: _jsx(SelectValue, { placeholder: "Select program" }) }), _jsx(SelectContent, { children: programs.map((program) => (_jsx(SelectItem, { value: program.value, children: program.label }, program.value))) })] }), errors.program && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.program }))] })] }), _jsxs("div", { className: styles.inputGroup, children: [_jsx(Label, { htmlFor: "package", children: "Preferred Package" }), _jsxs(Select, { value: formData.package, onValueChange: (value) => handleInputChange('package', value), children: [_jsx(SelectTrigger, { className: styles.selectField, children: _jsx(SelectValue, { placeholder: "Select package (optional)" }) }), _jsx(SelectContent, { children: packages.map((pkg) => (_jsx(SelectItem, { value: pkg.value, children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: pkg.label }), _jsx("span", { className: "text-xs text-gray-500", children: pkg.description })] }) }, pkg.value))) })] }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Optional: Select your preferred pricing tier or choose \"Not sure yet\"" })] }), _jsxs("div", { className: styles.inputGroup, children: [_jsx(Label, { htmlFor: "message", children: "Additional Message" }), _jsx(Textarea, { id: "message", value: formData.message, onChange: (e) => handleInputChange('message', e.target.value), className: styles.textareaField, placeholder: "Tell us more about your child's interests, learning goals, or any specific questions you have..." })] }), _jsx(Button, { type: "submit", disabled: isSubmitting, className: `w-full text-lg ${styles.submitButton}`, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" }), "Sending Message..."] })) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "h-5 w-5 mr-2" }), "Send Message"] })) })] })] }) }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: `${styles.contactInfo} rounded-2xl`, children: [_jsx("h3", { className: "font-clash text-xl mb-8 text-gray-900", children: "Get in Touch" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: `flex items-center gap-4 ${styles.contactInfoItem}`, children: [_jsx("div", { className: styles.contactInfoIcon, children: _jsx(Phone, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Call Us" }), _jsx("p", { className: "text-gray-600", children: "+1 (555) 123-ABOVE" })] })] }), _jsxs("div", { className: `flex items-center gap-4 ${styles.contactInfoItem}`, children: [_jsx("div", { className: styles.contactInfoIcon, children: _jsx(Mail, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Email Us" }), _jsx("p", { className: "text-gray-600", children: "hello@abovecodes.com" })] })] }), _jsxs("div", { className: `flex items-center gap-4 ${styles.contactInfoItem}`, children: [_jsx("div", { className: styles.contactInfoIcon, children: _jsx(MapPin, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Visit Us" }), _jsxs("p", { className: "text-gray-600", children: ["123 Learning Lane", _jsx("br", {}), "Education City, EC 12345"] })] })] })] })] }), _jsxs("div", { className: `${styles.contactInfo} rounded-2xl`, children: [_jsx("h3", { className: "font-clash text-xl mb-6 text-gray-900", children: "Office Hours" }), _jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Clock, { className: "h-5 w-5 text-blue-600" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Monday - Friday" }), _jsx("p", { className: "text-gray-600", children: "9:00 AM - 6:00 PM" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Clock, { className: "h-5 w-5 text-blue-600" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Saturday" }), _jsx("p", { className: "text-gray-600", children: "10:00 AM - 4:00 PM" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Users, { className: "h-5 w-5 text-orange-500" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Free Consultation" }), _jsx("p", { className: "text-gray-600", children: "Available by appointment" })] })] })] })] })] })] })] }) }));
}
