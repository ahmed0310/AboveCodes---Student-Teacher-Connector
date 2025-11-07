import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("section", { className: "py-16 bg-gray-50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs(motion.div, { className: "text-center max-w-3xl mx-auto mb-16", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [_jsxs("h2", { className: "text-3xl md:text-4xl mb-6 text-gray-900 font-clash font-semibold", children: ["Success Stories from", " ", _jsx("span", { className: "text-blue-600", children: "Happy Families" })] }), _jsx("p", { className: "text-lg text-gray-600", children: "See how AboveCodes has transformed learning for children and brought peace of mind to parents." })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 mb-16", children: testimonials.map((testimonial, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: index * 0.2 }, viewport: { once: true }, whileHover: { y: -10 }, children: _jsx(Card, { className: "p-6 h-full border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 rounded-2xl", children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center gap-1 mb-4", children: [...Array(testimonial.rating)].map((_, i) => (_jsx(Star, { className: "w-5 h-5 fill-yellow-400 text-yellow-400" }, i))) }), _jsxs("div", { className: "relative", children: [_jsx(Quote, { className: "absolute -top-2 -left-2 w-8 h-8 text-blue-200" }), _jsxs("p", { className: "text-gray-700 leading-relaxed pl-6", children: ["\"", testimonial.quote, "\""] })] }), _jsxs("div", { className: "flex items-center gap-4 pt-4 border-t border-gray-100", children: [_jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden", children: _jsx(ImageWithFallback, { src: testimonial.image, alt: testimonial.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-gray-900 font-inter-tight", children: testimonial.name }), _jsx("div", { className: "text-sm text-gray-500", children: testimonial.role })] })] }), _jsx("div", { className: "bg-blue-50 rounded-lg p-3 text-center", children: _jsxs("div", { className: "text-sm text-blue-600 font-medium", children: ["\u2728 ", testimonial.highlight] }) })] }) }) }, testimonial.name))) }), _jsxs(motion.div, { className: "max-w-4xl mx-auto", initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, viewport: { once: true }, children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h3", { className: "text-2xl md:text-3xl text-gray-900 mb-4 font-inter-tight font-semibold", children: "The AboveCodes Transformation" }), _jsx("p", { className: "text-gray-600", children: "See the remarkable changes in our students" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: beforeAfter.map((section, index) => (_jsx(motion.div, { initial: { opacity: 0, x: index === 0 ? -50 : 50 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.3 }, viewport: { once: true }, children: _jsxs(Card, { className: `p-6 ${section.bgColor} border-2 border-gray-100 rounded-2xl`, children: [_jsx("h4", { className: `text-xl mb-4 font-inter-tight font-semibold ${section.color}`, children: section.title }), _jsx("ul", { className: "space-y-3", children: section.items.map((item, itemIndex) => (_jsxs(motion.li, { className: "flex items-center gap-3", initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, transition: { delay: 0.5 + itemIndex * 0.1 }, viewport: { once: true }, children: [_jsx("div", { className: `w-2 h-2 rounded-full ${index === 0 ? 'bg-red-400' : 'bg-green-400'}` }), _jsx("span", { className: "text-gray-700", children: item })] }, itemIndex))) })] }) }, section.title))) })] })] }) }));
}
